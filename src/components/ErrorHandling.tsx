import React, { Component } from "react";

interface State {
   hasError: boolean;
}

class ErrorHandling extends Component<any, State> {
   constructor(props: any) {
      super(props);
      this.state = { hasError: false };
   }
   static getDerivedStateFromError(error: any) {
      return { hasError: true };
   }

   render() {
      if (this.state.hasError) {
         return (
            <div style={{ display: "grid", placeItems: "center" }}>
               <h1>Oops, Something went wrong.</h1>
            </div>
         );
      }
      return this.props.children;
   }
}

export default ErrorHandling;
