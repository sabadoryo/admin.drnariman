import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import Services from './components/views/admin/Services/Services'
import ServicesCreate from './components/views/admin/Services/ServicesCreate'
import ServicesEdit from './components/views/admin/Services/ServicesEdit'
import Diseases from './components/views/admin/Diseases/Diseases'
import DiseasesCreate from './components/views/admin/Diseases/DiseasesCreate'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'services',
        component: Services,
        name: 'Сервисы',
        meta: {description: 'Dr.Nariman clinic'}
      },
      {
        path: 'services/create',
        component: ServicesCreate,
        name: 'Создать сервис'
      },
      {
        path: 'services/edit/:id',
        component: ServicesEdit,
        name: 'Изменить сервис'
      },
      {
        path: 'diseases',
        component: Diseases,
        name: 'Услуги',
        meta: {description: 'Dr.Nariman clinic'}
      },
      {
        path: 'diseases/create',
        component: DiseasesCreate,
        name: 'Создать услугу'
      },
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Клиника Dr.Nariman',
        meta: {description: 'Главная'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
