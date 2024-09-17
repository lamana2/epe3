document.addEventListener('DOMContentLoaded', () => {
    const menuItems = {
        'verEstudiantes': () => {
            mostrarFormulario('formEstudiante', false);
            mostrarFormulario('formCurso', false);
            mostrarFormulario('formAsignar', false);
            mostrarFormulario('formVerEstudiantesPorCurso', false);
            fetch('/estudiantes')
                .then(response => response.json())
                .then(estudiantes => {
                    const contenido = document.getElementById('contenido');
                    contenido.innerHTML = `<h2>Estudiantes</h2><ul>${estudiantes.map(e => `<li>${e.nombre} (${e.edad} años)</li>`).join('')}</ul>`;
                });
        },
        'verCursos': () => {
            mostrarFormulario('formEstudiante', false);
            mostrarFormulario('formCurso', false);
            mostrarFormulario('formAsignar', false);
            mostrarFormulario('formVerEstudiantesPorCurso', false);
            fetch('/cursos')
                .then(response => response.json())
                .then(cursos => {
                    const contenido = document.getElementById('contenido');
                    contenido.innerHTML = `<h2>Cursos</h2><ul>${cursos.map(c => `<li>${c.nombre} (${c.duracion})</li>`).join('')}</ul>`;
                });
        },
        'agregarEstudiante': () => {
            mostrarFormulario('formEstudiante', true);
            mostrarFormulario('formCurso', false);
            mostrarFormulario('formAsignar', false);
            mostrarFormulario('formVerEstudiantesPorCurso', false);
        },
        'agregarCurso': () => {
            mostrarFormulario('formEstudiante', false);
            mostrarFormulario('formCurso', true);
            mostrarFormulario('formAsignar', false);
            mostrarFormulario('formVerEstudiantesPorCurso', false);
        },
        'relacionarEstudiantesCurso': () => {
            mostrarFormulario('formEstudiante', false);
            mostrarFormulario('formCurso', false);
            mostrarFormulario('formAsignar', true);
            mostrarFormulario('formVerEstudiantesPorCurso', false);
            cargarSelects();
        },
        'verEstudiantesPorCurso': () => {
            mostrarFormulario('formEstudiante', false);
            mostrarFormulario('formCurso', false);
            mostrarFormulario('formAsignar', false);
            mostrarFormulario('formVerEstudiantesPorCurso', true);
            cargarCursosSelect('cursoSelectVer');
        }
    };

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.id;
            if (menuItems[id]) {
                menuItems[id]();
            }
        });
    });

    document.getElementById('formEstudianteDatos').addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;
        fetch('/estudiantes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, edad })
        }).then(response => response.json())
          .then(() => alert('Estudiante agregado con éxito'));
    });

    document.getElementById('formCursoDatos').addEventListener('submit', (e) => {
        e.preventDefault();
        const nombreCurso = document.getElementById('nombreCurso').value;
        const duracion = document.getElementById('duracion').value;
        fetch('/cursos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nombreCurso, duracion })
        }).then(response => response.json())
          .then(() => alert('Curso agregado con éxito'));
    });

    document.getElementById('formAsignarDatos').addEventListener('submit', (e) => {
        e.preventDefault();
        const estudianteId = document.getElementById('estudianteSelect').value;
        const cursoId = document.getElementById('cursoSelect').value;
        fetch('/asignar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estudianteId, cursoId })
        }).then(response => response.json())
          .then(() => alert('Estudiante asignado al curso con éxito'));
    });

    document.getElementById('formVerEstudiantesCurso').addEventListener('submit', (e) => {
        e.preventDefault();
        const cursoId = document.getElementById('cursoSelectVer').value;
        fetch(`/estudiantes-por-curso/${cursoId}`)
            .then(response => response.json())
            .then(estudiantes => {
                const resultados = document.getElementById('resultadosEstudiantesPorCurso');
                resultados.innerHTML = `<h2>Estudiantes en el curso</h2><ul>${estudiantes.map(e => `<li>${e.nombre} (${e.edad} años)</li>`).join('')}</ul>`;
            });
    });

    function mostrarFormulario(id, mostrar) {
        document.getElementById(id).style.display = mostrar ? 'block' : 'none';
    }

    function cargarSelects() {
        fetch('/estudiantes')
            .then(response => response.json())
            .then(estudiantes => {
                const selectEstudiante = document.getElementById('estudianteSelect');
                selectEstudiante.innerHTML = estudiantes.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('');
            });

        fetch('/cursos')
            .then(response => response.json())
            .then(cursos => {
                const selectCurso = document.getElementById('cursoSelect');
                selectCurso.innerHTML = cursos.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
            });
    }

    function cargarCursosSelect(idSelect) {
        fetch('/cursos')
            .then(response => response.json())
            .then(cursos => {
                const selectCurso = document.getElementById(idSelect);
                selectCurso.innerHTML = cursos.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
            });
    }
});
