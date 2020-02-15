import React from 'react';
import Home from './modules/home';
import Detail from './modules/detail';
import { HashRouter as Router, Route, Switch} from 'react-router-dom'


export default () => <div>
    <Router>
      <Switch>
        <Route path="/detail" component={Detail}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
</div>