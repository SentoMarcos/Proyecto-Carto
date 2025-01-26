function toggleFullscreen(iframeId) {
    const iframe = document.getElementById(iframeId);
    const btn = iframe.nextElementSibling;
    if (!iframe.classList.contains('fullscreen')) {
        iframe.classList.add('fullscreen');
        btn.style.position = 'fixed';
    } else {
        iframe.classList.remove('fullscreen');
        btn.style.position = 'absolute';
    }
}