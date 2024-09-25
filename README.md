# Description

This repository contains the **frontend of the smart home security system**, developed as part of the home automation project.

The application is built using the open-source **React** library and compiled with **Vite**. Navigation between different pages is managed with **react-router-dom**, providing various functionalities such as:

- Security cameras
- Alarms (including emergency or panic buttons)
- Security incident history
- Alarm activation and deactivation history
- Presence simulator configuration
- Contact management
- Device configuration
- Location and user settings

For communication with the backend, the **Axios** library is used to make HTTP requests. The application also includes an authentication module that allows users to log in. This module communicates with the backend to obtain a **JSON Web Token (JWT)**, which is stored to keep the session active.

For more details, see the `docs` folder.

## Related Repositories

Other parts of the project can be found in the following repositories:

- Backend: [domotica-backend-nestjs](https://github.com/DouglasJavier/domotica-backend-nestjs)
- ESP32-CAM: [camaraDomotica](https://github.com/DouglasJavier/camaraDomotica)

## General Project Description

The project was based on the use of open-source hardware and software, utilizing devices such as the ESP-32 CAM, which allows flexibility in adding or removing sensors and actuators. These include PIR HC-SR501 sensors and CO M-Q7 sensors, along with actuators such as relay modules. For system management, client-server applications were developed using React, Vite, and NestJS, supported by a PostgreSQL database, with notifications sent via Telegram. In terms of security, JWT tokens were implemented for client-server communication and password protection for the ESP-32 devices.

The system achieves most of the expected functionalities for a smart home security system, though it has limitations, such as the inability to control the residence's electrical, water, or gas networks, as well as the lack of an intercom system and smart locks.


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

## Descripcion general del proyecto
El proyecto se basó en la utilización de hardware y software de código abierto, haciendo uso de dispositivos como ESP-32 CAM, que permite la flexibilidad de añadir o quitar sensores y actuadores. Entre ellos se encuentran los sensores PIR HC-SR501 y sensores de CO M-Q7, junto con actuadores como módulos relé. Para la gestión del sistema, se emplearon aplicaciones cliente-servidor desarrolladas en React, Vite y NestJS, respaldadas por una base de datos PostgreSQL y envío de notificaciones a través de Telegram. En términos de seguridad, se implementaron tokens JWT tanto para la comunicación cliente-servidor y password para las ESP-32.
El sistema logra la mayoría de las funcionalidades esperadas para un sistema domótico de seguridad, aunque tiene limitaciones como el control de las redes eléctricas, de agua o gas de la residencia, así como la ausencia de portero automático y cerraduras inteligentes.
