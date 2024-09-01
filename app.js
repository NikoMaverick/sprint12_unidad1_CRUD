const express = require ('express');
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