import React, { useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import { Nav } from "@/components";

// Dynamically imports the react-p5 library on the client side (making the window property exist and accessible)
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

export default function SketchBlock() {
  const imageAspectRatio = 866 / 1324; // Aspect ratio of the canvas image
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [canvasInitialized, setCanvasInitialized] = useState(false);

  // State for P5 and canvas instance
  const [canvasRef, setCanvasRef] = useState("");
  const [p5Instance, setp5Instance] = useState("");

  // Stores array elements representing groups of co-ordinates drawn by the user
  const [positions, setPositions] = useState([]);

  // Pen tools
  const [brushSize, setBrushSize] = useState(20);
  const [strokeSize, setStrokeSize] = useState(1);
  const [elementColour, setElementColour] = useState("#222222");

  // Holds the image of the artwork
  const [imageRef, setImageRef] = useState("");

  // Holds the co-ordinates drawn by the user in one block of action
  const [temp, setTemp] = useState([]);

  // Navbar state to represent whether menu is open or not
  const [navbar, setNavbar] = useState(false);

  // Resizes canvas according to device size
  // Temporary reduction in size during dev, will be refactored for final release
  const calculateCanvasSize = () => {
    let windowWidth = window.innerWidth * 0.95;
    let windowHeight = window.innerHeight * 0.95;

    if (window.innerWidth < 1024) {
      windowWidth = window.innerWidth * 0.9;
      windowHeight = window.innerHeight * 0.9;
    }

    if (windowWidth / windowHeight > imageAspectRatio) {
      // Fit to height
      return {
        width: windowHeight * imageAspectRatio,
        height: windowHeight,
      };
    } else {
      // Fit to width
      return {
        width: windowWidth,
        height: windowWidth / imageAspectRatio,
      };
    }
  };

  // Standard p5.js setup function
  const setup = (p5, canvasParentRef) => {
    setp5Instance(p5);
    setCanvasRef(
      p5
        .createCanvas(canvasSize.width, canvasSize.height)
        .parent(canvasParentRef)
    );

    p5.frameRate(60);
  };

  // Standard p5.js preload function
  const preload = (p5) => {
    setImageRef(p5.loadImage("./assets/base/hello_new.png"));
  };

  // Standard p5.js draw function
  const draw = (p5) => {
    p5.background(imageRef, canvasSize.width, canvasSize.height);

    /*
    *
    * Experimental paint brush, built on work published on
    * https://library.superhi.com/posts/how-to-paint-with-code-creating-paintbrushes
    * 
    if (navbar == false) {
      // SPRAY VERSION
      if (
        p5.mouseIsPressed === true &&
        p5.mouseX > 0 &&
        p5.mouseX < p5.width &&
        p5.mouseY > 0 &&
        p5.mouseY < p5.height
      ) {
        let points = sprayPaint(p5);
        temp.push(points);
      } else {
        if (temp.length !== 0) {
          setTemp([]);
          positions.push(temp);
        }
      }
    }

    for (let i = 0; i < positions.length; i++) {
      for (let j = 0; j < positions[i].length; j++) {
        for (let k = 0; k < positions[i][j].length; k++) {
          p5.strokeWeight(1);
          p5.stroke(positions[i][j][k][2]);
          p5.point(positions[i][j][k][0], positions[i][j][k][1]);
        }
      }
    }

    if (temp.length !== 0) {
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].length; j++) {
          p5.strokeWeight(1);
          p5.stroke(temp[i][j][2]);
          p5.point(temp[i][j][0], temp[i][j][1]);
        }
      }
    } */

    /*
     *
     * Standard circle paint brush
     * If the navbar isn't open the canvas is live (otherwise user movements are drawn to canvas when pressing menu buttons and inputs etc)
     * Records user mouse co-ordinates if mouse pressed and then pushes them to the master positions array on mouse release
     */

    if (navbar == false) {
      if (p5.mouseIsPressed === true) {
        // Pushes co-ordinates to the temp variable
        temp.push({
          x: p5.mouseX,
          y: p5.mouseY,
          brushSize: brushSize,
          strokeSize: strokeSize,
          colour: elementColour,
        });
      } else {
        // On mouse release pushes the entirity of the temp array to the master positions array
        // Sectioning out the data allows the undo and reset functionality.
        if (temp.length !== 0) {
          positions.push(temp);
          setTemp([]);
        }
      }

      p5.noStroke();

      // Displays positions pushed into the master array and is representative of the drawing state for an entire session
      for (let i = 0; i < positions.length; i++) {
        for (let j = 1; j < positions[i].length; j++) {
          p5.strokeWeight(positions[i][j - 1].brushSize);
          p5.stroke(positions[i][j - 1].colour);
          p5.line(
            positions[i][j - 1].x,
            positions[i][j - 1].y,
            positions[i][j].x,
            positions[i][j].y
          );
        }
      }

      /* ORIGINAL: Provides feedback for the user whilst drawing so that they can see their decisions in real time
      for (let i = 0; i < temp.length; i++) {
        p5.fill(temp[i].colour);
        p5.strokeWeight(temp[i].strokeSize);
        p5.ellipse(temp[i].x, temp[i].y, temp[i].brushSize);
      } */

      // UPDATED: Provides feedback for the user whilst drawing so that they can see their decisions in real time
      for (let i = 1; i < temp.length; i++) {
        p5.strokeWeight(temp[i].brushSize);
        p5.stroke(temp[i].colour);
        p5.line(temp[i - 1].x, temp[i - 1].y, temp[i].x, temp[i].y);
      }
    }
  };

  // Redundant spraypaint brush that is not currently being used.
  const sprayPaint = (p5) => {
    // find the speed of the mouse movement
    const speed =
      Math.abs(p5.mouseX - p5.pmouseX) + Math.abs(p5.mouseY - p5.pmouseY);

    // set minimum radius and spray density of spraypaint brush
    const minRadius = brushSize / 2;
    const sprayDensity = brushSize;

    // find radius of the spray paint brush and radius squared
    const r = minRadius;
    const rSquared = r * r;

    // set the number of times we lerp the points in the for loop
    const lerps = 1;

    // repeat the random points with lerping
    for (let i = 0; i < lerps; i++) {
      const points = [];

      // find the lerped X and Y coordinates
      const lerpX = p5.lerp(p5.mouseX, p5.pmouseX, i / lerps);
      const lerpY = p5.lerp(p5.mouseY, p5.pmouseY, i / lerps);

      // draw a bunch of random points within a circle
      for (let j = 0; j < sprayDensity; j++) {
        // pick a random position within the circle
        const randX = p5.random(-r, r);
        const randY = p5.random(-1, 1) * p5.sqrt(rSquared - randX * randX);

        // draw the random point
        points.push([lerpX + randX, lerpY + randY, elementColour]);
      }
      return points;
    }
  };

  // Functions used by buttons and user inputs to provide base drawing and saving functionality
  const changeBrushSize = (size) => {
    setBrushSize(size);
  };

  const changeColour = (colour) => {
    setElementColour(colour);
  };

  const changeStrokeSize = (size) => {
    setStrokeSize(size);
  };

  const changeNavbar = () => {
    setNavbar(!navbar);
  };

  const saveCanvas = () => {
    if (canvasRef) {
      p5Instance.saveCanvas(canvasRef, "canvas", "png");
    } else {
      Alert("This isn't working right now, sorry!");
    }
  };

  // Removes the last block of drawing (mouse down and mouse up)
  // All arrays are cleared for safety and in response to bugs in the dev process
  // Avoiding modifying state directly.
  const undo = () => {
    setTemp([]);
    setPositions([]);
    let tempPos = [...positions];
    tempPos.pop();
    setPositions(tempPos);
  };

  const reset = () => {
    setTemp([]);
    setPositions([]);
  };

  // Updates the canvas size once everything has finished loading
  useLayoutEffect(() => {
    const updateCanvasSize = () => {
      setCanvasSize(calculateCanvasSize());
    };

    if (!canvasInitialized) {
      updateCanvasSize();
      setCanvasInitialized(true);
    }

    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [canvasInitialized]);

  // Components to render, passing down user functionality as props
  return (
    <>
      <Sketch preload={preload} setup={setup} draw={draw} />
      <Nav
        brushSize={brushSize}
        changeBrushSize={changeBrushSize}
        strokeSize={strokeSize}
        changeStrokeSize={changeStrokeSize}
        elementColour={elementColour}
        changeColour={changeColour}
        saveCanvas={saveCanvas}
        undo={undo}
        reset={reset}
        navbar={navbar}
        changeNavbar={changeNavbar}
      />
    </>
  );
}
