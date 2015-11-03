/*
	--------------------------------
	Infinite Scroll
	--------------------------------
	+ https://github.com/paulirish/infinitescroll
	+ version 2.0b2.110713
	+ Copyright 2011 Paul Irish & Luke Shumard
	+ Licensed under the MIT license
	
	+ Documentation: http://infinite-scroll.com/
	
*/

(function(h, d, e) {
  d.infinitescroll = function(a, c, b) {
    this.element = d(b);
    this._create(a, c)
  };
  d.infinitescroll.defaults = {loading:{finished:e, finishedMsg:"<em>Congratulations, you've reached the end of the internet.</em>", img:"http://www.infinite-scroll.com/loading.gif", msg:null, msgText:"<em>次のページを読み込んでいます</em>", selector:null, speed:"fast", start:e}, state:{isDuringAjax:!1, isInvalidPage:!1, isDestroyed:!1, isDone:!1, isPaused:!1, currPage:1}, callback:e, debug:!1, behavior:e, binder:d(h), nextSelector:"div.navigation a:first", navSelector:"div.navigation", contentSelector:null, 
  extraScrollPx:150, itemSelector:"div.post", animate:!1, pathParse:e, dataType:"html", appendCallback:!0, bufferPx:40, errorCallback:function() {
  }, infid:0, pixelsFromNavToBottom:e, path:e};
  d.infinitescroll.prototype = {_binding:function(a) {
    var c = this, b = c.options;
    if(b.behavior && this["_binding_" + b.behavior] !== e) {
      this["_binding_" + b.behavior].call(this)
    }else {
      if(a !== "bind" && a !== "unbind") {
        return this._debug("Binding value  " + a + " not valid"), !1
      }
      if(a == "unbind") {
        this.options.binder.unbind("smartscroll.infscr." + c.options.infid)
      }else {
        this.options.binder[a]("smartscroll.infscr." + c.options.infid, function() {
          c.scroll()
        })
      }
      this._debug("Binding", a)
    }
  }, _create:function(a, c) {
    if(!this._validate(a)) {
      return!1
    }
    var b = this.options = d.extend(!0, {}, d.infinitescroll.defaults, a), g = d(b.nextSelector).attr("href");
    b.contentSelector = b.contentSelector || this.element;
    b.loading.selector = b.loading.selector || b.contentSelector;
    g ? (b.path = this._determinepath(g), b.loading.msg = d('<div id="infscr-loading"><img alt="Loading..." src="' + b.loading.img + '" /><div>' + b.loading.msgText + "</div></div>"), (new Image).src = b.loading.img, b.pixelsFromNavToBottom = d(document).height() - d(b.navSelector).offset().top, b.loading.start = b.loading.start || function() {
      d(b.navSelector).hide();
      b.loading.msg.appendTo(b.loading.selector).show(b.loading.speed, function() {
        beginAjax(b)
      })
    }, b.loading.finished = b.loading.finished || function() {
      b.loading.msg.fadeOut("normal")
    }, b.callback = function(a, g) {
      b.behavior && a["_callback_" + b.behavior] !== e && a["_callback_" + b.behavior].call(d(b.contentSelector)[0], g);
      c && c.call(d(b.contentSelector)[0], g)
    }, this._setup()) : this._debug("Navigation selector not found")
  }, _debug:function() {
    if(this.options.debug) {
      return h.console && console.log.call(console, arguments)
    }
  }, _determinepath:function(a) {
    var c = this.options;
    if(c.behavior && this["_determinepath_" + c.behavior] !== e) {
      this["_determinepath_" + c.behavior].call(this, a)
    }else {
      if(c.pathParse) {
        return this._debug("pathParse manual"), c.pathParse
      }else {
        if(a.match(/^(.*?)\b2\b(.*?$)/)) {
          a = a.match(/^(.*?)\b2\b(.*?$)/).slice(1)
        }else {
          if(a.match(/^(.*?)2(.*?$)/)) {
            if(a.match(/^(.*?page=)2(\/.*|$)/)) {
              return a = a.match(/^(.*?page=)2(\/.*|$)/).slice(1)
            }
            a = a.match(/^(.*?)2(.*?$)/).slice(1)
          }else {
            if(a.match(/^(.*?page=)1(\/.*|$)/)) {
              return a = a.match(/^(.*?page=)1(\/.*|$)/).slice(1)
            }else {
              this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com."), c.state.isInvalidPage = !0
            }
          }
        }
      }
      this._debug("determinePath", a);
      return a
    }
  }, _error:function(a) {
    var c = this.options;
    c.behavior && this["_error_" + c.behavior] !== e ? this["_error_" + c.behavior].call(this, a) : (a !== "destroy" && a !== "end" && (a = "unknown"), this._debug("Error", a), a == "end" && this._showdonemsg(), c.state.isDone = !0, c.state.currPage = 1, c.state.isPaused = !1, this._binding("unbind"))
  }, _loadcallback:function(a, c) {
    var b = this.options, g = this.options.callback, f = b.state.isDone ? "done" : !b.appendCallback ? "no-append" : "append";
    if(b.behavior && this["_loadcallback_" + b.behavior] !== e) {
      this["_loadcallback_" + b.behavior].call(this, a, c)
    }else {
      switch(f) {
        case "done":
          return this._showdonemsg(), !1;
        case "no-append":
          b.dataType == "html" && (c = d("<div>" + c + "</div>").find(b.itemSelector));
          break;
        case "append":
          var i = a.children();
          if(i.length == 0) {
            return this._error("end")
          }
          for(f = document.createDocumentFragment();a[0].firstChild;) {
            f.appendChild(a[0].firstChild)
          }
          this._debug("contentSelector", d(b.contentSelector)[0]);
          d(b.contentSelector)[0].appendChild(f);
          c = i.get()
      }
      b.loading.finished.call(d(b.contentSelector)[0], b);
      b.animate && (f = d(h).scrollTop() + d("#infscr-loading").height() + b.extraScrollPx + "px", d("html,body").animate({scrollTop:f}, 800, function() {
        b.state.isDuringAjax = !1
      }));
      if(!b.animate) {
        b.state.isDuringAjax = !1
      }
      g(this, c)
    }
  }, _nearbottom:function() {
    var a = this.options, c = 0 + d(document).height() - a.binder.scrollTop() - d(h).height();
    if(a.behavior && this["_nearbottom_" + a.behavior] !== e) {
      this["_nearbottom_" + a.behavior].call(this)
    }else {
      return this._debug("math:", c, a.pixelsFromNavToBottom), c - a.bufferPx < a.pixelsFromNavToBottom
    }
  }, _pausing:function(a) {
    var c = this.options;
    if(c.behavior && this["_pausing_" + c.behavior] !== e) {
      this["_pausing_" + c.behavior].call(this, a)
    }else {
      a !== "pause" && a !== "resume" && a !== null && this._debug("Invalid argument. Toggling pause value instead");
      switch(a && (a == "pause" || a == "resume") ? a : "toggle") {
        case "pause":
          c.state.isPaused = !0;
          break;
        case "resume":
          c.state.isPaused = !1;
          break;
        case "toggle":
          c.state.isPaused = !c.state.isPaused
      }
      this._debug("Paused", c.state.isPaused);
      return!1
    }
  }, _setup:function() {
    var a = this.options;
    if(a.behavior && this["_setup_" + a.behavior] !== e) {
      this["_setup_" + a.behavior].call(this)
    }else {
      return this._binding("bind"), !1
    }
  }, _showdonemsg:function() {
    var a = this.options;
    a.behavior && this["_showdonemsg_" + a.behavior] !== e ? this["_showdonemsg_" + a.behavior].call(this) : (a.loading.msg.find("img").hide().parent().find("div").html(a.loading.finishedMsg).animate({opacity:1}, 2E3, function() {
      d(this).parent().fadeOut("normal")
    }), a.errorCallback.call(d(a.contentSelector)[0], "done"))
  }, _validate:function(a) {
    for(var c in a) {
      return c.indexOf && c.indexOf("Selector") > -1 && d(a[c]).length === 0 ? (this._debug("Your " + c + " found no elements."), !1) : !0
    }
  }, bind:function() {
    this._binding("bind")
  }, destroy:function() {
    this.options.state.isDestroyed = !0;
    return this._error("destroy")
  }, pause:function() {
    this._pausing("pause")
  }, resume:function() {
    this._pausing("resume")
  }, retrieve:function(a) {
    var c = this, b = c.options, g = b.path, f, i, h, j, a = a || null;
    beginAjax = function(a) {
      a.state.currPage++;
      c._debug("heading into ajax", g);
      f = d(a.contentSelector).is("table") ? d("<tbody/>") : d("<div/>");
      i = g.join(a.state.currPage);
      h = a.dataType == "html" || a.dataType == "json" ? a.dataType : "html+callback";
      a.appendCallback && a.dataType == "html" && (h += "+callback");
      switch(h) {
        case "html+callback":
          c._debug("Using HTML via .load() method");
          f.load(i + " " + a.itemSelector, null, function(a) {
            c._loadcallback(f, a)
          });
          break;
        case "html":
        ;
        case "json":
          c._debug("Using " + h.toUpperCase() + " via $.ajax() method"), d.ajax({url:i, dataType:a.dataType, complete:function(a, b) {
            (j = typeof a.isResolved !== "undefined" ? a.isResolved() : b === "success" || b === "notmodified") ? c._loadcallback(f, a.responseText) : c._error("end")
          }})
      }
    };
    if(b.behavior && this["retrieve_" + b.behavior] !== e) {
      this["retrieve_" + b.behavior].call(this, a)
    }else {
      if(b.state.isDestroyed) {
        return this._debug("Instance is destroyed"), !1
      }
      b.state.isDuringAjax = !0;
      b.loading.start.call(d(b.contentSelector)[0], b)
    }
  }, scroll:function() {
    var a = this.options, c = a.state;
    a.behavior && this["scroll_" + a.behavior] !== e ? this["scroll_" + a.behavior].call(this) : !c.isDuringAjax && !c.isInvalidPage && !c.isDone && !c.isDestroyed && !c.isPaused && this._nearbottom() && this.retrieve()
  }, toggle:function() {
    this._pausing()
  }, unbind:function() {
    this._binding("unbind")
  }, update:function(a) {
    if(d.isPlainObject(a)) {
      this.options = d.extend(!0, this.options, a)
    }
  }};
  d.fn.infinitescroll = function(a, c) {
    switch(typeof a) {
      case "string":
        var b = Array.prototype.slice.call(arguments, 1);
        this.each(function() {
          var c = d.data(this, "infinitescroll");
          if(!c) {
            return!1
          }
          if(!d.isFunction(c[a]) || a.charAt(0) === "_") {
            return!1
          }
          c[a].apply(c, b)
        });
        break;
      case "object":
        this.each(function() {
          var b = d.data(this, "infinitescroll");
          b ? b.update(a) : d.data(this, "infinitescroll", new d.infinitescroll(a, c, this))
        })
    }
    return this
  };
  var j = d.event, k;
  j.special.smartscroll = {setup:function() {
    d(this).bind("scroll", j.special.smartscroll.handler)
  }, teardown:function() {
    d(this).unbind("scroll", j.special.smartscroll.handler)
  }, handler:function(a, c) {
    var b = this, e = arguments;
    a.type = "smartscroll";
    k && clearTimeout(k);
    k = setTimeout(function() {
      d.event.handle.apply(b, e)
    }, c === "execAsap" ? 0 : 100)
  }};
  d.fn.smartscroll = function(a) {
    return a ? this.bind("smartscroll", a) : this.trigger("smartscroll", ["execAsap"])
  }
})(window, jQuery);