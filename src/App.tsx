import React, { Component } from "react";
import { Router } from "./router/Router";

class App extends Component {
   constructor(props: any) {
      super(props);

      this.state = {
         counter: 0,
      };
   }
   render() {
      return <Router />;
   }
}

export default App;
