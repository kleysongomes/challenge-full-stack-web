// Arquivo: src/controllers/student.controller.js

const StudentModel = require('../models/student.model');

const StudentController = {

    async index(req, res) {
        try {
            const { search = '' } = req.query;
            const page = parseInt(req.query.page || '1', 10);
            const limit = parseInt(req.query.limit || '10', 10);

            const { students, total } = await StudentModel.getAll({ page, limit, search });

            const totalPages = Math.ceil(total / limit);

            const response = {
                data: students,
                pagination: {
                    totalItems: total,
                    totalPages: totalPages,
                    currentPage: page,
                    itemsPerPage: limit
                }
            };
            res.json(response);
        } catch (error) {
            console.error('Erro ao listar os alunos:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async show(req, res) {
        const { ra } = req.params;

        try {
            const student = await StudentModel.getByRa(ra);
            if (!student){
                return res.status(404).json({ error: 'Aluno não encontrado'});
            }
            res.json({ data: student });
        } catch (error) {
            console.error('Erro ao buscar aluno:', error);
            res.status(500).json({ error: 'Internal server error'});
        }
    },

    async store(req, res) {
        const { ra, name, email, cpf } = req.body;

        if (!ra || !name || !email || !cpf) {
            return res.status(400).json({ error: 'Todos os campos são obrigatóriros' });
        }

        try {
            const student = await StudentModel.create({ ra, name, email, cpf });
            res.status(201).json({ data: student });
        } catch (error) {
            console.error('Error ao criar aluno:', error);
            
            if (error.code === '23505') {
                res.status(400).json({ error: 'RA, Email ou CPF já cadastrados' });
            } else {
                res.status(500).json({ error: 'Internal server error'})
            }
        }
    },

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
            res.json({ data: updated });
        } catch (error) {
            console.log('Erro ao atualizar aluno:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async destroy(req, res) {
        const { ra } = req.params;

        try {
            const existing = await StudentModel.getByRa(ra);
            if (!existing) {
                return res.status(404).json({ error: 'Aluno não encontrado' });
            }

            await StudentModel.delete(ra);
            
            res.status(204).send();
        } catch(error) {
            console.error('Erro ao excluir aluno:', error);
            res.status(500).json({ error: 'Internal server error' })
        }
    }
};

module.exports = StudentController;