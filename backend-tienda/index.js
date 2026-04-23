const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const Producto = require('./models/Producto');
const Usuario = require('./models/Usuario');
const Categoria = require('./models/Categoria');
const Orden = require('./models/Orden');

Categoria.hasMany(Producto);
Producto.belongsTo(Categoria);

Usuario.hasMany(Orden);
Orden.belongsTo(Usuario);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.post('/api/productos', async (req, res) => {
    try {
        const prod = await Producto.create(req.body);
        res.status(201).json({ mensaje: "Producto creado", producto: prod });
    } catch (e) { res.status(500).json({ error: "Error al crear" }); }
});

app.get('/api/productos', async (req, res) => {
    const lista = await Producto.findAll({ include: Categoria });
    res.json(lista);
});

app.get('/api/productos/:id', async (req, res) => {
    const prod = await Producto.findByPk(req.params.id);
    prod ? res.json(prod) : res.status(404).json({ error: "No encontrado" });
});

app.put('/api/productos/:id', async (req, res) => {
    try {
        await Producto.update(req.body, { where: { id: req.params.id } });
        res.json({ mensaje: "Producto actualizado" });
    } catch (e) { res.status(500).json({ error: "Error al actualizar" }); }
});

app.delete('/api/productos/:id', async (req, res) => {
    await Producto.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: "Producto eliminado" });
});

app.post('/api/categorias', async (req, res) => {
    const cat = await Categoria.create(req.body);
    res.status(201).json(cat);
});

app.get('/api/categorias', async (req, res) => {
    const lista = await Categoria.findAll();
    res.json(lista);
});

app.get('/api/categorias/:id', async (req, res) => {
    const cat = await Categoria.findByPk(req.params.id);
    res.json(cat);
});

app.put('/api/categorias/:id', async (req, res) => {
    await Categoria.update(req.body, { where: { id: req.params.id } });
    res.json({ mensaje: "Categoría actualizada" });
});

app.delete('/api/categorias/:id', async (req, res) => {
    await Categoria.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: "Categoría eliminada" });
});

app.post('/api/registro', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const existe = await Usuario.findOne({ where: { email } });
        if (existe) return res.status(400).json({ error: "Email ya existe" });
        
        const user = await Usuario.create({ nombre, email, password });
        res.status(201).json({ mensaje: "Usuario creado", usuario: user });
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: "Error registro" }); 
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ where: { email } });
    
    if (!user || user.password !== password) return res.status(401).json({ error: "Credenciales inválidas" });
    
    res.json({ mensaje: "Login OK", usuario: { id: user.id, nombre: user.nombre, rol: user.rol } });
});

app.post('/api/ordenes', async (req, res) => {
    try {
        const { total, UsuarioId } = req.body; 
        const nuevaOrden = await Orden.create({ total, UsuarioId });
        res.status(201).json({ mensaje: "Orden creada", orden: nuevaOrden });
    } catch (e) { res.status(500).json({ error: "Error al crear orden" }); }
});

app.get('/api/ordenes', async (req, res) => {
    const ordenes = await Orden.findAll({ include: Usuario });
    res.json(ordenes);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

sequelize.sync({ alter: true }).then(() => {
    console.log("Tablas sincronizadas");
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch(error => console.error("Error BD:", error));