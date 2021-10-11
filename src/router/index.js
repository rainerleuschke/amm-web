import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Actions = () => import('@/views/Actions')
const Modules = () => import('@/views/Modules')
const Scenarios = () => import('@/views/Scenarios')
const Supervisor = () => import('@/views/Supervisor')

Vue.use(Router)

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'actions',
          name: 'Actions',
          component: Actions,
        },
        {
          path: 'scenarios',
          name: 'Scenarios',
          component: Scenarios,
        },
        {
          path: 'modules',
          name: 'Modules',
          component: Modules,
        },
	{
	  path: 'supervisor',
	  name: 'Supervisor',
	  component: Supervisor,
	},
      ]
    },
  ]
}

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})
