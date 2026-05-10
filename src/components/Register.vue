<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Crear Cuenta</h2>
      <p class="subtitle">Ingresa tus datos para registrarte en el sistema</p>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Nombre Completo</label>
          <input 
            v-model="name" 
            type="text" 
            id="name" 
            placeholder="Juan Pérez" 
            required 
          />
        </div>

        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input 
            v-model="email" 
            type="email" 
            id="email" 
            placeholder="correo@ejemplo.com" 
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

        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña</label>
          <input 
            v-model="confirmPassword" 
            type="password" 
            id="confirmPassword" 
            placeholder="********" 
            required 
          />
        </div>

        <button type="submit" class="btn-register" :disabled="isLoading">
          {{ isLoading ? 'Procesando...' : 'Registrarme' }}
        </button>

        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>

        <div class="login-link">
          <p>¿Ya tienes cuenta? <a @click.prevent="goToLogin" href="#">Inicia sesión aquí</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();

const goToLogin = () => {
  router.push('/login');
};

const handleRegister = async () => {
  // 1. Validación básica de contraseñas
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    // 2. Petición al backend (json-server)
    // Nota: El endpoint depende de tu auth-middleware, usualmente es /users o /register
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value, // En un entorno real, el backend debería hashear esto
        role: 'user' // Puedes asignar un rol por defecto
      })
    });

    if (!response.ok) {
      throw new Error('Error al crear la cuenta. Es posible que el correo ya exista.');
    }

    successMessage.value = '¡Registro exitoso! Redirigiendo...';
    
    // 3. Redirigir al login después de un breve delay
    setTimeout(() => {
      router.push('/login');
    }, 2000);

  } catch (err) {
    errorMessage.value = err.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7f6;
}

.register-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 450px;
}

h2 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 0.85rem;
  color: #34495e;
}

input {
  padding: 0.75rem;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #42b883;
}

.btn-register {
  width: 100%;
  padding: 0.9rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 1rem;
}

.btn-register:hover {
  background-color: #3aa876;
}

.btn-register:disabled {
  background-color: #a8d5c2;
  cursor: not-allowed;
}

.error-msg {
  color: #e74c3c;
  background-color: #fdeaea;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.85rem;
}

.success-msg {
  color: #27ae60;
  background-color: #e9f7ef;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.85rem;
}

.login-link {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
}

.login-link a {
  color: #42b883;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>