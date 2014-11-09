/*
 * Quine Backbone Utility
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
 *
 *
 * author: Ivan Dejanovic
 */

(function($) {
  // Create qbu object that will serve as namespace
  var qbu = window.QuineBackboneUtility || {};
  
  // Set qbu to global scope
  window.QuineBackboneUtility = qbu;
  
  // Template helper function
  qbu.template = function(name) {
    return Handlebars.compile($('#' + name + '-template').html());
  };
  
  // Create basic QBU view
  qbu.QBUView = Backbone.View.extend({
    defaults : {
      model : {}
    },
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
    }
  });
  
  // Create view that can handle back
  qbu.BackQBUView = qbu.QBUView.extend({
    handleBackClick : function() {
      window.history.back();
    }
  });
}(jQuery));