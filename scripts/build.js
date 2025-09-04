import 'zx/globals'
import fg from 'fast-glob'
import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import { rimraf } from 'rimraf'
import { fileURLToPath } from 'url'

if (process.platform === 'win32') {
    $.shell = 'powershell.exe'   // nebo 'pwsh.exe'
    $.prefix = ''
}

// ---- Konfigurace ----
const GIT_PAGES_BASE = 'scm_prednasky/'
const GIT_PAGES_URL  = 'https://oa-scm-syllabus.github.io/'
const USE_SYMLINKS   = true          // když chceš raději kopírovat, dej false
const SHARED_CACHE   = '.vite-cache' // do kořene repa
// ---------------------

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const rootDir       = path.resolve(__dirname, '..')
const slidesDir     = path.resolve(rootDir, 'slides')
const distDir       = path.resolve(rootDir, 'dist')
const componentsSrc = path.resolve(rootDir, 'components')
const setupSrc      = path.resolve(rootDir, 'setup')

// 0) clean root/dist + zajisti shared cache
await rimraf(distDir)
await fse.ensureDir(distDir)
await fse.ensureDir(path.join(rootDir, SHARED_CACHE))

console.log('📃 ============ ...')
console.log('📃 build slides (sequential, optimized) ...')
console.log('📃 ============ ...')

// 1) slidy + stabilní řazení dle názvu složky
const slidePkgPaths = await fg(['*/package.json'], { cwd: slidesDir, absolute: true })
const collator = new Intl.Collator('cs', { numeric: true, sensitivity: 'base' })
const slideDirs = slidePkgPaths
    .map(p => path.dirname(p))
    .sort((a, b) => collator.compare(path.basename(a), path.basename(b)))

async function ensureLinkOrCopy(src, dest) {
    await rimraf(dest)
    if (!await fse.pathExists(src)) return
    if (USE_SYMLINKS) {
        const type = process.platform === 'win32' ? 'junction' : 'dir'
        await fse.ensureSymlink(src, dest, type)
    } else {
        await fse.copy(src, dest, { overwrite: true })
    }
}

function makeViteConfig(base, cacheRel) {
    // rychlý build: minify off, sourcemap off, shared cache
    return `import { defineConfig } from 'vite';
export default defineConfig({
  base: '${base}',
  cacheDir: '${cacheRel}',
  build: {
    minify: false,
    sourcemap: false,
    modulePreload: false,
    target: 'esnext',
  },
});
`
}

for (const dir of slideDirs) {
    const pkgPath = path.resolve(dir, 'package.json')
    const pkg     = JSON.parse(await fs.promises.readFile(pkgPath, 'utf8'))
    const name    = pkg.name
    const title   = pkg.title ?? name

    console.log(`\n📃 build slide: ${name}`)
    console.log(dir)

    // 2) dočasný vite.config.ts s base a sdílenou cache
    const viteConfigPath = path.join(dir, 'vite.config.ts')
    // z adresáře slides/<name> je kořen ../../
    const cacheRel = '../../' + SHARED_CACHE
    await fs.promises.writeFile(
        viteConfigPath,
        makeViteConfig(`/${GIT_PAGES_BASE}${name}/`, cacheRel),
        'utf8',
    )

    // 3) shared složky (symlink/junction nebo kopie)
    await ensureLinkOrCopy(componentsSrc, path.join(dir, 'components'))
    await ensureLinkOrCopy(setupSrc,      path.join(dir, 'setup'))

    // 4) build slajdu přímo přes CLI (rychlejší než dlx)
    cd(dir)
    await $`pnpm exec slidev build`

    // 5) přesuň dist do root/dist/<name> (move je rychlejší než copy+rm)
    const slideDist  = path.join(dir, 'dist')
    const targetDist = path.join(distDir, name)
    console.log('move to root dist:', targetDist)
    await rimraf(targetDist)
    await fse.move(slideDist, targetDist, { overwrite: true })

    // 6) úklid dočasného vite.config.ts + zahoď linkované složky (ať je workspace čistý)
    await fs.promises.unlink(viteConfigPath).catch(() => {})
    await rimraf(path.join(dir, 'components'))
    await rimraf(path.join(dir, 'setup'))
}

console.log('\n🎉  build success')