const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/usersRoutes');
const userTasksRoutes = require('./routes/userTasksRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const devsRoutes = require('./routes/devsRoutes');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

//ROTAS - USUÁRIOS
app.use('/users', usersRoutes);

//ROTAS - USUÁRIOS E TAREFAS
app.use('/user-tasks', userTasksRoutes)

//ROTAS - TAREFAS
app.use('/tasks', tasksRoutes);

//ROTAS - DEVS
app.use('/devs', devsRoutes);

//ROTAS
app.get('/', (req, res) => {
    res.json({message: 'Foi'})
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});