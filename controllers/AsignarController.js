const Estudiante = require('../models/Estudiante');
const Curso = require('../models/Curso');
const EstudianteCurso = require('../models/EstudianteCurso');

// Asignar estudiante a un curso
exports.asignarEstudianteCurso = async (req, res) => {
    const { estudianteId, cursoId } = req.body;
    try {
        const estudiante = await Estudiante.findByPk(estudianteId);
        const curso = await Curso.findByPk(cursoId);

        if (estudiante && curso) {
            await estudiante.addCurso(curso); // Método generado por Sequelize para asociación
            res.json({ message: 'Estudiante asignado al curso correctamente' });
        } else {
            res.status(404).json({ message: 'Estudiante o curso no encontrado' });
        }
    } catch (error) {
        console.error('Error al asignar estudiante al curso:', error);
        res.status(500).json({ message: 'Error al asignar estudiante al curso' });
    }
};

// Obtener estudiantes por curso
exports.obtenerEstudiantesPorCurso = async (req, res) => {
    const { cursoId } = req.params;
    try {
        const curso = await Curso.findByPk(cursoId, {
            include: [Estudiante]
        });

        if (curso) {
            res.json(curso.Estudiantes); // Devuelve la lista de estudiantes asociados al curso
        } else {
            res.status(404).json({ message: 'Curso no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener estudiantes por curso:', error);
        res.status(500).json({ message: 'Error al obtener estudiantes por curso' });
    }
};
