import { Base64 } from 'js-base64'
import { jsPDF } from 'jspdf'

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
    asPNG(filename, callback) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = svgSize.width
      canvas.height = svgSize.height

      const img = document.createElement('img')

      img.setAttribute('src', dataImage)
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL('image/png')

        if (typeof callback === 'function') {
          callback(dataURL)
        } else {
          const downloadLink = document.createElement('a')
          downloadLink.href = dataURL
          downloadLink.download = filename
          downloadLink.click()
        }
      }
    },
    asPDF(filename) {
      this.asPNG(filename, (dataURL) => {
        const pdf = new jsPDF()
        pdf.addImage(dataURL, 'PNG', 0, 0)
        pdf.save(filename)
      })
    },
  }
}

export default exportSVGElement
