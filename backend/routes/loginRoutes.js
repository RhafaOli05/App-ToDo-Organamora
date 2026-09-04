const express = require('express');
const router = express.Router();

const db = require('../config/database');

router.post('/', (req, res) => {
    const { email, senha } = req.body;

    const sql = 
        `SELECT * FROM tbl_registration
        WHERE email = ? AND senha = ? `;

    db.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                erro: 'Erro ao realizar login'
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                sucesso: false,
                mensagem: "E-mail ou senha inválidos"
            });
        }

        res.json({
            sucesso: true,
            mensagem: "Login realizado com sucesso",
            usuario: result[0]
        });
    });
});

//CADASTRO

router.post('/registration', (req, res) => {
    const { nome, email, senha } = req.body;

    const sql = 
        `INSERT INTO tbl_registration (nome, email, senha)
        VALUES (?, ?, ?)`;

    db.query(sql, [nome, email, senha], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                erro: 'Erro ao realizar cadastro'
            });
        }

        res.status(201).json({
            sucesso: true,
            mensagem: 'Cadastro realizado com sucesso',
            id: result.insertId
        });
    });
});
module.exports = router;