setTimeout(function () {
  document.querySelector(
    '.monaco-workbench .part.basepanel.bottom',
  ).id = 'terminal'

  const sidebar = document.getElementById('workbench.parts.sidebar')
  const auxiliarybar = document.getElementById(
    'workbench.parts.auxiliarybar',
  )
  const titlebar = document.getElementById('workbench.parts.titlebar')
  const statusbar = document.getElementById('workbench.parts.statusbar')
  const editor = document.getElementById('workbench.parts.editor')
  const terminal = document.getElementById('terminal')

  document
    .querySelector(
      'div.monaco-grid-view > div > div > div.monaco-scrollable-element.mac > div.split-view-container',
    )
    .appendChild(document.getElementById('workbench.parts.statusbar'))

  document
    .getElementById('workbench.parts.sidebar')
    .appendChild(document.getElementById('workbench.parts.activitybar'))

  const windowFix = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (
        entry.target === sidebar ||
        entry.target === auxiliarybar ||
        entry.target === editor ||
        entry.target === terminal
      ) {
        statusbar.style.marginLeft =
          window.getComputedStyle(sidebar).width
        titlebar.style.marginLeft =
          window.getComputedStyle(sidebar).width
        statusbar.style.width = window.getComputedStyle(editor).width
        titlebar.style.width = statusbar.style.width
        statusbar.style.marginRight =
          window.getComputedStyle(auxiliarybar).width
        titlebar.style.marginRight = statusbar.style.marginRight
        if (window.getComputedStyle(terminal).height !== 'auto') {
          statusbar.style.bottom =
            window.getComputedStyle(terminal).height
          statusbar.style.marginBottom = '-25px'
        } else {
          statusbar.style.bottom = '0'
          statusbar.style.marginBottom = '0'
        }
      }
    }
  })
  windowFix.observe(sidebar)
  windowFix.observe(editor)
}, 5000)
