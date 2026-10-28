# Explorer App con React

Aplicación de países desarrollada con React, TypeScript y Vite. La interfaz está organizada con Atomic Design y permite combinar la búsqueda por nombre y el filtro por región. Incluye navegación de escritorio, menú móvil controlado por estado y un mensaje cuando no hay coincidencias.

## Instalación y ejecución

Requisitos: Git, npm 10 o superior y Node.js 22.12 o una versión compatible de las ramas 24 o 26. La versión de referencia está en `.nvmrc`.

Desde el repositorio que contiene ambos proyectos:

```bash
git clone https://github.com/YonatanC31/Laboratorio2_DWA.git
cd Laboratorio2_DWA/explorer-react
npm ci
npm run dev
```

Si descargó el ZIP, extráigalo y abra una terminal en la carpeta `explorer-react`, donde está su `package.json`. Ejecute los comandos a partir de `npm ci`.

Abra la dirección que muestre Vite, normalmente `http://127.0.0.1:5174/`. Mantenga la terminal abierta. No abra `index.html` con doble clic. Si el puerto está ocupado, Vite indicará otra dirección.

```bash
npm test          # Comprueba tarjetas, filtros, callbacks y menú
npm run build    # Verifica TypeScript y genera dist/
npm run preview  # Sirve la compilación; normalmente en el puerto 4174
```

La instalación utiliza `package-lock.json`. No se requieren claves, variables de entorno, conexión a una API ni React Router. El archivo `.gitignore` excluye `node_modules`, `dist` y los archivos de entorno.

## Atomic Design

```text
src/
  components/
    atoms/
      Button.tsx         Botón reutilizable y sus variantes.
      Input.tsx          Campo de texto controlado.
      Select.tsx         Selector controlado con opciones tipadas.
      Icon.tsx           Iconos de la interfaz.
      Flag.tsx           Bandera y mensaje si la imagen falla.
      CountryFact.tsx    Etiqueta y valor de un dato del país.
    molecules/
      SearchField.tsx    Etiqueta, icono y campo de búsqueda.
      RegionField.tsx    Etiqueta y selector de región.
      CountryCard.tsx    Bandera, nombre y datos de un país.
      Navigation.tsx     Enlaces de navegación.
      EmptyState.tsx     Mensaje sin resultados y botón para restablecer.
    organisms/
      Header.tsx         Marca, navegación y control del menú móvil.
      FilterBar.tsx      Controles de búsqueda y región.
      CountryGrid.tsx    Composición del listado de tarjetas.
  data/                  Muestra de países y opciones de regiones.
  types/                 Tipos e interfaces de datos.
  utils/                 Funciones de búsqueda y formato.
  App.tsx                Componente padre y estado compartido.
  main.tsx               Punto de entrada de React.
  styles.css             Estilos y distribución adaptable.
public/flags/            Banderas locales.
docs/guion-video.md      Guion de demostración de 4 minutos.
```

Los componentes declaran interfaces para sus props. Por ejemplo, `CountryCard` recibe un objeto `Country`; `SearchField` recibe el texto actual y una función `onSearchChange`.

## Estado y comunicación

`App.tsx` mantiene el estado compartido mediante tres llamadas a `useState`:

- `search`: texto de búsqueda.
- `region`: región seleccionada.
- `isMenuOpen`: apertura del menú móvil.

Los valores bajan a los componentes hijos mediante props. Los hijos solicitan cambios llamando a los callbacks recibidos:

```text
Input → SearchField → FilterBar → setSearch en App
Select → RegionField → FilterBar → setRegion en App
Button → Header → onMenuToggle → setIsMenuOpen en App
```

El listado se deriva de los datos y de los filtros en cada renderizado; no se guarda una segunda copia de los resultados en estado. La búsqueda se actualiza al escribir y se combina con la región seleccionada. Borrar el texto conserva la región y elegir «Todas las regiones» conserva el texto.

`Flag` utiliza únicamente estado local para mostrar el texto alternativo si una imagen falla; no administra los filtros ni el menú.

## Datos de demostración

Se incluye una muestra local de 8 países en `src/data/countries.ts`: El Salvador, México, Brasil, España, Alemania, Japón, Sudáfrica y Australia. Los valores son datos de demostración adaptados de REST Countries; no son estimaciones en tiempo real. Las imágenes están incluidas en `public/flags/` y la licencia de los datos se conserva en `public/data/LICENSE.txt`.

**Esta muestra no ha podido contrastarse con el archivo utilizado en S24–S27, que no fue proporcionado.** Si la docente exige ese conjunto exacto, sustituya el contenido de `demoCountries` por los registros de clase respetando la interfaz `Country`, e incluya las banderas correspondientes. No es necesario modificar los componentes ni los callbacks.

No se realizan peticiones `fetch`: los datos se importan directamente desde el módulo TypeScript. Tras instalar las dependencias, la aplicación puede usarse sin servicios externos.

## Comprobación manual

1. **Escritorio:** utilice una ventana de al menos 1120 px. Se muestran cuatro tarjetas por fila y la navegación de escritorio.
2. **Móvil:** reduzca el ancho a 390 px. Se muestra una tarjeta por fila y el botón «Abrir menú».
3. **Menú:** abra y cierre el menú con su botón. También puede cerrarlo al elegir un enlace o al pulsar Escape desde la navegación.
4. **Búsqueda:** escriba `japon`. Debe mostrarse Japón inmediatamente; se ignoran mayúsculas, espacios exteriores y acentos.
5. **Filtro combinado:** con `japon` escrito, seleccione Europa. Debe aparecer «No se encontraron países». Seleccione Asia para recuperar la tarjeta.
6. **Conservación de filtros:** borre el texto y compruebe que Asia sigue seleccionada. Elegir «Todas las regiones» debe conservar lo que haya escrito.
7. **Limpieza:** pulse «Limpiar filtros» o «Restablecer filtros» para recuperar todos los países.

## Entrega

- [Repositorio](https://github.com/YonatanC31/Laboratorio2_DWA).
- [Carpeta del proyecto React](https://github.com/YonatanC31/Laboratorio2_DWA/tree/main/explorer-react).
- Fecha indicada en la actividad: **4 de noviembre de 2026**.
- En Canvas debe compartir el repositorio y un **video de 3 a 5 minutos** que demuestre escritorio, móvil, filtros combinados, apertura y cierre del menú, y el flujo de estado y callbacks.

El guion está en `docs/guion-video.md`. El guion sirve como apoyo: **no sustituye el video que debe grabar y entregar**.

La entrega Vanilla TypeScript permanece en la raíz del repositorio y en su etiqueta `vanilla-typescript-v1.0.0`. Para este parcial debe ejecutar y mostrar la carpeta `explorer-react`.
