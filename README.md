# Explorer App

Aplicación Vanilla TypeScript para consultar países mediante tarjetas con nombre, bandera, población, región y capital. Utiliza Vite y Tailwind CSS v4.

Incluye búsqueda por nombre, filtro por región, debounce de 300 ms y estados de carga, vacío y error. Se muestran **8 países por página** para mantener el listado manejable. La búsqueda y el filtro se aplican sobre todos los países cargados, antes de paginar.

## Instalación y ejecución

Requisitos: Git, npm y Node.js 22.12 o una versión compatible de las ramas 24 o 26. Después de publicar la rama de entrega, puedes clonarla así:

```bash
git clone --branch entrega-vanilla-ts https://github.com/YonatanC31/Laboratorio2_DWA.git
cd Laboratorio2_DWA
npm ci
npm run dev
```

Abre la dirección que muestra Vite, normalmente `http://127.0.0.1:5173/`. **No abras `index.html` con doble clic:** este proyecto requiere el servidor para cargar TypeScript, los estilos y los datos.

Si ya descargaste el proyecto, ejecuta los comandos a partir de `npm ci` desde su carpeta.

```bash
npm test          # Pruebas automatizadas
npm run build    # Comprobación de TypeScript y compilación en dist/
npm run preview  # Servidor para revisar la compilación
```

## Organización

```text
src/
  api/       Petición fetch, validación del JSON y manejo de errores.
  types/     Interfaces de países, filtros y paginación.
  utils/     Formato, búsqueda, filtrado, debounce y paginación.
  render/    Tarjetas, estados de interfaz y controles de página.
  main.ts    Carga inicial y coordinación de los eventos.
  style.css  Tailwind CSS v4 y diseño adaptable.
public/data/ Datos locales y licencia de la fuente.
tests/       Pruebas de la petición, filtros, debounce e interfaz.
```

## Fuente de datos

Se utiliza una copia local de [REST Countries v3.1](https://github.com/restcountries/restcountries/blob/bfadee4f951682c29970e53677707bc558e80b74/src/main/resources/countriesV3.1.json), reducida a los campos utilizados. El archivo `public/data/countries.json` contiene 250 países y territorios y se obtiene mediante `fetch`. No se requiere clave de API. No es el archivo proporcionado por la docente.

Se eligió el JSON local porque [el endpoint público v3.1 fue retirado](https://restcountries.com/docs/countries/legacy-api-deprecation). Las poblaciones corresponden a esa copia del dataset. Las imágenes de las banderas proceden de las URL de FlagCDN incluidas en los datos; si una imagen falla, se muestra un texto alternativo. Se conserva la licencia Mozilla Public License 2.0 en `public/data/LICENSE.txt`.

La función `fetchCountries(): Promise<Country[]>` comprueba `response.ok`, recibe el JSON como `unknown` y valida los campos antes de usarlos. Los campos ausentes o `null` muestran «No disponible». Una lista vacía y una petición fallida tienen estados diferentes.

Para cambiar la fuente, copia `.env.example` a `.env.local`, define `VITE_COUNTRIES_URL` y reinicia Vite. La URL debe devolver un array con la estructura de `Country` y permitir CORS si pertenece a otro origen. La API v5 tiene una estructura diferente y no es compatible directamente.

## Comprobar el funcionamiento

1. **Búsqueda:** escribe `japon` o `JAPAN`. Se muestra Japón tras 300 ms sin nuevas pulsaciones; no distingue mayúsculas ni acentos.
2. **Filtros combinados:** busca `Japan` y selecciona Europa: no hay coincidencias. Al seleccionar Asia, aparece Japón. Borrar la búsqueda conserva la región; elegir «Todas las regiones» conserva el texto.
3. **Paginación:** recorre el listado con «Anterior» y «Siguiente». Cada página muestra como máximo 8 países. Cambiar la búsqueda o región vuelve a la primera página.
4. **Carga:** activa una conexión lenta desde las herramientas del navegador y recarga para ver el skeleton y el mensaje de carga.
5. **Vacío:** busca `zzzz`. El botón «Restablecer filtros» limpia la búsqueda y la región.
6. **Error:** bloquea `countries.json` en las herramientas del navegador y recarga. Aparecen el error y «Volver a intentar». Desbloquea la petición y pulsa el botón para recuperar los datos.
7. **Diseño adaptable:** revisa el listado en móvil y escritorio. Los controles tienen etiquetas y pueden utilizarse con el teclado.

## Versión Vanilla TypeScript

- Repositorio: [YonatanC31/Laboratorio2_DWA](https://github.com/YonatanC31/Laboratorio2_DWA).
- Rama de entrega: [`entrega-vanilla-ts`](https://github.com/YonatanC31/Laboratorio2_DWA/tree/entrega-vanilla-ts).

Los cambios nuevos siguen Conventional Commits: `feat:`, `fix:`, `refactor:` y `docs:`. La rama conserva la versión Vanilla TypeScript de esta actividad.

Para publicar la rama local en el repositorio:

```bash
git push -u origin entrega-vanilla-ts
```
