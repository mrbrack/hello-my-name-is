import React from "react";
import styles from "./index.module.scss";
import cl from "classnames";
import Checkbox from "./Checkbox";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

// This component will be refactored properly before project launch

const Nav = ({
  className,
  brushSize,
  changeBrushSize,
  strokeSize,
  changeStrokeSize,
  elementColour,
  changeColour,
  saveCanvas,
  undo,
  reset,
  navbar,
  changeNavbar,
}) => {
  return (
    <>
      <header className={cl(className, styles.sketchNavHeader)}>
        <h2 className={cl(className, styles.sketchNavTitle)}>
          HELLO my name is
        </h2>
        <nav className={cl(className, styles.sketchNavContent)}>
          <p className={cl(className, styles.sketchNavHamburgerContentHeading)}>
            Brush size:
          </p>
          <input
            type="range"
            min="1"
            max="100"
            value={brushSize}
            onChange={(e) => changeBrushSize(e.target.value)}
            id="brush-size"
          ></input>
          <p className={cl(className, styles.sketchNavHamburgerContentHeading)}>
            Brush colour:
          </p>
          <input
            type="color"
            id="head"
            name="head"
            value={elementColour}
            onChange={(e) => changeColour(e.target.value)}
          />
          <button onClick={undo}>Undo</button>
          <button onClick={reset}>Reset</button>
          <button onClick={saveCanvas}>Download</button>
        </nav>
      </header>
      <div className={cl(className, styles.sketchNavHamburger)}>
        <button
          onClick={() => {
            changeNavbar();
          }}
          style={{ color: "#252525" }}
        >
          {navbar ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>
      <nav
        className={
          navbar
            ? cl(className, styles.content)
            : cl(className, styles.content_hidden)
        }
      >
        <nav className={cl(className, styles.sketchNavHamburgerContent)}>
          <h2 className={cl(className, styles.sketchNavTitle)}>
            HELLO my name is
          </h2>
          <div
            className={cl(className, styles.sketchNavHamburgerContentOption)}
          >
            <p
              className={cl(className, styles.sketchNavHamburgerContentHeading)}
            >
              Brush size:
            </p>
            <input
              type="range"
              min="1"
              max="100"
              value={brushSize}
              onChange={(e) => changeBrushSize(e.target.value)}
              id="brush-size"
            ></input>
          </div>
          <div
            className={cl(className, styles.sketchNavHamburgerContentOption)}
          >
            <p
              className={cl(className, styles.sketchNavHamburgerContentHeading)}
            >
              Brush colour:
            </p>
            <input
              type="color"
              id="head"
              name="head"
              value={elementColour}
              onChange={(e) => changeColour(e.target.value)}
            />
          </div>
          <button type="button" onTouchStart={undo}>
            Undo
          </button>
          <button type="button" onTouchStart={reset}>
            Reset
          </button>
          <button type="button" onTouchStart={reset}>
            Download
          </button>
        </nav>
      </nav>
    </>
  );
};
export default Nav;
