# estacionamiento2
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
en el presente proyecto se uso la version 20 de Node.js 
- [Node.js](https://nodejs.org/) (Versión LTS recomendada)
- [npm](https://www.npmjs.com/)

---

## 🔧 Configuración del Servidor Local (Backend)

Para las pruebas se utiliza **json-server --watch db.json --port 3000 --middlewares ./auth-middleware.cjs**, que permite simular una API REST con persistencia de datos y protección de rutas mediante JWT (JSON Web Tokens).

### Archivos del Servidor:
- `db.json`: Contiene las colecciones de `usuarios`, `vehiculos` y `lugares`.


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


Para que tu proyecto de Gestión de Estacionamiento sea profesional y fácil de usar por otros (o por ti mismo en el futuro), el archivo README.md debe ser claro y estar bien estructurado.

Aquí tienes una propuesta completa de contenido para tu archivo. Puedes copiar y pegar esto directamente en un archivo llamado README.md en la raíz de tu proyecto.
Markdown

# Sistema de Gestión de Estacionamiento 🚗🅿️

Este proyecto consiste en una aplicación web moderna para la administración de ingresos, salidas y disponibilidad de espacios en un estacionamiento. Utiliza un frontend construido en **Vue.js** y un backend simulado con **JSON Server Auth** para pruebas locales y manejo de autenticación.

---

## 🛠️ Estructura del Proyecto

El repositorio está organizado de la siguiente manera:

* `/src`: Código fuente del frontend en Vue.js.
* `/public`: Archivos estáticos.
* `db.json`: Base de datos local para el servidor simulado.
* `auth.json` (opcional): Configuración de reglas de acceso para el servidor.
* `package.json`: Definición de dependencias y scripts de ejecución.

---

## 🚀 Requisitos Previos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (Versión LTS recomendada)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

---

## 🔧 Configuración del Servidor Local (Backend)

Para las pruebas se utiliza **json-server-auth**, que permite simular una API REST con persistencia de datos y protección de rutas mediante JWT (JSON Web Tokens).

### Archivos del Servidor:
- `db.json`: Contiene las colecciones de `usuarios`, `vehiculos` y `lugares`.

### Comandos para el Servidor:

1. **Instalar el servidor globalmente** (solo si no lo tienes):
   ```bash
   npm install -g json-server-auth

    Levantar el servidor:
    Ejecuta el siguiente comando en la raíz del proyecto:
    Bash

    json-server-auth db.json --port 3000

    El servidor estará disponible en: http://localhost:3000

💻 Configuración del Frontend (Vue.js)

El frontend ha sido desarrollado utilizando Vue 3 y diversas herramientas para la gestión de estado y rutas.
Documentos e Implementaciones:

    Componentes: Gestión de plazas, registro de entradas/salidas y panel de administración.

    Servicios: Axios configurado para comunicarse con el servidor local e incluir el Token en las cabeceras.

    Seguridad: Navigation Guards para proteger rutas que requieren inicio de sesión.

Comandos para el Frontend:

    Instalar dependencias:
    Bash

    npm install

    Ejecutar en modo desarrollo:
    Bash

    npm run serve

    La aplicación será accesible en: http://localhost:8080

    Compilar para producción:
    Bash

    npm run build

## 📝 Notas de Uso

    Primero, levantar el servidor (puerto 3000) antes de iniciar el frontend.

    El sistema requiere login, por lo tanto se debe registrar un usuario en el endpoint /register o utilizar uno ya existente en el archivo db.json.

    El archivo db.json se actualizará automáticamente con cada operación realizada desde la interfaz.
