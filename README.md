# 🕷️ Spider Chat - Proyecto M3

Aplicación web tipo chat que simula una conversación con Spider-Man utilizando inteligencia artificial (Gemini), desarrollada como Single Page Application (SPA) y desplegada en Vercel.

---

## 🚀 Demo

🔗 https://proyecto-m3-spider-chat-api.vercel.app


---

## 🧠 Descripción

Spider Chat es una aplicación interactiva que permite a los usuarios conversar con Spider-Man (Peter Parker), quien responde con una personalidad definida: altruista, sarcástico, empático e inteligente.

El proyecto implementa una arquitectura moderna basada en frontend desacoplado y una serverless function que actúa como intermediario seguro entre el cliente y la API de Gemini.

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3 (Flexbox / Grid)
- JavaScript (ES Modules)
- Fetch API + async/await
- Gemini AI (Google)
- Vercel (Serverless Functions)
- Vitest
- Vercel CLI

---

## 📦 Estructura del proyecto

```txt
/
├── api/
│   └── functions.js
├── src/
│   ├── app.js
│   ├── chat.js
│   ├── utils.js
│   └── styles.css
├── tests/
│   ├── app.test.js
│   └── utils.test.js
├── index.html
├── .env.example
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

---

## ⚙️ Funcionalidades

- Chat interactivo con IA
- Respuestas con personalidad (Spider-Man)
- Manejo de historial de conversación en memoria
- Scroll automático en el chat
- Navegación SPA (Home, Chat, About)
- Routing con History API
- Diseño responsive (mobile-first)
- Manejo de estados de error y carga
- Alertas visuales ante errores de conexión
- Timeout frontend y backend
- Filtrado de mensajes temporales

---

## 🔄 Funcionamiento

1. El usuario escribe un mensaje en el chat
2. El frontend envía el historial de mensajes a `/api/functions`
3. La serverless function procesa la solicitud
4. Se realiza una llamada a la API de Gemini
5. Se obtiene la respuesta del modelo
6. Se devuelve al frontend
7. Se renderiza en la interfaz

---

## 🔐 Seguridad

- La API Key de Gemini se maneja exclusivamente en el backend
- No se expone información sensible en el frontend
- Uso de variables de entorno en Vercel

---

## ⚠️ Manejo de errores

La aplicación implementa manejo de errores robusto para asegurar continuidad:

- Si la API de Gemini falla
- Si se alcanza el límite de cuota
- Si ocurre un error de red

Se devuelven respuestas fallback con personalidad del personaje, evitando que la aplicación se rompa:

> "No se pudo contactar con Spider-Man en este momento. Intentá nuevamente en unos segundos."

Esto garantiza una experiencia de usuario consistente.

---

## ⚙️ Instalación local

1. Clonar el repositorio

```bash
git clone https://github.com/AlanEzequiel112/proyecto-m3-spiderChat-api.git
```

2. Instalar dependencias

```bash
npm install
```

3. Crear archivo `.env`

```env
GEMINI_API_KEY=TU_API_KEY
```

4. Ejecutar entorno local

```bash
vercel dev
```

---

## 🌐 Deploy

El proyecto está desplegado en Vercel, incluyendo:

- Frontend estático
- Serverless Function
- Variables de entorno configuradas

---

## 📚 Conceptos aplicados

- Single Page Application (SPA)
- History API
- Arquitectura cliente-servidor
- Serverless Functions
- Programación asíncrona (async/await)
- Integración con APIs externas
- Manejo de estado en frontend
- Experiencia de usuario (UX)

---

## 📌 Notas

La integración con Gemini puede verse limitada por cuota de uso de la API.

Para asegurar el correcto funcionamiento del sistema, se implementó un mecanismo de fallback que permite continuar la conversación incluso en caso de error.

---

## 🤖 Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizaron herramientas de inteligencia artificial como apoyo para resolver problemas técnicos y mejorar la implementación.

### Prompts utilizados

* “Cómo implementar una SPA con JavaScript y History API”
* “Cómo estructurar una serverless function en Vercel”
* “Cómo manejar errores en fetch y APIs externas”
* “Cómo desplegar correctamente una aplicación en Vercel”
* “Cómo mejorar la experiencia de usuario en un chat”
* “Cómo implementar tests básicos con Vitest”

### Influencia en la implementación

Las respuestas obtenidas sirvieron como guía para:

* Organizar la estructura del proyecto (frontend / backend)
* Implementar el routing de la SPA
* Integrar la API de Gemini mediante una serverless function
* Resolver problemas de despliegue y rutas en Vercel
* Mejorar la experiencia de usuario (mensajes, estados, feedback)
* Implementar tests unitarios básicos

### Decisiones tomadas

A partir de las sugerencias de la IA, se tomaron decisiones como:

* Utilizar una arquitectura desacoplada (frontend + API)
* Implementar manejo de errores con respuestas fallback
* Limitar el historial de mensajes para optimizar el rendimiento
* Configurar correctamente las rutas en Vercel para evitar errores 404
* Priorizar una interfaz simple, clara y funcional
* Evitar soluciones complejas que no aportaban valor al objetivo del proyecto

La inteligencia artificial fue utilizada como herramienta de apoyo para destrabar problemas y orientar decisiones, manteniendo siempre el control sobre la implementación final del proyecto.

---

## 👤 Autor

- Nombre: Ezequiel Cardiello
- Proyecto: M3 - Spider Chat

