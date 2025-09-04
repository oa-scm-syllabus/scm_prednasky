import fs from 'node:fs/promises'
import path from 'node:path'
import fse from 'fs-extra'
import { getSlidesSorted } from './utils/slides.js'

const TALKS_PATH  = 'slides'
const OUTPUT_PATH = 'dist'
const PUBLIC_PATH = 'public'
const SKIP_TALKS  = ['00_skeleton', '00_uvodni_hodina'] // vynechat z indexu
const currentYear = new Date().getFullYear()

console.log('📃 build index & readme ...')

await fse.ensureDir(OUTPUT_PATH)

// načti a seřaď slidy jedním zdrojem pravdy
const entries = (await getSlidesSorted(TALKS_PATH))
    .filter(e => !SKIP_TALKS.includes(e.folder))

// HTML seznam (odkazy + PDF)
const linkListHtml = entries.map(e => `
<li class="ibm-plex-mono-thin">
  <a href="./${e.name}" class="ibm-plex-mono-semibold">${e.title}</a>
  <span class="action">(
    <a href="./${e.name}/${e.name}.pdf">PDF</a>
  )</span>
</li>`).join('')

// index.html
await fs.writeFile(path.join(OUTPUT_PATH, 'index.html'), `<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Adam Fišer | Přednášky</title>
    <link rel="stylesheet" href="styles.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <div class="row margin-top">
        <div>
          <h1>SCM | Programování a vývoj aplikací</h1>
          <h2>Přednášky</h2>
          <ol>
            ${linkListHtml}
          </ol>
        </div>
      </div>
    </div>
    <footer class="footer text-center mt-4">
      <p class="small">&copy; ${currentYear} Adam Fišer | Wanex. Všechna práva vyhrazena.</p>
    </footer>
  </body>
</html>
`)
console.log('✅ index.html hotovo')

// README.md (tabulka)
const NL = '\n'
const width = String(entries.length).length // hezké 01, 02, … když je víc položek
const readmeLines = [
    '# Seznam přednášek',
    '',
    '| # | Přednáška | PDF |',
    '|---:|-----------|-----|',
    ...entries.map((e, i) => {
        const n = String(i + 1).padStart(width, '0')
        const live = `https://oa-scm-syllabus.github.io/scm_prednasky/${e.name}/`
        const pdf  = `${live}${e.name}.pdf`
        return `| ${n} | [${e.title}](${live}) | [PDF](${pdf}) |`
    }),
]
await fs.writeFile(path.resolve('README.md'), readmeLines.join(NL) + NL, 'utf8')

// veřejná statika
await fse.copy(path.join(PUBLIC_PATH, 'styles.css'), path.join(OUTPUT_PATH, 'styles.css'))
await fse.copy(path.join(PUBLIC_PATH, 'logo.png'),   path.join(OUTPUT_PATH, 'logo.png'))

console.log('✅ README.md hotovo')
