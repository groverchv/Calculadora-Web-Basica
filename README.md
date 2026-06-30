# Calculadora Básica SaaS (React + Vite + JavaScript)

Una calculadora de nivel corporativo diseñada con una estética minimalista tipo SaaS, implementada utilizando React, Vite, Clean Architecture y gestión de estado inmutable a través de `useReducer`.

## Características

- **Operaciones Matemáticas:** Suma, resta, multiplicación, división, módulo (%) e inversión de signo (+/-).
- **Manejo de Errores:** Control de división entre cero (muestra "Error") y validación de entradas.
- **Diseño SaaS Premium:** Sombras suaves, estados táctiles responsivos (hover/active) y diseño adaptable (Mobile-First).
- **Auto-Escalado de Fuente:** El tamaño de la fuente en pantalla disminuye automáticamente si se ingresan más de 10 dígitos para evitar desbordamientos.
- **Historial de Operaciones:** Un panel desplegable para consultar las últimas 5 operaciones calculadas con éxito.
- **Arquitectura Limpia:** Separación total de responsabilidades entre lógica de cálculo, control de estado y componentes de presentación.

---

## Arquitectura de la Aplicación

La estructura del proyecto sigue el principio de **Separación de Responsabilidades** (Clean Architecture):

```plaintext
src/
├── assets/          # Recursos visuales (iconos, imágenes)
├── components/      # Componentes de UI puros (Button, Display, Calculator)
├── hooks/           # useCalculator.js (Control de estado con useReducer)
├── styles/          # index.css (Estilos globales y diseño responsivo)
├── utils/           # mathOperations.js (Lógica pura de operaciones matemáticas)
└── App.jsx          # Layout principal
```

### ¿Por qué esta arquitectura?

1. **Lógica Matemática Pura (`src/utils/mathOperations.js`):**
   - Alojar la lógica matemática en funciones puras e independientes de React facilita su testeo de forma aislada sin necesidad de renderizar componentes.
   - Evita la duplicación de código y simplifica el mantenimiento al centralizar el comportamiento matemático.

2. **Gestión del Estado Inmutable (`src/hooks/useCalculator.js`):**
   - El uso de `useReducer` permite agrupar todas las transiciones complejas del estado de la calculadora en un único punto (el reductor), lo que hace que los cambios sean deterministas y predecibles.
   - Las operaciones de una calculadora son secuenciales y dependientes del estado anterior (ej. presionar un operador guarda el número actual y espera otro). Controlar esto con múltiples `useState` causaría efectos secundarios y condiciones de carrera difíciles de depurar.

3. **Componentes Visuales de UI Desacoplados (`src/components/`):**
   - Los componentes como `Button` y `Display` son puros y reutilizables; solo reciben propiedades (`props`) y notifican eventos sin conocer la lógica interna de cómo se calcula el resultado. Esto permite rediseñar o cambiar la interfaz sin tocar la lógica de negocio.

---

## Instalación y Ejecución

Sigue estos pasos para ejecutar la aplicación de forma local:

1. **Clonar o descargar el proyecto** en tu máquina local.
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
4. **Abrir en el navegador:**
   Accede a la URL indicada en la terminal (usualmente `http://localhost:5173`).

---

## Instrucciones de Uso

- **Ingreso de números:** Haz clic en los botones numéricos o el punto decimal para construir la cifra actual.
- **Operaciones:** Haz clic en `+`, `-`, `×`, `÷` o `%` para definir la operación. Al presionar otro operador de forma consecutiva, la calculadora computará el subtotal automáticamente.
- **Cambio de Signo:** Haz clic en `+/-` para alternar entre valores positivos y negativos del número en pantalla.
- **Borrado:** 
  - `DEL` (icono de retroceso) elimina el último dígito ingresado.
  - `AC` limpia todo el estado de la calculadora (valores, operación actual e historial).
- **Historial:** Haz clic en el botón "Historial" en la parte superior derecha para ver las últimas operaciones completadas.
# Calculadora-Web-Basica
