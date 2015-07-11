(function(root, Atlas) {
  // Create app object to serve as namespace.
  var app = root.app || {};

  // Set app object to global scope.
  root.app = app;

  // Create basic view
  app.BasicView = Atlas.View.extend({
    el : '#main_container'
  });

  // Create index view
  app.IndexView = app.BasicView.extend({
    template : Atlas.templateFactory('index')
  });

  // Create play view
  app.PlayView = app.BasicView.extend({
    template : Atlas.templateFactory('play'),
    events : {
      'click #backPlay' : 'handleBackClick',
      'click #board' : 'handleBoardClick'
    },
    onRender : function() {
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
    template : Atlas.templateFactory('instructions'),
    events : {
      'click #backInstructions' : 'handleBackClick'
    }
  });

  // Create about view
  app.AboutView = app.BasicView.extend({
    template : Atlas.templateFactory('about'),
    events : {
      'click #backAbout' : 'handleBackClick'
    }
  });

  // Create router
  var Router = Atlas.Router.extend({
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
  root.addEventListener('resize', windowResizeHandler, false);

  Atlas.history.start();
}(window, window.Atlas));
