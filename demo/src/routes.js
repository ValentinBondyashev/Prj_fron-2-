
import Full from './containers/MenuApp/MenuApp.js';
import Skills from './containers/Skills/Skills';
import Match from './components/Match/index';
import Dashboard from './containers/Dashboard/Dashboard';
import Bubble from './containers/Bubble/Bubble';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: Full },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/skills', name: 'Skills', component: Skills },
  { path: '/match', name: 'Match', component: Match },
  { path: '/bubble', name: 'Bubble', component: Bubble },
];

export default routes;
