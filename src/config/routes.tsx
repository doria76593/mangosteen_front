import { RouteRecordRaw } from 'vue-router';
import { Welcome } from '../views/Welcome';
import { Fourth } from '../components/welcome/Fourth';
import { First } from '../components/welcome/First';
import { Second } from '../components/welcome/Second';
import { Third } from '../components/welcome/Third';

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: Welcome,
    children: [
      { path: '1', component: First },
      { path: '2', component: Second },
      { path: '3', component: Third },
      { path: '4', component: Fourth },
      { path: '', redirect: '/welcome/1' },
    ],
  },
];
