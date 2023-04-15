import Shape from './compiler.js'
let Class = {}
const g = {
  basic: Array(13).fill(0),
}
const combineStats = () => {}
const gunCalcNames = {
  default: '',
}
Class.genericTank = {}
Class.bullet = {}
/*** 
IGNORE ALL OF THE CODE ABOVE!!! 

This file is for documentation and examples of how to use, modify, and build onto the compiler.

The code in the compiler.js file can be placed directly inside of your code, but ensure that it is defined before you access the class
***/

/*** Class EXPLANATION ***/
Class.example = {
  SHAPE: new Shape(),
  /*
  This will create a new Shape class, furthermore allowing you to use the necessary methods to make custom shapes easier
  Most of the time you will leave the constructor empty (the inside of the '()' part after 'Shape', However you can use it to change the center offset
  For Example:
  */
  SHAPE: new Shape({
    center: { x: 6, y: 2 }
  }),
}

/*** Shape Methods ***/

// Shape().circle()
Class.basic = {
  SHAPE: new Shape().circle(),
  /*
  circle() is a method that allows you to create a circle with custom shape points
  Here are the arguments that the method will take, as well as an example with each:
  */
  ({ 
    points: 30, // REQUIRED! Failure to import a value for item points will result in a panic! Adds points to the circle, which makes it look more smooth
    radius = 1, // Not required, but will change the radius of the circle if you so please.
    ellipse = { x: 1.2, y: 0.8 } // Not required, but will turn the circle into an ellipse by multiplying every matching coordinate point by the given ellipse values
  })
}

// Shape().star()
Class.basic = {
  SHAPE: new Shape().star(),
  /*
  star() is a method that allows you to create a star-like polygon with custom shape points (Shapes like Builder and Trapper's traps)
  Here are the arguments that the method will take, as well as an example with each:
  */
  ({
    sides: 3, // REQUIRED! Failure to import a value for item sides will result in a panic! side count corresponds to the shape desired (3 = triangle, 4 = square, etc.)
    innerRadius: 0.6, // REQUIRED! Failure to import a value for item innerRadius will result in a panic! Sets the radius for center points between the corners.
    outerRadius: 1, // REQUIRED! Failure to import a value for item outerRadius will result in a panic! Sets how radius for the corners.
  })
}

// Shape().compile()
Class.basic = {
  SHAPE: new Shape().circle({ points: 30 }).compile(),
  // or
  SHAPE: new Shape().star({ sides: 3, innerRadius: 0.6, outerRadius: 1 }).compile()
  /*
  compile() is a method that NEEDS to be attached to the end of every Shape() instance, as it is the closure statement that will return your coordinate points.
  compile takes no arguements, all you need to do is make sure it's at the end of your Shape() instances and you'll be all good.
  */
}

// Shape.saved

/*
Shape.saved is an array that stores objects that contain a key and a method to execute shape compilation code.
If you want to add your own custom math for a custom shape that you won't use as common star() or circle(), this would be where to put it.

The example above is the cutter shape code, better known as the smasher-esque body of Diggers from digdig.io
The object needs a key and a run method so the retrieve() method can read and send data to it.
*/
static saved = [{ // EXAMPLE
    key: 'cutter',
    run() {
        let coordArray = []
        let arc = 2 * Math.PI / 64
        for (let i = 0; i < 64; i++) {
            let radius = -0.3 * Math.pow(Math.abs(Math.sin(4 * (arc * i))), 0.75) + 1.4
            coordArray.push([
                radius * Math.cos(arc * i),
                radius * Math.sin(arc * i),
            ])
        }
        return coordArray
    }
}, { // EXPLANATION
  key: /* Add a unique string make indexing into it possible, for example: */ 'testKey',
  run(/* arguments you may need to pass in can be put here (things to modify radius, offsets, inverses, etc) */) {
    // You will ALWAYS need to return a 2d array from these methods (an array that holds arrays)
    let coordArray = []
    // Code for your custom polygon goes here...
    return coordArray // It should look similar to this: [[2, 5], [0.5, 1.2], [0.2, 2] ... rest of items ]
  }
}]

// TODO: Finish the rest of the docs lol
