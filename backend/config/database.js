const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'dbdados',
    port: Number(process.env.DB_PORT) || 3306
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err.code, '-', err.message);
        return;
    }
    console.log(`Conectado ao MySQL! (host: ${db.config.host}:${db.config.port}, banco: ${db.config.database})`);
});

module.exports = db;
