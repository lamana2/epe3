const { Curso, Estudiante } = require('../models');

// Obtener estudiantes inscritos a un curso
exports.estudiantesInscritos = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id, {
      include: Estudiante
    });
    if (curso) {
      res.json(curso.Estudiantes);
    } else {
      res.status(404).send('Curso no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al obtener estudiantes');
  }
};

// Crear un nuevo curso
exports.crearCurso = async (req, res) => {
  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).send('Error al crear curso');
  }
};

// Leer todos los cursos
exports.obtenerCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.json(cursos);
  } catch (error) {
    res.status(500).send('Error al obtener cursos');
  }
};

// Obtener un curso por ID
exports.obtenerCursoPorId = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (curso) {
      res.json(curso);
    } else {
      res.status(404).send('Curso no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al obtener curso');
  }
};

// Actualizar un curso por ID
exports.actualizarCurso = async (req, res) => {
  try {
    const [updated] = await Curso.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const curso = await Curso.findByPk(req.params.id);
      res.json(curso);
    } else {
      res.status(404).send('Curso no encontrado');
    }
  } catch (error) {
    res.status(400).send('Error al actualizar curso');
  }
};

// Eliminar un curso por ID
exports.eliminarCurso = async (req, res) => {
  try {
    const deleted = await Curso.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send('Curso no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al eliminar curso');
  }
};
