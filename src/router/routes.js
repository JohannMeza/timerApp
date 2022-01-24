import { createRouter, createWebHistory } from 'vue-router';

// --- Componentes
import AlarmHome from '../components/alarm/AlarmHome.vue';
import TimerHome from '../components/timer/TimerHome.vue';
import ChronometerHome from '../components/chronometer/ChronometerHome.vue';
import PomodoroHome from '../components/pomodoro/PomodoroHome.vue';

import FormConponent from '../components/common/FormComponents.vue'
import NotFound from '../components/common/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'AlarmHome',
    component: AlarmHome,
  },
  {
    path: '/timer',
    name: 'TimerHome',
    component: TimerHome
  },
  {
    path: '/chronometer',
    name: 'ChronometerHome',
    component: ChronometerHome
  },
  {
    path: '/work',
    name: 'PomodoroHome',
    component: PomodoroHome
  },
  {
    path: '/form/:location',
    name: 'FormConponent',
    param: true,
    component: FormConponent,
    beforeEnter: (to, from, next) => {
      if (to.fullPath.split('/').pop() === 'alarm' || to.fullPath.split('/').pop() === 'work') {
        return next()
      }
      router.push({ path: '/NotFound' })
      next()
    }
  },
  {
    path: '/:pathMedia(.*)',
    name: 'PageNotFound',
    component: NotFound
  },
];

const history = createWebHistory();

const router = new createRouter({
  history,
  routes,
})

export default router;