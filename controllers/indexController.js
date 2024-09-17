const { Estudiante, Curso } = require('../models');

// Listar todos los estudiantes
exports.listarEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).send('Error al obtener estudiantes');
  }
};

// Listar todos los cursos
exports.listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.json(cursos);
  } catch (error) {
    res.status(500).send('Error al obtener cursos');
  }
};

// Obtener un estudiante por ID
exports.obtenerEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).send('Estudiante no encontrado');
    }
    res.json(estudiante);
  } catch (error) {
    res.status(500).send('Error al obtener estudiante');
  }
};

// Obtener un curso por ID
exports.obtenerCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) {
      return res.status(404).send('Curso no encontrado');
    }
    res.json(curso);
  } catch (error) {
    res.status(500).send('Error al obtener curso');
  }
};

// Redirigir al home
exports.home = (req, res) => {
  res.send('Bienvenido al sistema de gestión de estudiantes y cursos');
};
