Autor: Ruben Acosta  
# Sistema de Gestión de Estacionamiento 🚗🅿️

Este proyecto consiste en una aplicación web moderna para la administración de ingresos, salidas y disponibilidad de espacios en un estacionamiento. Utiliza un frontend construido en **Vue.js** y un backend simulado con **JSON Server Auth** para pruebas locales y manejo de autenticación.

---

## 🛠️ Estructura del Proyecto

El repositorio está organizado de la siguiente manera:

* `/src`: Código fuente del frontend en Vue.js.
* `/public`: Archivos estáticos.
* `db.json`: Base de datos local para el servidor simulado.
* `auth-middleware`: Configuración de reglas de acceso para el servidor.
* `package.json`: Definición de dependencias y scripts de ejecución.

---

## 🚀 Requisitos Previos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) en el presente proyecto se uso la version 20 TLS de Node.js 
- [npm](https://www.npmjs.com/)

---

## 🔧 Configuración del Servidor Local (Backend)

Para las pruebas se utiliza **json-server --watch db.json --port 3000 --middlewares ./auth-middleware.cjs**, que permite simular una API REST con persistencia de datos y protección de rutas mediante JWT (JSON Web Tokens).

### Archivos del Servidor:
- `db.json`: Contiene las colecciones de `usuarios`, `registros`.


### Comandos para el Servidor:

1. **Instalar el servidor globalmente** (solo si no lo tienes):
   ```bash
   npm install json-server@0.17.4
   
2. **Levantar el servidor**
Ejecuta el siguiente comando en la raíz del proyecto:
Bash

      npm run backend:auth

El servidor estará disponible en: http://localhost:3000   


## Configuración del Frontend (Vue.js)

El frontend ha sido desarrollado utilizando Vue 3 y diversas herramientas para la gestión de estado y rutas.
Documentos e Implementaciones:

Comandos para el Frontend:

    Instalar dependencias:
    Bash

        npm install

    Ejecutar en modo desarrollo:
    Bash

        npm run dev


La aplicación será accesible en http://localhost:5173/


## 📝 Notas de Uso

    Primero, levantar el servidor (puerto 3000) antes de iniciar el frontend.

    El sistema requiere login, por lo tanto se debe registrar un usuario en el endpoint /register o utilizar uno ya existente en el archivo db.json.

    El archivo db.json se actualizará automáticamente con cada operación realizada desde la interfaz.
