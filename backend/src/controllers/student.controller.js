const StudentModel = require('../models/student.model');

const StudentController = {

    //GET /students
    async index(req, res) {
        try{
            const students = await StudentModel.getAll();
            res.json(students)
        } catch (error) {
            console.error('Erro ao listar os alunos:', error)
            res.status(500).json({ error: 'Internal server error'});
        }
    },

    //GET RA /student/:ra
    async show(req, res){
        const { ra } = req.params;

        try {
            const student = await StudentModel.getByRa(ra);
            if (!student){
                return res.status(404).json({ error: 'Aluno não encontrado'});
            }
            res.json(student);
        } catch (error) {
            console.error('Erro ao buscar aluno:', error);
            res.status(500).json({ error: 'Internal server error'});
        }
    },

    //POST /students
    async store(req, res) {
        const { ra, name, email, cpf } = req.body;

        if (!ra || !name || !email || !cpf) {
            return res.status(400).json({ error: 'Todos os campos são obrigatóriros' });
        }

        try {
            const student = await StudentModel.create({ ra, name, email, cpf });
            res.status(201).json(student);
        } catch (error) {
            console.error('Error ao criar aluno:', error);
            
            // código de duplicidade do PostgreSQL
            if (error.code === '23505') {
                res.status(400).json({ error: 'RA, Email ou CPF já cadastrados' });
            } else {
                res.status(500).json({ error: 'Internal server error'})
            }
        }
    },

    //PUT /students/:ra
    async update(req, res) {
        const { ra } = req.params; 
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Nome e Email são obrigadtórios' });
        }

        try {
            const existing = await StudentModel.getByRa(ra);
            if (!existing) {
                return res.status(404).json({ error: 'Aluno não encontrado' });
            }

            const updated = await StudentModel.update({ ra, name, email });
            res.json(updated);
        } catch (error) {
            console.log('Erro ao atualizar aluno:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    //DELETE /student/:ra
    async destroy(req, res) {
        const { ra } = req.params;

        try {
            const existing = await StudentModel.getByRa(ra);
            if (!existing) {
                return res.status(404).json({ error: 'Aluno não encontrado' });
            }

            await StudentModel.delete(ra);
            res.status(204).send();
        } catch {
            console.error('Erro ao excluir aluno:', error);
            res.status(500).json({ error: 'Internal server error' })
        }
    }
};

module.exports = StudentController;