
import Full from './containers/DefaultLayout/DefaultLayout.js';
import ZoomableLayout from './components/ZoomableLayout/ZoomableLayout';
import Compare from './containers/Compare/Compare';
import Dashboard from './containers/Dashboard/Dashboard';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: Full },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/zoomablelayout', name: 'ZoomableLayout', component: ZoomableLayout },
  { path: '/compare', name: 'Compare', component: Compare },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

export default routes;
