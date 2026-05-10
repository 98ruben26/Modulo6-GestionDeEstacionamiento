//module.exports = (req, res, next) => {
//  console.log(`Petición recibida: ${req.method} ${req.url}`);
//  next();
//};
/*
module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    const { email, password } = req.body;
    // Aquí debe buscar en tu db.json (puedes simularlo para probar)
    if (email === 'admin@admin.com' && password === '123456') {
      res.status(200).json({
        accessToken: "token-de-prueba-123"
      });
    } else {
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } else {
    next(); // Permite que otras peticiones sigan su curso
  }
};
*/



const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    const { email, password } = req.body;

    // 1. Leer el archivo db.json
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));

    // 2. Buscar al usuario en la lista de 'users'
    const user = dbData.users.find(u => u.email === email && u.password === password);

    if (user) {
      // 3. Si existe, devolver éxito y el token
      res.status(200).json({
        accessToken: "token-generado-" + Math.random().toString(36).substring(7),
        user: {
          name: user.name,
          email: user.email
        }
      });
    } else {
      // 4. Si no coincide, error de autorización
      res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
  } else {
    next();
  }
};