(function($) {
  // Create app object to serve as namespace.
  var app = window.app || {};

  // Set app object to global scope.
  window.app = app;

  // Create basic view
  app.BasicView = QuineBackboneUtility.BackQBUView.extend({
    el : '#main_container'
  });

  // Create index view
  app.IndexView = app.BasicView.extend({
    template : QuineBackboneUtility.template('index')
  });

  // Create play view
  app.PlayView = app.BasicView.extend({
    template : QuineBackboneUtility.template('play'),
    events : {
      'click #backPlay' : 'handleBackClick',
      'click #board' : 'handleBoardClick'
    },
    postRender : function() {
      var message = document.getElementById('message');
      var canvas = document.getElementById('board');

      app.gameObj.initialize(canvas, message);
      app.gameObj.drawBoard();
    },
    handleBoardClick : function(evt) {
      app.gameObj.handleBoardClick(evt);
    }
  });

  // Create instructions view
  app.InstructionsView = app.BasicView.extend({
    template : QuineBackboneUtility.template('instructions'),
    events : {
      'click #backInstructions' : 'handleBackClick'
    }
  });

  // Create about view
  app.AboutView = app.BasicView.extend({
    template : QuineBackboneUtility.template('about'),
    events : {
      'click #backAbout' : 'handleBackClick'
    }
  });

  // Create router
  var Router = Backbone.Router.extend({
    routes : {
      '' : 'index',
      'play' : 'play',
      'instructions' : 'instructions',
      'about' : 'about'
    },
    initialize : function(options) {
      this.indexView = new app.IndexView();
      this.playView = new app.PlayView();
      this.instructionsView = new app.InstructionsView();
      this.aboutView = new app.AboutView();
    },
    index : function() {
      this.indexView.render();
    },
    play : function() {
      this.playView.render();
    },
    instructions : function() {
      this.instructionsView.render();
    },
    about : function() {
      this.aboutView.render();
    }
  });

  app.router = new Router();

  // create handler function that will process window resize
  function windowResizeHandler() {
    var canvas = document.getElementById('board');
    if (canvas !== null) {
      app.gameObj.handleResize();
    }
  }

  // bind handlers to actions
  window.addEventListener('resize', windowResizeHandler, false);

  Backbone.history.start();
}(jQuery));