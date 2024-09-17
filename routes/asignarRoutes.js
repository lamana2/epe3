const express = require('express');
const router = express.Router();
const AsignarController = require('../controllers/AsignarController');

// Ruta para asignar estudiante a curso
router.post('/asignar', AsignarController.asignarEstudianteCurso);

// Ruta para obtener estudiantes por curso
router.get('/estudiantes-por-curso/:cursoId', AsignarController.obtenerEstudiantesPorCurso);

module.exports = router;
