const express = require('express');
const router = express.Router();
const db = require('../config/database');

//Rota get - lista todos os devs

router.get('/', (req, res) => {
    const query = 'SELECT id_devs, nome, funcao, foto, frase FROM tbl_devs ORDER BY id_devs';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar os desenvolvedores', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        res.json(results);
    });
});

//Rota Post - Cadastra um novo dev

router.post('/', (req, res) => {
    const { funcao, nome, foto, frase } = req.body;

    const sql = "INSERT INTO tbl_devs(funcao, nome, foto, frase) VALUES (?, ?, ?, ?)";

    db.query(sql, [funcao, nome, foto, frase], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                erro: "Erro ao Inserir"
            });
        };

        res.status(201).json({
            sucesso: true,
            mensagem: "Desenvolvedor Cadastrado com sucesso!",
            id: result.insertId
        })
    });

});

//Rota DELETE

router.delete('/:id', (req, res) => {

    console.log("DELETE CHEGOU NA ROTA!");
    console.log("ID recebido:", req.params.id);
    
    const { id } = req.params;

    const sql = "DELETE FROM tbl_devs WHERE id_devs = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                erro: "Erro ao Deletar"
            });
        };

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Desenvolvedor não encontrado' });
        };

        res.json({
            sucesso: true,
            mensagem: "Desenvolvedor deletado com sucesso!"
        });
    });

});

module.exports = router;