/*
 * Quine Backbone Utility 0.0.1
 *
 * The MIT License (MIT)
 *
 * Copyright 2008-2014 Ivan Dejanovic and Quine Interactive
 * www.quineinteractive.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

(function(root, factory) {
  // Set up QuineBackboneUtility appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global QuineBackboneUtility.
      root.QuineBackboneUtility = factory(root, exports, (root.jQuery || root.Zepto || root.ender || root.$), root.Handlebars, root._, root.Backbone);
    });

  // Next for Node.js or CommonJS.
  } else if (typeof exports !== 'undefined') {
    var $ = require('jQuery')
      , Handlebars = require('Handlebars')
      , _ = require('underscore')
      , Backbone = require('Backbone');
    factory(root, exports, $, Handlebars, _, Backbone);

  // Finally, as a browser global.
  } else {
    root.QuineBackboneUtility = factory(root, {}, (root.jQuery || root.Zepto || root.ender || root.$), root.Handlebars, root._, root.Backbone);
  }

}(this, function(root, QuineBackboneUtility, $, Handlebars,  _, Backbone) { 
  // Template helper function
  QuineBackboneUtility.template = function(name) {
    return Handlebars.compile($('#' + name + '-template').html());
  };
  
  // Create basic QBU view
  QuineBackboneUtility.QBUView = Backbone.View.extend({
    preRender : function() {
      
    },
    postRender : function() {
      
    },
    renderModel : function() {
      this.$el.html(this.template(this.model));
    },
    render : function() {
      this.preRender();
      this.renderModel();
      this.postRender();
      
      return this;
    }
  });
  
  // Create view that can handle back
  QuineBackboneUtility.BackQBUView = QuineBackboneUtility.QBUView.extend({
    handleBackClick : function() {
      window.history.back();
    }
  });
  
  return QuineBackboneUtility;
})());