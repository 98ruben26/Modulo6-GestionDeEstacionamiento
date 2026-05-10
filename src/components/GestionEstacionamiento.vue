<template>
  <div class="gestion-container">
    <header class="header-main">
      <h1><i class="fas fa-parking"></i> Gestión de Estacionamiento</h1>
      <button @click="logout" class="btn-logout">Cerrar Sesión</button>
    </header>

    <div class="content-grid">
      <section class="form-section">
        <div class="card">
          <h3><i class="fas fa-plus-circle"></i> Nuevo Registro</h3>
          <form @submit.prevent="agregarRegistro">
            <div class="form-group">
              <label>Nombre del Empleado</label>
              <input v-model="nuevo.empleado" type="text" placeholder="Ej. Juan Pérez" required />
            </div>

            <div class="form-group">
              <label>Area de Trabajo </label>
               <select v-model="nuevo.area">
                <option value="produccion">-produccion</option>
                <option value="finanzas">-finanzas</option>
                <option value="contabilidad">-contabilidad</option>
              </select>
            </div>


            <div class="form-group">
              <label>Placa del Vehículo</label>
              <input v-model="nuevo.placa" type="text" placeholder="ABC-123" required />
            </div>

            <div class="form-group">
              <label>Tipo de Vehículo</label>
              <select v-model="nuevo.tipo">
                <option value="Auto">🚗 Auto</option>
                <option value="Moto">🏍️ Moto</option>
              </select>
            </div>

            <div class="form-group">
              <label>color de vehiculo</label>
              <input v-model="nuevo.color" type="text" placeholder="Ej. Rojo" required />
            </div>



            <div class="form-row">
              <div class="form-group">
                <label>Entrada</label>
                <input v-model="nuevo.horaEntrada" type="time" required />
              </div>
              <div class="form-group">
                <label>Salida Estimada</label>
                <input v-model="nuevo.horaSalida" type="time" required />
              </div>
            </div>

            <button type="submit" class="btn-submit" :disabled="enviando">
              {{ enviando ? 'Guardando...' : 'Registrar Ingreso' }}
            </button>
          </form>
        </div>
      </section>

      <section class="table-section">
        <div class="card">
          <h3><i class="fas fa-list"></i> Vehículos en Estancia</h3>
          <table class="styled-table">
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Area</th>
                <th>Vehículo</th>
                <th>Tipo</th>
                <th>color</th>
                <th>Horario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in registros" :key="item.id">
                <td>{{ item.empleado }}</td>
                <td>{{ item.area }}</td>
                <td><strong>{{ item.placa }}</strong></td>
                <td>
                  <span :class="['badge', item.tipo.toLowerCase()]">
                    {{ item.tipo }}
                  </span>
                </td>
                <td>{{ item.color }}</td>
                <td>{{ item.horaEntrada }} - {{ item.horaSalida }}</td>
                <td>
                  <button @click="eliminarRegistro(item.id)" class="btn-delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="registros.length === 0">
                <td colspan="5" class="empty-msg">No hay vehículos registrados</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const registros = ref([]);
const enviando = ref(false);

const nuevo = ref({
  empleado: '',
  area: '',
  placa: '',
  tipo: 'Auto',
  color: '',
  horaEntrada: '',
  horaSalida: ''
});

// Cargar datos al iniciar
const obtenerRegistros = async () => {
  try {
    const res = await fetch('http://localhost:3000/registros');
    registros.value = await res.json();
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

/*
const agregarRegistro = async () => {
  enviando.value = true;
  try {
    const res = await fetch('http://localhost:3000/registros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo.value)
    });
    if (res.ok) {
      await obtenerRegistros();
      // Limpiar formulario
      nuevo.value = { empleado: '', area: '', placa: '', tipo: 'Auto', color: '', horaEntrada: '', horaSalida: '' };
    }
  } catch (error) {
    alert("Error al guardar el registro");
  } finally {
    enviando.value = false;
  }
};

*/

const agregarRegistro = async () => {
  enviando.value = true;
  try {
    const res = await fetch('http://localhost:3000/registros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo.value)
    });
    
    if (res.ok) {
      // Si se guardó con éxito, actualizamos la lista local
      await obtenerRegistros();
      // Reiniciamos el formulario
      nuevo.value = { empleado: '', area: '', placa: '', tipo: 'Auto', color: '', horaEntrada: '', horaSalida: '' };
    }
  } catch (error) {
    console.error("Error al guardar:", error);
  } finally {
    enviando.value = false;
  }
};


const eliminarRegistro = async (id) => {
  if (confirm("¿Confirmar salida del vehículo?")) {
    await fetch(`http://localhost:3000/registros/${id}`, { method: 'DELETE' });
    obtenerRegistros();
  }
};

const logout = () => {
  localStorage.removeItem('user_token');
  router.push('/login');
};

onMounted(obtenerRegistros);
</script>

<style scoped>
.gestion-container {

  width: 95%; /* Cambia 95% por 100% para controlar el margen internamente */
  max-width: 100%; 
  margin: 0 auto; /* Quita el margin: 0 auto si quieres que use todo el borde */
  padding: 2rem; 
  box-sizing: border-box; /* Asegura que el padding no desborde el ancho */

}




.header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #42b883;
  padding-bottom: 1rem;

}

.content-grid {
  
  display: grid;
  /* Mantiene el formulario en un tamaño fijo y la tabla se expande */
  grid-template-columns: 350px 1fr; 
  gap: 2rem;
  width: 100%;
}



.card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 100%; /* Asegura que la tarjeta use todo el espacio del grid */
  height: fit-content;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.4rem;
  color: #2c3e50;
}

input, select {
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn-submit {
  width: 100%;
  padding: 0.8rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto; /* Permite que las columnas se ajusten al contenido */
}

.styled-table th {
  text-align: left;
  background: #f8f9fa;
  padding: 1rem;
  border-bottom: 2px solid #eee;
}

.styled-table td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.badge {
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.badge.auto { background: #e3f2fd; color: #1976d2; }
.badge.moto { background: #fff3e0; color: #f57c00; }

.btn-delete {
  background: #ff5252;
  color: white;
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-logout {
  background: #2c3e50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}
</style>