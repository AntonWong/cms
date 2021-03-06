﻿//Core
function js() { this.__VERSION__ = '3.1'; this.__WORKPATH__ = ''; this.__Extend_PROTOTYPE__ = true } js.prototype = { __init__: function () { if (this.__Extend_PROTOTYPE__) { this.__extendingJsPrototype__() } var f = document.getElementsByTagName('SCRIPT'); var s = f[f.length - 1]; var g = s.src; this.__WORKPATH__ = g.replace(/(\/)[^/]+$/, '$1'); if (!document.getElementsByClassName) { document.getElementsByClassName = function (a, b) { if (b && !b.nodeName) { b = document.getElementById(b) } var c = (b || document).getElementsByTagName('*'); var d = new RegExp('\\s' + a + '\\s'); var e = []; for (var i = 0, j; j = c[i]; i++) { if (d.test(' ' + j.className + ' ')) e.push(j) } return e } } if (typeof (HTMLElement) != "undefined") { HTMLElement.prototype.contains = function (a) { while (a != null && typeof (a.tagName) != "undefind") { if (a == this) return true; a = a.parentNode } return false } } if (!window.toJson) { window.toJson = function (a) { if (!a) return null; if (window.JSON) { try { return JSON.parse(a) } catch (ex) { } } return eval('(' + a + ')') } } }, __extendingJsPrototype__: function () { String.prototype.len = function (a) { return this.replace(a ? /[\u0391-\uFFE5]/g : /[^x00-xff]/g, "00").length }; Date.prototype.format = function (a) { var o = { "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, "H+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S": this.getMilliseconds() }; var b = { "0": "/u65e5", "1": "/u4e00", "2": "/u4e8c", "3": "/u4e09", "4": "/u56db", "5": "/u4e94", "6": "/u516d" }; if (/(y+)/.test(a)) { a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)) } if (/(E+)/.test(a)) { a = a.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + b[this.getDay() + ""]) } for (var k in o) { if (new RegExp("(" + k + ")").test(a)) { a = a.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))) } } return a } }, extend: function (a) { if (a && a instanceof Object) { for (var b in a) { if (this[b] == undefined) { this[b] = a[b] } } } }, dom: { fitHeight: function (e, a) { var b = e.parentNode; var c = e.nextSibling; var d = /;(\s*)height:(.+);/ig; var f = (b == document.body ? Math.max(document.body.clientHeight, document.documentElement.clientHeight) : b.offsetHeight) - e.offsetTop; while (c) { if (c.nodeName[0] != '#') { f -= c.offsetHeight } c = c.nextSibling } f -= a || 0; if (d.test(e.style.cssText)) { e.style.cssText = e.style.cssText.replace(d, '; height:' + f + 'px;') } else { e.style.cssText += 'height:' + f + 'px;' } }, $: function (a, b, c) { var e = a.nodeName ? a : document.getElementById(a || ''); if (!e) throw a.nodeName ? 'object refrence null' : 'element ' + a + ' not exits!'; if (!b) return e; e = e.getElementsByTagName(b); if (!c) return e; var d = new []; var f; for (var i = 0; i < e.length; i++) { var g = true; for (var j in c) { switch (j) { case "className": f = e[i].getAttribute("class") ? "class" : "className"; break; default: f = j; break } if (e[i].getAttribute(f) != c[j]) g = false; if (g) d.push(e[i]) } } return d } }, $: function (a, b, c) { return this.dom.$(a, b, c) }, getElementsByClassName: function (a, b) { a = a || document; return a.getElementsByClassName ? a.getElementsByClassName(b) : document.getElementsByClassName(b, a) }, each: function (a, b) { if (a) { for (var i = 0; i < a.length; i++) b(i, a[i]) } }, style: function (a) { var e = a.nodeName ? a : document.getElementById(a); if (e) { return e.currentStyle || document.defaultView.getComputedStyle(e, null) } return null }, request: function (a, b) { var c = new RegExp('(\\?|&)' + a + '=([^&]+)&*').exec(b ? b : location.href); return c ? c[2] : '' }, supportHTML5: navigator.geolocation != null, template: function (a, b) { if (b instanceof Object) { var c = new RegExp(); for (var n in b) { c.compile('%' + n + '%|\{' + n + '\}', 'g'); a = a.replace(c, b[n]) } } return a }, screen: { width: function () { return Math.max(document.body.clientWidth, document.documentElement.clientWidth) }, height: function () { return Math.max(document.body.clientHeight, document.documentElement.clientHeight) }, offsetWidth: function () { return Math.max(document.body.offsetWidth, document.documentElement.offsetWidth) }, offsetHeight: function () { return Math.max(document.body.offsetHeight, document.documentElement.offsetHeight) } }, event: { add: function (a, c, d, b) { if (!a.attachEvent && !a.addEventListener) { alert('event error! parameter:' + ele + ',event:' + c); return } document.attachEvent ? a.attachEvent('on' + c, d) : a.addEventListener(c, d, b) }, remove: function (a, c, d, b) { document.detachEvent ? a.detachEvent('on' + c, d) : a.removeEventListener(c, d, b) }, src: function (a) { var e = a ? a : window.event; return e.target || e.srcElement }, stopBubble: function (a) { var e = a ? a : window.event; if (window.event) { e.cancelBubble = true } else { e.stopPropagation() } }, preventDefault: function (a) { if (window.event) { window.event.returnvalue = false; return false } else { a.preventDefault(); return false } } }, xhr: { max_request: 2, http_stack: null, proc_stack: [], init: function () { if (this.http_stack) return; this.http_stack = []; for (var i = 0; i < this.max_request; i++) { this.http_stack[i] = { state: 0, http: window.XMLHttpRequest ? new XMLHttpRequest() : (new ActiveXObject("MSXML2.XMLHTTP") || new ActiveXObject("MICROSOFT.XMLHTTP")) } } }, request: function (d, e) { this.init(); var f = { uri: d.uri || location.href, params: d.params, method: (d.method || "GET").toUpperCase(), async: d.async == false ? false : d.async || true, data: (d.data || 'text').toLowerCase(), random: d.random == false ? false : d.random || true, call: e }; if (d.params instanceof Object) { var g = 0; f.params = ''; for (var i in d.params) { if (g++ != 0) { f.params += '&' } f.params += i + '=' + encodeURIComponent(d.params[i]) } } if (f.call.start != null) f.call.start(); if (f.method != "POST" && f.random) { if (f.uri.indexOf('#') == -1) { if (f.uri.indexOf("?") == -1) f.uri += "?t=" + Math.random(); else f.uri += "&t=" + Math.random() } } var h = function (a, b, c) { a.state = 1; a.http.open(c.method, c.uri, c.async); a.http.onreadystatechange = function () { if (a.http.readyState == 4) { if (a.http.status == 200) { if (c.call.success) { a.state = 0; b.proc_stack.pop(); c.call.success(c.data == "text" ? a.http.responseText : (c.data == 'json' ? window.toJson(a.http.responseText) : a.http.responseXML)) } } else if (c.call.error) { a.state = 0; b.proc_stack.pop(); c.call.error(a.http.responseText) } } }; if (c.method == "POST") a.http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); a.http.send(c.params) }; (function (a, b) { var t = setInterval(function () { if (a.proc_stack.length < a.max_request) { a.proc_stack.push(0); for (var i = 0; i < a.max_request; i++) { if (a.http_stack[i].state == 0) { h(a.http_stack[i], a, b); break } } clearInterval(t) } }, 20) }(this, f)) }, get: function (a, b, c) { this.request(a instanceof Object ? a : { uri: a }, { success: function (x) { if (b) b(x) }, error: function (x) { if (c) c(x) } }) }, post: function (a, b, c, d) { this.request({ uri: a, method: 'POST', params: b }, { success: function (x) { if (c) c(x) }, error: function (x) { if (d) d(x) } }) }, jsonPost: function (b, c, d, e) { b += ((b || location.href).indexOf('?') == -1 ? '?' : '&') + 'json=1'; this.request({ uri: b, params: c, method: 'POST', data: 'json' }, { success: function (a) { if (d) d(a) }, error: function (a) { if (e) e(a) } }) } }, cookie: { write: function (a, b, c) { var d = ""; if (c) { d = new Date((new Date()).getTime() + c); d = "; expires=" + d.toGMTString() } document.cookie = a + "=" + escape(b) + d }, remove: function (a) { var b = new Date(); b.setTime(b.getTime() - 1); document.cookie = a + "=; expires=" + b.toGMTString() }, read: function (a) { var b = ""; var c = a + "="; if (document.cookie.length > 0) { var d = document.cookie.indexOf(c); if (d != -1) { d += c.length; var e = document.cookie.indexOf(";", d); if (e == -1) e = document.cookie.length; b = unescape(document.cookie.substring(d, e)) } } return b } }, json: { prefix: 'field', _objReg: /(.+)\[([^\]]+)\]/, _dtReg: /^(\d{4}((\/|-)\d{2}){2})T(\d{2}(:\d{2}){2})((\.\d+)*)$/i, _each: function (a, b) { for (var i = 0; i < a.length; i++) { if (b) b(i, a[i]) } }, _getFields: function (b) { var c = this.prefix; var d = {}; var f; var g, subProName, proValue; if (!b.nodeName) b = document.getElementById(b); var h = this._objReg; this._each(b.getElementsByTagName('*'), function (i, e) { if (e.nodeName != '#text' && e.nodeName != '#comment') { g = e.getAttribute(c); if (g) { if (h.test(g)) { var a = h.exec(g); g = a[1]; subProName = a[2]; if (d[g] == null) { d[g] = {} } d[g][subProName] = e } else { d[g] = e } if (!e.name) e.setAttribute('name', c + '_' + g) } } }); return d }, _bindField: function (a, b) { if (this._dtReg.test(b)) { var c = this._dtReg.exec(b); if (c[4] == '00:00:00') { b = b.replace(this._dtReg, '$1') } else { b = b.replace(this._dtReg, '$1 $4') } } switch (a.nodeName) { case 'TEXTAREA': case 'INPUT': switch (a.type) { default: a.value = b; break; case "radio": var d = document.getElementsByName(a.name); for (var i = 0; i < d.length; i++) { if (d[i].value == b) { d[i].setAttribute('checked', 'checked'); break } } break; case 'checkbox': var e = false; if ((b == true && b.toString() != '1') || b == a.value) { e = true } else if (b.length) { for (var i in b) { if (b[i] == a.value) { e = true; break } } } if (e) { a.setAttribute('checked', 'checked') } else { a.removeAttribute('checked') } break } break; case 'IMG': a.src = b; break; case 'SELECT': a.value = b; break; default: a.innerHTML = b; break } }, _getFieldVal: function (a) { var b = ''; switch (a.nodeName) { case 'TEXTAREA': case 'INPUT': switch (a.type) { default: b = a.value.replace('\'', '\\\''); break; case 'radio': var c = document.getElementsByName(a.name); for (var i = 0; i < c.length; i++) { if (c[i].checked) { b = c[i].value; break } } break; case 'checkbox': b = a.checked ? a.value : ''; break } break; case 'IMG': b = a.src; break; case 'SELECT': b = a.selectedIndex == -1 ? '' : a.options[a.selectedIndex].value; break; default: b = a.innerHTML.replace('\'', '\\\''); break } return b }, bind: function (a, b, c) { var d; var e; var f; d = this._getFields(a); for (var g in d) { e = d[g]; if (c && c instanceof Function) { f = c(g, b[g]) } else { f = b[g] } if (f != null) { if (f instanceof Object) { if (f.length) { for (var i in e) { this._bindField(e[i], f) } } else { for (var i in f) { if (e[i]) { this._bindField(e[i], f[i]) } } } continue } this._bindField(e, f) } } }, __convert: function (a, b, c) { var d; var e; var f; var g = {}; var h = ''; d = this._getFields(a); for (var k in d) { e = d[k]; if (e.nodeName) { f = this._getFieldVal(e); if (c && c instanceof Function) { f = c(k, f) } g[k] = f; h += k + '=' + f + '&' } else { g[k] = {}; var j = 0; var l = false; for (var i in e) { if (j++ == 0 && /^\d+$/.test(i)) { g[k] = []; l = true } if (e[i]) { f = this._getFieldVal(e[i]); if (c && c instanceof Function) { f = c(k, f) } if (f && f != '') { if (l) { g[k].push(f) } else { g[k][i] = f } } h += k + '[' + i + ']=' + f + '&' } } } } return b == "object" ? g : h.replace(/&$/g, '') }, toObject: function (a) { return this.__convert(a, 'object') }, toQueryString: function (a) { return this.__convert(a, 'string') }, toString: function (a) { return this.__convert(a, 'string').replace(/&/g, ';').replace(/=/g, ':') }, tostr: function (o) { var a = this; var b = []; var c = function (s) { if (typeof s == 'object' && s != null) a.tostr(s); return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s }; for (var i in o) { val = c(o[i]); if (val.pop) { b.push("'" + i + "':[\'" + escape(val.join('\',\'')) + '\']') } else { b.push("'" + i + "':" + escape(val)) } } return '{' + escape(b.join(',')) + '}' } }, getPosition: function (e) { return (e.nodeName ? e : this.$(e)).getBoundingClientRect() }, loadHTML: function (a, b) { var c = /<body[^>]*>([\s\S]+)<\/body>/im; var d = /<script((.|\n)*?)>([\s\S]*?)<\/script>/gim; var f = b.match(c); if (f == null) { f = ['', b] } if (!a.nodeName) a = this.dom.$(a); if (a) { try { a.innerHTML = f[1].replace(d, '').replace(/<style([^>]+)>/ig, '<span style="display:none" class=\"forie\">_</span><style$1>'); this.each(a.getElementsByClassName ? a.getElementsByClassName('forie') : document.getElementsByClassName('forie', a), function (i, e) { a.removeChild(e) }); if (window.navigator.userAgent.indexOf('Chrome') != -1) { this.each(a.getElementsByTagName('STYLE'), function (i, e) { a.removeChild(e); document.getElementsByTagName('HEAD')[0].appendChild(e) }) } } catch (ex) { if (window.console) { console.log(ex.message) } } } var g = /^[\n\s]+$/g; var h = /type=["']*text\/javascript["']*/i; var j; d.lastIndex = 0; while ((j = d.exec(b)) != null) { if (j[1].indexOf(' type=') == -1 || h.test(j[1])) { if (!g.test(j[3])) { this.eval(j[3]) } } } }, load: function (c, d, e, f) { (function (b) { b.xhr.get(d, function (a) { b.loadHTML(c, a); if (e) { e(a) } }, f) }(this)) }, ld: function (c, d) { (function (j, b) { j.xhr.get({ uri: b + c + '.js', async: false, random: false }, function (a) { j.eval(a) }) }(this, d || this.__WORKPATH__)) }, toJson: function (a) { return window.toJson(a) }, eval: function (a) { if (!a) return a; if (window.execScript) { window.execScript(a) } else { var b = document.createElement('SCRIPT'); b.setAttribute('type', 'text/javascript'); b.text = a; document.head.appendChild(b); document.head.removeChild(b) } return a } }; js.plugin = js.extend; js.prototype.ie6 = function () { return /MSIE\s*6\.0/.test(window.navigator.userAgent) }; js.prototype.path = function () { var d = document.domain, uri = location.href; d = uri.substring(uri.indexOf(d) + d.length); return d.substring(d.indexOf("/")) }; js.prototype.val = function (a, b) { if (!b) return document.getElementById(a).value; else document.getElementById(a).value = b }; js.prototype.lazyRun = function (a, b) { if (a) { setTimeout(a, b || 120) } }; js.prototype.hover = function (e, a, b) { if (!e.nodeName) e = this.$(e); var c = this.ie6(); this.event.add(e, 'mouseover', (function (t) { return function () { if (c) t.className += ' hover'; if (a) a(t) } })(e)); this.event.add(e, 'mouseout', (function (t) { return function () { if (c) t.className = t.className.replace(' hover', ''); if (b) b(t) } })(e)) }; js.prototype.ldScript = function (a, b, c) { var d = null; var e = document.documentElement.getElementsByTagName("HEAD"); if (e.length != 0) d = e[0]; else d = document.body; var f = d.getElementsByTagName('SCRIPT'); var g = false; for (var i = 0; i < f.length; i++) { if (f[i].getAttribute('src') && f[i].getAttribute('src').toLowerCase() == a.toLowerCase()) { g = true } } if (!g) { var h = document.createElement('SCRIPT'); if (b) h.onreadystatechange = h.onload = b; if (c) h.onerror = c; h.setAttribute('type', 'text/javascript'); h.setAttribute('src', a); d.appendChild(h) } }; window.$JS = new js(); window.$JS.__init__(); window.J = $JS;
function HS_DateAdd(a, b, c) { b = parseInt(b); if (typeof (c) == "string") { var c = new Date(c.split("-")[0], c.split("-")[1], c.split("-")[2]) } if (typeof (c) == "object") { var c = c } switch (a) { case "y": return new Date(c.getFullYear() + b, c.getMonth(), c.getDate()); break; case "m": return new Date(c.getFullYear(), c.getMonth() + b, checkDate(c.getFullYear(), c.getMonth() + b, c.getDate())); break; case "d": return new Date(c.getFullYear(), c.getMonth(), c.getDate() + b); break; case "w": return new Date(c.getFullYear(), c.getMonth(), 7 * b + c.getDate()); break } } function checkDate(a, b, c) { var d = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"]; var e = ""; if (a % 4 == 0) { d[1] = "29" } if (c > d[b]) { e = d[b] } else { e = c } return e } function WeekDay(a) { var b; if (typeof (a) == "string") { b = new Date(a.split("-")[0], a.split("-")[1], a.split("-")[2]) } if (typeof (a) == "object") { b = a } return b.getDay() } function HS_calender() { var a = ""; var b = ""; b += "<style type='text/css'>"; b += ".calender {width:170px; height:auto; font-size:12px; margin-right:14px; background:#fff; border:1px solid #6699cc; padding:1px}"; b += ".calender ul {list-style-type:none; margin:0; padding:0;}"; b += ".calender .day { background-color:#EDF5FF; height:20px;}"; b += ".calender .day li,.calender .date li{ float:left; width:14%; height:20px; line-height:20px; text-align:center}"; b += ".calender li a { text-decoration:none; font-family:Tahoma; font-size:11px; color:#333}"; b += ".calender li a:hover { color:#f30; text-decoration:underline}"; b += ".calender li a.hasArticle {font-weight:bold; color:#f60 !important}"; b += ".lastMonthDate, .nextMonthDate {color:#bbb;font-size:11px}"; b += ".selectThisYear a, .selectThisMonth a{text-decoration:none; margin:0 2px; color:#000; font-weight:bold}"; b += ".calender .LastMonth, .calender .NextMonth{ text-decoration:none; color:#000; font-size:18px; font-weight:bold; line-height:16px;}"; b += ".calender .LastMonth { float:left;}"; b += ".calender .NextMonth { float:right;}"; b += ".calenderBody {clear:both}"; b += ".calenderTitle {text-align:center;height:20px; line-height:20px; clear:both}"; b += ".today { background-color:#ffffaa;border:1px solid #f60; padding:2px}"; b += ".today a { color:#f30; }"; b += ".calenderBottom {clear:both; border-top:1px solid #ddd; padding: 3px 0; text-align:left}"; b += ".calenderBottom a {text-decoration:none; margin:2px !important; font-weight:bold; color:#000}"; b += ".calenderBottom a.closeCalender{float:right}"; b += ".closeCalenderBox {float:right; border:1px solid #000; background:#fff; font-size:9px; width:11px; height:11px; line-height:11px; text-align:center;overflow:hidden; font-weight:normal !important}"; b += "</style>"; var c; if (typeof (arguments[0]) == "string") { selectDate = arguments[0].split("-"); var d = selectDate[0]; var e = parseInt(selectDate[1]) - 1 + ""; var f = selectDate[2]; c = new Date(d, e, f) } else if (typeof (arguments[0]) == "object") { c = arguments[0] } var g = HS_DateAdd("d", "-1", c.getFullYear() + "-" + c.getMonth() + "-01").getDate(); var h = WeekDay(c.getFullYear() + "-" + c.getMonth() + "-01"); var k = HS_DateAdd("d", "-1", c.getFullYear() + "-" + (parseInt(c.getMonth()) + 1).toString() + "-01"); var l = k.getDate(); var n = k.getDay(); var o = c; today = o.getFullYear() + "-" + o.getMonth() + "-" + o.getDate(); var p = ''; for (i = 0; i < h; i++) { a = "<li class='lastMonthDate'>" + g + "</li>" + a; g-- } for (i = 1; i <= l; i++) { var m = parseInt(c.getMonth()) + 1; var q = c.getFullYear() + "-" + (m > 10 ? m : '0' + m) + "-" + (i < 10 ? '0' + i : i); if (today == c.getFullYear() + "-" + c.getMonth() + "-" + i) { p = c.getFullYear() + "-" + (parseInt(c.getMonth()) + 1).toString() + "-" + i; a += "<li><a href=javascript:void(0) class='today' onclick='_selectThisDay(this)' title='" + q + "'>" + i + "</a></li>" } else { a += "<li><a href=javascript:void(0) onclick='_selectThisDay(this)' title='" + q + "'>" + i + "</a></li>" } } var j = 1; for (i = n; i < 6; i++) { a += "<li class='nextMonthDate'>" + j + "</li>"; j++ } a += b; var r = "<a href='javascript:void(0)' class='NextMonth' onclick=HS_calender(HS_DateAdd('m',1,'" + c.getFullYear() + "-" + c.getMonth() + "-" + c.getDate() + "'),this) title='Next Month'>&raquo;</a>"; r += "<a href='javascript:void(0)' class='LastMonth' onclick=HS_calender(HS_DateAdd('m',-1,'" + c.getFullYear() + "-" + c.getMonth() + "-" + c.getDate() + "'),this) title='Previous Month'>&laquo;</a>"; r += "<span class='selectThisYear'><a href='javascript:void(0)' onclick='CalenderselectYear(this)' title='Click here to select other year' >" + c.getFullYear() + "</a></span>年<span class='selectThisMonth'><a href='javascript:void(0)' onclick='CalenderselectMonth(this)' title='Click here to select other month'>" + (parseInt(c.getMonth()) + 1).toString() + "</a></span>月"; if (arguments.length > 1) { arguments[1].parentNode.parentNode.getElementsByTagName("ul")[1].innerHTML = a; arguments[1].parentNode.innerHTML = r } else { var s = b + "<div class='calender'><div class='calenderTitle'>" + r + "</div><div class='calenderBody'><ul class='day'><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul><ul class='date' id='thisMonthDate'>" + a + "</ul></div><div class='calenderBottom'><a href='javascript:void(0)' class='closeCalender' onclick='closeCalender(this)'>&times;</a><span><span><a href=javascript:void(0) onclick='_selectThisDay(this)' title='" + p + "'>Today</a></span></span></div></div>"; return s } } function _selectThisDay(d) { var a = d.parentNode.parentNode.parentNode.parentNode.parentNode; a.targetObj.value = d.title; a.parentNode.removeChild(a) } function closeCalender(d) { var a = d.parentNode.parentNode.parentNode; a.parentNode.removeChild(a) } function CalenderselectYear(a) { var b = ""; var c = a.innerHTML; for (i = 1970; i <= 2020; i++) { if (i == c) { b += "<option value=" + i + " selected>" + i + "</option>" } else { b += "<option value=" + i + ">" + i + "</option>" } } b = "<select onblur='selectThisYear(this)' onchange='selectThisYear(this)' style='font-size:11px'>" + b + "</select>"; a.parentNode.innerHTML = b } function selectThisYear(a) { HS_calender(a.value + "-" + a.parentNode.parentNode.getElementsByTagName("span")[1].getElementsByTagName("a")[0].innerHTML + "-1", a.parentNode) } function CalenderselectMonth(a) { var b = ""; var c = a.innerHTML; for (i = 1; i <= 12; i++) { if (i == c) { b += "<option value=" + i + " selected>" + i + "</option>" } else { b += "<option value=" + i + ">" + i + "</option>" } } b = "<select onblur='selectThisMonth(this)' onchange='selectThisMonth(this)' style='font-size:11px'>" + b + "</select>"; a.parentNode.innerHTML = b } function selectThisMonth(a) { HS_calender(a.parentNode.parentNode.getElementsByTagName("span")[0].getElementsByTagName("a")[0].innerHTML + "-" + a.value + "-1", a.parentNode) } function setDate(a) { var b = new Date(); if (a.value != '') { b = new Date(a.value) } var c = document.createElement("span"); c.innerHTML = HS_calender(b); c.style.cssText += "position:absolute;z-index:996;"; c.targetObj = a; a.parentNode.insertBefore(c, a.nextSibling) } $JS.extend({ calender: function (a) { if (!a.nodeName) a = document.getElementById(a); $JS.event.add(a, 'focus', function () { setDate(this) }) }, setDate: function (a) { setDate(a) } });
function simpleDialog(e) { this._simgpleDialog = true; this.window = window; this.win = window; this.doc = null; this.id = new Date().getMilliseconds() + parseInt(Math.random() * 100); this.title = e.title; this.usedrag = e.usedrag; this.style = e.style || 'ui-dialog'; this.setupFade = !e.setupFade ? e.setupFade : true; this.onclose = e.onclose; if (e.cross != false) { while (this.win.parent != this.win) { this.win = this.win.parent } } this.doc = this.win.document; this._inited = false; this.canvas = { width: this.doc.documentElement.clientWidth, height: Math.min(this.doc.documentElement.clientHeight, this.doc.body.clientHeight), maxHeight: Math.max(this.doc.documentElement.clientHeight, this.doc.body.clientHeight) }; this.point = { x: parseInt((this.canvas.width) / 2) + this.doc.documentElement.scrollLeft, y: parseInt((this.canvas.height) / 2) + this.doc.documentElement.scrollTop }; this.fixBoxPosition = function (a) { var b = this.getPanel().getElementsByTagName('DIV')[1]; if (!a) { this.point.x = (this.canvas.width - b.offsetWidth) / 2 + document.documentElement.scrollLeft; this.point.y = (this.canvas.height - b.offsetHeight) / 2 + document.documentElement.scrollTop; b.style.left = this.point.x + 'px'; b.style.top = this.point.y + 'px'; if (this.title && this.usedrag) { new drag(b.getElementsByTagName('div')[0], this.win).start(b) } } else { var c = this; var i = b.offsetWidth; var d = setInterval(function () { c.point.x = (c.canvas.width - b.offsetWidth) / 2 + document.documentElement.scrollLeft; c.point.y = (c.canvas.height - b.offsetHeight) / 2 + document.documentElement.scrollTop; b.style.left = c.point.x + 'px'; b.style.top = c.point.y + 'px'; if (i != b.offsetWidth) { clearInterval(d); if (c.title && c.usedrag) { new drag(b.getElementsByTagName('div')[0], c.win).start(b) } } }, 1) } } } simpleDialog.prototype._initialize = function () { if (this._inited) { return false } var a = this; var b = this.doc; var c = b.createElement('div'); c.id = 'panel_' + a.id; c.className = a.style; b.body.appendChild(c); var d = b.createElement('div'); d.className = 'bglayer'; d.style.cssText = 'z-index:999;position:absolute;top:0;left:0;width:' + a.canvas.width + 'px;height:' + a.canvas.maxHeight + 'px;'; c.appendChild(d); d = b.createElement("DIV"); d.className = 'box'; d.style.cssText = 'z-index:1000;position:absolute;left:' + (a.point.x) + "px;top:" + (a.point.y) + 'px;'; c.appendChild(d); if (a.title) { var e = b.createElement("div"); e.className = 'title'; e.innerHTML = '<span class="left corner" style="position:absolute;left:0;top:0">&nbsp;</span><span class="txt">' + a.title + '<span class="close" onclick="window[\'dialog_' + this.id + '\'].close()" style="position:absolute;right:5px;top:0;text-decoration:none;font-family:Verdana;cursor:pointer" title="关闭窗口"><span>X</span></span></span><span class="right corner" style="position:absolute;right:0;top:0">&nbsp;</span>'; d.appendChild(e); this.win['dialog_' + this.id] = this } var f = b.createElement("DIV"); f.className = 'content boxcontent'; f.id = 'boxcontent_' + this.id; d.appendChild(f); if (a.title) { var g = b.createElement("div"); g.className = 'bottom'; g.style.cssText = "position:relative;"; g.innerHTML = '<span class="left corner" style="position:absolute;left:0;top:0">&nbsp;</span><span class="txt">&nbsp;</span><span class="right corner" style="position:absolute;right:0;top:0">&nbsp;</span>'; d.appendChild(g) } this._inited = true }; simpleDialog.prototype.getPanel = function () { return this.doc.getElementById('panel_' + this.id) }; simpleDialog.prototype.async = function (a, b, c, d, e) { this._initialize(); var f = this.doc.getElementById('boxcontent_' + this.id); if (d) { d(f) } var g = $JS.xhr; var h = this; if (!b || b.toLowerCase() == "get") { g.get(a, function (x) { $JS.loadHTML(f, x); h.fixBoxPosition(true); if (e) e(x) }) } else { g.post(a, c, function (x) { $JS.loadHTML(f, x); h.fixBoxPosition(true); if (e) e(x) }) } }; simpleDialog.prototype.open = function (a, b, c, d) { this._initialize(); var e = this.doc.getElementById('boxcontent_' + this.id); e.innerHTML += "<iframe frameborder='0' scrolling='" + (d || 'no') + "' src='" + a + "' width='" + (b || '100%') + "' style='padding:0' height='" + (c || '100%') + "'></iframe>"; e.style.width = Math.max(e.scrollWidth, b) + 'px'; e.style.height = Math.max(e.scrollHeight, c) + 'px'; this.fixBoxPosition() }; simpleDialog.prototype.write = function (a) { this._initialize(); var b = this.doc.getElementById('boxcontent_' + this.id); if (!this.title) { b.innerHTML = a } else { var c = b.getElementsByTagName('DIV'); for (var i = 1; i < c.length; i++) { b.removeChild(c[i]) } b.innerHTML += a } this.fixBoxPosition() }; simpleDialog.prototype.getFrameWindow = function () { var a = this.getPanel().getElementsByTagName('IFRAME'); if (a.length > 0) { return a[0].contentWindow } return null }; simpleDialog.prototype.close = function (b) { if (this.onclose != null && this.onclose() == false) { return false } var c = 0; var d = this.getPanel(); var e = (function (a) { return function () { a.document.body.removeChild(d); if (b) b() } }(this.win)); try { delete this.win['dialog_' + this.id] } catch (ex) { this.win['dialog_' + this.id] = null } e(); this._inited = false }; function drag(a, b) { this.elem = a; this.win = b } drag.prototype.regist = function (a, b, c, d) { var o = this.elem; a = a ? a : o; var f, sy; var g = this.win == null ? g : this.win.document; o.style.cursor = b || "move"; var h = c || function (e) { e = e || event; window.getSelection ? window.getSelection().removeAllRanges() : g.selection.empty(); if (e.preventDefault) e.preventDefault(); with (a.style) { position = "absolute"; left = e.clientX - f + "px"; top = e.clientY - sy + "px" } }; $JS.event.add(o, "mousedown", function (e) { e = e || event; if (e.button == 1 || e.button == 0) { f = e.clientX - a.offsetLeft; sy = e.clientY - a.offsetTop; $JS.event.add(g, 'mousemove', h, false); $JS.event.add(g, 'mouseup', i, false) } }, false); var i = function () { $JS.event.remove(g, 'mousemove', h, false); $JS.event.remove(g, 'mouseup', i, false); if (d && d instanceof Function) d() } }; drag.prototype.custom = function (a, b, c, d) { return this.regist(a, b, c, d) }; drag.prototype.start = function (a) { this.regist(a, null, null, null) }; var SimpleDialog = { create: function (a) { return new simpleDialog(a) }, create2: function (a, b, c, d, e) { return new simpleDialog({ title: a, usedrag: b || false, cross: c || false, style: e, onclose: d }) }, getDialog: function () { var b = null; var c = /^dialog_/i; var e = window; var f = function (a) { var d = null; for (var i in a) { if (c.test(i) && a[i] != null) { d = a[i]; break } } return d }; do { b = f(e); if (b == null) { e = e.parent; b = f(e) } if (b) { break } } while (e.parent != e); return b }, close: function () { var d = this.getDialog(); if (d) d.close() } }; (function (j) { j.extend({ dialog: window.SimpleDialog, drag: function (a, b) { return new drag(a, b) } }) }($JS));
function datagrid(h, k) { this.panel = h.nodeName ? h : $JS.$(h); this.columns = k.columns; this.idField = k.idField || "id"; this.data_url = k.url; this.data_data = k.data; this.onLoaded = k.loaded; this.loadbox = null; this.gridView = null; this.loading = function () { if (this.gridView.offsetHeight == 0) { var a = this.gridView.previousSibling.offsetHeight; var b = this.panel.offsetHeight - this.gridView.previousSibling.offsetHeight; this.gridView.style.cssText = this.gridView.style.cssText.replace(/(\s*)height:[^;]+;/ig, ' height:' + (b > a ? b + 'px;' : 'auto')); var c = Math.ceil((this.gridView.clientWidth - this.loadbox.offsetWidth) / 2); var d = Math.ceil((this.gridView.clientHeight - this.loadbox.offsetHeight) / 2); this.loadbox.style.cssText = this.loadbox.style.cssText.replace(/(;\s*)*left:[^;]+;([\s\S]*)(\s)top:([^;]+)/ig, '$1left:' + c + 'px;$2 top:' + (d < 0 ? -d : d) + 'px') } this.loadbox.style.display = '' }; this._initLayout = function () { var a = ''; if (this.columns && this.columns.length != 0) { a += '<div class="ui-datagrid-header"><table width="100%" cellspacing="0" cellpadding="0"><tr>'; for (var i in this.columns) { a += '<td' + (i == 0 ? ' class="first"' : '') + (this.columns[i].width ? ' width="' + this.columns[i].width + '"' : '') + '><span class="ui-datagrid-header-title">' + this.columns[i].title + '</span></td>' } a += '</tr></table></div>'; a += '<div class="ui-datagrid-view" style="position:relative;overflow:auto;height:0;">' + '<div class="loading" style="position: absolute; display: inline-block; left:0; top:0;">加载中...</div>' + '<div class="view"></div>' + '</div>' } this.panel.innerHTML = a; this.gridView = (this.panel.getElementsByClassName ? this.panel.getElementsByClassName('ui-datagrid-view') : $JS.getElementsByClassName(this.panel, 'ui-datagrid-view'))[0]; this.loadbox = this.gridView.getElementsByTagName('DIV')[0] }; this._resize = function () { $JS.dom.fitHeight(this.panel) }; this._fill_data = function (a) { if (!a) return; var b; var c; var d; var e = ''; var f = a['rows'] || a; e += '<table width="100%" cellspacing="0" cellpadding="0">'; for (var i = 0; i < f.length; i++) { b = f[i]; e += '<tr' + (b[this.idField] ? ' data-indent="' + b[this.idField] + '"' : '') + '>'; for (var j in this.columns) { c = this.columns[j]; d = b[c.field]; e += '<td' + (i == 0 && c.width ? ' width="' + c.width + '"' : '') + '>' + (c.formatter && c.formatter instanceof Function ? c.formatter(d, b, i) : d) + '</td>' } e += '</tr>' } e += '</table>'; var g = this.gridView.getElementsByTagName('DIV')[1]; g.innerHTML = e; g.srcollTop = 0; this.loadbox.style.display = 'none'; if (this.onLoaded && this.onLoaded instanceof Function) this.onLoaded(a) }; this._load_data = function (b) { if (!this.data_url) return; var t = this; if (b) { if (!(b instanceof Function)) { b = null } } $JS.xhr.request({ uri: this.data_url, data: 'json', params: this.data_data, method: 'POST' }, { success: function (a) { t._fill_data(a) }, error: function () { } }) }; this._initLayout(); this._resize(); this.load() } datagrid.prototype.resize = function () { this._resize() }; datagrid.prototype.load = function (a) { this.loading(); if (a && a instanceof Object) { this._fill_data(a); return } this._load_data() }; datagrid.prototype.reload = function (a, b) { if (a) { this.data_data = a } this.load(b) }; $JS.extend({ grid: function (a, b) { return new datagrid(a, b) }, datagrid: function (a, b) { return new datagrid(a, b) } });
$JS.extend({ form: { getData: function (a) { var b = ''; var c = document.forms[a || 0]; return $JS.json.toQueryString(c) }, asyncSubmit: function (a, b) { var c = document.forms[a || 0]; var d = document.getElementById('$async_ifr'); if (!d) { try { d = document.createElement('<iframe name="$async_ifr">') } catch (ex) { d = document.createElement('iframe'); d.setAttribute('name', '$async_ifr') } d.setAttribute('id', '$async_ifr'); if (!b) { d.style.cssText = 'display:none' } else { d.style.cssText = 'width:600px;height:400px' } document.body.insertBefore(d, document.body.firstChild) } if (c.getAttribute('target') != d.name) { c.setAttribute('target', d.getAttribute('name')) } c.submit() } } });
var JS_scrollbar = { $: window.$JS, pnode: null, ele: null, startP: { x: 0, y: 0 }, moveP: { x: 0, y: 0, z: -1 }, slideBar: null, init: function (e) { this.ele = e.nodeName ? e : document.getElementById(e); this.pnode = document.createElement('DIV'); this.slideBar = null; this.timer = null; var a = this.ele.parentNode; a.insertBefore(this.pnode, this.ele); this.pnode.appendChild(this.ele); this.pnode.className = 'scrollbar'; this.pnode.style.cssText += 'height:' + this.ele.clientHeight + 'px;overflow:hidden;position:relative'; this.ele.style.height = 'auto'; this.ele.style.position = 'absolute'; this.showbar(); return this }, showbar: function () { var c = this.pnode.clientHeight / this.ele.scrollHeight; var d = document.createElement('DIV'); var f = 0; d.className = 'bar'; d.style.cssText = 'position:absolute;right:0;top:0;height:' + this.pnode.clientHeight + 'px'; this.pnode.appendChild(d); var g = document.createElement('DIV'); g.className = 'btn'; g.innerHTML = '<div class="top"></div><div class="center"></div><div class="bottom"></div>'; g.style.cssText = 'height:' + Math.round(c * d.clientHeight) + 'px;'; d.appendChild(g); if (this.$.style(g)['backgroundImage'] == 'none' && this.$.style(g)['backgroundColor'] == 'transparent') { g.style.backgroundColor = '#a0a0a0' } if (!/^(?!0)\d+px$/.test(this.$.style(d)['width'])) { d.style.width = '12px'; d.style.backgroundColor = '#f5f5f5' } this.pnode.style.width = (this.ele.offsetWidth + d.offsetWidth) + 'px'; this.sliderBar = g; var t = this; var h; var i = function (a) { t.$.event.remove(document.body, 'mousemove', h) }; this.$.event.add(g, 'mousedown', function () { var e = window.event || arguments[0]; var b = e.clientY - g.offsetTop; h = function () { var a = (window.event || arguments[0]).clientY - b; t.scroll(a); window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty() }; t.$.event.add(document.body, 'mousemove', h) }); document.body.onmouseup = i }, scroll: function (a) { var b = this.sliderBar.parentNode.offsetHeight - this.sliderBar.offsetHeight; if (a < 0) a = 0; if (a > b) a = b; var c = a / b; this.sliderBar.style.marginTop = a + 'px'; this.ele.style.top = -Math.round((this.ele.offsetHeight - this.pnode.offsetHeight) * c + 1) + 'px' } }; $JS.extend({ scrollbar: function (e) { return JS_scrollbar.init(e) } }); $JS.event.add(window, 'load', function () { $JS.each(document.getElementsByClassName('ui-scrollbar'), function (i, e) { JS_scrollbar.init(e) }) });
$JS.extend({ table: { dynamic: function (f, g, h) { if (f && f.nodeName === "TABLE") { f.className += ' ui-table'; var j = f.getElementsByTagName('TH'); window.J.each(j, function (i, e) { if (i != j.length - 1) { if ((e.getElementsByClassName ? e.getElementsByClassName('th-split') : document.getElementsByClassName('th-split', e)).length == 0) { var a = document.createElement("SPAN"); a.className = 'th-split'; e.appendChild(a) } } }); var k = f.getElementsByTagName("tr"); for (var i = 0; i < k.length; i++) { if (i % 2 == 1) if (!k[i].className) k[i].className = 'even'; k[i].onmouseover = function () { if (this.className.indexOf('selected') == -1) { this.className = this.className.indexOf('even') != -1 ? "hover even" : "hover" } }; k[i].onmouseout = function () { if (this.className.indexOf('selected') == -1) { this.className = this.className.indexOf("even") == -1 ? "" : "even" } }; k[i].onclick = (function (b, c, d) { return function () { var a = new Array(); window.J.each(b, function (i, e) { if (!d) { if (e != c) { e.className = e.className.indexOf("even") == -1 ? "" : "even" } } if (e.className.indexOf('selected') != -1) { a.push(e) } }); if (c.className.indexOf('selected') == -1) { c.className = c.className.indexOf("even") == -1 ? "selected" : "selected even"; a.push(c) } if (h) { h(a) } } })(k, k[i], g) } } } } });
function Node(a, b, c, d, e, f, g, h, i, j) { this.id = a; this.pid = b; this.name = c; this.url = d; this.title = e; this.value = f; this.target = g; this.icon = h; this.iconOpen = i; this._io = j || false; this._is = false; this._ls = false; this._hc = false; this._ai = 0; this._p = 0 } function dTree(a, b) { this.config = { iconPath: b || '', target: null, folderLinks: true, useSelection: true, useCookies: !true, useLines: true, useIcons: true, useStatusText: false, closeSameLevel: false, inOrder: false }; var c = this.config.iconPath; this.icon = { root: c + 'img/base.gif', folder: c + 'img/folder.gif', folderOpen: c + 'img/folderopen.gif', node: c + 'img/page.gif', empty: c + 'img/empty.gif', line: c + 'img/line.gif', join: c + 'img/join.gif', joinBottom: c + 'img/joinbottom.gif', plus: c + 'img/plus.gif', plusBottom: c + 'img/plusbottom.gif', minus: c + 'img/minus.gif', minusBottom: c + 'img/minusbottom.gif', nlPlus: c + 'img/nolines_plus.gif', nlMinus: c + 'img/nolines_minus.gif' }; this.obj = a; this.aNodes = []; this.aIndent = []; this.root = new Node(-1); this.selectedNode = null; this.selectedFound = false; this.completed = false } dTree.prototype.add = function (a, b, c, d, e, f, g, h, i, j) { this.aNodes[this.aNodes.length] = new Node(a, b, c, d, e, f, g, h, i, j) }; dTree.prototype.bind = function (d, f) { this.add(0, -1, '<b class="title">' + d.text + '</b>', d.url, d.text, '', d.icon); var g = 0; var h = d; var k = this; var l = function (j, b) { var c = j.childs; J.each(c, function (i, e) { var a = e.url || 'javascript:void(0);'; if (e.icon && e.icon != '' && e.icon.indexOf('/') == -1) { e.icon = k.config.iconPath + e.icon } k.add(++g, b, e.text, a, '', e.value, '', e.icon, null, e.open); l(e, g) }) }; l(d, 0); if (f && f instanceof Function) f() }; dTree.prototype.openAll = function () { this.oAll(true) }; dTree.prototype.closeAll = function () { this.oAll(false) }; dTree.prototype.toString = function () { var a = '<div class="ui-tree dtree">\n'; if (document.getElementById) { if (this.config.useCookies) this.selectedNode = this.getSelected(); a += this.addNode(this.root) } else a += 'Browser not supported.'; a += '</div>'; if (!this.selectedFound) this.selectedNode = null; this.completed = true; return a }; dTree.prototype.addNode = function (a) { var b = ''; var n = 0; if (this.config.inOrder) n = a._ai; for (n; n < this.aNodes.length; n++) { if (this.aNodes[n].pid == a.id) { var c = this.aNodes[n]; c._p = a; c._ai = n; this.setCS(c); if (!c.target && this.config.target) c.target = this.config.target; if (c._hc && !c._io && this.config.useCookies) c._io = this.isOpen(c.id); if (!this.config.folderLinks && c._hc) c.url = null; if (this.config.useSelection && c.id == this.selectedNode && !this.selectedFound) { c._is = true; this.selectedNode = n; this.selectedFound = true } b += this.node(c, n); if (c._ls) break } } return b }; dTree.prototype.node = function (a, b) { var c = '<div class="node">' + this.indent(a, b); if (this.config.useIcons) { if (!a.icon) a.icon = (this.root.id == a.pid) ? this.icon.root : ((a._hc) ? this.icon.folder : this.icon.node); if (!a.iconOpen) a.iconOpen = (a._hc) ? this.icon.folderOpen : this.icon.node; if (this.root.id == a.pid) { a.icon = this.icon.root; a.iconOpen = this.icon.root } c += '<img id="i' + this.obj + b + '" src="' + ((a._io) ? a.iconOpen : a.icon) + '" alt="" />' } if (a.url) { c += '<a id="s' + this.obj + b + '" class="' + ((this.config.useSelection) ? ((a._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + a.url + '"'; if (a.title) c += ' title="' + a.title + '"'; if (a.target) c += ' target="' + a.target + '"'; if (this.config.useStatusText) c += ' onmouseover="window.status=\'' + a.name + '\';return true;" onmouseout="window.status=\'\';return true;" '; if (this.config.useSelection && ((a._hc && this.config.folderLinks) || !a._hc)) c += ' onclick="javascript: ' + this.obj + '.s(' + b + ');" node-value="' + a.value + '"'; c += '>' } else if ((!this.config.folderLinks || !a.url) && a._hc && a.pid != this.root.id) c += '<a href="javascript: ' + this.obj + '.o(' + b + ');" class="node" node-value="' + a.value + '">'; c += a.name; if (a.url || ((!this.config.folderLinks || !a.url) && a._hc)) c += '</a>'; c += '</div>'; if (a._hc) { c += '<div id="d' + this.obj + b + '" class="clip" style="display:' + ((this.root.id == a.pid || a._io) ? 'block' : 'none') + ';">'; c += this.addNode(a); c += '</div>' } this.aIndent.pop(); return c }; dTree.prototype.indent = function (a, b) { var c = ''; if (this.root.id != a.pid) { for (var n = 0; n < this.aIndent.length; n++) c += '<img src="' + ((this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty) + '" alt="" />'; (a._ls) ? this.aIndent.push(0) : this.aIndent.push(1); if (a._hc) { c += '<a href="javascript: ' + this.obj + '.o(' + b + ');"><img id="j' + this.obj + b + '" src="'; if (!this.config.useLines) c += (a._io) ? this.icon.nlMinus : this.icon.nlPlus; else c += ((a._io) ? ((a._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((a._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus)); c += '" alt="" /></a>' } else c += '<img src="' + ((this.config.useLines) ? ((a._ls) ? this.icon.joinBottom : this.icon.join) : this.icon.empty) + '" alt="" />' } return c }; dTree.prototype.setCS = function (a) { var b; for (var n = 0; n < this.aNodes.length; n++) { if (this.aNodes[n].pid == a.id) a._hc = true; if (this.aNodes[n].pid == a.pid) b = this.aNodes[n].id } if (b == a.id) a._ls = true }; dTree.prototype.getSelected = function () { var a = this.getCookie('cs' + this.obj); return (a) ? a : null }; dTree.prototype.s = function (a) { if (!this.config.useSelection) return; var b = this.aNodes[a]; if (b._hc && !this.config.folderLinks) return; if (this.selectedNode != a) { if (this.selectedNode || this.selectedNode == 0) { var c = document.getElementById("s" + this.obj + this.selectedNode); c.className = "node" } var d = document.getElementById("s" + this.obj + a); d.className = "nodeSel"; this.selectedNode = a; if (this.config.useCookies) this.setCookie('cs' + this.obj, b.id) } }; dTree.prototype.o = function (a) { var b = this.aNodes[a]; this.nodeStatus(!b._io, a, b._ls); b._io = !b._io; if (this.config.closeSameLevel) this.closeLevel(b); if (this.config.useCookies) this.updateCookie() }; dTree.prototype.oAll = function (a) { for (var n = 0; n < this.aNodes.length; n++) { if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) { this.nodeStatus(a, n, this.aNodes[n]._ls); this.aNodes[n]._io = a } } if (this.config.useCookies) this.updateCookie() }; dTree.prototype.openTo = function (a, b, c) { if (!c) { for (var n = 0; n < this.aNodes.length; n++) { if (this.aNodes[n].id == a) { a = n; break } } } var d = this.aNodes[a]; if (d.pid == this.root.id || !d._p) return; d._io = true; d._is = b; if (this.completed && d._hc) this.nodeStatus(true, d._ai, d._ls); if (this.completed && b) this.s(d._ai); else if (b) this._sn = d._ai; this.openTo(d._p._ai, false, true) }; dTree.prototype.closeLevel = function (a) { for (var n = 0; n < this.aNodes.length; n++) { if (this.aNodes[n].pid == a.pid && this.aNodes[n].id != a.id && this.aNodes[n]._hc) { this.nodeStatus(false, n, this.aNodes[n]._ls); this.aNodes[n]._io = false; this.closeAllChildren(this.aNodes[n]) } } }; dTree.prototype.closeAllChildren = function (a) { for (var n = 0; n < this.aNodes.length; n++) { if (this.aNodes[n].pid == a.id && this.aNodes[n]._hc) { if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls); this.aNodes[n]._io = false; this.closeAllChildren(this.aNodes[n]) } } }; dTree.prototype.nodeStatus = function (a, b, c) { var d = document.getElementById('d' + this.obj + b); var e = document.getElementById('j' + this.obj + b); if (this.config.useIcons) { var f = document.getElementById('i' + this.obj + b); f.src = (a) ? this.aNodes[b].iconOpen : this.aNodes[b].icon } e.src = (this.config.useLines) ? ((a) ? ((c) ? this.icon.minusBottom : this.icon.minus) : ((c) ? this.icon.plusBottom : this.icon.plus)) : ((a) ? this.icon.nlMinus : this.icon.nlPlus); d.style.display = (a) ? 'block' : 'none' }; dTree.prototype.clearCookie = function () { var a = new Date(); var b = new Date(a.getTime() - 1000 * 60 * 60 * 24); this.setCookie('co' + this.obj, 'cookieValue', b); this.setCookie('cs' + this.obj, 'cookieValue', b) }; dTree.prototype.setCookie = function (a, b, c, d, e, f) { document.cookie = escape(a) + '=' + escape(b) + (c ? '; expires=' + c.toGMTString() : '') + (d ? '; path=' + d : '') + (e ? '; domain=' + e : '') + (f ? '; secure' : '') }; dTree.prototype.getCookie = function (a) { var b = ''; var c = document.cookie.indexOf(escape(a) + '='); if (c != -1) { var d = c + (escape(a) + '=').length; var e = document.cookie.indexOf(';', d); if (e != -1) b = unescape(document.cookie.substring(d, e)); else b = unescape(document.cookie.substring(d)) } return (b) }; dTree.prototype.updateCookie = function () { var a = ''; for (var n = 0; n < this.aNodes.length; n++) { if (this.aNodes[n]._io && this.aNodes[n].pid != this.root.id) { if (a) a += '.'; a += this.aNodes[n].id } } this.setCookie('co' + this.obj, a) }; dTree.prototype.isOpen = function (a) { var b = this.getCookie('co' + this.obj).split('.'); for (var n = 0; n < b.length; n++) if (b[n] == a) return true; return false }; if (!Array.prototype.push) { Array.prototype.push = function array_push() { for (var i = 0; i < arguments.length; i++) this[this.length] = arguments[i]; return this.length } }; if (!Array.prototype.pop) { Array.prototype.pop = function array_pop() { var a = this[this.length - 1]; this.length = Math.max(this.length - 1, 0); return a } }; $JS.extend({ tree: { load: function (d, f, g, h, j) { var k = 'tree_' + Math.ceil(Math.random() * 100); var l = $JS.$(d); window[k] = new dTree(k, g); window[k].bind(f, j); l.innerHTML = window[k].toString(); if (h && h instanceof Function) { $JS.each(l.getElementsByTagName('A'), function (i, e) { if (e.className == 'node') { $JS.event.add(e, 'click', (function (a, b, c) { return function () { h(a, b, c) } })(e, e.getAttribute('node-value'), e.innerHTML.replace(/<[>]+>/, ''))) } }) } return window[k] } } });
$JS.extend({ tipbox: { id: 'ui-tipbox', size: { x: 0, y: 0, bx: 0, by: 0 }, show: function (a, b, c, d, e) { var f = document.getElementById(this.id); if (f) { document.body.removeChild(f) } f = document.createElement('DIV'); f.setAttribute('id', this.id); f.className = this.id; f.style.cssText += 'position:fixed;width:auto;overflow:hidden;'; f.innerHTML = '<div class="ui-tipbox-container">' + a + '</div>'; document.body.appendChild(f); if (b) { f.innerHTML += '<style>.ui-tipbox{border:solid 5px #006666;background:white;}.ui-tipbox .ui-tipbox-container{padding:30px 30px 20px 40px;}</style>' } this.size.x = f.offsetWidth; this.size.y = f.offsetHeight; this.size.bx = document.documentElement.clientWidth; this.size.by = document.documentElement.clientHeight; f.getElementsByTagName("DIV")[0].style.width = this.size.x + 'px'; f.style.width = '1px'; f.style.height = '1px'; var g = 1, _y = 1, _opa = 0, _px = (this.size.x > this.size.y ? this.size.x : this.size.y) / 20 / 2; var h = this.size; var i = setInterval(function () { ++_px; if (g + _px > h.x) { g = h.x } else { g += _px } if (_y + _px > h.y) { _y = h.y } else { _y += _px } f.style.width = g + 'px'; f.style.height = _y + 'px'; f.style.left = ((h.bx - g) / 2) + 'px'; f.style.top = ((h.by - _y) / 2 - c) + 'px'; _opa += 5; if (f.style.filter) { f.style.filter = 'filter:alpha(opacity=' + _opa + ')' } else { f.style.opacity = _opa / 100 } if (f == null || (g == h.x && _y == h.y && _opa >= 100)) { clearInterval(i) } }, 10); if (d > 0) { var j = (function (t) { return function () { t.close() } })(this); setTimeout(j, d) } }, close: function (a) { var b = document.getElementById(this.id); var c = 100; var d = a != 'left'; var e = d ? b.offsetTop : b.offsetLeft; var f = -(d ? this.size.y : this.size.x) - 20; var g = e / 40; var h = setInterval(function () { ++g; e -= g; if (b == null || e < f) { if (b) { try { document.body.removeChild(b) } catch (exc) { } } clearInterval(h) } else { if (d) { b.style.top = e + 'px' } else { b.style.left = e + 'px' } c -= 5; if (b.style.filter) { b.style.filter = 'filter:alpha(opacity=' + c + ')' } else { b.style.opacity = c / 100 } } }, 10) } } }); $JS.extend({ toPager: function (c, d) { this.size = d; this.pageIndex = 1; this.pages = 0; this.pager = null; this.list = null; var e = document.getElementById(c); this.list = e.getElementsByClassName ? document.getElementsByClassName('list', e) : e.getElementsByClassName('list'); this.pages = parseInt(this.list.length / this.size); if (this.list.length % this.size != 0) this.pages++; if (this.pager == null) { var f = e.getElementsByClassName ? document.getElementsByClassName('pager', e) : e.getElementsByClassName('pager'); if (f.length == 0) { var g = document.createElement('DIV'); g.className = 'pager'; e.appendChild(g); this.pager = g } else { this.pager = f[0] } } var t = this; var h; this.showPage = function (b) { t.pageIndex = b; for (var i = 0; i < t.list.length; i++) { t.list[i].style.display = i >= (t.pageIndex - 1) * t.size && i < t.pageIndex * t.size ? 'block' : 'none' } t.pager.innerHTML = '页码:'; for (var j = 0; j < t.pages; j++) { t.pager.innerHTML += '&nbsp;' + (t.pageIndex == j + 1 ? j + 1 : '<a href="javascript:;" page="' + (j + 1) + '">' + (j + 1) + '</a>') } h = t.pager.getElementsByTagName('A'); for (var k = 0; k < h.length; k++) { h[k].onclick = (function (a) { return function () { t.showPage(a) } })(h[k].getAttribute('page')) } }; this.showPage(1) } }); $JS.extend({ contextmenu: { ele: null, currEle: null, inst: null, offset: 5, srcs: null, show: function () { this.ele.style.display = 'block' }, close: function () { this.ele.style.display = 'none' }, bind: function (e, k, l) { var j = $JS; if (!this.ele) { this.srcs = new Array(); this.ele = document.createElement('DIV'); this.ele.className = 'ui-contextmenu'; this.ele.style.cssText = 'position:absolute;'; document.body.appendChild(this.ele); this.srcs.push(this.ele); j.event.add(document.body, 'click', (function (e) { return function () { e.close.apply(e) } }(this))); this.ele.oncontextmenu = function () { return false }; document.oncontextmenu = (function (d, f, e) { return function (a) { var b = j.event.src(a); var c = b; while (c) { for (var i = 0; i < f.length; i++) { if (f[i] == c) { return false } } c = c.parentNode } return true } }(this.ele, this.srcs, e)) } this.srcs.push(e); j.event.add(e, 'mouseup', (function (h) { return function (a) { var b = a ? a : window.event; if (b.button != 2) { return false } var c = h.ele; var d = Math.max(document.documentElement.scrollTop, document.body.scrollTop), dom_LEFT = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft), event_X = b.clientX, event_Y = b.clientY, menu_WIDTH = c.offsetWidth, menu_HEIGHT = c.offsetHeight; var f = Math.max(document.documentElement.clientWidth, document.body.clientWidth) - event_X; var g = Math.max(document.documentElement.clientHeight, document.body.clientHeight) - event_Y; if (h.currEle == null || h.currEle != e) { h.ele.innerHTML = k; if (l) { l(h.ele) } } if (f < menu_WIDTH) { c.style.left = (dom_LEFT + event_X - menu_WIDTH) + 'px' } else { c.style.left = (dom_LEFT + event_X) + 'px'; h.show() } if (g < menu_HEIGHT) { c.style.top = (d + event_Y - menu_HEIGHT) + 'px' } else { c.style.top = (d + event_Y) + 'px'; h.show() } j.event.stopBubble(b) } })(this)) } } });
function fileUpload(h, i) { this.id = h.id; this.infopanel = h.info ? document.getElementById(h.info) : null; this.processID = Math.random() * 100 + 100; this.debug = h.debug || false; this.uploadurl = h.url, this.processurl = h.processurl, this.filename = null; this.file = null; this.repeatSelect = h.repeatSelect == undefined ? false : h.repeatSelect; this.btnText = ''; this.btnClicked = false; this.repeatSelect = false; var j = document.getElementById(this.id); this.btnText = j.innerHTML || '选择文件'; j.innerHTML = ''; var k, __html_form, __html_up_btn, __html_process, __html_msg_panel; try { k = document.createElement('<IFRAME name="' + (this.id + '_iframe') + '">') } catch (ex) { k = document.createElement('IFRAME'); k.setAttribute('name', this.id + '_iframe') } j.appendChild(k); if (!this.debug) { k.style.display = 'none' } var l = (function (t, g) { return function () { var a = g.contentWindow.document; var b = ''; try { var c = a.getElementsByTagName('HEAD'); if (c.length != 0) { b = c[0].innerHTML } } catch (exc) { t.onUploadComplete.apply(t, [false, exc]); return } if (b) { var d = /<title>(.+?)<\/title>/.exec(b); if (!d) { d = '上传失败' } else { d = d[1] } t.onUploadComplete.apply(t, [false, d, a]); return } var e = a.body.innerHTML; var f = e; if (e == '') return; if (/^{(.+?)}$/igm.test(e)) { f = $JS.toJson(e) } t.onUploadComplete.apply(t, [true, f, a]) } })(this, k); $JS.event.add(k, 'load', l); __html_form = document.createElement('FORM'); __html_form.setAttribute('id', this.id + '_form'); __html_form.method = 'POST'; __html_form.style.cssText = 'display:inline'; __html_form.className = 'ui-uploadform'; __html_form.action = this.uploadurl; __html_form.enctype = 'multipart/form-data'; __html_form.encoding = 'multipart/form-data'; __html_form.target = k.getAttribute('name'); j.appendChild(__html_form); __html_up_btn = document.createElement("span"); __html_up_btn.className = 'upbtn'; __html_up_btn.innerHTML = this.btnText; __html_form.appendChild(__html_up_btn); this.file = document.createElement('INPUT'); this.file.setAttribute('type', 'file'); this.file.setAttribute('name', this.id); this.file.setAttribute('tabindex', '9999'); var m = __html_up_btn.offsetTop; var n = this.debug ? 50 : 0; this.file.style.cssText = 'opacity:' + (n / 100) + ';filter:alpha(opacity=' + n + ');cursor:normal;position:absolute;top:' + __html_up_btn.offsetTop + 'px;left:' + __html_up_btn.offsetLeft + 'px;z-index:101;width:' + __html_up_btn.offsetWidth + 'px;height:' + __html_up_btn.offsetHeight + 'px;'; if (this.repeatSelect) this.file.onclick = function () { this.value = '' }; __html_form.appendChild(this.file); __html_process = document.createElement('INPUT'); __html_process.setAttribute('name', 'upload_process'); __html_process.setAttribute('type', 'hidden'); __html_process.setAttribute('value', this.id + '|' + this.processID); __html_form.appendChild(__html_process); this.filename = this.file.value; setInterval((function (t) { return function () { if (t.file.value != '' && t.filename != t.file.value) { t.filename = t.file.value; t.onFileChanged(t.file) } } })(this), 100) } fileUpload.prototype.printf = function (a) { if (this.infopanel) this.infopanel.innerHTML = a }; fileUpload.prototype.checkFileTypes = function (a) { var b = this.file.value; var c = b.substring(b.lastIndexOf('.')); return new RegExp('\\*' + c + ';*', 'i').test(a) }; fileUpload.prototype.onFileChanged = function (a) { }; fileUpload.prototype.onUploading = function (a) { }; fileUpload.prototype.onUploadComplete = function (a, b, c) { }; fileUpload.prototype.upload = function () { var a = document.forms[this.id + '_form']; if (a) { a.submit(); if (this.onUploading) this.onUploading() } }; function fileUploadObject(d, e) { var f = new fileUpload(d); var g = document.getElementById(f.id).getElementsByTagName('SPAN')[0]; f.onUploading = function (a) { f.file.setAttribute('disabled', 'disabled'); try { g.innerHTML = '上传中' } catch (ex) { } }; f.onUploadComplete = function (a, b, c) { f.file.removeAttribute('disabled'); try { g.innerHTML = f.btnText } catch (ex) { } if (e) { e(a, b, c) } }; f.onFileChanged = function (a) { if (d.exts && !f.checkFileTypes(d.exts)) { alert('文件类型不允许上传,仅允许上传文件类型为：' + d.exts) } else { f.upload() } }; return f } $JS.extend({ upload: function (a, b) { return fileUploadObject(a, b) } });
$JS.extend({ validator: { setTip: function (e, a, b, c) { if (b) { var d = e.getAttribute('summary'); if (d) { d = $JS.toJson(d); if (d[b]) { c = d[b] } } } if (e.getAttribute('tipin')) { var f = document.getElementById(e.getAttribute('tipin')); if (f) { if (f.className.indexOf('validator') == -1) { f.className += ' validator' } f.innerHTML = '<span class="' + (a ? 'valid-right' : 'valid-error') + '">' + c + '</span>'; return false } } var g = e.getAttribute('validate_id'); var h = document.getElementById(g); if (!h) { h = document.createElement('DIV'); h.id = g; h.className = 'validator'; var i = $JS.getPosition(e); h.style.cssText = 'position:absolute;left:' + (i.right + document.documentElement.scrollLeft) + 'px;top:' + (i.top + document.documentElement.scrollTop) + 'px'; document.body.appendChild(h) } h.innerHTML = '<span class="' + (a ? 'valid-right' : 'valid-error') + '">' + c + '</span>' }, removeTip: function (e) { if (e.getAttribute('tipin')) { var a = document.getElementById(e.getAttribute('tipin')); if (a) { a.innerHTML = ''; return false } } var b = document.getElementById(e.getAttribute('validate_id')); if (b) { document.body.removeChild(b) } }, result: function (a) { if (a) { var b = true; var c = document.getElementById(a); $JS.each($JS.getElementsByClassName(c, 'ui-validate'), function (i, e) { if (b) { if (e.getAttribute('tipin')) { if ($JS.$(e.getAttribute('tipin')).innerHTML.indexOf('valid-error') != -1) { b = false } } else { e = document.getElementById(e.getAttribute('validate_id')); if ($JS.getElementsByClassName(e, 'valid-error').length != 0) { b = false } } } }); return b } else { return $JS.getElementsByClassName(document, 'valid-error').length == 0 } }, init: function () { var f = window.J; if (!f) { alert('未引用核心库!'); return false } var g = document.getElementsByClassName('ui-validate'); var h; for (var i = 0; i < g.length; i++) { h = g[i].getAttribute('validate_id'); while (h == null) { h = g[i].id; if (h && h != '') { h = 'validate_item_' + h } else { h = 'validate_item_' + parseInt(Math.random() * 1000).toString() } if (document.getElementById(h) != null) { h = null } else { g[i].setAttribute('validate_id', h) } } var j = new Array(); if (g[i].onblur) { j[j.length] = g[i].onblur } if (g[i].getAttribute('isnumber') == 'true') { g[i].style.cssText += 'ime-mode:disabled'; var k = (function (a, e) { return function () { if (/\D/.test(e.value)) { e.value = e.value.replace(/\D/g, '') } e.value = e.value.replace(/^0([0-9])/, '$1') } })(this, g[i]); f.event.add(g[i], 'keyup', k); f.event.add(g[i], 'change', k) } if (g[i].getAttribute('regex')) { var k = (function (b, e) { return function () { var a = new RegExp(); a.compile(e.getAttribute('regex')); if (!a.test(e.value)) { b.setTip(e, false, 'regex', '输入不正确') } else { b.removeTip(e) } } })(this, g[i]); j[j.length] = k } else { if (g[i].getAttribute('isrequired') == 'true' || g[i].getAttribute('required') == 'true') { var k = (function (a, e) { return function () { if (e.value.replace(/\s/g, '') == '') { a.setTip(e, false, 'required', '该项不能为空') } else { a.removeTip(e) } } })(this, g[i]); j[j.length] = k } if (g[i].getAttribute('length')) { var k = (function (d, e) { return function () { var a = e.getAttribute('length'); var b = /\[(\d*),(\d*)\]/ig; var c = parseInt(a.replace(b, '$1')), l_e = parseInt(a.replace(b, '$2')); if (e.value.length < c) { d.setTip(e, false, 'length', l_e ? '长度必须为' + c + '-' + l_e + '位' : '长度必须大于' + (c - 1) + '位') } else if (e.value.length > l_e) { d.setTip(e, false, 'length', c ? '长度必须为' + c + '-' + l_e + '位' : '长度必须小于' + (l_e + 1) + '位') } else if (e.getAttribute('required') == null || e.value.length > 0) { d.removeTip(e) } } })(this, g[i]); j[j.length] = k } } var l = (function (a) { return function () { for (var i = 0; i < a.length; i++) { if (a[i]) { a[i].apply(this, arguments); a[i]() } } } })(j); g[i].onblur = l } }, validate: function (a) { var b; if (a) { b = $JS.getElementsByClassName(document.getElementById(a), 'ui-validate') } else { b = $JS.getElementsByClassName(document, 'ui-validate') } for (var i = 0; i < b.length; i++) { if (b[i].onblur) { b[i].onblur() } } return this.result(a) } } }); $JS.event.add(window, 'load', function () { $JS.validator.init() });
function autoCompletion(u, v, w, x, y) { var z; var A; this.charMinLen = (y == 0 ? 0 : 1); this.lastChar = ''; this.isOnFocus = false; this.timer = null; if (!u.nodeName) { u = $JS.$(u) } var B = function () { z = u.previousNode; if (!z || z.nodeName != 'DIV' || z.className != 'ui-autocompletion-panel') { if (u.parentNode.offsetLeft > u.offsetLeft) { u.parentNode.style.cssText += 'position:relative' } z = document.createElement('DIV'); z.className = 'ui-autocompletion-panel'; z.style.cssText = 'curcor:default;z-index:102;position:absolute;left:' + u.offsetLeft + 'px;top:' + (u.offsetTop + u.offsetHeight) + 'px;width:' + u.offsetWidth + 'px;overflow:hidden;display:none'; u.parentNode.insertBefore(z, u); A = document.createElement('DIV'); A.className = 'inner'; A.style.cssText = 'background-color:#fff;'; z.appendChild(A) } else { A = z.getElementsByTagName('DIV')[0] } }; B(); var C = (function (e, p, q, r, s, t) { return function (l, m) { if (m) t.isOnFocus = true; var n = window.event || l; if (n.altKey || n.keyCode == 17) return; var o = e.value; if (/^\s*$/.test(o) && t.charMinLen != 0) return; o = o.replace(/^(\s*)(.+?)(\s*)$/, '$2'); if (o.length < t.charMinLen) return; if (t.lastChar != '' && t.lastChar == o) { return } else { t.lastChar = o } $JS.xhr.request({ uri: v + (v.indexOf('?') == -1 ? "?" : '&') + 'key=' + encodeURIComponent(o), params: {}, method: 'GET', data: 'json' }, { success: function (d) { if (r) r(d); if (d.length != 0) { p.style.display = ''; var f = new RegExp(o, 'i'); var g = '<b>' + o + '</b>'; var h = '<ul style="margin:0;padding:0;">'; for (var i = 0; i < d.length; i++) { h += '<li' + (i == 0 ? ' class="first"' : '') + (d[i].title ? ' title="' + d[i].title + '"' : '') + '>' + d[i].text.replace(f, g) + '</li>'; if (d[i].text == o && s) { if (e.onblur) e.onblur(); s(d[i]) } } h += '</ul>'; q.innerHTML = h; var k = q.getElementsByTagName('LI'); $JS.each(k, function (i, c) { c.onmouseover = (function (a, b) { return function () { for (var j = 0; j < b.length; j++) { b[j].className = j == 0 ? 'first' : '' } this.className = this == k[0] ? 'first selected' : 'selected' } })(p, k); c.onclick = (function (j, a) { return function () { e.value = j.text; a.style.display = 'none'; if (e.onblur) e.onblur(); if (s) s(j) } })(d[i], p) }) } else { p.style.display = 'none' } setTimeout(function () { t.isOnFocus = false }, 500) } }) } })(u, z, A, w, x, this); var D = (function (p, t) { return function (a) { if (!t.isOnFocus) { p.style.display = 'none' } } })(z, this); $JS.event.add(u, 'focus', (function (t) { return function (a) { C(a, true) } })(this)); $JS.event.add(u, 'keyup', C); $JS.event.add(document, 'click', D); return this } $JS.extend({ autoCompletion: function (a, b, c, d, e) { return new autoCompletion(a, b, c, d, e) } });

$JS.event.add(window, 'load', function () { $JS.each(document.getElementsByClassName('ui-exchange'), function (i, e) { var v = null; var d = null; var f = null; var g = 'exchange'; switch (e.nodeName) { case 'IMG': f = 'src'; break; default: f = 'innerHTML'; break } if (f == null) return; v = e[f]; d = e.getAttribute(g); if (d) { $JS.event.add(e, 'mouseover', (function (a, b, c) { return function () { a[b] = c } })(e, f, d)); $JS.event.add(e, 'mouseout', (function (a, b, c) { return function () { a[b] = c } })(e, f, v)) } }) });



var cms = $JS;

//库目录
cms.libpath = '/framework/assets/';

//=============================================== AJAX Loader ======================================//

//加载地址到div中
cms.loadurl = function (id, url, func) {
    var e = null;
    if (id.nodeName) {
        e = id;
    } else {
        e = cms.$(id);
    }
    var loadTip = url.indexOf('#noload') == -1;
    var _tip = null;
    if (loadTip) {
        _tip = document.createElement('DIV');
        document.body.appendChild(_tip);
        _tip.innerHTML = '<div class="loading" style="position:absolute;left:' + (e.offsetLeft + 1) + 'px;top:' + (e.offsetTop + 1) + 'px;">加载中...</div>';
    }
    cms.load(e, url, function (result) {
        if (_tip) { document.body.removeChild(_tip); }
        window.bindInit();
        if (func) {
            func(result);
        }
    }, function () {
        if (_tip) {
            document.body.removeChild(_tip);
        }
    });
};

//按模块加载页面
cms.load2 = function (id, module, action, query, func) {
    var url = '?ajax=1&module=' + module + '&action=' + action;
    if (query) {
        if (query.indexOf('?') == 0) {
            url += '&' + query.substring(1);
        } else {
            url += '&' + query;
        }
    }

    cms.lazyRun(function () {
        cms.loadurl(id, url, func);
    });

    if (url.indexOf('#noload') == -1) {
        location.href = '#' + module + '.' + action;
    }
};

//加载分页数据
cms.pagerLoad = function (id, pid, page, module, action, query, func) {
    var e = cms.$(id), pe = cms.$(pid), eDis = e.style.display;
    var url = '?ajax=1&module=' + module + '&action=' + action + '&page=' + (page || 1);
    if (query) {
        if (query.indexOf('?') == 0) {
            url += '&' + query.substring(1);
        } else {
            url += '&' + query;
        }
    }
    //e.style.display = 'none';

    cms.loadurl(id, url, function (result) {
        var json = cms.toJson(result);

        try {
            e.innerHTML = json.html;
        } catch (ex) {
            if (e.nodeName == 'TBODY') {
                cms.each(e.rows, function (i, _e) {
                    e.removeChild(_e);
                });

                var tempNode = document.createElement('DIV');
                tempNode.innerHTML = "<table>" + json.html + "</table>";

                var tempTable = tempNode.firstChild;
                var tbody = e;
                for (var i = 0, tr; tr = tempTable.rows[i]; i++) {
                    tbody.appendChild(tr);
                }
            }
        }
        //e.style.display = eDis;
        if (pe) {
            pe.innerHTML = json.pager;
        }
        if (func) func();
    });
};


//==========================================  AJAX =======================================//
cms.xhr.jsonAjax = cms.xhr.jsonPost;


//=======================================================================================//
$JS.propertyUpload = function (id, id2) {
    window['pro_upload_' + id] = cms.upload({
        id: id,
        debug: !true,
        url: '?module=upload&action=uploadfile&for=pro&upload.id=pro_upload_' + id,
        exts: '*.jpg;*.gif;*.png;*.jpeg;*.7z;*.rar;*.zip;*.pdf;*.xls;*.doc;*.docx;*.ppt;*.flv;*.wmv;*.mp3;*.mp4'
    }, function (result, data) {
        if (result) {
            cms.$(id2).value = data.url;
        } else {
            alert('上传失败：' + data);
        }
    });
};




/* 将CodeMirror更改为CDR 
#964  循环有误
*/

cms.coder = function (id, arg) {

    //暂不支持IE6和IE7
    if (/MSIE\s(6|7)/.test(window.navigator.userAgent)) {
        alert('您正在使用的浏览器不支持Code Editor,请升级到IE8及以上,或使用Firefox系列浏览器!');
        return null;
    }


    // var htmljs = new Array('//framework/assets/coder/lib/codemirror.js', '//framework/assets/coder/mode/xml/xml.js',
    //                   '//framework/assets/coder/mode/javascript/javascript.js', '//framework/assets/coder/mode/css/css.js',
    //                   '//framework/assets/coder/mode/htmlmixed/htmlmixed.js');

    var editor = null;
    var mode = arg.mode || 'html';

    var _showLineNumber = arg.lineNumbers || true;


    var _e = document.getElementById(id);
    if (mode == 'html') {
        //for (var i = 0; i < htmljs.length; i++) {
        // this.ldScript(htmljs[i]);
        //}
        var mixedMode = {
            name: "htmlmixed",
            scriptTypes: [{
                matches: /\/x-handlebars-template|\/x-mustache/i,
                mode: null
            }]
        };
        editor = CodeMirror.fromTextArea(_e,
         {
             lineNumbers: _showLineNumber,
             mode: mixedMode,
             tabMode: "indent",
             indentUnit: 4
         });

    } else if (mode == 'css') {
        editor = CodeMirror.fromTextArea(_e, {
            lineNumbers: _showLineNumber,
            tabMode: "indent",
            indentUnit: 4
        });
    } else if (mode == 'xml') {
        editor = CodeMirror.fromTextArea(_e, {
            lineNumbers: _showLineNumber,
            mode: { name: "xml", alignCDATA: true },
            tabMode: "indent",
            indentUnit: 4
        });
    }

    if (arg.height) {
        var _cms = document.getElementsByClassName('CodeMirror');
        for (var i = 0; i < _cms.length; i++) {
            _cms[i].style.height = arg.height + 'px';
        }
    }
    return editor;
};



//==================================================================================//


//功能键组合
window.Fn = {
    ids: new Array()    //ID数组
};



window.bind_initKey = window.parent != window;

//事件初始化
window.bindInit = function () {
    //隐藏loading (IE下)
    //if(window.attachEvent && window.parent.tab){
    //	window.parent.tab.pageLoad();
    //}

    if (window.bind_initKey) {
        //屏蔽键
        document.onkeydown = function (event) {
            var e = window.event || event;
            var win = window.parent;
            // while (win.parent != undefined) {
            //     win = win.parent;
            // }
            if (win.parent != win) {
                win = win.parent;
            }

            //CTRL+S保存
            if (e.ctrlKey && e.keyCode == 83) {
                if (window.saveData && window.saveData instanceof Function) {
                    window.saveData();
                    return cms.event.preventDefault(e);
                }
                return true;
            }
                //按键ALT+F11,启用全屏
            else if (e.altKey && e.keyCode == 122) {
                win.M.setFullScreen();
                return J.event.preventDefault(event);
            } else if (e.keyCode == 122) {
                win.M.setFullScreen();
                return J.event.preventDefault(event);
            } else if (!e.ctrlKey && e.keyCode == 116) {
                var ifr = win.document.getElementsByClassName('currentframe')[0];
                if (ifr) {
                    var src = ifr.src;
                    ifr.src = '';
                    ifr.src = src;
                }
                return J.event.preventDefault(event);
            }
            return true;
        };
    }

    //自动设置样式
    var autoStyle = document.getElementsByClassName('autoStyle');
    var ele, autos;
    for (var j = 0; j < autoStyle.length; j++) {
        autos = autoStyle[j].getElementsByTagName('*');

        for (var i = 0; i < autos.length; i++) {
            ele = autos[i];

            switch (ele.nodeName) {
                case "INPUT":
                    if (ele.getAttribute('type') == 'text') {
                        ele.className += ' tb_normal';
                    }
                    break;

                case "SELECT":
                    ele.className += ' tb_normal';
                    break;

                case "TEXTAREA":
                    ele.className += ' tb_normal';
                    break;


                    //包含div的TD设置为自动顶部               
                case "TD":
                    if (!ele.getAttribute('valign')) {
                        if (ele.getElementsByTagName('DIV').length != 0) {
                            ele.setAttribute('valign', 'top');
                        }
                    }
                    break;
            }
        }
    }

    //自动设置高度

    var ahs = document.getElementsByClassName('autoHeight');
    var ahs_body_height = Math.max(document.documentElement.clientHeight, document.body.clientHeight);
    for (var i = 0; i < ahs.length; i++) {
        var height = 0;
        var ahs_arr = ahs[i].parentNode.childNodes;
        for (var j = 0; j < ahs_arr.length; j++) {
            if (ahs_arr[j].nodeName == 'DIV' && ahs_arr[j] != ahs[i]) {
                height += ahs_arr[j].offsetHeight;
            }
        }

        ahs[i].style.height = (ahs_body_height - height) + 'px';

        ahs[i].style.height = (ahs[i].offsetHeight - document.documentElement.scrollHeight + ahs_body_height) + 'px';
    }

    //
    //绑定功能键
    //脚本：Fn.create=function(){};
    //元素：<a fn="create" class="fn">button</a>
    //
    var fns = document.getElementsByClassName('fn');
    var fnName, _fn;
    for (var i = 0; i < fns.length; i++) {
        fnName = fns[i].getAttribute('fn');
        if (fnName && window.Fn) {
            eval('_fn=window.Fn.' + fnName);
            if (_fn) {
                cms.event.add(fns[i], 'click', _fn);
            }
        }
    }
};



//初始化
cms.event.add(window, 'load', window.bindInit);



//扩展Tab
$JS.extend({
    tab: {
        check: function () {
            if (window.parent.FwTab) return true;

            alert('不支持此功能');
            return false;
        },
        open: function (title, url, closeable) {
            if (this.check()) {
                window.parent.FwTab.show(title, url, closeable);
            }
        },
        close: function (title) {
            if (this.check()) {
                window.parent.FwTab.close(title);
            }
        },
        closeAndReresh: function (title) {
            if (this.check()) {
                var win = window.parent.FwTab.getWindow(title);
                if (win != null) {
                    if (win.refresh)
                        win.refresh();
                }
                window.parent.FwTab.close();
            }
        }
    }
});


