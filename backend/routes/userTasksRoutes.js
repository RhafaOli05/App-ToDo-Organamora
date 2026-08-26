const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Rota GET - usuários com suas tarefas
router.get('/', (req, res) => {
    const query = `
        SELECT 
            u.id_users,
            u.nome,
            u.usuario,
            t.id_tasks,
            t.nomeTasks,
            t.tempo,
            t.relevancia,
            t.status,
            ut.horario
        FROM tbl_users u
        LEFT JOIN tbl_usersTasks ut ON u.id_users = ut.id_users
        LEFT JOIN tbl_tasks t ON ut.id_tasks = t.id_tasks
        ORDER BY u.id_users, t.id_tasks
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários e tarefas:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        
        // Agrupar tarefas por usuário
        const usersMap = new Map();
        
        results.forEach(row => {
            if (!usersMap.has(row.id_users)) {
                usersMap.set(row.id_users, {
                    id_users: row.id_users,
                    nome: row.nome,
                    usuario: row.usuario,
                    tasks: []
                });
            }
            
            if (row.id_tasks) {
                usersMap.get(row.id_users).tasks.push({
                    id_tasks: row.id_tasks,
                    nomeTasks: row.nomeTasks,
                    tempo: row.tempo,
                    relevancia: row.relevancia,
                    status: row.status,
                    horario: row.horario
                });
            }
        });
        
        res.json(Array.from(usersMap.values()));
    });
});

// Rota GET - busca usuário específico com suas tarefas
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT 
            u.id_users,
            u.nome,
            u.usuario,
            t.id_tasks,
            t.nomeTasks,
            t.tempo,
            t.relevancia,
            t.status,
            ut.horario
        FROM tbl_users u
        LEFT JOIN tbl_usersTasks ut ON u.id_users = ut.id_users
        LEFT JOIN tbl_tasks t ON ut.id_tasks = t.id_tasks
        WHERE u.id_users = ?
        ORDER BY t.id_tasks
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário e tarefas:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        const user = {
            id_users: results[0].id_users,
            nome: results[0].nome,
            usuario: results[0].usuario,
            tasks: []
        };
        
        results.forEach(row => {
            if (row.id_tasks) {
                user.tasks.push({
                    id_tasks: row.id_tasks,
                    nomeTasks: row.nomeTasks,
                    tempo: row.tempo,
                    relevancia: row.relevancia,
                    status: row.status,
                    horario: row.horario
                });
            }
        });
        
        res.json(user);
    });
});

//Rota Post - Cadastra um novo user e task

router.post('/', (req, res) => {
    const { id_tasks, id_users, horario } = req.body;

    const sql = "INSERT INTO tbl_usersTasks(id_tasks, id_users, horario) VALUES (?, ?, ?)";

    db.query(sql, [id_tasks, id_users, horario], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                erro: "Erro ao Inserir"
            });
        };

        res.status(201).json({
            sucesso: true,
            mensagem: "Usuário e Tarefa Cadastrada com sucesso!",
            id: result.insertId
        })
    });

});

// Rota DELETE - remove o vínculo entre usuário e tarefa
router.delete('/', (req, res) => {
    const { id_users, id_tasks } = req.query;

    if (!id_users || !id_tasks) {
        return res.status(400).json({ error: 'Informe id_users e id_tasks' });
    }

    const query = 'DELETE FROM tbl_usersTasks WHERE id_users = ? AND id_tasks = ?';

    db.query(query, [id_users, id_tasks], (err, result) => {
        if (err) {
            console.error('Erro ao remover vínculo:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Vínculo não encontrado' });
        }

        res.json({
            sucesso: true,
            mensagem: 'Vínculo removido com sucesso!'
        });
    });
});

module.exports = router;