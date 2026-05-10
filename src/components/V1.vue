<template>
  <div class="gestion-container">
    <header class="header-admin">
      <h1>Panel de Gestión de Estacionamiento</h1>
      <button @click="handleLogout" class="btn-logout">Cerrar Sesión</button>
    </header>

    <main class="content">
      <div class="stats-card">
        <h3>Bienvenido al Sistema</h3>
        <p>Aquí podrás gestionar el ingreso y salida de vehículos.</p>
      </div>
      </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem('user_token');
  localStorage.removeItem('user_info');
  router.push('/login');
};
</script>

<style scoped>
.header-admin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
}
.btn-logout {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.gestion-container {
  padding: 20px;
}
</style>