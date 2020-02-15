import React from 'react';
import Home from './modules/home';
import Detail from './modules/detail';
import Manage from './modules/manage';
import { HashRouter as Router, Route, Switch} from 'react-router-dom'


export default () => <div>
    <Router>
      <Switch>
        <Route path="/detail" component={Detail}/>
        <Route path="/manage" component={Manage}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
</div>