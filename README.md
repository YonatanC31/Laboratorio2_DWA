# Explorer App - Yonatan Chicas

> **Parcial React (S24–S27):** el proyecto está en el repositorio independiente [`YonatanC31/explorer-react`](https://github.com/YonatanC31/explorer-react). Sus instrucciones utilizan pnpm. La aplicación de la raíz de este repositorio corresponde a la entrega Vanilla TypeScript anterior.

Hecha con TypeScript para consultar países mediante tarjetas con nombre, bandera, población, región y capital.
Vite y Tailwind CSS v4.

Incluye búsqueda por nombre, filtro por región, debounce de 300 ms y estados de carga, vacío y error. Se muestran **8 países por página** para mantener el listado manejable. La búsqueda y el filtro se aplican sobre todos los países cargados, antes de paginar.

## Instalación y ejecución

Requisitos: Git, npm 10 o superior y Node.js 22.12 o una versión compatible de las ramas 24 o 26. La versión de referencia está indicada en `.nvmrc`. El proyecto completo está en `main`:

```bash
git clone https://github.com/YonatanC31/Laboratorio2_DWA.git
cd Laboratorio2_DWA
npm ci
npm run dev
```

Abra la dirección que muestra Vite, normalmente `http://127.0.0.1:5173/`. Mantenga la terminal abierta mientras revisa la aplicación. Si ese puerto está ocupado, Vite mostrará otro. **No abra `index.html` con doble clic:** este proyecto requiere el servidor para cargar TypeScript, los estilos y los datos.

Si descargó el ZIP desde GitHub, extráigalo y abra una terminal en la carpeta que contiene `package.json`; ejecute los comandos a partir de `npm ci`. Las dependencias se instalan desde `package-lock.json`. No se necesitan archivos privados ni variables de entorno para ejecutar.

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
public/flags/ Banderas SVG incluidas en el proyecto.
tests/       Pruebas de la petición, filtros, debounce e interfaz.
```

## Fuente de datos

Se utiliza una copia local de [REST Countries v3.1](https://github.com/restcountries/restcountries/blob/bfadee4f951682c29970e53677707bc558e80b74/src/main/resources/countriesV3.1.json), reducida a los campos utilizados. El archivo `public/data/countries.json` contiene 250 países y territorios y se obtiene mediante `fetch`. No se requiere clave de API. No es el archivo proporcionado por la docente.

Se eligió el JSON local porque [el endpoint público v3.1 fue retirado](https://restcountries.com/docs/countries/legacy-api-deprecation). Las poblaciones corresponden a esa copia del dataset. Las 250 banderas SVG se incluyen en `public/flags/`, obtenidas de las URL originales de FlagCDN y Wikimedia indicadas por REST Countries. Si una imagen falta, se muestra un texto alternativo. Se conserva la licencia Mozilla Public License 2.0 de los datos en `public/data/LICENSE.txt`.

La versión incluida no consulta servicios externos durante el uso: tanto el JSON como las banderas se sirven desde el proyecto. Solo se requiere conexión a Internet para descargar el repositorio e instalar las dependencias.

La función `fetchCountries(): Promise<Country[]>` comprueba `response.ok`, recibe el JSON como `unknown` y valida los campos antes de usarlos. Los campos ausentes o `null` muestran «No disponible». Una lista vacía y una petición fallida tienen estados diferentes.

Para cambiar la fuente, copie `.env.example` a `.env.local`, defina `VITE_COUNTRIES_URL` y reinicie Vite. La URL debe devolver un array con la estructura de `Country` y permitir CORS si pertenece a otro origen. La API v5 tiene una estructura diferente y no es compatible directamente.

## Comprobar el funcionamiento

1. **Búsqueda:** escriba `japon` o `JAPAN`. Se muestra Japón tras 300 ms sin nuevas pulsaciones; no distingue mayúsculas ni acentos.
2. **Filtros combinados:** busque `Japan` y seleccione Europa: no hay coincidencias. Al seleccionar Asia, aparece Japón. Borrar la búsqueda conserva la región; elegir «Todas las regiones» conserva el texto.
3. **Paginación:** recorra el listado con «Anterior» y «Siguiente». Cada página muestra como máximo 8 países. Cambiar la búsqueda o región vuelve a la primera página.
4. **Carga:** active una conexión lenta desde las herramientas del navegador y recargue para ver el skeleton y el mensaje de carga.
5. **Vacío:** busque `zzzz`. El botón «Restablecer filtros» limpia la búsqueda y la región.
6. **Error:** bloquee `countries.json` en las herramientas del navegador y recargue. Aparecen el error y «Volver a intentar». Desbloquee la petición y pulse el botón para recuperar los datos.
7. **Diseño adaptable:** revise el listado en móvil y escritorio. Los controles tienen etiquetas y pueden utilizarse con el teclado.

## Versión Vanilla TypeScript

- Repositorio: [YonatanC31/Laboratorio2_DWA](https://github.com/YonatanC31/Laboratorio2_DWA).
- Rama principal con el proyecto completo: [`main`](https://github.com/YonatanC31/Laboratorio2_DWA/tree/main).
- Versión revisada con esta rúbrica: [`vanilla-typescript-v1.1.0`](https://github.com/YonatanC31/Laboratorio2_DWA/tree/vanilla-typescript-v1.1.0).
- Versión anterior conservada: [`vanilla-typescript-v1.0.0`](https://github.com/YonatanC31/Laboratorio2_DWA/tree/vanilla-typescript-v1.0.0).

Los cambios nuevos siguen Conventional Commits: `feat:`, `fix:`, `refactor:` y `docs:`. La etiqueta conserva exactamente la versión Vanilla TypeScript de esta actividad, aunque `main` cambie después.

Para ejecutar la versión fija después de clonar el repositorio:

```bash
git switch --detach vanilla-typescript-v1.1.0
npm ci
npm run dev
```

## Verificación de la rúbrica Vanilla TypeScript

| Criterio | Implementación y comprobación |
| --- | --- |
| Interfaz `Country` | `src/types/country.ts` distingue los campos requeridos, opcionales y `null`. No utiliza `any`. `parseCountries` valida el JSON recibido como `unknown`. |
| Petición tipada | `src/api/countries.ts` obtiene el archivo con `fetch` y declara el retorno `Promise<Country[]>`. |
| Errores técnicos | Comprueba `response.ok`; controla errores HTTP, de red, de lectura y de formato JSON, y cancela las peticiones que superan 15 segundos. |
| Tarjetas | `src/render/countries.ts` muestra nombre, bandera, población, región y capital. Contempla campos ausentes, cadenas vacías, población cero y banderas que no cargan. El listado se adapta a móvil y escritorio. |
| Responsabilidades | `api`, `types`, `utils` y `render` contienen sus tareas correspondientes; `main.ts` coordina la carga y los eventos mediante imports y exports. |
| Filtros combinados | La búsqueda por nombre y la región se aplican juntas sobre todos los datos, antes de paginar. La búsqueda ignora mayúsculas y acentos; modificar un control conserva el otro. |
| Debounce | La búsqueda espera 300 ms desde la última pulsación y cancela el temporizador anterior. Cambiar la región cancela cualquier búsqueda pendiente y actualiza inmediatamente. |
| Estados | La carga, el vacío y el error tienen presentaciones distintas. Al reintentar se retira el error, se muestra la carga y después se presentan los resultados o el vacío. |
| Repositorio y documentación | El repositorio es público y la etiqueta `vanilla-typescript-v1.1.0` identifica esta revisión. Este README contiene ejecución, carpetas, fuente de datos y configuración. |

Ejecute `npm test` para comprobar los casos anteriores: **33 pruebas** de validación, petición, filtros, debounce, tarjetas, estados y paginación. `vitest.config.ts` limita la ejecución a `tests/`, que corresponde a Vanilla; la copia de React conserva sus pruebas independientes. Después ejecute `npm run build` para comprobar TypeScript y generar la aplicación de producción.

Para entregar esta revisión, comparta el enlace del repositorio y el enlace directo a la etiqueta `vanilla-typescript-v1.1.0`.
