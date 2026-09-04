USE dbDados;

INSERT INTO tbl_devs(nome, funcao, foto, frase) VALUES
('Thiago Mantovani', 'Desenvolvedor Backend (Node.js)', 'https://i.pravatar.cc/150?u=thiago', 'Café é o combustível, mas o código limpo é a alma do projeto.'),
('Beatriz Luz da Silva', 'Desenvolvedora Frontend (React) & CSS', 'https://i.pravatar.cc/150?u=beatriz', 'Acessibilidade não é bonitinho ter.É seu código não presta sem ela'),
('Lucas Ferreira', 'Analista de dados', 'https://i.pravatar.cc/150?u=lucas', 'Dados são o novo petróleo, mas sem refinamento são apenas ruído.'),
('André Souza', 'Especialista em DevOps', 'https://i.pravatar.cc/150?u=andre', 'Automatizar não é luxo, é sobrevivência em escala.'),
('Dioni Mercedes', 'DBA (Database Administrator)', 'https://img.freepik.com/premium-photo/handsome-businessman-suit-glasses-cross-arms-chest-look_1120246-4742.jpg', 'Cada erro é só um else te ensinando uma condição nova.');

INSERT INTO tbl_tasks(nomeTasks, tempo, relevancia, status) VALUES
('Organizar e-mails', '30 min', 'muito importante', 'finalizada'),
('Lavar a louça', '15 min', 'pouco importante', 'finalizada'),
('Estudar para a prova', '120 min', 'muito importante', 'atrasada'),
('Ir à academia', '60 min', 'importante', 'em progresso'),
('Pagar contas do mês', '20 min', 'muito importante', 'finalizada'),
('Fazer compras no mercado', '90 min', 'importante', 'atrasada'),
('Limpar o escritório', '45 min', 'pouco importante', 'em progresso'),
('Preparar marmitas', '120 min', 'importante', 'em progresso'),
('Levar o cachorro para passear', '30 min', 'pouco importante', 'finalizada'),
('Ler 20 páginas de um livro', '40 min', 'importante', 'atrasada'),
('Meditar', '10 min', 'pouco importante', 'finalizada'),
('Atualizar currículo', '60 min', 'muito importante', 'em progresso'),
('Cortar o cabelo', '45 min', 'importante', 'atrasada'),
('Arrumar a cama', '5 min', 'pouco importante', 'finalizada'),
('Responder mensagens de grupo no WhatsApp', '10 min', 'pouco importante', 'finalizada'),
('Backup de arquivos', '30 min', 'muito importante', 'atrasada'),
('Trocar as lâmpadas queimadas', '15 min', 'pouco importante', 'em progresso'),
('Planejar as férias', '90 min', 'importante', 'atrasada'),
('Jantar com a família', '120 min', 'muito importante', 'finalizada'),
('Ir ao cinema', '150 min', 'pouco importante', 'finalizada');

INSERT INTO tbl_users(nome, usuario, senha) VALUES
('Carlos Silva', 'Carlos.Silva_Gerente', 'pbkdf2_sha256$12345$c4rlo5'),
('Ana Oliveira', 'ana_oliveira88', 'secure!Password2024'),
('Bruno Ferreira Vasconcelos', 'brunoFe_devlopmenter', 'bruno@admin85#09'),
('Mariana Souza', 'mari.souza', 'M4riana_Security'),
('Flávia Santos', 'Flavia.santos_admin', 'Fla5678@admin');

INSERT INTO tbl_usersTasks(id_tasks, id_users, horario) VALUES
(2, 1, '22:00'),
(4, 1, '18:00'),
(5, 1, '20:00'),
(18, 1, '10:00'),
(1, 2, '20:30'),
(6, 2, '18:30'),
(9, 2, '21:00'),
(12, 2, '05:00'),
(19, 3, '15:00'),
(16, 3, '16:00'),
(14, 3, '18:00'),
(20, 3, '19:00'),
(3, 4, '15:00'),
(7, 4, '20:00'),
(11, 4, '22:00'),
(13, 4, '14:00'),

(10, 6, '16:00'),
(15, 6, '05:30'),
(17, 6, '16:30'),
(24, 6, '17:30');

-- Inserir a tarefa 24 novamente
INSERT INTO tbl_tasks(id_tasks, nomeTasks, tempo, relevancia, status) VALUES
(24, 'Ir ao cinema', '150 min', 'pouco importante', 'finalizada');

SET FOREIGN_KEY_CHECKS = 0;

-- Deleta todos os registros exceto os IDs 1, 2, 3, 4, 6
DELETE FROM tbl_tasks 
WHERE id_tasks NOT IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 24);

SET FOREIGN_KEY_CHECKS = 1;

-- Ver os registros que sobraram
SELECT * FROM tbl_admin;
