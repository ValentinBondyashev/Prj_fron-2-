
import Full from './containers/MenuApp/MenuApp.js';
import Compare from './containers/Compare/Compare';
import Match from './components/Match/index';
import Dashboard from './containers/Dashboard/Dashboard';
import Bubble from './containers/Bubble/Bubble';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: Full },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/compare', name: 'Compare', component: Compare },
  { path: '/match', name: 'Match', component: Match },
  { path: '/bubble', name: 'Bubble', component: Bubble },
];

export default routes;
