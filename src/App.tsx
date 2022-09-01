import React, { Component } from "react";
import ErrorHandling from "./components/ErrorHandling";
import { Router } from "./router/Router";

class App extends Component {
   constructor(props: any) {
      super(props);

      this.state = {
         counter: 0,
      };
   }
   render() {
      return (
         <ErrorHandling>
            <Router />
         </ErrorHandling>
      );
   }
}

export default App;
