<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Acceso al Sistema</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input 
            v-model="email" 
            type="email" 
            id="email" 
            placeholder="ejemplo@correo.com" 
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            v-model="password" 
            type="password" 
            id="password" 
            placeholder="********" 
            required
          />
        </div>

        <button type="submit" class="btn-login" :disabled="isLoading">
          {{ isLoading ? 'Cargando...' : 'Ingresar' }}
        </button>
        </form>

        <div class="register-section">
            <p>¿No tienes una cuenta?</p>
                <button @click="goToRegister" class="btn-register">
                Registrar nuevo usuario
            </button>
        </div>   
        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
//import Register from './Register.vue';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const router = useRouter();

// Función para redirigir al componente de registro
const goToRegister = () => {
  router.push('/register');
};

/*
const handleLogin = async () => {
  isLoading.ref = true;
  errorMessage.value = '';

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Credenciales incorrectas');
    }

    // Guardar el token (ajusta según lo que devuelva tu auth-middleware.cjs)
    localStorage.setItem('user_token', data.accessToken);
    
    // Redirigir al inicio del proyecto
    router.push('/dashboard');
    
  } catch (err) {
    errorMessage.value = err.message;
  } finally {
    isLoading.value = false;
  }
};  */

const handleLogin = async () => {
  isLoading.value = true; // Nota: corregido de isLoading.ref a isLoading.value
  errorMessage.value = '';

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Credenciales incorrectas');
    }

    // 1. Almacenar el token de autorización
    // El middleware suele devolver 'accessToken' o 'token'
    localStorage.setItem('user_token', data.accessToken || data.token);
    
    // 2. Almacenar datos del usuario si es necesario (opcional)
    localStorage.setItem('user_info', JSON.stringify(data.user));

    // 3. Redirigir al componente de gestión de estacionamiento
    router.push('/gestion-estacionamiento');
    
  } catch (err) {
    errorMessage.value = err.message;
  } finally {
    isLoading.value = false;
  }
};




</script>

<style scoped>


.register-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  text-align: center;
}

.register-section p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.btn-login {
  width: 100%;
  padding: 0.8rem;
  background-color: #42b883; /* Verde Vue */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-register {
  width: 100%;
  padding: 0.8rem;
  background-color: transparent;
  color: #42b883;
  border: 1px solid #42b883;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-register:hover {
  background-color: #f0fff8;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
input {
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.8rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
button:disabled {
  background-color: #a8d5c2;
}
.error-msg {
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}
</style>


