#!/usr/bin/env node
// Multiplatformní clean pro ESM (Windows + Linux), bez Bash/WSL a bez zx

import fg from 'fast-glob'
import path from 'node:path'
import fs from 'node:fs/promises'
import { rimraf } from 'rimraf'
import { fileURLToPath } from 'node:url'

// __dirname v ESM:
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const rootDir   = path.resolve(__dirname, '..')
const slidesDir = path.resolve(rootDir, 'slides')

// 1) smaž root/dist
await rimraf(path.join(rootDir, 'dist'))

// 2) najdi všechny slajdy (podle package.json)
const pkgFiles  = await fg(['*/package.json'], { cwd: slidesDir, absolute: true })
const slideDirs = pkgFiles.map(p => path.dirname(p))

// 3) úklid v každém slajdu
for (const dir of slideDirs) {
    await rimraf(path.join(dir, 'dist'))
    await rimraf(path.join(dir, '.slidev'))
    await rimraf(path.join(dir, 'components')) // pokud je během buildu linkuješ
    await rimraf(path.join(dir, 'setup'))      // dtto
    await fs.rm(path.join(dir, 'vite.config.ts'), { force: true })
}

console.log('clean: done')
