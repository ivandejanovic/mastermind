(function($) {
  // Create app object to serve as namespace.
  var app = window.app || {};

  // Set app object to global scope.
  window.app = app;

  // Template helper function
  app.template = function(name) {
    return Handlebars.compile($('#' + name + '-template').html());
  };

  // Create basic view
  app.BasicView = Backbone.View.extend({
    el : '#main_container',
    render : function() {
      this.$el.html(this.template());
    },
  });

  // Create index view
  app.IndexView = app.BasicView.extend({
    template : app.template('index')
  });

  // Create play view
  app.PlayView = app.BasicView.extend({
    template : app.template('play'),
    events : {
      'click #backPlay' : 'handleBackClick',
      'click #board' : 'handleBoardClick'
    },
    render : function() {
      this.$el.html(this.template());
      this.initGame();
    },
    initGame : function() {
      var message = document.getElementById('message');
      var canvas = document.getElementById('board');

      app.gameObj.initialize(canvas, message);
      app.gameObj.drawBoard();
    },
    handleBoardClick : function(evt) {
      app.gameObj.handleBoardClick(evt);
    },
    handleBackClick : function(evt) {
      window.history.back();
    }
  });

  // Create instructions view
  app.InstructionsView = app.BasicView.extend({
    template : app.template('instructions'),
    events : {
      'click #backInstructions' : 'handleBackClick'
    },
    handleBackClick : function(evt) {
      window.history.back();
    }
  });

  // Create about view
  app.AboutView = app.BasicView.extend({
    template : app.template('about'),
    events : {
      'click #backAbout' : 'handleBackClick'
    },
    handleBackClick : function(evt) {
      window.history.back();
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
      this.index = new app.IndexView();
      this.play = new app.PlayView();
      this.instructions = new app.InstructionsView();
      this.about = new app.AboutView();
    },
    index : function() {
      this.index.render();
    },
    play : function() {
      this.play.render();
    },
    instructions : function() {
      this.instructions.render();
    },
    about : function() {
      this.about.render();
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
