setTimeout(function () {
  window.outerHeight = 1150
  window.innerHeight = 1150

  document.querySelector('.monaco-workbench .part.basepanel.bottom').id =
    'terminal'
  document.querySelector('#terminal> div.content').id = 'panel'

  document.querySelector(
    '#workbench\\.parts\\.editor > div.content > div > div > div > div > div.monaco-scrollable-element.mac > div.split-view-container > div > div > div.title.tabs.show-file-icons.title-border-bottom > div.tabs-and-actions-container.tabs-border-bottom > div.monaco-scrollable-element.mac'
  ).id = 'tabs'

  document.querySelector(
    '#workbench\\.parts\\.editor > div.content > div > div > div > div > div.monaco-scrollable-element.mac > div.split-view-container > div > div > div.title.tabs.show-file-icons.title-border-bottom > div.tabs-breadcrumbs > div > div > div.monaco-breadcrumbs > div:nth-child(2)'
  ).id = 'breadcrumbs'

  document.querySelector(
    'body > div.file-icons-enabled.border.enable-motion.monaco-workbench.mac.chromium.macos-bigsur-or-newer.vs-dark.undefined_publisher-aventura-themes-aventura-zen-json.nopanel > div.monaco-grid-view > div > div > div.monaco-scrollable-element.mac > div.split-view-container > div:nth-child(3) > div > div > div.monaco-scrollable-element.mac > div.split-view-container > div:nth-child(3)'
  ).id = 'editor'

  const tabs = document.getElementById('tabs')
  const breadcrumbs = document.getElementById('breadcrumbs')
  const sidebar = document.getElementById('workbench.parts.sidebar')
  const auxiliarybar = document.getElementById('workbench.parts.auxiliarybar')
  const statusbar = document.getElementById('workbench.parts.statusbar')
  const editor = document.getElementById('editor')
  const terminal = document.getElementById('terminal')

  const windowFix = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (
        entry.target === sidebar ||
        entry.target === editor ||
        entry.target === terminal ||
        entry.target === tabs ||
        entry.target === breadcrumbs
      ) {
        statusbar.style.left = window.getComputedStyle(editor).left
        statusbar.style.width = window.getComputedStyle(editor).width

        if (tabs == true && window.getComputedStyle(sidebar).width == 'auto') {
          tabs.style.paddingLeft = '75px'
        } else if (
          tabs != true &&
          window.getComputedStyle(sidebar).width == 'auto'
        ) {
          breadcrumbs.style.paddingLeft = '75px'
        } else {
          tabs.style.paddingLeft = '0'
          breadcrumbs.style.paddingLeft = '0'
        }

        if (window.getComputedStyle(terminal).height !== 'auto') {
          statusbar.style.bottom = window.getComputedStyle(terminal).height
          statusbar.style.marginBottom = '166px'
        } else {
          statusbar.style.bottom = '0'
          statusbar.style.marginBottom = '0'
        }
      }
    }
  })
  windowFix.observe(sidebar)
  windowFix.observe(editor)
  windowFix.observe(tabs)
  windowFix.observe(breadcrumbs)
}, 6000)
