Sistema de Gestión de Estudiantes y Cursos
Descripción
Este proyecto es un sistema de gestión de estudiantes y cursos desarrollado utilizando Java con JPA (Java Persistence API) y JPQL (Java Persistence Query Language). El sistema permite gestionar la inscripción de estudiantes en cursos, realizar consultas sobre la relación entre estudiantes y cursos, y proporciona una base sólida para futuras funcionalidades.

Estructura del Proyecto
El proyecto está organizado en los siguientes componentes principales:

Entidades

Estudiante: Representa a los estudiantes inscritos en el sistema.
Curso: Representa los cursos disponibles en el sistema.
EstudianteCurso: Entidad de unión que gestiona la relación muchos a muchos entre Estudiante y Curso.
Consultas JPQL

Consultas para obtener información sobre la inscripción de estudiantes en cursos y cursos en los que un estudiante está inscrito.
Configuración

Configuración de Base de Datos: Configura la conexión a la base de datos MySQL.
Sincronización de Modelos: Sincroniza las entidades con la base de datos.
Entidades
Estudiante
java
Copiar código
@Entity
public class Estudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private Integer edad;

    @ManyToMany
    @JoinTable(name = "EstudianteCurso",
               joinColumns = @JoinColumn(name = "estudiante_id"),
               inverseJoinColumns = @JoinColumn(name = "curso_id"))
    private Set<Curso> cursos = new HashSet<>();
}
Curso
java
Copiar código
@Entity
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;

    @ManyToMany(mappedBy = "cursos")
    private Set<Estudiante> estudiantes = new HashSet<>();
}
Consultas JPQL
Obtener Todos los Estudiantes Inscritos en un Curso Específico
java
Copiar código
public List<Estudiante> findEstudiantesByCurso(Long cursoId) {
    String jpql = "SELECT e FROM Estudiante e JOIN e.cursos c WHERE c.id = :cursoId";
    TypedQuery<Estudiante> query = entityManager.createQuery(jpql, Estudiante.class);
    query.setParameter("cursoId", cursoId);
    return query.getResultList();
}
Encontrar Todos los Cursos en los que Está Inscrito un Estudiante Particular
java
Copiar código
public List<Curso> findCursosByEstudiante(Long estudianteId) {
    String jpql = "SELECT c FROM Curso c JOIN c.estudiantes e WHERE e.id = :estudianteId";
    TypedQuery<Curso> query = entityManager.createQuery(jpql, Curso.class);
    query.setParameter("estudianteId", estudianteId);
    return query.getResultList();
}
Configuración
Configuración de Base de Datos
java
Copiar código
public class DatabaseConfig {
    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder.create()
            .url("jdbc:mysql://localhost:3306/nombre_de_base_de_datos")
            .username("usuario")
            .password("contraseña")
            .build();
    }
}
Sincronización de Modelos
java
Copiar código
public class Application {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(Application.class, args);
        EntityManagerFactory emf = context.getBean(EntityManagerFactory.class);
        EntityManager em = emf.createEntityManager();
        
        try {
            em.getTransaction().begin();
            em.getMetamodel().managedType(Estudiante.class);
            em.getTransaction().commit();
            System.out.println("Modelos sincronizados correctamente.");
        } catch (Exception e) {
            System.err.println("Error al sincronizar los modelos: " + e.getMessage());
        }
    }
}
Instrucciones para Ejecutar el Proyecto
Clonar el Repositorio

bash
Copiar código
git clone https://github.com/lamana2/epe3.git
cd epe3
Configurar la Base de Datos

Asegúrate de tener una base de datos MySQL configurada y ajusta el archivo DatabaseConfig.java con los detalles correctos.

Instalar Dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

bash
Copiar código
mvn install
Ejecutar la Aplicación

Ejecuta la aplicación con el siguiente comando:

bash
Copiar código
mvn spring-boot:run
Realizar Consultas

Puedes realizar consultas utilizando los métodos proporcionados en los repositorios o en la lógica del servicio.






capturas
# epe3![Captura de pantalla 2024-09-16 225751](https://github.com/user-attachments/assets/94ba1310-0a9b-4b9f-91e8-ce91a5b47072)
![Captura de pantalla 2024-09-16 225837](https://github.com/user-attachments/assets/49cd50a7-a1a0-49f0-82b9-f824016d6101)
![Captura de pantalla 2024-09-16 231701](https://github.com/user-attachments/assets/201f6d82-5968-4930-8ca9-125edcbf844d)
