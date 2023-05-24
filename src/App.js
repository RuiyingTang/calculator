import "./App.css";
import { useState } from "react";

function App() {
  let [display, setDisplay] = useState("0");
  let [formula, setFormula] = useState("");

  const numberKey = (e) => {
    if (!formula.includes("=")) {
      if (/[*/+-]/.test(display)) display = "";
      if (display === "0") {
        display = "";
        formula = formula.slice(0, formula.length - 1);
      }
      display = display.concat(e.target.value);
      formula = formula.concat(e.target.value);
      setDisplay(display);
      setFormula(formula);
    }
  };

  const operatorKey = (e) => {
    if (formula.includes("=")) {
      formula = "";
      formula = formula.concat(display + e.target.value);
    } else {
      if (formula === "") {
        formula = "0";
      }
      if (/\d/.test(formula[formula.length - 1])) {
        formula = formula.concat(e.target.value);
      } else {
        if (/\d/.test(formula[formula.length - 2])) {
          formula = formula.slice(0, formula.length - 1).concat(e.target.value);
        } else {
          formula = formula.slice(0, formula.length - 2).concat(e.target.value);
        }
      }
    }
    display = e.target.value;
    setDisplay(display);
    setFormula(formula);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="formulaScreen">{formula}</div>
        <div id="display" className="outputScreen">
          {display}
        </div>
        <div className="button-wrap">
          <button
            id="clear"
            value=""
            type="button"
            onClick={() => {
              setDisplay("0");
              setFormula("");
            }}
          >
            AC
          </button>
          <button
            id="divide"
            className="operator"
            value="/"
            type="button"
            onClick={operatorKey}
          >
            /
          </button>
          <button
            id="multiply"
            className="operator"
            value="*"
            type="button"
            onClick={operatorKey}
          >
            x
          </button>
          <button id="seven" value="7" type="button" onClick={numberKey}>
            7
          </button>
          <button id="eight" value="8" type="button" onClick={numberKey}>
            8
          </button>
          <button id="nine" value="9" type="button" onClick={numberKey}>
            9
          </button>
          <button
            id="subtract"
            className="operator"
            value="-"
            type="button"
            onClick={(e) => {
              if (formula.includes("=")) {
                formula = "";
                formula = formula.concat(display + e.target.value);
              } else {
                if (
                  !/[*/+-]/.test(formula[formula.length - 1]) ||
                  !/[*/+-]/.test(formula[formula.length - 2])
                ) {
                  formula = formula.concat(e.target.value);
                }
              }
              display = e.target.value;
              setDisplay(display);
              setFormula(formula);
            }}
          >
            -
          </button>
          <button id="four" value="4" type="button" onClick={numberKey}>
            4
          </button>
          <button id="five" value="5" type="button" onClick={numberKey}>
            5
          </button>
          <button id="six" value="6" type="button" onClick={numberKey}>
            6
          </button>
          <button
            id="add"
            className="operator"
            value="+"
            type="button"
            onClick={operatorKey}
          >
            +
          </button>
          <button id="one" value="1" type="button" onClick={numberKey}>
            1
          </button>
          <button id="two" value="2" type="button" onClick={numberKey}>
            2
          </button>
          <button id="three" value="3" type="button" onClick={numberKey}>
            3
          </button>
          <button
            id="equals"
            value="="
            type="button"
            onClick={(e) => {
              if (formula !== "") {
                if (!formula.includes("=")) {
                  if (formula.includes("--")) {
                    const arr = formula.split("--");
                    const formulaArr = [arr[0]];
                    for (let i = 1; i < arr.length; i++) {
                      formulaArr.push("(-" + arr[i][0] + ")" + arr[i].slice(1));
                    }
                    // eslint-disable-next-line
                    display = eval(formulaArr.join("-"));
                  } else {
                    // eslint-disable-next-line
                    display = eval(formula);
                  }

                  formula = formula.concat("=" + display);
                  setDisplay(display);
                  setFormula(formula);
                }
              }
            }}
          >
            =
          </button>
          <button
            id="zero"
            value="0"
            type="button"
            onClick={(e) => {
              if (!formula.includes("=")) {
                if (display !== "0") {
                  display = display.concat(e.target.value);
                  formula = formula.concat(e.target.value);
                }
                if (/[*/+-]/.test(display)) {
                  display = "0";
                }
                setDisplay(display);
                setFormula(formula);
              }
            }}
          >
            0
          </button>
          <button
            id="decimal"
            value="."
            type="button"
            onClick={(e) => {
              if (!formula.includes("=")) {
                if (!display.includes(".")) {
                  if (
                    formula === "" ||
                    /[*/+-]/.test(formula[formula.length - 1])
                  ) {
                    display = "";
                    display = display.concat("0" + e.target.value);
                    formula = formula.concat("0" + e.target.value);
                  } else {
                    display = display.concat(e.target.value);
                    formula = formula.concat(e.target.value);
                  }

                  setDisplay(display);
                  setFormula(formula);
                }
              }
            }}
          >
            .
          </button>
        </div>
      </div>
      <div className="author">
        Designed and Coded By <br />
        Ruiying Tang
      </div>
    </div>
  );
}

export default App;
