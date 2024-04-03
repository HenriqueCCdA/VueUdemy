import { createRouter, createWebHistory } from 'vue-router';


import TeamsList from './components/pages/TeamsList.vue';
import UsersList from './components/pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/pages/NotFound.vue';
import TeamsFooter from './components/pages/TeamsFooter.vue';
import UsersFooter from './components/pages/UsersFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/teams'},
      {
        name: 'teams',
        path: '/teams',
        meta: { needsAuth: true},
        components: { default: TeamsList, footer: TeamsFooter },
        children: [
          { name: 'team-members', path: ':teamId', component: TeamMembers, props: true },
        ]
      },
      { path: '/users', components: { default: UsersList, footer: UsersFooter } },
      { path: '/:notFound(.*)', component: NotFound},
    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savedPosition) {
      if(savedPosition) {
        return savedPosition;
      }

      return { left: 0, top: 0};
    }
  });

  router.beforeEach(function(to, from, next) {
    console.log('Gobal beforeEach')
    console.log(to, from);
    if(to.meta.needsAuth) {
      console.log('Needs auth!');
      next();
    } else {
      next();
    }
    // if (to.name === 'team-members') {
    //   next();
    // } else {
    //   next({name: 'team-members', params: { teamId: 't2'}});
    // }
  });

export default router;
