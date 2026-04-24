Evaluación Parcial 1:
Tienda Gamer (Microservicio React)

Este repositorio contiene la configuración inicial de un pipeline DevOps para el microservicio de mi tienda gamer.

Para este proyecto elegí usar GitFlow;

Elegí este modelo porque, aun sin saber mucho, me permite ser ordenado. Separo el código que ya está "listo" en la rama `main` del código que estoy probando o construyendo en 'develop' . Así, si algo falla en una funcionalidad nueva, no rompo la versión main o principal.

Para cumplir con la rubrica, defini las siguientes reglas:

Para agregar cosas nuevas (ej. 'feature/mis-ordenes').
Para arreglar errores urgentes (ej. 'hotfix/arreglo-servidor')
Trato de usar prefijos cortos para que el historial sea claro:
    feat: para nuevas funciones.
    fix: para correcciones de errores.
    docs: para cambios en este archivo README.


Configuré una herramienta de automatización (GitHub Actions) que se encuentra en la carpeta '.github/workflows/'. Esta acción se activa automáticamente cada vez que:
Subo cambios a la rama 'develop'.
Se abre un Pull Request hacia la rama 'main'.
Esto ayuda a verificar que el proyecto compile (haga el 'build') correctamente antes de unir los cambios.

Declaración de Uso de IA
Usé asistencia de IA para ayudarme a entender los comandos de Git y para armar la estructura del archivo YAML del pipeline.
Me sirvió de guía para resolver errores de permisos y para organizar los puntos obligatorios de este README.

---
Conclusion personal:

En este trabajo aprendi que Devops no es solo codigo, sino tambien orden. Me costo entender al principio cómo funcionaban los Pull Requests y por qué había tantas ramas, pero al final pude ver que ayuda mucho a no perder el trabajo si algo falla. Mi mayor aporte fue organizar los archivos del microservicio y configurar que el pipeline del github funcionara con mi proyecto antiguo de React.
