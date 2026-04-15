export const usePrintSurat = () => {
  const printElement = (target: HTMLElement | null, title: string) => {
    const printContent = target?.innerHTML

    if (!printContent) {
      console.error('Print content tidak tersedia')
      return
    }

    const printWindow = window.open('', '_blank', 'width=1024,height=768')

    if (!printWindow) {
      console.error('Jendela print tidak dapat dibuka')
      return
    }

    printWindow.document.write(`
      <!doctype html>
      <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <base href="${window.location.origin}">
          <title>${title}</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 0;
            }

            html, body {
              margin: 0;
              padding: 0;
              background: #fff;
            }

            body {
              font-family: "Times New Roman", Times, serif;
            }

            .surat-paper {
              width: 794px !important;
              min-height: 1123px !important;
              margin: 0 auto;
              box-sizing: border-box;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `)
    printWindow.document.close()

    printWindow.onload = () => {
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }
  }

  return { printElement }
}
