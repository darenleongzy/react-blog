// import React from "react";
// import { Switch, Route } from "react-router-dom";
// import { Home } from "./src/components";
// import { Archives } from "./src/components";
// import { Editor } from "./src/components";
// import { Submit } from "./src/components";
// import { Single } from "./src/components";
// import { NotFound } from "./src/components";
// import { About } from "./src/components";
// import { AppBar } from "./src/components";
// // import history from "./src/components/History";
// import { BrowserRouter } from "react-router-dom";
// export default (
//   <BrowserRouter>
//     <Switch>
//       <Route path="/" />
//       <Route path="/admin" />
//       <Route path="/archives" />
//       <Route path="/about" />
//       <Route path="/article/:urlTitle/:articleId" />
//       {/* <Route component={NotFound} /> */}
//     </Switch>
//   </BrowserRouter>
// );
import React from "react";
import { Route } from "react-router";

export default (
  <Route>
    <Route path="/" />
    <Route path="/admin" />
    <Route path="/archives" />
    <Route path="/about" />
    <Route path="/article/:urlTitle/:articleId" />
  </Route>
);
