setTimeout(function () {
  document
    .querySelector('div.monaco-scrollable-element.mac > div.split-view-container')
    .appendChild(document.getElementById('workbench.parts.statusbar'))
  document.querySelector('.monaco-workbench .part.basepanel.bottom').id = 'terminal'
  document.querySelector("#workbench\\.parts\\.titlebar > div > div.titlebar-center > div").id = 'window-title'
  windowTitleContent = document.querySelector("#workbench\\.view\\.explorer > div > div > div.monaco-scrollable-element.mac > div.split-view-container > div:nth-child(1) > div > div.pane-header.expanded > h3").innerHTML


  const windowTitle = document.getElementById('window-title')
  windowTitle.innerHTML = windowTitleContent
  // windowTitle.append(
  //   document.querySelector("#status\\.scm\\.0")
  // )

  const sidebar = document.getElementById('workbench.parts.sidebar')
  const auxiliarybar = document.getElementById('workbench.parts.auxiliarybar')
  const titlebar = document.getElementById('workbench.parts.titlebar')
  const statusbar = document.getElementById('workbench.parts.statusbar')
  const editor = document.getElementById('workbench.parts.editor')
  const terminal = document.getElementById('terminal')

  const windowFix = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (
        entry.target === sidebar ||
        entry.target === auxiliarybar ||
        entry.target === editor ||
        entry.target === terminal ||
        entry.target === newActivitybar
      ) {
        statusbar.style.marginLeft = window.getComputedStyle(sidebar).width
        titlebar.style.marginLeft = window.getComputedStyle(sidebar).width
        statusbar.style.width = window.getComputedStyle(editor).width
        titlebar.style.width = statusbar.style.width
        statusbar.style.marginRight = window.getComputedStyle(auxiliarybar).width
        titlebar.style.marginRight = statusbar.style.marginRight

        if (window.getComputedStyle(terminal).height !== 'auto') {
          statusbar.style.bottom = window.getComputedStyle(terminal).height
          statusbar.style.marginBottom = '-26px'
        } else {
          statusbar.style.bottom = '0'
          statusbar.style.marginBottom = '0'
        }
      }
    }
  })
  windowFix.observe(sidebar)
  windowFix.observe(editor)
}, 6000)

setTimeout(function () {
  document.querySelector("#workbench\\.parts\\.sidebar > div.composite.title").innerHTML = ''
  document.querySelector('#workbench\\.parts\\.sidebar > div.composite.title').id = 'newActivitybar'

  const newActivitybar = document.getElementById('newActivitybar')

  document.querySelector("#anweber\\.statusbar-commands\\.sbc_explorer").id = 'explorer-button'
  document.querySelector("#anweber\\.statusbar-commands\\.sbc_debug").id = 'debug-button'
  document.querySelector("#anweber\\.statusbar-commands\\.sbc_extensions").id = 'extensions-button'

  const activityBarExplorerBtn = document.getElementById('explorer-button')
  const activityBarDebugBtn = document.getElementById('debug-button')
  const activityBarExtensionsBtn = document.getElementById('extensions-button')


  document.getElementById('workbench.view.debug')
  document.getElementById('workbench.view.extensions')

  const appendActivityBar = (e) => {
    newActivitybar.append(e)
  }

  appendActivityBar(activityBarExplorerBtn)
  appendActivityBar(activityBarDebugBtn)
  appendActivityBar(activityBarExtensionsBtn)

  const activeIconColor = (icon) => {
    const activeColor = '#7c9ddc'
    const inactiveColor = '#737576'
    activityBarExplorerBtn.firstChild.firstChild.style.color = inactiveColor
    activityBarDebugBtn.firstChild.firstChild.style.color = inactiveColor
    activityBarExtensionsBtn.firstChild.firstChild.style.color = inactiveColor

    if (document.getElementById('workbench.view.explorer')) {
      activityBarExplorerBtn.firstChild.firstChild.style.color = activeColor
    } else if (document.getElementById('workbench.view.debug')) {
      activityBarDebugBtn.firstChild.firstChild.style.color = activeColor
    } else if (document.getElementById('workbench.view.extensions')) {
      activityBarExtensionsBtn.firstChild.firstChild.style.color = activeColor
    }
  }

  activityBarExplorerBtn.addEventListener("click", activeIconColor, false)
  activityBarDebugBtn.addEventListener("click", activeIconColor, false)
  activityBarExtensionsBtn.addEventListener("click", activeIconColor, false)

}, 7000)
