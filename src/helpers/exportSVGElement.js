import { Base64 } from 'js-base64'

function exportSVGElement(svgElement) {
  const svgSize = svgElement.getBoundingClientRect()
  const dataImage = `data:image/svg+xml;base64,${Base64.encode(
    svgElement.outerHTML
  )}`

  return {
    asSVG(filename) {
      const downloadLink = document.createElement('a')
      downloadLink.href = dataImage
      downloadLink.download = filename
      downloadLink.click()
    },
    asPNG(filename) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = svgSize.width
      canvas.height = svgSize.height

      const img = document.createElement('img')

      img.setAttribute('src', dataImage)
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL('image/png')

        const downloadLink = document.createElement('a')
        downloadLink.href = dataURL
        downloadLink.download = filename
        downloadLink.click()
      }
    },
  }
}

export default exportSVGElement
