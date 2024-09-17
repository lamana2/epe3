const { Sequelize, Op } = require('sequelize');
const sequelize = require('./config/database'); // Asegúrate de que esta ruta sea correcta
const Estudiante = require('./models/estudiante');
const Curso = require('./models/Curso');

async function runQueries() {
    try {
        // Obtener todos los estudiantes inscritos en un curso específico
        const cursoNombre = 'Curso A'; // Cambia esto según sea necesario
        const curso = await Curso.findOne({ where: { nombre: cursoNombre }, include: Estudiante });
        console.log(`Estudiantes en el curso "${cursoNombre}":`, curso.Estudiantes);

        // Actualizar edad de todos los estudiantes en un curso específico
        const nuevaEdad = 25; // Cambia esto según sea necesario
        await Estudiante.update({ edad: nuevaEdad }, {
            where: {
                id: {
                    [Op.in]: curso.Estudiantes.map(est => est.id)
                }
            }
        });
        console.log(`Edad de todos los estudiantes en el curso "${cursoNombre}" actualizada a ${nuevaEdad}.`);

        // Eliminar estudiantes no inscritos en ningún curso
        const cursosConEstudiantes = await Curso.findAll({ include: Estudiante });
        const estudiantesInscritos = cursosConEstudiantes.flatMap(curso => curso.Estudiantes.map(est => est.id));
        await Estudiante.destroy({
            where: {
                id: {
                    [Op.notIn]: estudiantesInscritos
                }
            }
        });
        console.log('Estudiantes no inscritos en ningún curso eliminados.');
    } catch (error) {
        console.error('Error en las consultas JPQL:', error);
    } finally {
        await sequelize.close();
    }
}

runQueries();
