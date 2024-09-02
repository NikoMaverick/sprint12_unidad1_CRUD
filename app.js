// CORREGIDO EN CLASE

const express = require("express")
const app = express()

let usuarios = [
  { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
  { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
  { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
  { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
  { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

let nextId = usuarios.length + 1

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
      <h1>Luchadores Street Fighter II</h1>
      <ul>
        ${usuarios.map(usuario => `<li>
          <h2>Nombre: ${usuario.nombre}</li></h2>
          <p>Edad: ${usuario.edad}</p>
          <p>procedencia: ${usuario.lugarProcedencia}</p>
          `).join("")}
      </ul>
      </body>
</html>
  `)
})

app.get("/usuarios", (req, res) => {
  res.json(usuarios)
})

app.get("/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre
  const usuario = usuarios.find(usuario => usuario.nombre === nombre)

  if(!usuario) {
    res.status(404).json({mensaje: "El usuario no existe"})
  } else {
    res.json(usuario)
  }
})

app.post("/usuarios", (req, res) => {
  const nuevoUsuario = {
    // id: usuarios.length + 1,
    id: nextId++,
    nombre: req.body.nombre,
    edad: req.body.edad,
    lugarProcedencia: req.body.lugarProcedencia
  }
  usuarios.push(nuevoUsuario)
  res.redirect("/usuarios")
})

app.put("/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre
  const nombreNuevo = req.body.nombre || ""
  const edadNueva = req.body.edad || ""
  const ProcedenciaNueva = req.body.lugarProcedencia

  const index = usuarios.findIndex(usuario => usuario.nombre === nombre)

  if(index === -1) {
    res.status(404).json({error: "usuario no encontrado"})
  } else {
    usuarios[index] = {
      ...usuarios[index], 
      nombre: nombreNuevo || usuarios[index].nombre, 
      edad: edadNueva || usuarios[index].edad,
      lugarProcedencia: ProcedenciaNueva || usuarios[index].lugarProcedencia
    }
    res.json(usuarios[index])
  }
})

app.delete("/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre
  const index = usuarios.findIndex(usuario => usuario.nombre === nombre)

  if(index === -1) {
    res.status(404).json({error: "usuario no encontrado"})
  } else {
    usuarios = usuarios.filter(usuario => usuario.nombre !== nombre)
    res.json({mensaje: "usuario eliminado correctamente"})
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`La aplicación CRUD está escuchando en el puerto http://localhost:${PORT}`)
})


// MI EJERCICIO SIN TERMINAR

/*const express = require ('express');
const app = express();

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

// READ
app.get('/', (req, res) => {
    res.send(`<h1>Lista de usuarios</h1>
        <ul>
        ${usuarios
            .map(
                (usuario) => `<li><strong>ID:</strong> ${usuario.id},  <strong>Nombre:</strong> ${usuario.nombre}, <strong>Edad:</strong> ${usuario.edad} años, <strong>Procedencia:</strong> ${usuario.lugarProcedencia}</li>`
            )
            .join('')}
            </ul>
            <form action="/usuarios" method="post" required>
            <label for"nombre">Nombre</label>
            <input type="text" id"nombre" name"nombre" required>
            <button type="submit">Agrega nombre</button>
            <label for"edad">Edad</label>
            <input type="number" id"number" name"nombre" required>
            <button type="submit">Agrega edad</button>
            <label for"lugar">Precedencia</label>
            <input type="pais" id"pais" name"pais" required>
            <button type="submit">Agrega Procedencia</button>
            </form>
            `);
});

// CREATE

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuarios' (req, rep) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia,
    };
    usuario.push(nuevoUsuario);
    req.redirect('/');
})

app.listen (3000, () => {
    console.log('Express esta escuchando en el puerto 3000')
})

*/