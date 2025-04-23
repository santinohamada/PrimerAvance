# Primer Avance: Generación y Validación de Números Pseudoaleatorios

**Proyecto**: Herramienta interactiva para generación y análisis de secuencias de números pseudoaleatorios.

## 📋 Descripción

Una aplicación web desarrollada con **React** y **Vite**, que permite:

- **Modo Manual**: Ingreso de secuencias numéricas personalizadas.
- **Modo Automático**: Generación de secuencias mediante diversos métodos:
  - Cuadrado Medio
  - Congruencial de Lehmer
  - Congruencial Mixto
  - Congruencial Multiplicativo
  - Congruencial Aditivo
- **🧪 Pruebas Estadísticas implementadas** : Selección y aplicación de diferentes pruebas para evaluar la aleatoriedad de la secuencia.
  - **Prueba de los Promedios** (`promedios`): Evalúa si la media muestral difiere de la esperada.
  - **Prueba de la Frecuencia** (`frecuencia`): Compara la distribución observada de valores con la teórica (chi-cuadrado).
  - **Prueba de la Serie** (`serie`): Revisa la independencia entre pares consecutivos en la secuencia.
  - **Prueba de Kolmogorov–Smirnov** (`kolmogorovSmirnov`): Mide la distancia máxima entre la distribución empírica y la uniforme.
  - **Prueba de las Corridas** (`corridas`): Verifica la ocurrencia de secuencias ascendentes o descendentes para evaluar independencia.

👉 **Demo en vivo**: [generadoresypruebas.vercel.app](https://generadoresypruebas.vercel.app/)

📡 **Backend**: [GeneradoresYPruebasApi](https://github.com/inakigarcia1/GeneradoresYPruebasApi)

## 🚀 Tecnologías

- **React** (v19)
- **Vite**
- **Tailwind CSS**
- **Radix UI** (Checkbox, Label, ScrollArea, Select, Slider, Switch, Tabs)
- **Lucide Icons**
- **Clsx**, **class-variance-authority**
- **Bootstrap** (para estilos globales)

## ⚙️ Instalación y Ejecución

1. Clona el repositorio(frontend):
   ```bash
   git clone https://github.com/santinohamada/PrimerAvance.git
   cd PrimerAvance
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre tu navegador en `http://localhost:5173`.

> Para generar una versión de producción:
> ```bash
> npm run build
> npm run preview
> ```

> **Nota**: Asegúrate de ejecutar también el backend desde https://github.com/inakigarcia1/GeneradoresYPruebasApi para el correcto funcionamiento de las pruebas.

## 🗂️ Estructura de Carpetas

```
PrimerAvance/
├─ public/               # Archivos estáticos
├─ src/
│  ├─ assets/            # Imágenes y recursos
│  ├─ components/
│  │  ├─ generators/     # Métodos de generación
│  │  ├─ tests/          # Componentes de pruebas estadísticas
│  │  └─ ui/             # Componentes de interfaz reutilizables
│  ├─ helpers/           # Lógica de queries y validaciones
│  ├─ lib/               # Funciones utilitarias (utils.js)
│  ├─ App.jsx            # Componente raíz
│  ├─ main.jsx           # Punto de entrada
│  └─ index.css          # Estilos globales
├─ package.json
├─ tailwind.config.js
├─ vite.config.js
└─ README.md
```

## 🎯 Características Principales

- **Ingreso Manual**: Copia y pega o escribe valores numéricos separados por salto de línea.
- **Generación Automática**: Configura la cantidad de números y selecciona el método deseado.
- **Visualización en Tabla**: Despliega la secuencia generada con scroll y formato fijo (6 decimales).
- **Alertas y Mensajes**: Comunicación de errores o advertencias de usuario (e.g., parámetros inválidos).
- **Pruebas Estadísticas**: Interfaz para calcular y comparar valores críticos de diferentes pruebas.
  
## 🤝 Contribuciones

¡Se aceptan mejoras! Para contribuir:

1. Haz un _fork_ del repositorio.
2. Crea una _branch_: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y _commit_: `git commit -m "Añade X"`
4. Envía a tu _fork_ y crea un _Pull Request`.

## 🎖️ Colaboradores

¡Agradecemos a los siguientes colaboradores por sus contribuciones! Puedes visitar sus perfiles haciendo clic en sus nombres:

| Colaborador                                | Perfil                                       |
|--------------------------------------------|----------------------------------------------|
| ![Matias Vel](https://github.com/MatiasVel.png) | [MatiasVel](https://github.com/MatiasVel) |
| ![Iñaki Garcia](https://github.com/inakigarcia1.png) | [inakigarcia1](https://github.com/inakigarcia1) |
| ![Santino Hamada](https://github.com/santinohamada.png) | [Santino Hamada](https://github.com/santinohamada) |
| ![Emmanuel Arnedo](https://github.com/emmanuelarnedo.png) | [emmanuelarnedo](https://github.com/emmanuelarnedo) |

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---
_Desarrollado por Santino Hamada © 2025_

