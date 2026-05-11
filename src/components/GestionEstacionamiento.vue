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
        <div class="table-tools">
          <div class="search-box">
            <input v-model="filtroNombre" type="text" placeholder="🔍 Buscar por nombre de empleado..." />
          </div>
            <div class="filter-box">
                <select v-model="filtroTipo">
                    <option value="Todos">Todos los vehículos</option>
                    <option value="Auto">🚗 Autos</option>
                    <option value="Moto">🏍️ Motos</option>
                </select>
            </div>
        </div>
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
              <tr v-for="item in registrosFiltrados" :key="item.id">
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
                
                <td class="actions-td">
                    <button @click="cargarEdicion(item)" class="btn-edit" title="Editar registro">
                        <i class="fas fa-edit"></i> </button>
  
                    <button @click="eliminarRegistro(item.id)" class="btn-delete" title="Eliminar registro">
                        <i class="fas fa-trash-alt"></i> </button>
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
//import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
//import { t } from 'vue-router/dist/index-D_VEAp3P.js';



// ESTADO PARA EDICIÓN
const router = useRouter();
const registros = ref([]);
const enviando = ref(false);

// 1. Añadir estados para filtros
const filtroNombre = ref('');
const filtroTipo = ref('Todos');

// 2. Añadir estado para saber si estamos editando
const editandoId = ref(null);

const nuevo = ref({
  empleado: '',
  area: '',
  placa: '',
  tipo: 'Auto',
  color: '',
  horaEntrada: '',
  horaSalida: ''
});


// 3. Crear la propiedad computada para filtrar la tabla en tiempo real
const registrosFiltrados = computed(() => {
  return registros.value.filter(item => {
    const coincideNombre = item.empleado.toLowerCase().includes(filtroNombre.value.toLowerCase());
    const coincideTipo = filtroTipo.value === 'Todos' || item.tipo === filtroTipo.value;
    return coincideNombre && coincideTipo;
  });
});

// 4. Función para cargar datos en el formulario al editar
const prepararEdicion = (item) => {
  editandoId.value = item.id;
  nuevo.value = { ...item }; // Copia los datos al formulario
};

// 5. Función para limpiar el modo edición
const cancelarEdicion = () => {
  editandoId.value = null;
  nuevo.value = { empleado: '', area: 'produccion', placa: '', tipo: 'Auto', horaEntrada: '', horaSalida: '' };
};


// FUNCIONES DE EDICIÓN
const cargarEdicion = (item) => {
  editandoId.value = item.id;
  nuevo.value = { ...item }; // Copiamos los datos al formulario
};

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
  const url = editandoId.value 
    ? `http://localhost:3000/registros/${editandoId.value}` 
    : 'http://localhost:3000/registros';
  
  const metodo = editandoId.value ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo.value)
    });
    
    if (res.ok) {
      await obtenerRegistros();
      cancelarEdicion();
    }
  } catch (error) {
    alert("Error en la operación");
  } finally {
    enviando.value = false;
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
*/


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

.table-tools {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.search-box { flex: 2; }
.filter-box { flex: 1; }
.search-box input, .filter-box select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ddd;
}
.btn-edit {
  background: #f1c40f;
  color: white;
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}


/* Añade o actualiza estos estilos en tu sección <style scoped> */

.actions-td {
  display: flex;
  gap: 8px; /* Espacio entre botones */
  justify-content: center;
}

.btn-edit, .btn-delete {
  border: none;
  border-radius: 6px; /* Bordes suaves */
  padding: 8px 10px;
  cursor: pointer;
  transition: all 0.3s ease; /* Transición suave para el color */
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Estilo específico para Editar (Amarillo/Naranja) */
.btn-edit {
  background-color: #f1c40f;
  color: #fff;
}

.btn-edit:hover {
  background-color: #d4ac0d; /* Se oscurece al pasar el mouse */
  transform: translateY(-2px); /* Pequeño salto visual */
}

/* Estilo específico para Eliminar (Rojo) */
.btn-delete {
  background-color: #e74c3c;
  color: #fff;
}

.btn-delete:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}


</style>