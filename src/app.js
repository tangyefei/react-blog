import React from 'react';

import { HashRouter as Router, Route, Switch} from 'react-router-dom'

import userRoutes from './modules/user/routes.js';
import homeRoutes from './modules/home/routes.js';
import detailRoutes from './modules/detail/routes.js';
import manageRoutes from './modules/manage/routes.js';

const routes = [...detailRoutes, ...manageRoutes, ...userRoutes, ...homeRoutes];
const routeComs = routes.map(d => <Route path={d.path} component={d.component}/>)

export default () => <div>
    <Router>
      <Switch>
        {routeComs}
      </Switch>
    </Router>
</div>