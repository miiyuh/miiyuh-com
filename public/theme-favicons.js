(function () {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function applyThemeFavicons() {
    const suffix = mediaQuery.matches ? '' : '-1';
    const icon16 = document.getElementById('theme-favicon-16');
    const icon32 = document.getElementById('theme-favicon-32');
    const shortcut = document.getElementById('theme-shortcut-icon');
    const apple = document.getElementById('theme-apple-touch-icon');

    if (icon16) icon16.setAttribute('href', '/assets/img/favicons/favicon-16x16' + suffix + '.png');
    if (icon32) icon32.setAttribute('href', '/assets/img/favicons/favicon-32x32' + suffix + '.png');
    if (shortcut) shortcut.setAttribute('href', '/assets/img/favicons/favicon-32x32' + suffix + '.png');
    if (apple) apple.setAttribute('href', '/assets/img/favicons/apple-touch-icon' + suffix + '.png');
  }

  applyThemeFavicons();

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', applyThemeFavicons);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(applyThemeFavicons);
  }
})();