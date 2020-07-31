import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { Home } from '../../components';

import { Archives } from '../../components';
import { Article } from '../../components';
import { Submit } from '../../components';

const App = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={Submit} />

    </Switch>
  )
}

export default withRouter(App);