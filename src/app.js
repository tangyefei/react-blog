import React from 'react';
import Home from './modules/home';
import Detail from './modules/detail';
import Manage from './modules/manage';
import ManageAdd from './modules/manage/add';
import ManageEdit from './modules/manage/add';
import { HashRouter as Router, Route, Switch} from 'react-router-dom'


export default () => <div>
    <Router>
      <Switch>
        <Route path="/detail" component={Detail}/>
        <Route path="/manage/add" component={ManageAdd}/>
        <Route path="/manage/edit/:id" component={ManageEdit}/>
        <Route path="/manage" component={Manage}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
</div>