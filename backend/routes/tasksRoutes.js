//Rota das tarefas

const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
    const query = 'SELECT id_tasks, nomeTasks, tempo, relevancia, status FROM tbl_tasks ORDER BY id_tasks';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar tarefas:', err);
            return res.status(500).json({ error: 'Erro interno do servidor'});
        }
        res.json(results);
    });
});

//Rota Post - Cadastra uma nova task

router.post('/', (req, res) => {
    const { nomeTasks, tempo, relevancia, status } = req.body;

    const sql = "INSERT INTO tbl_tasks(nomeTasks, tempo, relevancia, status) VALUES (?, ?, ?, ?)";

    db.query(sql, [nomeTasks, tempo, relevancia, status], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                erro: "Erro ao Inserir"
            });
        };

        res.status(201).json({
            sucesso: true,
            mensagem: "Tarefa Cadastrada com sucesso!",
            id: result.insertId
        })
    });

});

//Rota DELETE

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sqlDeleteVinculos = 'DELETE FROM tbl_usersTasks WHERE id_tasks = ?';
    const sqlDeleteTask = 'DELETE FROM tbl_tasks WHERE id_tasks = ?';

    db.query(sqlDeleteVinculos, [id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                erro: "Erro ao remover vínculos da tarefa"
            });
        }

        db.query(sqlDeleteTask, [id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    erro: "Erro ao Deletar"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }

            res.json({
                sucesso: true,
                mensagem: "Tarefa deletada com sucesso!"
            });
        });
    });
});

module.exports = router;