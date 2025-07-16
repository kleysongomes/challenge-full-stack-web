const db = require('../database'); //Impotação do poll de conexão

const StudentModel = {
    
    //Listagem de todos os alunos
    getAll: async () => {
        const result = await db.query('SELECT * FROM students ORDER BY name');
        return result.rows;
    },

    //Listage de alunos por RA
    getByRa: async (ra) => {
        const result = await db.query('SELECT * FROM students WHERE ra = $1', [ra]);
        return result.rows[0]; //Para retornar um aluno apénas
    },

    //Criação de aluno
    create: async ({ ra, name, email, cpf}) => {
        const result = await db.query(
            `INSERT INTO students (ra, name, email, cpf) 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [ra, name, email, cpf]
        );
        return result.rows[0];
    },

    //Atualização de aluno
    update: async ({ ra, name, email }) => {
        const result = await db.query(
            `UPDATE students SET name = $1, email = $2 
            WHERE ra = $3 RETURNING *`,
            [name, email, ra]
        );
        return result.rows[0];
    },

    //Deleção de aluno
    delete: async (ra) => {
        await db.query('DELETE FROM students WHERE ra = $1', [ra]);
    },
};

module.exports = StudentModel;