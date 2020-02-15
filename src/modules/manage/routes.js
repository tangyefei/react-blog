
import Manage from './index';
import ManageAdd from './add';
import ManageEdit from './add';


const routes = [
  {path:"/manage/edit/:id", component: ManageEdit},
  {path:"/manage/add", component: ManageAdd},
  {path:"/manage", component: Manage},
]


export default routes; 