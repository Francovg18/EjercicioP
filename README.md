# JSONPlaceholder Blog

Este proyecto es un blog de demostración que consume la API de [JSONPlaceholder](https://jsonplaceholder.typicode.com/), mostrando publicaciones y comentarios. Está construido con **React**, **Tailwind CSS**, **Framer Motion** y utiliza **React Router** para navegación.

---

## Tabla de Contenidos

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Instalación](#instalación)

---

## Características

- Listado de publicaciones (`/`)
- Filtro por usuario
- Búsqueda por título o contenido
- Paginación de publicaciones (7 por página)
- Página de detalle de cada post con comentarios (`/post/:id`)
- Navbar animado con efectos visuales y responsive
- Framer Motion para animaciones de posts y comentarios
- Iconos con Lucide
- SEO básico con `react-helmet-async` (títulos y meta descripción por página)

---
(#notas)
## Estructura del Proyecto

```text
EjercicioP/
│
├─ public/
│   └─ index.html
│
├─ src/
│   ├─ api/
│   │   └─ jsonPlaceholder.js        # consumir API
│   │
│   ├─ components/
│   │   ├─ comments/
│   │   │   ├─ CommentItem.jsx
│   │   │   └─ CommentList.jsx
│   │   ├─ posts/
│   │   │   ├─ PostItem.jsx
│   │   │   └─ Pagination.jsx
│   │   └─ ui/
│   │       ├─ SearchBar.jsx
│   │       └─ NavBar.jsx
│   │       └─ StatsSection.jsx
│   │       └─ UserFilter.jsx
│   │
│   ├─ pages/
│   │   ├─ Home.jsx                  # Página principal con posts, filtros y paginación
│   │   └─ PostPage.jsx              # Detalle de un post con comentarios
│   │
│   ├─ App.jsx                    
│   └─ index.js                     
│
├─ package.json
└─ README.md
```

---

## Tecnologías Usadas

- React 18.x
- React Router
- Framer Motion
- Tailwind CSS 
- Lucide Icons
- react-helmet-async para SEO tecnico

---

## Instalación

Se debe contar con node.js y git previamente instalado

### Clonar el repositorio

```bash
git clone https://github.com/Francovg18/EjercicioP
```

### Instalar dependencias

```bash
cd EjercicioP
npm install
```

### Iniciar la aplicación en modo desarrollo

```bash
npm run dev
```

Esto abrirá el proyecto en [http://localhost:5173](http://localhost:5173).

---
