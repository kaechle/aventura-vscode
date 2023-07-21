"use strict";

var C = Object.create; var l = Object.defineProperty; var w = Object.getOwnPropertyDescriptor; var I = Object.getOwnPropertyNames; var B = Object.getPrototypeOf, x = Object.prototype.hasOwnProperty; var b = (i, t) => { for (var e in t) l(i, e, { get: t[e], enumerable: !0 }) }, f = (i, t, e, s) => { if (t && typeof t == "object" || typeof t == "function") for (let n of I(t)) !x.call(i, n) && n !== e && l(i, n, { get: () => t[n], enumerable: !(s = w(t, n)) || s.enumerable }); return i }; var u = (i, t, e) => (e = i != null ? C(B(i)) : {}, f(t || !i || !i.__esModule ? l(e, "default", { value: i, enumerable: !0 }) : e, i)), k = i => f(l({}, "__esModule", { value: !0 }), i); var y = {}; b(y, { activate: () => T }); module.exports = k(y); var g = u(require("vscode")); var c = u(require("vscode")); var r = u(require("vscode")); var o = u(require("vscode")), p = { "activeTextEditor|": i => { let t = o.window.activeTextEditor; if (t) switch (i) { case "document": return t.document; case "visibleRanges": return t.visibleRanges; case "selection": return t.selection; case "selections": return t.selections; case "viewColumn": return t.viewColumn; default: return t }return t }, "activeDocument|": i => { var e; let t = (e = o.window.activeTextEditor) == null ? void 0 : e.document; if (t) switch (i) { case "fileName": return t.fileName; case "languageId": return t.languageId; case "uri": return t.uri; default: return t }return t }, "float|": i => Number.parseFloat(i), "json|": i => JSON.parse(i), "number|": i => Number.parseInt(i, 10), "range|": i => { let t = i.split(","); return t.length === 4 ? new o.Range(+t[0], +t[1], +t[2], +t[3]) : i }, "position|": i => { let t = i.split(","); return t.length === 2 ? new o.Position(+t[0], +t[1]) : i }, "uri|": i => o.Uri.file(i.slice(4)) }; var h = class {
  constructor(t, e, s) { this.config = t; this.runInNewContext = e; this.log = s; this.eventDisposables = []; this.textEditorVisible = !0; this.taskVisible = !0; let n = r.StatusBarAlignment.Left; t.alignment === "right" && (n = r.StatusBarAlignment.Right), t.id ? this.statusBarItem = r.window.createStatusBarItem(t.id, n, t.priority) : this.statusBarItem = r.window.createStatusBarItem(n, t.priority), this.statusBarItem.accessibilityInformation = t.accessibilityInformation, this.statusBarItem.name = t.name, this.statusBarItem.text = t.text, this.statusBarItem.tooltip = t.tooltip, this.statusBarItem.color = this.createThemeColor(t.color), this.statusBarItem.backgroundColor = this.createThemeColor(t.backgroundColor), this.initCommand(t) } static async create(t, e, s) { let n = new h(t, e, s); return await n.initEvents(), n.visibleChanged(), n } async initEvents() { await this.registerTaskFilter(), this.listensToActiveTextEditorChange && (this.eventDisposables.push(r.window.onDidChangeActiveTextEditor(this.onDidChangeActiveTextEditor, this)), this.onDidChangeActiveTextEditor(r.window.activeTextEditor)), await this.registerScriptFilter() } async registerScriptFilter() { if (this.config.scriptEvents && (this.config.script || this.config.scriptFile)) { let t = async () => { var e; if (this.resetEvents(), this.config.scriptFile) { try { this.config.script = Buffer.from(await r.workspace.fs.readFile(r.Uri.file(this.config.scriptFile))).toString("utf-8") } catch (n) { this.log(`Error reading File ${this.config.scriptFile}`), this.log(n) } let s = r.workspace.createFileSystemWatcher(this.config.scriptFile); this.eventDisposables.push(s.onDidChange(t, this)), this.eventDisposables.push(s) } this.registerScriptEvents() || (e = this.statusBarItem) == null || e.hide() }; await t() } } async registerTaskFilter() { if (this.config.filterTasks) { let t = await r.tasks.fetchTasks(), e = new RegExp(this.config.filterTasks, "u"); this.taskVisible = await t.some(s => e.test(s.name)), this.eventDisposables.push(r.workspace.onDidChangeTextDocument(async s => { if (s.document.uri.toString().includes("task.json")) { let n = await r.tasks.fetchTasks(); this.taskVisible = await n.some(a => e.test(a.name)), this.visibleChanged() } })) } } async registerScriptEvents() {
    if (this.runInNewContext && this.config.scriptEvents && this.config.script) {
      let t = `
      (function(){
        async function runScript(event){
          try{
            let workspaceFolder = undefined;
            let documentUri = vscode.window.activeTextEditor?.document.uri;
            if(documentUri){
              workspaceFolder = vscode.workspace.getWorkspaceFolder(documentUri)?.uri;
            }
            ${typeof this.config.script == "string" ? this.config.script : this.config.script.join(`
`)}
            validateStatusBarItem();
          }catch(err){
            log(err);
          }
        }
        disposables.push(${this.config.scriptEvents.map(e => `${e}(runScript)`).join(", ")});
        exports.result = runScript();
      })();
      `; try { let e = {}; return this.runInNewContext(t, { disposables: this.eventDisposables, statusBarItem: this.statusBarItem, validateStatusBarItem: this.validateStatusBarItem.bind(this), log: this.log, vscode: r, exports: e }), e.result && await e.result, !0 } catch (e) { this.log("error while registering event", e) }
    } return !1
  } validateStatusBarItem() { this.statusBarItem && (this.statusBarItem.text = this.getSafeString(this.statusBarItem.text, "$(question)"), this.statusBarItem.tooltip = this.getSafeString(this.statusBarItem.tooltip, ""), this.statusBarItem.color = this.createThemeColor(this.statusBarItem.color), this.statusBarItem.backgroundColor = this.createThemeColor(this.statusBarItem.backgroundColor)) } getSafeString(t, e) { return typeof t != "undefined" ? typeof t != "string" ? `${t}` : t : e } createThemeColor(t) { if (t) { if (typeof t == "string") { if (t.startsWith("theme:")) return new r.ThemeColor(t.slice(6)); if (t === "statusBarItem.errorBackground") return new r.ThemeColor("statusBarItem.errorBackground"); if (t === "statusBarItem.warningBackground") return new r.ThemeColor("statusBarItem.warningBackground") } return t } } initCommand(t) { this.statusBarItem && (t.arguments ? this.statusBarItem.command = { title: t.text, command: t.command, arguments: t.arguments.map(e => { if (typeof e == "string") { for (let [s, n] of Object.entries(p)) if (e.startsWith(s)) return n(e.slice(s.length)) } return e }) } : this.statusBarItem.command = t.command) } get listensToActiveTextEditorChange() { return !!this.config.filterLanguageId || !!this.config.filterFileName || !!this.config.filterFilepath || !!this.config.filterText || !!this.config.include || !!this.config.exclude } onDidChangeActiveTextEditor(t) { var s, n; let e = !0; if (this.statusBarItem) if (t && t.document) { this.testRegex(this.config.filterLanguageId, this.config.filterLanguageIdFlags, t.document.languageId) || (this.log(`${this.statusBarItem.id || this.statusBarItem.command} does not match filterLanguageId: ${t.document.languageId}!=${this.config.filterLanguageId}`), e = !1), this.testRegex(this.config.filterFileName, this.config.filterFileNameFlags, t.document.fileName) || (this.log(`${this.statusBarItem.id || this.statusBarItem.command} does not match filterFileName: ${t.document.fileName}!=${this.config.filterFileName}`), e = !1), this.testRegex(this.config.filterFilepath, this.config.filterFilepathFlags, t.document.uri.fsPath) || (this.log(`${this.statusBarItem.id || this.statusBarItem.command} does not match filterFilepath: ${t.document.uri.fsPath}!=${this.config.filterFilepath}`), e = !1), this.testRegex(this.config.filterText, this.config.filterTextFlags, t.document.getText()) || (this.log(`${this.statusBarItem.id || this.statusBarItem.command} does not match filterText`), e = !1); let a = (n = (s = t == null ? void 0 : t.document) == null ? void 0 : s.uri) == null ? void 0 : n.toString(); this.testRegex(this.config.include, this.config.includeFlags, a) || (this.log(`${this.statusBarItem.id || this.statusBarItem.command} does not match include: ${a}`), e = !1), this.config.exclude && this.testRegex(this.config.exclude, this.config.excludeFlags, a) && (this.log(`${this.statusBarItem.id || this.statusBarItem.command} does not match exclude: ${a}`), e = !1) } else (this.config.filterFileName || this.config.filterFilepath || this.config.filterLanguageId || this.config.filterText || this.config.include) && (e = !1); this.textEditorVisible = e, this.visibleChanged() } visibleChanged() { this.textEditorVisible && this.taskVisible ? this.statusBarItem.show() : this.statusBarItem.hide() } testRegex(t, e, s) { return !t || s && RegExp(t, e || "u").test(s) } resetEvents() { for (let t of this.eventDisposables) t.dispose(); this.eventDisposables = [] } dispose() { this.statusBarItem && this.statusBarItem.dispose(), this.resetEvents() }
}; var m = class { constructor(t) { this.runInNewContext = t; this.commands = []; this.prevConfig = ""; this.configChangeDisposable = c.workspace.onDidChangeConfiguration(this.onChangeConfiguration, this), this.changeActiveTextEditorDisposable = c.window.onDidChangeActiveTextEditor(this.onChangeTextEditor, this), this.init(c.window.activeTextEditor) } async init(t) { var a; let e = c.workspace.getConfiguration("statusbar_command", (a = t == null ? void 0 : t.document) == null ? void 0 : a.uri), s = [...e.get("commands") || [], ...e.get("applicationCommands") || []], n = JSON.stringify(s); if (this.prevConfig !== n && (this.prevConfig = n, this.disposeCommands(), this.commands = [], s)) for (let v of s) this.commands.push(await h.create(v, this.runInNewContext, this.log.bind(this))) } async onChangeConfiguration(t) { t.affectsConfiguration("statusbar_command") && await this.init(c.window.activeTextEditor) } async onChangeTextEditor(t) { await this.init(t) } log(...t) { this.logChannel || (this.logChannel = c.window.createOutputChannel("statusbarcommands")); for (let e of t) e !== void 0 && (typeof e == "string" ? this.logChannel.appendLine(e) : this.isError(e) ? (this.logChannel.appendLine(`${e.name} - ${e.message}`), e.stack && this.logChannel.appendLine(e.stack)) : this.logChannel.appendLine(`${JSON.stringify(e, null, 2)}`)) } isError(t) { if (!t) return !1; if (t instanceof Error) return !0; let e = t; return !!e.message && !!e.stack && !!e.name } disposeCommands() { if (this.commands) { for (let t of this.commands) try { t.dispose() } catch (e) { this.log(e) } this.commands = [] } } dispose() { this.disposeCommands(), this.logChannel && (this.logChannel.dispose(), delete this.logChannel), this.configChangeDisposable.dispose(), this.changeActiveTextEditorDisposable.dispose() } }; var d = u(require("vm")); function T(i) { i.subscriptions.push(new m((t, e) => { g.workspace.isTrusted ? d.runInContext(t, d.createContext(Object.assign(Object.defineProperties({ ...global }, Object.getOwnPropertyDescriptors(global)), { vscode: g, require }, e))) : d.runInNewContext(t, e) })) } 0 && (module.exports = { activate });
//# sourceMappingURL=extension.js.map
