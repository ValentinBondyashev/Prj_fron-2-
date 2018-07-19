
import Skills from './components/Skills/Skills';
import Match from './components/Match/Match';
import UserTable from './components/Skills/components/UserTable/UserTable';
import Bubble from './components/Skills/components/Bubble/Bubble';
import MenuApp from './containers/MenuApp/MenuApp.js';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: MenuApp },
  { path: '/userTable', name: 'UserTable', component: UserTable },
  { path: '/skills', name: 'Skills', component: Skills },
  { path: '/match', name: 'Match', component: Match },
  { path: '/bubble', name: 'Bubble', component: Bubble },
];

export default routes;
