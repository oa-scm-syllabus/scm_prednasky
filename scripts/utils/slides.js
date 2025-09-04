import fg from 'fast-glob'
import fs from 'node:fs/promises'
import path from 'node:path'

// Získá seznam přednášek (složek se slides) seřazených podle názvu složky
// Vrací pole objektů { dir, name, title, author, folder }
export async function getSlidesSorted(slidesDir) {
    const pkgFiles = await fg(['*/package.json'], { cwd: slidesDir, absolute: true })
    const entries = await Promise.all(pkgFiles.map(async p => {
        const dir = path.dirname(p)
        const pkg = JSON.parse(await fs.readFile(p, 'utf8'))
        return {
            dir,
            name:  pkg.name,
            title: pkg.title ?? pkg.name,
            author: pkg.author ?? null,
            folder: path.basename(dir),
        }
    }))
    const collator = new Intl.Collator('cs', { numeric: true, sensitivity: 'base' })
    entries.sort((a, b) => collator.compare(a.folder, b.folder))
    return entries
}
