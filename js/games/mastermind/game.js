(function() {
    // Create app object to serve as namespace.
    var app = window.app || {};

    // Create gameObj object that will contain all game related logic and will
    // be responsible for AI play and canvas drawing.
    var gameObj = {};

    // Set app object to global scope.
    window.app = app;

    // Set gameObj to global app object.
    app.gameObj = gameObj;

    // Setup game object that will jeep game state
    gameObj.initialize = function(canvas, message) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        canvas.height = canvas.clientHeight;
        canvas.width = canvas.clientWidth;
        this.height = canvas.height;
        this.width = canvas.width;
        this.drawUnit = this.width / 50;
        this.styles = [ '#000000', '#cccccc', '#ffff00', '#ffa500', '#ff0000',
                '#00ff00', '#0000ff', '#8c489f' ];
        this.choices = [ [ 1, 1, 1, 1 ], [ 1, 1, 1, 1 ], [ 1, 1, 1, 1 ],
                [ 1, 1, 1, 1 ], [ 1, 1, 1, 1 ], [ 1, 1, 1, 1 ] ];
        this.results = [ [ 1, 1, 1, 1 ], [ 1, 1, 1, 1 ], [ 1, 1, 1, 1 ],
                [ 1, 1, 1, 1 ], [ 1, 1, 1, 1 ], [ 1, 1, 1, 1 ] ];
        this.aiSequence = [ 2, 2, 3, 3 ];
        this.aiSequenceUsed = [false, false, false, false];
        this.inputSequence = [ 1, 1, 1, 1 ];
        this.inputSequenceUsed = [false, false, false, false];
        this.message = message;
        this.inProgress = true;
        this.nextInputIndex = 0;
        this.nextChoicesIndex = 0;
        this.nextSubChoicesIndex = 0;
    };

    // method for drawing complete board
    gameObj.drawBoard = function() {
        this.drawChoiceCircles();
        this.drawChoices();
        this.drawResults();
        this.drawAiSequence(this.inProgress);
        this.drawInputSequence();
        this.drawButtons();
    };

    // method for drawing choice circles
    gameObj.drawChoiceCircles = function() {
        var x = this.drawUnit * 4,
            y = this.drawUnit * 4,
            radius = this.drawUnit * 3,
            index = 2,
            increment = this.drawUnit * 8;

        while (index < 8) {
            this.drawCircle(x, y, radius, this.styles[index]);
            index += 1;
            y += increment;
        }
    };

    // method for drawing game user choices
    gameObj.drawChoices = function() {
        var x = this.drawUnit * 16,
            y = this.drawUnit * 4,
            radius = this.drawUnit * 3,
            increment = this.drawUnit * 8,
            numStyles = this.choices.length,
            numInStyle = this.choices[0].length,
            i,
            j;

        for (i = 0; i < numStyles; ++i) {
            x = this.drawUnit * 16;

            for (j = 0; j < numInStyle; ++j) {
                this.drawCircle(x, y, radius, this.styles[this.choices[i][j]]);
                x += increment;
            }

            y += increment;
        }
    };

    // method for drawing game results
    gameObj.drawResults = function() {
        var x1 = this.drawUnit * 46,
            x2 = this.drawUnit * 48,
            y = this.drawUnit * 3,
            radius = this.drawUnit,
            increment = this.drawUnit * 8,
            numResults = this.results.length,
            index = 0;

        while (index < numResults) {
            this.drawCircle(x1, y, this.drawUnit,
                    this.styles[this.results[index][0]]);
            this.drawCircle(x2, y, this.drawUnit,
                    this.styles[this.results[index][1]]);
            this.drawCircle(x1, y + this.drawUnit * 2, radius,
                    this.styles[this.results[index][2]]);
            this.drawCircle(x2, y + this.drawUnit * 2, radius,
                    this.styles[this.results[index][3]]);

            y += increment;
            ++index;
        }
    };

    // method for drawing computer sequence
    gameObj.drawAiSequence = function(inProgress) {
        var x = this.drawUnit * 16,
            y = this.drawUnit * 56,
            radius = this.drawUnit * 3,
            increment = this.drawUnit * 8,
            index = 0,
            numAiSequence = this.aiSequence.length;

        while (index < numAiSequence) {
            this.drawCircle(x, y, radius, inProgress ? this.styles[1]
                    : this.styles[this.aiSequence[index]]);
            x += increment;
            ++index;
        }
    };

    // method for drawing input sequence
    gameObj.drawInputSequence = function() {
        var x = this.drawUnit * 16,
            y = this.drawUnit * 64,
            radius = this.drawUnit * 3,
            increment = this.drawUnit * 8,
            index = 0;

        while (index < this.inputSequence.length) {
            this.drawCircle(x, y, radius,
                    this.styles[this.inputSequence[index]]);
            x += increment;
            ++index;
        }
    };

    // method for drawing circle
    gameObj.drawCircle = function(x, y, radius, style) {
        this.context.fillStyle = style;
        this.context.lineWidth = this.drawUnit;

        this.context.beginPath();

        this.context.arc(x, y, radius, 0, Math.PI * 2, true);
        this.context.fill();

        this.context.closePath();
    };

    // method for drawing input buttons
    gameObj.drawButtons = function() {
        this.context.fillStyle = this.styles[5];
        this.context.strokeStyle = this.styles[0];
        this.context.lineWidth = this.drawUnit;

        this.context.beginPath();
        this.context.fillRect(this.drawUnit, this.drawUnit * 53,
                this.drawUnit * 6, this.drawUnit * 6);
        this.context.closePath();

        this.context.fillStyle = this.styles[4];

        this.context.beginPath();
        this.context.fillRect(this.drawUnit, this.drawUnit * 61,
                this.drawUnit * 6, this.drawUnit * 6);
        this.context.closePath();

        this.context.beginPath();
        this.context.arc(this.drawUnit * 4, this.drawUnit * 56,
                this.drawUnit * 2, 0, Math.PI * 2, true);
        this.context.stroke();
        this.context.closePath();

        this.context.beginPath();
        this.context.moveTo(this.drawUnit * 2, this.drawUnit * 62);
        this.context.lineTo(this.drawUnit * 6, this.drawUnit * 66);
        this.context.moveTo(this.drawUnit * 6, this.drawUnit * 62);
        this.context.lineTo(this.drawUnit * 2, this.drawUnit * 66);
        this.context.stroke();
        this.context.closePath();
    };

    // method to clear the canvas
    gameObj.clearCanvas = function() {
        this.context.clearRect(0, 0, this.width, this.height);
    };

    // method that add input to choices
    gameObj.addInputToChoices = function() {
        var index = 0;
        while ( index < this.inputSequence.length) {
            this.choices[this.nextChoicesIndex][index] = this.inputSequence[index];
            ++index;
        }
    };
    
    //method that clears used sequences
    gameObj.clearUsedSequences = function() {
        var index = 0;
        
        while (index < this.inputSequenceUsed.length) {
            this.inputSequenceUsed[index] = false;
            this.aiSequenceUsed[index] = false;
            ++index;
        }
    };
    
    // method that matches inputs in correct place
    gameObj.matchInPlace = function() {
        var index = 0;
        while (index < this.inputSequence.length) {
            if (this.aiSequence[index] === this.inputSequence[index]) {
                this.results[this.nextChoicesIndex][this.nextSubChoicesIndex] = 0;
                this.aiSequenceUsed[index] = true;
                this.inputSequenceUsed[index] = true;
                ++this.nextSubChoicesIndex;
            }
            ++index;
        }
    };
    
    //method that matches inputs not in correct place
    gameObj.matchOutOfPlace = function() {
        var aiIndex = 0,
            inputIndex = 0;
        
        while (aiIndex < this.inputSequence.length) {
            while (inputIndex < this.inputSequence.length) {
                if (aiIndex !== inputIndex &&
                        this.aiSequenceUsed[aiIndex] === false &&
                        this.inputSequenceUsed[inputIndex] === false) {
                    if (this.aiSequence[aiIndex] === this.inputSequence[inputIndex]) {
                        this.results[this.nextChoicesIndex][this.nextSubChoicesIndex] = 4;
                        this.aiSequenceUsed[aiIndex] = true;
                        this.inputSequenceUsed[inputIndex] = true;
                        ++this.nextSubChoicesIndex;
                    }
                }
                ++inputIndex;
            }
            inputIndex = 0;
            ++aiIndex;
        }
    };

    // method that calculate result for submitted choices
    gameObj.calculateResults = function() {
        this.clearUsedSequences();
        this.matchInPlace();
        this.matchOutOfPlace();
    };

    // method that process click on choice circles
    gameObj.inputSequenceHandler = function(value) {
        if (this.nextInputIndex < 4) {
            this.inputSequence[this.nextInputIndex++] = value;
            this.drawBoard();
        }
    };

    // method that process click on submit button
    gameObj.submitButtonHandler = function() {
        if (this.nextInputIndex >= 4) {
            this.nextSubChoicesIndex = 0;
            this.addInputToChoices();
            this.calculateResults();
            ++this.nextChoicesIndex;
            this.clearButtonHandler();
        }
    };

    // method that process click on clear button
    gameObj.clearButtonHandler = function() {
        this.nextInputIndex = 0;
        this.inputSequence = [ 1, 1, 1, 1 ];
        this.drawBoard();
    };

    // method that process click on given coordinates
    gameObj.handleClick = function(x, y) {
        if (x >= this.drawUnit && x <= this.drawUnit * 7) {
            if (y >= this.drawUnit * 61 && y <= this.drawUnit * 67) {
                this.clearButtonHandler();
            } else if (this.nextInputIndex >= 4 && y >= this.drawUnit * 53
                    && y <= this.drawUnit * 59) {
                this.submitButtonHandler();
            } else if (this.nextInputIndex < 4 && y >= this.drawUnit
                    && y <= this.drawUnit * 7) {
                this.inputSequenceHandler(2);
            } else if (this.nextInputIndex < 4 && y >= this.drawUnit * 9
                    && y <= this.drawUnit * 15) {
                this.inputSequenceHandler(3);
            } else if (this.nextInputIndex < 4 && y >= this.drawUnit * 17
                    && y <= this.drawUnit * 23) {
                this.inputSequenceHandler(4);
            } else if (this.nextInputIndex < 4 && y >= this.drawUnit * 25
                    && y <= this.drawUnit * 31) {
                this.inputSequenceHandler(5);
            } else if (this.nextInputIndex < 4 && y >= this.drawUnit * 33
                    && y <= this.drawUnit * 39) {
                this.inputSequenceHandler(6);
            } else if (this.nextInputIndex < 4 && y >= this.drawUnit * 41
                    && y <= this.drawUnit * 47) {
                this.inputSequenceHandler(7);
            }
        }
    };

    // method for handling click on board
    gameObj.handleBoardClick = function(evt) {
        var rect = this.canvas.getBoundingClientRect(),
            x = evt.clientX - rect.left,
            y = evt.clientY - rect.top;

        this.handleClick(x, y);
    };

    // method for handling resize event
    gameObj.handleResize = function() {
        this.canvas.height = this.canvas.clientHeight;
        this.canvaswidth = this.canvas.clientWidth;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.drawUnit = this.width / 50;

        this.clearCanvas();
        this.drawBoard();
    };
}());
