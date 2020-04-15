export default class Logic {
    constructor(generation = 0, CellsOn = new Map()) {
      this.generation = generation;
      this.CellsOn = CellsOn;
      this.nextGeneration = new Map();
      this.CellsOff = new Map();
    }
  
    getGeneration() {
      return this.generation;
    }
  
    getCellsOn() {
      return this.CellsOn;
    }
  
    addCell(position) {
      this.CellsOn.set(position.x + " , " + position.y, {x: position.x, y: position.y});
    }
  
    removeCell(position) {
      this.CellsOn.delete(position); //-> undefined 
    }
  
    isCellOn(position) {
      return this.CellsOn.has(position); //return boolean
    }
  
    storeCell(position) {
      if(this.isCellOn(position.x + " , " + position.y)) {
        this.removeCell(position.x + " , " + position.y);
      } else {
        this.addCell(position);
      }
  
      return new Logic(this.generation, this.CellsOn);
    }
  
    addGeneration(){
      this.CellsOn.forEach((item) => {
        this.calcOnNeighbour(item);
      })
  
      this.CellsOff.forEach((item) => {
        this.calcOffNeighbour(item);
      })
  
      this.generation++;
  
      return new Logic(this.generation, this.nextGeneration)
    }
  
    calcOnNeighbour(position) {
      var NeighbourOn = 0;
  
      for(var i = position.x - 1; i <= position.x + 1; i++){
        for(var j = position.y - 1; j <= position.y + 1; j++){
          
          if(i === position.x && j === position.y)
          //Loop through but skip this value
            continue;
  
          if(this.isCellOn(i + " , " + j)){
              NeighbourOn++;
          } else {
            this.CellsOff.set(i + " , " +j, {x: i, y: j})
          }
        }
      }
  
      if((NeighbourOn === 2 || NeighbourOn === 3))
        this.nextGeneration.set(position.x + " , " + position.y, {x: position.x, y: position.y});
    }
  
    calcOffNeighbour(position) {
      var NeighbourOn = 0;
  
      for(var i = position.x - 1; i <= position.x + 1; i++){
        for(var j = position.y - 1; j <= position.y + 1; j++){
  
          if(i === position.x && j === position.y)
            continue;
  
          if(this.isCellOn(i + " , " + j)){
              NeighbourOn++;
            }
          }
        }
  
      if(NeighbourOn === 3)
        this.nextGeneration.set(position.x + " , " + position.y, {x: position.x, y: position.y});
    }
  
  }