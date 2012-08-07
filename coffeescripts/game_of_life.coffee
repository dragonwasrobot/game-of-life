class GameOfLife
  currentCellGeneration: null
  cellSize: 7
  numberOfRows: 50
  numberOfColumns: 50
  seedProbability: 0.5
  tickLength: 100
  canvas: null
  drawingContext: null

  constructor: ->
    @createCanvas()
    @resizeCanvas()
    @createDrawingContext()
    @seed()
    @tick()

  createCanvas: ->
    @canvas = document.createElement 'canvas'
    document.body.appendChild @canvas

  resizeCanvas: ->
    @canvas.height = @cellSize * @numberOfRows
    @canvas.width = @cellSize * @numberOfColumns

  createDrawingContext: ->
    @drawingContext = @canvas.getContext '2d'

  seed: ->
    @currentCellGeneration = []

