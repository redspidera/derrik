/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
  function (a, b, c) {
    function d(c) {
      var d = b.console;
      f[c] || (f[c] = !0, a.migrateWarnings.push(c), d && d.warn && !a.migrateMute && (d.warn("JQMIGRATE: " + c), a.migrateTrace && d.trace && d.trace()))
    }

    function e(b, c, e, f) {
      if (Object.defineProperty) try {
        return void Object.defineProperty(b, c, {
          configurable: !0,
          enumerable: !0,
          get: function () {
            return d(f), e
          },
          set: function (a) {
            d(f), e = a
          }
        })
      } catch (g) {}
      a._definePropertyBroken = !0, b[c] = e
    }
    a.migrateVersion = "1.4.1";
    var f = {};
    a.migrateWarnings = [], b.console && b.console.log && b.console.log("JQMIGRATE: Migrate is installed" + (a.migrateMute ? "" : " with logging active") + ", version " + a.migrateVersion), a.migrateTrace === c && (a.migrateTrace = !0), a.migrateReset = function () {
      f = {}, a.migrateWarnings.length = 0
    }, "BackCompat" === document.compatMode && d("jQuery is not compatible with Quirks Mode");
    var g = a("<input/>", {
        size: 1
      }).attr("size") && a.attrFn,
      h = a.attr,
      i = a.attrHooks.value && a.attrHooks.value.get || function () {
        return null
      },
      j = a.attrHooks.value && a.attrHooks.value.set || function () {
        return c
      },
      k = /^(?:input|button)$/i,
      l = /^[238]$/,
      m = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
      n = /^(?:checked|selected)$/i;
    e(a, "attrFn", g || {}, "jQuery.attrFn is deprecated"), a.attr = function (b, e, f, i) {
      var j = e.toLowerCase(),
        o = b && b.nodeType;
      return i && (h.length < 4 && d("jQuery.fn.attr( props, pass ) is deprecated"), b && !l.test(o) && (g ? e in g : a.isFunction(a.fn[e]))) ? a(b)[e](f) : ("type" === e && f !== c && k.test(b.nodeName) && b.parentNode && d("Can't change the 'type' of an input or button in IE 6/7/8"), !a.attrHooks[j] && m.test(j) && (a.attrHooks[j] = {
        get: function (b, d) {
          var e, f = a.prop(b, d);
          return f === !0 || "boolean" != typeof f && (e = b.getAttributeNode(d)) && e.nodeValue !== !1 ? d.toLowerCase() : c
        },
        set: function (b, c, d) {
          var e;
          return c === !1 ? a.removeAttr(b, d) : (e = a.propFix[d] || d, e in b && (b[e] = !0), b.setAttribute(d, d.toLowerCase())), d
        }
      }, n.test(j) && d("jQuery.fn.attr('" + j + "') might use property instead of attribute")), h.call(a, b, e, f))
    }, a.attrHooks.value = {
      get: function (a, b) {
        var c = (a.nodeName || "").toLowerCase();
        return "button" === c ? i.apply(this, arguments) : ("input" !== c && "option" !== c && d("jQuery.fn.attr('value') no longer gets properties"), b in a ? a.value : null)
      },
      set: function (a, b) {
        var c = (a.nodeName || "").toLowerCase();
        return "button" === c ? j.apply(this, arguments) : ("input" !== c && "option" !== c && d("jQuery.fn.attr('value', val) no longer sets properties"), void(a.value = b))
      }
    };
    var o, p, q = a.fn.init,
      r = a.find,
      s = a.parseJSON,
      t = /^\s*</,
      u = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
      v = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
      w = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
    a.fn.init = function (b, e, f) {
      var g, h;
      return b && "string" == typeof b && !a.isPlainObject(e) && (g = w.exec(a.trim(b))) && g[0] && (t.test(b) || d("$(html) HTML strings must start with '<' character"), g[3] && d("$(html) HTML text after last tag is ignored"), "#" === g[0].charAt(0) && (d("HTML string cannot start with a '#' character"), a.error("JQMIGRATE: Invalid selector string (XSS)")), e && e.context && e.context.nodeType && (e = e.context), a.parseHTML) ? q.call(this, a.parseHTML(g[2], e && e.ownerDocument || e || document, !0), e, f) : (h = q.apply(this, arguments), b && b.selector !== c ? (h.selector = b.selector, h.context = b.context) : (h.selector = "string" == typeof b ? b : "", b && (h.context = b.nodeType ? b : e || document)), h)
    }, a.fn.init.prototype = a.fn, a.find = function (a) {
      var b = Array.prototype.slice.call(arguments);
      if ("string" == typeof a && u.test(a)) try {
        document.querySelector(a)
      } catch (c) {
        a = a.replace(v, function (a, b, c, d) {
          return "[" + b + c + '"' + d + '"]'
        });
        try {
          document.querySelector(a), d("Attribute selector with '#' must be quoted: " + b[0]), b[0] = a
        } catch (e) {
          d("Attribute selector with '#' was not fixed: " + b[0])
        }
      }
      return r.apply(this, b)
    };
    var x;
    for (x in r) Object.prototype.hasOwnProperty.call(r, x) && (a.find[x] = r[x]);
    a.parseJSON = function (a) {
      return a ? s.apply(this, arguments) : (d("jQuery.parseJSON requires a valid JSON string"), null)
    }, a.uaMatch = function (a) {
      a = a.toLowerCase();
      var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
      return {
        browser: b[1] || "",
        version: b[2] || "0"
      }
    }, a.browser || (o = a.uaMatch(navigator.userAgent), p = {}, o.browser && (p[o.browser] = !0, p.version = o.version), p.chrome ? p.webkit = !0 : p.webkit && (p.safari = !0), a.browser = p), e(a, "browser", a.browser, "jQuery.browser is deprecated"), a.boxModel = a.support.boxModel = "CSS1Compat" === document.compatMode, e(a, "boxModel", a.boxModel, "jQuery.boxModel is deprecated"), e(a.support, "boxModel", a.support.boxModel, "jQuery.support.boxModel is deprecated"), a.sub = function () {
      function b(a, c) {
        return new b.fn.init(a, c)
      }
      a.extend(!0, b, this), b.superclass = this, b.fn = b.prototype = this(), b.fn.constructor = b, b.sub = this.sub, b.fn.init = function (d, e) {
        var f = a.fn.init.call(this, d, e, c);
        return f instanceof b ? f : b(f)
      }, b.fn.init.prototype = b.fn;
      var c = b(document);
      return d("jQuery.sub() is deprecated"), b
    }, a.fn.size = function () {
      return d("jQuery.fn.size() is deprecated; use the .length property"), this.length
    };
    var y = !1;
    a.swap && a.each(["height", "width", "reliableMarginRight"], function (b, c) {
      var d = a.cssHooks[c] && a.cssHooks[c].get;
      d && (a.cssHooks[c].get = function () {
        var a;
        return y = !0, a = d.apply(this, arguments), y = !1, a
      })
    }), a.swap = function (a, b, c, e) {
      var f, g, h = {};
      y || d("jQuery.swap() is undocumented and deprecated");
      for (g in b) h[g] = a.style[g], a.style[g] = b[g];
      f = c.apply(a, e || []);
      for (g in b) a.style[g] = h[g];
      return f
    }, a.ajaxSetup({
      converters: {
        "text json": a.parseJSON
      }
    });
    var z = a.fn.data;
    a.fn.data = function (b) {
      var e, f, g = this[0];
      return !g || "events" !== b || 1 !== arguments.length || (e = a.data(g, b), f = a._data(g, b), e !== c && e !== f || f === c) ? z.apply(this, arguments) : (d("Use of jQuery.fn.data('events') is deprecated"), f)
    };
    var A = /\/(java|ecma)script/i;
    a.clean || (a.clean = function (b, c, e, f) {
      c = c || document, c = !c.nodeType && c[0] || c, c = c.ownerDocument || c, d("jQuery.clean() is deprecated");
      var g, h, i, j, k = [];
      if (a.merge(k, a.buildFragment(b, c).childNodes), e)
        for (i = function (a) {
            return !a.type || A.test(a.type) ? f ? f.push(a.parentNode ? a.parentNode.removeChild(a) : a) : e.appendChild(a) : void 0
          }, g = 0; null != (h = k[g]); g++) a.nodeName(h, "script") && i(h) || (e.appendChild(h), "undefined" != typeof h.getElementsByTagName && (j = a.grep(a.merge([], h.getElementsByTagName("script")), i), k.splice.apply(k, [g + 1, 0].concat(j)), g += j.length));
      return k
    });
    var B = a.event.add,
      C = a.event.remove,
      D = a.event.trigger,
      E = a.fn.toggle,
      F = a.fn.live,
      G = a.fn.die,
      H = a.fn.load,
      I = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
      J = new RegExp("\\b(?:" + I + ")\\b"),
      K = /(?:^|\s)hover(\.\S+|)\b/,
      L = function (b) {
        return "string" != typeof b || a.event.special.hover ? b : (K.test(b) && d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), b && b.replace(K, "mouseenter$1 mouseleave$1"))
      };
    a.event.props && "attrChange" !== a.event.props[0] && a.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), a.event.dispatch && e(a.event, "handle", a.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), a.event.add = function (a, b, c, e, f) {
      a !== document && J.test(b) && d("AJAX events should be attached to document: " + b), B.call(this, a, L(b || ""), c, e, f)
    }, a.event.remove = function (a, b, c, d, e) {
      C.call(this, a, L(b) || "", c, d, e)
    }, a.each(["load", "unload", "error"], function (b, c) {
      a.fn[c] = function () {
        var a = Array.prototype.slice.call(arguments, 0);
        return "load" === c && "string" == typeof a[0] ? H.apply(this, a) : (d("jQuery.fn." + c + "() is deprecated"), a.splice(0, 0, c), arguments.length ? this.bind.apply(this, a) : (this.triggerHandler.apply(this, a), this))
      }
    }), a.fn.toggle = function (b, c) {
      if (!a.isFunction(b) || !a.isFunction(c)) return E.apply(this, arguments);
      d("jQuery.fn.toggle(handler, handler...) is deprecated");
      var e = arguments,
        f = b.guid || a.guid++,
        g = 0,
        h = function (c) {
          var d = (a._data(this, "lastToggle" + b.guid) || 0) % g;
          return a._data(this, "lastToggle" + b.guid, d + 1), c.preventDefault(), e[d].apply(this, arguments) || !1
        };
      for (h.guid = f; g < e.length;) e[g++].guid = f;
      return this.click(h)
    }, a.fn.live = function (b, c, e) {
      return d("jQuery.fn.live() is deprecated"), F ? F.apply(this, arguments) : (a(this.context).on(b, this.selector, c, e), this)
    }, a.fn.die = function (b, c) {
      return d("jQuery.fn.die() is deprecated"), G ? G.apply(this, arguments) : (a(this.context).off(b, this.selector || "**", c), this)
    }, a.event.trigger = function (a, b, c, e) {
      return c || J.test(a) || d("Global events are undocumented and deprecated"), D.call(this, a, b, c || document, e)
    }, a.each(I.split("|"), function (b, c) {
      a.event.special[c] = {
        setup: function () {
          var b = this;
          return b !== document && (a.event.add(document, c + "." + a.guid, function () {
            a.event.trigger(c, Array.prototype.slice.call(arguments, 1), b, !0)
          }), a._data(this, c, a.guid++)), !1
        },
        teardown: function () {
          return this !== document && a.event.remove(document, c + "." + a._data(this, c)), !1
        }
      }
    }), a.event.special.ready = {
      setup: function () {
        this === document && d("'ready' event is deprecated")
      }
    };
    var M = a.fn.andSelf || a.fn.addBack,
      N = a.fn.find;
    if (a.fn.andSelf = function () {
        return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), M.apply(this, arguments)
      }, a.fn.find = function (a) {
        var b = N.apply(this, arguments);
        return b.context = this.context, b.selector = this.selector ? this.selector + " " + a : a, b
      }, a.Callbacks) {
      var O = a.Deferred,
        P = [
          ["resolve", "done", a.Callbacks("once memory"), a.Callbacks("once memory"), "resolved"],
          ["reject", "fail", a.Callbacks("once memory"), a.Callbacks("once memory"), "rejected"],
          ["notify", "progress", a.Callbacks("memory"), a.Callbacks("memory")]
        ];
      a.Deferred = function (b) {
        var c = O(),
          e = c.promise();
        return c.pipe = e.pipe = function () {
          var b = arguments;
          return d("deferred.pipe() is deprecated"), a.Deferred(function (d) {
            a.each(P, function (f, g) {
              var h = a.isFunction(b[f]) && b[f];
              c[g[1]](function () {
                var b = h && h.apply(this, arguments);
                b && a.isFunction(b.promise) ? b.promise().done(d.resolve).fail(d.reject).progress(d.notify) : d[g[0] + "With"](this === e ? d.promise() : this, h ? [b] : arguments)
              })
            }), b = null
          }).promise()
        }, c.isResolved = function () {
          return d("deferred.isResolved is deprecated"), "resolved" === c.state()
        }, c.isRejected = function () {
          return d("deferred.isRejected is deprecated"), "rejected" === c.state()
        }, b && b.call(c, c), c
      }
    }
  }(jQuery, window);
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function (a) {
  "use strict";
  var b = a.fn.jquery.split(" ")[0].split(".");
  if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function (a) {
  "use strict";

  function b() {
    var a = document.createElement("bootstrap"),
      b = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend"
      };
    for (var c in b)
      if (void 0 !== a.style[c]) return {
        end: b[c]
      };
    return !1
  }
  a.fn.emulateTransitionEnd = function (b) {
    var c = !1,
      d = this;
    a(this).one("bsTransitionEnd", function () {
      c = !0
    });
    var e = function () {
      c || a(d).trigger(a.support.transition.end)
    };
    return setTimeout(e, b), this
  }, a(function () {
    a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
      bindType: a.support.transition.end,
      delegateType: a.support.transition.end,
      handle: function (b) {
        return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
      }
    })
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var c = a(this),
        e = c.data("bs.alert");
      e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
    })
  }
  var c = '[data-dismiss="alert"]',
    d = function (b) {
      a(b).on("click", c, this.close)
    };
  d.VERSION = "3.3.5", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
    function c() {
      g.detach().trigger("closed.bs.alert").remove()
    }
    var e = a(this),
      f = e.attr("data-target");
    f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
    var g = a(f);
    b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
  };
  var e = a.fn.alert;
  a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
    return a.fn.alert = e, this
  }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.button"),
        f = "object" == typeof b && b;
      e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
    })
  }
  var c = function (b, d) {
    this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
  };
  c.VERSION = "3.3.5", c.DEFAULTS = {
    loadingText: "loading..."
  }, c.prototype.setState = function (b) {
    var c = "disabled",
      d = this.$element,
      e = d.is("input") ? "val" : "html",
      f = d.data();
    b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
      d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
    }, this), 0)
  }, c.prototype.toggle = function () {
    var a = !0,
      b = this.$element.closest('[data-toggle="buttons"]');
    if (b.length) {
      var c = this.$element.find("input");
      "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
    } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
  };
  var d = a.fn.button;
  a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
    return a.fn.button = d, this
  }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
    var d = a(c.target);
    d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault()
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
    a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.carousel"),
        f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
        g = "string" == typeof b ? b : f.slide;
      e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
    })
  }
  var c = function (b, c) {
    this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
  };
  c.VERSION = "3.3.5", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: !0,
    keyboard: !0
  }, c.prototype.keydown = function (a) {
    if (!/input|textarea/i.test(a.target.tagName)) {
      switch (a.which) {
        case 37:
          this.prev();
          break;
        case 39:
          this.next();
          break;
        default:
          return
      }
      a.preventDefault()
    }
  }, c.prototype.cycle = function (b) {
    return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
  }, c.prototype.getItemIndex = function (a) {
    return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
  }, c.prototype.getItemForDirection = function (a, b) {
    var c = this.getItemIndex(b),
      d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
    if (d && !this.options.wrap) return b;
    var e = "prev" == a ? -1 : 1,
      f = (c + e) % this.$items.length;
    return this.$items.eq(f)
  }, c.prototype.to = function (a) {
    var b = this,
      c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
      b.to(a)
    }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
  }, c.prototype.pause = function (b) {
    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
  }, c.prototype.next = function () {
    return this.sliding ? void 0 : this.slide("next")
  }, c.prototype.prev = function () {
    return this.sliding ? void 0 : this.slide("prev")
  }, c.prototype.slide = function (b, d) {
    var e = this.$element.find(".item.active"),
      f = d || this.getItemForDirection(b, e),
      g = this.interval,
      h = "next" == b ? "left" : "right",
      i = this;
    if (f.hasClass("active")) return this.sliding = !1;
    var j = f[0],
      k = a.Event("slide.bs.carousel", {
        relatedTarget: j,
        direction: h
      });
    if (this.$element.trigger(k), !k.isDefaultPrevented()) {
      if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
        this.$indicators.find(".active").removeClass("active");
        var l = a(this.$indicators.children()[this.getItemIndex(f)]);
        l && l.addClass("active")
      }
      var m = a.Event("slid.bs.carousel", {
        relatedTarget: j,
        direction: h
      });
      return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
        f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
          i.$element.trigger(m)
        }, 0)
      }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
    }
  };
  var d = a.fn.carousel;
  a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
    return a.fn.carousel = d, this
  };
  var e = function (c) {
    var d, e = a(this),
      f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
    if (f.hasClass("carousel")) {
      var g = a.extend({}, f.data(), e.data()),
        h = e.attr("data-slide-to");
      h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
    }
  };
  a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
    a('[data-ride="carousel"]').each(function () {
      var c = a(this);
      b.call(c, c.data())
    })
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
    return a(d)
  }

  function c(b) {
    return this.each(function () {
      var c = a(this),
        e = c.data("bs.collapse"),
        f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
      !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
    })
  }
  var d = function (b, c) {
    this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
  };
  d.VERSION = "3.3.5", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
    toggle: !0
  }, d.prototype.dimension = function () {
    var a = this.$element.hasClass("width");
    return a ? "width" : "height"
  }, d.prototype.show = function () {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
      if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
        var f = a.Event("show.bs.collapse");
        if (this.$element.trigger(f), !f.isDefaultPrevented()) {
          e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
          var g = this.dimension();
          this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
          var h = function () {
            this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
          };
          if (!a.support.transition) return h.call(this);
          var i = a.camelCase(["scroll", g].join("-"));
          this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
        }
      }
    }
  }, d.prototype.hide = function () {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var b = a.Event("hide.bs.collapse");
      if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.dimension();
        this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
        var e = function () {
          this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
        };
        return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
      }
    }
  }, d.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]()
  }, d.prototype.getParent = function () {
    return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
      var e = a(d);
      this.addAriaAndCollapsedClass(b(e), e)
    }, this)).end()
  }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
    var c = a.hasClass("in");
    a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
  };
  var e = a.fn.collapse;
  a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
    return a.fn.collapse = e, this
  }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
    var e = a(this);
    e.attr("data-target") || d.preventDefault();
    var f = b(e),
      g = f.data("bs.collapse"),
      h = g ? "toggle" : e.data();
    c.call(f, h)
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    var c = b.attr("data-target");
    c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
    var d = c && a(c);
    return d && d.length ? d : b.parent()
  }

  function c(c) {
    c && 3 === c.which || (a(e).remove(), a(f).each(function () {
      var d = a(this),
        e = b(d),
        f = {
          relatedTarget: this
        };
      e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f))))
    }))
  }

  function d(b) {
    return this.each(function () {
      var c = a(this),
        d = c.data("bs.dropdown");
      d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
    })
  }
  var e = ".dropdown-backdrop",
    f = '[data-toggle="dropdown"]',
    g = function (b) {
      a(b).on("click.bs.dropdown", this.toggle)
    };
  g.VERSION = "3.3.5", g.prototype.toggle = function (d) {
    var e = a(this);
    if (!e.is(".disabled, :disabled")) {
      var f = b(e),
        g = f.hasClass("open");
      if (c(), !g) {
        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
        var h = {
          relatedTarget: this
        };
        if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
        e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
      }
      return !1
    }
  }, g.prototype.keydown = function (c) {
    if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
      var d = a(this);
      if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
        var e = b(d),
          g = e.hasClass("open");
        if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
        var h = " li:not(.disabled):visible a",
          i = e.find(".dropdown-menu" + h);
        if (i.length) {
          var j = i.index(c.target);
          38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
        }
      }
    }
  };
  var h = a.fn.dropdown;
  a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
    return a.fn.dropdown = h, this
  }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
    a.stopPropagation()
  }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function (a) {
  "use strict";

  function b(b, d) {
    return this.each(function () {
      var e = a(this),
        f = e.data("bs.modal"),
        g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
      f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
    })
  }
  var c = function (b, c) {
    this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
      this.$element.trigger("loaded.bs.modal")
    }, this))
  };
  c.VERSION = "3.3.5", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
  }, c.prototype.toggle = function (a) {
    return this.isShown ? this.hide() : this.show(a)
  }, c.prototype.show = function (b) {
    var d = this,
      e = a.Event("show.bs.modal", {
        relatedTarget: b
      });
    this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
      d.$element.one("mouseup.dismiss.bs.modal", function (b) {
        a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
      })
    }), this.backdrop(function () {
      var e = a.support.transition && d.$element.hasClass("fade");
      d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
      var f = a.Event("shown.bs.modal", {
        relatedTarget: b
      });
      e ? d.$dialog.one("bsTransitionEnd", function () {
        d.$element.trigger("focus").trigger(f)
      }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
    }))
  }, c.prototype.hide = function (b) {
    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
  }, c.prototype.enforceFocus = function () {
    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
      this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
    }, this))
  }, c.prototype.escape = function () {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
      27 == a.which && this.hide()
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
  }, c.prototype.resize = function () {
    this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
  }, c.prototype.hideModal = function () {
    var a = this;
    this.$element.hide(), this.backdrop(function () {
      a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
    })
  }, c.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
  }, c.prototype.backdrop = function (b) {
    var d = this,
      e = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var f = a.support.transition && e;
      if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
          return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
        }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
      f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");
      var g = function () {
        d.removeBackdrop(), b && b()
      };
      a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
    } else b && b()
  }, c.prototype.handleUpdate = function () {
    this.adjustDialog()
  }, c.prototype.adjustDialog = function () {
    var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
      paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
    })
  }, c.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: "",
      paddingRight: ""
    })
  }, c.prototype.checkScrollbar = function () {
    var a = window.innerWidth;
    if (!a) {
      var b = document.documentElement.getBoundingClientRect();
      a = b.right - Math.abs(b.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
  }, c.prototype.setScrollbar = function () {
    var a = parseInt(this.$body.css("padding-right") || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
  }, c.prototype.resetScrollbar = function () {
    this.$body.css("padding-right", this.originalBodyPad)
  }, c.prototype.measureScrollbar = function () {
    var a = document.createElement("div");
    a.className = "modal-scrollbar-measure", this.$body.append(a);
    var b = a.offsetWidth - a.clientWidth;
    return this.$body[0].removeChild(a), b
  };
  var d = a.fn.modal;
  a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
    return a.fn.modal = d, this
  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
    var d = a(this),
      e = d.attr("href"),
      f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
      g = f.data("bs.modal") ? "toggle" : a.extend({
        remote: !/#/.test(e) && e
      }, f.data(), d.data());
    d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
      a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
        d.is(":visible") && d.trigger("focus")
      })
    }), b.call(f, g, this)
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.tooltip"),
        f = "object" == typeof b && b;
      (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
    })
  }
  var c = function (a, b) {
    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
  };
  c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1,
    viewport: {
      selector: "body",
      padding: 0
    }
  }, c.prototype.init = function (b, c, d) {
    if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
        click: !1,
        hover: !1,
        focus: !1
      }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
    for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
      var g = e[f];
      if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
      else if ("manual" != g) {
        var h = "hover" == g ? "mouseenter" : "focusin",
          i = "hover" == g ? "mouseleave" : "focusout";
        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
      }
    }
    this.options.selector ? this._options = a.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle()
  }, c.prototype.getDefaults = function () {
    return c.DEFAULTS
  }, c.prototype.getOptions = function (b) {
    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
      show: b.delay,
      hide: b.delay
    }), b
  }, c.prototype.getDelegateOptions = function () {
    var b = {},
      c = this.getDefaults();
    return this._options && a.each(this._options, function (a, d) {
      c[a] != d && (b[a] = d)
    }), b
  }, c.prototype.enter = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function () {
      "in" == c.hoverState && c.show()
    }, c.options.delay.show)) : c.show())
  }, c.prototype.isInStateTrue = function () {
    for (var a in this.inState)
      if (this.inState[a]) return !0;
    return !1
  }, c.prototype.leave = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function () {
      "out" == c.hoverState && c.hide()
    }, c.options.delay.hide)) : c.hide())
  }, c.prototype.show = function () {
    var b = a.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(b);
      var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (b.isDefaultPrevented() || !d) return;
      var e = this,
        f = this.tip(),
        g = this.getUID(this.type);
      this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
      var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
        i = /\s?auto?\s?/i,
        j = i.test(h);
      j && (h = h.replace(i, "") || "top"), f.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
      var k = this.getPosition(),
        l = f[0].offsetWidth,
        m = f[0].offsetHeight;
      if (j) {
        var n = h,
          o = this.getPosition(this.$viewport);
        h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
      }
      var p = this.getCalculatedOffset(h, k, l, m);
      this.applyPlacement(p, h);
      var q = function () {
        var a = e.hoverState;
        e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
      };
      a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
    }
  }, c.prototype.applyPlacement = function (b, c) {
    var d = this.tip(),
      e = d[0].offsetWidth,
      f = d[0].offsetHeight,
      g = parseInt(d.css("margin-top"), 10),
      h = parseInt(d.css("margin-left"), 10);
    isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
      using: function (a) {
        d.css({
          top: Math.round(a.top),
          left: Math.round(a.left)
        })
      }
    }, b), 0), d.addClass("in");
    var i = d[0].offsetWidth,
      j = d[0].offsetHeight;
    "top" == c && j != f && (b.top = b.top + f - j);
    var k = this.getViewportAdjustedDelta(c, b, i, j);
    k.left ? b.left += k.left : b.top += k.top;
    var l = /top|bottom/.test(c),
      m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
      n = l ? "offsetWidth" : "offsetHeight";
    d.offset(b), this.replaceArrow(m, d[0][n], l)
  }, c.prototype.replaceArrow = function (a, b, c) {
    this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
  }, c.prototype.setContent = function () {
    var a = this.tip(),
      b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
  }, c.prototype.hide = function (b) {
    function d() {
      "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
    }
    var e = this,
      f = a(this.$tip),
      g = a.Event("hide.bs." + this.type);
    return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
  }, c.prototype.fixTitle = function () {
    var a = this.$element;
    (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
  }, c.prototype.hasContent = function () {
    return this.getTitle()
  }, c.prototype.getPosition = function (b) {
    b = b || this.$element;
    var c = b[0],
      d = "BODY" == c.tagName,
      e = c.getBoundingClientRect();
    null == e.width && (e = a.extend({}, e, {
      width: e.right - e.left,
      height: e.bottom - e.top
    }));
    var f = d ? {
        top: 0,
        left: 0
      } : b.offset(),
      g = {
        scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
      },
      h = d ? {
        width: a(window).width(),
        height: a(window).height()
      } : null;
    return a.extend({}, e, g, h, f)
  }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
    return "bottom" == a ? {
      top: b.top + b.height,
      left: b.left + b.width / 2 - c / 2
    } : "top" == a ? {
      top: b.top - d,
      left: b.left + b.width / 2 - c / 2
    } : "left" == a ? {
      top: b.top + b.height / 2 - d / 2,
      left: b.left - c
    } : {
      top: b.top + b.height / 2 - d / 2,
      left: b.left + b.width
    }
  }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
    var e = {
      top: 0,
      left: 0
    };
    if (!this.$viewport) return e;
    var f = this.options.viewport && this.options.viewport.padding || 0,
      g = this.getPosition(this.$viewport);
    if (/right|left/.test(a)) {
      var h = b.top - f - g.scroll,
        i = b.top + f - g.scroll + d;
      h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
    } else {
      var j = b.left - f,
        k = b.left + f + c;
      j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
    }
    return e
  }, c.prototype.getTitle = function () {
    var a, b = this.$element,
      c = this.options;
    return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
  }, c.prototype.getUID = function (a) {
    do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
    return a
  }, c.prototype.tip = function () {
    if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
    return this.$tip
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
  }, c.prototype.enable = function () {
    this.enabled = !0
  }, c.prototype.disable = function () {
    this.enabled = !1
  }, c.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }, c.prototype.toggle = function (b) {
    var c = this;
    b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
  }, c.prototype.destroy = function () {
    var a = this;
    clearTimeout(this.timeout), this.hide(function () {
      a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null
    })
  };
  var d = a.fn.tooltip;
  a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
    return a.fn.tooltip = d, this
  }
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.popover"),
        f = "object" == typeof b && b;
      (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
    })
  }
  var c = function (a, b) {
    this.init("popover", a, b)
  };
  if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
  c.VERSION = "3.3.5", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
    return c.DEFAULTS
  }, c.prototype.setContent = function () {
    var a = this.tip(),
      b = this.getTitle(),
      c = this.getContent();
    a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
  }, c.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }, c.prototype.getContent = function () {
    var a = this.$element,
      b = this.options;
    return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".arrow")
  };
  var d = a.fn.popover;
  a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
    return a.fn.popover = d, this
  }
}(jQuery), + function (a) {
  "use strict";

  function b(c, d) {
    this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
  }

  function c(c) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.scrollspy"),
        f = "object" == typeof c && c;
      e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }
  b.VERSION = "3.3.5", b.DEFAULTS = {
    offset: 10
  }, b.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }, b.prototype.refresh = function () {
    var b = this,
      c = "offset",
      d = 0;
    this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
      var b = a(this),
        e = b.data("target") || b.attr("href"),
        f = /^#./.test(e) && a(e);
      return f && f.length && f.is(":visible") && [
        [f[c]().top + d, e]
      ] || null
    }).sort(function (a, b) {
      return a[0] - b[0]
    }).each(function () {
      b.offsets.push(this[0]), b.targets.push(this[1])
    })
  }, b.prototype.process = function () {
    var a, b = this.$scrollElement.scrollTop() + this.options.offset,
      c = this.getScrollHeight(),
      d = this.options.offset + c - this.$scrollElement.height(),
      e = this.offsets,
      f = this.targets,
      g = this.activeTarget;
    if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
    if (g && b < e[0]) return this.activeTarget = null, this.clear();
    for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
  }, b.prototype.activate = function (b) {
    this.activeTarget = b, this.clear();
    var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
      d = a(c).parents("li").addClass("active");
    d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")),
      d.trigger("activate.bs.scrollspy")
  }, b.prototype.clear = function () {
    a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
  };
  var d = a.fn.scrollspy;
  a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
    return a.fn.scrollspy = d, this
  }, a(window).on("load.bs.scrollspy.data-api", function () {
    a('[data-spy="scroll"]').each(function () {
      var b = a(this);
      c.call(b, b.data())
    })
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.tab");
      e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
    })
  }
  var c = function (b) {
    this.element = a(b)
  };
  c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
    var b = this.element,
      c = b.closest("ul:not(.dropdown-menu)"),
      d = b.data("target");
    if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
      var e = c.find(".active:last a"),
        f = a.Event("hide.bs.tab", {
          relatedTarget: b[0]
        }),
        g = a.Event("show.bs.tab", {
          relatedTarget: e[0]
        });
      if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
        var h = a(d);
        this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
          e.trigger({
            type: "hidden.bs.tab",
            relatedTarget: b[0]
          }), b.trigger({
            type: "shown.bs.tab",
            relatedTarget: e[0]
          })
        })
      }
    }
  }, c.prototype.activate = function (b, d, e) {
    function f() {
      g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
    }
    var g = d.find("> .active"),
      h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
    g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
  };
  var d = a.fn.tab;
  a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
    return a.fn.tab = d, this
  };
  var e = function (c) {
    c.preventDefault(), b.call(a(this), "show")
  };
  a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.affix"),
        f = "object" == typeof b && b;
      e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
    })
  }
  var c = function (b, d) {
    this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
  };
  c.VERSION = "3.3.5", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
    offset: 0,
    target: window
  }, c.prototype.getState = function (a, b, c, d) {
    var e = this.$target.scrollTop(),
      f = this.$element.offset(),
      g = this.$target.height();
    if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
    if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
    var h = null == this.affixed,
      i = h ? e : f.top,
      j = h ? g : b;
    return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
  }, c.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(c.RESET).addClass("affix");
    var a = this.$target.scrollTop(),
      b = this.$element.offset();
    return this.pinnedOffset = b.top - a
  }, c.prototype.checkPositionWithEventLoop = function () {
    setTimeout(a.proxy(this.checkPosition, this), 1)
  }, c.prototype.checkPosition = function () {
    if (this.$element.is(":visible")) {
      var b = this.$element.height(),
        d = this.options.offset,
        e = d.top,
        f = d.bottom,
        g = Math.max(a(document).height(), a(document.body).height());
      "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
      var h = this.getState(g, b, e, f);
      if (this.affixed != h) {
        null != this.unpin && this.$element.css("top", "");
        var i = "affix" + (h ? "-" + h : ""),
          j = a.Event(i + ".bs.affix");
        if (this.$element.trigger(j), j.isDefaultPrevented()) return;
        this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
      }
      "bottom" == h && this.$element.offset({
        top: g - b - f
      })
    }
  };
  var d = a.fn.affix;
  a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
    return a.fn.affix = d, this
  }, a(window).on("load", function () {
    a('[data-spy="affix"]').each(function () {
      var c = a(this),
        d = c.data();
      d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
    })
  })
}(jQuery);
(function () {
  var t = [].indexOf || function (t) {
      for (var e = 0, n = this.length; e < n; e++) {
        if (e in this && this[e] === t) return e
      }
      return -1
    },
    e = [].slice;
  (function (t, e) {
    if (typeof define === "function" && define.amd) {
      return define("waypoints", ["jquery"], function (n) {
        return e(n, t)
      })
    } else {
      return e(t.jQuery, t)
    }
  })(this, function (n, r) {
    var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
    i = n(r);
    c = t.call(r, "ontouchstart") >= 0;
    s = {
      horizontal: {},
      vertical: {}
    };
    f = 1;
    a = {};
    u = "waypoints-context-id";
    p = "resize.waypoints";
    y = "scroll.waypoints";
    v = 1;
    w = "waypoints-waypoint-ids";
    g = "waypoint";
    m = "waypoints";
    o = function () {
      function t(t) {
        var e = this;
        this.$element = t;
        this.element = t[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = "context" + f++;
        this.oldScroll = {
          x: t.scrollLeft(),
          y: t.scrollTop()
        };
        this.waypoints = {
          horizontal: {},
          vertical: {}
        };
        t.data(u, this.id);
        a[this.id] = this;
        t.bind(y, function () {
          var t;
          if (!(e.didScroll || c)) {
            e.didScroll = true;
            t = function () {
              e.doScroll();
              return e.didScroll = false
            };
            return r.setTimeout(t, n[m].settings.scrollThrottle)
          }
        });
        t.bind(p, function () {
          var t;
          if (!e.didResize) {
            e.didResize = true;
            t = function () {
              n[m]("refresh");
              return e.didResize = false
            };
            return r.setTimeout(t, n[m].settings.resizeThrottle)
          }
        })
      }
      t.prototype.doScroll = function () {
        var t, e = this;
        t = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left"
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up"
          }
        };
        if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
          n[m]("refresh")
        }
        n.each(t, function (t, r) {
          var i, o, l;
          l = [];
          o = r.newScroll > r.oldScroll;
          i = o ? r.forward : r.backward;
          n.each(e.waypoints[t], function (t, e) {
            var n, i;
            if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
              return l.push(e)
            } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
              return l.push(e)
            }
          });
          l.sort(function (t, e) {
            return t.offset - e.offset
          });
          if (!o) {
            l.reverse()
          }
          return n.each(l, function (t, e) {
            if (e.options.continuous || t === l.length - 1) {
              return e.trigger([i])
            }
          })
        });
        return this.oldScroll = {
          x: t.horizontal.newScroll,
          y: t.vertical.newScroll
        }
      };
      t.prototype.refresh = function () {
        var t, e, r, i = this;
        r = n.isWindow(this.element);
        e = this.$element.offset();
        this.doScroll();
        t = {
          horizontal: {
            contextOffset: r ? 0 : e.left,
            contextScroll: r ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
            offsetProp: "left"
          },
          vertical: {
            contextOffset: r ? 0 : e.top,
            contextScroll: r ? 0 : this.oldScroll.y,
            contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
            offsetProp: "top"
          }
        };
        return n.each(t, function (t, e) {
          return n.each(i.waypoints[t], function (t, r) {
            var i, o, l, s, f;
            i = r.options.offset;
            l = r.offset;
            o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
            if (n.isFunction(i)) {
              i = i.apply(r.element)
            } else if (typeof i === "string") {
              i = parseFloat(i);
              if (r.options.offset.indexOf("%") > -1) {
                i = Math.ceil(e.contextDimension * i / 100)
              }
            }
            r.offset = o - e.contextOffset + e.contextScroll - i;
            if (r.options.onlyOnScroll && l != null || !r.enabled) {
              return
            }
            if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
              return r.trigger([e.backward])
            } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
              return r.trigger([e.forward])
            } else if (l === null && e.oldScroll >= r.offset) {
              return r.trigger([e.forward])
            }
          })
        })
      };
      t.prototype.checkEmpty = function () {
        if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
          this.$element.unbind([p, y].join(" "));
          return delete a[this.id]
        }
      };
      return t
    }();
    l = function () {
      function t(t, e, r) {
        var i, o;
        r = n.extend({}, n.fn[g].defaults, r);
        if (r.offset === "bottom-in-view") {
          r.offset = function () {
            var t;
            t = n[m]("viewportHeight");
            if (!n.isWindow(e.element)) {
              t = e.$element.height()
            }
            return t - n(this).outerHeight()
          }
        }
        this.$element = t;
        this.element = t[0];
        this.axis = r.horizontal ? "horizontal" : "vertical";
        this.callback = r.handler;
        this.context = e;
        this.enabled = r.enabled;
        this.id = "waypoints" + v++;
        this.offset = null;
        this.options = r;
        e.waypoints[this.axis][this.id] = this;
        s[this.axis][this.id] = this;
        i = (o = t.data(w)) != null ? o : [];
        i.push(this.id);
        t.data(w, i)
      }
      t.prototype.trigger = function (t) {
        if (!this.enabled) {
          return
        }
        if (this.callback != null) {
          this.callback.apply(this.element, t)
        }
        if (this.options.triggerOnce) {
          return this.destroy()
        }
      };
      t.prototype.disable = function () {
        return this.enabled = false
      };
      t.prototype.enable = function () {
        this.context.refresh();
        return this.enabled = true
      };
      t.prototype.destroy = function () {
        delete s[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty()
      };
      t.getWaypointsByElement = function (t) {
        var e, r;
        r = n(t).data(w);
        if (!r) {
          return []
        }
        e = n.extend({}, s.horizontal, s.vertical);
        return n.map(r, function (t) {
          return e[t]
        })
      };
      return t
    }();
    d = {
      init: function (t, e) {
        var r;
        if (e == null) {
          e = {}
        }
        if ((r = e.handler) == null) {
          e.handler = t
        }
        this.each(function () {
          var t, r, i, s;
          t = n(this);
          i = (s = e.context) != null ? s : n.fn[g].defaults.context;
          if (!n.isWindow(i)) {
            i = t.closest(i)
          }
          i = n(i);
          r = a[i.data(u)];
          if (!r) {
            r = new o(i)
          }
          return new l(t, r, e)
        });
        n[m]("refresh");
        return this
      },
      disable: function () {
        return d._invoke(this, "disable")
      },
      enable: function () {
        return d._invoke(this, "enable")
      },
      destroy: function () {
        return d._invoke(this, "destroy")
      },
      prev: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e > 0) {
            return t.push(n[e - 1])
          }
        })
      },
      next: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e < n.length - 1) {
            return t.push(n[e + 1])
          }
        })
      },
      _traverse: function (t, e, i) {
        var o, l;
        if (t == null) {
          t = "vertical"
        }
        if (e == null) {
          e = r
        }
        l = h.aggregate(e);
        o = [];
        this.each(function () {
          var e;
          e = n.inArray(this, l[t]);
          return i(o, e, l[t])
        });
        return this.pushStack(o)
      },
      _invoke: function (t, e) {
        t.each(function () {
          var t;
          t = l.getWaypointsByElement(this);
          return n.each(t, function (t, n) {
            n[e]();
            return true
          })
        });
        return this
      }
    };
    n.fn[g] = function () {
      var t, r;
      r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
      if (d[r]) {
        return d[r].apply(this, t)
      } else if (n.isFunction(r)) {
        return d.init.apply(this, arguments)
      } else if (n.isPlainObject(r)) {
        return d.init.apply(this, [null, r])
      } else if (!r) {
        return n.error("jQuery Waypoints needs a callback function or handler option.")
      } else {
        return n.error("The " + r + " method does not exist in jQuery Waypoints.")
      }
    };
    n.fn[g].defaults = {
      context: r,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false
    };
    h = {
      refresh: function () {
        return n.each(a, function (t, e) {
          return e.refresh()
        })
      },
      viewportHeight: function () {
        var t;
        return (t = r.innerHeight) != null ? t : i.height()
      },
      aggregate: function (t) {
        var e, r, i;
        e = s;
        if (t) {
          e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
        }
        if (!e) {
          return []
        }
        r = {
          horizontal: [],
          vertical: []
        };
        n.each(r, function (t, i) {
          n.each(e[t], function (t, e) {
            return i.push(e)
          });
          i.sort(function (t, e) {
            return t.offset - e.offset
          });
          r[t] = n.map(i, function (t) {
            return t.element
          });
          return r[t] = n.unique(r[t])
        });
        return r
      },
      above: function (t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset <= t.oldScroll.y
        })
      },
      below: function (t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset > t.oldScroll.y
        })
      },
      left: function (t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset <= t.oldScroll.x
        })
      },
      right: function (t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset > t.oldScroll.x
        })
      },
      enable: function () {
        return h._invoke("enable")
      },
      disable: function () {
        return h._invoke("disable")
      },
      destroy: function () {
        return h._invoke("destroy")
      },
      extendFn: function (t, e) {
        return d[t] = e
      },
      _invoke: function (t) {
        var e;
        e = n.extend({}, s.vertical, s.horizontal);
        return n.each(e, function (e, n) {
          n[t]();
          return true
        })
      },
      _filter: function (t, e, r) {
        var i, o;
        i = a[n(t).data(u)];
        if (!i) {
          return []
        }
        o = [];
        n.each(i.waypoints[e], function (t, e) {
          if (r(i, e)) {
            return o.push(e)
          }
        });
        o.sort(function (t, e) {
          return t.offset - e.offset
        });
        return n.map(o, function (t) {
          return t.element
        })
      }
    };
    n[m] = function () {
      var t, n;
      n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
      if (h[n]) {
        return h[n].apply(null, t)
      } else {
        return h.aggregate.call(null, n)
      }
    };
    n[m].settings = {
      resizeThrottle: 100,
      scrollThrottle: 30
    };
    return i.load(function () {
      return n[m]("refresh")
    })
  })
}).call(this);
/*! skrollr 0.6.26 (2014-06-08) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(function (e, t, r) {
  "use strict";

  function n(r) {
    if (o = t.documentElement, a = t.body, K(), it = this, r = r || {}, ut = r.constants || {}, r.easing)
      for (var n in r.easing) U[n] = r.easing[n];
    yt = r.edgeStrategy || "set", ct = {
      beforerender: r.beforerender,
      render: r.render,
      keyframe: r.keyframe
    }, ft = r.forceHeight !== !1, ft && (Vt = r.scale || 1), mt = r.mobileDeceleration || x, dt = r.smoothScrolling !== !1, gt = r.smoothScrollingDuration || E, vt = {
      targetTop: it.getScrollTop()
    }, Gt = (r.mobileCheck || function () {
      return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || e.opera)
    })(), Gt ? (st = t.getElementById("skrollr-body"), st && at(), X(), Dt(o, [y, S], [T])) : Dt(o, [y, b], [T]), it.refresh(), St(e, "resize orientationchange", function () {
      var e = o.clientWidth,
        t = o.clientHeight;
      (t !== $t || e !== Mt) && ($t = t, Mt = e, _t = !0)
    });
    var i = Y();
    return function l() {
      Z(), bt = i(l)
    }(), it
  }
  var o, a, i = {
      get: function () {
        return it
      },
      init: function (e) {
        return it || new n(e)
      },
      VERSION: "0.6.26"
    },
    l = Object.prototype.hasOwnProperty,
    s = e.Math,
    c = e.getComputedStyle,
    f = "touchstart",
    u = "touchmove",
    m = "touchcancel",
    p = "touchend",
    d = "skrollable",
    g = d + "-before",
    v = d + "-between",
    h = d + "-after",
    y = "skrollr",
    T = "no-" + y,
    b = y + "-desktop",
    S = y + "-mobile",
    k = "linear",
    w = 1e3,
    x = .004,
    E = 200,
    A = "start",
    F = "end",
    C = "center",
    D = "bottom",
    H = "___skrollable_id",
    I = /^(?:input|textarea|button|select)$/i,
    P = /^\s+|\s+$/g,
    N = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
    O = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
    V = /^(@?[a-z\-]+)\[(\w+)\]$/,
    z = /-([a-z0-9_])/g,
    q = function (e, t) {
      return t.toUpperCase()
    },
    L = /[\-+]?[\d]*\.?[\d]+/g,
    M = /\{\?\}/g,
    $ = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
    _ = /[a-z\-]+-gradient/g,
    B = "",
    G = "",
    K = function () {
      var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
      if (c) {
        var t = c(a, null);
        for (var n in t)
          if (B = n.match(e) || +n == n && t[n].match(e)) break;
        if (!B) return B = G = "", r;
        B = B[0], "-" === B.slice(0, 1) ? (G = B, B = {
          "-webkit-": "webkit",
          "-moz-": "Moz",
          "-ms-": "ms",
          "-o-": "O"
        } [B]) : G = "-" + B.toLowerCase() + "-"
      }
    },
    Y = function () {
      var t = e.requestAnimationFrame || e[B.toLowerCase() + "RequestAnimationFrame"],
        r = Pt();
      return (Gt || !t) && (t = function (t) {
        var n = Pt() - r,
          o = s.max(0, 1e3 / 60 - n);
        return e.setTimeout(function () {
          r = Pt(), t()
        }, o)
      }), t
    },
    R = function () {
      var t = e.cancelAnimationFrame || e[B.toLowerCase() + "CancelAnimationFrame"];
      return (Gt || !t) && (t = function (t) {
        return e.clearTimeout(t)
      }), t
    },
    U = {
      begin: function () {
        return 0
      },
      end: function () {
        return 1
      },
      linear: function (e) {
        return e
      },
      quadratic: function (e) {
        return e * e
      },
      cubic: function (e) {
        return e * e * e
      },
      swing: function (e) {
        return -s.cos(e * s.PI) / 2 + .5
      },
      sqrt: function (e) {
        return s.sqrt(e)
      },
      outCubic: function (e) {
        return s.pow(e - 1, 3) + 1
      },
      bounce: function (e) {
        var t;
        if (.5083 >= e) t = 3;
        else if (.8489 >= e) t = 9;
        else if (.96208 >= e) t = 27;
        else {
          if (!(.99981 >= e)) return 1;
          t = 91
        }
        return 1 - s.abs(3 * s.cos(1.028 * e * t) / t)
      }
    };
  n.prototype.refresh = function (e) {
    var n, o, a = !1;
    for (e === r ? (a = !0, lt = [], Bt = 0, e = t.getElementsByTagName("*")) : e.length === r && (e = [e]), n = 0, o = e.length; o > n; n++) {
      var i = e[n],
        l = i,
        s = [],
        c = dt,
        f = yt,
        u = !1;
      if (a && H in i && delete i[H], i.attributes) {
        for (var m = 0, p = i.attributes.length; p > m; m++) {
          var g = i.attributes[m];
          if ("data-anchor-target" !== g.name)
            if ("data-smooth-scrolling" !== g.name)
              if ("data-edge-strategy" !== g.name)
                if ("data-emit-events" !== g.name) {
                  var v = g.name.match(N);
                  if (null !== v) {
                    var h = {
                      props: g.value,
                      element: i,
                      eventType: g.name.replace(z, q)
                    };
                    s.push(h);
                    var y = v[1];
                    y && (h.constant = y.substr(1));
                    var T = v[2];
                    /p$/.test(T) ? (h.isPercentage = !0, h.offset = (0 | T.slice(0, -1)) / 100) : h.offset = 0 | T;
                    var b = v[3],
                      S = v[4] || b;
                    b && b !== A && b !== F ? (h.mode = "relative", h.anchors = [b, S]) : (h.mode = "absolute", b === F ? h.isEnd = !0 : h.isPercentage || (h.offset = h.offset * Vt))
                  }
                } else u = !0;
          else f = g.value;
          else c = "off" !== g.value;
          else if (l = t.querySelector(g.value), null === l) throw 'Unable to find anchor target "' + g.value + '"'
        }
        if (s.length) {
          var k, w, x;
          !a && H in i ? (x = i[H], k = lt[x].styleAttr, w = lt[x].classAttr) : (x = i[H] = Bt++, k = i.style.cssText, w = Ct(i)), lt[x] = {
            element: i,
            styleAttr: k,
            classAttr: w,
            anchorTarget: l,
            keyFrames: s,
            smoothScrolling: c,
            edgeStrategy: f,
            emitEvents: u,
            lastFrameIndex: -1
          }, Dt(i, [d], [])
        }
      }
    }
    for (Et(), n = 0, o = e.length; o > n; n++) {
      var E = lt[e[n][H]];
      E !== r && (J(E), et(E))
    }
    return it
  }, n.prototype.relativeToAbsolute = function (e, t, r) {
    var n = o.clientHeight,
      a = e.getBoundingClientRect(),
      i = a.top,
      l = a.bottom - a.top;
    return t === D ? i -= n : t === C && (i -= n / 2), r === D ? i += l : r === C && (i += l / 2), i += it.getScrollTop(), 0 | i + .5
  }, n.prototype.animateTo = function (e, t) {
    t = t || {};
    var n = Pt(),
      o = it.getScrollTop();
    return pt = {
      startTop: o,
      topDiff: e - o,
      targetTop: e,
      duration: t.duration || w,
      startTime: n,
      endTime: n + (t.duration || w),
      easing: U[t.easing || k],
      done: t.done
    }, pt.topDiff || (pt.done && pt.done.call(it, !1), pt = r), it
  }, n.prototype.stopAnimateTo = function () {
    pt && pt.done && pt.done.call(it, !0), pt = r
  }, n.prototype.isAnimatingTo = function () {
    return !!pt
  }, n.prototype.isMobile = function () {
    return Gt
  }, n.prototype.setScrollTop = function (t, r) {
    return ht = r === !0, Gt ? Kt = s.min(s.max(t, 0), Ot) : e.scrollTo(0, t), it
  }, n.prototype.getScrollTop = function () {
    return Gt ? Kt : e.pageYOffset || o.scrollTop || a.scrollTop || 0
  }, n.prototype.getMaxScrollTop = function () {
    return Ot
  }, n.prototype.on = function (e, t) {
    return ct[e] = t, it
  }, n.prototype.off = function (e) {
    return delete ct[e], it
  }, n.prototype.destroy = function () {
    var e = R();
    e(bt), wt(), Dt(o, [T], [y, b, S]);
    for (var t = 0, n = lt.length; n > t; t++) ot(lt[t].element);
    o.style.overflow = a.style.overflow = "", o.style.height = a.style.height = "", st && i.setStyle(st, "transform", "none"), it = r, st = r, ct = r, ft = r, Ot = 0, Vt = 1, ut = r, mt = r, zt = "down", qt = -1, Mt = 0, $t = 0, _t = !1, pt = r, dt = r, gt = r, vt = r, ht = r, Bt = 0, yt = r, Gt = !1, Kt = 0, Tt = r
  };
  var X = function () {
      var n, i, l, c, d, g, v, h, y, T, b, S;
      St(o, [f, u, m, p].join(" "), function (e) {
        var o = e.changedTouches[0];
        for (c = e.target; 3 === c.nodeType;) c = c.parentNode;
        switch (d = o.clientY, g = o.clientX, T = e.timeStamp, I.test(c.tagName) || e.preventDefault(), e.type) {
          case f:
            n && n.blur(), it.stopAnimateTo(), n = c, i = v = d, l = g, y = T;
            break;
          case u:
            I.test(c.tagName) && t.activeElement !== c && e.preventDefault(), h = d - v, S = T - b, it.setScrollTop(Kt - h, !0), v = d, b = T;
            break;
          default:
          case m:
          case p:
            var a = i - d,
              k = l - g,
              w = k * k + a * a;
            if (49 > w) {
              if (!I.test(n.tagName)) {
                n.focus();
                var x = t.createEvent("MouseEvents");
                x.initMouseEvent("click", !0, !0, e.view, 1, o.screenX, o.screenY, o.clientX, o.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), n.dispatchEvent(x)
              }
              return
            }
            n = r;
            var E = h / S;
            E = s.max(s.min(E, 3), -3);
            var A = s.abs(E / mt),
              F = E * A + .5 * mt * A * A,
              C = it.getScrollTop() - F,
              D = 0;
            C > Ot ? (D = (Ot - C) / F, C = Ot) : 0 > C && (D = -C / F, C = 0), A *= 1 - D, it.animateTo(0 | C + .5, {
              easing: "outCubic",
              duration: A
            })
        }
      }), e.scrollTo(0, 0), o.style.overflow = a.style.overflow = "hidden"
    },
    j = function () {
      var e, t, r, n, a, i, l, c, f, u, m, p = o.clientHeight,
        d = At();
      for (c = 0, f = lt.length; f > c; c++)
        for (e = lt[c], t = e.element, r = e.anchorTarget, n = e.keyFrames, a = 0, i = n.length; i > a; a++) l = n[a], u = l.offset, m = d[l.constant] || 0, l.frame = u, l.isPercentage && (u *= p, l.frame = u), "relative" === l.mode && (ot(t), l.frame = it.relativeToAbsolute(r, l.anchors[0], l.anchors[1]) - u, ot(t, !0)), l.frame += m, ft && !l.isEnd && l.frame > Ot && (Ot = l.frame);
      for (Ot = s.max(Ot, Ft()), c = 0, f = lt.length; f > c; c++) {
        for (e = lt[c], n = e.keyFrames, a = 0, i = n.length; i > a; a++) l = n[a], m = d[l.constant] || 0, l.isEnd && (l.frame = Ot - l.offset + m);
        e.keyFrames.sort(Nt)
      }
    },
    W = function (e, t) {
      for (var r = 0, n = lt.length; n > r; r++) {
        var o, a, s = lt[r],
          c = s.element,
          f = s.smoothScrolling ? e : t,
          u = s.keyFrames,
          m = u.length,
          p = u[0],
          y = u[u.length - 1],
          T = p.frame > f,
          b = f > y.frame,
          S = T ? p : y,
          k = s.emitEvents,
          w = s.lastFrameIndex;
        if (T || b) {
          if (T && -1 === s.edge || b && 1 === s.edge) continue;
          switch (T ? (Dt(c, [g], [h, v]), k && w > -1 && (xt(c, p.eventType, zt), s.lastFrameIndex = -1)) : (Dt(c, [h], [g, v]), k && m > w && (xt(c, y.eventType, zt), s.lastFrameIndex = m)), s.edge = T ? -1 : 1, s.edgeStrategy) {
            case "reset":
              ot(c);
              continue;
            case "ease":
              f = S.frame;
              break;
            default:
            case "set":
              var x = S.props;
              for (o in x) l.call(x, o) && (a = nt(x[o].value), 0 === o.indexOf("@") ? c.setAttribute(o.substr(1), a) : i.setStyle(c, o, a));
              continue
          }
        } else 0 !== s.edge && (Dt(c, [d, v], [g, h]), s.edge = 0);
        for (var E = 0; m - 1 > E; E++)
          if (f >= u[E].frame && u[E + 1].frame >= f) {
            var A = u[E],
              F = u[E + 1];
            for (o in A.props)
              if (l.call(A.props, o)) {
                var C = (f - A.frame) / (F.frame - A.frame);
                C = A.props[o].easing(C), a = rt(A.props[o].value, F.props[o].value, C), a = nt(a), 0 === o.indexOf("@") ? c.setAttribute(o.substr(1), a) : i.setStyle(c, o, a)
              } k && w !== E && ("down" === zt ? xt(c, A.eventType, zt) : xt(c, F.eventType, zt), s.lastFrameIndex = E);
            break
          }
      }
    },
    Z = function () {
      _t && (_t = !1, Et());
      var e, t, n = it.getScrollTop(),
        o = Pt();
      if (pt) o >= pt.endTime ? (n = pt.targetTop, e = pt.done, pt = r) : (t = pt.easing((o - pt.startTime) / pt.duration), n = 0 | pt.startTop + t * pt.topDiff), it.setScrollTop(n, !0);
      else if (!ht) {
        var a = vt.targetTop - n;
        a && (vt = {
          startTop: qt,
          topDiff: n - qt,
          targetTop: n,
          startTime: Lt,
          endTime: Lt + gt
        }), vt.endTime >= o && (t = U.sqrt((o - vt.startTime) / gt), n = 0 | vt.startTop + t * vt.topDiff)
      }
      if (Gt && st && i.setStyle(st, "transform", "translate(0, " + -Kt + "px) " + Tt), ht || qt !== n) {
        zt = n > qt ? "down" : qt > n ? "up" : zt, ht = !1;
        var l = {
            curTop: n,
            lastTop: qt,
            maxTop: Ot,
            direction: zt
          },
          s = ct.beforerender && ct.beforerender.call(it, l);
        s !== !1 && (W(n, it.getScrollTop()), qt = n, ct.render && ct.render.call(it, l)), e && e.call(it, !1)
      }
      Lt = o
    },
    J = function (e) {
      for (var t = 0, r = e.keyFrames.length; r > t; t++) {
        for (var n, o, a, i, l = e.keyFrames[t], s = {}; null !== (i = O.exec(l.props));) a = i[1], o = i[2], n = a.match(V), null !== n ? (a = n[1], n = n[2]) : n = k, o = o.indexOf("!") ? Q(o) : [o.slice(1)], s[a] = {
          value: o,
          easing: U[n]
        };
        l.props = s
      }
    },
    Q = function (e) {
      var t = [];
      return $.lastIndex = 0, e = e.replace($, function (e) {
        return e.replace(L, function (e) {
          return 100 * (e / 255) + "%"
        })
      }), G && (_.lastIndex = 0, e = e.replace(_, function (e) {
        return G + e
      })), e = e.replace(L, function (e) {
        return t.push(+e), "{?}"
      }), t.unshift(e), t
    },
    et = function (e) {
      var t, r, n = {};
      for (t = 0, r = e.keyFrames.length; r > t; t++) tt(e.keyFrames[t], n);
      for (n = {}, t = e.keyFrames.length - 1; t >= 0; t--) tt(e.keyFrames[t], n)
    },
    tt = function (e, t) {
      var r;
      for (r in t) l.call(e.props, r) || (e.props[r] = t[r]);
      for (r in e.props) t[r] = e.props[r]
    },
    rt = function (e, t, r) {
      var n, o = e.length;
      if (o !== t.length) throw "Can't interpolate between \"" + e[0] + '" and "' + t[0] + '"';
      var a = [e[0]];
      for (n = 1; o > n; n++) a[n] = e[n] + (t[n] - e[n]) * r;
      return a
    },
    nt = function (e) {
      var t = 1;
      return M.lastIndex = 0, e[0].replace(M, function () {
        return e[t++]
      })
    },
    ot = function (e, t) {
      e = [].concat(e);
      for (var r, n, o = 0, a = e.length; a > o; o++) n = e[o], r = lt[n[H]], r && (t ? (n.style.cssText = r.dirtyStyleAttr, Dt(n, r.dirtyClassAttr)) : (r.dirtyStyleAttr = n.style.cssText, r.dirtyClassAttr = Ct(n), n.style.cssText = r.styleAttr, Dt(n, r.classAttr)))
    },
    at = function () {
      Tt = "translateZ(0)", i.setStyle(st, "transform", Tt);
      var e = c(st),
        t = e.getPropertyValue("transform"),
        r = e.getPropertyValue(G + "transform"),
        n = t && "none" !== t || r && "none" !== r;
      n || (Tt = "")
    };
  i.setStyle = function (e, t, r) {
    var n = e.style;
    if (t = t.replace(z, q).replace("-", ""), "zIndex" === t) n[t] = isNaN(r) ? r : "" + (0 | r);
    else if ("float" === t) n.styleFloat = n.cssFloat = r;
    else try {
      B && (n[B + t.slice(0, 1).toUpperCase() + t.slice(1)] = r), n[t] = r
    } catch (o) {}
  };
  var it, lt, st, ct, ft, ut, mt, pt, dt, gt, vt, ht, yt, Tt, bt, St = i.addEvent = function (t, r, n) {
      var o = function (t) {
        return t = t || e.event, t.target || (t.target = t.srcElement), t.preventDefault || (t.preventDefault = function () {
          t.returnValue = !1, t.defaultPrevented = !0
        }), n.call(this, t)
      };
      r = r.split(" ");
      for (var a, i = 0, l = r.length; l > i; i++) a = r[i], t.addEventListener ? t.addEventListener(a, n, !1) : t.attachEvent("on" + a, o), Yt.push({
        element: t,
        name: a,
        listener: n
      })
    },
    kt = i.removeEvent = function (e, t, r) {
      t = t.split(" ");
      for (var n = 0, o = t.length; o > n; n++) e.removeEventListener ? e.removeEventListener(t[n], r, !1) : e.detachEvent("on" + t[n], r)
    },
    wt = function () {
      for (var e, t = 0, r = Yt.length; r > t; t++) e = Yt[t], kt(e.element, e.name, e.listener);
      Yt = []
    },
    xt = function (e, t, r) {
      ct.keyframe && ct.keyframe.call(it, e, t, r)
    },
    Et = function () {
      var e = it.getScrollTop();
      Ot = 0, ft && !Gt && (a.style.height = ""), j(), ft && !Gt && (a.style.height = Ot + o.clientHeight + "px"), Gt ? it.setScrollTop(s.min(it.getScrollTop(), Ot)) : it.setScrollTop(e, !0), ht = !0
    },
    At = function () {
      var e, t, r = o.clientHeight,
        n = {};
      for (e in ut) t = ut[e], "function" == typeof t ? t = t.call(it) : /p$/.test(t) && (t = t.slice(0, -1) / 100 * r), n[e] = t;
      return n
    },
    Ft = function () {
      var e = st && st.offsetHeight || 0,
        t = s.max(e, a.scrollHeight, a.offsetHeight, o.scrollHeight, o.offsetHeight, o.clientHeight);
      return t - o.clientHeight
    },
    Ct = function (t) {
      var r = "className";
      return e.SVGElement && t instanceof e.SVGElement && (t = t[r], r = "baseVal"), t[r]
    },
    Dt = function (t, n, o) {
      var a = "className";
      if (e.SVGElement && t instanceof e.SVGElement && (t = t[a], a = "baseVal"), o === r) return t[a] = n, r;
      for (var i = t[a], l = 0, s = o.length; s > l; l++) i = It(i).replace(It(o[l]), " ");
      i = Ht(i);
      for (var c = 0, f = n.length; f > c; c++) - 1 === It(i).indexOf(It(n[c])) && (i += " " + n[c]);
      t[a] = Ht(i)
    },
    Ht = function (e) {
      return e.replace(P, "")
    },
    It = function (e) {
      return " " + e + " "
    },
    Pt = Date.now || function () {
      return +new Date
    },
    Nt = function (e, t) {
      return e.frame - t.frame
    },
    Ot = 0,
    Vt = 1,
    zt = "down",
    qt = -1,
    Lt = Pt(),
    Mt = 0,
    $t = 0,
    _t = !1,
    Bt = 0,
    Gt = !1,
    Kt = 0,
    Yt = [];
  "function" == typeof define && define.amd ? define("skrollr", function () {
    return i
  }) : "undefined" != typeof module && module.exports ? module.exports = i : e.skrollr = i
})(window, document);
! function (a) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
  "use strict";
  var b = window.Slick || {};
  b = function () {
    function c(c, d) {
      var f, e = this;
      e.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: a(c),
        appendDots: a(c),
        arrows: !0,
        asNavFor: null,
        prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
        nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (b, c) {
          return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: .35,
        fade: !1,
        focusOnSelect: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }, e.initials = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: !1,
        slideOffset: 0,
        swipeLeft: null,
        $list: null,
        touchObject: {},
        transformsEnabled: !1,
        unslicked: !1
      }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0)
    }
    var b = 0;
    return c
  }(), b.prototype.activateADA = function () {
    var a = this;
    a.$slideTrack.find(".slick-active").attr({
      "aria-hidden": "false"
    }).find("a, input, button, select").attr({
      tabindex: "0"
    })
  }, b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
    var e = this;
    if ("boolean" == typeof c) d = c, c = null;
    else if (0 > c || c >= e.slideCount) return !1;
    e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) {
      a(c).attr("data-slick-index", b)
    }), e.$slidesCache = e.$slides, e.reinit()
  }, b.prototype.animateHeight = function () {
    var a = this;
    if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
      var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
      a.$list.animate({
        height: b
      }, a.options.speed)
    }
  }, b.prototype.animateSlide = function (b, c) {
    var d = {},
      e = this;
    e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
      left: b
    }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
      top: b
    }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
      animStart: e.currentLeft
    }).animate({
      animStart: b
    }, {
      duration: e.options.speed,
      easing: e.options.easing,
      step: function (a) {
        a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
      },
      complete: function () {
        c && c.call()
      }
    })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
      e.disableTransition(), c.call()
    }, e.options.speed))
  }, b.prototype.getNavTarget = function () {
    var b = this,
      c = b.options.asNavFor;
    return c && null !== c && (c = a(c).not(b.$slider)), c
  }, b.prototype.asNavFor = function (b) {
    var c = this,
      d = c.getNavTarget();
    null !== d && "object" == typeof d && d.each(function () {
      var c = a(this).slick("getSlick");
      c.unslicked || c.slideHandler(b, !0)
    })
  }, b.prototype.applyTransition = function (a) {
    var b = this,
      c = {};
    b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
  }, b.prototype.autoPlay = function () {
    var a = this;
    a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
  }, b.prototype.autoPlayClear = function () {
    var a = this;
    a.autoPlayTimer && clearInterval(a.autoPlayTimer)
  }, b.prototype.autoPlayIterator = function () {
    var a = this,
      b = a.currentSlide + a.options.slidesToScroll;
    a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b))
  }, b.prototype.buildArrows = function () {
    var b = this;
    b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
      "aria-disabled": "true",
      tabindex: "-1"
    }))
  }, b.prototype.buildDots = function () {
    var c, d, b = this;
    if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
      for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
      b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
    }
  }, b.prototype.buildOut = function () {
    var b = this;
    b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) {
      a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
    }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
  }, b.prototype.buildRows = function () {
    var b, c, d, e, f, g, h, a = this;
    if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
      for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
        var i = document.createElement("div");
        for (c = 0; c < a.options.rows; c++) {
          var j = document.createElement("div");
          for (d = 0; d < a.options.slidesPerRow; d++) {
            var k = b * h + (c * a.options.slidesPerRow + d);
            g.get(k) && j.appendChild(g.get(k))
          }
          i.appendChild(j)
        }
        e.appendChild(i)
      }
      a.$slider.empty().append(e), a.$slider.children().children().children().css({
        width: 100 / a.options.slidesPerRow + "%",
        display: "inline-block"
      })
    }
  }, b.prototype.checkResponsive = function (b, c) {
    var e, f, g, d = this,
      h = !1,
      i = d.$slider.width(),
      j = window.innerWidth || a(window).width();
    if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
      f = null;
      for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
      null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
    }
  }, b.prototype.changeSlide = function (b, c) {
    var f, g, h, d = this,
      e = a(b.currentTarget);
    switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
      case "previous":
        g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
        break;
      case "next":
        g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
        break;
      case "index":
        var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
        d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
        break;
      default:
        return
    }
  }, b.prototype.checkNavigable = function (a) {
    var c, d, b = this;
    if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
    else
      for (var e in c) {
        if (a < c[e]) {
          a = d;
          break
        }
        d = c[e]
      }
    return a
  }, b.prototype.cleanUpEvents = function () {
    var b = this;
    b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
  }, b.prototype.cleanUpSlideEvents = function () {
    var b = this;
    b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
  }, b.prototype.cleanUpRows = function () {
    var b, a = this;
    a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b))
  }, b.prototype.clickHandler = function (a) {
    var b = this;
    b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
  }, b.prototype.destroy = function (b) {
    var c = this;
    c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
      a(this).attr("style", a(this).data("originalStyling"))
    }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
  }, b.prototype.disableTransition = function (a) {
    var b = this,
      c = {};
    c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
  }, b.prototype.fadeSlide = function (a, b) {
    var c = this;
    c.cssTransitions === !1 ? (c.$slides.eq(a).css({
      zIndex: c.options.zIndex
    }), c.$slides.eq(a).animate({
      opacity: 1
    }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
      opacity: 1,
      zIndex: c.options.zIndex
    }), b && setTimeout(function () {
      c.disableTransition(a), b.call()
    }, c.options.speed))
  }, b.prototype.fadeSlideOut = function (a) {
    var b = this;
    b.cssTransitions === !1 ? b.$slides.eq(a).animate({
      opacity: 0,
      zIndex: b.options.zIndex - 2
    }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
      opacity: 0,
      zIndex: b.options.zIndex - 2
    }))
  }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
    var b = this;
    null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
  }, b.prototype.focusHandler = function () {
    var b = this;
    b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) {
      c.stopImmediatePropagation();
      var d = a(this);
      setTimeout(function () {
        b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
      }, 0)
    })
  }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
    var a = this;
    return a.currentSlide
  }, b.prototype.getDotCount = function () {
    var a = this,
      b = 0,
      c = 0,
      d = 0;
    if (a.options.infinite === !0)
      for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
    else if (a.options.centerMode === !0) d = a.slideCount;
    else if (a.options.asNavFor)
      for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
    else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
    return d - 1
  }, b.prototype.getLeft = function (a) {
    var c, d, f, b = this,
      e = 0;
    return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
  }, b.prototype.getOption = b.prototype.slickGetOption = function (a) {
    var b = this;
    return b.options[a]
  }, b.prototype.getNavigableIndexes = function () {
    var e, a = this,
      b = 0,
      c = 0,
      d = [];
    for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
    return d
  }, b.prototype.getSlick = function () {
    return this
  }, b.prototype.getSlideCount = function () {
    var c, d, e, b = this;
    return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
      return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
    }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
  }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
    var c = this;
    c.changeSlide({
      data: {
        message: "index",
        index: parseInt(a)
      }
    }, b)
  }, b.prototype.init = function (b) {
    var c = this;
    a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
  }, b.prototype.initADA = function () {
    var b = this;
    b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
      "aria-hidden": "true",
      tabindex: "-1"
    }).find("a, input, button, select").attr({
      tabindex: "-1"
    }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
      a(this).attr({
        role: "option",
        "aria-describedby": "slick-slide" + b.instanceUid + c
      })
    }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) {
      a(this).attr({
        role: "presentation",
        "aria-selected": "false",
        "aria-controls": "navigation" + b.instanceUid + c,
        id: "slick-slide" + b.instanceUid + c
      })
    }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
  }, b.prototype.initArrowEvents = function () {
    var a = this;
    a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
      message: "previous"
    }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
      message: "next"
    }, a.changeSlide))
  }, b.prototype.initDotEvents = function () {
    var b = this;
    b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
      message: "index"
    }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
  }, b.prototype.initSlideEvents = function () {
    var b = this;
    b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
  }, b.prototype.initializeEvents = function () {
    var b = this;
    b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
      action: "start"
    }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
      action: "move"
    }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
      action: "end"
    }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
      action: "end"
    }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
  }, b.prototype.initUI = function () {
    var a = this;
    a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
  }, b.prototype.keyHandler = function (a) {
    var b = this;
    a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
      data: {
        message: b.options.rtl === !0 ? "next" : "previous"
      }
    }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
      data: {
        message: b.options.rtl === !0 ? "previous" : "next"
      }
    }))
  }, b.prototype.lazyLoad = function () {
    function g(c) {
      a("img[data-lazy]", c).each(function () {
        var c = a(this),
          d = a(this).attr("data-lazy"),
          e = document.createElement("img");
        e.onload = function () {
          c.animate({
            opacity: 0
          }, 100, function () {
            c.attr("src", d).animate({
              opacity: 1
            }, 200, function () {
              c.removeAttr("data-lazy").removeClass("slick-loading")
            }), b.$slider.trigger("lazyLoaded", [b, c, d])
          })
        }, e.onerror = function () {
          c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d])
        }, e.src = d
      })
    }
    var c, d, e, f, b = this;
    b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
  }, b.prototype.loadSlider = function () {
    var a = this;
    a.setPosition(), a.$slideTrack.css({
      opacity: 1
    }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
  }, b.prototype.next = b.prototype.slickNext = function () {
    var a = this;
    a.changeSlide({
      data: {
        message: "next"
      }
    })
  }, b.prototype.orientationChange = function () {
    var a = this;
    a.checkResponsive(), a.setPosition()
  }, b.prototype.pause = b.prototype.slickPause = function () {
    var a = this;
    a.autoPlayClear(), a.paused = !0
  }, b.prototype.play = b.prototype.slickPlay = function () {
    var a = this;
    a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
  }, b.prototype.postSlide = function (a) {
    var b = this;
    b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA())
  }, b.prototype.prev = b.prototype.slickPrev = function () {
    var a = this;
    a.changeSlide({
      data: {
        message: "previous"
      }
    })
  }, b.prototype.preventDefault = function (a) {
    a.preventDefault()
  }, b.prototype.progressiveLazyLoad = function (b) {
    b = b || 1;
    var e, f, g, c = this,
      d = a("img[data-lazy]", c.$slider);
    d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function () {
      e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad()
    }, g.onerror = function () {
      3 > b ? setTimeout(function () {
        c.progressiveLazyLoad(b + 1)
      }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad())
    }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
  }, b.prototype.refresh = function (b) {
    var d, e, c = this;
    e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {
      currentSlide: d
    }), c.init(), b || c.changeSlide({
      data: {
        message: "index",
        index: d
      }
    }, !1)
  }, b.prototype.registerBreakpoints = function () {
    var c, d, e, b = this,
      f = b.options.responsive || null;
    if ("array" === a.type(f) && f.length) {
      b.respondTo = b.options.respondTo || "window";
      for (c in f)
        if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
          for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
          b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
        } b.breakpoints.sort(function (a, c) {
        return b.options.mobileFirst ? a - c : c - a
      })
    }
  }, b.prototype.reinit = function () {
    var b = this;
    b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
  }, b.prototype.resize = function () {
    var b = this;
    a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
      b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
    }, 50))
  }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
    var d = this;
    return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
  }, b.prototype.setCSS = function (a) {
    var d, e, b = this,
      c = {};
    b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
  }, b.prototype.setDimensions = function () {
    var a = this;
    a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
      padding: "0px " + a.options.centerPadding
    }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
      padding: a.options.centerPadding + " 0px"
    })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
    var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
    a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
  }, b.prototype.setFade = function () {
    var c, b = this;
    b.$slides.each(function (d, e) {
      c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
        position: "relative",
        right: c,
        top: 0,
        zIndex: b.options.zIndex - 2,
        opacity: 0
      }) : a(e).css({
        position: "relative",
        left: c,
        top: 0,
        zIndex: b.options.zIndex - 2,
        opacity: 0
      })
    }), b.$slides.eq(b.currentSlide).css({
      zIndex: b.options.zIndex - 1,
      opacity: 1
    })
  }, b.prototype.setHeight = function () {
    var a = this;
    if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
      var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
      a.$list.css("height", b)
    }
  }, b.prototype.setOption = b.prototype.slickSetOption = function () {
    var c, d, e, f, h, b = this,
      g = !1;
    if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;
    else if ("multiple" === h) a.each(e, function (a, c) {
      b.options[a] = c
    });
    else if ("responsive" === h)
      for (d in f)
        if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];
        else {
          for (c = b.options.responsive.length - 1; c >= 0;) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
          b.options.responsive.push(f[d])
        } g && (b.unload(), b.reinit())
  }, b.prototype.setPosition = function () {
    var a = this;
    a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
  }, b.prototype.setProps = function () {
    var a = this,
      b = document.body.style;
    a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
  }, b.prototype.setSlideClasses = function (a) {
    var c, d, e, f, b = this;
    d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a, d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
  }, b.prototype.setupInfinite = function () {
    var c, d, e, b = this;
    if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
      for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
      for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
      b.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
        a(this).attr("id", "")
      })
    }
  }, b.prototype.interrupt = function (a) {
    var b = this;
    a || b.autoPlay(), b.interrupted = a
  }, b.prototype.selectHandler = function (b) {
    var c = this,
      d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
      e = parseInt(d.attr("data-slick-index"));
    return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
  }, b.prototype.slideHandler = function (a, b, c) {
    var d, e, f, g, j, h = null,
      i = this;
    return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
      i.postSlide(d)
    }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
      i.postSlide(d)
    }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () {
      i.postSlide(e)
    })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function () {
      i.postSlide(e)
    }) : i.postSlide(e))))
  }, b.prototype.startLoad = function () {
    var a = this;
    a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
  }, b.prototype.swipeDirection = function () {
    var a, b, c, d, e = this;
    return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
  }, b.prototype.swipeEnd = function (a) {
    var c, d, b = this;
    if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
    if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
      switch (d = b.swipeDirection()) {
        case "left":
        case "down":
          c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
          break;
        case "right":
        case "up":
          c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1
      }
      "vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]))
    } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
  }, b.prototype.swipeHandler = function (a) {
    var b = this;
    if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
      case "start":
        b.swipeStart(a);
        break;
      case "move":
        b.swipeMove(a);
        break;
      case "end":
        b.swipeEnd(a)
    }
  }, b.prototype.swipeMove = function (a) {
    var d, e, f, g, h, b = this;
    return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
  }, b.prototype.swipeStart = function (a) {
    var c, b = this;
    return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0))
  }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
    var a = this;
    null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
  }, b.prototype.unload = function () {
    var b = this;
    a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
  }, b.prototype.unslick = function (a) {
    var b = this;
    b.$slider.trigger("unslick", [b, a]), b.destroy()
  }, b.prototype.updateArrows = function () {
    var b, a = this;
    b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
  }, b.prototype.updateDots = function () {
    var a = this;
    null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
  }, b.prototype.visibility = function () {
    var a = this;
    a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
  }, a.fn.slick = function () {
    var f, g, a = this,
      c = arguments[0],
      d = Array.prototype.slice.call(arguments, 1),
      e = a.length;
    for (f = 0; e > f; f++)
      if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
    return a
  }
});
! function (t, e, n, o) {
  "use strict";

  function i(t) {
    var e = t.currentTarget,
      o = t.data ? t.data.options : {},
      i = t.data ? t.data.items : [],
      a = n(e).attr("data-fancybox") || "",
      s = 0;
    t.preventDefault(), t.stopPropagation(), a ? (i = i.length ? i.filter('[data-fancybox="' + a + '"]') : n('[data-fancybox="' + a + '"]'), s = i.index(e), s < 0 && (s = 0)) : i = [e], n.fancybox.open(i, o, s)
  }
  if (n) {
    if (n.fn.fancybox) return void n.error("fancyBox already initialized");
    var a = {
        loop: !1,
        margin: [44, 0],
        gutter: 50,
        keyboard: !0,
        arrows: !0,
        infobar: !1,
        toolbar: !0,
        buttons: ["slideShow", "fullScreen", "thumbs", "close"],
        idleTime: 4,
        smallBtn: "auto",
        protect: !1,
        modal: !1,
        image: {
          preload: "auto"
        },
        ajax: {
          settings: {
            data: {
              fancybox: !0
            }
          }
        },
        iframe: {
          tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
          preload: !0,
          css: {},
          attr: {
            scrolling: "auto"
          }
        },
        animationEffect: "zoom",
        animationDuration: 366,
        zoomOpacity: "auto",
        transitionEffect: "fade",
        transitionDuration: 366,
        slideClass: "",
        baseClass: "",
        baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><button data-fancybox-prev title="{{PREV}}" class="fancybox-button fancybox-button--left"></button><div class="fancybox-infobar__body"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><button data-fancybox-next title="{{NEXT}}" class="fancybox-button fancybox-button--right"></button></div><div class="fancybox-toolbar">{{BUTTONS}}</div><div class="fancybox-navigation"><button data-fancybox-prev title="{{PREV}}" class="fancybox-arrow fancybox-arrow--left" /><button data-fancybox-next title="{{NEXT}}" class="fancybox-arrow fancybox-arrow--right" /></div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',
        spinnerTpl: '<div class="fancybox-loading"></div>',
        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
        btnTpl: {
          slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"></button>',
          fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"></button>',
          thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"></button>',
          close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',
          smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>'
        },
        parentEl: "body",
        autoFocus: !0,
        backFocus: !0,
        trapFocus: !0,
        fullScreen: {
          autoStart: !1
        },
        touch: {
          vertical: !0,
          momentum: !0
        },
        hash: null,
        media: {},
        slideShow: {
          autoStart: !1,
          speed: 4e3
        },
        thumbs: {
          autoStart: !1,
          hideOnClose: !0
        },
        onInit: n.noop,
        beforeLoad: n.noop,
        afterLoad: n.noop,
        beforeShow: n.noop,
        afterShow: n.noop,
        beforeClose: n.noop,
        afterClose: n.noop,
        onActivate: n.noop,
        onDeactivate: n.noop,
        clickContent: function (t, e) {
          return "image" === t.type && "zoom"
        },
        clickSlide: "close",
        clickOutside: "close",
        dblclickContent: !1,
        dblclickSlide: !1,
        dblclickOutside: !1,
        mobile: {
          clickContent: function (t, e) {
            return "image" === t.type && "toggleControls"
          },
          clickSlide: function (t, e) {
            return "image" === t.type ? "toggleControls" : "close"
          },
          dblclickContent: function (t, e) {
            return "image" === t.type && "zoom"
          },
          dblclickSlide: function (t, e) {
            return "image" === t.type && "zoom"
          }
        },
        lang: "en",
        i18n: {
          en: {
            CLOSE: "Close",
            NEXT: "Next",
            PREV: "Previous",
            ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
            PLAY_START: "Start slideshow",
            PLAY_STOP: "Pause slideshow",
            FULL_SCREEN: "Full screen",
            THUMBS: "Thumbnails"
          },
          de: {
            CLOSE: "Schliessen",
            NEXT: "Weiter",
            PREV: "Zurück",
            ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
            PLAY_START: "Diaschau starten",
            PLAY_STOP: "Diaschau beenden",
            FULL_SCREEN: "Vollbild",
            THUMBS: "Vorschaubilder"
          }
        }
      },
      s = n(t),
      r = n(e),
      c = 0,
      l = function (t) {
        return t && t.hasOwnProperty && t instanceof n
      },
      u = function () {
        return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) {
          return t.setTimeout(e, 1e3 / 60)
        }
      }(),
      d = function () {
        var t, n = e.createElement("fakeelement"),
          i = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
          };
        for (t in i)
          if (n.style[t] !== o) return i[t]
      }(),
      f = function (t) {
        return t && t.length && t[0].offsetHeight
      },
      h = function (t, o, i) {
        var s = this;
        s.opts = n.extend(!0, {
          index: i
        }, a, o || {}), o && n.isArray(o.buttons) && (s.opts.buttons = o.buttons), s.id = s.opts.id || ++c, s.group = [], s.currIndex = parseInt(s.opts.index, 10) || 0, s.prevIndex = null, s.prevPos = null, s.currPos = 0, s.firstRun = null, s.createGroup(t), s.group.length && (s.$lastFocus = n(e.activeElement).blur(), s.slides = {}, s.init(t))
      };
    n.extend(h.prototype, {
      init: function () {
        var t, e, o, i = this,
          a = i.group[i.currIndex].opts;
        i.scrollTop = r.scrollTop(), i.scrollLeft = r.scrollLeft(), n.fancybox.getInstance() || n.fancybox.isMobile || "hidden" === n("body").css("overflow") || (t = n("body").width(), n("html").addClass("fancybox-enabled"), t = n("body").width() - t, t > 1 && n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar, .fancybox-enabled body { margin-right: ' + t + "px; }</style>")), o = "", n.each(a.buttons, function (t, e) {
          o += a.btnTpl[e] || ""
        }), e = n(i.translate(i, a.baseTpl.replace("{{BUTTONS}}", o))).addClass("fancybox-is-hidden").attr("id", "fancybox-container-" + i.id).addClass(a.baseClass).data("FancyBox", i).prependTo(a.parentEl), i.$refs = {
          container: e
        }, ["bg", "inner", "infobar", "toolbar", "stage", "caption"].forEach(function (t) {
          i.$refs[t] = e.find(".fancybox-" + t)
        }), (!a.arrows || i.group.length < 2) && e.find(".fancybox-navigation").remove(), a.infobar || i.$refs.infobar.remove(), a.toolbar || i.$refs.toolbar.remove(), i.trigger("onInit"), i.activate(), i.jumpTo(i.currIndex)
      },
      translate: function (t, e) {
        var n = t.opts.i18n[t.opts.lang];
        return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
          var i = n[e];
          return i === o ? t : i
        })
      },
      createGroup: function (t) {
        var e = this,
          i = n.makeArray(t);
        n.each(i, function (t, i) {
          var a, s, r, c, l = {},
            u = {},
            d = [];
          n.isPlainObject(i) ? (l = i, u = i.opts || i) : "object" === n.type(i) && n(i).length ? (a = n(i), d = a.data(), u = "options" in d ? d.options : {}, u = "object" === n.type(u) ? u : {}, l.src = "src" in d ? d.src : u.src || a.attr("href"), ["width", "height", "thumb", "type", "filter"].forEach(function (t) {
            t in d && (u[t] = d[t])
          }), "srcset" in d && (u.image = {
            srcset: d.srcset
          }), u.$orig = a, l.type || l.src || (l.type = "inline", l.src = i)) : l = {
            type: "html",
            src: i + ""
          }, l.opts = n.extend(!0, {}, e.opts, u), n.fancybox.isMobile && (l.opts = n.extend(!0, {}, l.opts, l.opts.mobile)), s = l.type || l.opts.type, r = l.src || "", !s && r && (r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? s = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? s = "pdf" : "#" === r.charAt(0) && (s = "inline")), l.type = s, l.index = e.group.length, l.opts.$orig && !l.opts.$orig.length && delete l.opts.$orig, !l.opts.$thumb && l.opts.$orig && (l.opts.$thumb = l.opts.$orig.find("img:first")), l.opts.$thumb && !l.opts.$thumb.length && delete l.opts.$thumb, "function" === n.type(l.opts.caption) ? l.opts.caption = l.opts.caption.apply(i, [e, l]) : "caption" in d && (l.opts.caption = d.caption), l.opts.caption = l.opts.caption === o ? "" : l.opts.caption + "", "ajax" === s && (c = r.split(/\s+/, 2), c.length > 1 && (l.src = c.shift(), l.opts.filter = c.shift())), "auto" == l.opts.smallBtn && (n.inArray(s, ["html", "inline", "ajax"]) > -1 ? (l.opts.toolbar = !1, l.opts.smallBtn = !0) : l.opts.smallBtn = !1), "pdf" === s && (l.type = "iframe", l.opts.iframe.preload = !1), l.opts.modal && (l.opts = n.extend(!0, l.opts, {
            infobar: 0,
            toolbar: 0,
            smallBtn: 0,
            keyboard: 0,
            slideShow: 0,
            fullScreen: 0,
            thumbs: 0,
            touch: 0,
            clickContent: !1,
            clickSlide: !1,
            clickOutside: !1,
            dblclickContent: !1,
            dblclickSlide: !1,
            dblclickOutside: !1
          })), e.group.push(l)
        })
      },
      addEvents: function () {
        var o = this;
        o.removeEvents(), o.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (t) {
          t.stopPropagation(), t.preventDefault(), o.close(t)
        }).on("click.fb-prev touchend.fb-prev", "[data-fancybox-prev]", function (t) {
          t.stopPropagation(), t.preventDefault(), o.previous()
        }).on("click.fb-next touchend.fb-next", "[data-fancybox-next]", function (t) {
          t.stopPropagation(), t.preventDefault(), o.next()
        }), s.on("orientationchange.fb resize.fb", function (t) {
          t && t.originalEvent && "resize" === t.originalEvent.type ? u(function () {
            o.update()
          }) : (o.$refs.stage.hide(), setTimeout(function () {
            o.$refs.stage.show(), o.update()
          }, 500))
        }), r.on("focusin.fb", function (t) {
          var i = n.fancybox ? n.fancybox.getInstance() : null;
          i.isClosing || !i.current || !i.current.opts.trapFocus || n(t.target).hasClass("fancybox-container") || n(t.target).is(e) || i && "fixed" !== n(t.target).css("position") && !i.$refs.container.has(t.target).length && (t.stopPropagation(), i.focus(), s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft))
        }), r.on("keydown.fb", function (t) {
          var e = o.current,
            i = t.keyCode || t.which;
          if (e && e.opts.keyboard && !n(t.target).is("input") && !n(t.target).is("textarea")) return 8 === i || 27 === i ? (t.preventDefault(), void o.close(t)) : 37 === i || 38 === i ? (t.preventDefault(), void o.previous()) : 39 === i || 40 === i ? (t.preventDefault(), void o.next()) : void o.trigger("afterKeydown", t, i)
        }), o.group[o.currIndex].opts.idleTime && (o.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseenter.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function () {
          o.idleSecondsCounter = 0, o.isIdle && o.showControls(), o.isIdle = !1
        }), o.idleInterval = t.setInterval(function () {
          o.idleSecondsCounter++, o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime && (o.isIdle = !0, o.idleSecondsCounter = 0, o.hideControls())
        }, 1e3))
      },
      removeEvents: function () {
        var e = this;
        s.off("orientationchange.fb resize.fb"), r.off("focusin.fb keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null)
      },
      previous: function (t) {
        return this.jumpTo(this.currPos - 1, t)
      },
      next: function (t) {
        return this.jumpTo(this.currPos + 1, t)
      },
      jumpTo: function (t, e, i) {
        var a, s, r, c, l, u, d, h = this,
          p = h.group.length;
        if (!(h.isSliding || h.isClosing || h.isAnimating && h.firstRun)) {
          if (t = parseInt(t, 10), s = h.current ? h.current.opts.loop : h.opts.loop, !s && (t < 0 || t >= p)) return !1;
          if (a = h.firstRun = null === h.firstRun, !(p < 2 && !a && h.isSliding)) {
            if (c = h.current, h.prevIndex = h.currIndex, h.prevPos = h.currPos, r = h.createSlide(t), p > 1 && ((s || r.index > 0) && h.createSlide(t - 1), (s || r.index < p - 1) && h.createSlide(t + 1)), h.current = r, h.currIndex = r.index, h.currPos = r.pos, h.trigger("beforeShow", a), h.updateControls(), u = n.fancybox.getTranslate(r.$slide), r.isMoved = (0 !== u.left || 0 !== u.top) && !r.$slide.hasClass("fancybox-animated"), r.forcedDuration = o, n.isNumeric(e) ? r.forcedDuration = e : e = r.opts[a ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), a) return r.opts.animationEffect && e && h.$refs.container.css("transition-duration", e + "ms"), h.$refs.container.removeClass("fancybox-is-hidden"), f(h.$refs.container), h.$refs.container.addClass("fancybox-is-open"), r.$slide.addClass("fancybox-slide--current"), h.loadSlide(r), void h.preload();
            n.each(h.slides, function (t, e) {
              n.fancybox.stop(e.$slide)
            }), r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"), r.isMoved ? (l = Math.round(r.$slide.width()), n.each(h.slides, function (t, o) {
              var i = o.pos - r.pos;
              n.fancybox.animate(o.$slide, {
                top: 0,
                left: i * l + i * o.opts.gutter
              }, e, function () {
                o.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), o.pos === h.currPos && (r.isMoved = !1, h.complete())
              })
            })) : h.$refs.stage.children().removeAttr("style"), r.isLoaded ? h.revealContent(r) : h.loadSlide(r), h.preload(), c.pos !== r.pos && (d = "fancybox-slide--" + (c.pos > r.pos ? "next" : "previous"), c.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"), c.isComplete = !1, e && (r.isMoved || r.opts.transitionEffect) && (r.isMoved ? c.$slide.addClass(d) : (d = "fancybox-animated " + d + " fancybox-fx-" + r.opts.transitionEffect, n.fancybox.animate(c.$slide, d, e, function () {
              c.$slide.removeClass(d).removeAttr("style")
            }))))
          }
        }
      },
      createSlide: function (t) {
        var e, o, i = this;
        return o = t % i.group.length, o = o < 0 ? i.group.length + o : o, !i.slides[t] && i.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage), i.slides[t] = n.extend(!0, {}, i.group[o], {
          pos: t,
          $slide: e,
          isLoaded: !1
        }), i.updateSlide(i.slides[t])), i.slides[t]
      },
      scaleToActual: function (t, e, i) {
        var a, s, r, c, l, u = this,
          d = u.current,
          f = d.$content,
          h = parseInt(d.$slide.width(), 10),
          p = parseInt(d.$slide.height(), 10),
          g = d.width,
          b = d.height;
        "image" != d.type || d.hasError || !f || u.isAnimating || (n.fancybox.stop(f), u.isAnimating = !0, t = t === o ? .5 * h : t, e = e === o ? .5 * p : e, a = n.fancybox.getTranslate(f), c = g / a.width, l = b / a.height, s = .5 * h - .5 * g, r = .5 * p - .5 * b, g > h && (s = a.left * c - (t * c - t), s > 0 && (s = 0), s < h - g && (s = h - g)), b > p && (r = a.top * l - (e * l - e), r > 0 && (r = 0), r < p - b && (r = p - b)), u.updateCursor(g, b), n.fancybox.animate(f, {
          top: r,
          left: s,
          scaleX: c,
          scaleY: l
        }, i || 330, function () {
          u.isAnimating = !1
        }), u.SlideShow && u.SlideShow.isActive && u.SlideShow.stop())
      },
      scaleToFit: function (t) {
        var e, o = this,
          i = o.current,
          a = i.$content;
        "image" != i.type || i.hasError || !a || o.isAnimating || (n.fancybox.stop(a), o.isAnimating = !0, e = o.getFitPos(i), o.updateCursor(e.width, e.height), n.fancybox.animate(a, {
          top: e.top,
          left: e.left,
          scaleX: e.width / a.width(),
          scaleY: e.height / a.height()
        }, t || 330, function () {
          o.isAnimating = !1
        }))
      },
      getFitPos: function (t) {
        var e, o, i, a, r, c = this,
          l = t.$content,
          u = t.width,
          d = t.height,
          f = t.opts.margin;
        return !(!l || !l.length || !u && !d) && ("number" === n.type(f) && (f = [f, f]), 2 == f.length && (f = [f[0], f[1], f[0], f[1]]), s.width() < 800 && (f = [0, 0, 0, 0]), e = parseInt(c.$refs.stage.width(), 10) - (f[1] + f[3]), o = parseInt(c.$refs.stage.height(), 10) - (f[0] + f[2]), i = Math.min(1, e / u, o / d), a = Math.floor(i * u), r = Math.floor(i * d), {
          top: Math.floor(.5 * (o - r)) + f[0],
          left: Math.floor(.5 * (e - a)) + f[3],
          width: a,
          height: r
        })
      },
      update: function () {
        var t = this;
        n.each(t.slides, function (e, n) {
          t.updateSlide(n)
        })
      },
      updateSlide: function (t) {
        var e = this,
          o = t.$content;
        o && (t.width || t.height) && (n.fancybox.stop(o), n.fancybox.setTranslate(o, e.getFitPos(t)), t.pos === e.currPos && e.updateCursor()), t.$slide.trigger("refresh"), e.trigger("onUpdate", t)
      },
      updateCursor: function (t, e) {
        var n, i = this,
          a = i.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
        i.current && !i.isClosing && (i.isZoomable() ? (a.addClass("fancybox-is-zoomable"), n = t !== o && e !== o ? t < i.current.width && e < i.current.height : i.isScaledDown(), n ? a.addClass("fancybox-can-zoomIn") : i.current.opts.touch ? a.addClass("fancybox-can-drag") : a.addClass("fancybox-can-zoomOut")) : i.current.opts.touch && a.addClass("fancybox-can-drag"))
      },
      isZoomable: function () {
        var t, e = this,
          o = e.current;
        if (o && !e.isClosing) return !!("image" === o.type && o.isLoaded && !o.hasError && ("zoom" === o.opts.clickContent || n.isFunction(o.opts.clickContent) && "zoom" === o.opts.clickContent(o)) && (t = e.getFitPos(o), o.width > t.width || o.height > t.height))
      },
      isScaledDown: function () {
        var t = this,
          e = t.current,
          o = e.$content,
          i = !1;
        return o && (i = n.fancybox.getTranslate(o), i = i.width < e.width || i.height < e.height), i
      },
      canPan: function () {
        var t = this,
          e = t.current,
          n = e.$content,
          o = !1;
        return n && (o = t.getFitPos(e), o = Math.abs(n.width() - o.width) > 1 || Math.abs(n.height() - o.height) > 1), o
      },
      loadSlide: function (t) {
        var e, o, i, a = this;
        if (!t.isLoading && !t.isLoaded) {
          switch (t.isLoading = !0, a.trigger("beforeLoad", t), e = t.type, o = t.$slide, o.off("refresh").trigger("onReset").addClass("fancybox-slide--" + (e || "unknown")).addClass(t.opts.slideClass), e) {
            case "image":
              a.setImage(t);
              break;
            case "iframe":
              a.setIframe(t);
              break;
            case "html":
              a.setContent(t, t.src || t.content);
              break;
            case "inline":
              n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
              break;
            case "ajax":
              a.showLoading(t), i = n.ajax(n.extend({}, t.opts.ajax.settings, {
                url: t.src,
                success: function (e, n) {
                  "success" === n && a.setContent(t, e)
                },
                error: function (e, n) {
                  e && "abort" !== n && a.setError(t)
                }
              })), o.one("onReset", function () {
                i.abort()
              });
              break;
            default:
              a.setError(t)
          }
          return !0
        }
      },
      setImage: function (e) {
        var o, i, a, s, r = this,
          c = e.opts.image.srcset;
        if (c) {
          a = t.devicePixelRatio || 1, s = t.innerWidth * a, i = c.split(",").map(function (t) {
            var e = {};
            return t.trim().split(/\s+/).forEach(function (t, n) {
              var o = parseInt(t.substring(0, t.length - 1), 10);
              return 0 === n ? e.url = t : void(o && (e.value = o, e.postfix = t[t.length - 1]))
            }), e
          }), i.sort(function (t, e) {
            return t.value - e.value
          });
          for (var l = 0; l < i.length; l++) {
            var u = i[l];
            if ("w" === u.postfix && u.value >= s || "x" === u.postfix && u.value >= a) {
              o = u;
              break
            }
          }!o && i.length && (o = i[i.length - 1]), o && (e.src = o.url, e.width && e.height && "w" == o.postfix && (e.height = e.width / e.height * o.value, e.width = o.value))
        }
        e.$content = n('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide), e.opts.preload !== !1 && e.opts.width && e.opts.height && (e.opts.thumb || e.opts.$thumb) ? (e.width = e.opts.width, e.height = e.opts.height, e.$ghost = n("<img />").one("error", function () {
          n(this).remove(), e.$ghost = null, r.setBigImage(e)
        }).one("load", function () {
          r.afterLoad(e), r.setBigImage(e)
        }).addClass("fancybox-image").appendTo(e.$content).attr("src", e.opts.thumb || e.opts.$thumb.attr("src"))) : r.setBigImage(e)
      },
      setBigImage: function (t) {
        var e = this,
          o = n("<img />");
        t.$image = o.one("error", function () {
          e.setError(t)
        }).one("load", function () {
          clearTimeout(t.timouts), t.timouts = null, e.isClosing || (t.width = this.naturalWidth, t.height = this.naturalHeight, t.opts.image.srcset && o.attr("sizes", "100vw").attr("srcset", t.opts.image.srcset), e.hideLoading(t), t.$ghost ? t.timouts = setTimeout(function () {
            t.timouts = null, t.$ghost.hide()
          }, Math.min(300, Math.max(1e3, t.height / 1600))) : e.afterLoad(t))
        }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), o[0].complete ? o.trigger("load") : o[0].error ? o.trigger("error") : t.timouts = setTimeout(function () {
          o[0].complete || t.hasError || e.showLoading(t)
        }, 100)
      },
      setIframe: function (t) {
        var e, i = this,
          a = t.opts.iframe,
          s = t.$slide;
        t.$content = n('<div class="fancybox-content' + (a.preload ? " fancybox-is-hidden" : "") + '"></div>').css(a.css).appendTo(s), e = n(a.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(a.attr).appendTo(t.$content), a.preload ? (i.showLoading(t), e.on("load.fb error.fb", function (e) {
          this.isReady = 1, t.$slide.trigger("refresh"), i.afterLoad(t)
        }), s.on("refresh.fb", function () {
          var n, i, s, r, c, l = t.$content;
          if (1 === e[0].isReady) {
            try {
              n = e.contents(), i = n.find("body")
            } catch (t) {}
            i && i.length && (a.css.width === o || a.css.height === o) && (s = e[0].contentWindow.document.documentElement.scrollWidth, r = Math.ceil(i.outerWidth(!0) + (l.width() - s)), c = Math.ceil(i.outerHeight(!0)), l.css({
              width: a.css.width === o ? r + (l.outerWidth() - l.innerWidth()) : a.css.width,
              height: a.css.height === o ? c + (l.outerHeight() - l.innerHeight()) : a.css.height
            })), l.removeClass("fancybox-is-hidden")
          }
        })) : this.afterLoad(t), e.attr("src", t.src), t.opts.smallBtn === !0 && t.$content.prepend(i.translate(t, t.opts.btnTpl.smallBtn)), s.one("onReset", function () {
          try {
            n(this).find("iframe").hide().attr("src", "//about:blank")
          } catch (t) {}
          n(this).empty(), t.isLoaded = !1
        })
      },
      setContent: function (t, e) {
        var o = this;
        o.isClosing || (o.hideLoading(t), t.$slide.empty(), l(e) && e.parent().length ? (e.parent(".fancybox-slide--inline").trigger("onReset"), t.$placeholder = n("<div></div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents(), 3 === e[0].nodeType && (e = n("<div>").html(e))), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function () {
          t.$placeholder && (t.$placeholder.after(e.hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), t.isLoaded = !1)
        }), t.$content = n(e).appendTo(t.$slide), t.opts.smallBtn && !t.$smallBtn && (t.$smallBtn = n(o.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content)), this.afterLoad(t))
      },
      setError: function (t) {
        t.hasError = !0, t.$slide.removeClass("fancybox-slide--" + t.type), this.setContent(t, this.translate(t, t.opts.errorTpl))
      },
      showLoading: function (t) {
        var e = this;
        t = t || e.current, t && !t.$spinner && (t.$spinner = n(e.opts.spinnerTpl).appendTo(t.$slide))
      },
      hideLoading: function (t) {
        var e = this;
        t = t || e.current, t && t.$spinner && (t.$spinner.remove(), delete t.$spinner)
      },
      afterLoad: function (t) {
        var e = this;
        e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function (t) {
          return 2 == t.button && t.preventDefault(), !0
        }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.revealContent(t))
      },
      revealContent: function (t) {
        var e, i, a, s, r, c = this,
          l = t.$slide,
          u = !1;
        return e = t.opts[c.firstRun ? "animationEffect" : "transitionEffect"], a = t.opts[c.firstRun ? "animationDuration" : "transitionDuration"], a = parseInt(t.forcedDuration === o ? a : t.forcedDuration, 10), !t.isMoved && t.pos === c.currPos && a || (e = !1), "zoom" !== e || t.pos === c.currPos && a && "image" === t.type && !t.hasError && (u = c.getThumbPos(t)) || (e = "fade"), "zoom" === e ? (r = c.getFitPos(t), r.scaleX = Math.round(r.width / u.width * 100) / 100, r.scaleY = Math.round(r.height / u.height * 100) / 100, delete r.width, delete r.height, s = t.opts.zoomOpacity, "auto" == s && (s = Math.abs(t.width / t.height - u.width / u.height) > .1), s && (u.opacity = .1, r.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), u), f(t.$content), void n.fancybox.animate(t.$content, r, a, function () {
          c.complete()
        })) : (c.updateSlide(t), e ? (n.fancybox.stop(l), i = "fancybox-animated fancybox-slide--" + (t.pos > c.prevPos ? "next" : "previous") + " fancybox-fx-" + e, l.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(i), t.$content.removeClass("fancybox-is-hidden"), f(l), void n.fancybox.animate(l, "fancybox-slide--current", a, function (e) {
          l.removeClass(i).removeAttr("style"), t.pos === c.currPos && c.complete()
        }, !0)) : (f(l), t.$content.removeClass("fancybox-is-hidden"), void(t.pos === c.currPos && c.complete())))
      },
      getThumbPos: function (o) {
        var i, a = this,
          s = !1,
          r = function (e) {
            for (var o, i = e[0], a = i.getBoundingClientRect(), s = []; null !== i.parentElement;) "hidden" !== n(i.parentElement).css("overflow") && "auto" !== n(i.parentElement).css("overflow") || s.push(i.parentElement.getBoundingClientRect()), i = i.parentElement;
            return o = s.every(function (t) {
              var e = Math.min(a.right, t.right) - Math.max(a.left, t.left),
                n = Math.min(a.bottom, t.bottom) - Math.max(a.top, t.top);
              return e > 0 && n > 0
            }), o && a.bottom > 0 && a.right > 0 && a.left < n(t).width() && a.top < n(t).height()
          },
          c = o.opts.$thumb,
          l = c ? c.offset() : 0;
        return l && c[0].ownerDocument === e && r(c) && (i = a.$refs.stage.offset(), s = {
          top: l.top - i.top + parseFloat(c.css("border-top-width") || 0),
          left: l.left - i.left + parseFloat(c.css("border-left-width") || 0),
          width: c.width(),
          height: c.height(),
          scaleX: 1,
          scaleY: 1
        }), s
      },
      complete: function () {
        var t = this,
          o = t.current,
          i = {};
        o.isMoved || !o.isLoaded || o.isComplete || (o.isComplete = !0, o.$slide.siblings().trigger("onReset"), f(o.$slide), o.$slide.addClass("fancybox-slide--complete"), n.each(t.slides, function (e, o) {
          o.pos >= t.currPos - 1 && o.pos <= t.currPos + 1 ? i[o.pos] = o : o && (n.fancybox.stop(o.$slide), o.$slide.unbind().remove())
        }), t.slides = i, t.updateCursor(), t.trigger("afterShow"), (n(e.activeElement).is("[disabled]") || o.opts.autoFocus && "image" != o.type && "iframe" !== o.type) && t.focus())
      },
      preload: function () {
        var t, e, n = this;
        n.group.length < 2 || (t = n.slides[n.currPos + 1], e = n.slides[n.currPos - 1], t && "image" === t.type && n.loadSlide(t), e && "image" === e.type && n.loadSlide(e))
      },
      focus: function () {
        var t, e = this.current;
        this.isClosing || (t = e && e.isComplete ? e.$slide.find("button,:input,[tabindex],a").filter(":not([disabled]):visible:first") : null, t = t && t.length ? t : this.$refs.container, t.focus())
      },
      activate: function () {
        var t = this;
        n(".fancybox-container").each(function () {
          var e = n(this).data("FancyBox");
          e && e.uid !== t.uid && !e.isClosing && e.trigger("onDeactivate")
        }), t.current && (t.$refs.container.index() > 0 && t.$refs.container.prependTo(e.body), t.updateControls()), t.trigger("onActivate"), t.addEvents()
      },
      close: function (t, e) {
        var o, i, a, s, r, c, l = this,
          f = l.current,
          h = function () {
            l.cleanUp(t)
          };
        return !l.isClosing && (l.isClosing = !0, l.trigger("beforeClose", t) === !1 ? (l.isClosing = !1, u(function () {
          l.update()
        }), !1) : (l.removeEvents(), f.timouts && clearTimeout(f.timouts), a = f.$content, o = f.opts.animationEffect, i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0, f.$slide.off(d).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), f.$slide.siblings().trigger("onReset").remove(), i && l.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), l.hideLoading(f), l.hideControls(), l.updateCursor(), "zoom" !== o || t !== !0 && a && i && "image" === f.type && !f.hasError && (c = l.getThumbPos(f)) || (o = "fade"), "zoom" === o ? (n.fancybox.stop(a), r = n.fancybox.getTranslate(a), r.width = r.width * r.scaleX, r.height = r.height * r.scaleY, s = f.opts.zoomOpacity, "auto" == s && (s = Math.abs(f.width / f.height - c.width / c.height) > .1), s && (c.opacity = 0), r.scaleX = r.width / c.width, r.scaleY = r.height / c.height, r.width = c.width, r.height = c.height, n.fancybox.setTranslate(f.$content, r), n.fancybox.animate(f.$content, c, i, h), !0) : (o && i ? t === !0 ? setTimeout(h, i) : n.fancybox.animate(f.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + o, i, h) : h(), !0)))
      },
      cleanUp: function (t) {
        var e, o = this;
        o.current.$slide.trigger("onReset"), o.$refs.container.empty().remove(), o.trigger("afterClose", t), o.$lastFocus && !o.current.focusBack && o.$lastFocus.focus(), o.current = null, e = n.fancybox.getInstance(), e ? e.activate() : (s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft), n("html").removeClass("fancybox-enabled"), n("#fancybox-style-noscroll").remove())
      },
      trigger: function (t, e) {
        var o, i = Array.prototype.slice.call(arguments, 1),
          a = this,
          s = e && e.opts ? e : a.current;
        return s ? i.unshift(s) : s = a, i.unshift(a), n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)), o === !1 ? o : void("afterClose" === t ? r.trigger(t + ".fb", i) : a.$refs.container.trigger(t + ".fb", i))
      },
      updateControls: function (t) {
        var e = this,
          o = e.current,
          i = o.index,
          a = o.opts,
          s = a.caption,
          r = e.$refs.caption;
        o.$slide.trigger("refresh"), e.$caption = s && s.length ? r.html(s) : null, e.isHiddenControls || e.showControls(), n("[data-fancybox-count]").html(e.group.length), n("[data-fancybox-index]").html(i + 1), n("[data-fancybox-prev]").prop("disabled", !a.loop && i <= 0), n("[data-fancybox-next]").prop("disabled", !a.loop && i >= e.group.length - 1)
      },
      hideControls: function () {
        this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")
      },
      showControls: function () {
        var t = this,
          e = t.current ? t.current.opts : t.opts,
          n = t.$refs.container;
        t.isHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal), t.$caption ? n.addClass("fancybox-show-caption ") : n.removeClass("fancybox-show-caption")
      },
      toggleControls: function () {
        this.isHiddenControls ? this.showControls() : this.hideControls()
      }
    }), n.fancybox = {
      version: "3.1.20",
      defaults: a,
      getInstance: function (t) {
        var e = n('.fancybox-container:not(".fancybox-is-closing"):first').data("FancyBox"),
          o = Array.prototype.slice.call(arguments, 1);
        return e instanceof h && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o), e)
      },
      open: function (t, e, n) {
        return new h(t, e, n)
      },
      close: function (t) {
        var e = this.getInstance();
        e && (e.close(), t === !0 && this.close())
      },
      destroy: function () {
        this.close(!0), r.off("click.fb-start")
      },
      isMobile: e.createTouch !== o && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
      use3d: function () {
        var n = e.createElement("div");
        return t.getComputedStyle && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
      }(),
      getTranslate: function (t) {
        var e;
        if (!t || !t.length) return !1;
        if (e = t.eq(0).css("transform"), e && e.indexOf("matrix") !== -1 ? (e = e.split("(")[1], e = e.split(")")[0], e = e.split(",")) : e = [], e.length) e = e.length > 10 ? [e[13], e[12], e[0], e[5]] : [e[5], e[4], e[0], e[3]], e = e.map(parseFloat);
        else {
          e = [0, 0, 1, 1];
          var n = /\.*translate\((.*)px,(.*)px\)/i,
            o = n.exec(t.eq(0).attr("style"));
          o && (e[0] = parseFloat(o[2]), e[1] = parseFloat(o[1]))
        }
        return {
          top: e[0],
          left: e[1],
          scaleX: e[2],
          scaleY: e[3],
          opacity: parseFloat(t.css("opacity")),
          width: t.width(),
          height: t.height()
        }
      },
      setTranslate: function (t, e) {
        var n = "",
          i = {};
        if (t && e) return e.left === o && e.top === o || (n = (e.left === o ? t.position().left : e.left) + "px, " + (e.top === o ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), e.scaleX !== o && e.scaleY !== o && (n = (n.length ? n + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"), n.length && (i.transform = n), e.opacity !== o && (i.opacity = e.opacity), e.width !== o && (i.width = e.width), e.height !== o && (i.height = e.height), t.css(i)
      },
      animate: function (t, e, i, a, s) {
        var r = d || "transitionend";
        n.isFunction(i) && (a = i, i = null), n.isPlainObject(e) || t.removeAttr("style"), t.on(r, function (i) {
          (!i || !i.originalEvent || t.is(i.originalEvent.target) && "z-index" != i.originalEvent.propertyName) && (t.off(r), n.isPlainObject(e) ? e.scaleX !== o && e.scaleY !== o && (t.css("transition-duration", "0ms"), e.width = t.width() * e.scaleX, e.height = t.height() * e.scaleY, e.scaleX = 1, e.scaleY = 1, n.fancybox.setTranslate(t, e)) : s !== !0 && t.removeClass(e), n.isFunction(a) && a(i))
        }), n.isNumeric(i) && t.css("transition-duration", i + "ms"), n.isPlainObject(e) ? n.fancybox.setTranslate(t, e) : t.addClass(e), t.data("timer", setTimeout(function () {
          t.trigger("transitionend")
        }, i + 16))
      },
      stop: function (t) {
        clearTimeout(t.data("timer")), t.off(d)
      }
    }, n.fn.fancybox = function (t) {
      var e;
      return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {
        items: n(e),
        options: t
      }, i) : this.off("click.fb-start").on("click.fb-start", {
        items: this,
        options: t
      }, i), this
    }, r.on("click.fb-start", "[data-fancybox]", i)
  }
}(window, document, window.jQuery),
function (t) {
  "use strict";
  var e = function (e, n, o) {
      if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function (t, n) {
        e = e.replace("$" + t, n || "")
      }), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e
    },
    n = {
      youtube: {
        matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
        params: {
          autoplay: 1,
          autohide: 1,
          fs: 1,
          rel: 0,
          hd: 1,
          wmode: "transparent",
          enablejsapi: 1,
          html5: 1
        },
        paramPlace: 8,
        type: "iframe",
        url: "//www.youtube.com/embed/$4",
        thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
      },
      vimeo: {
        matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
        params: {
          autoplay: 1,
          hd: 1,
          show_title: 1,
          show_byline: 1,
          show_portrait: 0,
          fullscreen: 1,
          api: 1
        },
        paramPlace: 3,
        type: "iframe",
        url: "//player.vimeo.com/video/$2"
      },
      metacafe: {
        matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/,
        type: "iframe",
        url: "//www.metacafe.com/embed/$1/?ap=1"
      },
      dailymotion: {
        matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
        params: {
          additionalInfos: 0,
          autoStart: 1
        },
        type: "iframe",
        url: "//www.dailymotion.com/embed/video/$1"
      },
      vine: {
        matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,
        type: "iframe",
        url: "//vine.co/v/$1/embed/simple"
      },
      instagram: {
        matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
        type: "image",
        url: "//$1/p/$2/media/?size=l"
      },
      google_maps: {
        matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
        type: "iframe",
        url: function (t) {
          return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12]) + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
        }
      }
    };
  t(document).on("onInit.fb", function (o, i) {
    t.each(i.group, function (o, i) {
      var a, s, r, c, l, u, d, f = i.src || "",
        h = !1;
      i.type || (a = t.extend(!0, {}, n, i.opts.media), t.each(a, function (n, o) {
        if (r = f.match(o.matcher), u = {}, d = n, r) {
          if (h = o.type, o.paramPlace && r[o.paramPlace]) {
            l = r[o.paramPlace], "?" == l[0] && (l = l.substring(1)), l = l.split("&");
            for (var a = 0; a < l.length; ++a) {
              var p = l[a].split("=", 2);
              2 == p.length && (u[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")))
            }
          }
          return c = t.extend(!0, {}, o.params, i.opts[n], u), f = "function" === t.type(o.url) ? o.url.call(this, r, c, i) : e(o.url, r, c), s = "function" === t.type(o.thumb) ? o.thumb.call(this, r, c, i) : e(o.thumb, r), "vimeo" === d && (f = f.replace("&%23", "#")), !1
        }
      }), h ? (i.src = f, i.type = h, i.opts.thumb || i.opts.$thumb && i.opts.$thumb.length || (i.opts.thumb = s), "iframe" === h && (t.extend(!0, i.opts, {
        iframe: {
          preload: !1,
          attr: {
            scrolling: "no"
          }
        }
      }), i.contentProvider = d, i.opts.slideClass += " fancybox-slide--" + ("google_maps" == d ? "map" : "video"))) : i.type = "image")
    })
  })
}(window.jQuery),
function (t, e, n) {
  "use strict";
  var o = function () {
      return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) {
        return t.setTimeout(e, 1e3 / 60)
      }
    }(),
    i = function () {
      return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function (e) {
        t.clearTimeout(e)
      }
    }(),
    a = function (e) {
      var n = [];
      e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
      for (var o in e) e[o].pageX ? n.push({
        x: e[o].pageX,
        y: e[o].pageY
      }) : e[o].clientX && n.push({
        x: e[o].clientX,
        y: e[o].clientY
      });
      return n
    },
    s = function (t, e, n) {
      return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
    },
    r = function (t) {
      if (t.is("a,button,input,select,textarea") || n.isFunction(t.get(0).onclick)) return !0;
      for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
        if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
      return !1
    },
    c = function (e) {
      var n = t.getComputedStyle(e)["overflow-y"],
        o = t.getComputedStyle(e)["overflow-x"],
        i = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
        a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
      return i || a
    },
    l = function (t) {
      for (var e = !1;;) {
        if (e = c(t.get(0))) break;
        if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break
      }
      return e
    },
    u = function (t) {
      var e = this;
      e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
    };
  u.prototype.destroy = function () {
    this.$container.off(".fb.touch")
  }, u.prototype.ontouchstart = function (o) {
    var i = this,
      c = n(o.target),
      u = i.instance,
      d = u.current,
      f = d.$content,
      h = "touchstart" == o.type;
    if (h && i.$container.off("mousedown.fb.touch"), !d || i.instance.isAnimating || i.instance.isClosing) return o.stopPropagation(), void o.preventDefault();
    if ((!o.originalEvent || 2 != o.originalEvent.button) && c.length && !r(c) && !r(c.parent()) && !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left) && (i.startPoints = a(o), i.startPoints && !(i.startPoints.length > 1 && u.isSliding))) {
      if (i.$target = c, i.$content = f, i.canTap = !0, n(e).off(".fb.touch"), n(e).on(h ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(i, "ontouchend")), n(e).on(h ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(i, "ontouchmove")), o.stopPropagation(), !u.current.opts.touch && !u.canPan() || !c.is(i.$stage) && !i.$stage.find(c).length) return void(c.is("img") && o.preventDefault());
      n.fancybox.isMobile && (l(i.$target) || l(i.$target.parent())) || o.preventDefault(), i.canvasWidth = Math.round(d.$slide[0].clientWidth), i.canvasHeight = Math.round(d.$slide[0].clientHeight), i.startTime = (new Date).getTime(), i.distanceX = i.distanceY = i.distance = 0, i.isPanning = !1, i.isSwiping = !1, i.isZooming = !1, i.sliderStartPos = i.sliderLastPos || {
        top: 0,
        left: 0
      }, i.contentStartPos = n.fancybox.getTranslate(i.$content), i.contentLastPos = null, 1 !== i.startPoints.length || i.isZooming || (i.canTap = !u.isSliding, "image" === d.type && (i.contentStartPos.width > i.canvasWidth + 1 || i.contentStartPos.height > i.canvasHeight + 1) ? (n.fancybox.stop(i.$content), i.$content.css("transition-duration", "0ms"), i.isPanning = !0) : i.isSwiping = !0, i.$container.addClass("fancybox-controls--isGrabbing")), 2 !== i.startPoints.length || u.isAnimating || d.hasError || "image" !== d.type || !d.isLoaded && !d.$ghost || (i.isZooming = !0, i.isSwiping = !1, i.isPanning = !1, n.fancybox.stop(i.$content), i.$content.css("transition-duration", "0ms"), i.centerPointStartX = .5 * (i.startPoints[0].x + i.startPoints[1].x) - n(t).scrollLeft(), i.centerPointStartY = .5 * (i.startPoints[0].y + i.startPoints[1].y) - n(t).scrollTop(), i.percentageOfImageAtPinchPointX = (i.centerPointStartX - i.contentStartPos.left) / i.contentStartPos.width, i.percentageOfImageAtPinchPointY = (i.centerPointStartY - i.contentStartPos.top) / i.contentStartPos.height, i.startDistanceBetweenFingers = s(i.startPoints[0], i.startPoints[1]))
    }
  }, u.prototype.ontouchmove = function (t) {
    var e = this;
    if (e.newPoints = a(t), n.fancybox.isMobile && (l(e.$target) || l(e.$target.parent()))) return t.stopPropagation(), void(e.canTap = !1);
    if ((e.instance.current.opts.touch || e.instance.canPan()) && e.newPoints && e.newPoints.length && (e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e.newPoints[0], e.startPoints[0]), e.distance > 0)) {
      if (!e.$target.is(e.$stage) && !e.$stage.find(e.$target).length) return;
      t.stopPropagation(), t.preventDefault(), e.isSwiping ? e.onSwipe() : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()
    }
  }, u.prototype.onSwipe = function () {
    var e, a = this,
      s = a.isSwiping,
      r = a.sliderStartPos.left || 0;
    s === !0 ? Math.abs(a.distance) > 10 && (a.canTap = !1, a.instance.group.length < 2 && a.instance.opts.touch.vertical ? a.isSwiping = "y" : a.instance.isSliding || a.instance.opts.touch.vertical === !1 || "auto" === a.instance.opts.touch.vertical && n(t).width() > 800 ? a.isSwiping = "x" : (e = Math.abs(180 * Math.atan2(a.distanceY, a.distanceX) / Math.PI), a.isSwiping = e > 45 && e < 135 ? "y" : "x"), a.instance.isSliding = a.isSwiping, a.startPoints = a.newPoints, n.each(a.instance.slides, function (t, e) {
      n.fancybox.stop(e.$slide), e.$slide.css("transition-duration", "0ms"), e.inTransition = !1, e.pos === a.instance.current.pos && (a.sliderStartPos.left = n.fancybox.getTranslate(e.$slide).left)
    }), a.instance.SlideShow && a.instance.SlideShow.isActive && a.instance.SlideShow.stop()) : ("x" == s && (a.distanceX > 0 && (a.instance.group.length < 2 || 0 === a.instance.current.index && !a.instance.current.opts.loop) ? r += Math.pow(a.distanceX, .8) : a.distanceX < 0 && (a.instance.group.length < 2 || a.instance.current.index === a.instance.group.length - 1 && !a.instance.current.opts.loop) ? r -= Math.pow(-a.distanceX, .8) : r += a.distanceX), a.sliderLastPos = {
      top: "x" == s ? 0 : a.sliderStartPos.top + a.distanceY,
      left: r
    }, a.requestId && (i(a.requestId), a.requestId = null), a.requestId = o(function () {
      a.sliderLastPos && (n.each(a.instance.slides, function (t, e) {
        var o = e.pos - a.instance.currPos;
        n.fancybox.setTranslate(e.$slide, {
          top: a.sliderLastPos.top,
          left: a.sliderLastPos.left + o * a.canvasWidth + o * e.opts.gutter
        })
      }), a.$container.addClass("fancybox-is-sliding"))
    }))
  }, u.prototype.onPan = function () {
    var t, e, a, s = this;
    s.canTap = !1, t = s.contentStartPos.width > s.canvasWidth ? s.contentStartPos.left + s.distanceX : s.contentStartPos.left, e = s.contentStartPos.top + s.distanceY, a = s.limitMovement(t, e, s.contentStartPos.width, s.contentStartPos.height), a.scaleX = s.contentStartPos.scaleX, a.scaleY = s.contentStartPos.scaleY, s.contentLastPos = a, s.requestId && (i(s.requestId), s.requestId = null), s.requestId = o(function () {
      n.fancybox.setTranslate(s.$content, s.contentLastPos)
    })
  }, u.prototype.limitMovement = function (t, e, n, o) {
    var i, a, s, r, c = this,
      l = c.canvasWidth,
      u = c.canvasHeight,
      d = c.contentStartPos.left,
      f = c.contentStartPos.top,
      h = c.distanceX,
      p = c.distanceY;
    return i = Math.max(0, .5 * l - .5 * n), a = Math.max(0, .5 * u - .5 * o), s = Math.min(l - n, .5 * l - .5 * n), r = Math.min(u - o, .5 * u - .5 * o), n > l && (h > 0 && t > i && (t = i - 1 + Math.pow(-i + d + h, .8) || 0), h < 0 && t < s && (t = s + 1 - Math.pow(s - d - h, .8) || 0)), o > u && (p > 0 && e > a && (e = a - 1 + Math.pow(-a + f + p, .8) || 0), p < 0 && e < r && (e = r + 1 - Math.pow(r - f - p, .8) || 0)), {
      top: e,
      left: t
    }
  }, u.prototype.limitPosition = function (t, e, n, o) {
    var i = this,
      a = i.canvasWidth,
      s = i.canvasHeight;
    return n > a ? (t = t > 0 ? 0 : t, t = t < a - n ? a - n : t) : t = Math.max(0, a / 2 - n / 2), o > s ? (e = e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), {
      top: e,
      left: t
    }
  }, u.prototype.onZoom = function () {
    var e = this,
      a = e.contentStartPos.width,
      r = e.contentStartPos.height,
      c = e.contentStartPos.left,
      l = e.contentStartPos.top,
      u = s(e.newPoints[0], e.newPoints[1]),
      d = u / e.startDistanceBetweenFingers,
      f = Math.floor(a * d),
      h = Math.floor(r * d),
      p = (a - f) * e.percentageOfImageAtPinchPointX,
      g = (r - h) * e.percentageOfImageAtPinchPointY,
      b = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
      m = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
      y = b - e.centerPointStartX,
      v = m - e.centerPointStartY,
      x = c + (p + y),
      w = l + (g + v),
      $ = {
        top: w,
        left: x,
        scaleX: e.contentStartPos.scaleX * d,
        scaleY: e.contentStartPos.scaleY * d
      };
    e.canTap = !1, e.newWidth = f, e.newHeight = h, e.contentLastPos = $, e.requestId && (i(e.requestId), e.requestId = null), e.requestId = o(function () {
      n.fancybox.setTranslate(e.$content, e.contentLastPos)
    })
  }, u.prototype.ontouchend = function (t) {
    var o = this,
      s = Math.max((new Date).getTime() - o.startTime, 1),
      r = o.isSwiping,
      c = o.isPanning,
      l = o.isZooming;
    return o.endPoints = a(t), o.$container.removeClass("fancybox-controls--isGrabbing"), n(e).off(".fb.touch"), o.requestId && (i(o.requestId), o.requestId = null), o.isSwiping = !1, o.isPanning = !1, o.isZooming = !1, o.canTap ? o.onTap(t) : (o.speed = 366, o.velocityX = o.distanceX / s * .5, o.velocityY = o.distanceY / s * .5, o.speedX = Math.max(.5 * o.speed, Math.min(1.5 * o.speed, 1 / Math.abs(o.velocityX) * o.speed)), void(c ? o.endPanning() : l ? o.endZooming() : o.endSwiping(r)))
  }, u.prototype.endSwiping = function (t) {
    var e = this,
      o = !1;
    e.instance.isSliding = !1, e.sliderLastPos = null, "y" == t && Math.abs(e.distanceY) > 50 ? (n.fancybox.animate(e.instance.current.$slide, {
      top: e.sliderStartPos.top + e.distanceY + 150 * e.velocityY,
      opacity: 0
    }, 150), o = e.instance.close(!0, 300)) : "x" == t && e.distanceX > 50 && e.instance.group.length > 1 ? o = e.instance.previous(e.speedX) : "x" == t && e.distanceX < -50 && e.instance.group.length > 1 && (o = e.instance.next(e.speedX)), o !== !1 || "x" != t && "y" != t || e.instance.jumpTo(e.instance.current.index, 150), e.$container.removeClass("fancybox-is-sliding")
  }, u.prototype.endPanning = function () {
    var t, e, o, i = this;
    i.contentLastPos && (i.instance.current.opts.touch.momentum === !1 ? (t = i.contentLastPos.left, e = i.contentLastPos.top) : (t = i.contentLastPos.left + i.velocityX * i.speed, e = i.contentLastPos.top + i.velocityY * i.speed), o = i.limitPosition(t, e, i.contentStartPos.width, i.contentStartPos.height), o.width = i.contentStartPos.width, o.height = i.contentStartPos.height, n.fancybox.animate(i.$content, o, 330))
  }, u.prototype.endZooming = function () {
    var t, e, o, i, a = this,
      s = a.instance.current,
      r = a.newWidth,
      c = a.newHeight;
    a.contentLastPos && (t = a.contentLastPos.left, e = a.contentLastPos.top, i = {
      top: e,
      left: t,
      width: r,
      height: c,
      scaleX: 1,
      scaleY: 1
    }, n.fancybox.setTranslate(a.$content, i), r < a.canvasWidth && c < a.canvasHeight ? a.instance.scaleToFit(150) : r > s.width || c > s.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (o = a.limitPosition(t, e, r, c), n.fancybox.setTranslate(a.content, n.fancybox.getTranslate(a.$content)), n.fancybox.animate(a.$content, o, 150)))
  }, u.prototype.onTap = function (t) {
    var e, o = this,
      i = n(t.target),
      s = o.instance,
      r = s.current,
      c = t && a(t) || o.startPoints,
      l = c[0] ? c[0].x - o.$stage.offset().left : 0,
      u = c[0] ? c[0].y - o.$stage.offset().top : 0,
      d = function (e) {
        var i = r.opts[e];
        if (n.isFunction(i) && (i = i.apply(s, [r, t])), i) switch (i) {
          case "close":
            s.close(o.startEvent);
            break;
          case "toggleControls":
            s.toggleControls(!0);
            break;
          case "next":
            s.next();
            break;
          case "nextOrClose":
            s.group.length > 1 ? s.next() : s.close(o.startEvent);
            break;
          case "zoom":
            "image" == r.type && (r.isLoaded || r.$ghost) && (s.canPan() ? s.scaleToFit() : s.isScaledDown() ? s.scaleToActual(l, u) : s.group.length < 2 && s.close(o.startEvent))
        }
      };
    if (!(t.originalEvent && 2 == t.originalEvent.button || s.isSliding || l > i[0].clientWidth + i.offset().left)) {
      if (i.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) e = "Outside";
      else if (i.is(".fancybox-slide")) e = "Slide";
      else {
        if (!s.current.$content || !s.current.$content.has(t.target).length) return;
        e = "Content"
      }
      if (o.tapped) {
        if (clearTimeout(o.tapped), o.tapped = null, Math.abs(l - o.tapX) > 50 || Math.abs(u - o.tapY) > 50 || s.isSliding) return this;
        d("dblclick" + e)
      } else o.tapX = l, o.tapY = u, r.opts["dblclick" + e] && r.opts["dblclick" + e] !== r.opts["click" + e] ? o.tapped = setTimeout(function () {
        o.tapped = null, d("click" + e)
      }, 300) : d("click" + e);
      return this
    }
  }, n(e).on("onActivate.fb", function (t, e) {
    e && !e.Guestures && (e.Guestures = new u(e))
  }), n(e).on("beforeClose.fb", function (t, e) {
    e && e.Guestures && e.Guestures.destroy()
  })
}(window, document, window.jQuery),
function (t, e) {
  "use strict";
  var n = function (t) {
    this.instance = t, this.init()
  };
  e.extend(n.prototype, {
    timer: null,
    isActive: !1,
    $button: null,
    speed: 3e3,
    init: function () {
      var t = this;
      t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
        t.toggle()
      }), (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) && t.$button.hide()
    },
    set: function () {
      var t = this;
      t.instance && t.instance.current && (t.instance.current.opts.loop || t.instance.currIndex < t.instance.group.length - 1) ? t.timer = setTimeout(function () {
        t.instance.next()
      }, t.instance.current.opts.slideShow.speed || t.speed) : (t.stop(), t.instance.idleSecondsCounter = 0, t.instance.showControls())
    },
    clear: function () {
      var t = this;
      clearTimeout(t.timer), t.timer = null
    },
    start: function () {
      var t = this,
        e = t.instance.current;
      t.instance && e && (e.opts.loop || e.index < t.instance.group.length - 1) && (t.isActive = !0, t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).addClass("fancybox-button--pause"), e.isComplete && t.set())
    },
    stop: function () {
      var t = this,
        e = t.instance.current;
      t.clear(), t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause"), t.isActive = !1
    },
    toggle: function () {
      var t = this;
      t.isActive ? t.stop() : t.start()
    }
  }), e(t).on({
    "onInit.fb": function (t, e) {
      e && !e.SlideShow && (e.SlideShow = new n(e))
    },
    "beforeShow.fb": function (t, e, n, o) {
      var i = e && e.SlideShow;
      o ? i && n.opts.slideShow.autoStart && i.start() : i && i.isActive && i.clear()
    },
    "afterShow.fb": function (t, e, n) {
      var o = e && e.SlideShow;
      o && o.isActive && o.set()
    },
    "afterKeydown.fb": function (n, o, i, a, s) {
      var r = o && o.SlideShow;
      !r || !i.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (a.preventDefault(), r.toggle())
    },
    "beforeClose.fb onDeactivate.fb": function (t, e) {
      var n = e && e.SlideShow;
      n && n.stop()
    }
  }), e(t).on("visibilitychange", function () {
    var n = e.fancybox.getInstance(),
      o = n && n.SlideShow;
    o && o.isActive && (t.hidden ? o.clear() : o.set())
  })
}(document, window.jQuery),
function (t, e) {
  "use strict";
  var n = function () {
    var e, n, o, i = [
        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
      ],
      a = {};
    for (n = 0; n < i.length; n++)
      if (e = i[n], e && e[1] in t) {
        for (o = 0; o < e.length; o++) a[i[0][o]] = e[o];
        return a
      } return !1
  }();
  if (!n) return void(e.fancybox.defaults.btnTpl.fullScreen = !1);
  var o = {
    request: function (e) {
      e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
    },
    exit: function () {
      t[n.exitFullscreen]()
    },
    toggle: function (e) {
      e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
    },
    isFullscreen: function () {
      return Boolean(t[n.fullscreenElement])
    },
    enabled: function () {
      return Boolean(t[n.fullscreenEnabled])
    }
  };
  e(t).on({
    "onInit.fb": function (t, e) {
      var n, i = e.$refs.toolbar.find("[data-fancybox-fullscreen]");
      e && !e.FullScreen && e.group[e.currIndex].opts.fullScreen ? (n = e.$refs.container, n.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (t) {
        t.stopPropagation(), t.preventDefault(), o.toggle(n[0])
      }), e.opts.fullScreen && e.opts.fullScreen.autoStart === !0 && o.request(n[0]), e.FullScreen = o) : i.hide()
    },
    "afterKeydown.fb": function (t, e, n, o, i) {
      e && e.FullScreen && 70 === i && (o.preventDefault(), e.FullScreen.toggle(e.$refs.container[0]))
    },
    "beforeClose.fb": function (t) {
      t && t.FullScreen && o.exit()
    }
  }), e(t).on(n.fullscreenchange, function () {
    var t = e.fancybox.getInstance();
    t.current && "image" === t.current.type && t.isAnimating && (t.current.$content.css("transition", "none"), t.isAnimating = !1, t.update(!0, !0, 0))
  })
}(document, window.jQuery),
function (t, e) {
  "use strict";
  var n = function (t) {
    this.instance = t, this.init()
  };
  e.extend(n.prototype, {
    $button: null,
    $grid: null,
    $list: null,
    isVisible: !1,
    init: function () {
      var t = this,
        e = t.instance.group[0],
        n = t.instance.group[1];
      t.$button = t.instance.$refs.toolbar.find("[data-fancybox-thumbs]"), t.instance.group.length > 1 && t.instance.group[t.instance.currIndex].opts.thumbs && ("image" == e.type || e.opts.thumb || e.opts.$thumb) && ("image" == n.type || n.opts.thumb || n.opts.$thumb) ? (t.$button.on("click", function () {
        t.toggle()
      }), t.isActive = !0) : (t.$button.hide(), t.isActive = !1)
    },
    create: function () {
      var t, n, o = this.instance;
      this.$grid = e('<div class="fancybox-thumbs"></div>').appendTo(o.$refs.container), t = "<ul>", e.each(o.group, function (e, o) {
        n = o.opts.thumb || (o.opts.$thumb ? o.opts.$thumb.attr("src") : null), n || "image" !== o.type || (n = o.src), n && n.length && (t += '<li data-index="' + e + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + n + '" /></li>')
      }), t += "</ul>", this.$list = e(t).appendTo(this.$grid).on("click", "li", function () {
        o.jumpTo(e(this).data("index"))
      }), this.$list.find("img").hide().one("load", function () {
        var t, n, o, i, a = e(this).parent().removeClass("fancybox-thumbs-loading"),
          s = a.outerWidth(),
          r = a.outerHeight();
        t = this.naturalWidth || this.width, n = this.naturalHeight || this.height, o = t / s, i = n / r, o >= 1 && i >= 1 && (o > i ? (t /= i, n = r) : (t = s, n /= o)), e(this).css({
          width: Math.floor(t),
          height: Math.floor(n),
          "margin-top": Math.min(0, Math.floor(.3 * r - .3 * n)),
          "margin-left": Math.min(0, Math.floor(.5 * s - .5 * t))
        }).show()
      }).each(function () {
        this.src = e(this).data("src")
      })
    },
    focus: function () {
      this.instance.current && this.$list.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + this.instance.current.index + '"]').addClass("fancybox-thumbs-active").focus()
    },
    close: function () {
      this.$grid.hide()
    },
    update: function () {
      this.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), this.isVisible ? (this.$grid || this.create(), this.instance.trigger("onThumbsShow"), this.focus()) : this.$grid && this.instance.trigger("onThumbsHide"), this.instance.update()
    },
    hide: function () {
      this.isVisible = !1, this.update()
    },
    show: function () {
      this.isVisible = !0, this.update()
    },
    toggle: function () {
      this.isVisible = !this.isVisible, this.update()
    }
  }), e(t).on({
    "onInit.fb": function (t, e) {
      e && !e.Thumbs && (e.Thumbs = new n(e))
    },
    "beforeShow.fb": function (t, e, n, o) {
      var i = e && e.Thumbs;
      if (i && i.isActive) {
        if (n.modal) return i.$button.hide(), void i.hide();
        o && e.opts.thumbs.autoStart === !0 && i.show(), i.isVisible && i.focus()
      }
    },
    "afterKeydown.fb": function (t, e, n, o, i) {
      var a = e && e.Thumbs;
      a && a.isActive && 71 === i && (o.preventDefault(), a.toggle())
    },
    "beforeClose.fb": function (t, e) {
      var n = e && e.Thumbs;
      n && n.isVisible && e.opts.thumbs.hideOnClose !== !1 && n.close()
    }
  })
}(document, window.jQuery),
function (t, e, n) {
  "use strict";

  function o() {
    var t = e.location.hash.substr(1),
      n = t.split("-"),
      o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1,
      i = n.join("-");
    return o < 1 && (o = 1), {
      hash: t,
      index: o,
      gallery: i
    }
  }

  function i(t) {
    var e;
    "" !== t.gallery && (e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1), e.length ? e.trigger("click") : n("#" + n.escapeSelector(t.gallery)).trigger("click"))
  }

  function a(t) {
    var e;
    return !!t && (e = t.current ? t.current.opts : t.opts, e.$orig ? e.$orig.data("fancybox") : e.hash || "")
  }
  n.escapeSelector || (n.escapeSelector = function (t) {
    var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
      n = function (t, e) {
        return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
      };
    return (t + "").replace(e, n)
  });
  var s = null,
    r = null;
  n(function () {
    setTimeout(function () {
      n.fancybox.defaults.hash !== !1 && (n(t).on({
        "onInit.fb": function (t, e) {
          var n, i;
          e.group[e.currIndex].opts.hash !== !1 && (n = o(), i = a(e), i && n.gallery && i == n.gallery && (e.currIndex = n.index - 1))
        },
        "beforeShow.fb": function (n, o, i, c) {
          var l;
          i.opts.hash !== !1 && (l = a(o), l && "" !== l && (e.location.hash.indexOf(l) < 0 && (o.opts.origHash = e.location.hash), s = l + (o.group.length > 1 ? "-" + (i.index + 1) : ""), "replaceState" in e.history ? (r && clearTimeout(r), r = setTimeout(function () {
            e.history[c ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + s), r = null
          }, 300)) : e.location.hash = s))
        },
        "beforeClose.fb": function (o, i, c) {
          var l, u;
          r && clearTimeout(r), c.opts.hash !== !1 && (l = a(i), u = i && i.opts.origHash ? i.opts.origHash : "", l && "" !== l && ("replaceState" in history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + u) : (e.location.hash = u, n(e).scrollTop(i.scrollTop).scrollLeft(i.scrollLeft))), s = null)
        }
      }), n(e).on("hashchange.fb", function () {
        var t = o();
        n.fancybox.getInstance() ? !s || s === t.gallery + "-" + t.index || 1 === t.index && s == t.gallery || (s = null, n.fancybox.close()) : "" !== t.gallery && i(t)
      }), n(e).one("unload.fb popstate.fb", function () {
        n.fancybox.getInstance("close", !0, 0)
      }), i(o()))
    }, 50)
  })
}(document, window, window.jQuery);
'use strict';
var DFLIP = DFLIP || {};
var PRESENTATION = DFLIP;
(function dFlip(DFLIP, $) {
  DFLIP.version = "1.2.8";
  DFLIP.PAGE_MODE = {
    SINGLE: 1,
    DOUBLE: 2,
    AUTO: void 0
  };
  DFLIP.SINGLE_PAGE_MODE = {
    ZOOM: 1,
    BOOKLET: 2,
    AUTO: void 0
  };
  DFLIP.DIRECTION = {
    LTR: 1,
    RTL: 2
  };
  DFLIP.CORNERS = {
    TL: "tl",
    TR: "tr",
    BL: "bl",
    BR: "br",
    L: "l",
    R: "r",
    NONE: void 0
  };
  DFLIP.SOURCE_TYPE = {
    IMAGE: "image",
    PDF: "pdf",
    HTML: "html"
  };
  DFLIP.DISPLAY_TYPE = {
    WEBGL: "3D",
    HTML: "2D"
  };
  DFLIP.PAGE_SIZE = {
    AUTO: 0,
    SINGLE: 1,
    DOUBLEINTERNAL: 2
  };
  var defaults = DFLIP.defaults = {
    webgl: true,
    webglShadow: true,
    soundEnable: true,
    height: '100%',
    autoEnableOutline: false,
    autoEnableThumbnail: false,
    overwritePDFOutline: false,
    enableDownload: true,
    duration: 800,
    direction: DFLIP.DIRECTION.LTR,
    pageMode: DFLIP.PAGE_MODE.SINGLE,
    singlePageMode: DFLIP.SINGLE_PAGE_MODE.ZOOM,
    backgroundColor: "#fff",
    forceFit: true,
    transparent: false,
    hard: "none",
    annotationClass: "",
    maxTextureSize: 1600,
    minTextureSize: 256,
    icons: {
      'altnext': 'fa fa-',
      'altprev': 'fa fa-angle-left',
      'next': 'fa fa-angle-right',
      'prev': 'fa fa-angle-left',
      'end': 'fa fa-angle-double-right',
      'start': 'fa fa-angle-double-left',
      'share': 'fa fa-share',
      'help': 'fa fa-question-circle',
      'more': 'fa fa-ellipsis-h',
      'download': 'fa fa-download',
      'zoomin': 'fa fa-search-plus',
      'zoomout': 'fa fa-search-minus',
      'fullscreen': 'fa fa-arrows-alt',
      'fitscreen': 'fa fa-arrows-corner',
      'thumbnail': 'fa fa-th-large',
      'outline': 'fa fa-list',
      'close': 'fa fa-times',
      'doublepage': 'fa fa-book',
      'singlepage': 'fa fa-file',
      'sound': 'fa fa-volume-down',
      'facebook': 'fa fa-facebook',
      'google': 'fa fa-google',
      'twitter': 'fa fa-twitter-alt',
      'mail': 'fa fa-email'
    },
    text: {
      toggleSound: "Turn on/off Sound",
      toggleThumbnails: "Toggle Thumbnails",
      toggleOutline: "Toggle Outline/Bookmark",
      previousPage: "Previous Page",
      nextPage: "Next Page",
      toggleFullscreen: "Toggle Fullscreen",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      toggleHelp: "Toggle Help",
      singlePageMode: "Single Page Mode",
      doublePageMode: "Double Page Mode",
      downloadPDFFile: "Download PDF File",
      gotoFirstPage: "Goto First Page",
      gotoLastPage: "Goto Last Page",
      share: "Share"
    },
    allControls: "altPrev,pageNumber,altNext,outline,thumbnail,zoomIn,zoomOut,fullScreen,share,more,download,pageMode,startPage,endPage,sound",
    mainControls: "altPrev,pageNumber,altNext,outline,thumbnail,zoomIn,zoomOut,fullScreen,share,more",
    hideControls: "more,download,pageMode,startPage,endPage,sound,share,outline",
    scrollWheel: true,
    onCreate: function (flipBook) {},
    onCreateUI: function (flipBook) {},
    onFlip: function (flipBook) {},
    beforeFlip: function (flipBook) {},
    onReady: function (flipBook) {
      ui.switchFullscreen();
    },
    zoomRatio: 2,
    pageSize: DFLIP.PAGE_SIZE.AUTO,
    pdfjsSrc: "/wp-content/themes/carmanfriend/js/lib/dflip/libs/pdf.min.js",
    pdfjsCompatibilitySrc: "/wp-content/themes/carmanfriend/js/lib/dflip/libs/compatibility.js",
    pdfjsWorkerSrc: "/wp-content/themes/carmanfriend/js/lib/dflip/libs/pdf.worker.min.js",
    threejsSrc: "/wp-content/themes/carmanfriend/js/lib/dflip/libs/three.min.js",
    mockupjsSrc: "/wp-content/themes/carmanfriend/js/lib/dflip/libs/mockup.min.js",
    soundFile: "/wp-content/themes/carmanfriend/js/lib/dflip/sound/turn2.mp3",
    imagesLocation: "/wp-content/themes/carmanfriend/images",
    enableDebugLog: false,
    canvasToBlob: true,
    enableAnnotation: true,
    textureLoadFallback: "blank",
    stiffness: 3,
    minTopOffset: 30,
    backgroundImage: "",
    pageRatio: void 0,
    defaultPageRatio: 210 / 297,
    pixelRatio: window.devicePixelRatio || 1
  };
  var has3d = 'WebKitCSSMatrix' in window || (document.body && 'MozPerspective' in document.body.style),
    hasMouse = 'onmousedown' in window,
    hasTouch = 'ontouchstart' in window;
  var utils = DFLIP.utils = {
    drag: {
      left: 0,
      right: 1,
      none: -1
    },
    mouseEvents: (hasMouse) ? {
      type: "mouse",
      start: "mousedown",
      move: "mousemove",
      end: "mouseup"
    } : {
      type: "touch",
      start: "touchstart",
      move: "touchmove",
      end: "touchend"
    },
    html: {
      div: "<div/>",
      img: "<img/>",
      a: "<a>",
      input: "<input type='text'/>"
    },
    toRad: function (deg) {
      return deg * Math.PI / 180;
    },
    toDeg: function (rad) {
      return rad * 180 / Math.PI;
    },
    transition: function (hasTransition, duration) {
      return hasTransition ? duration / 1000 + "s ease-out" : "0s none";
    },
    display: function (hasDisplay) {
      return hasDisplay ? "block" : "none";
    },
    resetTranslate: function () {
      return translateStr(0, 0);
    },
    translateStr: function (x, y) {
      return has3d ? ' translate3d(' + x + 'px,' + y + 'px, 0px) ' : ' translate(' + x + 'px, ' + y + 'px) ';
    },
    resetBoxShadow: function () {
      return "rgba(0, 0, 0, 0) 0px 0px 20px";
    },
    rotateStr: function (deg) {
      return ' rotateZ(' + deg + 'deg) ';
    },
    bg: function (src) {
      return '#fff' + bgImage(src);
    },
    bgImage: function (src) {
      return (src == void 0 || src == "blank" ? '' : ' url(' + src + ')');
    },
    src: function (src) {
      return (src !== void 0 ? '' + src + '' : '');
    },
    limitAt: function (x, min, max) {
      return x < min ? min : x > max ? max : x;
    },
    distOrigin: function (x, y) {
      return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    },
    distPoints: function (x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    },
    calculateScale: function (startTouches, endTouches) {
      var startDistance = distPoints(startTouches[0].x, startTouches[0].y, startTouches[1].x, startTouches[1].y),
        endDistance = distPoints(endTouches[0].x, endTouches[0].y, endTouches[1].x, endTouches[1].y);
      return endDistance / startDistance;
    },
    getVectorAvg: function (vectors) {
      return {
        x: vectors.map(function (v) {
          return v.x;
        }).reduce(utils.sum) / vectors.length,
        y: vectors.map(function (v) {
          return v.y;
        }).reduce(utils.sum) / vectors.length
      };
    },
    sum: function (a, b) {
      return a + b;
    },
    getTouches: function (event, position) {
      position = position || {
        left: 0,
        top: 0
      };
      return Array.prototype.slice.call(event.touches).map(function (touch) {
        return {
          x: touch.pageX - position.left,
          y: touch.pageY - position.top
        };
      });
    },
    angleByDistance: function (distance, fullWidth) {
      var h = fullWidth / 2;
      var d = limitAt(distance, 0, fullWidth);
      return d < h ? toDeg(Math.asin(d / h)) : 90 + toDeg(Math.asin((d - h) / h));
    },
    log: function (args) {
      if (defaults.enableDebugLog == true && window.console)
        console.log(args);
    },
    lowerPowerOfTwo: function (value) {
      return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
    },
    nearestPowerOfTwo: function (value, max) {
      return Math.min(max || 2048, Math.pow(2, Math.ceil(Math.log(value) / Math.LN2)));
    },
    zoomStops: function (value, zoomRatio, ceil, min, max) {
      if (min == void 0) min = 256;
      if (max == void 0) max = 2048;
      var factor = Math.log(value / min) / Math.log(zoomRatio);
      return min * Math.pow(zoomRatio, ceil == void 0 ? Math.round(factor) : (ceil == true ? Math.ceil(factor) : Math.floor(factor)));
    },
    extendOptions: function (defaults, options) {
      return $.extend(true, {}, defaults, options);
    },
    getFullscreenElement: function () {
      return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
    },
    hasFullscreenEnabled: function () {
      return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled
    },
    getBasePage: function (pageNumber) {
      return Math.floor(pageNumber / 2) * 2;
    },
    loadResources: function loadResources(resourceTag, src, callback) {
      var doc = document,
        element = doc.createElement(resourceTag),
        refElement = doc.getElementsByTagName(resourceTag)[0];
      element.async = true;
      if (callback) {
        element.addEventListener('load', function (e) {
          callback(null, e);
        }, false);
      }
      element.src = src;
      refElement.parentNode.insertBefore(element, refElement);
    },
    getScript: function (source, callback, errorCallback) {
      var script = document.createElement('script');
      var prior = document.body.getElementsByTagName('script')[0];
      script.async = 1;
      script.setAttribute("data-cfasync", false);
      if (prior != void 0) {
        prior.parentNode.insertBefore(script, prior);
        prior = null;
      } else {
        document.body.appendChild(script);
      }

      function load(_, isAbort) {
        if (script != void 0) {
          if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            script = void 0;
            script = null;
            if (!isAbort) {
              if (callback) callback();
              callback = null;
              errorCallback = null;
            }
          }
        }
      }
      script.addEventListener("load", load, false);
      script.addEventListener("readystatechange", load, false);
      script.addEventListener("complete", load, false);
      if (errorCallback) {
        script.addEventListener("error", errorCallback, false);
      }
      script.src = source + (prefix.dom == "MS" ? ("?" + Math.random(1)) : "");
    },
    isHardPage: function (config, pageNumber, pageCount, isBooklet) {
      if (config !== void 0) {
        if (config == "cover") {
          return pageNumber == 0 || (isBooklet && pageNumber == 1) || pageNumber == (Math.floor(pageCount / (isBooklet ? 1 : 2)) - (isBooklet ? 0 : 1));
        } else if (config == "all") {
          return true;
        } else {
          var baseTest = ("," + config + ",").indexOf("," + (pageNumber * 2 + 1) + ",") > -1;
          var nextTest = ("," + config + ",").indexOf("," + (pageNumber * 2 + 2) + ",") > -1;
          return baseTest || nextTest;
        }
      }
      return false;
    },
    fixMouseEvent: function (event) {
      if (event) {
        var originalEvent = event.originalEvent || event;
        if (originalEvent.changedTouches && originalEvent.changedTouches.length > 0) {
          var _event = $.event.fix(event);
          var touch = originalEvent.changedTouches[0];
          _event.clientX = touch.clientX;
          _event.clientY = touch.clientY;
          _event.pageX = touch.pageX;
          _event.touches = originalEvent.touches;
          _event.pageY = touch.pageY;
          _event.movementX = touch.movementX;
          _event.movementY = touch.movementY;
          return _event;
        } else {
          return event;
        }
      } else {
        return event;
      }
    },
    hasWebgl: (function () {
      try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    })(),
    isBookletMode: function (book) {
      return book.pageMode == DFLIP.PAGE_MODE.SINGLE && book.singlePageMode == DFLIP.SINGLE_PAGE_MODE.BOOKLET
    },
    isRTLMode: function (book) {
      return book.direction == DFLIP.DIRECTION.RTL
    },
    isMobile: (function () {
      var check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    })(),
    prefix: (function () {
      var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/))[1],
        dom = ('WebKit|Moz|MS').match(new RegExp('(' + pre + ')', 'i'))[1];
      return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
      };
    })(),
    __extends: function (child, parent) {
      for (var key in parent)
        if (parent.hasOwnProperty(key)) child[key] = parent[key];

      function Ctor() {
        this.constructor = child;
      }
      Ctor.prototype = parent.prototype;
      child.prototype = new Ctor();
      child.__super = parent.prototype;
      return child;
    }
  };
  var SOURCE_TYPE = DFLIP.SOURCE_TYPE,
    DISPLAY_TYPE = DFLIP.DISPLAY_TYPE,
    drag = utils.drag,
    mouseEvents = utils.mouseEvents,
    html = utils.html,
    toRad = utils.toRad,
    toDeg = utils.toDeg,
    transition = utils.transition,
    translateStr = utils.translateStr,
    resetBoxShadow = utils.resetBoxShadow,
    rotateStr = utils.rotateStr,
    bg = utils.bg,
    bgImage = utils.bgImage,
    src = utils.src,
    limitAt = utils.limitAt,
    distOrigin = utils.distOrigin,
    distPoints = utils.distPoints,
    angleByDistance = utils.angleByDistance,
    log = utils.log,
    nearestPowerOfTwo = utils.nearestPowerOfTwo,
    extendOptions = utils.extendOptions,
    getBasePage = utils.getBasePage,
    getScript = utils.getScript,
    fixMouseEvent = utils.fixMouseEvent,
    prefix = utils.prefix,
    isBookletMode = utils.isBookletMode,
    isRTLMode = utils.isRTLMode,
    isMobile = utils.isMobile,
    hasWebgl = utils.hasWebgl,
    isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || safari.pushNotification),
    __extends = utils.__extends;
  var extendDFlipOptions = function (options) {
    return $.extend(true, {}, defaults, options);
  };
  var createUI = function (container, object) {
    var uiClass = "df-ui";
    var wrapperClass = "df-ui-wrapper";
    var buttonClass = uiClass + "-" + "btn";
    var ui = object.ui = $(html.div, {
      'class': uiClass
    });
    var options = object.options;
    ui.dispose = function () {
      container.find("." + buttonClass).each(function () {
        $(this).off();
      });
      help.off();
      next.off();
      prev.off();
      zoom.off();
      zoomIn.off();
      zoomOut.off();
      page.off();
      sound.off();
      more.off();
      fullScreen.off();
      fit.off();
      share.off();
      start.off();
      end.off();
      pageModeButton.off();
      altPrev.off();
      altNext.off();
      thumbnail.off();
      outline.off();
      controls.remove();
      sizeControls.remove();
      prev.remove();
      next.remove();
      zoom.remove();
      if (ui.shareBox) {
        if (ui.shareBox.dispose)
          ui.shareBox.dispose();
        ui.shareBox = null;
      }
      document.removeEventListener('keyup', onKeyUp, false);
      window.removeEventListener('click', closeMoreOptions, false);
      ui.update = null;
      object = null;
    };
    var validPage = function (pageNumber) {
      if (isNaN(pageNumber)) pageNumber = object.target._activePage;
      else if (pageNumber < 1) pageNumber = 1;
      else if (pageNumber > object.target.pageCount) pageNumber = object.target.pageCount;
      return pageNumber;
    };
    var next = ui.next = $(html.div, {
      class: buttonClass + " " + uiClass + "-next " + options.icons['next'],
      title: options.text.nextPage,
      html: "<span>" + options.text.nextPage + "</span>"
    }).on("click", function () {
      object.next();
    });
    var prev = ui.prev = $(html.div, {
      class: buttonClass + " " + uiClass + "-prev " + options.icons['prev'],
      title: options.text.previousPage,
      html: "<span>" + options.text.previousPage + "</span>"
    }).on("click", function () {
      object.prev();
    });
    var zoom = $(html.div, {
      class: wrapperClass + " " + uiClass + "-zoom"
    });
    var zoomIn = ui.zoomIn = $(html.div, {
      class: buttonClass + " " + uiClass + "-zoomin " + options.icons['zoomin'],
      title: options.text.zoomIn,
      html: "<span>" + options.text.zoomIn + "</span>"
    }).on("click", function () {
      object.zoom(1);
      ui.update();
      if (object.target.startPoint && object.target.pan)
        object.target.pan(object.target.startPoint);
    });
    var zoomOut = ui.zoomOut = $(html.div, {
      class: buttonClass + " " + uiClass + "-zoomout " + options.icons['zoomout'],
      title: options.text.zoomOut,
      html: "<span>" + options.text.zoomOut + "</span>"
    }).on("click", function () {
      object.zoom(-1);
      ui.update();
      if (object.target.startPoint && object.target.pan)
        object.target.pan(object.target.startPoint);
    });
    zoom.append(zoomIn).append(zoomOut);
    var page = ui.pageNumber = $(html.div, {
      class: buttonClass + " " + uiClass + "-page",
    }).on("change", function () {
      var pageNumber = parseInt((ui.pageInput.val()), 10);
      pageNumber = validPage(pageNumber);
      object.gotoPage(pageNumber);
    }).on("keyup", function (event) {
      if (event.keyCode == 13) {
        var pageNumber = parseInt((ui.pageInput.val()), 10);
        pageNumber = validPage(pageNumber);
        if (pageNumber !== validPage(object.target._activePage || object._activePage))
          object.gotoPage(pageNumber);
      }
    });
    ui.pageInput = $('<input id="df_book_page_number" type="text"/>').appendTo(page);
    ui.pageLabel = $('<label for="df_book_page_number"/>').appendTo(page);
    var sizeControls = $(html.div, {
      class: wrapperClass + " " + uiClass + "-size"
    });
    var help = $(html.div, {
      class: buttonClass + " " + uiClass + "-help " + options.icons['help'],
      title: options.text.toggleHelp,
      html: "<span>" + options.text.toggleHelp + "</span>"
    }).on("click", function () {});
    var sound = ui.sound = $(html.div, {
      class: buttonClass + " " + uiClass + "-sound " + options.icons['sound'],
      title: options.text.toggleSound,
      html: "<span>" + options.text.toggleSound + "</span>"
    }).on("click", function () {
      options.soundEnable = !options.soundEnable;
      ui.updateSound();
    });
    ui.updateSound = function () {
      if (options.soundEnable == false || options.soundEnable == 'false')
        sound.addClass("disabled");
      else
        sound.removeClass("disabled");
    };
    ui.updateSound();
    var more = ui.more = $(html.div, {
      class: buttonClass + " " + uiClass + "-more " + options.icons['more']
    }).on("click", function (event) {
      if (!more.hasClass("df-active")) {
        $(this).addClass("df-active");
        event.stopPropagation();
      }
    });

    function closeMoreOptions(event) {
      more.removeClass("df-active");
    }
    window.addEventListener('click', closeMoreOptions, false);
    var moreContainer = $(html.div, {
      class: "more-container"
    });
    more.append(moreContainer);
    if (typeof options.source == 'string' && options.enableDownload == true) {
      var downloadClass = buttonClass + " " + uiClass + "-download " + options.icons['download'];
      var download = ui.download = $('<a download target="_blank" class="' + downloadClass + '"><span>' + options.text.downloadPDFFile + '</span></a>');
      download.attr("href", options.source).attr("title", options.text.downloadPDFFile);
    }
    var fullscreenEnabled = utils.hasFullscreenEnabled();
    if (!fullscreenEnabled) {
      container.addClass("df-custom-fullscreen");
    }
    ui.switchFullscreen = function () {
      var fullscreenElement = utils.getFullscreenElement();
      var container = object.container[0];
      if (ui.isFullscreen != true) {
        object.container.addClass("df-fullscreen");
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.msRequestFullscreen) {
          container.msRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
          container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        }
        ui.isFullscreen = true
      } else {
        object.container.removeClass("df-fullscreen");
        ui.isFullscreen = false;
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
      if (!utils.hasFullscreenEnabled()) {
        setTimeout(function () {
          object.resize();
        }, 50);
      }
    };
    var fullScreen = ui.fullScreen = $(html.div, {
      class: buttonClass + " " + uiClass + "-fullscreen " + options.icons['fullscreen'],
      title: options.text.toggleFullscreen,
      html: "<span>" + options.text.toggleFullscreen + "</span>"
    }).on("click", ui.switchFullscreen);
    var fit = ui.fit = $(html.div, {
      class: buttonClass + " " + uiClass + "-fit " + options.icons['fitscreen']
    }).on("click", function () {
      $(this).toggleClass("df-button-fit-active");
    });
    sizeControls.append(fullScreen);
    var controls = $(html.div, {
      class: wrapperClass + " " + uiClass + "-controls"
    });
    var shareBox = ui.shareBox = new DFLIP.Share(container, options);
    var share = ui.share = $(html.div, {
      class: buttonClass + " " + uiClass + "-share " + options.icons['share'],
      title: options.text.share,
      html: "<span>" + options.text.share + "</span>"
    }).on("click", function (event) {
      if (ui.shareBox.isOpen == true)
        ui.shareBox.close();
      else {
        ui.shareBox.update(object.getURLHash());
        ui.shareBox.show();
      }
    });
    var start = ui.startPage = $(html.div, {
      class: buttonClass + " " + uiClass + "-start " + options.icons['start'],
      title: options.text.gotoFirstPage,
      html: "<span>" + options.text.gotoFirstPage + "</span>"
    }).on("click", function () {
      object.start();
    });
    var end = ui.endPage = $(html.div, {
      class: buttonClass + " " + uiClass + "-end " + options.icons['end'],
      title: options.text.gotoLastPage,
      html: "<span>" + options.text.gotoLastPage + "</span>"
    }).on("click", function () {
      object.end();
    });
    var pageModeButton = ui.pageMode = $(html.div, {
      class: buttonClass + " " + uiClass + "-pagemode " + options.icons['singlepage'],
      html: "<span>" + options.text.singlePageMode + "</span>"
    }).on("click", function () {
      var el = $(this);
      object.setPageMode(!el.hasClass(options.icons['doublepage']));
    });
    object.setPageMode(object.target.pageMode == DFLIP.PAGE_MODE.SINGLE)
    var altPrev = ui.altPrev = $(html.div, {
      class: buttonClass + " " + uiClass + "-prev" + " " + uiClass + "-alt " + options.icons['prev'],
      title: options.text.previousPage,
      html: "<span>" + options.text.previousPage + "</span>"
    }).on("click", function () {
      object.prev();
    });
    var altNext = ui.altNext = $(html.div, {
      class: buttonClass + " " + uiClass + "-next" + " " + uiClass + "-alt " + options.icons['next'],
      title: options.text.nextPage,
      html: "<span>" + options.text.nextPage + "</span>"
    }).on("click", function () {
      object.next();
    });
    var thumbnail = ui.thumbnail = $(html.div, {
      class: buttonClass + " " + uiClass + "-thumbnail " + options.icons['thumbnail'],
      title: options.text.toggleThumbnails,
      html: "<span>" + options.text.toggleThumbnails + "</span>"
    }).on("click", function () {
      var $this = $(this);
      if (object.target.thumbContainer) {
        var thumbContainer = object.target.thumbContainer;
        thumbContainer.toggleClass("df-thumb-visible");
        $this.toggleClass("df-active");
      } else {
        object.contentProvider.initThumbs();
        $this.toggleClass("df-active");
      }
      if ($this.hasClass("df-active")) {
        $this.siblings(".df-active").trigger("click");
      }
      ui.update(true);
    });
    var outline = ui.outline = $(html.div, {
      class: buttonClass + " " + uiClass + "-outline " + options.icons['outline'],
      title: options.text.toggleOutline,
      html: "<span>" + options.text.toggleOutline + "</span>"
    }).on("click", function () {
      var $this = $(this);
      if (object.target.outlineContainer) {
        var outlineContainer = object.target.outlineContainer;
        $this.toggleClass("df-active");
        outlineContainer.toggleClass("df-outline-visible");
        if ($this.hasClass("df-active")) {
          $this.siblings(".df-active").trigger("click");
        }
        ui.update(true);
      }
    });
    var allControls = options.allControls.replace(/ /g, '').split(','),
      mainControls = "," + options.mainControls.replace(/ /g, '') + ",",
      hideControls = "," + options.hideControls.replace(/ /g, '') + ",";
    var mainControlsArray = mainControls.split(',');
    for (var mainControlCount = 0; mainControlCount < mainControlsArray.length; mainControlCount++) {
      var mainControlName = mainControlsArray[mainControlCount];
      if (hideControls.indexOf("," + mainControlName + ",") < 0) {
        var mainControl = ui[mainControlName];
        if (mainControl !== void 0) {
          if (mainControls.indexOf("," + mainControlName + ",") > -1)
            controls.append(mainControl);
        }
      }
    }
    for (var controlCount = 0; controlCount < allControls.length; controlCount++) {
      var controlName = allControls[controlCount];
      if (hideControls.indexOf("," + controlName + ",") < 0) {
        var control = ui[controlName];
        if (control !== void 0) {
          if (mainControls.indexOf("," + controlName + ",") > -1) {} else if (controlName !== 'more' && controlName !== 'pageNumber')
            moreContainer.append(control);
        }
      }
    }
    container.append(controls).append(prev).append(next).append(zoom);
    var ctrlDown = false,
      shiftDown = false,
      altDown = false;
    var shiftKey = 16,
      ctrlKey = 17,
      altKey = 18,
      sKey = 83,
      vKey = 86,
      cKey = 67,
      eKey = 69,
      gKey = 71,
      nKey = 78,
      oKey = 79,
      deleteKey = 46,
      rightKey = 39,
      leftKey = 37,
      escKey = 27;
    document.addEventListener('keyup', onKeyUp, false);

    function onKeyUp(event) {
      switch (event.keyCode) {
        case escKey:
          if (ui.isFullscreen == true) ui.fullScreen.trigger("click");
          break;
        case shiftKey:
          shiftDown = false;
          break;
        case ctrlKey:
          ctrlDown = false;
          break;
        case altKey:
          altDown = false;
          break;
        case leftKey:
          object.prev();
          break;
        case rightKey:
          object.next();
          break;
        default:
          break;
      }
    }
    ui.update = function (resize) {
      log("ui update");
      var target = object.target;
      var pageNumber = validPage(target._activePage || object._activePage);
      var pageCount = target.pageCount || object.pageCount;
      var isRTL = target.direction == DFLIP.DIRECTION.RTL,
        isStart = (pageNumber == 1 || pageNumber == 0),
        isEnd = pageNumber == pageCount;
      ui.next.show();
      ui.prev.show();
      ui.altNext.removeClass("disabled");
      ui.altPrev.removeClass("disabled");
      if ((isStart && !isRTL) || (isEnd && isRTL)) {
        ui.prev.hide();
        ui.altPrev.addClass("disabled");
      }
      if ((isEnd && !isRTL) || (isStart && isRTL)) {
        ui.next.hide();
        ui.altNext.addClass("disabled");
      }
      ui.pageInput.val(pageNumber);
      ui.pageLabel.html((pageNumber) + "/" + pageCount);
      if (container.find(".df-thumb-visible, .df-outline-visible").length > 0) {
        container.addClass("df-sidemenu-open");
      } else {
        container.removeClass("df-sidemenu-open");
      }
      if (resize == true)
        object.resize();
      if (target.contentProvider.zoomScale == target.contentProvider.maxZoom) {
        ui.zoomIn.addClass("disabled");
      } else {
        ui.zoomIn.removeClass("disabled");
      }
      if (target.contentProvider.zoomScale == 1) {
        ui.zoomOut.addClass("disabled");
      } else {
        ui.zoomOut.removeClass("disabled");
      }
    };
    if (object.target !== void 0) {
      object.target.ui = ui;
    }
    if (options.onCreateUI !== void 0)
      options.onCreateUI(object);
  };
  var PreviewStage = void 0;

  function RegisterMockupObjects() {
    PreviewStage = (function (_super) {
      __extends(PreviewStage, _super);

      function PreviewStage(parameters) {
        parameters = parameters || {};
        var _this = this;
        _super.call(this, parameters);
        _this.options = parameters;
        _this.canvas = $(_this.renderer.domElement).addClass("df-3dcanvas");
        _this.container = parameters.container;
        _this.container.append(_this.canvas);
        _this.type = "PreviewStage";
        _this.mouse = new THREE.Vector2();
        _this.raycaster = new THREE.Raycaster();
        _this.camera.position.set(0, 20, 600);
        _this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        _this.spotLight.position.set(-220, 330, 550);
        _this.spotLight.castShadow = isMobile ? false : parameters.webglShadow;
        if (_this.spotLight.shadow) {
          _this.spotLight.shadow.bias = -0.0008;
        }
        _this.spotLight.intensity = 0.22;
        _this.ambientLight.color = new THREE.Color("#888");
        _this.ambientLight.intensity = 1.45;
        var material = new THREE.ShadowMaterial();
        material.opacity = 0.15;
        _this.ground.material = material;
        _this.ground.position.z = -2;
        _this.orbitControl.maxAzimuthAngle = 0.4;
        _this.orbitControl.minAzimuthAngle = -0.4;
        _this.orbitControl.minPolarAngle = 1.4;
        _this.orbitControl.maxPolarAngle = 2.2;
        _this.orbitControl.mouseButtons.ORBIT = THREE.MOUSE.RIGHT;
        _this.orbitControl.mouseButtons.PAN = -1;
        _this.orbitControl.maxDistance = 5000;
        _this.orbitControl.minDistance = 50;
        _this.orbitControl.noZoom = true;
        _this.selectiveRendering = true;
        _this.orbitControl.zoomSpeed = 5;
        _this.orbitControl.keyPanSpeed = 0;
        _this.orbitControl.center.set(0, 0, 0);
        _this.orbitControl.update();
        _this.swipe_threshold = isMobile ? 15 : 20;
        var cssRenderer = _this.cssRenderer = new THREE.CSS3DRenderer();
        $(cssRenderer.domElement).css({
          position: "absolute",
          top: 0,
          pointerEvents: "none"
        }).addClass("df-3dcanvas df-csscanvas");
        _this.container[0].appendChild(cssRenderer.domElement);
        var cssScene = _this.cssScene = new THREE.Scene();
        var divLeftDOM = document.createElement("div");
        divLeftDOM.className = "df-page-content df-page-content-left";
        var divRightDOM = document.createElement("div");
        divRightDOM.className = "df-page-content df-page-content-right";
        var divLeft = cssScene.divLeft = new THREE.CSS3DObject(divLeftDOM);
        var divRight = cssScene.divRight = new THREE.CSS3DObject(divRightDOM);
        cssScene.add(divLeft);
        cssScene.add(divRight);
        _this.resizeCallback = function () {
          cssRenderer.setSize(_this.canvas.width(), _this.canvas.height());
        };

        function requestRender() {
          _this.renderRequestPending = true;
        }
        window.addEventListener(mouseEvents.move, requestRender, false);
        window.addEventListener('keyup', requestRender, false);
        _this.dispose = function () {
          _this.clearChild();
          _this.render();
          window.removeEventListener(mouseEvents.move, requestRender, false);
          if (_this.options.scrollWheel == true) {
            _this.renderer.domElement.removeEventListener('mousewheel', onMouseWheel, false);
            _this.renderer.domElement.removeEventListener('DOMMouseScroll', onMouseWheel, false);
          }
          window.removeEventListener('keyup', requestRender, false);
          _this.renderer.domElement.removeEventListener("mousemove", editor_mouseMove, false);
          _this.renderer.domElement.removeEventListener("touchmove", editor_mouseMove, false);
          _this.renderer.domElement.removeEventListener("mousedown", editor_mouseDown, false);
          _this.renderer.domElement.removeEventListener("touchstart", editor_mouseDown, false);
          _this.renderer.domElement.removeEventListener("mouseup", editor_mouseUp, false);
          _this.renderer.domElement.removeEventListener("touchend", editor_mouseUp, false);
          _this.canvas.remove();
          cssRenderer.domElement.parentNode.removeChild(cssRenderer.domElement);
          cssRenderer = null;
          _this.renderCallback = null;
          _this.renderCallback = void 0;
          _this.orbitControl.dispose();
          _this.orbitControl = null;
          _this.renderer.dispose();
          _this.cancelRAF();
        };
        _this.renderCallback = function () {
          if (TWEEN.getAll().length > 0)
            _this.renderRequestPending = true;
          TWEEN.update();
          cssRenderer.render(cssScene, _this.camera)
        };
        var onMouseWheel = function (event) {
          var delta = 0;
          if (event.wheelDelta !== void 0) {
            delta = event.wheelDelta;
          } else if (event.detail !== void 0) {
            delta = -event.detail;
          }
          if (delta) {
            var currentZoom = _this.previewObject.contentProvider.zoomScale;
            if ((delta > 0 && currentZoom == 1) || (delta < 0 && currentZoom > 1)) {
              event.preventDefault();
            }
            _this.previewObject.zoom(delta > 0 ? 1 : -1);
          }
          requestRender();
        };
        var editor_mouseMove = function (event) {
          _this.renderRequestPending = true;
          event = fixMouseEvent(event);
          if (_this.isMouseDown && event.movementX != 0 && event.movementY != 0) {
            _this.isMouseMoving = true;
          }
          if (event.touches !== void 0 && event.touches.length == 2 && _this.startTouches !== void 0) {
            _this.zoomDirty = true;
            var touchCenter = utils.getVectorAvg(utils.getTouches(event, _this.container.offset())),
              newScale = utils.calculateScale(_this.startTouches, utils.getTouches(event)),
              scale = newScale / _this.lastScale;
            var zoom = _this.previewObject.contentProvider.zoomScale,
              x = touchCenter.x,
              y = touchCenter.y;
            _this.camera.position.z = _this.originalZ / (newScale);
            _this.lastScale = newScale;
            _this.lastZoomCenter = touchCenter;
            event.preventDefault();
            return;
          }
          if (_this.isMouseDown == true && _this.previewObject.contentProvider.zoomScale == 1) {
            var swipe_dist = event.pageX - _this.lastPos,
              swipe_time = performance.now() - _this.lastTime;
            if (Math.abs(swipe_dist) > _this.swipe_threshold) {
              if (swipe_dist < 0) {
                _this.target.next();
              } else {
                _this.target.prev();
              }
              event.preventDefault();
              _this.isMouseDown = false;
            }
            _this.lastPos = event.pageX;
            _this.lastTime = performance.now();
          }
        };
        var editor_mouseDown = function (event) {
          event = fixMouseEvent(event);
          if (event.touches !== void 0 && event.touches.length == 2 && _this.startTouches == void 0) {
            _this.startTouches = utils.getTouches(event);
            _this.lastScale = 1;
            _this.originalZ = _this.camera.position.z * 1;
          }
          document.activeElement.blur();
          _this.mouseValue = event.pageX + "," + event.pageY;
          _this.isMouseMoving = false;
          _this.isMouseDown = true;
          _this.lastPos = event.pageX;
          _this.lastTime = performance.now();
        };
        var editor_click = function (event) {
          _this.isMouseDown = false;
          if (event.button !== 0) return this;
          var mouseValue = event.pageX + "," + event.pageY;
          if (_this.isMouseMoving) {} else if (mouseValue == _this.mouseValue) {
            event = event || window.event;
            event = $.event.fix(event);
            var mouse = _this.mouse,
              raycaster = _this.raycaster;
            mouse.x = ((event.offsetX) / _this.canvas.innerWidth()) * 2 - 1;
            mouse.y = 1 - ((event.offsetY) / _this.canvas.innerHeight()) * 2;
            raycaster.setFromCamera(mouse, _this.camera);
            var intersects = raycaster.intersectObjects(_this.target instanceof MOCKUP.Bundle ? _this.target.children : [_this.target], true);
            if (intersects.length > 0) {
              var object, objectCount = 0;
              do {
                object = intersects[objectCount] !== void 0 ? intersects[objectCount].object : void 0;
                objectCount++;
              } while ((object instanceof THREE.BoxHelper || !(object instanceof MOCKUP.Paper) || object.isFlipping == true) && objectCount < intersects.length);
              if (object.userData.object !== void 0) {} else {
                if (object.angles[1] > 90) {
                  if (object.isEdge != true) _this.target.next();
                } else {
                  if (object.isEdge != true) _this.target.prev();
                }
              }
            } else {}
          }
        };
        var editor_mouseUp = function (event) {
          event = fixMouseEvent(event);
          if (event.touches !== void 0 && event.touches.length == 0) {
            var zoom = _this.previewObject.contentProvider.zoomScale;
            if (_this.zoomDirty == true) {
              _this.previewObject.contentProvider.zoomScale = utils.limitAt(_this.previewObject.contentProvider.zoomScale * _this.lastScale, 1, _this.previewObject.contentProvider.maxZoom);
              _this.previewObject.zoomValue = _this.previewObject.contentProvider.zoomScale * 1;
              _this.previewObject.resize();
              _this.zoomDirty = false;
            }
            _this.lastScale = void 0;
            _this.startTouches = void 0;
          }
          if (event.touches !== void 0 && event.touches.length > 1) return;
          editor_click(event);
        };
        _this.renderer.domElement.addEventListener("mousemove", editor_mouseMove, false);
        _this.renderer.domElement.addEventListener("touchmove", editor_mouseMove, false);
        _this.renderer.domElement.addEventListener("mousedown", editor_mouseDown, false);
        _this.renderer.domElement.addEventListener("touchstart", editor_mouseDown, false);
        _this.renderer.domElement.addEventListener("mouseup", editor_mouseUp, false);
        _this.renderer.domElement.addEventListener("touchend", editor_mouseUp, false);
        if (_this.options.scrollWheel == true) {
          _this.renderer.domElement.addEventListener('mousewheel', onMouseWheel, false);
          _this.renderer.domElement.addEventListener('DOMMouseScroll', onMouseWheel, false);
        }
        $(_this.renderer.domElement).css({
          display: "block"
        });
        $(window).trigger("resize");
        return this;
      }
      PreviewStage.prototype.width = function () {
        return this.container.width();
      };
      PreviewStage.prototype.height = function () {
        return this.container.height();
      };
      return PreviewStage;
    })(MOCKUP.Stage);
    MOCKUP.PreviewStage = PreviewStage;
    var BookPaper = (function (_super) {
      __extends(BookPaper, _super);

      function BookPaper(parameters, stage) {
        parameters = parameters || {};
        parameters.folds = 1;
        _super.call(this, parameters, stage);
        this.angle = 0;
        this.isFlipping = false;
        this.material.materials[5].transparent = true;
        this.material.materials[4].transparent = true;
        this.type = "BookPaper";
      }
      BookPaper.prototype.tween = function (oldAngle, newAngle) {
        var page = this;
        var epsilon = 0.00001;
        page.originalStiff = page.stiffness;
        var oldTarget = page.newStiffness;
        var isBooklet = isBookletMode(page.parent);
        var diff = newAngle - oldAngle;
        var isRight = oldAngle > 90;
        var isRTL = page.parent.direction == DFLIP.DIRECTION.RTL;
        page.init = {
          angle: oldAngle,
          angle2: (oldAngle < 90 ? 0 : 180),
          stiff: page.originalStiff,
          index: (isRight && !isRTL) || (!isRight && isRTL) ? 1 : 0
        };
        page.first = {
          angle: oldAngle + diff / 4,
          angle2: (oldAngle < 90 ? 90 : 90),
          stiff: page.originalStiff,
          index: (isRight && !isRTL) || (!isRight && isRTL) ? 1 : 0.25
        };
        page.mid = {
          angle: oldAngle + diff * 2 / 4,
          angle2: (oldAngle < 90 ? 135 : 45),
          stiff: page.newStiffness,
          index: (isRight && !isRTL) || (!isRight && isRTL) ? 0.5 : 0.5
        };
        page.mid2 = {
          angle: oldAngle + diff * 3 / 4,
          angle2: (oldAngle < 90 ? 180 : 0),
          stiff: page.newStiffness,
          index: (isRight && !isRTL) || (!isRight && isRTL) ? 0.25 : 1
        };
        page.end = {
          angle: newAngle,
          angle2: (oldAngle < 90 ? 180 : 0),
          stiff: page.newStiffness,
          index: (isRight && !isRTL) || (!isRight && isRTL) ? 0 : 1
        };
        page.isFlipping = true;
        var update = function (tween, event) {
          page.angles[1] = tween.angle;
          page.angles[4] = page.isHard ? tween.angle : tween.angle2;
          if (page.isHard == true) {
            page.stiffness = 0;
          } else {
            page.stiffness = tween.stiff / (oldTarget + epsilon) * (page.newStiffness + epsilon);
            page.stiffness = isNaN(page.stiffness) ? 0 : tween.stiff;
          }
          if (isBooklet) {
            page.material.materials[5].opacity = page.material.materials[4].opacity = tween.index;
            page.castShadow = (isRight && !isRTL) || (!isRight && isRTL) ? tween.index > 0.5 : tween.index > 0.5;
          }
          page.updateAngle(true);
        };
        if (isBooklet && ((!isRight && !isRTL) || (isRight && isRTL))) {
          page.material.materials[5].opacity = page.material.materials[4].opacity = 0;
          page.castShadow = false;
        }
        new TWEEN.Tween(page.init).to({
          angle: [page.first.angle, page.mid.angle, page.mid2.angle, page.end.angle],
          angle2: [page.first.angle2, page.mid.angle2, page.mid2.angle2, page.end.angle2],
          stiff: [page.first.stiff, page.mid.stiff, page.mid2.stiff, page.end.stiff],
          index: [page.first.index, page.mid.index, page.mid2.index, page.end.index]
        }, page.parent.duration).onUpdate(function (event) {
          update(this, event);
        }).easing(TWEEN.Easing.Sinusoidal.Out).onComplete(function (event) {
          page.stiffness = page.newStiffness;
          page.updateAngle();
          page.material.materials[5].opacity = page.material.materials[4].opacity = 1;
          page.castShadow = true;
          page.isFlipping = false;
          if (page.parent && page.parent.refresh)
            page.parent.refresh();
        }).start();
      };
      return BookPaper;
    })(MOCKUP.FlexBoxPaper);
    MOCKUP.BookPaper = BookPaper;
    var Book = (function (_super) {
      __extends(Book, _super);

      function Book(parameters, stage) {
        parameters = parameters || {};
        parameters.segments = parameters.segments || 50;
        this.pageCount = parameters.pageCount;
        this.height = parameters.height;
        this.width = parameters.width;
        this.pageCount = (this.pageCount == 1 ? this.pageCount : Math.ceil(this.pageCount / 2) * 2);
        this.direction = parameters.direction || DFLIP.DIRECTION.LTR;
        this.startPage = 1;
        this.endPage = this.pageCount;
        this.stackCount = parameters.stackCount || 6;
        this.materials = [];
        _super.call(this, parameters, stage);
        this.angles = [0, 0, 0, 0, 0, 0];
        this.stiffness = parameters.stiffness || 1.5;
        this.hardConfig = "none";
        this._activePage = parameters.openPage || this.startPage;
        this.createStack(parameters);
        this.pageMode = parameters.pageMode || ((isMobile || this.pageCount <= 2) ? DFLIP.PAGE_MODE.SINGLE : DFLIP.PAGE_MODE.DOUBLE);
        this.singlePageMode = parameters.singlePageMode || (isMobile ? DFLIP.SINGLE_PAGE_MODE.BOOKLET : DFLIP.SINGLE_PAGE_MODE.ZOOM);
        this.type = "Book";
      }
      Book.prototype.getPageByNumber = function (pageNumber) {
        var relativePageNumber = isBookletMode(this) ? (isRTLMode(this) ? pageNumber + 1 : pageNumber) : Math.floor((pageNumber - 1) / 2);
        return this.getObjectByName(relativePageNumber.toString());
      };
      Book.prototype.isPageHard = function (pageNumber) {
        return utils.isHardPage(this.hardConfig, pageNumber, this.pageCount);
      };
      Book.prototype.activePage = function (pageNumber) {
        if (pageNumber == void 0) return this._activePage;
        this.gotoPage(pageNumber);
      };
      Book.prototype.gotoPage = function (pageNumber) {
        pageNumber = parseInt(pageNumber, 10);
        this._activePage = pageNumber;
        this.updatePage(pageNumber);
      };
      Book.prototype.moveBy = function (step) {
        var nextPage = this._activePage + step;
        nextPage = limitAt(nextPage, this.startPage, this.endPage);
        this.gotoPage(nextPage);
      };
      Book.prototype.next = function (step) {
        if (step == void 0)
          step = (this.direction == DFLIP.DIRECTION.RTL) ? -this.pageMode : this.pageMode;
        this.moveBy(step);
      };
      Book.prototype.prev = function (step) {
        if (step == void 0)
          step = (this.direction == DFLIP.DIRECTION.RTL) ? this.pageMode : -this.pageMode;
        this.moveBy(step);
      };
      Book.prototype.updateAngle = function () {
        var startAngle = this.angles[1];
        var endAngle = this.angles[4];
        var spreadAngle = endAngle - startAngle;
        var stacks = this.stackCount;
        for (var _stackCount = 0; _stackCount < stacks; _stackCount++) {
          var clone = this.children[_stackCount];
          clone.angles[1] = startAngle + _stackCount * spreadAngle / (stacks * 100);
          clone.stiffness = this.stiffness;
          clone.updateAngle();
        }
      };
      Book.prototype.refresh = function () {
        this.updatePage(this._activePage);
        if (this.flipCallback !== void 0) this.flipCallback();
      };
      Book.prototype.updatePage = function (pageNumber) {
        var isRTL = (this.direction == DFLIP.DIRECTION.RTL),
          isBooklet = isBookletMode(this),
          newBaseNumber = getBasePage(pageNumber);
        var pageDivisor = isBooklet ? 1 : 2;
        pageNumber = Math.floor((pageNumber / pageDivisor));
        if (isRTL) pageNumber = this.pageCount / pageDivisor - pageNumber;
        var oldBaseNumber = this.oldBaseNumber || 0;
        var pageCount = this.pageCount / pageDivisor;
        var stackCount = this.stackCount;
        var angleShift = 0.02;
        var depth = 0.4;
        var stiffFactor = isBooklet ? 0 : (0.5 - Math.abs(pageCount / 2 - pageNumber) / pageCount) / this.stiffness;
        var positionFactor = 1;
        var midPoint = Math.floor(stackCount / 2);
        var isLeft = false;
        if (oldBaseNumber > pageNumber) {
          isLeft = true;
          this.children[stackCount - 1].skipFlip = true;
          this.children.unshift(this.children.pop());
        } else if (oldBaseNumber < pageNumber) {
          this.children[0].skipFlip = true;
          this.children.push(this.children.shift());
        } else {}
        if (Math.abs(oldBaseNumber - pageNumber) > 1) {}
        var remainingPages = (pageCount - pageNumber);
        var stackDepth = (5) / pageCount;
        var leftDepth = stackDepth * pageNumber / 2;
        var rightDepth = stackDepth * remainingPages / 2;
        var maxDepth = (leftDepth < rightDepth ? rightDepth : leftDepth);
        for (var _pageCount = 0; _pageCount < stackCount; _pageCount++) {
          var page = this.children[_pageCount];
          var color = page.color;
          var oldAngle = page.angles[1];
          var newAngle;
          var relativePageNumber = pageNumber - midPoint + _pageCount;
          var isHard = page.isHard = this.isPageHard(relativePageNumber);
          var oldName = page.name;
          page.isEdge = false;
          if (_pageCount == 0) {
            page.depth = leftDepth < depth ? depth : leftDepth;
          } else if (_pageCount == stackCount - 1) {
            page.depth = rightDepth < depth ? depth : rightDepth;
          } else {
            page.depth = depth;
            page.isEdge = false;
          }
          if (page.isFlipping == true) {
            page.depth = depth;
          }
          page.position.x = 0;
          var leftAngle = angleShift * _pageCount,
            rightAngle = 180 - angleShift * (_pageCount - midPoint) + angleShift * _pageCount;
          if (_pageCount < midPoint) {
            page.newStiffness = isHard ? 0 : stiffFactor / (pageNumber / pageCount) / 4;
            newAngle = leftAngle;
            page.position.z = maxDepth - (-_pageCount + midPoint) * depth;
            if (isLeft == true) page.position.z -= depth;
          } else {
            newAngle = rightAngle;
            page.newStiffness = isHard ? 0 : stiffFactor / (Math.abs(pageCount - pageNumber) / pageCount) / 4;
            page.position.z = (maxDepth - (-stackCount + _pageCount + midPoint + 1) * depth) - page.depth;
          }
          if (page.isFlipping == false) {
            if (Math.abs(oldAngle - newAngle) > 20 && page.skipFlip == false) {
              page.depth = depth;
              var predicted = page.stiffness;
              if (oldAngle > newAngle) {
                predicted = stiffFactor / (Math.abs(pageCount - pageNumber) / pageCount) / 4;
              } else {
                predicted = stiffFactor / (pageNumber / pageCount) / 4;
              }
              page.position.z += depth;
              page.stiffness = isNaN(predicted) ? page.stiffness : predicted;
              page.updateAngle(true);
              page.targetStiffness = (_pageCount < pageNumber) ? stiffFactor / (Math.abs(pageCount - pageNumber) / pageCount) / 4 : stiffFactor / (pageNumber / pageCount) / 4;
              page.targetStiffness = isNaN(page.targetStiffness) ? page.stiffness : page.targetStiffness;
              page.isFlipping = true;
              page.tween(oldAngle, newAngle);
              if (this.preFlipCallback !== void 0)
                this.preFlipCallback();
            } else {
              page.skipFlip = false;
              page.newStiffness = isNaN(page.newStiffness) ? 0 : page.newStiffness;
              if (page.angles[1] != newAngle || page.stiffness != page.newStiffness || page.depth != page.oldDepth) {
                page.angles[1] = page.angles[4] = newAngle;
                page.stiffness = page.newStiffness;
                page.updateAngle(true);
              } else {}
            }
          }
          page.visible = isBooklet ? (isRTL ? (_pageCount < midPoint || page.isFlipping) : (_pageCount >= midPoint || page.isFlipping)) : ((relativePageNumber >= 0 && relativePageNumber < pageCount) || (isBooklet && relativePageNumber == pageCount));
          if (this.requestPage !== void 0 && page.visible == true) {
            if (isRTL) relativePageNumber = isBooklet ? this.pageCount - relativePageNumber : Math.floor(this.pageCount / 2) - relativePageNumber - 1;
            page.name = relativePageNumber.toString();
            if (page.name != oldName) {
              page.textureLoaded = false;
              page.frontImage(defaults.textureLoadFallback);
              page.frontPageStamp = "-1";
              page.frontTextureLoaded = false;
              page.thumbLoaded = false;
              page.backImage(defaults.textureLoadFallback);
              page.backPageStamp = "-1";
              page.backTextureLoaded = false;
              this.requestPage();
            }
          }
          page.oldDepth = page.depth;
          var xPos = Math.abs(page.geometry.boundingBox.max.x) < Math.abs(page.geometry.boundingBox.min.x) ? page.geometry.boundingBox.max.x : page.geometry.boundingBox.min.x;
          page.position.x = (page.isEdge == true && page.isFlipping == false) ? ((_pageCount < midPoint) ? xPos : -xPos) : 0;
        }
        this.oldBaseNumber = pageNumber;
        if (this.updatePageCallback !== void 0)
          this.updatePageCallback();
      };
      Book.prototype.createCover = function (parameters) {
        parameters.width = parameters.width * 2;
        this.cover = new MOCKUP.BiFold(parameters);
        this.add(this.cover);
      };
      Book.prototype.createStack = function (parameters) {
        var colors = "red,green,blue,yellow,orange,black".split(",");
        for (var _stackCount = 0; _stackCount < this.stackCount; _stackCount++) {
          parameters.angles = [, this.stackCount - _stackCount];
          parameters.stiffness = (this.stackCount - _stackCount) / 100;
          var clone = new MOCKUP.BookPaper(parameters);
          clone.angles[1] = 180;
          clone.index = _stackCount;
          clone.updateAngle();
          clone.textureReady = false;
          clone.textureRequested = false;
          this.add(clone);
          clone.color = colors[_stackCount];
          clone.position.z = -1 * _stackCount;
        }
      };
      Book.prototype.shininess = function (shininess) {
        if (shininess == void 0) {
          return this.mainObject.shininess();
        } else {
          this.mainObject.shininess(shininess);
        }
      };
      Book.prototype.bumpScale = function (bumpScale) {
        if (bumpScale == void 0) {
          return this.mainObject.bumpScale();
        } else {
          this.mainObject.bumpScale(bumpScale);
        }
      };
      Book.prototype.frontImage = function (frontImage) {
        if (frontImage == void 0) {
          return this.mainObject.frontImage();
        } else {
          this.mainObject.frontImage(frontImage);
        }
      };
      Book.prototype.backImage = function (backImage) {
        if (backImage == void 0) {
          return this.mainObject.backImage();
        } else {
          this.mainObject.backImage(backImage);
        }
      };
      return Book;
    })(MOCKUP.Bundle);
    MOCKUP.Book = Book;
  }
  var PreviewObject = (function (_super) {
    function PreviewObject(parameters) {
      parameters = parameters || {};
      this.type = "PreviewObject";
      var _this = this;
      _this.zoomValue = 1;

      function resizeDelay() {
        setTimeout(function () {
          _this.resize()
        }, 50);
      }
      window.addEventListener("resize", resizeDelay, false);
      this.sound = document.createElement("audio");
      this.sound.setAttribute("src", parameters.soundFile + "?ver=" + DFLIP.version);
      this.sound.setAttribute("type", "audio/mpeg");
      this.dispose = function () {
        if (this.container && this.container.info && this.container.info.remove)
          this.container.info.remove();
        if (this.target && this.target.dispose)
          this.target.dispose();
        this.target = null;
        if (this.stage && this.stage.dispose)
          this.stage.dispose();
        this.stage = null;
        if (this.ui && this.ui.dispose)
          this.ui.dispose();
        this.ui = null;
        if (this.contentProvider && this.contentProvider.dispose)
          this.contentProvider.dispose();
        this.contentProvider = null;
        window.removeEventListener("resize", resizeDelay);
      };
    }
    PreviewObject.prototype = {
      start: function () {
        this.target.gotoPage(this.target.startPage);
      },
      end: function () {
        this.target.gotoPage(this.target.endPage);
      },
      next: function () {},
      prev: function () {},
      zoom: function (delta) {
        this.pendingZoom = true;
        this.zoomDelta = delta;
        this.resize();
        this.ui.update();
      },
      resize: function () {
        var _this = this;
        if (_this.target == void 0 || _this.target.ui == void 0 || _this.target.contentProvider == void 0 || _this.target.contentProvider.viewport == void 0 || _this.target.stage == void 0)
          return;
        var isSingle = this.target.pageMode == DFLIP.PAGE_MODE.SINGLE,
          isFloating = _this.container.hasClass("df-floating");
        var target = _this.target,
          stage = target.stage,
          contentProvider = target.contentProvider,
          pageRatio = contentProvider.pageRatio,
          zoomViewport = contentProvider.zoomViewport,
          is3d = target.mode !== "css";
        var parentWidth, parentHeight, windowHeight = $(window).height();
        if (this.ui && this.ui.isFullscreen == true && utils.hasFullscreenEnabled() == true && utils.getFullscreenElement() == void 0) {
          this.ui.switchFullscreen();
        }
        var containerHeight = this.options.height;
        _this.container.height(containerHeight);
        if (Math.min(_this.container.height(), windowHeight) == windowHeight)
          containerHeight = windowHeight;
        _this.container.height(containerHeight);
        containerHeight = _this.container.height();
        if (!is3d) {
          stage.css({
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            transform: "translate3d(" + _this.target.left + "px," + _this.target.top + "px,0)"
          });
          target.stageHeight = stage.height();
        }
        parentWidth = stage.width();
        parentHeight = stage.height();
        var availableWidth = parentWidth - (is3d ? 100 : 0),
          availableHeight = Math.min(parentHeight - (is3d ? 100 : 0), windowHeight),
          possibleWidth = Math.floor(isSingle ? availableWidth : availableWidth / 2);
        var requiredHeight = Math.floor(possibleWidth / pageRatio);
        var height, width, cameraZ, fov, zoom;
        height = Math.min(requiredHeight, availableHeight);
        width = Math.floor(height * pageRatio);
        contentProvider.maxZoom = contentProvider.zoomViewport.height / height;
        if (_this.zoomValue == void 0) _this.zoomValue = 1;
        if (_this.pendingZoom == true && _this.zoomDelta !== void 0) {
          var delta = _this.zoomDelta,
            predictedIndex, currentMaxDimension = Math.max(height, width);
          _this.zoomValue = _this.zoomDelta > 0 ? _this.zoomValue * _this.options.zoomRatio : _this.zoomValue / _this.options.zoomRatio;
          _this.zoomValue = limitAt(_this.zoomValue, 1, contentProvider.maxZoom);
          if (_this.zoomValue == 1) {
            contentProvider.zoomScale = 1;
          } else {
            predictedIndex = height * _this.zoomValue;
            predictedIndex = utils.zoomStops(predictedIndex, _this.options.zoomRatio);
            contentProvider.zoomScale = limitAt(predictedIndex / currentMaxDimension, 1, contentProvider.maxZoom);
          }
        }
        zoom = (contentProvider.zoomScale == 1 || contentProvider.zoomScale == void 0) ? 1 : contentProvider.zoomScale;
        contentProvider.checkViewportSize(width, height, zoom);
        if (_this.contentSourceType == SOURCE_TYPE.PDF) {
          width = contentProvider.viewport.width / zoom;
          height = contentProvider.viewport.height / zoom;
        }
        if (contentProvider.zoomScale != 1) {
          this.target.container.addClass("df-zoom-enabled");
        }
        var containerWidth = _this.container.width();
        if (containerWidth < 400) {
          _this.container.addClass("df-xs");
        } else {
          _this.container.removeClass("df-xs");
        }
        var maxZoom = contentProvider.maxZoom;
        if (is3d) {
          var controlsHeight = _this.container.find(".df-ui-controls").height();
          if (controlsHeight == null || isFloating) controlsHeight = 0;
          stage.canvas.height(containerHeight - controlsHeight);
          if (_this.container.hasClass("df-sidemenu-open")) {
            parentWidth = parentWidth - 220;
          }
          stage.resizeCanvas(parentWidth, containerHeight - controlsHeight);
          var imageHeight = height * zoom,
            imageWidth = width * zoom,
            pageHeight = target.height,
            expectedWidth = parentWidth * pageHeight / containerHeight,
            ppi = imageHeight / pageHeight,
            aspect = parentWidth / containerHeight;
          var pageModeWidth = target.width * (isSingle ? 1 : 2);
          var refWidth = expectedWidth < pageModeWidth ? pageModeWidth / aspect : target.height;
          var padding = _this.options.minTopOffset + (isFloating ? (60) : 30);
          var adjustment = containerHeight / (containerHeight - padding);
          cameraZ = 1 / (2 * Math.tan(Math.PI * stage.camera.fov * 0.5 / 180) / ((refWidth) / (zoom / adjustment)));
          stage.camera.updateProjectionMatrix();
          stage.renderRequestPending = true;
          var shift = padding / 2 - _this.options.minTopOffset;
          _this.target.position.y = shift * pageHeight / (_this.container.height() - padding);
          stage.cssScene.position.y = _this.target.position.y;
          var _reset = contentProvider.zoomScale == 1;
          if (stage.camera.position.z !== cameraZ && _this.pendingZoom == true) {
            if (_this.zoomTween !== void 0)
              _this.zoomTween.stop();
            _this.zoomTween = new TWEEN.Tween({
              campos: stage.camera.position.z,
              otx: stage.orbitControl.target.x,
              oty: stage.orbitControl.target.y,
              otz: stage.orbitControl.target.z
            }).delay(0).to({
              campos: cameraZ,
              otx: 0,
              oty: 0,
              otz: 0
            }, 100).onUpdate(function () {
              stage.camera.position.z = this.campos;
              if (_reset) {
                stage.orbitControl.target = new THREE.Vector3(this.otx, this.oty, this.otz);
              }
              stage.orbitControl.update();
            }).easing(TWEEN.Easing.Linear.None).onComplete(function () {
              stage.camera.position.z = cameraZ;
              if (contentProvider.zoomScale == 1) {
                stage.camera.position.set(0, 0, cameraZ);
                stage.orbitControl.target = new THREE.Vector3(0, 0, 0);
              }
              stage.orbitControl.update();
            }).start();
          } else {
            if (contentProvider.zoomScale == 1) {
              stage.camera.position.set(0, 0, cameraZ);
              stage.orbitControl.target = new THREE.Vector3(0, 0, 0);
            } else {
              stage.camera.position.z = cameraZ;
            }
            stage.orbitControl.update();
          }
          stage.orbitControl.update();
          stage.orbitControl.mouseButtons.ORBIT = zoom != 1 ? -1 : THREE.MOUSE.RIGHT;
          stage.orbitControl.mouseButtons.PAN = zoom != 1 ? THREE.MOUSE.LEFT : -1;
        } else {
          if (target !== void 0) {
            target.pageWidth = Math.round(width);
            target.fullWidth = target.pageWidth * 2;
            target.height = Math.round(height);
            var zoomWidth = target.zoomWidth = Math.floor(width * zoom),
              zoomHeight = target.zoomHeight = Math.floor(height * zoom);
            var stagePaddingW = target.stage.innerWidth() - target.stage.width(),
              stagePaddingH = target.stage.innerHeight() - target.stage.height();
            var shiftHeight = target.shiftHeight = Math.round(limitAt((zoomHeight - (containerHeight - stagePaddingH)) / 2, 0, zoomHeight)),
              shiftWidth = target.shiftWidth = Math.round(limitAt(zoom == 1 ? 1 : ((zoomWidth * 2) - target.container.width() + stagePaddingW) / 2, 0, target.fullWidth * zoom));
            if (zoom == 1) {
              target.left = 0;
              target.top = 0;
            }
            target.stage.css({
              top: -shiftHeight,
              bottom: -shiftHeight,
              right: -shiftWidth,
              left: -shiftWidth,
              transform: "translate3d(" + target.left + "px," + target.top + "px,0)"
            });
            var stageInnerHeight = target.stage.innerHeight();
            target.wrapper.css({
              width: zoomWidth * 2,
              height: zoomHeight,
              marginTop: (containerHeight - zoomHeight - stagePaddingH) > 0 ? (containerHeight - stagePaddingH - zoomHeight) / 2 : 0
            });
            var wrapperSize = Math.floor((distOrigin(width, height)) * zoom);
            target.stage.find(".df-page-wrapper").width(wrapperSize).height(wrapperSize);
            target.stage.find(".df-book-page, .df-page-front , .df-page-back, .df-page-fold-inner-shadow").height(zoomHeight).width(zoomWidth);
          }
        }
        _this.checkCenter({
          type: "resize"
        });
        if (contentProvider.zoomScale == 1) {
          this.target.container.removeClass("df-zoom-enabled");
        }
        if (target.thumblist) {
          target.thumblist.reset($(target.thumblist.container).height());
        }
        _this.pendingZoom = false;
      },
      playSound: function () {
        try {
          if (this.options && this.options.soundEnable == true) {
            this.sound.currentTime = 0;
            this.sound.play();
          }
        } catch (error) {}
      },
      setPageMode: function (isSingle) {
        if (isSingle == true) {
          this.ui.pageMode.addClass(this.options.icons['doublepage']);
          this.ui.pageMode.html("<span>" + this.options.text.doublePageMode + "</span>");
          this.ui.pageMode.attr("title", this.options.text.doublePageMode);
          this.target.pageMode = DFLIP.PAGE_MODE.SINGLE;
        } else {
          this.ui.pageMode.removeClass(this.options.icons['doublepage']);
          this.ui.pageMode.html("<span>" + this.options.text.singlePageMode + "</span>");
          this.ui.pageMode.attr("title", this.options.text.singlePageMode);
          this.target.pageMode = DFLIP.PAGE_MODE.DOUBLE;
        }
        if (this.target && this.target.singlePageMode == DFLIP.SINGLE_PAGE_MODE.BOOKLET) {
          this.target.reset();
        }
        this.resize();
      },
      height: function (height) {
        if (height == void 0) {
          return this.container.height();
        } else {
          this.options.height = height;
          this.container.height(height);
          this.resize();
        }
      },
      checkCenter: function (options) {
        options = options == void 0 ? {} : options;
        this.centerType = this.centerType || "start";
        var target = this.target;
        var singleShift = 0,
          left = 0,
          right = 0;
        var basePage = utils.getBasePage(target._activePage);
        var isEven = target._activePage % 2 == 0;
        var isRTL = target.direction == DFLIP.DIRECTION.RTL;
        var isSingle = target.pageMode == DFLIP.PAGE_MODE.SINGLE,
          isBooklet = isSingle && target.singlePageMode == DFLIP.SINGLE_PAGE_MODE.BOOKLET;
        var stageWidth = target.stage.width(),
          width;
        if (target.mode == 'css') {
          width = target.wrapper.width();
          singleShift = Math.max((width - stageWidth) / 2, 0);
          left = -width / 4;
          right = width / 4;
          if (basePage == 0 || isBooklet) {
            target.wrapper.css({
              left: isSingle ? isRTL ? right - singleShift : left - singleShift : isRTL ? right : left
            });
            target.shadow.css({
              width: '50%',
              left: isRTL ? 0 : '50%',
              transitionDelay: ''
            });
          } else if (basePage == target.pageCount) {
            target.wrapper.css({
              left: isSingle ? isRTL ? left - singleShift : right - singleShift : isRTL ? left : right
            });
            target.shadow.css({
              width: '50%',
              left: isRTL ? '50%' : 0,
              transitionDelay: ''
            });
          } else {
            target.wrapper.css({
              left: isSingle ? isRTL ? (isEven ? left - singleShift : right - singleShift) : (isEven ? right - singleShift : left - singleShift) : 0
            });
            target.shadow.css({
              width: '100%',
              left: 0,
              transitionDelay: (parseInt(target.duration, 10) + 50) + 'ms'
            });
          }
          target.wrapper.css({
            transition: options.type == "resize" ? "none" : ""
          });
        } else if (target.stage !== void 0) {
          var init = target.position.x,
            end;
          singleShift = target.width / 4;
          width = target.width;
          left = -width / 2;
          right = width / 2;
          if (basePage == 0 || isBooklet) {
            end = isRTL ? right : left;
          } else if (basePage == target.pageCount) {
            end = isRTL ? left : right;
          } else {
            end = isSingle ? isRTL ? (isEven ? left : right) : (isEven ? right : left) : 0;
          }
          if (end !== this.centerEnd) {
            this.centerTween = new TWEEN.Tween({
              x: init
            }).delay(0).to({
              x: end
            }, target.duration).onUpdate(function () {
              target.position.x = this.x;
              target.stage.cssScene.position.x = this.x;
            }).easing(target.ease).start();
            this.centerEnd = end;
          }
        }
      },
      width: function (width) {
        if (width == void 0) {
          return this.container.width();
        } else {
          this.options.width = width;
          this.container.width(width);
          this.resize();
        }
      }
    };
    return PreviewObject;
  })({});
  DFLIP.PreviewObject = PreviewObject;
  var ContentProvider = (function (_super) {
    __extends(ContentProvider, _super);
    var textureLoadTimeOut = void 0;

    function ContentProvider(contentSource, callback, parameters, flipbook) {
      parameters = parameters || {};
      var _this = this;
      _this.contentRawSource = contentSource || [defaults.textureLoadFallback];
      _this.contentSource = _this.contentRawSource;
      _this.contentSourceType = void 0;
      _this.minDimension = parameters.minTextureSize || 256;
      _this.maxDimension = parameters.maxTextureSize || 2048;
      _this.flipbook = flipbook;
      _this.waitPeriod = 50;
      _this.enableDebug = false;
      _this.zoomScale = 1;
      _this.maxZoom = 2;
      _this.options = parameters;
      _this.outline = parameters.outline;
      _this.links = parameters.links;
      _this.html = parameters.html;
      _this.isCrossOrigin = parameters.isCrossOrigin;
      _this.normalViewport = {
        height: 297,
        width: 210,
        scale: 1
      };
      _this.viewport = {
        height: 297,
        width: 210,
        scale: 1
      };
      _this.zoomViewport = {
        height: 297,
        width: 210
      };
      _this.thumbsize = 128;
      _this.cacheIndex = 256;
      _this.cache = [];
      _this.pageRatio = parameters.pageRatio || _this.viewport.width / _this.viewport.height;
      _this.textureLoadTimeOut = void 0;
      _this.type = "TextureLibrary";
      if (Array === _this.contentSource.constructor || Array.isArray(_this.contentSource) || _this.contentSource instanceof Array) {
        _this.contentSourceType = SOURCE_TYPE.IMAGE;
        _this.pageCount = _this.contentSource.length;
        $("<img/>").attr("src", _this.contentSource[0]).on('load', (function () {
          _this.viewport.height = this.height;
          _this.viewport.width = this.width;
          _this.pageRatio = _this.viewport.width / _this.viewport.height;
          _this.zoomViewport = {
            width: (_this.pageRatio > 1 ? 1 : _this.pageRatio) * _this.maxDimension,
            height: _this.maxDimension / (_this.pageRatio < 1 ? 1 : _this.pageRatio)
          };
          _this.linkService = new PDFLinkService();
          $(this).off();
          if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL) {
            _this.pageCount = _this.contentSource.length * 2 - 2;
            if (_this.options.webgl == true)
              _this.requiresImageTextureScaling = true;
          }
          if (callback != void 0) {
            callback(_this);
            callback = null;
          }
          log(this.height + ":" + this.width);
        }));
      } else if (typeof _this.contentSource == 'string' || _this.contentSource instanceof String) {
        var processSource = function () {
          if (_this) {
            PDFJS.workerSrc = defaults.pdfjsWorkerSrc;
            _this.contentSourceType = SOURCE_TYPE.PDF;
            PDFJS.disableAutoFetch = true;
            PDFJS.disableStream = true;
            if (isSafari) {
              PDFJS.disableFontFace = isSafari;
            }
            PDFJS.imageResourcesPath = defaults.imagesLocation + "/pdfjs/";
            PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK;
            var loading = _this.loading = PDFJS.getDocument(_this.options.docParameters ? _this.options.docParameters : contentSource);
            loading.then(function sourceLoaded(pdf) {
              _this.pdfDocument = pdf;
              pdf.getPage(1).then(function (page) {
                _this.normalViewport = page.getViewport(1);
                _this.viewport = page.getViewport(1);
                _this.viewport.height = _this.viewport.height / 10;
                _this.viewport.width = _this.viewport.width / 10;
                _this.pageRatio = _this.viewport.width / _this.viewport.height;
                _this.zoomViewport = {
                  width: (_this.pageRatio > 1 ? 1 : _this.pageRatio) * _this.maxDimension,
                  height: _this.maxDimension / (_this.pageRatio < 1 ? 1 : _this.pageRatio)
                };
                _this.refPage = page;
                if (pdf.numPages > 1) {
                  pdf.getPage(2).then(function (page) {
                    if (_this.options.pageSize == DFLIP.PAGE_SIZE.AUTO) {
                      var _viewport = page.getViewport(1);
                      var _pageRatio = _viewport.width / _viewport.height;
                      if (_pageRatio > _this.pageRatio * 1.5) {
                        _this.options.pageSize = DFLIP.PAGE_SIZE.DOUBLEINTERNAL;
                        _this.pageCount = pdf.numPages * 2 - 2;
                      } else {
                        _this.options.pageSize = DFLIP.PAGE_SIZE.SINGLE;
                      }
                    }
                    if (callback != void 0) {
                      callback(_this);
                      callback = null;
                    }
                  });
                } else {
                  if (callback != void 0) {
                    callback(_this);
                    callback = null;
                  }
                }
              });
              _this.linkService = new PDFLinkService();
              _this.linkService.setDocument(pdf, null);
              _this.pageCount = pdf.numPages;
              _this.contentSource = pdf;
            }, function loadingError(error) {
              if (_this) {
                var cors = "",
                  tmp = document.createElement('a');
                tmp.href = _this.contentSource;
                if (tmp.hostname !== window.location.hostname)
                  cors = "CROSS ORIGIN!! ";
                _this.updateInfo(cors + "Cannot access file!  " + _this.contentSource);
              }
            });
            loading.onProgress = function getDocumentProgress(progressData) {
              if (_this) {
                var percentage = 100 * progressData.loaded / progressData.total;
                if (isNaN(percentage)) {
                  if (progressData && progressData.loaded) {
                    _this.updateInfo("Loading PDF " + (Math.ceil(progressData.loaded / 10000) / 100).toString() + "MB ...");
                  } else {
                    _this.updateInfo("Loading PDF ...");
                  }
                } else {
                  _this.updateInfo("Loading PDF " + percentage.toString().split(".")[0] + "% ...");
                }
              }
            };
          }
        };
        var checkCORS = function () {
          if (_this) {
            defaults.pdfjsWorkerSrc += "?ver=" + DFLIP.version;
            _this.updateInfo("Loading PDF Worker ...");
            var tmp = document.createElement('a');
            tmp.href = defaults.pdfjsWorkerSrc;
            if (tmp.hostname !== window.location.hostname) {
              _this.updateInfo("Loading PDF Worker CORS ...");
              $.ajax({
                url: defaults.pdfjsWorkerSrc,
                cache: true,
                success: function (data) {
                  defaults.pdfjsWorkerSrc = DFLIP.createObjectURL(data, "text/javascript");
                  processSource();
                }
              });
            } else {
              processSource();
            }
          }
        };
        if (window.PDFJS == void 0) {
          if (_this) {
            _this.updateInfo("Loading PDF Service ...");
            getScript(defaults.pdfjsSrc + "?ver=" + DFLIP.version, function () {
              if (typeof define === 'function' && define.amd) {
                _this.updateInfo("Loading PDF Service (require) ...");
                require(['pdfjs-dist/build/pdf'], function (pdf) {
                  checkCORS();
                });
              } else {
                checkCORS();
              }
            }, function () {
              _this.updateInfo("Unable to load PDF service..");
            });
          }
        } else {
          processSource();
        }
      } else {
        console.error("Unknown source type. Please check documentation for help");
      }
      this.dispose = function () {
        if (_this.loading && _this.loading.destroy) {
          _this.loading.destroy();
        }
        _this.loading = null;
        if (this.targetObject) {
          if (this.targetObject.thumbContainer && this.targetObject.thumbContainer.remove)
            this.targetObject.thumbContainer.remove();
          if (this.targetObject.outlineContainer && this.targetObject.outlineContainer.remove)
            this.targetObject.outlineContainer.remove();
          if (this.targetObject.dispose) this.targetObject.dispose();
          this.targetObject.processPage = null;
          this.targetObject.requestPage = null;
          if (this.targetObject.container && this.targetObject.container.off)
            this.targetObject.container.off();
        }
        if (this.pdfDocument && this.pdfDocument.destroy) this.pdfDocument.destroy();
        if (this.linkService && this.linkService.dispose) this.linkService.dispose();
        if (this.outlineViewer && this.outlineViewer.dispose) this.outlineViewer.dispose();
        if (this.thumblist && this.thumblist.dispose) this.thumblist.dispose();
        this.targetObject = null;
        this.pdfDocument = null;
        this.linkService = null;
        this.outlineViewer = null;
        this.thumblist = null;
        _this = null;
      };
      return this;
    }
    ContentProvider.prototype.updateInfo = function (info) {
      if (this.flipbook && this.flipbook.updateInfo) {
        this.flipbook.updateInfo(info);
      }
    };
    ContentProvider.prototype.initThumbs = function () {
      var _this = this;
      if (_this.cache[_this.thumbsize] == void 0) _this.cache[_this.thumbsize] = [];
      var thumbLoadTimeOut;
      var review = function () {
        clearTimeout(thumbLoadTimeOut);
        thumbLoadTimeOut = setTimeout(function () {
          thumbLoadTimeOut = setTimeout(reviewThumbs, _this.waitPeriod / 2);
        }, _this.waitPeriod);
      };
      var reviewThumbs = function () {
        var requestCount = 0;
        if (Date.now() - _this.thumblist.lastScrolled < 100) {
          requestCount = 1;
        } else {
          _this.targetObject.container.find(".df-thumb-container .df-vrow").each(function () {
            var thumb = $(this);
            if (!thumb.hasClass("df-thumb-loaded")) {
              requestCount++;
              var id = $(this).attr("id").replace("df-thumb", "");
              _this.getPage(id, review, true);
              thumb.addClass("df-thumb-loaded");
              return false;
            }
          });
          if (requestCount == 0) {
            clearTimeout(thumbLoadTimeOut);
          }
        }
        if (requestCount > 0) {
          review();
        }
      };
      _this.thumblist = _this.targetObject.thumblist = new ThumbList({
        h: 500,
        addFn: function (row) {},
        scrollFn: review,
        itemHeight: 128,
        totalRows: _this.pageCount,
        generatorFn: function (row) {
          var el = document.createElement("div");
          var pageNumber = row + 1;
          el.id = "df-thumb" + pageNumber;
          var elText = document.createElement("div");
          elText.innerHTML = pageNumber;
          el.appendChild(elText);
          return el;
        }
      });
      _this.thumblist.lastScrolled = Date.now();
      review();
      var thumbContainer = $('<div>').addClass("df-thumb-container df-thumb-visible");
      thumbContainer.append($(_this.thumblist.container).addClass("df-thumb-wrapper"));
      _this.targetObject.thumbContainer = thumbContainer;
      _this.targetObject.container.append(thumbContainer);
      var sideMenuClose = $(html.div, {
        class: "df-ui-btn df-ui-sidemenu-close ti-close"
      });
      thumbContainer.append(sideMenuClose);
      _this.thumblist.reset($(_this.thumblist.container).height());
      _this.targetObject.container.on('click', '.df-thumb-container .df-vrow', function (e) {
        e.stopPropagation();
        var id = $(this).attr("id").replace("df-thumb", "");
        _this.targetObject.gotoPage(parseInt(id, 10));
      });
    };
    ContentProvider.prototype.initOutline = function () {
      var _this = this;
      var outlineContainer = $('<div>').addClass("df-outline-container");
      var outlineWrapper = $('<div>').addClass("df-outline-wrapper");
      var sideMenuClose = $(html.div, {
        class: "df-ui-btn df-ui-sidemenu-close ti-close"
      });
      outlineContainer.append(sideMenuClose).append(outlineWrapper);
      _this.targetObject.container.append(outlineContainer);
      _this.targetObject.outlineContainer = outlineContainer;
      _this.outlineViewer = new BookMarkViewer({
        container: outlineWrapper[0],
        linkService: _this.linkService,
        outlineItemClass: "df-outline-item",
        outlineToggleClass: "df-outline-toggle",
        outlineToggleHiddenClass: "df-outlines-hidden"
      });

      function processOutline(outline) {
        if (_this.options.overwritePDFOutline == true) {
          outline = [];
        }
        outline = outline || [];
        if (_this.outline) {
          for (var count = 0; count < _this.outline.length; count++) {
            _this.outline[count].custom = true;
            if (outline) outline.push(_this.outline[count]);
          }
        }
        _this.outlineViewer.render({
          outline: outline
        });
      }
      if (_this.pdfDocument) {
        _this.pdfDocument.getOutline().then(function (outline) {
          processOutline(outline);
        });
      } else {
        processOutline([]);
      }
      if (_this.options.autoEnableOutline == true) {
        _this.targetObject.ui.outline.trigger("click");
      }
      if (_this.options.autoEnableThumbnail == true) {
        _this.targetObject.ui.thumbnail.trigger("click");
      }
    };
    ContentProvider.prototype.checkViewportSize = function (width, height, zoom) {
      var _this = this;
      var target = _this.targetObject;
      var zoomWidth = width * zoom,
        zoomHeight = height * zoom;
      var oldCacheSize = _this.cacheIndex;
      if (_this.contentSourceType == SOURCE_TYPE.PDF) {
        _this.cacheIndex = Math.ceil(Math.max(zoomWidth, zoomHeight));
        if (zoom !== 1) {
          _this.cacheIndex = nearestPowerOfTwo(Math.max(zoomWidth, zoomHeight));
          _this.cacheIndex = utils.zoomStops(Math.max(zoomWidth, zoomHeight), _this.options.zoomRatio, oldCacheSize < _this.cacheIndex);
        }
        _this.cacheIndex = limitAt(_this.cacheIndex * defaults.pixelRatio, _this.minDimension, _this.maxDimension);
        if (_this.cache[_this.cacheIndex] == void 0) _this.cache[_this.cacheIndex] = [];
        if (oldCacheSize !== _this.cacheIndex) {
          for (var pageCount = 0; pageCount < target.children.length; pageCount++) {
            var page = target.children[pageCount];
          }
          target.refresh();
        }
        _this.viewport = (target.mode == "css") ? _this.refPage.getViewport(zoomHeight / _this.normalViewport.height) : _this.refPage.getViewport(300 / _this.normalViewport.height);
        log(_this.cacheIndex);
        var div = target.container.find(".linkAnnotation"),
          viewportClone = _this.viewport.clone({
            dontFlip: true
          });
        div.css({
          transform: 'matrix(' + viewportClone.transform.join(',') + ')'
        });
      } else {
        if (_this.cache[_this.cacheIndex] == void 0) _this.cache[_this.cacheIndex] = [];
      }
    };
    ContentProvider.prototype.getCache = function (index, isThumb) {
      return (isThumb == true) ? this.cache[this.thumbsize] == void 0 ? void 0 : this.cache[this.thumbsize][index] : this.cache[this.cacheIndex] == void 0 ? void 0 : this.cache[this.cacheIndex][index];
    };
    ContentProvider.prototype.setCache = function (index, src, isThumb, cacheIndexSize) {
      if (isThumb == true) {
        if (this.cache[this.thumbsize] != void 0) this.cache[this.thumbsize][index] = src;
      } else {
        var cacheIndex = cacheIndexSize == void 0 ? this.cacheIndex : cacheIndexSize;
        if (this.cache[cacheIndex] != void 0)
          this.cache[cacheIndex][index] = src;
      }
    };
    ContentProvider.prototype.setTarget = function (targetObject) {
      var _this = this;
      if (targetObject == void 0) {
        return this.targetObject;
      } else {
        this.targetObject = targetObject;
        targetObject.contentProvider = this;
        targetObject.container.removeClass("df-loading df-init");
        if (_this.linkService !== void 0) {
          _this.linkService.setViewer(targetObject);
          _this.initOutline();
        }
        targetObject.processPage = function (pageNumber, callback) {
          if (pageNumber > 0 && pageNumber <= _this.pageCount) {
            _this.getPage(pageNumber, callback);
          } else {
            _this.setPage(pageNumber, defaults.textureLoadFallback, callback);
          }
        };
        targetObject.requestPage = function () {
          _this.review("Request");
        };
        if (targetObject.resize !== void 0)
          targetObject.resize();
      }
    };
    ContentProvider.prototype.review = function (message) {
      var _this = this;
      message = message || "timer review";
      clearTimeout(textureLoadTimeOut);
      textureLoadTimeOut = setTimeout(function () {
        textureLoadTimeOut = setTimeout(_this.reviewPages, _this.waitPeriod / 2, _this, message);
      }, _this.waitPeriod);
    };
    ContentProvider.prototype.reviewPages = function (_this, message) {
      _this = _this || this;
      var target = _this.targetObject;
      if (target == void 0) return;
      var isBooklet = isBookletMode(target);
      if (message !== void 0) log(message);
      var requiresRevisit = false;
      var pageCount, page;
      for (pageCount = 0; pageCount < _this.targetObject.children.length; pageCount++) {
        page = target.children[pageCount];
        if (page.isFlipping == true) {
          requiresRevisit = true;
          break;
        }
      }
      if (requiresRevisit == false) {
        var pageLength = target.children.length > 3 ? 3 : target.children.length;
        var midPoint = pageLength / 2;
        var basePage = isBooklet ? target._activePage : getBasePage(target._activePage);
        if (_this.zoomScale > 1) {
          pageLength = 1;
        }
        for (pageCount = 0; pageCount < pageLength; pageCount++) {
          var dividend = Math.floor(pageCount / 2);
          var diff = pageCount % 2 == 0 ? -dividend * (isBooklet ? 1 : 2) : (dividend == 0 ? 1 : dividend) * (isBooklet ? 1 : 2);
          var frontPageNumber = basePage + diff,
            backPageNumber = basePage + diff + 1;
          var page1 = target.getPageByNumber(frontPageNumber),
            page2 = target.getPageByNumber(backPageNumber),
            reqFrontPageStamp = frontPageNumber + "|" + _this.cacheIndex,
            reqBackPageStamp = backPageNumber + "|" + _this.cacheIndex;
          var requestCount = 0;
          if (page1 !== void 0 && page1.frontPageStamp != reqFrontPageStamp && page1.visible == true) {
            target.processPage(frontPageNumber, function () {
              _this.review("Batch Call");
            });
            page1.frontPageStamp = reqFrontPageStamp;
            page1.frontTextureLoaded = true;
            requestCount++;
          }
          if (page2 !== void 0 && page2.backPageStamp != reqBackPageStamp && page2.visible == true && !isBooklet) {
            target.processPage(backPageNumber, function () {
              _this.review("Batch Call");
            });
            page2.backPageStamp = reqBackPageStamp;
            page2.backTextureLoaded = true;
            requestCount++;
          }
          if (diff == 0 && _this.annotedPage !== basePage && target.mode !== "css") {
            _this.getAnnotations(frontPageNumber);
            if (!isBooklet) _this.getAnnotations(backPageNumber);
            _this.annotedPage = basePage;
          }
          if (requestCount > 0) {
            break;
          }
        }
        if (requestCount == 0) {
          if (target.mode !== "css") {
            _this.setLoading(basePage);
          } else {
            _this.setLoading(basePage);
            _this.setLoading(basePage + 1);
          }
        }
      } else {
        _this.review("Revisit request");
        if (_this.annotedPage !== void 0 && target.mode !== "css") {
          var baseActive = getBasePage(target._activePage);
          $(target.getContentLayer(baseActive)).html("");
          $(target.getContentLayer(baseActive + 1)).html("");
          _this.annotedPage = void 0;
        }
      }
    };
    ContentProvider.prototype.getPage = function (pageNumber, callbackFunction, isThumb) {
      var _this = this;
      pageNumber = parseInt(pageNumber, 10);
      var _pageNumber = pageNumber;
      var source = _this.contentSource;
      if (pageNumber <= 0 && pageNumber >= _this.pageCount) {
        _this.setPage(pageNumber, defaults.textureLoadFallback, callbackFunction, isThumb);
      } else {
        if (_this.contentSourceType == SOURCE_TYPE.PDF) {
          if (_this.getCache(pageNumber, isThumb) !== void 0) {
            _this.setPage(pageNumber, _this.getCache(pageNumber, isThumb), callbackFunction, isThumb);
            log("Page " + pageNumber + " loaded from cache");
          } else {
            if (isThumb !== true) _this.setLoading(pageNumber, true);
            if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 2) {
              _pageNumber = Math.ceil((pageNumber - 1) / 2) + 1;
            }
            source.getPage(_pageNumber, isThumb).then(function (page) {
              renderPage(page, pageNumber, callbackFunction, isThumb);
            });
          }
        } else if (_this.contentSourceType == SOURCE_TYPE.IMAGE || _this.contentSourceType == SOURCE_TYPE.HTML) {
          if (_this.getCache(pageNumber, isThumb) !== void 0) {
            _this.setPage(pageNumber, _this.getCache(pageNumber, isThumb), callbackFunction, isThumb);
            log("Page " + pageNumber + " loaded from cache");
          } else {
            if (isThumb !== true) _this.setLoading(pageNumber, true);
            if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 2) {
              _pageNumber = Math.ceil((pageNumber - 1) / 2) + 1;
            }
            loadImage(source[_pageNumber - 1], function (src) {
              _this.setCache(pageNumber, src, isThumb, _this.cacheIndex);
              _this.setPage(pageNumber, src, callbackFunction, isThumb);
              if (callbackFunction != void 0) callbackFunction();
            }, _this.isCrossOrigin);
          }
        }
      }

      function loadImage(src, callback, isCrossOrigin) {
        var img = new Image;
        img.crossOrigin = "Anonymous";
        img.onload = function () {
          if (isCrossOrigin == true) {
            var canvas = document.createElement("canvas"),
              ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            if (defaults.canvasToBlob == true) {
              canvas.toBlob(function (blob) {
                var src = DFLIP.createObjectURL(blob, "image/jpeg");
                if (callback != void 0) callback(src);
              }, "image/jpeg", 0.85)
            } else {
              if (callback != void 0) callback(canvas);
            }
          } else {
            if (callback != void 0) callback(src);
          }
          img.onload = null;
          img = null;
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
          img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          img.src = src;
        }
      }

      function renderPage(page, pageNumber, callbackFunction, isThumb) {
        var forceFit = _this.options.forceFit;
        var isDoublePage = _this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 1 && pageNumber < _this.pageCount;
        var widthFix = isDoublePage && forceFit ? 2 : 1;
        var viewport = forceFit ? page.getViewport(1) : _this.normalViewport;
        var scale = _this.cacheIndex / Math.max(viewport.width / widthFix, viewport.height);
        if (_this.webgl == true) {
          scale = nearestPowerOfTwo(_this.cacheIndex) / (_this.pageRatio > 1 ? viewport.width / widthFix : viewport.height);
        }
        var canvas = document.createElement('canvas');
        var start = performance.now();
        var requestedCacheSize = _this.cacheIndex;
        var context = canvas.getContext('2d');
        if (isThumb == true) {
          scale = _this.thumbsize / _this.normalViewport.height;
        }
        canvas.height = Math.round(viewport.height * scale);
        canvas.width = Math.round(viewport.width / widthFix * scale);
        if (_this.targetObject.mode == 'css' && Math.abs(_this.targetObject.zoomHeight - canvas.height) < 2) {
          canvas.height = _this.targetObject.zoomHeight + 0;
          canvas.width = _this.targetObject.zoomWidth + 0;
        }
        viewport = page.getViewport(scale);
        log("rendering " + pageNumber + " at " + canvas.width + "x" + canvas.height);
        if (isDoublePage && pageNumber % 2 == 1) {
          viewport.transform[4] = -canvas.width;
        }
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.cleanupAfterRender = true;
        var pageRendering = page.render(renderContext);
        pageRendering.promise.then(function () {
          log(performance.now() - start);
          start = performance.now();
          if (isThumb == true || (_this.options.canvasToBlob == true && _this.webgl !== true)) {
            canvas.toBlob(function (blob) {
              var src = DFLIP.createObjectURL(blob, "image/jpeg");
              log(performance.now() - start);
              _this.setCache(pageNumber, src, isThumb, requestedCacheSize);
              _this.setPage(pageNumber, src, callbackFunction, isThumb);
            }, "image/jpeg", 0.90)
          } else {
            _this.setPage(pageNumber, canvas, callbackFunction, isThumb);
          }
          renderContext = null;
        });
      }
    };
    ContentProvider.prototype.getTargetPage = function (pageNumber) {};
    ContentProvider.prototype.setLoading = function (pageNumber, show) {
      if (this.targetObject !== void 0) {
        if (this.webgl == true) {
          var container = this.targetObject.container;
          if (show == true) {
            if (container.isLoading !== true) {
              container.addClass("df-loading");
              container.isLoading = true;
              log("Loading icon at " + pageNumber + " as " + show);
            }
          } else {
            if (container.isLoading !== void 0) {
              container.removeClass("df-loading");
              container.isLoading = void 0;
              log("Loading icon at " + pageNumber + " as " + show);
            }
          }
        } else {
          var contentLayer = $(this.targetObject.getContentLayer(pageNumber));
          if (contentLayer !== void 0) {
            if (show == true) contentLayer.addClass("df-page-loading");
            else contentLayer.removeClass("df-page-loading");
          }
        }
      }
    };
    ContentProvider.prototype.getAnnotations = function (pageNumber) {
      var _this = this;
      if (_this.options.enableAnnotation == false) return;
      var target = _this.targetObject;
      pageNumber = parseInt(pageNumber, 10);
      var source = _this.contentSource;
      var contentLayer = $(target.getContentLayer(pageNumber));
      contentLayer.empty();
      if (pageNumber > 0 && pageNumber <= _this.pageCount) {
        if (_this.contentSourceType == SOURCE_TYPE.PDF) {
          var basePage = getBasePage(pageNumber);
          var _pageNumber = pageNumber;
          if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 2) {
            _pageNumber = Math.ceil((pageNumber - 1) / 2) + 1;
          }
          source.getPage(_pageNumber).then(function (page) {
            if (contentLayer !== void 0 && contentLayer.length > 0) {
              _this.setupAnnotations(page, _this.viewport, contentLayer, pageNumber);
            }
          });
        }
        if (_this.links !== void 0 && _this.links[pageNumber] !== void 0) {
          var pageLinks = _this.links[pageNumber];
          for (var index = 0; index < pageLinks.length; index++) {
            var pageLink = pageLinks[index];
            var annotation;
            if (pageLink.dest && pageLink.dest.indexOf && pageLink.dest.indexOf('[html]') == 0) {
              annotation = document.createElement('div');
              annotation.innerHTML = pageLink.dest.substr(6);
              annotation.className = "customHtmlAnnotation";
            } else {
              annotation = document.createElement('a');
              annotation.setAttribute("dest", pageLink.dest);
              annotation.className = "customLinkAnnotation";
              annotation.href = "#" + pageLink.dest;
              annotation.onclick = function () {
                var dest = this.getAttribute("dest");
                if (dest) {
                  _this.linkService.customNavigateTo(dest);
                }
                return false;
              };
            }
            annotation.style.left = pageLink.x + "%";
            annotation.style.top = pageLink.y + "%";
            annotation.style.width = pageLink.w + "%";
            annotation.style.height = pageLink.h + "%";
            contentLayer[0].appendChild(annotation);
          }
        }
        if (_this.html !== void 0 && _this.html[pageNumber] !== void 0) {
          var pageHTML = _this.html[pageNumber];
          contentLayer.append($("<div class='customHTMLAnnotation'>").html(pageHTML));
        }
      }
    };
    ContentProvider.prototype.setPage = function (pageNumber, textureSrc, callbackFunction, isThumb) {
      var _this = this;
      var target = _this.targetObject;
      var isRTL = isRTLMode(target);
      var isBooklet = isBookletMode(target);
      if (isThumb == true) {
        var page = _this.targetObject.container.find("#df-thumb" + pageNumber);
        page.css({
          backgroundImage: bgImage(textureSrc)
        });
      } else {
        if (textureSrc == defaults.textureLoadFallback) {
          log("Fallback on " + pageNumber);
        } else {
          if (target.mode == "css")
            _this.getAnnotations(pageNumber);
        }
        var bookPage = target.getPageByNumber(pageNumber);
        if (bookPage !== void 0) {
          if ((pageNumber % 2 != 0 && !isRTL) || (pageNumber % 2 != 1 && isRTL && !isBooklet) || (isBooklet && !isRTL)) {
            log(pageNumber + "rendered to back of " + bookPage.color);
            bookPage.backImage(textureSrc, function (object, texture) {
              _this.setLoading(pageNumber);
              if (_this.requiresImageTextureScaling && texture && pageNumber != 1 && pageNumber != _this.pageCount) {
                texture.repeat.x = 0.5;
                texture.offset.x = 0.5;
              }
              if (callbackFunction != void 0) callbackFunction();
            });
          } else {
            log(pageNumber + "rendered to front of " + bookPage.color);
            bookPage.frontImage(textureSrc, function (object, texture) {
              _this.setLoading(pageNumber);
              if (_this.requiresImageTextureScaling && texture && pageNumber != 1 && pageNumber != _this.pageCount) {
                texture.repeat.x = 0.5;
              }
              if (callbackFunction != void 0) callbackFunction();
            });
          }
        } else {
          log("Invalid set request on Page " + pageNumber);
        }
      }
    };
    ContentProvider.prototype.setupAnnotations = function (page, viewport, pageDiv, pageNumber) {
      if (pageDiv == void 0 || $(pageDiv).length == 0) return;
      var _this = this;
      return page.getAnnotations().then(function (annotationsData) {
        viewport = viewport.clone({
          dontFlip: true
        });
        if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 2 && pageNumber % 2 == 1) {} else if (pageNumber == 1) {}
        if (pageDiv == void 0) {
          return;
        }
        pageDiv = $(pageDiv);
        if (pageDiv.find(".annotationDiv").length == 0) {
          pageDiv.append($("<div class='annotationDiv'>"));
        }
        var div = pageDiv.find(".annotationDiv");
        div.empty();
        if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 2 && pageNumber % 2 == 1) {
          div.css({
            left: '-100%'
          });
        } else if (pageNumber == 1) {
          div.css({
            left: ''
          });
        }
        PDFJS.AnnotationLayer.render({
          annotations: annotationsData,
          div: div[0],
          page: page,
          viewport: viewport,
          linkService: _this.linkService
        });
        if (_this.options.annotationClass && _this.options.annotationClass !== "") {
          div.find(" > section").addClass(_this.options.annotationClass);
        }
      });
    };
    return ContentProvider;
  })({});
  var PageCSS = (function () {
    function PageCSS(parameters) {
      this.angles = parameters.angles || [0, 0, 0, 0, 0, 0];
      this.stiffness = parameters.angles || 0.1;
      this.segments = parameters.segments || 1;
      this.initDOM();
    }

    function createInternals(pageSide) {
      var contentLayer = pageSide.contentLayer = $(html.div, {
        class: "df-page-content"
      });
      pageSide.append(contentLayer);
    }
    PageCSS.prototype = {
      initDOM: function () {
        var element = this.element = $(html.div, {
          class: "df-book-page"
        });
        var wrapper = this.wrapper = $(html.div, {
          class: "df-page-wrapper"
        });
        var front = this.front = $(html.div, {
          class: "df-page-front"
        });
        var back = this.back = $(html.div, {
          class: "df-page-back"
        });
        var foldInnerShadow = this.foldInnerShadow = $(html.div, {
          class: "df-page-fold-inner-shadow"
        });
        var foldOuterShadow = this.foldOuterShadow = $(html.div, {
          class: "df-page-fold-outer-shadow"
        });
        this.frontIMG = new Image();
        this.backIMG = new Image();
        createInternals(front, this.segments, true);
        createInternals(back, this.segments, false);
        element.append(wrapper).append(foldOuterShadow);
        wrapper.append(front).append(back).append(foldInnerShadow);
      },
      updatePoint: function (point) {
        if (point == void 0) return;
        var page = this.parent.dragPage != void 0 ? this.parent.dragPage : point.page != void 0 ? point.page : this;
        var pageWidth = page.element.width(),
          pageHeight = page.element.height();
        var corner = this.parent.corner !== void 0 ? this.parent.corner : point.corner,
          corners = DFLIP.CORNERS;
        var
          isRight = page.side == drag.right,
          isBottom = (corner == corners.BL) || (corner == corners.BR);
        point.rx = (isRight == true) ? pageWidth * 2 - point.x : point.x;
        point.ry = (isBottom == true) ? pageHeight - point.y : point.y;
        var radAngle = Math.atan2(point.ry, point.rx);
        radAngle = Math.PI / 2 - limitAt(radAngle, 0, toRad(90));
        var correctionX = isRight ? point.x / 2 : pageWidth - point.x / 2,
          correctionY = point.ry / 2,
          refLength = Math.max(0, Math.sin(radAngle - Math.atan2(correctionY, correctionX)) * distOrigin(correctionX, correctionY)),
          foldLength = 0.5 * distOrigin(point.rx, point.ry);
        var x = Math.round(pageWidth - refLength * Math.sin(radAngle)),
          y = Math.round(refLength * Math.cos(radAngle)),
          angle = toDeg(radAngle);
        var angle1 = isBottom ? isRight ? 180 + (90 - angle) : 180 + angle : isRight ? angle : 90 - angle;
        var angle2 = isBottom ? isRight ? 180 + (90 - angle) : angle : isRight ? angle + 180 : angle1,
          angleS = isBottom ? isRight ? 90 - angle : angle + 90 : isRight ? angle1 - 90 : angle1 + 180,
          x1 = isRight ? pageWidth - x : x,
          y1 = isBottom ? pageHeight + y : -y,
          x2 = isRight ? -x : x - pageWidth,
          y2 = isBottom ? -pageHeight - y : y;
        var opacity = limitAt(point.distance * 0.5 / pageWidth, 0, 0.5);
        var foldOpacity = limitAt((pageWidth * 2 - point.rx) * 0.5 / pageWidth, 0.05, 0.3);
        page.element.addClass("df-folding");
        var front = isRight ? page.back : page.front;
        var back = isRight ? page.front : page.back;
        var outerShadow = page.foldOuterShadow;
        var innerShadow = page.foldInnerShadow;
        page.wrapper.css({
          transform: translateStr(x1, y1) + rotateStr(angle1)
        });
        front.css({
          transform: rotateStr(-angle1) + translateStr(-x1, -y1)
        });
        back.css({
          transform: rotateStr(angle2) + translateStr(x2, y2),
          boxShadow: "rgba(0, 0, 0, " + opacity + ") 0px 0px 20px"
        });
        innerShadow.css({
          transform: rotateStr(angle2) + translateStr(x2, y2),
          opacity: foldOpacity / 2,
          backgroundImage: prefix.css + "linear-gradient( " + angleS + "deg, rgba(0, 0, 0, 0.25) , rgb(0, 0, 0) " + foldLength * 0.7 + "px, rgb(255, 255, 255) " + foldLength + "px)"
        });
        outerShadow.css({
          opacity: foldOpacity / 2,
          left: isRight ? "auto" : 0,
          right: isRight ? 0 : "auto",
          backgroundImage: prefix.css + "linear-gradient( " + (-angleS + 180) + "deg, rgba(0, 0, 0,0) " + foldLength / 3 + "px, rgb(0, 0, 0) " + foldLength + "px)"
        });
      },
      updateAngle: function (angle, isRight) {
        var width = this.element.width() * 5;
        this.wrapper.css({
          perspective: width,
          perspectiveOrigin: isRight == true ? "0% 50%" : "100% 50%"
        });
        this.front.css({
          display: (isRight == true ? (angle <= -90 ? 'block' : 'none') : (angle < 90 ? 'block' : 'none')),
          transform: (prefix.dom !== 'MfS' ? "" : "perspective(" + width + "px) ")
            + (isRight == true ? "translateX(-100%) " : "")
            + "rotateY(" + ((isRight == true ? 180 : 0) + angle) + "deg)"
        });
        this.back.css({
          display: (isRight == true ? (angle > -90 ? 'block' : 'none') : (angle >= 90 ? 'block' : 'none')),
          transform: (prefix.dom !== 'MSd' ? "" : "perspective(" + width + "px) ")
            + (isRight == false ? "translateX(100%) " : "")
            + "rotateY(" + ((isRight == false ? -180 : 0) + angle) + "deg)"
        });
        return;
      },
      tween: function (point) {
        var page = this;
        if (page == void 0 || page.parent == void 0) return;
        var isBooklet = isBookletMode(page.parent);
        var isRight = page.side == drag.right;
        var isRTL = page.parent.direction == DFLIP.DIRECTION.RTL;
        var isBottom = page.parent.corner == DFLIP.CORNERS.BL || page.parent.corner == DFLIP.CORNERS.BR;
        var isMagnetic = page.magnetic == true;
        var travelY = isBottom ? page.parent.height : 0;
        var init, first, mid, angle = 0;
        var end = page.end = (page && page.animateToReset == true) ? {
          x: isRight ? page.parent.fullWidth : 0,
          y: travelY
        } : {
          x: isRight ? 0 : page.parent.fullWidth,
          y: travelY
        };
        page.ease = page.isHard ? TWEEN.Easing.Quadratic.InOut : TWEEN.Easing.Linear.None;
        var tempDuration = page.parent.duration;
        if (page.isHard == true) {
          if (point != void 0) {
            angle = angleByDistance(point.distance, point.fullWidth);
          }
          init = page.init = {
            angle: angle * (isRight ? -1 : 1)
          };
          end = page.end = (page && page.animateToReset == true) ? {
            angle: isRight ? 0 : -0
          } : {
            angle: isRight ? -180 : 180
          };
        } else {
          if (point == void 0) {
            init = page.init = (page && page.animateToReset == true) ? {
              x: isRight ? 0 : page.parent.fullWidth,
              y: 0
            } : {
              x: isRight ? page.parent.fullWidth : 0,
              y: 0
            };
            first = page.first = {
              x: (isRight ? 3 : 1) * page.parent.fullWidth / 4,
              y: 0
            };
            mid = page.mid = {
              x: (isRight ? 1 : 3) * page.parent.fullWidth / 4,
              y: 0
            };
          } else {
            init = page.init = {
              x: point.x,
              y: point.y,
              opacity: 1
            };
            first = page.first = {
              x: point.x * 3 / 4,
              y: point.y * 3 / 4,
              opacity: 1
            };
            mid = page.mid = {
              x: point.x / 4,
              y: point.y / 4,
              opacity: 1
            };
            tempDuration = page.parent.duration * distPoints(init.x, init.y, end.x, end.y) / page.parent.fullWidth;
            tempDuration = limitAt(tempDuration, page.parent.duration / 3, page.parent.duration);
          }
        }
        init.index = 0;
        end.index = 1;
        page.isFlipping = true;
        var update = function (tween) {
          if (page.isHard == true) {
            page.updateAngle(tween.angle, isRight);
            page.angle = tween.angle;
          } else {
            page.updatePoint({
              x: tween.x,
              y: tween.y
            });
            page.x = tween.x;
            page.y = tween.y;
          }
          if (isBooklet && !isMagnetic)
            page.element[0].style.opacity = (isRight && !isRTL) || (!isRight && isRTL) ? tween.index > 0.5 ? 2 * (1 - tween.index) : 1 : tween.index < 0.5 ? 2 * tween.index : 1;
        };
        if (isBooklet && ((!isRight && !isRTL) || (isRight && isRTL)))
          page.element[0].style.opacity = 0;
        var completeTween = page.completeTween = page.completeTween || function (skipRefresh) {
          page.isFlipping = false;
          if (page.isHard == true) {
            page.updateAngle(page.end.angle);
            page.back.css({
              display: "block"
            });
            page.front.css({
              display: "block"
            });
          } else {
            page.updatePoint({
              x: page.end.x,
              y: page.end.y
            });
          }
          page.element[0].style.opacity = 1;
          if (page.animateToReset !== true) {
            page.side = page.side == drag.right ? drag.left : drag.right;
          } else
            page.animateToReset = void 0;
          page.currentTween = void 0;
          page.pendingPoint = void 0;
          page.magnetic = false;
          page.parent.dragPage = void 0;
          page.parent.corner = DFLIP.CORNERS.NONE;
          if (skipRefresh != true)
            page.parent.refresh();
        };
        if (page.isHard == true) {
          page.currentTween = new TWEEN.Tween(init).delay(0).to(end, page.parent.duration).onUpdate(function () {
            update(this);
          }).easing(page.ease).onComplete(page.completeTween).start();
        } else {
          if (point == void 0) {
            page.currentTween = new TWEEN.Tween(init).delay(0).to(end, page.parent.duration).onUpdate(function () {
              update(this);
            }).easing(TWEEN.Easing.Sinusoidal.Out).onComplete(page.completeTween).start();
          } else {
            page.currentTween = new TWEEN.Tween(init).delay(0).to(end, tempDuration).onUpdate(function () {
              update(this);
            }).easing(TWEEN.Easing.Sinusoidal.Out).onComplete(page.completeTween);
            page.currentTween.start();
          }
        }
      },
      frontImage: function (texture, callback) {
        var _this = this;

        function completed() {
          _this.front.css({
            backgroundImage: bgImage(texture)
          });
          if (callback !== void 0) callback();
        }
        if (texture.nodeName == "CANVAS") {
          _this.front.find(">canvas").remove();
          _this.front.append($(texture));
          if (callback !== void 0) callback();
        } else {
          if (texture == defaults.textureLoadFallback) {
            completed();
          } else {
            _this.frontIMG.onload = completed;
            _this.frontIMG.src = texture;
          }
        }
      },
      backImage: function (texture, callback) {
        var _this = this;

        function completed() {
          _this.back.css({
            backgroundImage: bgImage(texture)
          });
          if (callback !== void 0) callback();
        }
        if (texture.nodeName == "CANVAS") {
          _this.back.find(">canvas").remove();
          _this.back.append($(texture));
          if (callback !== void 0) callback();
        } else {
          if (texture == defaults.textureLoadFallback) {
            completed();
          } else {
            _this.backIMG.onload = completed;
            _this.backIMG.src = texture;
          }
        }
      },
      updateCSS: function (css) {
        this.element.css(css);
      },
      resetCSS: function () {
        this.wrapper.css({
          transform: ''
        });
        this.front.css({
          transform: '',
          boxShadow: ''
        });
        this.back.css({
          transform: '',
          boxShadow: ''
        });
      },
      clearTween: function (skipRefresh) {
        this.currentTween.stop();
        this.completeTween(skipRefresh == true);
        this.resetCSS();
      }
    };
    return PageCSS;
  })();
  var BookCSS = (function (_super) {
      __extends(BookCSS, _super);

      function updateFolding(dragPage) {
        dragPage.parent.container.find(".df-folding").removeClass("df-folding");
        dragPage.element.addClass("df-folding");
      }

      function hasFlipping(book) {
        var hasFlipping = false;
        for (var pageCount = 0; pageCount < book.pages.length; pageCount++) {
          var page = book.pages[pageCount];
          if (page.isFlipping == true) {
            hasFlipping = true;
            break;
          }
        }
        return hasFlipping;
      }

      function BookCSS(parameters, container) {
        var _this = this;
        _this.type = "BookCSS";
        _this.images = parameters.images || [];
        _this.pageCount = parameters.pageCount || 2;
        _this.foldSense = 50;
        _this.stackCount = 4;
        _this.mode = "css";
        _this.pages = [];
        _this.duration = parameters.duration;
        _this.container = $(container);
        _this.options = parameters;
        _this.drag = drag.none;
        _this.pageCount = (_this.pageCount == 1 ? _this.pageCount : Math.ceil(_this.pageCount / 2) * 2);
        _this.pageMode = parameters.pageMode || ((isMobile || _this.pageCount <= 2) ? DFLIP.PAGE_MODE.SINGLE : DFLIP.PAGE_MODE.DOUBLE);
        _this.singlePageMode = parameters.singlePageMode || (isMobile ? DFLIP.SINGLE_PAGE_MODE.BOOKLET : DFLIP.SINGLE_PAGE_MODE.ZOOM);
        _this.swipe_threshold = isMobile ? 15 : 50;
        _this.direction = parameters.direction || DFLIP.DIRECTION.LTR;
        _this.startPage = 1;
        _this.endPage = _this.pageCount;
        _this._activePage = parameters.openPage || _this.startPage;
        _this.hardConfig = parameters.hard;
        has3d = 'WebKitCSSMatrix' in window || (document.body && 'MozPerspective' in document.body.style);
        _this.animateF = function () {
          if (TWEEN.getAll().length > 0)
            TWEEN.update();
          else
            clearInterval(_this.animate);
        };
        _this.init(parameters);
        _this.skipDrag = false;

        function checkPage(point) {
          if (_this.dragPage != point.page && point.page.visible == true) {
            _this.dragPage.clearTween(true);
            _this.dragPage = point.page;
            _this.corner = point.corner;
            _this.dragPage.pendingPoint = point;
          }
        }
        var mouseMove = function (event) {
            var point = _this.eventToPoint(event);
            if (event.touches !== void 0 && event.touches.length == 2 && _this.startTouches !== void 0) {
              _this.zoomDirty = true;
              var touchCenter = utils.getVectorAvg(utils.getTouches(event, _this.container.offset())),
                newScale = utils.calculateScale(_this.startTouches, utils.getTouches(event)),
                scale = newScale / _this.lastScale;
              var zoom = _this.contentProvider.zoomScale,
                x = touchCenter.x,
                y = touchCenter.y;
              _this.stage.css({
                transform: "translate3d(" + _this.left + "px," + _this.top + "px,0) scale3d(" + newScale + "," + newScale + ",1)"
              });
              _this.lastScale = newScale;
              _this.lastZoomCenter = touchCenter;
              event.preventDefault();
            }
            if ((event.touches !== void 0 && event.touches.length > 1) || _this.startPoint == void 0 || _this.startTouches !== void 0) return;
            var targetPage = _this.dragPage || point.page;
            if (_this.contentProvider.zoomScale !== 1) {
              if ((event.touches !== void 0 || _this.isPanning == true)) {
                _this.pan(point);
                event.preventDefault();
              }
            } else {
              if (_this.skipDrag !== true) {
                var distance = point.distance;
                if (!hasFlipping(_this)) {
                  if ((_this.dragPage !== void 0) || (point.isInside == true)) {
                    if (_this.dragPage !== void 0) {
                      log("set mouse down move");
                    } else {
                      point.y = limitAt(point.y, 1, _this.height - 1);
                      point.x = limitAt(point.x, 1, point.fullWidth - 1);
                    }
                    var corner = _this.corner || point.corner;
                    if (targetPage.isHard) {
                      var isRight = corner == DFLIP.CORNERS.BR || corner == DFLIP.CORNERS.TR;
                      var angle = angleByDistance(point.distance, point.fullWidth);
                      targetPage.updateAngle(angle * (isRight ? -1 : 1), isRight);
                    } else {
                      targetPage.updatePoint(point, _this);
                    }
                    targetPage.magnetic = true;
                    targetPage.magneticCorner = point.corner;
                    event.preventDefault();
                  }
                  if (_this.dragPage == void 0 && targetPage !== void 0 && point.isInside == false && targetPage.magnetic == true) {
                    targetPage.pendingPoint = point;
                    targetPage.animateToReset = true;
                    _this.corner = targetPage.magneticCorner;
                    _this.animatePage(targetPage);
                    targetPage.pendingPoint = void 0;
                    targetPage.magnetic = false;
                    targetPage.magneticCorner = void 0;
                  }
                  if (_this.isPanning == true && _this.dragPage == void 0 && _this.contentProvider.zoomScale == 1) {
                    var swipe_dist = point.x - _this.lastPos,
                      swipe_time = performance.now() - _this.lastTime;
                    if (Math.abs(swipe_dist) > _this.swipe_threshold) {
                      if (swipe_dist < 0) {
                        _this.next();
                      } else {
                        _this.prev();
                      }
                      _this.drag = drag.none;
                      _this.isPanning = false;
                      event.preventDefault();
                    }
                    _this.lastPos = point.x;
                    _this.lastTime = performance.now();
                  }
                }
              }
            }
          },
          mouseUp = function (event) {
            if (event.touches !== void 0 && event.touches.length == 0) {
              var zoom = _this.contentProvider.zoomScale;
              if (_this.zoomDirty == true) {
                _this.previewObject.contentProvider.zoomScale = utils.limitAt(_this.previewObject.contentProvider.zoomScale * _this.lastScale, 1, _this.previewObject.contentProvider.maxZoom);
                _this.previewObject.zoomValue = _this.previewObject.contentProvider.zoomScale * 1;
                _this.previewObject.resize();
                _this.zoomDirty = false;
              }
              _this.wrapper.css({
                transform: ""
              });
              _this.lastScale = void 0;
              _this.startTouches = void 0;
            }
            _this.isPanning = false;
            if (event.touches !== void 0 && event.touches.length > 1) return;
            if (_this.skipDrag !== true) {
              var point = _this.eventToPoint(event);
              if (_this.dragPage) {
                event.preventDefault();
                _this.dragPage.pendingPoint = point;
                if (point.x == _this.startPoint.x && point.y == _this.startPoint.y && point.isInside == true) {
                  if (_this.corner == DFLIP.CORNERS.BR || _this.corner == DFLIP.CORNERS.TR) {
                    checkPage(point);
                    if (_this.dragPage.isFlipping !== true)
                      _this.next();
                  } else if (_this.corner == DFLIP.CORNERS.BL || _this.corner == DFLIP.CORNERS.TL) {
                    checkPage(point);
                    if (_this.dragPage.isFlipping !== true)
                      _this.prev();
                  }
                } else if (_this.dragPage.isFlipping !== true) {
                  if (point.distance > point.fullWidth / 2) {
                    if (point.x > point.fullWidth / 2)
                      _this.prev();
                    else
                      _this.next();
                  } else {
                    _this.dragPage.animateToReset = true;
                    _this.animatePage(_this.dragPage);
                  }
                }
                if (_this.dragPage) {
                  _this.dragPage.pendingPoint = void 0;
                  _this.dragPage.magnetic = false;
                }
              } else {}
              _this.drag = drag.none;
            }
          },
          mouseClick = function (event) {
            var point = _this.eventToPoint(event);
            var element = event.srcElement || event.originalTarget;
            if (_this.dragPage && _this.dragPage.magnetic) return;
            if (_this.wrapper[0].contains(event.target) && _this.contentProvider.zoomScale == 1 && point.x == _this.startPoint.x && point.y == _this.startPoint.y && point.isInsidePage && _this.startPoint.page == point.page && !point.page.isFlipping && element.nodeName !== "A") {
              if (_this.startPoint.page.side == 0) {
                _this.corner = DFLIP.CORNERS.TL;
                _this.prev();
                _this.startPoint.page = void 0;
              } else {
                _this.corner = DFLIP.CORNERS.TR;
                _this.next();
                _this.startPoint.page = void 0;
              }
              _this.isPanning = false;
            }
          },
          mouseDown = function (event) {
            if (event.touches !== void 0 && event.touches.length == 2 && _this.startTouches == void 0) {
              _this.startTouches = utils.getTouches(event);
              _this.lastScale = 1;
            }
            if ((event.touches !== void 0 && event.touches.length > 1) || (event.touches == void 0 && event.button !== 0)) return;
            var point = _this.eventToPoint(event);
            _this.startPoint = point;
            _this.left = _this.left || 0;
            _this.top = _this.top || 0;
            _this.isPanning = true;
            _this.lastPos = point.x;
            _this.lastTime = performance.now();
            if (_this.skipDrag !== true) {
              if (point.isInside == true && !hasFlipping(_this)) {
                _this.startPoint = point;
                _this.drag = point.drag;
                _this.dragPage = point.page;
                _this.corner = point.corner;
                log(_this.corner);
                updateFolding(_this.dragPage);
                if (point.page.isHard) {} else {
                  point.page.updatePoint(point, _this);
                }
                if (point.page.name == "0") {
                  _this.shadow.css({
                    width: '50%',
                    left: _this.direction == DFLIP.DIRECTION.RTL ? 0 : '50%',
                    transitionDelay: ''
                  });
                } else if (point.page.name == Math.ceil(_this.pageCount / 2) - 1) {
                  _this.shadow.css({
                    width: '50%',
                    left: _this.direction == DFLIP.DIRECTION.RTL ? '50%' : 0,
                    transitionDelay: ''
                  });
                }
              }
            }
          },
          onMouseWheel = function (event) {
            var delta = 0;
            if (event.wheelDelta != void 0) {
              delta = event.wheelDelta / 120;
            } else if (event.detail !== void 0) {
              delta = -event.detail / 3;
            }
            var zoom1 = _this.contentProvider.zoomScale,
              maxZoom = _this.contentProvider.maxZoom;
            if (delta) {
              if ((delta > 0 && zoom1 < maxZoom) || (delta < 0 && zoom1 > 1)) {
                event.stopPropagation();
                event.preventDefault();
                var pointOld = _this.eventToPoint(event);
                var pointNew = _this.eventToPoint(event);
                var origin = {
                  x: _this.container.width() / 2,
                  y: -23 + _this.container.height() / 2
                };
                _this.previewObject.zoom(delta);
                var zoom2 = _this.contentProvider.zoomScale;
                if (zoom1 !== zoom2) {
                  var dz = (zoom2 / zoom1);
                  if (zoom2 == 1) {
                    _this.left = 0;
                    _this.top = 0;
                  } else {
                    _this.left *= dz;
                    _this.top *= dz;
                  }
                  var dx = (pointOld.raw.x - origin.x) * dz,
                    dy = (pointOld.raw.y - origin.y) * dz;
                  pointNew.raw.x = origin.x + dx;
                  pointNew.raw.y = origin.y + dy;
                  _this.startPoint = pointNew;
                  _this.pan(pointOld);
                  var targetPage = _this.dragPage || pointOld.page;
                  if (_this.dragPage == void 0 && targetPage !== void 0 && pointOld.isInside == true && targetPage.magnetic == true) {
                    targetPage.pendingPoint = pointOld;
                    targetPage.animateToReset = true;
                    _this.corner = targetPage.magneticCorner;
                    _this.animatePage(targetPage);
                    targetPage.pendingPoint = void 0;
                    targetPage.magnetic = false;
                    targetPage.magneticCorner = void 0;
                  }
                }
              }
            }
          };
        var containerDom = _this.container[0];
        var stageDom = _this.stage[0];
        if (containerDom) {
          containerDom.addEventListener("mousemove", mouseMove, false);
          containerDom.addEventListener("touchmove", mouseMove, false);
          containerDom.addEventListener("mousedown", mouseDown, false);
          containerDom.addEventListener("click", mouseClick, false);
          containerDom.addEventListener("mouseup", mouseUp, false);
          containerDom.addEventListener("touchend", mouseUp, false);
          containerDom.addEventListener("touchstart", mouseDown, false);
          if (_this.options.scrollWheel == true) {
            stageDom.addEventListener('mousewheel', onMouseWheel, false);
            stageDom.addEventListener('DOMMouseScroll', onMouseWheel, false);
          }
        }
        this.dispose = function () {
          containerDom.removeEventListener("mousemove", mouseMove, false);
          containerDom.removeEventListener("touchmove", mouseMove, false);
          containerDom.removeEventListener("mousedown", mouseDown, false);
          containerDom.removeEventListener("click", mouseClick, false);
          containerDom.removeEventListener("mouseup", mouseUp, false);
          containerDom.removeEventListener("touchend", mouseUp, false);
          containerDom.removeEventListener("touchstart", mouseDown, false);
          if (_this.options.scrollWheel == true) {
            stageDom.removeEventListener('mousewheel', onMouseWheel, false);
            stageDom.removeEventListener('DOMMouseScroll', onMouseWheel, false);
          }
          _this.flipCallback = null;
          _this.animateF = null;
          _this.stage.remove();
        };
      }
      BookCSS.prototype = {
        add: function (object) {
          if (object instanceof PageCSS)
            this.container.append($(object.element));
          else
            this.container.append($(object));
        },
        pan: function (point) {
          var origin = this.startPoint;
          var scale = this.contentProvider.zoomScale;
          var left = (this.left + (point.raw.x - origin.raw.x)),
            top = (this.top + (point.raw.y - origin.raw.y));
          this.left = Math.round(limitAt(left, -this.shiftWidth, this.shiftWidth));
          this.top = Math.round(limitAt(top, -this.shiftHeight, this.shiftHeight));
          this.startPoint = point;
          this.stage.css({
            transform: "translate3d(" + this.left + "px," + this.top + "px,0)"
          });
        },
        getPageByNumber: function (pageNumber) {
          var relativePageNumber = isBookletMode(this) ? (isRTLMode(this) ? pageNumber + 1 : pageNumber) : Math.floor((pageNumber - 1) / 2);
          var page;
          for (var count = 0; count < this.pages.length; count++) {
            if (relativePageNumber == parseInt(this.pages[count].name, 10))
              page = this.pages[count];
          }
          return page;
        },
        getPageSide: function (pageNumber) {
          var isRTL = this.direction == DFLIP.DIRECTION.RTL;
          var page = this.getPageByNumber(pageNumber);
          if (page == void 0) return;
          if (isBookletMode(this)) return isRTL ? page.front : page.back;
          if (pageNumber % 2 == 0)
            return isRTL ? page.back : page.front;
          else
            return isRTL ? page.front : page.back;
        },
        getContentLayer: function (pageNumber) {
          var pageSide = this.getPageSide(pageNumber);
          return pageSide == void 0 ? void 0 : pageSide.contentLayer;
        }
      };
      BookCSS.prototype.init = function (parameters) {
        var _this = this;
        _this.stage = $(html.div, {
          class: "df-book-stage"
        });
        _this.wrapper = $(html.div, {
          class: "df-book-wrapper"
        });
        _this.shadow = $(html.div, {
          class: "df-book-shadow"
        });
        _this.container.append(_this.stage);
        _this.stage.append(_this.wrapper);
        _this.wrapper.append(_this.shadow);
        _this.createStack(parameters);
      };
      BookCSS.prototype.createStack = function (parameters) {
        var colors = "red,green,blue,yellow,orange,black".split(",");
        for (var _stackCount = 0; _stackCount < this.stackCount; _stackCount++) {
          parameters.angles = [, this.stackCount - _stackCount];
          parameters.stiffness = (this.stackCount - _stackCount) / 100;
          var clone = new PageCSS(parameters);
          clone.angles[1] = 180;
          clone.index = _stackCount;
          clone.parent = this;
          clone.textureReady = false;
          clone.textureRequested = false;
          this.wrapper.append(clone.element);
          clone.isFlipping = false;
          this.pages.push(clone);
          clone.color = colors[_stackCount];
        }
        this.children = this.pages;
      };
      BookCSS.prototype.isPageHard = function (pageNumber) {
        return utils.isHardPage(this.hardConfig, pageNumber, this.pageCount, isBookletMode(this));
      };
      BookCSS.prototype.setDuration = function (_duration) {
        this.duration = _duration;
      };
      BookCSS.prototype.moveBy = function (step) {
        var nextPage = this._activePage + step;
        nextPage = limitAt(nextPage, this.startPage, this.endPage);
        this.gotoPage(nextPage);
      };
      BookCSS.prototype.next = function (step) {
        if (step == void 0)
          step = (this.direction == DFLIP.DIRECTION.RTL) ? -this.pageMode : this.pageMode;
        this.moveBy(step);
      };
      BookCSS.prototype.prev = function (step) {
        if (step == void 0)
          step = (this.direction == DFLIP.DIRECTION.RTL) ? this.pageMode : -this.pageMode;
        this.moveBy(step);
      };
      BookCSS.prototype.eventToPoint = function (event) {
        event = fixMouseEvent(event);
        var wrapper = this.wrapper,
          pages = this.pages,
          pageWidth = this.pageWidth,
          fullWidth = this.fullWidth,
          height = this.height,
          win = $(window),
          point = {
            x: event.clientX,
            y: event.clientY
          };
        var left = point.x - wrapper[0].getBoundingClientRect().left;
        var top = point.y - wrapper[0].getBoundingClientRect().top;
        point.x = point.x - this.container[0].getBoundingClientRect().left;
        point.y = point.y - this.container[0].getBoundingClientRect().top;
        var distance = (this.drag == drag.none) ? left < pageWidth ? left : fullWidth - left : this.drag == drag.left ? left : fullWidth - left;
        var page = (left < pageWidth ? pages[this.stackCount / 2 - 1] : pages[this.stackCount / 2]);
        var pageDrag = left < this.foldSense ? drag.left : (left > fullWidth - this.foldSense) ? drag.right : drag.none;
        var x = left,
          y = top,
          h = height,
          w = fullWidth,
          delta = this.foldSense,
          corners = DFLIP.CORNERS,
          corner;
        if (x >= 0 && x < delta) {
          if (y >= 0 && y <= delta)
            corner = corners.TL;
          else if (y >= h - delta && y <= h)
            corner = corners.BL;
          else if (y > delta && y < h - delta)
            corner = corners.L;
          else
            corner = corners.NONE;
        } else if (x >= w - delta && x <= w) {
          if (y >= 0 && y <= delta)
            corner = corners.TR;
          else if (y >= h - delta && y <= h)
            corner = corners.BR;
          else if (y > delta && y < h - delta)
            corner = corners.R;
          else
            corner = corners.NONE;
        } else
          corner = corners.NONE;
        return {
          isInsidePage: x >= 0 && x <= w && y >= 0 && y <= h,
          isInside: corner !== corners.NONE && corner !== corners.L && corner !== corners.R,
          x: left,
          y: top,
          fullWidth: fullWidth,
          rawDistance: fullWidth - left,
          distance: distance,
          page: page,
          drag: pageDrag,
          foldSense: this.foldSense,
          event: event,
          raw: point,
          corner: corner
        };
      };
      BookCSS.prototype.gotoPage = function (pageNumber) {
        pageNumber = parseInt(pageNumber, 10);
        this._activePage = pageNumber;
        this.updatePage(pageNumber);
      };
      BookCSS.prototype.refresh = function () {
        this.updatePage(this._activePage);
        if (this.flipCallback !== void 0) this.flipCallback();
      };
      BookCSS.prototype.updatePage = function (pageNumber) {
        var isRTL = (this.direction == DFLIP.DIRECTION.RTL),
          isBooklet = isBookletMode(this),
          newBaseNumber = getBasePage(pageNumber);
        var pageDivisor = isBooklet ? 1 : 2;
        pageNumber = Math.floor((pageNumber / pageDivisor));
        if (isRTL) pageNumber = this.pageCount / pageDivisor - pageNumber;
        var oldBaseNumber = this.oldBaseNumber || 0;
        var pageCount = this.pageCount / pageDivisor;
        var stackCount = this.stackCount;
        var midPoint = Math.floor(stackCount / 2);
        if (oldBaseNumber > pageNumber) {
          this.children[stackCount - 1].skipFlip = true;
          this.children.unshift(this.children.pop());
        } else if (oldBaseNumber < pageNumber) {
          this.children[0].skipFlip = true;
          this.children.push(this.children.shift());
        }
        for (var _pageCount = 0; _pageCount < stackCount; _pageCount++) {
          var page = this.children[_pageCount];
          if (oldBaseNumber !== pageNumber) {
            if (page.currentTween !== void 0) {
              page.clearTween(true);
            }
          }
          var oldSide = page.side;
          var newSide;
          var relativePageNumber = pageNumber - midPoint + _pageCount;
          var oldName = page.name;
          page.isHard = this.isPageHard(relativePageNumber);
          if (page.isHard) {
            page.element.addClass("df-hard-page");
          } else {
            page.element.removeClass("df-hard-page");
            page.front.css({
              display: "block"
            });
            page.back.css({
              display: "block"
            });
          }
          if (relativePageNumber == 0 || relativePageNumber == pageCount) {
            page.element.addClass("df-cover-page");
          } else {
            page.element.removeClass("df-cover-page");
          }
          var oldPageNumber = $(page.element).attr("pageNumber");
          if (oldPageNumber != relativePageNumber) {
            page.front.contentLayer.empty();
            page.back.contentLayer.empty();
          }
          $(page.element).attr("pageNumber", relativePageNumber);
          page.isEdge = false;
          if (_pageCount == 0) {} else if (_pageCount == stackCount - 1) {} else {
            page.isEdge = false;
          }
          if (_pageCount < midPoint) {
            newSide = drag.left;
          } else {
            newSide = drag.right;
          }
          if (page.isFlipping == false) {
            if (newSide !== oldSide && page.skipFlip == false) {
              this.animatePage(page);
              if (this.preFlipCallback !== void 0)
                this.preFlipCallback();
            } else {
              page.skipFlip = false;
              page.element.removeClass("df-flipping df-quick-turn df-folding df-left-side df-right-side");
              page.element.addClass((_pageCount < midPoint) ? "df-left-side" : "df-right-side");
              page.side = newSide;
            }
          }
          page.visible = isBooklet ? (isRTL ? (_pageCount < midPoint || page.isFlipping) : (_pageCount >= midPoint || page.isFlipping)) : ((relativePageNumber >= 0 && relativePageNumber < pageCount) || (isBooklet && relativePageNumber == pageCount));
          if (this.requestPage !== void 0 && page.visible == true) {
            if (isRTL) relativePageNumber = isBooklet ? this.pageCount - relativePageNumber : Math.floor(this.pageCount / 2) - relativePageNumber - 1;
            page.name = relativePageNumber.toString();
            if (page.name != oldName) {
              page.backTextureLoaded = false;
              page.frontTextureLoaded = false;
              page.backPageStamp = "-1";
              page.frontPageStamp = "-1";
              page.thumbLoaded = false;
              page.front.contentLayer.html("");
              page.back.contentLayer.html("");
              page.frontImage(defaults.textureLoadFallback);
              page.backImage(defaults.textureLoadFallback);
              this.requestPage();
            }
          }
          page.oldDepth = page.depth;
          page.updateCSS({
            display: page.visible == true ? "block" : "none",
            zIndex: 6 + (_pageCount < midPoint ? (_pageCount - midPoint) : (midPoint - _pageCount)),
            transform: ''
          });
          if (page.pendingPoint == void 0 && page.isFlipping == false) {
            page.resetCSS();
          }
        }
        if (TWEEN.getAll().length == 0) {
          clearInterval(this.animate);
        }
        $(".quick-hint").html(pageNumber);
        this.oldBaseNumber = pageNumber;
        if (this.updatePageCallback !== void 0)
          this.updatePageCallback();
      };
      BookCSS.prototype.animatePage = function (page) {
        page.element.addClass("df-flipping");
        page.isFlipping = true;
        if (this.animate !== void 0) {
          clearInterval(this.animate);
        }
        this.animate = setInterval(this.animateF, 30);
        page.tween(page.pendingPoint);
      };
      return BookCSS;
    })
    ({});
  var FlipBook = (function (_super) {
    __extends(FlipBook, _super);

    function FlipBook(container, source, parameters) {
      _super.call(this, parameters);
      var _this = this;
      _this.type = "FlipBook";
      _this.container = container;
      _this.options = parameters;
      _this.options.source = source;
      _this.contentSource = source;
      if (parameters.height !== void 0 && parameters.height.toString().indexOf('%') < 0) {
        _this.container.height(Math.min(parameters.height, $(window).height()));
      } else {
        _this.container.height(parameters.height);
      }
      if (_this.options.isLightBox) {
        window.dfLightBox.closeButton.addClass(_this.options.icons['close']);
      }
      if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL) {
        if (Array === _this.contentSource.constructor || Array.isArray(_this.contentSource) || _this.contentSource instanceof Array) {
          _this.options.singlePageMode = DFLIP.SINGLE_PAGE_MODE.ZOOM;
        }
        _this.container.addClass("df-double-internal");
      }
      if (!_this.options.isLightBox && _this.container.attr("id") !== void 0) {
        _this.options.id = _this.container.attr("id");
      }
      if (_this.options.parsed !== true && _this.options.links != void 0) {
        DFLIP.parseLinks(_this.options.links);
      }
      var webgl = _this.webgl = parameters.webgl == true && hasWebgl == true;
      container.addClass("df-container df-loading df-init df-floating");
      if (_this.options.transparent == true) {
        container.addClass("df-transparent");
      }
      _this.container.info = $(html.div, {
        class: "loading-info"
      }).appendTo(_this.container).html("Loading...");
      if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
        _this.options.webgl = false;
      }
      if (!!navigator.userAgent.match(/msie\s[5-9]/i)) {
        _this.container.info.html("Your browser (Internet Explorer) is out of date to run DFlip Flipbook Plugin. <br><a href='http://browsehappy.com/'>Upgrade to a new one</a>").addClass("df-old-browser");
        container.removeClass("df-loading");
        return _this;
      }
      var backgroundImage = parameters.backgroundImage == void 0 || parameters.backgroundImage == '' ? '' : "url('" + parameters.backgroundImage + "')";
      _this.container.css({
        position: "relative",
        overflow: "hidden",
        backgroundColor: parameters.backgroundColor,
        backgroundImage: backgroundImage
      });
      _this.init(webgl, source);
      if (_this.options.onCreate !== void 0)
        _this.options.onCreate(_this);
      return _this;
    }
    FlipBook.prototype.init = function (webgl) {
      var _this = this;
      var book = _this.target;
      var options = _this.options;
      if (webgl == true) {
        var updateMockupJs = function (callback) {
          var process3d = function () {
            MOCKUP.defaults.anisotropy = 0;
            MOCKUP.defaults.groundTexture = "blank";
            THREE.skipPowerOfTwo = true;
            RegisterMockupObjects();
            if (callback !== void 0) callback();
          };
          if (window.MOCKUP == void 0) {
            _this.updateInfo("Loading WEBGL 3D ...");
            getScript(defaults.threejsSrc + "?ver=" + DFLIP.version, function () {
              getScript(defaults.mockupjsSrc + "?ver=" + DFLIP.version, function () {
                process3d();
              });
            });
          } else {
            process3d();
          }
        };
        updateMockupJs(function () {
          _this.container.css({
            minHeight: 300,
            minWidth: 300
          });
          _this.stage = new PreviewStage(extendOptions(_this.options, {
            container: _this.container
          }));
          _this.stage.previewObject = _this;
          _this.contentProvider = new ContentProvider(_this.contentSource, function (contentProvider) {
            var options = {
              pageCount: contentProvider.pageCount,
              stackCount: 6,
              segments: 20,
              width: 300 * contentProvider.pageRatio,
              height: 300
            };
            _this.checkOpenPage();
            _this.target = book = _this.stage.target = new MOCKUP.Book(extendOptions(_this.options, options), _this.stage);
            _this.extendtarget();
            createUI(_this.container, _this);
            book.ui = _this.ui;
            book.container = _this.container;
            contentProvider.webgl = webgl;
            contentProvider.setTarget(_this.target);
            book.getContentLayer = function (pageNumber) {
              var isRTL = book.direction == DFLIP.DIRECTION.RTL,
                left = _this.stage.cssScene.divLeft.element,
                right = _this.stage.cssScene.divRight.element;
              var baseActive = getBasePage(book._activePage);
              if (isBookletMode(book)) return isRTL ? left : right;
              if (pageNumber % 2 == 0)
                return isRTL ? right : left;
              else
                return isRTL ? left : right;
            };
            book.stage = _this.stage;
            book.flipCallback = function () {
              if (_this.contentProvider) {
                _this.contentProvider.review("flipCallback");
                var baseActive = getBasePage(book._activePage);
                var width, height;
                var pageLeft = book.getPageByNumber(baseActive),
                  pageRight = book.getPageByNumber(baseActive + 1);
                var divLeft = book.parent.cssScene.divLeft,
                  divRight = book.parent.cssScene.divRight;
                var isSingle = book.pageMode == DFLIP.PAGE_MODE.SINGLE;
                var isRTL = book.direction == DFLIP.DIRECTION.RTL;
                if (pageLeft !== void 0 && divLeft !== void 0) {
                  width = Math.abs(pageLeft.geometry.boundingBox.max.x - pageLeft.geometry.boundingBox.min.x);
                  height = Math.abs(pageLeft.geometry.boundingBox.max.z - pageLeft.geometry.boundingBox.min.z);
                  divLeft.rotation.y = -Math.atan2(height, width) * 0.9;
                  divLeft.position.z = height * 0.8;
                  divLeft.position.x = height / 2.5;
                  $(divLeft.element).css({
                    width: width,
                    left: -width / 2
                  });
                }
                if (pageRight !== void 0 && divRight !== void 0) {
                  width = Math.abs(pageRight.geometry.boundingBox.max.x - pageRight.geometry.boundingBox.min.x);
                  height = Math.abs(pageRight.geometry.boundingBox.max.z - pageRight.geometry.boundingBox.min.z);
                  divRight.rotation.y = Math.atan2(height, width) * 0.9;
                  divRight.position.z = height * 0.8;
                  divRight.position.x = -height / 2.5;
                  $(divRight.element).css({
                    width: width,
                    left: width / 2
                  });
                }
                if (_this.options.onFlip !== void 0)
                  _this.options.onFlip(_this);
              }
            };
            book.resize = function () {
              _this.resize();
            }();
            book.updatePageCallback = function () {
              _this.ui.update();
              _this.checkCenter();
              _this.stage.renderRequestPending = true;
            };
            var divLeft = $(_this.stage.cssScene.divLeft.element);
            var divRight = $(_this.stage.cssScene.divRight.element);
            book.preFlipCallback = function () {
              divLeft.empty();
              divRight.empty();
              if (_this.options.beforeFlip !== void 0)
                _this.options.beforeFlip(_this);
              _this.playSound();
            };
            $(window).trigger("resize");
            divLeft.css({
              width: 300 * contentProvider.pageRatio,
              height: 300,
              left: -300 * contentProvider.pageRatio / 2
            });
            divRight.css({
              width: 300 * contentProvider.pageRatio,
              height: 300,
              left: 300 * contentProvider.pageRatio / 2
            });
            book.ease = TWEEN.Easing.Cubic.InOut;
            book.contentProvider = contentProvider;
            book.duration = _this.options.duration;
            book.gotoPage(book._activePage);
            book.flipCallback();
            if (_this.options.onReady !== void 0)
              _this.options.onReady(_this);
          }, options, _this);
        });
      } else {
        _this.contentProvider = new ContentProvider(_this.contentSource, function (contentProvider) {
          var options = {
            pageCount: contentProvider.pageCount
          };
          _this.checkOpenPage();
          _this.target = book = new BookCSS(extendOptions(_this.options, options), _this.container);
          _this.target.previewObject = _this;
          _this.extendtarget();
          createUI(_this.container, _this);
          contentProvider.webgl = webgl;
          contentProvider.setTarget(_this.target);
          contentProvider.waitPeriod = 2;
          book.ease = TWEEN.Easing.Quadratic.InOut;
          book.duration = _this.options.duration;
          book.container = _this.container;
          book.updatePageCallback = function () {
            _this.ui.update();
            _this.checkCenter();
          };
          book.gotoPage(book._activePage);
          book.resize = function () {
            _this.resize();
          }();
          $(window).trigger("resize");
          book.flipCallback = function () {
            if (_this.contentProvider) {
              _this.contentProvider.review("flipCallback");
              if (_this.options.onFlip !== void 0)
                _this.options.onFlip(_this);
            }
          };
          book.preFlipCallback = function () {
            if (_this.options.beforeFlip !== void 0)
              _this.options.beforeFlip(_this);
            _this.playSound();
          };
          if (_this.options.onReady !== void 0)
            _this.options.onReady(_this);
        }, options, _this);
      }
    };
    FlipBook.prototype.extendtarget = function () {
      var _this = this;
      _this.target.reset = function () {
        for (var pageCount = 0; pageCount < _this.target.children.length; pageCount++) {
          var page = _this.target.children[pageCount];
          page.skipFlip = true;
          page.name = '-2';
        }
        _this.contentProvider.annotedPage = '-2';
        _this.target.refresh();
      }
    };
    FlipBook.prototype.getURLHash = function () {
      if (this.options.id != void 0) {
        var hash = "dflip-" + (this.options.slug !== void 0 ? this.options.slug : this.options.id) + "/";
        if (this.target != void 0 && this.target._activePage != void 0) {
          hash += this.target._activePage + "/";
        }
        window.location.hash = hash;
      }
      return window.location.href;
    };
    FlipBook.prototype.checkOpenPage = function () {
      if (this.options.id != void 0) {
        var book = $("#" + this.options.id);
        if (book.length > 0 && book.data("page") !== void 0) {
          var pageNumber = parseInt(book.data("page"), 10);
          if (!isNaN(pageNumber))
            this.options.openPage = pageNumber;
        }
      }
    };
    FlipBook.prototype.end = function () {
      this.target.gotoPage(this.target.endPage);
    };
    FlipBook.prototype.gotoPage = function (pageNumber) {
      this.target.gotoPage(pageNumber);
      if (this.ui !== void 0) this.ui.update();
    };
    FlipBook.prototype.prev = function () {
      this.target.prev();
    };
    FlipBook.prototype.next = function () {
      this.target.next();
    };
    FlipBook.prototype.updateInfo = function (info) {
      if (this.container && this.container.info && this.container.info.html)
        this.container.info.html(info);
    }
    return FlipBook;
  })(PreviewObject);
  $.fn.extend({
    shelf: function () {},
    flipBook: function (source, options) {
      return new FlipBook($(this), source, extendDFlipOptions(options));
    }
  });
})
(DFLIP, jQuery);
(function (view) {
  "use strict";
  view.URL = view.URL || view.webkitURL;
  if (view.Blob && view.URL) {
    try {
      new Blob;
      return;
    } catch (e) {}
  }
  var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || (function (view) {
    var
      get_class = function (object) {
        return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
      },
      FakeBlobBuilder = function BlobBuilder() {
        this.data = [];
      },
      FakeBlob = function Blob(data, type, encoding) {
        this.data = data;
        this.size = data.length;
        this.type = type;
        this.encoding = encoding;
      },
      FBB_proto = FakeBlobBuilder.prototype,
      FB_proto = FakeBlob.prototype,
      FileReaderSync = view.FileReaderSync,
      FileException = function (type) {
        this.code = this[this.name = type];
      },
      file_ex_codes = ("NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "
        + "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR").split(" "),
      file_ex_code = file_ex_codes.length,
      real_URL = view.URL || view.webkitURL || view,
      real_create_object_URL = real_URL.createObjectURL,
      real_revoke_object_URL = real_URL.revokeObjectURL,
      URL = real_URL,
      btoa = view.btoa,
      atob = view.atob,
      ArrayBuffer = view.ArrayBuffer,
      Uint8Array = view.Uint8Array,
      origin = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
    FakeBlob.fake = FB_proto.fake = true;
    while (file_ex_code--) {
      FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
    }
    if (!real_URL.createObjectURL) {
      URL = view.URL = function (uri) {
        var
          uri_info = document.createElementNS("http://www.w3.org/1999/xhtml", "a"),
          uri_origin;
        uri_info.href = uri;
        if (!("origin" in uri_info)) {
          if (uri_info.protocol.toLowerCase() === "data:") {
            uri_info.origin = null;
          } else {
            uri_origin = uri.match(origin);
            uri_info.origin = uri_origin && uri_origin[1];
          }
        }
        return uri_info;
      };
    }
    URL.createObjectURL = function (blob) {
      var
        type = blob.type,
        data_URI_header;
      if (type === null) {
        type = "application/octet-stream";
      }
      if (blob instanceof FakeBlob) {
        data_URI_header = "data:" + type;
        if (blob.encoding === "base64") {
          return data_URI_header + ";base64," + blob.data;
        } else if (blob.encoding === "URI") {
          return data_URI_header + "," + decodeURIComponent(blob.data);
        }
        if (btoa) {
          return data_URI_header + ";base64," + btoa(blob.data);
        } else {
          return data_URI_header + "," + encodeURIComponent(blob.data);
        }
      } else if (real_create_object_URL) {
        return real_create_object_URL.call(real_URL, blob);
      }
    };
    URL.revokeObjectURL = function (object_URL) {
      if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
        real_revoke_object_URL.call(real_URL, object_URL);
      }
    };
    FBB_proto.append = function (data) {
      var bb = this.data;
      if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
        var
          str = "",
          buf = new Uint8Array(data),
          i = 0,
          buf_len = buf.length;
        for (; i < buf_len; i++) {
          str += String.fromCharCode(buf[i]);
        }
        bb.push(str);
      } else if (get_class(data) === "Blob" || get_class(data) === "File") {
        if (FileReaderSync) {
          var fr = new FileReaderSync;
          bb.push(fr.readAsBinaryString(data));
        } else {
          throw new FileException("NOT_READABLE_ERR");
        }
      } else if (data instanceof FakeBlob) {
        if (data.encoding === "base64" && atob) {
          bb.push(atob(data.data));
        } else if (data.encoding === "URI") {
          bb.push(decodeURIComponent(data.data));
        } else if (data.encoding === "raw") {
          bb.push(data.data);
        }
      } else {
        if (typeof data !== "string") {
          data += "";
        }
        bb.push(unescape(encodeURIComponent(data)));
      }
    };
    FBB_proto.getBlob = function (type) {
      if (!arguments.length) {
        type = null;
      }
      return new FakeBlob(this.data.join(""), type, "raw");
    };
    FBB_proto.toString = function () {
      return "[object BlobBuilder]";
    };
    FB_proto.slice = function (start, end, type) {
      var args = arguments.length;
      if (args < 3) {
        type = null;
      }
      return new FakeBlob(this.data.slice(start, args > 1 ? end : this.data.length), type, this.encoding);
    };
    FB_proto.toString = function () {
      return "[object Blob]";
    };
    FB_proto.close = function () {
      this.size = 0;
      delete this.data;
    };
    return FakeBlobBuilder;
  }(view));
  view.Blob = function (blobParts, options) {
    var type = options ? (options.type || "") : "";
    var builder = new BlobBuilder();
    if (blobParts) {
      for (var i = 0, len = blobParts.length; i < len; i++) {
        if (Uint8Array && blobParts[i] instanceof Uint8Array) {
          builder.append(blobParts[i].buffer);
        } else {
          builder.append(blobParts[i]);
        }
      }
    }
    var blob = builder.getBlob(type);
    if (!blob.slice && blob.webkitSlice) {
      blob.slice = blob.webkitSlice;
    }
    return blob;
  };
  var getPrototypeOf = Object.getPrototypeOf || function (object) {
    return object.__proto__;
  };
  view.Blob.prototype = getPrototypeOf(new view.Blob());
}(window));
(function (view) {
  "use strict";
  var
    Uint8Array = view.Uint8Array,
    HTMLCanvasElement = view.HTMLCanvasElement,
    canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype,
    is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i,
    to_data_url = "toDataURL",
    base64_ranks, decode_base64 = function (base64) {
      var
        len = base64.length,
        buffer = new Uint8Array(len / 4 * 3 | 0),
        i = 0,
        outptr = 0,
        last = [0, 0],
        state = 0,
        save = 0,
        rank, code;
      while (len--) {
        code = base64.charCodeAt(i++);
        rank = base64_ranks[code - 43];
        if (rank !== 255 && rank !== void 0) {
          last[1] = last[0];
          last[0] = code;
          save = (save << 6) | rank;
          state++;
          if (state === 4) {
            buffer[outptr++] = save >>> 16;
            if (last[1] !== 61) {
              buffer[outptr++] = save >>> 8;
            }
            if (last[0] !== 61) {
              buffer[outptr++] = save;
            }
            state = 0;
          }
        }
      }
      return buffer;
    };
  if (Uint8Array) {
    base64_ranks = new Uint8Array([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);
  }
  if (HTMLCanvasElement && !canvas_proto.toBlob) {
    canvas_proto.toBlob = function (callback, type) {
      if (!type) {
        type = "image/png";
      }
      if (this.mozGetAsFile) {
        callback(this.mozGetAsFile("canvas", type));
        return;
      }
      if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
        callback(this.msToBlob());
        return;
      }
      var
        args = Array.prototype.slice.call(arguments, 1),
        dataURI = this[to_data_url].apply(this, args),
        header_end = dataURI.indexOf(","),
        data = dataURI.substring(header_end + 1),
        is_base64 = is_base64_regex.test(dataURI.substring(0, header_end)),
        blob;
      if (Blob.fake) {
        blob = new Blob;
        if (is_base64) {
          blob.encoding = "base64";
        } else {
          blob.encoding = "URI";
        }
        blob.data = data;
        blob.size = data.length;
      } else if (Uint8Array) {
        if (is_base64) {
          blob = new Blob([decode_base64(data)], {
            type: type
          });
        } else {
          blob = new Blob([decodeURIComponent(data)], {
            type: type
          });
        }
      }
      callback(blob);
    };
    if (canvas_proto.toDataURLHD) {
      canvas_proto.toBlobHD = function () {
        to_data_url = "toDataURLHD";
        var blob = this.toBlob();
        to_data_url = "toDataURL";
        return blob;
      }
    } else {
      canvas_proto.toBlobHD = canvas_proto.toBlob;
    }
  }
}(window));
(function PerformanceNowPolyfill() {
  if ('performance' in window === false) {
    window.performance = {};
  }
  Date.now = (Date.now || function () {
    return new Date().getTime();
  });
  if ('now' in window.performance === false) {
    var offset = window.performance.timing && window.performance.timing.navigationStart ? window.performance.timing.navigationStart : Date.now();
    window.performance.now = function () {
      return Date.now() - offset;
    };
  }
})();
(function TweenJs() {
  var TWEEN = TWEEN || (function () {
    var _tweens = [];
    return {
      getAll: function () {
        return _tweens;
      },
      removeAll: function () {
        _tweens = [];
      },
      add: function (tween) {
        _tweens.push(tween);
      },
      remove: function (tween) {
        var i = _tweens.indexOf(tween);
        if (i !== -1) {
          _tweens.splice(i, 1);
        }
      },
      update: function (time) {
        if (_tweens.length === 0) {
          return false;
        }
        var i = 0;
        time = time !== void 0 ? time : window.performance.now();
        while (i < _tweens.length) {
          if (_tweens[i].update(time)) {
            i++;
          } else {
            _tweens.splice(i, 1);
          }
        }
        return true;
      }
    };
  })();
  TWEEN.Tween = function (object) {
    var _object = object;
    var _valuesStart = {};
    var _valuesEnd = {};
    var _valuesStartRepeat = {};
    var _duration = 1000;
    var _repeat = 0;
    var _yoyo = false;
    var _isPlaying = false;
    var _reversed = false;
    var _delayTime = 0;
    var _startTime = null;
    var _easingFunction = TWEEN.Easing.Linear.None;
    var _interpolationFunction = TWEEN.Interpolation.Linear;
    var _chainedTweens = [];
    var _onStartCallback = null;
    var _onStartCallbackFired = false;
    var _onUpdateCallback = null;
    var _onCompleteCallback = null;
    var _onStopCallback = null;
    for (var field in object) {
      _valuesStart[field] = parseFloat(object[field], 10);
    }
    this.to = function (properties, duration) {
      if (duration !== void 0) {
        _duration = duration;
      }
      _valuesEnd = properties;
      return this;
    };
    this.start = function (time) {
      TWEEN.add(this);
      _isPlaying = true;
      _onStartCallbackFired = false;
      _startTime = time !== void 0 ? time : window.performance.now();
      _startTime += _delayTime;
      for (var property in _valuesEnd) {
        if (_valuesEnd[property] instanceof Array) {
          if (_valuesEnd[property].length === 0) {
            continue;
          }
          _valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);
        }
        if (_valuesStart[property] === void 0) {
          continue;
        }
        _valuesStart[property] = _object[property];
        if ((_valuesStart[property] instanceof Array) === false) {
          _valuesStart[property] *= 1.0;
        }
        _valuesStartRepeat[property] = _valuesStart[property] || 0;
      }
      return this;
    };
    this.stop = function () {
      if (!_isPlaying) {
        return this;
      }
      TWEEN.remove(this);
      _isPlaying = false;
      if (_onStopCallback !== null) {
        _onStopCallback.call(_object);
      }
      this.stopChainedTweens();
      return this;
    };
    this.stopChainedTweens = function () {
      for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
        _chainedTweens[i].stop();
      }
    };
    this.complete = function () {
      if (!_isPlaying) {
        return this;
      }
      TWEEN.remove(this);
      _isPlaying = false;
      if (_onCompleteCallback !== null) {
        _onCompleteCallback.call(_object);
      }
      this.completeChainedTweens();
      return this;
    };
    this.completeChainedTweens = function () {
      for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
        _chainedTweens[i].complete();
      }
    };
    this.delay = function (amount) {
      _delayTime = amount;
      return this;
    };
    this.repeat = function (times) {
      _repeat = times;
      return this;
    };
    this.yoyo = function (yoyo) {
      _yoyo = yoyo;
      return this;
    };
    this.easing = function (easing) {
      _easingFunction = easing == void 0 ? _easingFunction : easing;
      return this;
    };
    this.interpolation = function (interpolation) {
      _interpolationFunction = interpolation;
      return this;
    };
    this.chain = function () {
      _chainedTweens = arguments;
      return this;
    };
    this.onStart = function (callback) {
      _onStartCallback = callback;
      return this;
    };
    this.onUpdate = function (callback) {
      _onUpdateCallback = callback;
      return this;
    };
    this.onComplete = function (callback) {
      _onCompleteCallback = callback;
      return this;
    };
    this.onStop = function (callback) {
      _onStopCallback = callback;
      return this;
    };
    this.update = function (time) {
      var property;
      var elapsed;
      var value;
      if (time < _startTime) {
        return true;
      }
      if (_onStartCallbackFired === false) {
        if (_onStartCallback !== null) {
          _onStartCallback.call(_object);
        }
        _onStartCallbackFired = true;
      }
      elapsed = (time - _startTime) / _duration;
      elapsed = elapsed > 1 ? 1 : elapsed;
      value = _easingFunction(elapsed);
      for (property in _valuesEnd) {
        if (_valuesStart[property] === void 0) {
          continue;
        }
        var start = _valuesStart[property] || 0;
        var end = _valuesEnd[property];
        if (end instanceof Array) {
          _object[property] = _interpolationFunction(end, value);
        } else {
          if (typeof (end) === 'string') {
            if (end.startsWith('+') || end.startsWith('-')) {
              end = start + parseFloat(end, 10);
            } else {
              end = parseFloat(end, 10);
            }
          }
          if (typeof (end) === 'number') {
            _object[property] = start + (end - start) * value;
          }
        }
      }
      if (_onUpdateCallback !== null) {
        _onUpdateCallback.call(_object, value);
      }
      if (elapsed === 1) {
        if (_repeat > 0) {
          if (isFinite(_repeat)) {
            _repeat--;
          }
          for (property in _valuesStartRepeat) {
            if (typeof (_valuesEnd[property]) === 'string') {
              _valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property], 10);
            }
            if (_yoyo) {
              var tmp = _valuesStartRepeat[property];
              _valuesStartRepeat[property] = _valuesEnd[property];
              _valuesEnd[property] = tmp;
            }
            _valuesStart[property] = _valuesStartRepeat[property];
          }
          if (_yoyo) {
            _reversed = !_reversed;
          }
          _startTime = time + _delayTime;
          return true;
        } else {
          if (_onCompleteCallback !== null) {
            _onCompleteCallback.call(_object);
          }
          for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
            _chainedTweens[i].start(_startTime + _duration);
          }
          return false;
        }
      }
      return true;
    };
  };
  TWEEN.Easing = {
    Linear: {
      None: function (k) {
        return k;
      }
    },
    Quadratic: {
      In: function (k) {
        return k * k;
      },
      Out: function (k) {
        return k * (2 - k);
      },
      InOut: function (k) {
        if ((k *= 2) < 1) {
          return 0.5 * k * k;
        }
        return -0.5 * (--k * (k - 2) - 1);
      }
    },
    Quartic: {
      In: function (k) {
        return k * k * k * k;
      },
      Out: function (k) {
        return 1 - (--k * k * k * k);
      },
      InOut: function (k) {
        if ((k *= 2) < 1) {
          return 0.5 * k * k * k * k;
        }
        return -0.5 * ((k -= 2) * k * k * k - 2);
      }
    },
    Sinusoidal: {
      In: function (k) {
        return 1 - Math.cos(k * Math.PI / 2);
      },
      Out: function (k) {
        return Math.sin(k * Math.PI / 2);
      },
      InOut: function (k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
      }
    },
    Cubic: {
      In: function (k) {
        return k * k * k;
      },
      Out: function (k) {
        return --k * k * k + 1;
      },
      InOut: function (k) {
        if ((k *= 2) < 1) {
          return 0.5 * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k + 2);
      }
    }
  };
  TWEEN.Interpolation = {
    Linear: function (v, k) {
      var m = v.length - 1;
      var f = m * k;
      var i = Math.floor(f);
      var fn = TWEEN.Interpolation.Utils.Linear;
      if (k < 0) {
        return fn(v[0], v[1], f);
      }
      if (k > 1) {
        return fn(v[m], v[m - 1], m - f);
      }
      return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },
    Bezier: function (v, k) {
      var b = 0;
      var n = v.length - 1;
      var pw = Math.pow;
      var bn = TWEEN.Interpolation.Utils.Bernstein;
      for (var i = 0; i <= n; i++) {
        b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
      }
      return b;
    },
    Utils: {
      Linear: function (p0, p1, t) {
        return (p1 - p0) * t + p0;
      },
      Bernstein: function (n, i) {
        var fc = TWEEN.Interpolation.Utils.Factorial;
        return fc(n) / fc(i) / fc(n - i);
      },
      Factorial: (function () {
        var a = [1];
        return function (n) {
          var s = 1;
          if (a[n]) {
            return a[n];
          }
          for (var i = n; i > 1; i--) {
            s *= i;
          }
          a[n] = s;
          return s;
        };
      })(),
      CatmullRom: function (p0, p1, p2, p3, t) {
        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
        var t2 = t * t;
        var t3 = t * t2;
        return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
      }
    }
  };
  window.TWEEN = TWEEN;
})();
DFLIP.createBlob = function createBlob(data, contentType) {
  if (typeof Blob !== 'undefined') {
    return new Blob([data], {
      type: contentType
    });
  }
  var bb = new MozBlobBuilder();
  bb.append(data);
  return bb.getBlob(contentType);
};
DFLIP.createObjectURL = (function createObjectURLClosure() {
  var digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  return function createObjectURL(data, contentType) {
    if (typeof URL !== 'undefined' && URL.createObjectURL) {
      var blob = DFLIP.createBlob(data, contentType);
      return URL.createObjectURL(blob);
    }
    var buffer = 'data:' + contentType + ';base64,';
    for (var i = 0, ii = data.length; i < ii; i += 3) {
      var b1 = data[i] & 0xFF;
      var b2 = data[i + 1] & 0xFF;
      var b3 = data[i + 2] & 0xFF;
      var d1 = b1 >> 2,
        d2 = ((b1 & 3) << 4) | (b2 >> 4);
      var d3 = i + 1 < ii ? ((b2 & 0xF) << 2) | (b3 >> 6) : 64;
      var d4 = i + 2 < ii ? (b3 & 0x3F) : 64;
      buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];
    }
    return buffer;
  };
})();
var ThumbList = (function ThumbListClosure() {
  function ThumbList(config) {
    var width = (config && config.w + 'px') || '100%';
    var height = (config && config.h + 'px') || '100%';
    var itemHeight = this.itemHeight = config.itemHeight;
    this.items = config.items;
    this.generatorFn = config.generatorFn;
    this.totalRows = config.totalRows || (config.items && config.items.length);
    this.addFn = config.addFn;
    this.scrollFn = config.scrollFn;
    var scroller = ThumbList.createScroller(itemHeight * this.totalRows);
    this.container = ThumbList.createContainer(width, height);
    this.container.appendChild(scroller);
    this.screenItemsLen = Math.ceil(config.h / itemHeight);
    this.offsetItems = this.screenItemsLen;
    this.cachedItemsLen = this.screenItemsLen + this.offsetItems * 2;
    this._renderChunk(this.container, 0);
    var self = this;
    self.lastRepaintY = 0;
    var maxBuffer = this.screenItemsLen * itemHeight;
    var lastScrolled = 0;
    var requestInterval;

    function onScroll(e) {
      var scrollTop = e.target.scrollTop;
      if (!self.lastRepaintY || Math.abs(scrollTop - self.lastRepaintY) >= (self.offsetItems * self.itemHeight)) {
        var first = parseInt(scrollTop / itemHeight, 10) - self.offsetItems;
        self._renderChunk(self.container, first < 0 ? 0 : first);
        self.lastRepaintY = scrollTop;
      }
      self.lastScrolled = lastScrolled = Date.now();
      if (self.scrollFn !== void 0) {
        self.scrollFn();
      }
      e.preventDefault && e.preventDefault();
    }
    self.dispose = function () {
      if (self.container) {
        if (self.container.parentNode) {
          self.container.parentNode.removeChild(self.container);
        }
      }
      self.container.removeEventListener('scroll', onScroll);
    };
    self.container.addEventListener('scroll', onScroll);
  }
  ThumbList.prototype.reset = function (height) {
    this.screenItemsLen = Math.ceil(height / this.itemHeight);
    this.cachedItemsLen = this.screenItemsLen + this.offsetItems * 2;
    var first = parseInt(this.lastRepaintY / this.itemHeight, 10) - this.offsetItems;
    this.needReset = true;
    this._renderChunk(this.container, Math.max(first, 0));
  };
  ThumbList.prototype.createRow = function (i) {
    var item;
    if (this.generatorFn) {
      item = this.generatorFn(i);
      item.classList.add('df-vrow');
      item.style.position = 'absolute';
      item.style.top = (i * this.itemHeight) + 'px';
      item.setAttribute("index", i);
    }
    return item;
  };
  ThumbList.prototype._renderChunk = function (node, from) {
    var isEmpty = this.range == void 0;
    this.range = this.range || {
      min: 0,
      max: this.cachedItemsLen
    };
    var range = this.range;
    var min = range.min,
      max = range.max;
    var isAdd = isEmpty ? true : from >= min;
    if (!isEmpty && from == min && this.needReset == false) return;
    var countVar;
    var start = isEmpty ? min : isAdd ? max : from;
    start = start > this.totalRows ? this.totalRows : start < 0 ? 0 : start;
    var end = from + this.cachedItemsLen;
    end = end > this.totalRows ? this.totalRows : end;
    for (countVar = start; countVar < end; countVar++) {
      if (isAdd)
        node.appendChild(this.createRow(countVar));
      else
        node.insertBefore(this.createRow(countVar), node.childNodes[1 + countVar - start]);
      if (this.addFn !== void 0) {
        this.addFn(countVar);
      }
    }
    var difference = Math.abs(from - min);
    this.needReset = false;
    if (!isEmpty && node.childNodes.length > (this.cachedItemsLen + 1)) {
      var delStart = isAdd ? 1 : 1 + this.cachedItemsLen,
        delEnd = delStart + (end - start);
      for (var j = delEnd; j > delStart; j--) {
        if (node.childNodes[delStart])
          this.container.removeChild(node.childNodes[delStart]);
      }
    }
    this.range.min = from;
    this.range.max = end;
  };
  ThumbList.createContainer = function (w, h) {
    var c = document.createElement('div');
    c.style.width = w;
    c.style.height = h;
    c.style.overflow = 'auto';
    c.style.position = 'relative';
    c.style.padding = 0;
    return c;
  };
  ThumbList.createScroller = function (h) {
    var scroller = document.createElement('div');
    scroller.style.opacity = 0;
    scroller.style.position = 'absolute';
    scroller.style.top = 0;
    scroller.style.left = 0;
    scroller.style.width = '1px';
    scroller.style.height = h + 'px';
    return scroller;
  };
  return ThumbList;
})();
var BookMarkViewer = (function BookMarkViewerClosure() {
  function BookMarkViewer(options) {
    this.outline = null;
    this.lastToggleIsShow = true;
    this.container = options.container;
    this.linkService = options.linkService;
    this.outlineItemClass = options.outlineItemClass || "outlineItem";
    this.outlineToggleClass = options.outlineToggleClass || "outlineItemToggler";
    this.outlineToggleHiddenClass = options.outlineToggleHiddenClass || "outlineItemsHidden";
  }
  BookMarkViewer.prototype = {
    dispose: function () {
      if (this.container) {
        if (this.container.parentNode) {
          this.container.parentNode.removeChild(this.container);
        }
      }
      this.linkService = null;
    },
    reset: function BookMarkViewer_reset() {
      this.outline = null;
      this.lastToggleIsShow = true;
      var container = this.container;
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    },
    _dispatchEvent: function BookMarkViewer_dispatchEvent(outlineCount) {
      var event = document.createEvent('CustomEvent');
      event.initCustomEvent('outlineloaded', true, true, {
        outlineCount: outlineCount
      });
      this.container.dispatchEvent(event);
    },
    _bindLink: function BookMarkViewer_bindLink(element, item) {
      var linkService = this.linkService;
      if (item.custom == true) {
        element.href = linkService.getCustomDestinationHash(item.dest);
        element.onclick = function goToDestination(e) {
          linkService.customNavigateTo(item.dest);
          return false;
        };
      } else {
        if (item.url) {
          PDFJS.addLinkAttributes(element, {
            url: item.url
          });
          return;
        }
        element.href = linkService.getDestinationHash(item.dest);
        element.onclick = function goToDestination(e) {
          linkService.navigateTo(item.dest);
          return false;
        };
      }
    },
    _addToggleButton: function BookMarkViewer_addToggleButton(div) {
      var toggler = document.createElement('div');
      toggler.className = this.outlineToggleClass + " " + this.outlineToggleHiddenClass;
      toggler.onclick = function (event) {
        event.stopPropagation();
        toggler.classList.toggle(this.outlineToggleHiddenClass);
        if (event.shiftKey) {
          var shouldShowAll = !toggler.classList.contains(this.outlineToggleHiddenClass);
          this._toggleOutlineItem(div, shouldShowAll);
        }
      }.bind(this);
      div.insertBefore(toggler, div.firstChild);
    },
    _toggleOutlineItem: function BookMarkViewer_toggleOutlineItem(root, show) {
      this.lastToggleIsShow = show;
      var togglers = root.querySelectorAll('.' + this.outlineToggleClass);
      for (var i = 0, ii = togglers.length; i < ii; ++i) {
        togglers[i].classList[show ? 'remove' : 'add'](this.outlineToggleHiddenClass);
      }
    },
    toggleOutlineTree: function BookMarkViewer_toggleOutlineTree() {
      if (!this.outline) {
        return;
      }
      this._toggleOutlineItem(this.container, !this.lastToggleIsShow);
    },
    render: function BookMarkViewer_render(params) {
      var outline = (params && params.outline) || null;
      var outlineCount = 0;
      if (this.outline) {
        this.reset();
      }
      this.outline = outline;
      if (!outline) {
        return;
      }
      var fragment = document.createDocumentFragment();
      var queue = [{
        parent: fragment,
        items: this.outline
      }];
      var hasAnyNesting = false;
      while (queue.length > 0) {
        var levelData = queue.shift();
        var isCustom = levelData.custom;
        for (var i = 0, len = levelData.items.length; i < len; i++) {
          var item = levelData.items[i];
          var div = document.createElement('div');
          div.className = this.outlineItemClass;
          var element = document.createElement('a');
          if (item.custom == void 0 && isCustom !== void 0)
            item.custom = isCustom;
          this._bindLink(element, item);
          element.textContent = item.title.replace(/\x00/g, '');
          div.appendChild(element);
          if (item.items && item.items.length > 0) {
            hasAnyNesting = true;
            this._addToggleButton(div);
            var itemsDiv = document.createElement('div');
            itemsDiv.className = this.outlineItemClass + "s";
            div.appendChild(itemsDiv);
            queue.push({
              parent: itemsDiv,
              custom: item.custom,
              items: item.items
            });
          }
          levelData.parent.appendChild(div);
          outlineCount++;
        }
      }
      if (hasAnyNesting) {
        if (this.container.classList != void 0) {
          this.container.classList.add(this.outlineItemClass + "s");
        } else if (this.container.className != void 0) {
          this.container.className += " picWindow";
        }
      }
      this.container.appendChild(fragment);
      this._dispatchEvent(outlineCount);
    }
  };
  return BookMarkViewer;
})();
var DFLightBox = (function DFLightBoxClosure($) {
  function DFLightBox(closeCallback, options) {
    this.duration = 300;
    var _this = this;
    _this.lightboxWrapper = $("<div>").addClass("df-lightbox-wrapper");
    _this.container = $("<div>").addClass("df-container").appendTo(_this.lightboxWrapper);
    _this.controls = $("<div>").addClass("df-lightbox-controls").appendTo(_this.lightboxWrapper);
    _this.closeButton = $("<div>").addClass("df-lightbox-close df-ui-btn").on("click", function () {
      _this.close(closeCallback);
    }).appendTo(_this.controls);
    _this.lightboxWrapper.append(_this.container);
    return _this;
  }
  DFLightBox.prototype.show = function (callback) {
    if (this.lightboxWrapper.parent().length == 0)
      $("body").append(this.lightboxWrapper);
    this.lightboxWrapper.fadeIn(this.duration, callback);
    return this;
  };
  DFLightBox.prototype.close = function (callback) {
    this.lightboxWrapper.fadeOut(this.duration);
    setTimeout(callback, this.duration);
    return this;
  };
  return DFLightBox;
})(jQuery);
DFLIP.Share = (function ShareClosure($) {
  function Share(container, options) {
    var _this = this;
    var htmlDiv = '<div>';
    var shareButtonClass = "df-share-button";
    var windowParameters = "width=500,height=400";
    _this.isOpen = false;
    _this.shareUrl = "";
    _this.wrapper = $('<div class="df-share-wrapper" style="display: none;">').on("click", function (e) {
      _this.close();
    });
    _this.box = $('<div class="df-share-box">').on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
    }).appendTo(_this.wrapper).html('<span class="df-share-title">' + options.text.share + '</span>');
    _this.urlInput = $('<textarea class="df-share-url">').on("click", function () {
      $(this).select();
    });
    _this.facebook = $(htmlDiv, {
      class: shareButtonClass + " df-share-facebook " + options.icons['facebook']
    }).on("click", function (e) {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(_this.shareUrl), "Sharer", windowParameters);
    });
    _this.google = $(htmlDiv, {
      class: shareButtonClass + " df-share-google " + options.icons['google']
    }).on("click", function (e) {
      window.open('https://plus.google.com/share?url=' + encodeURIComponent(_this.shareUrl), "Sharer", windowParameters);
    });
    _this.twitter = $(htmlDiv, {
      class: shareButtonClass + " df-share-twitter " + options.icons['twitter']
    }).on("click", function (e) {
      window.open('http://twitter.com/share?url=' + encodeURIComponent(_this.shareUrl), "Sharer", windowParameters);
    });
    _this.mail = $('<a>', {
      class: shareButtonClass + " df-share-mail " + options.icons['mail'],
      href: 'mailto:?subject=I wanted you to see this FlipBook&body=Check out this site ' + encodeURIComponent(_this.shareUrl),
      target: '_blank'
    }).on("click", function (e) {
      $(this).attr('href', 'mailto:?subject=I wanted you to see this FlipBook&body=Check out this site ' + encodeURIComponent(_this.shareUrl));
      e.stopPropagation();
    });
    _this.box.append(_this.urlInput).append(_this.facebook).append(_this.google).append(_this.twitter).append(_this.mail);
    $(container).append(_this.wrapper);
  }
  Share.prototype.show = function () {
    this.wrapper.fadeIn(300);
    this.urlInput.val(this.shareUrl);
    this.urlInput.trigger("click");
    this.isOpen = true;
  }
  Share.prototype.dispose = function () {
    var _this = this;
    _this.box.off();
    _this.google.off();
    _this.twitter.off();
    _this.facebook.off();
    _this.mail.off();
    _this.urlInput.off();
    _this.wrapper.off().remove();
  }
  Share.prototype.close = function () {
    this.wrapper.fadeOut(300);
    this.isOpen = false;
  }
  Share.prototype.update = function (url) {
    this.shareUrl = url;
  }
  return Share;
})(jQuery);
DFLIP.Popup = (function PopupClosure($) {
  function Popup(container, options) {
    var _this = this;
    var htmlDiv = '<div>';
    var windowParameters = "width=500,height=400";
    _this.isOpen = false;
    _this.wrapper = $('<div class="df-popup-wrapper" style="display: none;">').on("click", function (e) {
      _this.close();
    });
    _this.box = $('<div class="df-popup-box">').on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
    }).appendTo(_this.wrapper);
    $(container).append(_this.wrapper);
  }
  Popup.prototype.show = function () {
    this.wrapper.fadeIn(300);
    this.isOpen = true;
  }
  Popup.prototype.dispose = function () {
    var _this = this;
    _this.box.off();
    _this.wrapper.off().remove();
  }
  Popup.prototype.close = function () {
    this.wrapper.fadeOut(300);
    this.isOpen = false;
  }
  return Popup;
})(jQuery);
var PDFLinkService = (function () {
  function PDFLinkService() {
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;
    this._pagesRefCache = null;
  }
  PDFLinkService.prototype = {
    dispose: function () {
      this.baseUrl = null;
      this.pdfDocument = null;
      this.pdfViewer = null;
      this.pdfHistory = null;
      this._pagesRefCache = null;
    },
    setDocument: function PDFLinkService_setDocument(pdfDocument, baseUrl) {
      this.baseUrl = baseUrl;
      this.pdfDocument = pdfDocument;
      this._pagesRefCache = Object.create(null);
    },
    setViewer: function PDFLinkService_setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
    },
    setHistory: function PDFLinkService_setHistory(pdfHistory) {
      this.pdfHistory = pdfHistory;
    },
    get pagesCount() {
      return this.pdfDocument.numPages;
    },
    get page() {
      return this.pdfViewer.currentPageNumber;
    },
    set page(value) {
      this.pdfViewer.currentPageNumber = value;
    },
    navigateTo: function PDFLinkService_navigateTo(dest) {
      var destString = '';
      var self = this;
      var goToDestination = function (destRef) {
        var pageNumber = destRef instanceof Object ? self._pagesRefCache[destRef.num + ' ' + destRef.gen + ' R'] : (destRef + 1);
        if (pageNumber) {
          if (pageNumber > self.pagesCount) {
            pageNumber = self.pagesCount;
          }
          self.pdfViewer.gotoPage(pageNumber);
          if (self.pdfHistory) {
            self.pdfHistory.push({
              dest: dest,
              hash: destString,
              page: pageNumber
            });
          }
        } else {
          self.pdfDocument.getPageIndex(destRef).then(function (pageIndex) {
            var pageNum = pageIndex + 1;
            var cacheKey = destRef.num + ' ' + destRef.gen + ' R';
            self._pagesRefCache[cacheKey] = pageNum;
            goToDestination(destRef);
          });
        }
      };
      var destinationPromise;
      if (typeof dest === 'string') {
        destString = dest;
        destinationPromise = this.pdfDocument.getDestination(dest);
      } else {
        destinationPromise = Promise.resolve(dest);
      }
      destinationPromise.then(function (destination) {
        dest = destination;
        if (!(destination instanceof Array)) {
          return;
        }
        goToDestination(destination[0]);
      });
    },
    customNavigateTo: function PDFLinkService_navigateTo(dest) {
      if (dest == '' || dest == void 0 || dest == 'void 0') return;
      var pageNumber = void 0;
      if (!isNaN(Math.round(dest))) {
        pageNumber = dest;
      } else if (typeof dest === 'string') {
        pageNumber = parseInt(dest.replace("#", ""), 10);
        if (isNaN(pageNumber)) {
          window.open(dest);
          return;
        }
      }
      if (pageNumber !== void 0)
        this.pdfViewer.gotoPage(pageNumber);
    },
    getDestinationHash: function PDFLinkService_getDestinationHash(dest) {
      if (typeof dest === 'string') {
        return this.getAnchorUrl('#' + escape(dest));
      }
      if (dest instanceof Array) {
        var destRef = dest[0];
        var pageNumber = destRef instanceof Object ? this._pagesRefCache[destRef.num + ' ' + destRef.gen + ' R'] : (destRef + 1);
        if (pageNumber) {
          var pdfOpenParams = this.getAnchorUrl('#page=' + pageNumber);
          var destKind = dest[1];
          if (typeof destKind === 'object' && 'name' in destKind && destKind.name === 'XYZ') {
            var scale = (dest[4] || this.pdfViewer.currentScaleValue);
            var scaleNumber = parseFloat(scale);
            if (scaleNumber) {
              scale = scaleNumber * 100;
            }
            pdfOpenParams += '&zoom=' + scale;
            if (dest[2] || dest[3]) {
              pdfOpenParams += ',' + (dest[2] || 0) + ',' + (dest[3] || 0);
            }
          }
          return pdfOpenParams;
        }
      }
      return this.getAnchorUrl('');
    },
    getCustomDestinationHash: function PDFLinkService_getCustomDestinationHash(dest) {
      return '#' + escape(dest);
    },
    getAnchorUrl: function PDFLinkService_getAnchorUrl(anchor) {
      return (this.baseUrl || '') + anchor;
    },
    setHash: function PDFLinkService_setHash(hash) {
      if (hash.indexOf('=') >= 0) {
        var params = parseQueryString(hash);
        if ('nameddest' in params) {
          if (this.pdfHistory) {
            this.pdfHistory.updateNextHashParam(params.nameddest);
          }
          this.navigateTo(params.nameddest);
          return;
        }
        var pageNumber, dest;
        if ('page' in params) {
          pageNumber = (params.page | 0) || 1;
        }
        if ('zoom' in params) {
          var zoomArgs = params.zoom.split(',');
          var zoomArg = zoomArgs[0];
          var zoomArgNumber = parseFloat(zoomArg);
          if (zoomArg.indexOf('Fit') === -1) {
            dest = [null, {
              name: 'XYZ'
            }, zoomArgs.length > 1 ? (zoomArgs[1] | 0) : null, zoomArgs.length > 2 ? (zoomArgs[2] | 0) : null, (zoomArgNumber ? zoomArgNumber / 100 : zoomArg)];
          } else {
            if (zoomArg === 'Fit' || zoomArg === 'FitB') {
              dest = [null, {
                name: zoomArg
              }];
            } else if ((zoomArg === 'FitH' || zoomArg === 'FitBH') || (zoomArg === 'FitV' || zoomArg === 'FitBV')) {
              dest = [null, {
                name: zoomArg
              }, zoomArgs.length > 1 ? (zoomArgs[1] | 0) : null];
            } else if (zoomArg === 'FitR') {
              if (zoomArgs.length !== 5) {
                console.error('PDFLinkService_setHash: ' + 'Not enough parameters for \'FitR\'.');
              } else {
                dest = [null, {
                  name: zoomArg
                }, (zoomArgs[1] | 0), (zoomArgs[2] | 0), (zoomArgs[3] | 0), (zoomArgs[4] | 0)];
              }
            } else {
              console.error('PDFLinkService_setHash: \'' + zoomArg + '\' is not a valid zoom value.');
            }
          }
        }
        if (dest) {
          this.pdfViewer.scrollPageIntoView(pageNumber || this.page, dest);
        } else if (pageNumber) {
          this.page = pageNumber;
        }
        if ('pagemode' in params) {
          var event = document.createEvent('CustomEvent');
          event.initCustomEvent('pagemode', true, true, {
            mode: params.pagemode
          });
          this.pdfViewer.container.dispatchEvent(event);
        }
      } else if (/^\d+$/.test(hash)) {
        this.page = hash;
      } else {
        if (this.pdfHistory) {
          this.pdfHistory.updateNextHashParam(unescape(hash));
        }
        this.navigateTo(unescape(hash));
      }
    },
    executeNamedAction: function PDFLinkService_executeNamedAction(action) {
      switch (action) {
        case 'GoBack':
          if (this.pdfHistory) {
            this.pdfHistory.back();
          }
          break;
        case 'GoForward':
          if (this.pdfHistory) {
            this.pdfHistory.forward();
          }
          break;
        case 'NextPage':
          this.page++;
          break;
        case 'PrevPage':
          this.page--;
          break;
        case 'LastPage':
          this.page = this.pagesCount;
          break;
        case 'FirstPage':
          this.page = 1;
          break;
        default:
          break;
      }
      var event = document.createEvent('CustomEvent');
      event.initCustomEvent('namedaction', true, true, {
        action: action
      });
      this.pdfViewer.container.dispatchEvent(event);
    },
    cachePageRef: function PDFLinkService_cachePageRef(pageNum, pageRef) {
      var refStr = pageRef.num + ' ' + pageRef.gen + ' R';
      this._pagesRefCache[refStr] = pageNum;
    }
  };
  return PDFLinkService;
})();
DFLIP.TextLayerBuilder = (function TextLayerBuilderClosure() {
  function TextLayerBuilder(options) {
    this.textLayerDiv = options.textLayerDiv;
    this.renderingDone = false;
    this.divContentDone = false;
    this.pageIdx = options.pageIndex;
    this.pageNumber = this.pageIdx + 1;
    this.matches = [];
    this.viewport = options.viewport;
    this.textDivs = [];
    this.findController = options.findController || null;
    this.textLayerRenderTask = null;
    this.enhanceTextSelection = options.enhanceTextSelection;
    this._bindMouse();
  }
  TextLayerBuilder.prototype = {
    _finishRendering: function TextLayerBuilder_finishRendering() {
      this.renderingDone = true;
      if (!this.enhanceTextSelection) {
        var endOfContent = document.createElement('div');
        endOfContent.className = 'endOfContent';
        this.textLayerDiv.appendChild(endOfContent);
      }
    },
    render: function TextLayerBuilder_render(timeout) {
      if (!this.divContentDone || this.renderingDone) {
        return;
      }
      if (this.textLayerRenderTask) {
        this.textLayerRenderTask.cancel();
        this.textLayerRenderTask = null;
      }
      this.textDivs = [];
      var textLayerFrag = document.createDocumentFragment();
      this.textLayerRenderTask = PDFJS.renderTextLayer({
        textContent: this.textContent,
        container: textLayerFrag,
        viewport: this.viewport,
        textDivs: this.textDivs,
        timeout: timeout,
        enhanceTextSelection: this.enhanceTextSelection,
      });
      this.textLayerRenderTask.promise.then(function () {
        this.textLayerDiv.appendChild(textLayerFrag);
        this._finishRendering();
        this.updateMatches();
      }.bind(this), function (reason) {});
    },
    setTextContent: function TextLayerBuilder_setTextContent(textContent) {
      if (this.textLayerRenderTask) {
        this.textLayerRenderTask.cancel();
        this.textLayerRenderTask = null;
      }
      this.textContent = textContent;
      this.divContentDone = true;
    },
    convertMatches: function TextLayerBuilder_convertMatches(matches, matchesLength) {
      var i = 0;
      var iIndex = 0;
      var bidiTexts = this.textContent.items;
      var end = bidiTexts.length - 1;
      var queryLen = (this.findController === null ? 0 : this.findController.state.query.length);
      var ret = [];
      if (!matches) {
        return ret;
      }
      for (var m = 0, len = matches.length; m < len; m++) {
        var matchIdx = matches[m];
        while (i !== end && matchIdx >= (iIndex + bidiTexts[i].str.length)) {
          iIndex += bidiTexts[i].str.length;
          i++;
        }
        if (i === bidiTexts.length) {
          console.error('Could not find a matching mapping');
        }
        var match = {
          begin: {
            divIdx: i,
            offset: matchIdx - iIndex
          }
        };
        if (matchesLength) {
          matchIdx += matchesLength[m];
        } else {
          matchIdx += queryLen;
        }
        while (i !== end && matchIdx > (iIndex + bidiTexts[i].str.length)) {
          iIndex += bidiTexts[i].str.length;
          i++;
        }
        match.end = {
          divIdx: i,
          offset: matchIdx - iIndex
        };
        ret.push(match);
      }
      return ret;
    },
    renderMatches: function TextLayerBuilder_renderMatches(matches) {
      if (matches.length === 0) {
        return;
      }
      var bidiTexts = this.textContent.items;
      var textDivs = this.textDivs;
      var prevEnd = null;
      var pageIdx = this.pageIdx;
      var isSelectedPage = (this.findController === null ? false : (pageIdx === this.findController.selected.pageIdx));
      var selectedMatchIdx = (this.findController === null ? -1 : this.findController.selected.matchIdx);
      var highlightAll = (this.findController === null ? false : this.findController.state.highlightAll);
      var infinity = {
        divIdx: -1,
        offset: undefined
      };

      function beginText(begin, className) {
        var divIdx = begin.divIdx;
        textDivs[divIdx].textContent = '';
        appendTextToDiv(divIdx, 0, begin.offset, className);
      }

      function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
        var div = textDivs[divIdx];
        var content = bidiTexts[divIdx].str.substring(fromOffset, toOffset);
        var node = document.createTextNode(content);
        if (className) {
          var span = document.createElement('span');
          span.className = className;
          span.appendChild(node);
          div.appendChild(span);
          return;
        }
        div.appendChild(node);
      }
      var i0 = selectedMatchIdx,
        i1 = i0 + 1;
      if (highlightAll) {
        i0 = 0;
        i1 = matches.length;
      } else if (!isSelectedPage) {
        return;
      }
      for (var i = i0; i < i1; i++) {
        var match = matches[i];
        var begin = match.begin;
        var end = match.end;
        var isSelected = (isSelectedPage && i === selectedMatchIdx);
        var highlightSuffix = (isSelected ? ' selected' : '');
        if (this.findController) {
          this.findController.updateMatchPosition(pageIdx, i, textDivs, begin.divIdx);
        }
        if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
          if (prevEnd !== null) {
            appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
          }
          beginText(begin);
        } else {
          appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
        }
        if (begin.divIdx === end.divIdx) {
          appendTextToDiv(begin.divIdx, begin.offset, end.offset, 'highlight' + highlightSuffix);
        } else {
          appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, 'highlight begin' + highlightSuffix);
          for (var n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
            textDivs[n0].className = 'highlight middle' + highlightSuffix;
          }
          beginText(end, 'highlight end' + highlightSuffix);
        }
        prevEnd = end;
      }
      if (prevEnd) {
        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
      }
    },
    updateMatches: function TextLayerBuilder_updateMatches() {
      if (!this.renderingDone) {
        return;
      }
      var matches = this.matches;
      var textDivs = this.textDivs;
      var bidiTexts = this.textContent.items;
      var clearedUntilDivIdx = -1;
      for (var i = 0, len = matches.length; i < len; i++) {
        var match = matches[i];
        var begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
        for (var n = begin, end = match.end.divIdx; n <= end; n++) {
          var div = textDivs[n];
          div.textContent = bidiTexts[n].str;
          div.className = '';
        }
        clearedUntilDivIdx = match.end.divIdx + 1;
      }
      if (this.findController === null || !this.findController.active) {
        return;
      }
      var pageMatches, pageMatchesLength;
      if (this.findController !== null) {
        pageMatches = this.findController.pageMatches[this.pageIdx] || null;
        pageMatchesLength = (this.findController.pageMatchesLength) ? this.findController.pageMatchesLength[this.pageIdx] || null : null;
      }
      this.matches = this.convertMatches(pageMatches, pageMatchesLength);
      this.renderMatches(this.matches);
    },
    _bindMouse: function TextLayerBuilder_bindMouse() {
      var div = this.textLayerDiv;
      var self = this;
      div.addEventListener('mousedown', function (e) {
        if (self.enhanceTextSelection && self.textLayerRenderTask) {
          self.textLayerRenderTask.expandTextDivs(true);
          return;
        }
        var end = div.querySelector('.endOfContent');
        if (!end) {
          return;
        }
        var adjustTop = e.target !== div;
        adjustTop = adjustTop && window.getComputedStyle(end).getPropertyValue('-moz-user-select') !== 'none';
        if (adjustTop) {
          var divBounds = div.getBoundingClientRect();
          var r = Math.max(0, (e.pageY - divBounds.top) / divBounds.height);
          end.style.top = (r * 100).toFixed(2) + '%';
        }
        end.classList.add('active');
      });
      div.addEventListener('mouseup', function (e) {
        if (self.enhanceTextSelection && self.textLayerRenderTask) {
          self.textLayerRenderTask.expandTextDivs(false);
          return;
        }
        var end = div.querySelector('.endOfContent');
        if (!end) {
          return;
        }
        end.style.top = '';
        end.classList.remove('active');
      });
    },
  };
  return TextLayerBuilder;
})();
DFLIP.ConvertPageLinks = function () {
  var w = arguments[0] / 100,
    h = arguments[1] / 100;
  var toPercent = function (_x, _y, _w, _h, _dest) {
    return {
      x: _x / w,
      y: _y / h,
      w: _w / w,
      h: _h / h,
      dest: _dest
    };
  };
  var percents = [];
  var input;
  for (var index = 2; index < arguments.length; index++) {
    input = arguments[index];
    percents[index - 2] = toPercent.apply(this, input);
  }
  return percents;
};
DFLIP.parseLinks = function (links) {
  var _links;
  if (links !== void 0 && links.length > 0) {
    for (var index = 0; index < links.length; index++) {
      _links = links[index];
      if (_links !== void 0 && _links[0] !== void 0 && _links[0].dest == void 0) {
        _links = DFLIP.ConvertPageLinks.apply(this, _links);
        links[index] = _links;
      }
    }
  }
  return links;
};
(function ($) {
  function isTrue(val) {
    return val == "true" || val == true;
  }

  function checkValues(options) {
    if (options.webgl !== void 0) options.webgl = isTrue(options.webgl);
    if (options.enableDownload !== void 0) options.enableDownload = isTrue(options.enableDownload);
    if (options.scrollWheel !== void 0) options.scrollWheel = isTrue(options.scrollWheel);
    if (options.autoEnableOutline !== void 0) options.autoEnableOutline = isTrue(options.autoEnableOutline);
    if (options.autoEnableThumbnail !== void 0) options.autoEnableThumbnail = isTrue(options.autoEnableThumbnail);
    if (options.transparent !== void 0) options.transparent = isTrue(options.transparent);
    if (options.overwritePDFOutline !== void 0) options.overwritePDFOutline = isTrue(options.overwritePDFOutline);
    if (options.soundEnable !== void 0) options.soundEnable = isTrue(options.soundEnable);
    if (options.forceFit !== void 0) options.forceFit = isTrue(options.forceFit);
    if (options.enableAnnotation !== void 0) options.enableAnnotation = isTrue(options.enableAnnotation);
    if (options.webglShadow !== void 0) options.webglShadow = isTrue(options.webglShadow);
    if (options.minTopOffset !== void 0) options.minTopOffset = parseInt(options.minTopOffset, 10);
    if (options.zoomRatio !== void 0) options.zoomRatio = parseFloat(options.zoomRatio, 10);
    if (options.pageMode == 0 || options.pageMode == "0")
      options.pageMode = void 0;
    if (options.singlePageMode == 0 || options.singlePageMode == "0")
      options.singlePageMode = void 0;
  }

  function parseOptions(options) {
    if (options.parsed == true) return;
    options.parsed = true;
    var links = [];
    checkValues(options);
    if (typeof dFlipWPGlobal !== 'undefined' && options.wpOptions == 'true') {
      try {
        for (var key in options.links) {
          var _pagelinks = options.links[key];
          var pagelink = [100, 100];
          for (var l = 0; l < _pagelinks.length; l++) {
            var _link = _pagelinks[l];
            var _values = _link.substr(1).slice(0, -1).split(",");
            var _linkarr = [];
            for (var v = 0; v < 5; v++) {
              _linkarr[v] = _values[v];
            }
            pagelink.push(_linkarr);
          }
          links[parseInt(key, 10) + 1] = pagelink;
        }
      } catch (error) {
        console.error(error.stack);
      }
      options.links = DFLIP.parseLinks(links);
    } else {
      options.links = DFLIP.parseLinks(options.links);
    }
  }
  DFLIP.getOptions = function (book) {
    book = $(book);
    var book_id = book.attr("id");
    var options = "option_" + book_id,
      source = book.attr("source") || book.attr("df-source");
    options = options == void 0 || options == "" || window[options] == void 0 ? {} : window[options];
    options.source = source == void 0 || source == "" ? options.source : source;
    var attrOptions = {
      webgl: book.attr("webgl"),
      height: book.attr("height"),
      soundEnable: book.attr("sound"),
      transparent: book.attr("transparent"),
      enableDownload: book.attr("download"),
      duration: book.attr("duration"),
      hard: book.attr("hard"),
      pageMode: book.attr("pagemode"),
      direction: book.attr("direction"),
      backgroundColor: book.attr("backgroundcolor"),
      scrollWheel: book.attr("scrollwheel"),
      backgroundImage: book.attr("backgroundimage"),
      minTopOffset: book.attr("mintopoffset"),
      wpOptions: book.attr("wpoptions")
    };
    options = $.extend(true, {}, options, attrOptions);
    parseOptions(options);
    return options;
  }
  DFLIP.parseBooks = function () {
    $('._df_button, ._df_thumb, ._df_custom, ._df_book').each(function () {
      var book = $(this);
      var parsed = book.attr("parsed") || book.attr("df-parsed");
      if (parsed !== "true") {
        book.attr("df-parsed", "true")
        if (book.hasClass("_df_book")) {
          var book_id = book.attr("id"),
            slug = book.attr("slug");
          var options = DFLIP.getOptions(book);
          options.id = book_id;
          if (slug !== void 0)
            options.slug = slug;
          if (book_id) {
            window[book_id.toString()] = $(book).flipBook(options.source, options);
          } else {
            $(book).flipBook(options.source, options);
          }
        } else {
          book.on("click", function () {
            var book = $(this);
            if (!window.dfLightBox) {
              window.dfLightBox = new DFLightBox(function () {
                if (window.location.hash.indexOf("#dflip-") == 0)
                  window.location.hash = "#_";
                window.dfActiveLightBoxBook.dispose();
                window.dfActiveLightBoxBook = null;
              });
            }
            window.dfLightBox.duration = 500;
            if (window.dfActiveLightBoxBook && window.dfActiveLightBoxBook.dispose) {
              window.dfActiveLightBoxBook.dispose();
            } else {
              window.dfLightBox.show(function () {
                var options = DFLIP.getOptions(book);
                options.transparent = false;
                options.id = book.attr("id");
                var slug = book.attr("slug");
                if (slug !== void 0)
                  options.slug = slug;
                options.isLightBox = true;
                window.dfActiveLightBoxBook = $(window.dfLightBox.container).flipBook(options.source, options);
              });
            }
          });
          if (book.hasClass("_df_thumb")) {
            var wrapper = $("<div class='_df_book-cover'>");
            var text = book.html();
            book.html("");
            var title = $("<span class='_df_book-title'>").html(text).appendTo(wrapper);
            var thumb = book.attr("thumb") || book.attr("df-thumb"),
              tags = book.attr("tags") || book.attr("df-tags");
            if (tags) {
              tags = tags.split(",");
              if (tags.length > 0) {
                for (var tagcount = 0; tagcount < tags.length; tagcount++) {
                  book.append("<span class='_df_book-tag'>" + tags[tagcount] + "</span>");
                }
              }
            }
            if (thumb !== void 0 && thumb.toString().trim() != '') {
              wrapper.css({
                backgroundImage: "url(" + thumb + ")"
              });
            } else {
              wrapper.addClass("_df_thumb-not-found");
            }
            book.append(wrapper);
          }
        }
      }
    });
  };
  $(document).ready(function () {
    if (typeof dFlipLocation !== 'undefined') {
      if (dFlipLocation.length > 2 && dFlipLocation.slice(-1) !== "/") {
        dFlipLocation += "/";
      }
      DFLIP.defaults.mockupjsSrc = dFlipLocation + "js/libs/mockup.min.js";
      DFLIP.defaults.pdfjsSrc = dFlipLocation + "js/libs/pdf.min.js";
      DFLIP.defaults.pdfjsCompatibilitySrc = dFlipLocation + "js/libs/compatibility.js";
      DFLIP.defaults.threejsSrc = dFlipLocation + "js/libs/three.min.js";
      DFLIP.defaults.pdfjsWorkerSrc = dFlipLocation + "js/libs/pdf.worker.min.js";
      DFLIP.defaults.soundFile = dFlipLocation + "sound/turn2.mp3";
      DFLIP.defaults.imagesLocation = dFlipLocation + "images";
      if (typeof dFlipWPGlobal !== 'undefined') {
        checkValues(dFlipWPGlobal);
        $.extend(DFLIP.defaults, dFlipWPGlobal);
      }
    }
    DFLIP.preParseHash = window.location.hash;
    DFLIP.parseBooks();
    if (DFLIP.preParseHash && DFLIP.preParseHash.indexOf('dflip-') >= 0) {
      var id = DFLIP.preParseHash.split('dflip-')[1].split('/')[0];
      var page = DFLIP.preParseHash.split('dflip-')[1].split('/')[1];
      if (page != void 0) {
        page = page.split('/')[0];
      }
      var book;
      book = $("[slug=" + id + "]");
      if (book.length == 0) book = $('#' + id);
      if (book.length > 0) {
        if (page != void 0) {
          book.data("page", page)
        }
        if (book.is('._df_button, ._df_thumb, ._df_custom')) {
          book.trigger("click");
        }
      }
    }
    $('body').on('click', '.df-ui-sidemenu-close', function () {
      var $this = $(this);
      $this.closest(".df-container").find(".df-ui-outline.df-active , .df-ui-thumbnail.df-active").trigger("click");
    });
  });
})(jQuery);
(function ($, window, document, undefined) {
  var defaults = {
    bounds: true,
    country: null,
    map: false,
    details: false,
    detailsAttribute: "name",
    detailsScope: null,
    autoselect: true,
    location: false,
    mapOptions: {
      zoom: 14,
      scrollwheel: false,
      mapTypeId: "roadmap"
    },
    markerOptions: {
      draggable: false
    },
    maxZoom: 16,
    types: ['geocode'],
    blur: false,
    geocodeAfterResult: false,
    restoreValueAfterBlur: false
  };
  var componentTypes = ("street_address route intersection political " + "country administrative_area_level_1 administrative_area_level_2 " + "administrative_area_level_3 colloquial_area locality sublocality " + "neighborhood premise subpremise postal_code natural_feature airport " + "park point_of_interest post_box street_number floor room " + "lat lng viewport location " + "formatted_address location_type bounds").split(" ");
  var placesDetails = ("id place_id url website vicinity reference name rating " + "international_phone_number icon formatted_phone_number").split(" ");

  function GeoComplete(input, options) {
    this.options = $.extend(true, {}, defaults, options);
    if (options && options.types) {
      this.options.types = options.types;
    }
    this.input = input;
    this.$input = $(input);
    this._defaults = defaults;
    this._name = 'geocomplete';
    this.init();
  }
  $.extend(GeoComplete.prototype, {
    init: function () {
      this.initMap();
      this.initMarker();
      this.initGeocoder();
      this.initDetails();
      this.initLocation();
    },
    initMap: function () {
      if (!this.options.map) {
        return;
      }
      if (typeof this.options.map.setCenter == "function") {
        this.map = this.options.map;
        return;
      }
      this.map = new google.maps.Map($(this.options.map)[0], this.options.mapOptions);
      google.maps.event.addListener(this.map, 'click', $.proxy(this.mapClicked, this));
      google.maps.event.addListener(this.map, 'dragend', $.proxy(this.mapDragged, this));
      google.maps.event.addListener(this.map, 'idle', $.proxy(this.mapIdle, this));
      google.maps.event.addListener(this.map, 'zoom_changed', $.proxy(this.mapZoomed, this));
    },
    initMarker: function () {
      if (!this.map) {
        return;
      }
      var options = $.extend(this.options.markerOptions, {
        map: this.map
      });
      if (options.disabled) {
        return;
      }
      this.marker = new google.maps.Marker(options);
      google.maps.event.addListener(this.marker, 'dragend', $.proxy(this.markerDragged, this));
    },
    initGeocoder: function () {
      var selected = false;
      var options = {
        types: this.options.types,
        bounds: this.options.bounds === true ? null : this.options.bounds,
        componentRestrictions: this.options.componentRestrictions
      };
      if (this.options.country) {
        options.componentRestrictions = {
          country: this.options.country
        };
      }
      this.autocomplete = new google.maps.places.Autocomplete(this.input, options);
      this.geocoder = new google.maps.Geocoder();
      if (this.map && this.options.bounds === true) {
        this.autocomplete.bindTo('bounds', this.map);
      }
      google.maps.event.addListener(this.autocomplete, 'place_changed', $.proxy(this.placeChanged, this));
      this.$input.on('keypress.' + this._name, function (event) {
        if (event.keyCode === 13) {
          return false;
        }
      });
      if (this.options.geocodeAfterResult === true) {
        this.$input.bind('keypress.' + this._name, $.proxy(function () {
          if (event.keyCode != 9 && this.selected === true) {
            this.selected = false;
          }
        }, this));
      }
      this.$input.bind('geocode.' + this._name, $.proxy(function () {
        this.find();
      }, this));
      this.$input.bind('geocode:result.' + this._name, $.proxy(function () {
        this.lastInputVal = this.$input.val();
      }, this));
      if (this.options.blur === true) {
        this.$input.on('blur.' + this._name, $.proxy(function () {
          if (this.options.geocodeAfterResult === true && this.selected === true) {
            return;
          }
          if (this.options.restoreValueAfterBlur === true && this.selected === true) {
            setTimeout($.proxy(this.restoreLastValue, this), 0);
          } else {
            this.find();
          }
        }, this));
      }
    },
    initDetails: function () {
      if (!this.options.details) {
        return;
      }
      if (this.options.detailsScope) {
        var $details = $(this.input).parents(this.options.detailsScope).find(this.options.details);
      } else {
        var $details = $(this.options.details);
      }
      var attribute = this.options.detailsAttribute,
        details = {};

      function setDetail(value) {
        details[value] = $details.find("[" + attribute + "=" + value + "]");
      }
      $.each(componentTypes, function (index, key) {
        setDetail(key);
        setDetail(key + "_short");
      });
      $.each(placesDetails, function (index, key) {
        setDetail(key);
      });
      this.$details = $details;
      this.details = details;
    },
    initLocation: function () {
      var location = this.options.location,
        latLng;
      if (!location) {
        return;
      }
      if (typeof location == 'string') {
        this.find(location);
        return;
      }
      if (location instanceof Array) {
        latLng = new google.maps.LatLng(location[0], location[1]);
      }
      if (location instanceof google.maps.LatLng) {
        latLng = location;
      }
      if (latLng) {
        if (this.map) {
          this.map.setCenter(latLng);
        }
        if (this.marker) {
          this.marker.setPosition(latLng);
        }
      }
    },
    destroy: function () {
      if (this.map) {
        google.maps.event.clearInstanceListeners(this.map);
        google.maps.event.clearInstanceListeners(this.marker);
      }
      this.autocomplete.unbindAll();
      google.maps.event.clearInstanceListeners(this.autocomplete);
      google.maps.event.clearInstanceListeners(this.input);
      this.$input.removeData();
      this.$input.off(this._name);
      this.$input.unbind('.' + this._name);
    },
    find: function (address) {
      this.geocode({
        address: address || this.$input.val()
      });
    },
    geocode: function (request) {
      if (!request.address) {
        return;
      }
      if (this.options.bounds && !request.bounds) {
        if (this.options.bounds === true) {
          request.bounds = this.map && this.map.getBounds();
        } else {
          request.bounds = this.options.bounds;
        }
      }
      if (this.options.country) {
        request.region = this.options.country;
      }
      this.geocoder.geocode(request, $.proxy(this.handleGeocode, this));
    },
    selectFirstResult: function () {
      var selected = '';
      if ($(".pac-item-selected")[0]) {
        selected = '-selected';
      }
      var $span1 = $(".pac-container:visible .pac-item" + selected + ":first span:nth-child(2)").text();
      var $span2 = $(".pac-container:visible .pac-item" + selected + ":first span:nth-child(3)").text();
      var firstResult = $span1;
      if ($span2) {
        firstResult += " - " + $span2;
      }
      this.$input.val(firstResult);
      return firstResult;
    },
    restoreLastValue: function () {
      if (this.lastInputVal) {
        this.$input.val(this.lastInputVal);
      }
    },
    handleGeocode: function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var result = results[0];
        this.$input.val(result.formatted_address);
        this.update(result);
        if (results.length > 1) {
          this.trigger("geocode:multiple", results);
        }
      } else {
        this.trigger("geocode:error", status);
      }
    },
    trigger: function (event, argument) {
      this.$input.trigger(event, [argument]);
    },
    center: function (geometry) {
      if (geometry.viewport) {
        this.map.fitBounds(geometry.viewport);
        if (this.map.getZoom() > this.options.maxZoom) {
          this.map.setZoom(this.options.maxZoom);
        }
      } else {
        this.map.setZoom(this.options.maxZoom);
        this.map.setCenter(geometry.location);
      }
      if (this.marker) {
        this.marker.setPosition(geometry.location);
        this.marker.setAnimation(this.options.markerOptions.animation);
      }
    },
    update: function (result) {
      if (this.map) {
        this.center(result.geometry);
      }
      if (this.$details) {
        this.fillDetails(result);
      }
      this.trigger("geocode:result", result);
    },
    fillDetails: function (result) {
      var data = {},
        geometry = result.geometry,
        viewport = geometry.viewport,
        bounds = geometry.bounds;
      $.each(result.address_components, function (index, object) {
        var name = object.types[0];
        $.each(object.types, function (index, name) {
          data[name] = object.long_name;
          data[name + "_short"] = object.short_name;
        });
      });
      $.each(placesDetails, function (index, key) {
        data[key] = result[key];
      });
      $.extend(data, {
        formatted_address: result.formatted_address,
        location_type: geometry.location_type || "PLACES",
        viewport: viewport,
        bounds: bounds,
        location: geometry.location,
        lat: geometry.location.lat(),
        lng: geometry.location.lng()
      });
      $.each(this.details, $.proxy(function (key, $detail) {
        var value = data[key];
        this.setDetail($detail, value);
      }, this));
      this.data = data;
    },
    setDetail: function ($element, value) {
      if (value === undefined) {
        value = "";
      } else if (typeof value.toUrlValue == "function") {
        value = value.toUrlValue();
      }
      if ($element.is(":input")) {
        $element.val(value);
      } else {
        $element.text(value);
      }
    },
    markerDragged: function (event) {
      this.trigger("geocode:dragged", event.latLng);
    },
    mapClicked: function (event) {
      this.trigger("geocode:click", event.latLng);
    },
    mapDragged: function (event) {
      this.trigger("geocode:mapdragged", this.map.getCenter());
    },
    mapIdle: function (event) {
      this.trigger("geocode:idle", this.map.getCenter());
    },
    mapZoomed: function (event) {
      this.trigger("geocode:zoom", this.map.getZoom());
    },
    resetMarker: function () {
      this.marker.setPosition(this.data.location);
      this.setDetail(this.details.lat, this.data.location.lat());
      this.setDetail(this.details.lng, this.data.location.lng());
    },
    placeChanged: function () {
      var place = this.autocomplete.getPlace();
      this.selected = true;
      if (!place.geometry) {
        if (this.options.autoselect) {
          var autoSelection = this.selectFirstResult();
          this.find(autoSelection);
        }
      } else {
        this.update(place);
      }
    }
  });
  $.fn.geocomplete = function (options) {
    var attribute = 'plugin_geocomplete';
    if (typeof options == "string") {
      var instance = $(this).data(attribute) || $(this).geocomplete().data(attribute),
        prop = instance[options];
      if (typeof prop == "function") {
        prop.apply(instance, Array.prototype.slice.call(arguments, 1));
        return $(this);
      } else {
        if (arguments.length == 2) {
          prop = arguments[1];
        }
        return prop;
      }
    } else {
      return this.each(function () {
        var instance = $.data(this, attribute);
        if (!instance) {
          instance = new GeoComplete(this, options);
          $.data(this, attribute, instance);
        }
      });
    }
  };
})(jQuery, window, document);
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function ($) {
  var slice = Array.prototype.slice;
  var splice = Array.prototype.splice;
  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: '',
      widthFromWrapper: true,
      responsiveWidth: false
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function () {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;
      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;
        s.stickyWrapper.css('height', s.stickyElement.outerHeight());
        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement.css({
              'width': '',
              'position': '',
              'top': ''
            });
            s.stickyElement.parent().removeClass(s.className);
            s.stickyElement.trigger('sticky-end', [s]);
            s.currentTop = null;
          }
        } else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop !== newTop) {
            var newWidth;
            if (s.getWidthFrom) {
              newWidth = $(s.getWidthFrom).width() || null;
            } else if (s.widthFromWrapper) {
              newWidth = s.stickyWrapper.width();
            }
            if (newWidth == null) {
              newWidth = s.stickyElement.width();
            }
            s.stickyElement.css('width', newWidth).css('position', 'fixed').css('top', newTop);
            s.stickyElement.parent().addClass(s.className);
            if (s.currentTop === null) {
              s.stickyElement.trigger('sticky-start', [s]);
            } else {
              s.stickyElement.trigger('sticky-update', [s]);
            }
            if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
              s.stickyElement.trigger('sticky-bottom-reached', [s]);
            } else if (s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
              s.stickyElement.trigger('sticky-bottom-unreached', [s]);
            }
            s.currentTop = newTop;
          }
          var stickyWrapperContainer = s.stickyWrapper.parent();
          var unstick = (s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight()) && (s.stickyElement.offset().top <= s.topSpacing);
          if (unstick) {
            s.stickyElement.css('position', 'absolute').css('top', '').css('bottom', 0);
          } else {
            s.stickyElement.css('position', 'fixed').css('top', newTop).css('bottom', '');
          }
        }
      }
    },
    resizer = function () {
      windowHeight = $window.height();
      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i];
        var newWidth = null;
        if (s.getWidthFrom) {
          if (s.responsiveWidth) {
            newWidth = $(s.getWidthFrom).width();
          }
        } else if (s.widthFromWrapper) {
          newWidth = s.stickyWrapper.width();
        }
        if (newWidth != null) {
          s.stickyElement.css('width', newWidth);
        }
      }
    },
    methods = {
      init: function (options) {
        var o = $.extend({}, defaults, options);
        return this.each(function () {
          var stickyElement = $(this);
          var stickyId = stickyElement.attr('id');
          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
          var wrapper = $('<div></div>').attr('id', wrapperId).addClass(o.wrapperClassName);
          stickyElement.wrapAll(wrapper);
          var stickyWrapper = stickyElement.parent();
          if (o.center) {
            stickyWrapper.css({
              width: stickyElement.outerWidth(),
              marginLeft: "auto",
              marginRight: "auto"
            });
          }
          if (stickyElement.css("float") === "right") {
            stickyElement.css({
              "float": "none"
            }).parent().css({
              "float": "right"
            });
          }
          o.stickyElement = stickyElement;
          o.stickyWrapper = stickyWrapper;
          o.currentTop = null;
          sticked.push(o);
          methods.setWrapperHeight(this);
          methods.setupChangeListeners(this);
        });
      },
      setWrapperHeight: function (stickyElement) {
        var element = $(stickyElement);
        var stickyWrapper = element.parent();
        if (stickyWrapper) {
          stickyWrapper.css('height', element.outerHeight());
        }
      },
      setupChangeListeners: function (stickyElement) {
        if (window.MutationObserver) {
          var mutationObserver = new window.MutationObserver(function (mutations) {
            if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
              methods.setWrapperHeight(stickyElement);
            }
          });
          mutationObserver.observe(stickyElement, {
            subtree: true,
            childList: true
          });
        } else {
          stickyElement.addEventListener('DOMNodeInserted', function () {
            methods.setWrapperHeight(stickyElement);
          }, false);
          stickyElement.addEventListener('DOMNodeRemoved', function () {
            methods.setWrapperHeight(stickyElement);
          }, false);
        }
      },
      update: scroller,
      unstick: function (options) {
        return this.each(function () {
          var that = this;
          var unstickyElement = $(that);
          var removeIdx = -1;
          var i = sticked.length;
          while (i-- > 0) {
            if (sticked[i].stickyElement.get(0) === that) {
              splice.call(sticked, i, 1);
              removeIdx = i;
            }
          }
          if (removeIdx !== -1) {
            unstickyElement.unwrap();
            unstickyElement.css({
              'width': '',
              'position': '',
              'top': '',
              'float': ''
            });
          }
        });
      }
    };
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }
  $.fn.sticky = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };
  $.fn.unstick = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.unstick.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };
  $(function () {
    setTimeout(scroller, 0);
  });
}));
var property_type_buying = 0;
var property_price_buying = '';
var property_first_time_buyer = '';
var property_second_home_buy_to_let = '';
jQuery(document).ready(function ($) {
  startStampDutyForm();
  $(".form-field-price").keyup(function (e) {
    $(this).val($(this).val().replace(/[^0-9 ]/g, ""));
  });
  $(".purchase-price").on("keyup", function () {
    property_price_buying = parseInt($('.purchase-price').val()) || 0;
    allowCalculation();
  });
  $(".btn-calculate").on("click", function (e) {
    getStampDutyPrice();
    $('.box-stamp-duty-calculator').addClass('box-loading');
    return false;
  });
  $(".radio-first-time-buyer").on("change", function (e) {
    firstTimeBuyerConditional();
  });

  function startStampDutyForm() {
    firstTimeBuyerConditional();
    updateValues();
    allowCalculation();
  }

  function firstTimeBuyerConditional() {
    var value = $('.radio-first-time-buyer:checked').val();
    $('.radio-second-home-buy-to-let[value="no"]').prop('checked', true);
    if (value == 'yes') {
      $('.fields-second-home').slideUp();
    } else {
      $('.fields-second-home').slideDown();
    }
    return false;
  }

  function updateValues() {
    property_price_buying = parseInt($('.purchase-price').val()) || 0;
    property_second_home_buy_to_let = $('.radio-second-home-buy-to-let[name="second-home"]:checked').val();
    property_first_time_buyer = $('.radio-first-time-buyer:checked').val();
  }

  function allowCalculation() {
    if (property_price_buying > 0) {
      $('.btn-calculate').removeClass('disabled');
    } else {
      $('.btn-calculate').addClass('disabled');
    }
  }

  function getStampDutyPrice() {
    updateValues();
    $.ajax({
      url: baseURL + '/wp-admin/admin-ajax.php',
      type: 'GET',
      dataType: 'json',
      cache: false,
      data: {
        'action': 'stamp_duty_price',
        'property_price_buying': property_price_buying,
        'property_second_home_buy_to_let': property_second_home_buy_to_let,
        'property_first_time_buyer': property_first_time_buyer
      },
      success: function (data) {
        if (data.status == 'ok') {
          $(".stamp-duty-quote").slideUp(300, function () {
            $(this).html(data.html);
            $(this).slideDown(800);
          });
          $(".field-quote input").val(data.quote);
          $(".field-purchase-price input").val(data.purchase_price);
          $('.box-stamp-duty-calculator').removeClass('box-loading');
        }
      }
    });
  }
});
jQuery(document).ready(function ($) {
  $('body').on('click', '.btn-wishlist', function (e) {
    var property_id = $(this).attr('data-property-id');
    var open = $(this).hasClass('open');
    if (open) {
      remove_from_wishlist(property_id);
    } else {
      add_to_wishlist(property_id);
    }
    e.preventDefault();
  });
  $('body').on('click', '.btn-wishlist-remove', function (e) {
    var property_id = $(this).attr('data-property-id');
    $('.wishlist-properties').fadeOut(200);
    remove_from_wishlist(property_id);
    e.preventDefault();
  });
});

function add_to_wishlist(property_id) {
  var $ = jQuery.noConflict();
  $('[data-property-id="' + property_id + '"]').addClass('open');
  $('i', '[data-property-id="' + property_id + '"]').removeClass('fa-heart').addClass('fa fa-spin fa-cog');
  $.ajax({
    url: baseURL + '/wp-admin/admin-ajax.php',
    type: 'GET',
    dataType: 'json',
    cache: false,
    data: {
      'action': 'add_to_wishlist',
      'property_id': property_id,
    },
    success: function (data) {
      if (data.status == 'ok') {
        $('i', '[data-property-id="' + property_id + '"]').removeClass('fa-spin fa-cog').addClass('fa fa-heart');
        $('span', '[data-property-id="' + property_id + '"]').html('Remove from Wishlist');
        var wishlist = $.makeArray(data.wishlist);
        update_wishlist(wishlist);
      }
    }
  });
}

function remove_from_wishlist(property_id) {
  var $ = jQuery.noConflict();
  $('[data-property-id="' + property_id + '"]').removeClass('open');
  $('i', '[data-property-id="' + property_id + '"]').removeClass('fa-heart').addClass('fa fa-spin fa-cog');
  $.ajax({
    url: baseURL + '/wp-admin/admin-ajax.php',
    type: 'GET',
    dataType: 'json',
    cache: false,
    data: {
      'action': 'remove_from_wishlist',
      'property_id': property_id,
    },
    success: function (data) {
      if (data.status == 'ok') {
        $('i', '[data-property-id="' + property_id + '"]').removeClass('fa-spin fa-cog').addClass('fa fa-heart');
        $('span', '[data-property-id="' + property_id + '"]').html('Add to Wishlist');
        var wishlist = $.makeArray(data.wishlist);
        update_wishlist(wishlist);
      }
    }
  });
}

function update_wishlist(wishlist) {
  var $ = jQuery.noConflict();
  if (wishlist && wishlist.length > 0) {
    $('.wishlist').removeClass('wishlist-empty');
    $.ajax({
      url: baseURL + '/wp-admin/admin-ajax.php',
      type: 'GET',
      dataType: 'json',
      cache: false,
      data: {
        'action': 'get_wishlist',
      },
      success: function (data) {
        if (data.status == 'ok') {
          $('.wishlist-properties').fadeOut(200, function () {
            $('.wishlist-properties').html(data.html);
            $('.wishlist-properties').fadeIn(300);
            $('.wishlist-count').html('(' + data.count + ')');
          })
        }
      }
    });
  } else {
    $('.wishlist').removeClass('open').addClass('wishlist-empty');
  }
};
jQuery(document).ready(function ($) {
  $(window).bind("load", function () {
    $('body').addClass('page-loaded');
  });
  var options = {
    componentRestrictions: {
      country: 'gb'
    }
  };
  $(".autocomplete").geocomplete(options).bind("geocode:result", function (event, result) {
    $('form.property-search-form input[name="lat"]').val(result.geometry.location.lat());
    $('form.property-search-form input[name="lng"]').val(result.geometry.location.lng());
  });
  $('.autosubmit').on('change', function (e) {
    $(this).parents('form').submit();
  });
  $('.page-navigation li a').click(function (e) {
    var href = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(href).offset().top - 120
    }, 800);
    e.preventDefault();
  });
  $('.taphover').on('touchstart', function (e) {});
  if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) && $(window).width() > 1000) {
    var s = skrollr.init({
      forceHeight: false
    });
  }
  $('[data-fancybox]').fancybox({
    width: 680,
    height: 495,
    toolbar: true,
    smallBtn: true,
    buttons: ['close'],
    iframe: {
      preload: false
    }
  });
  if (getBootstrapDeviceSize() != 'xs') {
    $(".sidebar .widget-book-viewing").sticky({
      topSpacing: 150,
      bottomSpacing: 480
    });
  }
  if ($('.testimonial-slider .testimonial').length > 1) {
    $('.testimonial-slider').slick({
      dots: true,
      arrows: false,
      slidesToShow: 1
    });
  }
 
  if (getBootstrapDeviceSize() == 'xs' && $('.section-new-instructions .properties .col').length > 1) {   
    $('.section-new-instructions .properties').slick({
      slidesToShow: 1,
      arrows: false,
      dots: true
    });
  }
    if (getBootstrapDeviceSize() == 'xs' && $('.topBSafe').length >= 1) {   
    $('.safe-neibor').slick({
      slidesToShow: 1,
      arrows: false,
      dots: true
    });
  }
   if ($('#section-artner-id').length == 1) {
     if(getBootstrapDeviceSize() == 'xs') {
            $('#partner-slider .team-memb').slick({
              slidesToShow: 3, slidesToScroll: 3,autoplay:true,
              arrows: false,
              dots: true
            });
     }else{
          $('#partner-slider .team-memb').slick({
              slidesToShow: 6, slidesToScroll:6,autoplay:true,
              arrows: false,
              dots: true
            });
     }
  }
  
  if($('#team-slider').length == 1) {
 
         new Swiper('#team-slider', {
    speed: 400,
    loop: false,
    autoplay:  getBootstrapDeviceSize() == 'xs' ? true : false,  
      
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 5
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 0
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 5
      }
    },
     navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
  });
  }
  
  $('.scrollto').click(function (e) {
    var href = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(href).offset().top - 80
    }, 800);
    e.preventDefault();
  });
  animateTitles();

  function getBootstrapDeviceSize() {
    return $('#users-device-size').find('div:visible').first().attr('id');
  }
  $(".btn-advanced").click(function () {
    $(this).siblings('.property-search-advanced').slideToggle(500);
    $(this).toggleClass('open');
    return false;
  });
  $(".btn-menu").click(function () {
    //$(this).toggleClass('open');
    $('.mobile-nav').toggleClass('open');
    $('body').toggleClass('fix');
    return false;
  });
  $(".btn-wishlist-trigger").click(function () {
    $('.wishlist').toggleClass('open');
    return false;
  });
  if (getBootstrapDeviceSize() == 'xs') {
    $('.property-search-location input').focus(function () {
      $('.property-search-type').slideDown(300);
    });
  }
  if (typeof lat != 'undefined' && typeof lng != 'undefined') {
    show_map_streetview();
  }
  if (typeof address != 'undefined') {
    getAddressLocation(address, 'property_search_address');
  }
  if (getBootstrapDeviceSize() != 'xs') {
    $('body').waypoint(function (direction) {
      $("#header").toggleClass('sticky');
    }, {
      offset: '-100px'
    });
  }
});

function animateTitles() {
  var $ = jQuery.noConflict();
  if ($(".animate").length > 0) {
    $('.animate').waypoint(function (direction) {
      $(this).addClass('animated');
    }, {
      offset: '80%'
    });
  }
}
jQuery(document).bind('gform_post_render', function () {
  animateTitles();
});
jQuery(document).bind('gform_confirmation_loaded', function (event, formId) {
  animateTitles();
});
var marker_image = '/images/map-marker.svg';
var marker_default = {
  url: templateURL + marker_image,
  size: new google.maps.Size(40, 50),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(0, 20),
};

function show_map_streetview() {
  var $ = jQuery.noConflict();
  bounds = new google.maps.LatLngBounds();
  var fenway = {
    lat: lat,
    lng: lng
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    center: fenway,
    zoom: 14
  });
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    animation: google.maps.Animation.DROP,
    icon: marker_default
  });
  bounds.extend(marker.position);
}

function getAddressLocation(address, action) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': address
  }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      latlng = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
      addressCallback(action, latlng);
    }
  });
}
var $ = jQuery.noConflict();
function addressCallback(action, latlng) {
  var $ = jQuery.noConflict();
  if (action == 'property_search_address') {
    $('input[name="lat"]').val(latlng[0]);
    $('input[name="lng"]').val(latlng[1]);
  }
};
/*! This file is auto-generated */
! function (d, l) {
  "use strict";
  var e = !1,
    o = !1;
  if (l.querySelector)
    if (d.addEventListener) e = !0;
  if (d.wp = d.wp || {}, !d.wp.receiveEmbedMessage)
    if (d.wp.receiveEmbedMessage = function (e) {
        var t = e.data;
        if (t)
          if (t.secret || t.message || t.value)
            if (!/[^a-zA-Z0-9]/.test(t.secret)) {
              var r, a, i, s, n, o = l.querySelectorAll('iframe[data-secret="' + t.secret + '"]'),
                c = l.querySelectorAll('blockquote[data-secret="' + t.secret + '"]');
              for (r = 0; r < c.length; r++) c[r].style.display = "none";
              for (r = 0; r < o.length; r++)
                if (a = o[r], e.source === a.contentWindow) {
                  if (a.removeAttribute("style"), "height" === t.message) {
                    if (1e3 < (i = parseInt(t.value, 10))) i = 1e3;
                    else if (~~i < 200) i = 200;
                    a.height = i
                  }
                  if ("link" === t.message)
                    if (s = l.createElement("a"), n = l.createElement("a"), s.href = a.getAttribute("src"), n.href = t.value, n.host === s.host)
                      if (l.activeElement === a) d.top.location.href = t.value
                }
            }
      }, e) d.addEventListener("message", d.wp.receiveEmbedMessage, !1), l.addEventListener("DOMContentLoaded", t, !1), d.addEventListener("load", t, !1);

  function t() {
    if (!o) {
      o = !0;
      var e, t, r, a, i = -1 !== navigator.appVersion.indexOf("MSIE 10"),
        s = !!navigator.userAgent.match(/Trident.*rv:11\./),
        n = l.querySelectorAll("iframe.wp-embedded-content");
      for (t = 0; t < n.length; t++) {
        if (!(r = n[t]).getAttribute("data-secret")) a = Math.random().toString(36).substr(2, 10), r.src += "#?secret=" + a, r.setAttribute("data-secret", a);
        if (i || s)(e = r.cloneNode(!0)).removeAttribute("security"), r.parentNode.replaceChild(e, r)
      }
    }
  }
}(window, document);
! function ($) {
  "use strict";
  var escape = /["\\\x00-\x1f\x7f-\x9f]/g,
    meta = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
    },
    hasOwn = Object.prototype.hasOwnProperty;
  $.toJSON = "object" == typeof JSON && JSON.stringify ? JSON.stringify : function (t) {
    if (null === t) return "null";
    var e, r, n, o, i = $.type(t);
    if ("undefined" !== i) {
      if ("number" === i || "boolean" === i) return String(t);
      if ("string" === i) return $.quoteString(t);
      if ("function" == typeof t.toJSON) return $.toJSON(t.toJSON());
      if ("date" === i) {
        var f = t.getUTCMonth() + 1,
          u = t.getUTCDate(),
          s = t.getUTCFullYear(),
          a = t.getUTCHours(),
          l = t.getUTCMinutes(),
          c = t.getUTCSeconds(),
          p = t.getUTCMilliseconds();
        return f < 10 && (f = "0" + f), u < 10 && (u = "0" + u), a < 10 && (a = "0" + a), l < 10 && (l = "0" + l), c < 10 && (c = "0" + c), p < 100 && (p = "0" + p), p < 10 && (p = "0" + p), '"' + s + "-" + f + "-" + u + "T" + a + ":" + l + ":" + c + "." + p + 'Z"'
      }
      if (e = [], $.isArray(t)) {
        for (r = 0; r < t.length; r++) e.push($.toJSON(t[r]) || "null");
        return "[" + e.join(",") + "]"
      }
      if ("object" == typeof t) {
        for (r in t)
          if (hasOwn.call(t, r)) {
            if ("number" === (i = typeof r)) n = '"' + r + '"';
            else {
              if ("string" !== i) continue;
              n = $.quoteString(r)
            }
            "function" !== (i = typeof t[r]) && "undefined" !== i && (o = $.toJSON(t[r]), e.push(n + ":" + o))
          } return "{" + e.join(",") + "}"
      }
    }
  }, $.evalJSON = "object" == typeof JSON && JSON.parse ? JSON.parse : function (str) {
    return eval("(" + str + ")")
  }, $.secureEvalJSON = "object" == typeof JSON && JSON.parse ? JSON.parse : function (str) {
    var filtered = str.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "");
    if (/^[\],:{}\s]*$/.test(filtered)) return eval("(" + str + ")");
    throw new SyntaxError("Error parsing JSON, source is not valid.")
  }, $.quoteString = function (t) {
    return t.match(escape) ? '"' + t.replace(escape, function (t) {
      var e = meta[t];
      return "string" == typeof e ? e : (e = t.charCodeAt(), "\\u00" + Math.floor(e / 16).toString(16) + (e % 16).toString(16))
    }) + '"' : '"' + t + '"'
  }
}(jQuery);

function gformBindFormatPricingFields() {
  jQuery(".ginput_amount, .ginput_donation_amount").off("change.gform").on("change.gform", function () {
    gformFormatPricingField(this)
  }), jQuery(".ginput_amount, .ginput_donation_amount").each(function () {
    gformFormatPricingField(this)
  })
}

function Currency(e) {
  this.currency = e, this.toNumber = function (e) {
    return this.isNumeric(e) ? parseFloat(e) : gformCleanNumber(e, this.currency.symbol_right, this.currency.symbol_left, this.currency.decimal_separator)
  }, this.toMoney = function (e, r) {
    if ((r = r || !1) || (e = gformCleanNumber(e, this.currency.symbol_right, this.currency.symbol_left, this.currency.decimal_separator)), !1 === e) return "";
    "-" == (e += negative = "")[0] && (e = parseFloat(e.substr(1)), negative = "-"), money = this.numberFormat(e, this.currency.decimals, this.currency.decimal_separator, this.currency.thousand_separator), "0.00" == money && (negative = "");
    var t = this.currency.symbol_left ? this.currency.symbol_left + this.currency.symbol_padding : "",
      i = this.currency.symbol_right ? this.currency.symbol_padding + this.currency.symbol_right : "";
    return money = negative + this.htmlDecode(t) + money + this.htmlDecode(i), money
  }, this.numberFormat = function (e, r, t, i, n) {
    n = void 0 === n || n, e = (e + "").replace(",", "").replace(" ", "");
    var o, a, l, f = isFinite(+e) ? +e : 0,
      s = isFinite(+r) ? Math.abs(r) : 0,
      d = void 0 === i ? "," : i,
      c = void 0 === t ? "." : t,
      u = "";
    return 3 < (u = "0" == r ? (f += 1e-10, ("" + Math.round(f)).split(".")) : -1 == r ? ("" + f).split(".") : (o = f += 1e-10, a = s, l = Math.pow(10, a), ("" + Math.round(o * l) / l).split(".")))[0].length && (u[0] = u[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, d)), n && (u[1] || "").length < s && (u[1] = u[1] || "", u[1] += new Array(s - u[1].length + 1).join("0")), u.join(c)
  }, this.isNumeric = function (e) {
    return gformIsNumber(e)
  }, this.htmlDecode = function (e) {
    var r, t, i = e,
      n = i.match(/&#[0-9]{1,5};/g);
    if (null != n)
      for (var o = 0; o < n.length; o++) i = -32768 <= (r = (t = n[o]).substring(2, t.length - 1)) && r <= 65535 ? i.replace(t, String.fromCharCode(r)) : i.replace(t, "");
    return i
  }
}

function gformCleanNumber(e, r, t, i) {
  var n = "",
    o = "",
    a = "",
    l = !1;
  e = (e = (e = (e += " ").replace(/&.*?;/g, "")).replace(r, "")).replace(t, "");
  for (var f = 0; f < e.length; f++) a = e.substr(f, 1), 0 <= parseInt(a, 10) && parseInt(a, 10) <= 9 || a == i ? n += a : "-" == a && (l = !0);
  for (f = 0; f < n.length; f++) "0" <= (a = n.substr(f, 1)) && a <= "9" ? o += a : a == i && (o += ".");
  return l && (o = "-" + o), !!gformIsNumber(o) && parseFloat(o)
}

function gformGetDecimalSeparator(e) {
  var r;
  switch (e) {
    case "currency":
      r = new Currency(gf_global.gf_currency_config).currency.decimal_separator;
      break;
    case "decimal_comma":
      r = ",";
      break;
    default:
      r = "."
  }
  return r
}

function gformIsNumber(e) {
  return !isNaN(parseFloat(e)) && isFinite(e)
}

function gformIsNumeric(e, r) {
  switch (r) {
    case "decimal_dot":
      return new RegExp("^(-?[0-9]{1,3}(?:,?[0-9]{3})*(?:.[0-9]+)?)$").test(e);
    case "decimal_comma":
      return new RegExp("^(-?[0-9]{1,3}(?:.?[0-9]{3})*(?:,[0-9]+)?)$").test(e)
  }
  return !1
}

function gformDeleteUploadedFile(e, r, t) {
  var i = jQuery("#field_" + e + "_" + r),
    n = jQuery(t).parent().index();
  i.find(".ginput_preview").eq(n).remove(), i.find('input[type="file"],.validation_message,#extensions_message_' + e + "_" + r).removeClass("gform_hidden"), i.find(".ginput_post_image_file").show(), i.find('input[type="text"]').val("");
  var o = jQuery("#gform_uploaded_files_" + e).val();
  if (o) {
    var a = jQuery.secureEvalJSON(o);
    if (a) {
      var l = "input_" + r,
        f = i.find("#gform_multifile_upload_" + e + "_" + r);
      if (0 < f.length) {
        a[l].splice(n, 1);
        var s = f.data("settings"),
          d = s.gf_vars.max_files;
        jQuery("#" + s.gf_vars.message_id).html(""), a[l].length < d && gfMultiFileUploader.toggleDisabled(s, !1)
      } else a[l] = null;
      jQuery("#gform_uploaded_files_" + e).val(jQuery.toJSON(a))
    }
  }
}
void 0 === jQuery.fn.prop && (jQuery.fn.prop = jQuery.fn.attr), jQuery(document).ready(function () {
  jQuery(document).bind("gform_post_render", gformBindFormatPricingFields)
});
var _gformPriceFields = new Array,
  _anyProductSelected;

function gformIsHidden(e) {
  return "none" == e.parents(".gfield").not(".gfield_hidden_product").css("display")
}

function gformCalculateTotalPrice(e) {
  if (_gformPriceFields[e]) {
    var r = 0;
    _anyProductSelected = !1;
    for (var t = 0; t < _gformPriceFields[e].length; t++) r += gformCalculateProductPrice(e, _gformPriceFields[e][t]);
    if (_anyProductSelected) r += gformGetShippingPrice(e);
    window.gform_product_total && (r = window.gform_product_total(e, r)), r = gform.applyFilters("gform_product_total", r, e);
    var i = jQuery(".ginput_total_" + e);
    if (0 < i.length) {
      var n = i.next().val(),
        o = gformFormatMoney(r, !0);
      n != r && i.next().val(r).change(), o != i.first().text() && i.html(o)
    }
  }
}

function gformGetShippingPrice(e) {
  var r = jQuery(".gfield_shipping_" + e + ' input[type="hidden"], .gfield_shipping_' + e + " select, .gfield_shipping_" + e + " input:checked"),
    t = 0;
  return 1 != r.length || gformIsHidden(r) || (t = r.attr("type") && "hidden" == r.attr("type").toLowerCase() ? r.val() : gformGetPrice(r.val())), gformToNumber(t)
}

function gformGetFieldId(e) {
  var r = jQuery(e).attr("id").split("_");
  return r.length <= 0 ? 0 : r[r.length - 1]
}

function gformCalculateProductPrice(a, e) {
  var r = "_" + a + "_" + e;
  jQuery(".gfield_option" + r + ", .gfield_shipping_" + a).find("select").each(function () {
    var e = jQuery(this),
      t = gformGetPrice(e.val()),
      i = e.attr("id").split("_")[2];
    e.children("option").each(function () {
      var e = jQuery(this),
        r = gformGetOptionLabel(e, e.val(), t, a, i);
      e.html(r)
    })
  }), jQuery(".gfield_option" + r).find(".gfield_checkbox").find("input:checkbox").each(function () {
    var e = jQuery(this),
      r = e.attr("id"),
      t = r.split("_")[2],
      i = r.replace("choice_", "#label_"),
      n = jQuery(i),
      o = gformGetOptionLabel(n, e.val(), 0, a, t);
    n.html(o)
  }), jQuery(".gfield_option" + r + ", .gfield_shipping_" + a).find(".gfield_radio").each(function () {
    var n = 0,
      e = jQuery(this),
      o = e.attr("id").split("_")[2],
      r = e.find("input:radio:checked").val();
    r && (n = gformGetPrice(r)), e.find("input:radio").each(function () {
      var e = jQuery(this),
        r = e.attr("id").replace("choice_", "#label_"),
        t = jQuery(r);
      if (t) {
        var i = gformGetOptionLabel(t, e.val(), n, a, o);
        t.html(i)
      }
    })
  });
  var t = gformGetBasePrice(a, e),
    i = gformGetProductQuantity(a, e);
  return 0 < i && (jQuery(".gfield_option" + r).find("input:checked, select").each(function () {
    gformIsHidden(jQuery(this)) || (t += gformGetPrice(jQuery(this).val()))
  }), _anyProductSelected = !0), t = gformRoundPrice(t *= i)
}

function gformGetProductQuantity(e, r) {
  if (!gformIsProductSelected(e, r)) return 0;
  var t, i, n = jQuery("#ginput_quantity_" + e + "_" + r);
  if (gformIsHidden(n)) return 0;
  0 < n.length ? t = n.val() : (t = 1, 0 < (n = jQuery(".gfield_quantity_" + e + "_" + r + " :input")).length && (t = n.val(), i = gf_get_field_number_format(gf_get_input_id_by_html_id(n.attr("id")), e, "value")));
  return t = (t = gformCleanNumber(t, "", "", gformGetDecimalSeparator(i = i || "currency"))) || 0
}

function gformIsProductSelected(e, r) {
  var t = "_" + e + "_" + r,
    i = jQuery("#ginput_base_price" + t + ", .gfield_donation" + t + ' input[type="text"], .gfield_product' + t + " .ginput_amount");
  return !(!i.val() || gformIsHidden(i)) || !(!(i = jQuery(".gfield_product" + t + " select, .gfield_product" + t + " input:checked, .gfield_donation" + t + " select, .gfield_donation" + t + " input:checked")).val() || gformIsHidden(i))
}

function gformGetBasePrice(e, r) {
  var t = "_" + e + "_" + r,
    i = 0,
    n = jQuery("#ginput_base_price" + t + ", .gfield_donation" + t + ' input[type="text"], .gfield_product' + t + " .ginput_amount");
  if (0 < n.length) i = n.val(), gformIsHidden(n) && (i = 0);
  else {
    var o = (n = jQuery(".gfield_product" + t + " select, .gfield_product" + t + " input:checked, .gfield_donation" + t + " select, .gfield_donation" + t + " input:checked")).val();
    o && (i = 1 < (o = o.split("|")).length ? o[1] : 0), gformIsHidden(n) && (i = 0)
  }
  return !1 === (i = new Currency(gf_global.gf_currency_config).toNumber(i)) ? 0 : i
}

function gformFormatMoney(e, r) {
  return gf_global.gf_currency_config ? new Currency(gf_global.gf_currency_config).toMoney(e, r) : e
}

function gformFormatPricingField(e) {
  if (gf_global.gf_currency_config) {
    var r = new Currency(gf_global.gf_currency_config).toMoney(jQuery(e).val());
    jQuery(e).val(r)
  }
}

function gformToNumber(e) {
  return new Currency(gf_global.gf_currency_config).toNumber(e)
}

function gformGetPriceDifference(e, r) {
  var t = parseFloat(r) - parseFloat(e);
  return price = gformFormatMoney(t, !0), 0 < t && (price = "+" + price), price
}

function gformGetOptionLabel(e, r, t, i, n) {
  e = jQuery(e);
  var o = gformGetPrice(r),
    a = e.attr("price"),
    l = e.html().replace(/<span(.*)<\/span>/i, "").replace(a, ""),
    f = gformGetPriceDifference(t, o);
  f = 0 == gformToNumber(f) ? "" : " " + f, e.attr("price", f);
  var s = "option" == e[0].tagName.toLowerCase() ? " " + f : "<span class='ginput_price'>" + f + "</span>",
    d = l + s;
  return window.gform_format_option_label && (d = gform_format_option_label(d, l, s, t, o, i, n)), d
}

function gformGetProductIds(e, r) {
  for (var t = jQuery(r).hasClass(e) ? jQuery(r).attr("class").split(" ") : jQuery(r).parents("." + e).attr("class").split(" "), i = 0; i < t.length; i++)
    if (t[i].substr(0, e.length) == e && t[i] != e) return {
      formId: t[i].split("_")[2],
      productFieldId: t[i].split("_")[3]
    };
  return {
    formId: 0,
    fieldId: 0
  }
}

function gformGetPrice(e) {
  var r = e.split("|"),
    t = new Currency(gf_global.gf_currency_config);
  return 1 < r.length && !1 !== t.toNumber(r[1]) ? t.toNumber(r[1]) : 0
}

function gformRoundPrice(e) {
  var r = new Currency(gf_global.gf_currency_config),
    t = r.numberFormat(e, r.currency.decimals, ".", "");
  return parseFloat(t)
}

function gformRegisterPriceField(e) {
  _gformPriceFields[e.formId] || (_gformPriceFields[e.formId] = new Array);
  for (var r = 0; r < _gformPriceFields[e.formId].length; r++)
    if (_gformPriceFields[e.formId][r] == e.productFieldId) return;
  _gformPriceFields[e.formId].push(e.productFieldId)
}

function gformInitPriceFields() {
  for (formId in jQuery(".gfield_price").each(function () {
      gformRegisterPriceField(gformGetProductIds("gfield_price", this)), jQuery(this).on("change", 'input[type="text"], input[type="number"], select', function () {
        var e = gformGetProductIds("gfield_price", this);
        0 == e.formId && (e = gformGetProductIds("gfield_shipping", this)), jQuery(document).trigger("gform_price_change", [e, this]), gformCalculateTotalPrice(e.formId)
      }), jQuery(this).on("click", 'input[type="radio"], input[type="checkbox"]', function () {
        var e = gformGetProductIds("gfield_price", this);
        0 == e.formId && (e = gformGetProductIds("gfield_shipping", this)), jQuery(document).trigger("gform_price_change", [e, this]), gformCalculateTotalPrice(e.formId)
      })
    }), _gformPriceFields) _gformPriceFields.hasOwnProperty(formId) && gformCalculateTotalPrice(formId)
}

function gformShowPasswordStrength(e) {
  var r = gformPasswordStrength(document.getElementById(e).value, document.getElementById(e + "_2") ? document.getElementById(e + "_2").value : ""),
    t = window.gf_text["password_" + r],
    i = "unknown" === r ? "blank" : r;
  jQuery("#" + e + "_strength").val(r), jQuery("#" + e + "_strength_indicator").removeClass("blank mismatch short good bad strong").addClass(i).html(t)
}

function gformPasswordStrength(e, r) {
  if (e.length <= 0) return "blank";
  switch (wp.passwordStrength.meter(e, wp.passwordStrength.userInputBlacklist(), r)) {
    case -1:
      return "unknown";
    case 2:
      return "bad";
    case 3:
      return "good";
    case 4:
      return "strong";
    case 5:
      return "mismatch";
    default:
      return "short"
  }
}

function gformToggleShowPassword(e) {
  var r = jQuery("#" + e),
    t = r.parent().find("button"),
    i = t.find("span");
  switch (r.attr("type")) {
    case "password":
      r.attr("type", "text"), t.attr("label", t.attr("data-label-hide")), i.removeClass("dashicons-hidden").addClass("dashicons-visibility");
      break;
    case "text":
      r.attr("type", "password"), t.attr("label", t.attr("data-label-show")), i.removeClass("dashicons-visibility").addClass("dashicons-hidden")
  }
}

function gformToggleCheckboxes(e) {
  var r = jQuery(e).parent(),
    t = r.find("label"),
    i = r.parent().find("li:not( .gchoice_select_all )"),
    n = gf_get_form_id_by_html_id(r.parents(".gfield").attr("id")),
    o = rgars(window, "gf_global/gfcalc/" + n);
  i.each(function () {
    jQuery('input[type="checkbox"]', this).prop("checked", e.checked).trigger("change"), "function" == typeof jQuery('input[type="checkbox"]', this)[0].onclick && jQuery('input[type="checkbox"]', this)[0].onclick()
  }), e.checked ? t.html(t.data("label-deselect")) : t.html(t.data("label-select")), o && o.runCalcs(n, o.formulaFields)
}

function gformAddListItem(e, r) {
  var t = jQuery(e);
  if (!t.hasClass("gfield_icon_disabled")) {
    var i = t.parents(".gfield_list_group"),
      n = i.clone(),
      o = i.parents(".gfield_list_container"),
      a = n.find(":input:last").attr("tabindex");
    n.find("input, select, textarea").attr("tabindex", a).not(":checkbox, :radio").val(""), n.find(":checkbox, :radio").prop("checked", !1), n = gform.applyFilters("gform_list_item_pre_add", n, i), i.after(n), gformToggleIcons(o, r), gformAdjustClasses(o), gform.doAction("gform_list_post_item_add", n, o)
  }
}

function gformDeleteListItem(e, r) {
  var t = jQuery(e).parents(".gfield_list_group"),
    i = t.parents(".gfield_list_container");
  t.remove(), gformToggleIcons(i, r), gformAdjustClasses(i), gform.doAction("gform_list_post_item_delete", i)
}

function gformAdjustClasses(e) {
  e.find(".gfield_list_group").each(function (e) {
    var r = (e + 1) % 2 == 0 ? "gfield_list_row_even" : "gfield_list_row_odd";
    jQuery(this).removeClass("gfield_list_row_odd gfield_list_row_even").addClass(r)
  })
}

function gformToggleIcons(e, r) {
  var t = e.find(".gfield_list_group").length,
    i = e.find(".add_list_item");
  e.find(".delete_list_item").css("visibility", 1 == t ? "hidden" : "visible"), 0 < r && r <= t ? (i.data("title", e.find(".add_list_item").attr("title")), i.addClass("gfield_icon_disabled").attr("title", "")) : 0 < r && (i.removeClass("gfield_icon_disabled"), i.data("title") && i.attr("title", i.data("title")))
}

function gformAddRepeaterItem(e, r) {
  var t = jQuery(e);
  if (!t.hasClass("gfield_icon_disabled")) {
    var i = t.closest(".gfield_repeater_item"),
      n = i.clone(),
      o = i.closest(".gfield_repeater_container"),
      a = n.find(":input:last").attr("tabindex");
    n.find('input[type!="hidden"], select, textarea').attr("tabindex", a).not(":checkbox, :radio").val(""), n.find(":checkbox, :radio").prop("checked", !1), n.find(".validation_message").remove(), n = gform.applyFilters("gform_repeater_item_pre_add", n, i), i.after(n), n.children(".gfield_repeater_cell").each(function () {
      var e = jQuery(this).find(".gfield_repeater_container").first();
      0 < e.length && (resetContainerItems = function (e) {
        e.children(".gfield_repeater_items").children(".gfield_repeater_item").each(function (e) {
          jQuery(this).children(".gfield_repeater_cell").each(function () {
            var e = jQuery(this).find(".gfield_repeater_container").first();
            0 < e.length && resetContainerItems(e)
          })
        }), e.children(".gfield_repeater_items").children(".gfield_repeater_item").not(":first").remove()
      }, resetContainerItems(e))
    }), gformResetRepeaterAttributes(o), "function" == typeof gformInitDatepicker && (o.find(".ui-datepicker-trigger").remove(), o.find(".hasDatepicker").removeClass("hasDatepicker"), gformInitDatepicker()), gformBindFormatPricingFields(), gformToggleRepeaterButtons(o, r), gform.doAction("gform_repeater_post_item_add", n, o)
  }
}

function gformDeleteRepeaterItem(e, r) {
  var t = jQuery(e).closest(".gfield_repeater_item"),
    i = t.closest(".gfield_repeater_container");
  t.remove(), gformResetRepeaterAttributes(i), gformToggleRepeaterButtons(i, r), gform.doAction("gform_repeater_post_item_delete", i)
}

function gformResetRepeaterAttributes(e, p, h) {
  var y = null;
  void 0 === p && (p = 0), void 0 === h && (h = 0), e.children(".gfield_repeater_items").children(".gfield_repeater_item").each(function () {
    jQuery(this).children(".gfield_repeater_cell").each(function () {
      var m = jQuery(this),
        e = jQuery(this).find(".gfield_repeater_container").first();
      0 < e.length ? gformResetRepeaterAttributes(e, p + 1, h) : jQuery(this).find("input, select, textarea, :checkbox, :radio").each(function () {
        var e = jQuery(this),
          r = e.attr("name");
        if (void 0 !== r) {
          var t = /^(input_[^\[]*)((\[[0-9]+\])+)/.exec(r);
          if (t) {
            t[1];
            for (var i = t[2], n = /\[([0-9]+)\]/g, o = [], a = n.exec(i); null != a;) o.push(a[1]), a = n.exec(i);
            for (var l = t[1], f = "", s = (o = o.reverse()).length - 1; 0 <= s; s--) s == p ? (l += "[" + h + "]", f += "-" + h) : (l += "[" + o[s] + "]", f += "-" + o[s]);
            var d = e.attr("id"),
              c = m.find("label[for='" + d + "']");
            if (d) {
              var u = d.match(/((choice|input)_[0-9|_]*)-/);
              u && u[2] && (f = u[1] + f, c.attr("for", f), e.attr("id", f))
            }
            var g = r.replace(t[0], l),
              _ = jQuery('input[name="' + g + '"]').is(":checked");
            e.is(":radio") && e.is(":checked") && r !== g && _ && (null !== y && y.prop("checked", !0), e.prop("checked", !1), y = e), e.attr("name", g)
          }
        }
      })
    }), 0 === p && h++
  }), null !== y && (y.prop("checked", !0), y = null)
}

function gformToggleRepeaterButtons(e) {
  var r = e.closest(".gfield_repeater_wrapper").data("max_items"),
    t = e.children(".gfield_repeater_items").children(".gfield_repeater_item").length,
    i = e.children(".gfield_repeater_items").children(".gfield_repeater_item").children(".gfield_repeater_buttons"),
    n = i.children(".add_repeater_item");
  i.children(".remove_repeater_item").css("visibility", 1 == t ? "hidden" : "visible"), 0 < r && r <= t ? (n.data("title", i.children(".add_repeater_item").attr("title")), n.addClass("gfield_icon_disabled").attr("title", "")) : 0 < r && (n.removeClass("gfield_icon_disabled"), n.data("title") && n.attr("title", n.data("title"))), e.children(".gfield_repeater_items").children(".gfield_repeater_item").children(".gfield_repeater_cell").each(function (e) {
    var r = jQuery(this).find(".gfield_repeater_container").first();
    0 < r.length && gformToggleRepeaterButtons(r)
  })
}

function gformMatchCard(e) {
  var r = gformFindCardType(jQuery("#" + e).val()),
    t = jQuery("#" + e).parents(".gfield").find(".gform_card_icon_container");
  r ? (jQuery(t).find(".gform_card_icon").removeClass("gform_card_icon_selected").addClass("gform_card_icon_inactive"), jQuery(t).find(".gform_card_icon_" + r).removeClass("gform_card_icon_inactive").addClass("gform_card_icon_selected")) : jQuery(t).find(".gform_card_icon").removeClass("gform_card_icon_selected gform_card_icon_inactive")
}

function gformFindCardType(e) {
  if (e.length < 4) return !1;
  var r = window.gf_cc_rules,
    t = new Array;
  for (type in r)
    if (r.hasOwnProperty(type))
      for (i in r[type])
        if (r[type].hasOwnProperty(i) && 0 === r[type][i].indexOf(e.substring(0, r[type][i].length))) {
          t[t.length] = type;
          break
        } return 1 == t.length && t[0].toLowerCase()
}

function gformToggleCreditCard() {
  jQuery("#gform_payment_method_creditcard").is(":checked") ? jQuery(".gform_card_fields_container").slideDown() : jQuery(".gform_card_fields_container").slideUp()
}

function gformInitChosenFields(e, t) {
  return jQuery(e).each(function () {
    var e = jQuery(this);
    if ("rtl" == jQuery("html").attr("dir") && e.addClass("chosen-rtl chzn-rtl"), e.is(":visible") && 0 == e.siblings(".chosen-container").length) {
      var r = gform.applyFilters("gform_chosen_options", {
        no_results_text: t
      }, e);
      e.chosen(r)
    }
  })
}

function gformInitCurrencyFormatFields(e) {
  jQuery(e).each(function () {
    jQuery(this).val(gformFormatMoney(jQuery(this).val()))
  }).change(function (e) {
    jQuery(this).val(gformFormatMoney(jQuery(this).val()))
  })
}
var GFMergeTag = function () {
  GFMergeTag.getMergeTagValue = function (e, r, t) {
    void 0 === t && (t = ""), t = t.replace(":", "");
    var i, n = parseInt(r, 10),
      o = jQuery("#field_" + e + "_" + n),
      a = n == r ? 'input[name^="input_' + n + '"]' : 'input[name="input_' + r + '"]',
      l = o.find(a + ', select[name^="input_' + r + '"], textarea[name="input_' + r + '"]');
    if (!(!window.gf_check_field_rule || "show" == gf_check_field_rule(e, n, !0, ""))) return "";
    o.find(".ginput_container_email").hasClass("ginput_complex") && (l = l.first());
    var f = gform.applyFilters("gform_value_merge_tag_" + e + "_" + n, !1, l, t);
    if (!1 !== f) return f;
    switch (f = "", t) {
      case "label":
        return o.find(".gfield_label").text();
      case "qty":
        if (o.hasClass("gfield_price")) return !1 === (i = gformGetProductQuantity(e, n)) || "" === i ? 0 : i
    }
    if ("checkbox" !== l.prop("type") && "radio" !== l.prop("type") || (l = l.filter(":checked")), 1 === l.length) {
      if (!l.is("select") && "radio" !== l.prop("type") && "checkbox" !== l.prop("type") || "" !== t) void 0 === i && (i = l.val());
      else if ((i = l.is("select") ? l.find("option:selected") : l.next("label").clone()).find("span").remove(), 1 === i.length) i = i.text();
      else {
        for (var s = [], d = 0; d < i.length; d++) s[d] = jQuery(i[d]).text();
        i = s
      }
      f = jQuery.isArray(i) ? i.join(", ") : "string" == typeof i ? GFMergeTag.formatValue(i, t) : ""
    } else if (1 < l.length) {
      i = [];
      for (d = 0; d < l.length; d++)
        if ("checkbox" === l.prop("type") && "" === t) {
          var c = jQuery(l[d]).next("label").clone();
          c.find("span").remove(), i[d] = GFMergeTag.formatValue(c.text(), t), c.remove()
        } else i[d] = GFMergeTag.formatValue(jQuery(l[d]).val(), t);
      f = i.join(", ")
    }
    return f
  }, GFMergeTag.replaceMergeTags = function (e, r) {
    var t = GFMergeTag.parseMergeTags(r);
    for (i in t)
      if (t.hasOwnProperty(i)) {
        var n = t[i][1],
          o = (parseInt(n, 10), null == t[i][3] ? "" : t[i][3].replace(":", "")),
          a = GFMergeTag.getMergeTagValue(e, n, o);
        r = r.replace(t[i][0], a)
      } return r
  }, GFMergeTag.formatValue = function (e, r) {
    var t = "";
    switch (t = 1 < (e = e.split("|")).length && ("price" === r || "currency" === r) ? gformToNumber(e[1]) : e[0], r) {
      case "price":
        t = !1 === (t = gformToNumber(t)) ? "" : t;
        break;
      case "currency":
        t = !1 === (t = gformFormatMoney(t, !1)) ? "" : t;
        break;
      case "numeric":
        return !1 === (t = gformToNumber(t)) ? 0 : t
    }
    return t
  }, GFMergeTag.parseMergeTags = function (e, r) {
    void 0 === r && (r = /{[^{]*?:(\d+(\.\d+)?)(:(.*?))?}/i);
    for (var t = []; r.test(e);) {
      var i = t.length;
      t[i] = r.exec(e), e = e.replace("" + t[i][0], "")
    }
    return t
  }
};
new GFMergeTag;
var GFCalc = function (formId, formulaFields) {
  this.formId = formId, this.formulaFields = formulaFields, this.exprPatt = /^[0-9 -/*\(\)]+$/i, this.isCalculating = {}, this.init = function (e, r) {
    var t = this;
    jQuery(document).bind("gform_post_conditional_logic", function () {
      t.runCalcs(e, r)
    });
    for (var i = 0; i < r.length; i++) {
      var n = jQuery.extend({}, r[i]);
      this.runCalc(n, e), this.bindCalcEvents(n, e)
    }
  }, this.runCalc = function (formulaField, formId) {
    var calcObj = this,
      field = jQuery("#field_" + formId + "_" + formulaField.field_id),
      formulaInput = field.hasClass("gfield_price") ? jQuery("#ginput_base_price_" + formId + "_" + formulaField.field_id) : jQuery("#input_" + formId + "_" + formulaField.field_id),
      previous_val = formulaInput.val(),
      formula = gform.applyFilters("gform_calculation_formula", formulaField.formula, formulaField, formId, calcObj),
      expr = calcObj.replaceFieldTags(formId, formula, formulaField).replace(/(\r\n|\n|\r)/gm, ""),
      result = "";
    if (calcObj.exprPatt.test(expr)) try {
      result = eval(expr)
    } catch (e) {}
    isFinite(result) || (result = 0), window.gform_calculation_result && (result = window.gform_calculation_result(result, formulaField, formId, calcObj), window.console && console.log('"gform_calculation_result" function is deprecated since version 1.8! Use "gform_calculation_result" JS hook instead.')), result = gform.applyFilters("gform_calculation_result", result, formulaField, formId, calcObj);
    var formattedResult = gform.applyFilters("gform_calculation_format_result", !1, result, formulaField, formId, calcObj),
      numberFormat = gf_get_field_number_format(formulaField.field_id, formId);
    if (!1 !== formattedResult) result = formattedResult;
    else if (field.hasClass("gfield_price") || "currency" == numberFormat) result = gformFormatMoney(result || 0, !0);
    else {
      var decimalSeparator = ".",
        thousandSeparator = ",";
      "decimal_comma" == numberFormat && (decimalSeparator = ",", thousandSeparator = "."), result = gformFormatNumber(result, gformIsNumber(formulaField.rounding) ? formulaField.rounding : -1, decimalSeparator, thousandSeparator)
    }
    result != previous_val && (field.hasClass("gfield_price") ? (jQuery("#input_" + formId + "_" + formulaField.field_id).text(result), formulaInput.val(result).trigger("change"), gformCalculateTotalPrice(formId)) : formulaInput.val(result).trigger("change"))
  }, this.runCalcs = function (e, r) {
    for (var t = 0; t < r.length; t++) {
      var i = jQuery.extend({}, r[t]);
      this.runCalc(i, e)
    }
  }, this.bindCalcEvents = function (e, r) {
    var t = this,
      i = e.field_id,
      n = GFMergeTag.parseMergeTags(e.formula);
    for (var o in t.isCalculating[i] = !1, n)
      if (n.hasOwnProperty(o)) {
        var a = n[o][1],
          l = parseInt(a, 10),
          f = jQuery("#field_" + r + "_" + l).find('input[name="input_' + a + '"], select[name="input_' + a + '"]');
        "checkbox" == f.prop("type") || "radio" == f.prop("type") ? jQuery(f).click(function () {
          t.bindCalcEvent(a, e, r, 0)
        }) : f.is("select") || "hidden" == f.prop("type") ? jQuery(f).change(function () {
          t.bindCalcEvent(a, e, r, 0)
        }) : jQuery(f).keydown(function () {
          t.bindCalcEvent(a, e, r)
        }).change(function () {
          t.bindCalcEvent(a, e, r, 0)
        }), gform.doAction("gform_post_calculation_events", n[o], e, r, t)
      }
  }, this.bindCalcEvent = function (e, r, t, i) {
    var n = this,
      o = r.field_id;
    i = null == i ? 345 : i, n.isCalculating[o][e] && clearTimeout(n.isCalculating[o][e]), n.isCalculating[o][e] = window.setTimeout(function () {
      n.runCalc(r, t)
    }, i)
  }, this.replaceFieldTags = function (e, r, t) {
    var n = GFMergeTag.parseMergeTags(r);
    for (i in n)
      if (n.hasOwnProperty(i)) {
        var o = n[i][1],
          a = parseInt(o, 10),
          l = "value";
        if (n[i][3]) l = n[i][3];
        else {
          var f = jQuery(".gfield_price input[name=input_" + a + "]").is("input[type=radio]"),
            s = 0 < jQuery(".gfield_price select[name=input_" + a + "]").length,
            d = jQuery('.gfield_price input[name="input_' + o + '"]').is("input[type=checkbox]");
          (s || f || d) && (l = "price")
        }
        var c = !window.gf_check_field_rule || "show" == gf_check_field_rule(e, a, !0, ""),
          u = c ? GFMergeTag.getMergeTagValue(e, o, l) : 0;
        u = gform.applyFilters("gform_merge_tag_value_pre_calculation", u, n[i], c, t, e), u = this.cleanNumber(u, e, a, t), r = r.replace(n[i][0], u)
      } return r
  }, this.cleanNumber = function (e, r, t, i) {
    var n = gf_get_field_number_format(t, r);
    return e = (e = gformCleanNumber(e, "", "", gformGetDecimalSeparator(n = n || gf_get_field_number_format(i.field_id, r)))) || 0
  }, this.init(formId, formulaFields)
};

function gformFormatNumber(e, r, t, i) {
  void 0 === t && (t = window.gf_global ? new Currency(gf_global.gf_currency_config).currency.decimal_separator : ".");
  void 0 === i && (i = window.gf_global ? new Currency(gf_global.gf_currency_config).currency.thousand_separator : ",");
  return (new Currency).numberFormat(e, r, t, i, !1)
}

function gformToNumber(e) {
  return new Currency(gf_global.gf_currency_config).toNumber(e)
}

function getMatchGroups(e, r) {
  for (var t = new Array; r.test(e);) {
    var i = t.length;
    t[i] = r.exec(e), e = e.replace("" + t[i][0], "")
  }
  return t
}

function gf_get_field_number_format(e, r, t) {
  var i = rgars(window, "gf_global/number_formats/{0}/{1}".format(r, e)),
    n = !1;
  return "" === i ? n : n = void 0 === t ? !1 !== i.price ? i.price : i.value : i[t]
}
var gform = {
    hooks: {
      action: {},
      filter: {}
    },
    addAction: function (e, r, t, i) {
      gform.addHook("action", e, r, t, i)
    },
    addFilter: function (e, r, t, i) {
      gform.addHook("filter", e, r, t, i)
    },
    doAction: function (e) {
      gform.doHook("action", e, arguments)
    },
    applyFilters: function (e) {
      return gform.doHook("filter", e, arguments)
    },
    removeAction: function (e, r) {
      gform.removeHook("action", e, r)
    },
    removeFilter: function (e, r, t) {
      gform.removeHook("filter", e, r, t)
    },
    addHook: function (e, r, t, i, n) {
      null == gform.hooks[e][r] && (gform.hooks[e][r] = []);
      var o = gform.hooks[e][r];
      null == n && (n = r + "_" + o.length), null == i && (i = 10), gform.hooks[e][r].push({
        tag: n,
        callable: t,
        priority: i
      })
    },
    doHook: function (e, r, t) {
      if (t = Array.prototype.slice.call(t, 1), null != gform.hooks[e][r]) {
        var i, n = gform.hooks[e][r];
        n.sort(function (e, r) {
          return e.priority - r.priority
        });
        for (var o = 0; o < n.length; o++) "function" != typeof (i = n[o].callable) && (i = window[i]), "action" == e ? i.apply(null, t) : t[0] = i.apply(null, t)
      }
      if ("filter" == e) return t[0]
    },
    removeHook: function (e, r, t, i) {
      if (null != gform.hooks[e][r])
        for (var n = gform.hooks[e][r], o = n.length - 1; 0 <= o; o--) null != i && i != n[o].tag || null != t && t != n[o].priority || n.splice(o, 1)
    }
  },
  __gf_keyup_timeout;

function renderRecaptcha() {
  jQuery(".ginput_recaptcha").each(function () {
    var r = jQuery(this),
      e = {
        sitekey: r.data("sitekey"),
        theme: r.data("theme"),
        tabindex: r.data("tabindex")
      };
    if (r.is(":empty")) {
      r.data("stoken") && (e.stoken = r.data("stoken"));
      var t = !1;
      "invisible" == r.data("size") && (t = function (e) {
        e && r.closest("form").submit()
      }), (t = gform.applyFilters("gform_recaptcha_callback", t, r)) && (e.callback = t), r.data("widget-id", grecaptcha.render(this.id, e)), e.tabindex && r.find("iframe").attr("tabindex", e.tabindex), gform.doAction("gform_post_recaptcha_render", r)
    }
  })
}

function gformValidateFileSize(e, r) {
  var t;
  if (t = 0 < jQuery(e).closest("div").siblings(".validation_message").length ? jQuery(e).closest("div").siblings(".validation_message") : jQuery(e).siblings(".validation_message"), window.FileReader && window.File && window.FileList && window.Blob) {
    var i = e.files[0];
    i && i.size > r ? t.text(i.name + " - " + gform_gravityforms.strings.file_exceeds_limit) : t.text("")
  }
}

function gformInitSpinner(e, r) {
  jQuery("#gform_" + e).submit(function () {
    gformAddSpinner(e, r)
  })
}

function gformAddSpinner(e, r) {
  void 0 !== r && r || (r = gform.applyFilters("gform_spinner_url", gf_global.spinnerUrl, e)), 0 == jQuery("#gform_ajax_spinner_" + e).length && gform.applyFilters("gform_spinner_target_elem", jQuery("#gform_submit_button_" + e + ", #gform_wrapper_" + e + " .gform_next_button, #gform_send_resume_link_button_" + e), e).after('<img id="gform_ajax_spinner_' + e + '"  class="gform_ajax_spinner" src="' + r + '" alt="" />')
}

function gf_raw_input_change(e, r) {
  clearTimeout(__gf_keyup_timeout);
  var t = jQuery(r),
    i = t.attr("id"),
    n = gf_get_input_id_by_html_id(i),
    o = gf_get_form_id_by_html_id(i),
    a = gform.applyFilters("gform_field_meta_raw_input_change", {
      fieldId: n,
      formId: o
    }, t, e);
  if (n = a.fieldId, o = a.formId, n) {
    var l = t.is(":checkbox") || t.is(":radio") || t.is("select"),
      f = !l || t.is("textarea");
    "keyup" == e.type && !f || "change" == e.type && !l && !f || ("keyup" == e.type ? __gf_keyup_timeout = setTimeout(function () {
      gf_input_change(r, o, n)
    }, 300) : gf_input_change(r, o, n))
  }
}

function gf_get_input_id_by_html_id(e) {
  var r = gf_get_ids_by_html_id(e),
    t = r[r.length - 1];
  return 3 == r.length && (r.shift(), t = r.join(".")), t
}

function gf_get_form_id_by_html_id(e) {
  return gf_get_ids_by_html_id(e)[0]
}

function gf_get_ids_by_html_id(e) {
  for (var r = e ? e.split("_") : [], t = r.length - 1; 0 <= t; t--) gformIsNumber(r[t]) || r.splice(t, 1);
  return r
}

function gf_input_change(e, r, t) {
  gform.doAction("gform_input_change", e, r, t)
}

function gformExtractFieldId(e) {
  var r = parseInt(e.toString().split(".")[0], 10);
  return r || e
}

function gformExtractInputIndex(e) {
  var r = parseInt(e.toString().split(".")[1], 10);
  return r || !1
}
if (! function (h, y) {
    h.uploaders = {};
    var v = "undefined" != typeof gform_gravityforms ? gform_gravityforms.strings : {},
      b = "undefined" != typeof gform_gravityforms ? gform_gravityforms.vars.images_url : "";

    function i(e) {
      var d, i, r = y(e).data("settings"),
        t = new plupload.Uploader(r);

      function c(e, r) {
        y("#" + e).prepend("<li>" + F(r) + "</li>")
      }

      function u(e) {
        var r, t, i = parseInt(e.gf_vars.max_files, 10);
        if (0 < i) {
          var n = i <= m(e.multipart_params.field_id);
          h.toggleDisabled(e, n), n || (r = e.gf_vars.message_id, t = v.max_reached, y("#" + r + " li:contains('" + t + "')").remove())
        }
      }

      function g() {
        var e;
        return e = void 0 === (e = y("#gform_uploaded_files_" + d).val()) || "" === e ? {} : y.parseJSON(e)
      }

      function _(e) {
        var r = g(),
          t = p(e);
        return void 0 === r[t] && (r[t] = []), r[t]
      }

      function m(e) {
        return _(e).length
      }

      function p(e) {
        return "input_" + e
      }

      function n(e) {
        e.preventDefault()
      }
      d = t.settings.multipart_params.form_id, (h.uploaders[r.container] = t).bind("Init", function (e, r) {
        e.features.dragdrop || y(".gform_drop_instructions").hide(), u(e.settings)
      }), h.toggleDisabled = function (e, r) {
        ("string" == typeof e.browse_button ? y("#" + e.browse_button) : y(e.browse_button)).prop("disabled", r)
      }, t.init(), t.bind("BeforeUpload", function (e, r) {
        e.settings.multipart_params.original_filename = r.name
      }), t.bind("FilesAdded", function (o, e) {
        var a, l = parseInt(o.settings.gf_vars.max_files, 10),
          f = m(o.settings.multipart_params.field_id),
          s = o.settings.gf_vars.disallowed_extensions;
        if (0 < l && l <= f) y.each(e, function (e, r) {
          o.removeFile(r)
        });
        else {
          y.each(e, function (e, r) {
            if (a = r.name.split(".").pop(), -1 < y.inArray(a, s)) return c(o.settings.gf_vars.message_id, r.name + " - " + v.illegal_extension), void o.removeFile(r);
            if (r.status == plupload.FAILED || 0 < l && l <= f) o.removeFile(r);
            else {
              var t = void 0 !== r.size ? plupload.formatSize(r.size) : v.in_progress,
                i = "$this=jQuery(this); var uploader = gfMultiFileUploader.uploaders." + o.settings.container.id + ";uploader.stop();uploader.removeFile(uploader.getFile('" + r.id + "'));$this.after('" + v.cancelled + "'); uploader.start();$this.remove();",
                n = '<div id="{0}" class="ginput_preview">{1} ({2}) <b></b> <a href="javascript:void(0)" title="{3}" onclick="{4}" onkeypress="{4}">{5}</a></div>';
              n = gform.applyFilters("gform_file_upload_status_markup", n, r, t, v, i, o).format(r.id, F(r.name), t, v.cancel_upload, i, v.cancel), y("#" + o.settings.filelist).prepend(n), f++
            }
          }), o.refresh();
          var r = "input:hidden[name='gform_unique_id']",
            t = y("form#gform_" + d + " " + r);
          0 == t.length && (t = y(r)), "" === (i = t.val()) && (i = "xxxxxxxx".replace(/[xy]/g, function (e) {
            var r = 16 * Math.random() | 0;
            return ("x" == e ? r : 3 & r | 8).toString(16)
          }), t.val(i)), 0 < l && l <= f && (h.toggleDisabled(o.settings, !0), c(o.settings.gf_vars.message_id, v.max_reached)), o.settings.multipart_params.gform_unique_id = i, o.start()
        }
      }), t.bind("UploadProgress", function (e, r) {
        var t = r.percent + "%";
        y("#" + r.id + " b").html(t)
      }), t.bind("Error", function (e, r) {
        if (r.code === plupload.FILE_EXTENSION_ERROR) {
          var t = void 0 !== e.settings.filters.mime_types ? e.settings.filters.mime_types[0].extensions : e.settings.filters[0].extensions;
          c(e.settings.gf_vars.message_id, r.file.name + " - " + v.invalid_file_extension + " " + t)
        } else if (r.code === plupload.FILE_SIZE_ERROR) c(e.settings.gf_vars.message_id, r.file.name + " - " + v.file_exceeds_limit);
        else {
          var i = "Error: " + r.code + ", Message: " + r.message + (r.file ? ", File: " + r.file.name : "");
          c(e.settings.gf_vars.message_id, i)
        }
        y("#" + r.file.id).html(""), e.refresh()
      }), t.bind("ChunkUploaded", function (e, r, t) {
        var i = y.secureEvalJSON(t.response);
        "error" == i.status && (e.removeFile(r), c(e.settings.gf_vars.message_id, r.name + " - " + i.error.message), y("#" + r.id).html(""))
      }), t.bind("FileUploaded", function (e, r, t) {
        if (e.getFile(r.id)) {
          var i = y.secureEvalJSON(t.response);
          if ("error" == i.status) return c(e.settings.gf_vars.message_id, r.name + " - " + i.error.message), y("#" + r.id).html(""), void u(e.settings);
          var n, o, a, l = "<strong>" + F(r.name) + "</strong>",
            f = e.settings.multipart_params.form_id,
            s = e.settings.multipart_params.field_id;
          l = "<img class='gform_delete' src='" + b + "/delete.png' onclick='gformDeleteUploadedFile(" + f + "," + s + ", this);' onkeypress='gformDeleteUploadedFile(" + f + "," + s + ", this);' alt='" + v.delete_file + "' title='" + v.delete_file + "' /> " + l, l = gform.applyFilters("gform_file_upload_markup", l, r, e, v, b), y("#" + r.id).html(l), 100 == r.percent && (i.status && "ok" == i.status ? (n = s, o = i.data, (a = _(n)).unshift(o), function (e, r) {
            var t = g(),
              i = y("#gform_uploaded_files_" + d),
              n = p(e);
            t[n] = r, i.val(y.toJSON(t))
          }(n, a)) : c(e.settings.gf_vars.message_id, v.unknown_error + ": " + r.name))
        }
      }), t.bind("FilesRemoved", function (e, r) {
        u(e.settings)
      }), y("#" + r.drop_element).on({
        dragenter: n,
        dragover: n
      })
    }

    function F(e) {
      return y("<div/>").text(e).html()
    }
    y(document).bind("gform_post_render", function (e, r) {
      y("form#gform_" + r + " .gform_fileupload_multifile").each(function () {
        i(this)
      });
      var t = y("form#gform_" + r);
      0 < t.length && t.submit(function () {
        var t = !1;
        if (y.each(h.uploaders, function (e, r) {
            if (0 < r.total.queued) return !(t = !0)
          }), t) return alert(v.currently_uploading), window["gf_submitting_" + r] = !1, y("#gform_ajax_spinner_" + r).remove(), !1
      })
    }), y(document).bind("gform_post_conditional_logic", function (e, r, t, i) {
      i || y.each(h.uploaders, function (e, r) {
        r.refresh()
      })
    }), y(document).ready(function () {
      "undefined" != typeof adminpage && "toplevel_page_gf_edit_forms" === adminpage || "undefined" == typeof plupload ? y(".gform_button_select_files").prop("disabled", !0) : "undefined" != typeof adminpage && -1 < adminpage.indexOf("_page_gf_entries") && y(".gform_fileupload_multifile").each(function () {
        i(this)
      })
    }), h.setup = function (e) {
      i(e)
    }
  }(window.gfMultiFileUploader = window.gfMultiFileUploader || {}, jQuery), jQuery(document).on("change keyup", ".gfield input, .gfield select, .gfield textarea", function (e) {
    gf_raw_input_change(e, this)
  }), jQuery(document).on("submit.gravityforms", ".gform_wrapper form", function (e) {
    var r, t = jQuery(this).closest(".gform_wrapper"),
      i = t.attr("id").split("_")[2],
      n = 0 < t.find(".gform_page").length,
      o = parseInt(t.find('input[name^="gform_source_page_number_"]').val(), 10),
      a = parseInt(t.find('input[name^="gform_target_page_number_"]').val(), 10),
      l = 0 === a,
      f = !l && o < a,
      s = "1" === jQuery("#gform_save_" + i).val();
    if (n) {
      var d = f ? "next" : "submit";
      r = t.find(".gform_page:visible").find('.gform_page_footer [id^="gform_' + d + '_button_"]')
    } else r = t.find("#gform_submit_button_" + i);
    var c = !r.is(":visible");
    if (!s && (l || f) && c) window["gf_submitting_" + i] = !1, t.find(".gform_ajax_spinner").remove(), e.preventDefault();
    else if (l || l) {
      var u = t.find(".ginput_recaptcha");
      if (0 !== u.length && "invisible" === u.data("size")) {
        var g = t.find('input[name="g-recaptcha-response"]');
        0 === g.length && (g = u.find(".g-recaptcha-response")), g.val() || (grecaptcha.execute(u.data("widget-id")), window["gf_submitting_" + i] = !1, e.preventDefault())
      }
    }
  }), !window.rgars)
function rgars(e, r) {
  for (var t = r.split("/"), i = e, n = 0; n < t.length; n++) i = rgar(i, t[n]);
  return i
}
if (!window.rgar)
function rgar(e, r) {
  return void 0 !== e[r] ? e[r] : ""
}
String.prototype.format = function () {
  var t = arguments;
  return this.replace(/{(\d+)}/g, function (e, r) {
    return void 0 !== t[r] ? t[r] : e
  })
};

(function (t) {
  "use strict";

  function e(t, e, r) {
    return t.addEventListener ? t.addEventListener(e, r, !1) : t.attachEvent ? t.attachEvent("on" + e, r) : void 0
  }

  function r(t, e) {
    var r, n;
    for (r = 0, n = t.length; n > r; r++)
      if (t[r] === e) return !0;
    return !1
  }

  function n(t, e) {
    var r;
    t.createTextRange ? (r = t.createTextRange(), r.move("character", e), r.select()) : t.selectionStart && (t.focus(), t.setSelectionRange(e, e))
  }

  function a(t, e) {
    try {
      return t.type = e, !0
    } catch (r) {
      return !1
    }
  }
  t.Placeholders = {
    Utils: {
      addEventListener: e,
      inArray: r,
      moveCaret: n,
      changeType: a
    }
  }
})(this),
function (t) {
  "use strict";

  function e() {}

  function r() {
    try {
      return document.activeElement
    } catch (t) {}
  }

  function n(t, e) {
    var r, n, a = !!e && t.value !== e,
      u = t.value === t.getAttribute(V);
    return (a || u) && "true" === t.getAttribute(P) ? (t.removeAttribute(P), t.value = t.value.replace(t.getAttribute(V), ""), t.className = t.className.replace(R, ""), n = t.getAttribute(z), parseInt(n, 10) >= 0 && (t.setAttribute("maxLength", n), t.removeAttribute(z)), r = t.getAttribute(D), r && (t.type = r), !0) : !1
  }

  function a(t) {
    var e, r, n = t.getAttribute(V);
    return "" === t.value && n ? (t.setAttribute(P, "true"), t.value = n, t.className += " " + I, r = t.getAttribute(z), r || (t.setAttribute(z, t.maxLength), t.removeAttribute("maxLength")), e = t.getAttribute(D), e ? t.type = "text" : "password" === t.type && K.changeType(t, "text") && t.setAttribute(D, "password"), !0) : !1
  }

  function u(t, e) {
    var r, n, a, u, i, l, o;
    if (t && t.getAttribute(V)) e(t);
    else
      for (a = t ? t.getElementsByTagName("input") : f, u = t ? t.getElementsByTagName("textarea") : h, r = a ? a.length : 0, n = u ? u.length : 0, o = 0, l = r + n; l > o; o++) i = r > o ? a[o] : u[o - r], e(i)
  }

  function i(t) {
    u(t, n)
  }

  function l(t) {
    u(t, a)
  }

  function o(t) {
    return function () {
      b && t.value === t.getAttribute(V) && "true" === t.getAttribute(P) ? K.moveCaret(t, 0) : n(t)
    }
  }

  function c(t) {
    return function () {
      a(t)
    }
  }

  function s(t) {
    return function (e) {
      return A = t.value, "true" === t.getAttribute(P) && A === t.getAttribute(V) && K.inArray(C, e.keyCode) ? (e.preventDefault && e.preventDefault(), !1) : void 0
    }
  }

  function d(t) {
    return function () {
      n(t, A), "" === t.value && (t.blur(), K.moveCaret(t, 0))
    }
  }

  function v(t) {
    return function () {
      t === r() && t.value === t.getAttribute(V) && "true" === t.getAttribute(P) && K.moveCaret(t, 0)
    }
  }

  function g(t) {
    return function () {
      i(t)
    }
  }

  function p(t) {
    t.form && (T = t.form, "string" == typeof T && (T = document.getElementById(T)), T.getAttribute(U) || (K.addEventListener(T, "submit", g(T)), T.setAttribute(U, "true"))), K.addEventListener(t, "focus", o(t)), K.addEventListener(t, "blur", c(t)), b && (K.addEventListener(t, "keydown", s(t)), K.addEventListener(t, "keyup", d(t)), K.addEventListener(t, "click", v(t))), t.setAttribute(j, "true"), t.setAttribute(V, x), (b || t !== r()) && a(t)
  }
  var f, h, b, m, A, y, E, x, L, T, S, N, w, B = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
    C = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
    k = "#ccc",
    I = "placeholdersjs",
    R = RegExp("(?:^|\\s)" + I + "(?!\\S)"),
    V = "data-placeholder-value",
    P = "data-placeholder-active",
    D = "data-placeholder-type",
    U = "data-placeholder-submit",
    j = "data-placeholder-bound",
    q = "data-placeholder-focus",
    Q = "data-placeholder-live",
    z = "data-placeholder-maxlength",
    F = document.createElement("input"),
    G = document.getElementsByTagName("head")[0],
    H = document.documentElement,
    J = t.Placeholders,
    K = J.Utils;
  if (J.nativeSupport = void 0 !== F.placeholder, !J.nativeSupport) {
    for (f = document.getElementsByTagName("input"), h = document.getElementsByTagName("textarea"), b = "false" === H.getAttribute(q), m = "false" !== H.getAttribute(Q), y = document.createElement("style"), y.type = "text/css", E = document.createTextNode("." + I + " { color:" + k + "; }"), y.styleSheet ? y.styleSheet.cssText = E.nodeValue : y.appendChild(E), G.insertBefore(y, G.firstChild), w = 0, N = f.length + h.length; N > w; w++) S = f.length > w ? f[w] : h[w - f.length], x = S.attributes.placeholder, x && (x = x.nodeValue, x && K.inArray(B, S.type) && p(S));
    L = setInterval(function () {
      for (w = 0, N = f.length + h.length; N > w; w++) S = f.length > w ? f[w] : h[w - f.length], x = S.attributes.placeholder, x ? (x = x.nodeValue, x && K.inArray(B, S.type) && (S.getAttribute(j) || p(S), (x !== S.getAttribute(V) || "password" === S.type && !S.getAttribute(D)) && ("password" === S.type && !S.getAttribute(D) && K.changeType(S, "text") && S.setAttribute(D, "password"), S.value === S.getAttribute(V) && (S.value = x), S.setAttribute(V, x)))) : S.getAttribute(P) && (n(S), S.removeAttribute(V));
      m || clearInterval(L)
    }, 100)
  }
  K.addEventListener(t, "beforeunload", function () {
    J.disable()
  }), J.disable = J.nativeSupport ? e : i, J.enable = J.nativeSupport ? e : l
}(this),
function (t) {
  "use strict";
  var e = t.fn.val,
    r = t.fn.prop;
  Placeholders.nativeSupport || (t.fn.val = function (t) {
    var r = e.apply(this, arguments),
      n = this.eq(0).data("placeholder-value");
    return void 0 === t && this.eq(0).data("placeholder-active") && r === n ? "" : r
  }, t.fn.prop = function (t, e) {
    return void 0 === e && this.eq(0).data("placeholder-active") && "value" === t ? "" : r.apply(this, arguments)
  })
}(jQuery);
