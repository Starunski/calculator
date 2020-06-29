import React, { Component } from "react";
import "./Calculator.css";
import Keypad from "../keypad";
import {
  isDotAllowed,
  lastStateConditionCharacter,
} from "../../utils/calculator-utils";
import Display from "../display/Display";
import * as math from "mathjs";

export default class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      condition: "",
      result: 0,
    };
  }

  calculate() {
    let lastSingn = lastStateConditionCharacter(this.state.condition);

    if (!isNaN(lastSingn)) {
      const result = math.evaluate(this.state.condition);

      this.setState({ result: Number(result), condition: "" });
    }
    // if(this.state.result == )
  }

  addCondition(condition) {
    let currentCondition = this.state.condition
      ? this.state.condition
      : this.state.result !== 0
      ? this.state.result.toString()
      : "";
    let newCondition;

    // console.log(isMathematicalOperator(condition));
    const lastStateConditionCharacter =
      currentCondition[currentCondition.length - 1];
    if (
      lastStateConditionCharacter &&
      isNaN(lastStateConditionCharacter) &&
      isNaN(condition)
    ) {
      newCondition = currentCondition.slice(0, -1) + condition;
    } else {
      const isDot = condition === ".";
      if (isDot) {
        const dotAllowed = isDotAllowed(currentCondition);
        newCondition = dotAllowed
          ? currentCondition + condition
          : currentCondition;
      } else {
        newCondition = currentCondition + condition;
      }
    }

    this.setState({ condition: newCondition, result: 0 });
  }

  clearState() {
    this.setState({
      condition: "",
      result: 0,
    });
  }

  calcPercent() {
    let lastSingnForPercent = lastStateConditionCharacter(this.state.condition);

    if (!isNaN(lastSingnForPercent)) {
      this.setState({
        condition: this.state.condition / 100,
        result:   this.state.result / 100,
      });
    } else if (this.state.result !== 0) {

      this.setState({
        condition: "",
        result: this.state.result / 100,
      });
    }
  }

  applyCE() {
    let currentCondition = this.state.condition.slice(0,-1);
    this.setState({
      condition: currentCondition,
      result: this.state.result
    });
  }


  render() {
    return (
      <div className="keyboard">
        <Display condition={this.state.condition} result={this.state.result} />
        <div>
          <div className="row">
            <Keypad handleClick={() => this.calcPercent()}>%</Keypad>
            <Keypad handleClick={() => this.applyCE()}>CE</Keypad>
            <Keypad handleClick={() => this.clearState()}>C</Keypad>
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              /
            </Keypad>
          </div>
          <div className="row">
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              7
            </Keypad>
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              8
            </Keypad>
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              9
            </Keypad>
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              *
            </Keypad>
          </div>
          <div className="row">
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              4
            </Keypad>
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              5
            </Keypad>
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              6
            </Keypad>
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              -
            </Keypad>
          </div>
          <div className="row">
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              1
            </Keypad>
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              2
            </Keypad>
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              3
            </Keypad>
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              +
            </Keypad>
          </div>
          <div className="last-row">
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              0
            </Keypad>
            <Keypad handleClick={(condition) => this.addCondition(condition)}>
              .
            </Keypad>
            <Keypad
              className="equal-button"
              handleClick={() => this.calculate()}
            >
              =
            </Keypad>
          </div>
        </div>
      </div>
    );
  }
}
