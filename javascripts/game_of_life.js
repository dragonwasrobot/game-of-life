// Generated by CoffeeScript 1.3.3
(function() {
  var GameOfLife,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  GameOfLife = (function() {

    GameOfLife.prototype.currentCellGeneration = null;

    GameOfLife.prototype.cellSize = 10;

    GameOfLife.prototype.numberOfRows = 50;

    GameOfLife.prototype.numberOfColumns = 50;

    GameOfLife.prototype.seedProbability = 0.5;

    GameOfLife.prototype.tickLength = 200;

    GameOfLife.prototype.canvas = null;

    GameOfLife.prototype.drawingContext = null;

    GameOfLife.prototype.red = 239;

    GameOfLife.prototype.green = 0;

    GameOfLife.prototype.blue = 133;

    GameOfLife.prototype.trans = 0.1;

    GameOfLife.prototype.gray = 38;

    function GameOfLife() {
      this.tick = __bind(this.tick, this);
      this.createCanvas();
      this.resizeCanvas();
      this.createDrawingContext();
      this.seed();
      this.tick();
    }

    GameOfLife.prototype.createCanvas = function() {
      this.canvas = document.createElement('canvas');
      return document.body.appendChild(this.canvas);
    };

    GameOfLife.prototype.resizeCanvas = function() {
      this.canvas.height = this.cellSize * this.numberOfRows;
      return this.canvas.width = this.cellSize * this.numberOfColumns;
    };

    GameOfLife.prototype.createDrawingContext = function() {
      return this.drawingContext = this.canvas.getContext('2d');
    };

    GameOfLife.prototype.seed = function() {
      var column, row, seedCell, _i, _ref, _results;
      this.currentCellGeneration = [];
      _results = [];
      for (row = _i = 0, _ref = this.numberOfRows; 0 <= _ref ? _i < _ref : _i > _ref; row = 0 <= _ref ? ++_i : --_i) {
        this.currentCellGeneration[row] = [];
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (column = _j = 0, _ref1 = this.numberOfColumns; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; column = 0 <= _ref1 ? ++_j : --_j) {
            seedCell = this.createSeedCell(row, column);
            _results1.push(this.currentCellGeneration[row][column] = seedCell);
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    GameOfLife.prototype.createSeedCell = function(row, column) {
      return {
        isAlive: Math.random() < this.seedProbability,
        row: row,
        column: column
      };
    };

    GameOfLife.prototype.tick = function() {
      this.drawGrid();
      this.evolveCellGeneration();
      return setTimeout(this.tick, this.tickLength);
    };

    GameOfLife.prototype.drawGrid = function() {
      var column, row, _i, _ref, _results;
      _results = [];
      for (row = _i = 0, _ref = this.numberOfRows; 0 <= _ref ? _i < _ref : _i > _ref; row = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (column = _j = 0, _ref1 = this.numberOfColumns; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; column = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push(this.drawCell(this.currentCellGeneration[row][column]));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    GameOfLife.prototype.drawCell = function(cell) {
      var fillStyle, x, y;
      x = cell.column * this.cellSize;
      y = cell.row * this.cellSize;
      if (cell.isAlive) {
        fillStyle = "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
      } else {
        fillStyle = "rgb(" + this.gray + ", " + this.gray + ", " + this.gray + ")";
      }
      this.drawingContext.strokeStyle = "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.trans + ")";
      this.drawingContext.strokeRect(x, y, this.cellSize, this.cellSize);
      this.drawingContext.fillStyle = fillStyle;
      return this.drawingContext.fillRect(x, y, this.cellSize, this.cellSize);
    };

    GameOfLife.prototype.evolveCellGeneration = function() {
      var column, evolvedCell, newCellGeneration, row, _i, _j, _ref, _ref1;
      newCellGeneration = [];
      for (row = _i = 0, _ref = this.numberOfRows; 0 <= _ref ? _i < _ref : _i > _ref; row = 0 <= _ref ? ++_i : --_i) {
        newCellGeneration[row] = [];
        for (column = _j = 0, _ref1 = this.numberOfColumns; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; column = 0 <= _ref1 ? ++_j : --_j) {
          evolvedCell = this.evolveCell(this.currentCellGeneration[row][column]);
          newCellGeneration[row][column] = evolvedCell;
        }
      }
      return this.currentCellGeneration = newCellGeneration;
    };

    GameOfLife.prototype.evolveCell = function(cell) {
      var evolvedCell, numberOfAliveNeighbors;
      evolvedCell = {
        row: cell.row,
        column: cell.column,
        isAlive: cell.isAlive
      };
      numberOfAliveNeighbors = this.countAliveNeighbors(cell);
      if (cell.isAlive || numberOfAliveNeighbors === 3) {
        evolvedCell.isAlive = (1 < numberOfAliveNeighbors && numberOfAliveNeighbors < 4);
      }
      return evolvedCell;
    };

    GameOfLife.prototype.countAliveNeighbors = function(cell) {
      var column, lowerColumnBound, lowerRowBound, numberOfAliveNeighbors, row, upperColumnBound, upperRowBound, _i, _j;
      lowerRowBound = Math.max(cell.row - 1, 0);
      upperRowBound = Math.min(cell.row + 1, this.numberOfRows - 1);
      lowerColumnBound = Math.max(cell.column - 1, 0);
      upperColumnBound = Math.min(cell.column + 1, this.numberOfColumns - 1);
      numberOfAliveNeighbors = 0;
      for (row = _i = lowerRowBound; lowerRowBound <= upperRowBound ? _i <= upperRowBound : _i >= upperRowBound; row = lowerRowBound <= upperRowBound ? ++_i : --_i) {
        for (column = _j = lowerColumnBound; lowerColumnBound <= upperColumnBound ? _j <= upperColumnBound : _j >= upperColumnBound; column = lowerColumnBound <= upperColumnBound ? ++_j : --_j) {
          if (row === cell.row && column === cell.column) {
            continue;
          }
          if (this.currentCellGeneration[row][column].isAlive) {
            numberOfAliveNeighbors++;
          }
        }
      }
      return numberOfAliveNeighbors;
    };

    return GameOfLife;

  })();

  window.GameOfLife = GameOfLife;

}).call(this);
