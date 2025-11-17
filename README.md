# The Bakery Shop

Aplicación web de e-commerce construida con React para una panadería artesanal, que incluye un catálogo de productos, carrito de compras y un panel de administración (CRUD de productos). Este proyecto se desarrolla como trabajo final de la C25232 ReactJs de Talento Tech.

## Descripción

**The Bakery Shop** es una aplicación de tipo *Single Page Application (SPA)* que simula una tienda online para una panadería. Permite a los clientes explorar productos, ver sus detalles, agregarlos a un carrito de compras y gestionar su pedido.

Además, cuenta con un panel de administración protegido que permite al dueño de la tienda gestionar el inventario de productos, incluyendo la creación, actualización y eliminación de los mismos, así como la subida de imágenes a un servicio externo.

El proyecto está construido siguiendo las mejores prácticas de React, utilizando componentes, hooks, Context API para el manejo de estado global y React Router para la navegación.

## Características

### Vista Pública (Cliente)

*   **Catálogo de Productos**: Visualiza los productos disponibles en la página de inicio (Home) con un límite para productos destacados, y la sección de productos permite listarlos todos.
*   **Filtro por Categoría**: Filtra los productos entre "Dulce" y "Salado".
*   **Vista de Detalle**: Haz clic en un producto para ver su descripción completa, precio y stock disponible.
*   **Carrito de Compras**:
    *   Añade productos al carrito con un contador de cantidad.
    *   Visualiza, actualiza la cantidad o elimina productos del carrito.
    *   Calcula el precio total del pedido.
    *   Opción para vaciar el carrito o seguir comprando.
*   **Diseño Responsivo**: La interfaz del carrito se adapta a dispositivos móviles para una mejor experiencia de usuario.

### Panel de Administración

*   **Login de Administrador**: Sistema de autenticación para acceder al panel de gestión (credenciales hardcodeadas para fines de demostración: `admin` / `1234`).
*   **Rutas Protegidas**: Solo los usuarios autenticados pueden acceder a las rutas `/admin`.
*   **Gestión de Productos (CRUD)**:
    *   **Listar**: Visualiza todos los productos en una tabla con opción de filtrar por categoría.
    *   **Crear**: Añade nuevos productos a través de un formulario, incluyendo la subida de una imagen.
    *   **Editar**: Modifica los detalles de un producto existente usando el mismo formulario.
    *   **Eliminar**: Borra productos del inventario con un diálogo de confirmación.

## Tecnologías Utilizadas

*   **Frontend**: React.js (v18+)
*   **Routing**: `react-router-dom`
*   **Manejo de Estado**: React Context API (para el Carrito y la Autenticación).
*   **Estilos**: CSS plano y CSS Modules.
*   **Iconos**: `react-icons`
*   **Backend (Simulado)**:
    *   Los datos de los productos se gestionan a través de servicios que interactúan con **MockAPI**.
    *   Las imágenes se suben al servicio **ImgBB** para obtener una URL pública, solucionando la limitación de MockAPI para alojar archivos.
*   **Build Tool**: Vite

## Prerrequisitos

Para compilar y ejecutar este proyecto, necesitarás tener instalado:

*   Node.js (versión 16 o superior)
*   Un gestor de paquetes como `npm` o `yarn`.

## Cómo Empezar

Sigue estos pasos para poner en marcha el proyecto en tu máquina local.

### 1. Clona el Repositorio en GitHub

```bash
git clone https://github.com/EliMCN/BakeryShop.git
cd BakeryShop
```

### 2. Instala las Dependencias

Ejecuta el siguiente comando en la raíz del proyecto para instalar todas las librerías necesarias.

```bash
npm install
```

### 3. Configura las Variables de Entorno

Este proyecto utiliza una clave de API para subir imágenes a ImgBB.

Crea un archivo llamado `.env` en la raíz del proyecto. En el presente proyecto se ha harcodeado la clave en el código a pedido de la cursada.

Añade la siguiente línea, reemplazando `TU_API_KEY_DE_IMGBB` con tu propia clave obtenida de ImgBB.

```plaintext
VITE_IMGBB_API_KEY=TU_API_KEY_DE_IMGBB
```
*(Nota: El código actual tiene la clave hardcodeada en `src/services/uploadImage.js`. Se recomienda moverla a un archivo `.env` por seguridad y buenas prácticas).*

### 4. Ejecuta la Aplicación

Una vez instaladas las dependencias, inicia el servidor de desarrollo de Vite.

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique la consola).

## Uso

### Navegación Pública

*   Navega a la URL base (`/`) para ver la página de inicio.
*   Usa el menú para ir a "Nuestros Productos" o haz clic en un producto para ver su detalle.
*   Añade productos al carrito y gestiónalos desde el ícono del carrito.

### Acceso al Panel de Administración

1.  Haz clic en **"Admin Login"** en el menú de navegación.
2.  Usa las siguientes credenciales para iniciar sesión:
    *   **Usuario**: `admin`
    *   **Contraseña**: `1234`
3.  Serás redirigido al panel de administración (`/admin`), donde podrás ver la lista de productos y empezar a gestionarlos.

## Estructura del Proyecto

```plaintext
src/
├── assets/              # Imágenes, videos y otros recursos estáticos.
├── components/          # Componentes reutilizables de la UI.
│   ├── adminComponents/   # Componentes específicos del panel de admin (AdminNav, AdminProductList, ProductFormContainer, ProductFormUI).
│   ├── Cart/              # Componente de UI del carrito.
│   ├── CartContainer/     # Componente contenedor que maneja la lógica del carrito.
│   ├── Checkout/          # Componente para la página de finalización de compra.
│   ├── Header/            # Componente del encabezado.
│   ├── Home/              # Componente para la página de inicio con banner.
│   ├── Item/              # Componente para un solo producto en la lista.
│   ├── ItemDetail/        # Componente para la vista de detalle de un producto.
│   ├── ItemDetailContainer/ # Componente contenedor que busca un producto por ID.
│   ├── ItemList/          # Componente que renderiza la lista de items.
│   ├── ItemListContainer/ # Componente contenedor que busca y filtra productos.
│   ├── Login/             # Componente de formulario de login.
│   └── ...                # Otros componentes como Navbar, RutaProtegida, etc.
├── context/             # Lógica y proveedores de React Context.
│   ├── AuthContex/        # Contexto para la autenticación de administrador.
│   └── CartContext/       # Contexto para el estado global del carrito.
├── layout/              # Componentes de estructura (Layouts).
├── services/            # Lógica para interactuar con APIs externas (MockAPI, ImgBB).
├── utils/               # Helpers y funciones (ValidateProducts.js).
├── App.jsx              # Componente principal y configuración de rutas.
├── main.jsx             # Punto de entrada de la aplicación.
└── index.css            # Estilos globales.
```

## Autora

Elizabeth Mc Nally

