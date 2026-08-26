const express = require('express');
const router = express.Router();
const db = require('../config/database.js')

//Rota GET
router.get('/', (req, res) => {
    const query = 'SELECT id_users, nome, usuario FROM tbl_users';
    db.query(query, (err, results) =>{
        if (err) {
            console.error('Erro ao buscar usuários', err);
            return res.status(500).json({ error: 'Erro interno do servidor'});
        }
        res.json(results);
    });
});

//Rota GET - busca por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id_users, nome, usuario FROM tbl_users WHERE id_users = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ error: 'Erro interno do servidor'});
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado'});
        }

        res.json(results[0])
    });
});

//Rota POST

router.post('/', (req, res) => {
    const { nome, usuario, senha } = req.body;

    const sql = "INSERT INTO tbl_users(nome, usuario, senha) VALUES (?, ?, ?)";

    db.query(sql, [nome, usuario, senha], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                erro: "Erro ao Inserir"
            });
        };

        res.status(201).json({
            sucesso: true,
            mensagem: "Usuário Cadastrado com sucesso!",
            id: result.insertId
        })
    });

});

//Rota DELETE

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sqlDeleteVinculos = 'DELETE FROM tbl_usersTasks WHERE id_users = ?';
    const sqlDeleteUser = 'DELETE FROM tbl_users WHERE id_users = ?';

    db.query(sqlDeleteVinculos, [id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                erro: "Erro ao remover vínculos do usuário"
            });
        }

        db.query(sqlDeleteUser, [id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    erro: "Erro ao Deletar"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.json({
                sucesso: true,
                mensagem: "Usuário deletado com sucesso!"
            });
        });
    });
});

module.exports = router;