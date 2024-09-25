# Descripción

Este repositorio contiene el **frontend del sistema domótico de seguridad**, desarrollado como parte del proyecto de control domótico.

La aplicación está construida utilizando la librería de código abierto **React** y es compilada con **Vite**. La navegación entre las diferentes páginas se gestiona con **react-router-dom**, ofreciendo diversas funcionalidades, tales como:

- Cámaras de seguridad
- Alarmas (incluyendo botones de emergencia o pánico)
- Historial de incidentes de seguridad
- Historial de activación y desactivación de alarmas
- Configuración de simuladores de presencia
- Gestión de contactos
- Configuración de dispositivos
- Configuración de ubicaciones y usuarios

Para la comunicación con el backend, se emplea la librería **Axios** para realizar peticiones HTTP. La aplicación también cuenta con un módulo de autenticación que permite a los usuarios iniciar sesión. Este módulo se comunica con el backend para obtener un **JSON Web Token (JWT)**, que se almacena para mantener la sesión activa.

Para obtener más detalles, consulta la carpeta `docs`.

## Repositorios relacionados

Las otras partes del proyecto se encuentran en los siguientes repositorios:

- Backend: [domotica-backend-nestjs](https://github.com/DouglasJavier/domotica-backend-nestjs)
- ESP32-CAM: [camaraDomotica](https://github.com/DouglasJavier/camaraDomotica)
