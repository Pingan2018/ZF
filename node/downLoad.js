const myDownloadDemo = async () => {
  const res = await downloadDemo()
  const blob = new Blob([res.data])
  const url = window.URL || window.webkitURL || window.moxURL
  const downloadHref = url.createObjectURL(blob)
  let downloadLink = document.createElement('a')
  downloadLink.style.display = 'none';
  downloadLink.href = downloadHref
  downloadLink.download = '导入模板.xlsx'
  downloadLink.click()
  window.URL.revokeObjectURL(downloadHref)
}