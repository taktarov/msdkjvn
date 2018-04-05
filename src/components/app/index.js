import React from "react";
import { Route } from "react-router-dom";
import Home from "../../containers/indexConnected";

export default function App() {
  return (
    <div>
      <main>
        <Route exact path="/" component={Home} />
      </main>
    </div>
  );
}
