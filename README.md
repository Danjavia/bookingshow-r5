# BookingShow App

Este proyecto es una aplicación de biblioteca que utiliza las APIs de Google Books y Open Library para buscar y mostrar información de libros. La aplicación permite a los usuarios buscar libros, ver detalles, agregar favoritos y comentarios.

## Demo en Vivo

Puedes ver el proyecto en funcionamiento en [https://bookingshow.vercel.app/](https://bookingshow.vercel.app/)

## Cómo Usar la Aplicación

1. **Búsqueda de Libros**:
   - En la página principal (/), puedes buscar libros utilizando la API de Google Books (No hay acciones adicionales).
   - En la página de bookstore (/bookstore), puedes buscar libros utilizando la API de Open Library.

2. **Ver Detalles del Libro**:
   - Haz clic en un libro para ver sus detalles (dentro de la ruta /bookstore).

3. **Añadir a Favoritos**:
   - En la página de detalles del libro de la sección bookstore, puedes añadir el libro a tus favoritos.

4. **Ver Favoritos**:
   - Para acceder a la página de favoritos, primero debes guardar al menos un libro como favorito desde la sección de bookstore.
   - Una vez que hayas añadido libros a tus favoritos, podrás ver la página de favoritos mediante el botón Ver favoritos.

5. **Añadir Comentarios**:
   - En la página de detalle del libro de la sección bookstore, puedes añadir comentarios a los libros.

Nota: La funcionalidad de favoritos y comentarios solo está disponible en la sección de bookstore (API de Open Library).

## Arquitectura

El proyecto sigue una arquitectura hexagonal (también conocida como puertos y adaptadores) con las siguientes capas:

- **Domain**: Contiene las entidades centrales y los puertos (interfaces).
- **Application**: Contiene los casos de uso y servicios de la aplicación.
- **Infrastructure**: Contiene los adaptadores para APIs externas y almacenamiento local.
- **Presentation**: Contiene los componentes de React y la interfaz de usuario.

## Tecnologías Utilizadas

- React 17
- TypeScript
- Zustand para manejo de estado
- Zod para validación de esquemas
- Axios para llamadas a API
- Jest y React Testing Library para pruebas

## Mejoras Implementadas

1. Refactorización a arquitectura hexagonal para mejorar la separación de responsabilidades.
2. Implementación de Zustand para un manejo de estado más eficiente.
3. Uso de Zod para validación de esquemas y mayor seguridad de tipos.
4. Implementación de adaptadores para Google Books API y Open Library API.
5. Manejo de favoritos y comentarios con almacenamiento local.

## Requisitos Previos

- Node.js v
- npm v7.x.x (incluido con Node.js 18.20.3)

## Estructura Propuesta del Proyecto

```
src/
├── domain/
│   ├── entities/
│   └── ports/
├── application/
│   ├── services/
│   └── interfaces/
│   └── store/
├── infrastructure/
│   ├── adapters/
│   └── repositories/
├── presentation/
│   ├── components/
│   ├── pages/
├── routes/
│   ├── AppRoutes.tsx
├── App.tsx
└── index.tsx
... Archivos adiconales
```

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/Danjavia/bookingshow-r5
   cd bookingshow-r5
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución en Desarrollo

Para ejecutar la aplicación en modo de desarrollo:

```
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## Ejecución de Pruebas

Para ejecutar las pruebas unitarias:

```
npm test
```

## Construcción para Producción

Para construir la aplicación para producción:

```
npm run build
```

## Despliegue en Vercel

1. Instala la CLI de Vercel:
   ```
   npm install -g vercel
   ```

2. Inicia sesión en Vercel:
   ```
   vercel login
   ```

3. Despliega la aplicación:
   ```
   vercel
   ```

4. Para despliegues posteriores en producción:
   ```
   vercel --prod
   ```
