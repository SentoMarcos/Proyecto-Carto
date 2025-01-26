pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
  const pdfUrl = "../assets/Documents/PRECIPITACIONES_TEMPERATURAS_MAPA.pdf";
  let pdfDoc = null, pageNum = 1, scale = 1.5, canvas = document.getElementById('pdf-canvas'), ctx = canvas.getContext('2d');
  pdfjsLib.getDocument(pdfUrl).promise.then((doc) => {
    pdfDoc = doc;
    document.getElementById('total-pages').textContent = pdfDoc.numPages;
    renderPage(pageNum);
  });
  function renderPage(num) {
    pdfDoc.getPage(num).then((page) => {
      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({ canvasContext: ctx, viewport }).promise.then(() => {});
    });
    document.getElementById('current-page').textContent = num;
  }
  document.getElementById('prev-page').addEventListener('click', () => {
    if (pageNum > 1) renderPage(--pageNum);
  });
  document.getElementById('next-page').addEventListener('click', () => {
    if (pageNum < pdfDoc.numPages) renderPage(++pageNum);
  });