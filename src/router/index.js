import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//import Login from '../components/Login.vue'  // Importa el componente Login
import RegisterView from '../components/Register.vue' // Asegúrate de que este archivo exista
import LoginView from '../components/Login.vue' // O la ruta correcta a tu componente
import GestionEstacionamiento from '../components/GestionEstacionamiento.vue' // Asegúrate de crear este archivo

//const router = createRouter({
//  history: createWebHistory(import.meta.env.BASE_URL),

const routes = [  
  //routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView // ESTO ES LO IMPORTANTE: Un solo componente
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView // ESTO ES LO IMPORTANTE: Un solo componente
    },
    { 
      path: '/gestion-estacionamiento', 
      name: 'gestion', 
      component: GestionEstacionamiento,
      meta: { requiresAuth: true } // Marca la ruta como protegida
    },

    { path: '/', redirect: '/login' }    
  ]
  const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user_token');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si la ruta requiere auth y no hay token, manda al login
    next('/login');
  } else {
    next();
  }
})

export default router

