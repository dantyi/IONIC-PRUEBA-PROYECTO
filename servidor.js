const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Configuración del middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para manejar la solicitud de registro
app.post('/registro', (req, res) => {
  // Obtener los datos enviados en el formulario
  const { name, email, password, birthdate } = req.body;

  // Crear una cadena con los datos a almacenar en el archivo
  const data = `Nombre: ${name}\nCorreo electrónico: ${email}\nContraseña: ${password}\nFecha de Nacimiento: ${birthdate}\n\n`;

  // Almacenar los datos en un archivo de texto
  fs.appendFile('registros.txt', data, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al guardar el registro' });
    } else {
      res.status(200).json({ message: 'Registro exitoso' });
    }
  });
});

// Configurar la carpeta "views" como carpeta de vistas
app.set('views', __dirname + '/views');

// Servir archivos estáticos desde la carpeta "views"
app.use(express.static(app.get('views')));

// Ruta para servir el archivo index1.html como la página principal
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// Ruta para manejar la solicitud de inicio de sesión
app.post('/inicio-sesion', (req, res) => {
  // Obtener los datos enviados en el formulario de inicio de sesión
  const { email, password } = req.body;

 
 

  // Ejemplo de verificación básica (correo electrónico: admin, contraseña: password)
  if (email === 'admin' && password === 'password') {
    res.status(200).json({ message: 'Inicio de sesión exitoso', redirectURL: 'https://www.google.com' });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
