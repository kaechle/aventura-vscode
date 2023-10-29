setTimeout(function () {
    window.innerHeight = window.innerHeight + 55

    document.querySelector(
        '.monaco-scrollable-element .monaco-scrollable-element > div'
    ).id = 'main-window'
    document.querySelector(
        '.mac > div.split-view-container > div:nth-child(3) > div > div > div.sash-container > div:nth-child(2)'
    ).id = 'sash-right'
    document.querySelector('#workbench\\.parts\\.auxiliarybar').id =
        'auxiliarybar'
    document.querySelector(
        '#main-window > div:nth-child(3) > div > div > div.monaco-scrollable-element.mac > div.split-view-container > div:nth-child(2)'
    ).id = 'term'

    document.querySelector(
        '#workbench\\.parts\\.editor > div.content > div > div > div > div > div.monaco-scrollable-element.mac > div.split-view-container > div > div > div.title'
    ).id = 'tabgroup'
    let tabs = document.getElementById('tabgroup')
    let crumbsLow = document.querySelector('.breadcrumbs.dirty')
    let statusbar = document.getElementById('workbench.parts.statusbar')
    let sidebar = document.getElementById('workbench.parts.sidebar')
    let auxbar = document.getElementById('workbench.parts.auxiliarybar')
    let editor = document.getElementById('workbench.parts.editor')
    let terminal = document.getElementById('term')

    const windowFix = new ResizeObserver((entries) => {
        for (const entry of entries) {
            if (entry.target === editor) {
                statusbar.style.marginLeft =
                    window.getComputedStyle(sidebar).width
                statusbar.style.width = window.getComputedStyle(editor).width
            }

            if (entry.target === sidebar) {
                if (sidebar.style.width === 'auto') {
                    tabs.children[0].style.paddingLeft = '75px'
                }
            }

            if (entry.target === terminal) {
                statusbar.style.marginBottom =
                    window.getComputedStyle(terminal).height
            }
        }
    })
    windowFix.observe(editor)
    windowFix.observe(tabgroup)
    windowFix.observe(terminal)
}, 5000)
