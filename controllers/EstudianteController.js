const { Estudiante, Curso } = require('../models');

// Obtener los cursos inscritos de un estudiante
exports.cursosInscritos = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id, {
      include: Curso
    });
    if (!estudiante) {
      return res.status(404).send('Estudiante no encontrado');
    }
    res.json(estudiante.Cursos);
  } catch (error) {
    res.status(500).send('Error al obtener cursos');
  }
};

// Actualizar la edad de los estudiantes inscritos en un curso
exports.actualizarEdadPorCurso = async (req, res) => {
  try {
    const { nuevoValor } = req.body;
    const curso = await Curso.findByPk(req.params.cursoId, {
      include: Estudiante
    });
    
    if (!curso) {
      return res.status(404).send('Curso no encontrado');
    }
    
    // Actualizar las edades de los estudiantes
    const promises = curso.Estudiantes.map(estudiante => {
      estudiante.edad = nuevoValor;
      return estudiante.save();
    });
    await Promise.all(promises);
    
    res.send('Edades actualizadas');
  } catch (error) {
    res.status(500).send('Error al actualizar');
  }
};

// Eliminar estudiantes que no están inscritos en ningún curso
exports.eliminarSinCursos = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll({
      include: { model: Curso, through: { where: null }, required: false }
    });
    
    // Filtrar y eliminar los estudiantes sin cursos
    const promises = estudiantes.map(estudiante => {
      if (estudiante.Cursos.length === 0) {
        return estudiante.destroy();
      }
    });
    await Promise.all(promises);
    
    res.send('Estudiantes eliminados');
  } catch (error) {
    res.status(500).send('Error al eliminar estudiantes');
  }
};

// Crear un nuevo estudiante
exports.crearEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.create(req.body);
    res.status(201).json(estudiante);
  } catch (error) {
    res.status(400).send('Error al crear estudiante');
  }
};

// Implementación de los métodos leer, actualizar y eliminar adicionales...
