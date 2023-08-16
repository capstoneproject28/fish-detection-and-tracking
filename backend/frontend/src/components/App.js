import React, { Component } from "react";
import { render } from "react-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Hello World!</p>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);