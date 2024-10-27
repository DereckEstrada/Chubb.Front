Para ejecutar el Front lo primero que debemos hacer es en la consola ejecutar el "npm install" esto instalara todas las dependencias que ocupa el proyecto, luego para iniciarlo ejecutar el "ng serve -o", esto nos abrira el front en nuestro navegador por defecto, tener en cuenta que debe levantarse en el puerto 4200, de levantarse en otro puerto ocasionaria problemas con los CORS, para ver la indiciacion de la modificacion de los CORS en el back mirar el readme de: https://github.com/DereckEstrada/Chubb.Back

En la pantalla de Asegurado podremos buscar por identificaciones parciales, en esta pantalla ademas de ver a todos los asegurados por identificación podremos editar la información, eliminar de forma logica los asegurados. Adicional podremos subir un archivo de excel con la informacion de asegurados.
![image](https://github.com/user-attachments/assets/aa49bd6c-cb01-407f-946e-942c2a433d89)


Plantilla que debe tener el excel
![image](https://github.com/user-attachments/assets/ef14e947-7309-436a-b90a-c834182935b5)



Algo a tener en cuenta es que no podremos ingresar dos veces una misma cedula, de hacerlo se nos indicara que cedula esta ya registrada y no se guardara ninguno de los registros cargados en el excel

En la pantalla de Registrar Asegurado podremos crear nuevos asegurados adicional tambien podremos asignarle los seguros disponibles
![image](https://github.com/user-attachments/assets/b92c58ec-2957-4448-9b16-cbd4380d8bb0)


En la pantalla Mantiemiento Asegurado-Seguro 
Debemos ingresar la identificación completa del asegurado, esto nos carga los seguros que tiene asignados y los seguros que se le puede asignar, podremos asginar seguros, eliminar seguros.
![image](https://github.com/user-attachments/assets/71f4c13d-b888-44dd-bd4c-3d4d14dc2033)


Pantalla Seguro
Nos cargara los seguros de forma en la que coincida el codigo del seguro, podremos actualizar, eliminar de forma logica, adicional el button Registrar Seguro nos abrira un modal para ingresar toda la información del seguro.
![image](https://github.com/user-attachments/assets/dfd40c79-2993-4f23-95d8-3e46132a1b78)

Pantalla Seguro-Asegurado
En esta pantalla debemos ingresar el codigo completo del seguro para cargarnos todos los asegurado que tienen asignado dicho seguro.
![image](https://github.com/user-attachments/assets/1eccb93f-469e-4f1c-ba73-ce186519c300)
