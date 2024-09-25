# Installation Guide

Ensure that you have **Node.js** installed, specifically version **20**.


To install the project dependencies, run:
   ```bash
   npm install
   ```
To start the project in development mode, use:
   ```bash
   npm run dev
   ```
For production mode, execute the following commands (make sure you have PM2 installed):

    npm run build
    pm2 start ecosystem.config.cjs


# Guía de Instalación

Asegúrate de tener **Node.js** instalado, específicamente la versión **20**.


Para instalar las dependencias del proyecto, ejecute:
   ```bash
   npm install
   ```
Para iniciar el proyecto en modo de desarrollo, utilize:
   ```bash
   npm run dev
   ```
Para el modo de producción, ejecuta los siguientes comandos (asegúrate de tener PM2 instalado):

    npm run build
    pm2 start ecosystem.config.cjs