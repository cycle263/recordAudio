import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Index from './routes/Index';
import Record from './routes/Record';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/record/:tel" component={Record} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
