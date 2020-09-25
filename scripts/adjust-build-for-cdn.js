const fs = require('fs')

const buildDir = 'build'
const indexHTMLPath = `${buildDir}/index.html`

const newIndexHTML =
  fs.readFileSync(indexHTMLPath, 'utf8')
    .replace(/href="\//g, 'href="')
    .replace(/src="\//g, 'src="')

fs.writeFileSync(indexHTMLPath, newIndexHTML)

fs.readdirSync(buildDir).forEach(file => {
  if (/^asset-manifest.json|^precache-manifest|^service-worker.js/.test(file)) {
    fs.unlinkSync(`${buildDir}/${file}`)
  }
})
