// Importar Sequelize y modelos
const { Sequelize } = require('sequelize');
const Estudiante = require('./models/Estudiante'); // Ajusta la ruta si es necesario
const Curso = require('./models/Curso'); // Ajusta la ruta si es necesario

// Configuración de la base de datos
const sequelize = new Sequelize('nombre_de_base_de_datos', 'usuario', 'contraseña', {
    host: 'localhost',
    dialect: 'mysql', // Asegúrate de que estás usando el dialecto correcto
    port: 3306 // Asegúrate de que el puerto sea el correcto
});

// Probar la conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch(error => {
        console.error('Error de conexión a la base de datos:', error);
    });

// Relacionar modelos (Muchos a Muchos)
Estudiante.belongsToMany(Curso, { through: 'EstudianteCurso' });
Curso.belongsToMany(Estudiante, { through: 'EstudianteCurso' });

// Sincronizar los modelos con la base de datos
const syncModels = async () => {
    try {
        await sequelize.sync({ alter: true }); // `alter: true` permite que se actualicen los esquemas existentes sin eliminar los datos
        console.log('Modelos sincronizados correctamente.');
    } catch (error) {
        console.error('Error al sincronizar los modelos:', error);
    }
};

// Llamar a la función de sincronización
syncModels();

// Exportar sequelize, Estudiante y Curso
module.exports = {
    sequelize,
    Estudiante,
    Curso
};
