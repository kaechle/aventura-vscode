setTimeout(function () {
  window.innerHeight = window.innerHeight + 56
  window.outerHeight = window.outerHeight + 56

  document.querySelector('.monaco-workbench .part.basepanel.bottom').id =
    'terminal'
  document.querySelector('#terminal> div.content').id = 'panel'
  document.querySelector(
    '#workbench\\.parts\\.editor > div.content > div > div > div > div > div.monaco-scrollable-element.mac > div.split-view-container > div > div > div.title.tabs.show-file-icons.title-border-bottom > div.tabs-and-actions-container.tabs-border-bottom'
  ).id = 'tabs'
  document.querySelector(
    '#workbench\\.parts\\.editor > div.content > div > div > div > div > div.monaco-scrollable-element.mac > div.split-view-container > div > div > div.title.tabs.show-file-icons.title-border-bottom > div.breadcrumbs-below-tabs > div'
  ).id = 'breadcrumbs'
  document.querySelector(
    'body > div.file-icons-enabled.border.enable-motion.monaco-workbench.mac.chromium.macos-bigsur-or-newer.nopanel > div.monaco-grid-view > div > div > div.monaco-scrollable-element.mac > div.split-view-container > div:nth-child(3) > div > div > div.monaco-scrollable-element.mac > div.split-view-container > div:nth-child(3)'
  ).id = 'editor'

  const tabs = document.getElementById('tabs')
  const breadcrumbs = document.getElementById('breadcrumbs')
  const sidebar = document.getElementById('workbench.parts.sidebar')
  const statusbar = document.getElementById('workbench.parts.statusbar')
  const editor = document.getElementById('editor')
  const terminal = document.getElementById('terminal')

  const windowFix = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === editor) {
        statusbar.style.left = window.getComputedStyle(editor).left
        statusbar.style.width = window.getComputedStyle(editor).width
      }

      if (entry.target === sidebar) {
        if (window.getComputedStyle(sidebar).width !== 'auto') {
          tabs.style.paddingLeft = '0'
          breadcrumbs.style.paddingLeft = '0'
        } else if (window.getComputedStyle(tabs).display === 'flex') {
          tabs.style.paddingLeft = '75px'
        } else {
          breadcrumbs.style.paddingLeft = '75px'
        }
      }

      if (entry.target === terminal) {
        statusbar.style.marginBottom = window.getComputedStyle(terminal).height
      }
    }
  })

  windowFix.observe(editor)
  windowFix.observe(sidebar)
  windowFix.observe(terminal)
}, 6000)
