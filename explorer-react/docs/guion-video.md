# Guion de demostración · Aproximadamente 4 minutos

Ejecute `pnpm run dev` en la carpeta independiente `explorer-react`. Abra la aplicación y el editor. Prepare la consola del navegador abajo o en otra ventana para no reducir el ancho de la vista de escritorio.

## 0:00–0:40 · Escritorio y tarjetas

**Qué mostrar:** una ventana de al menos 1120 px, las tres tarjetas y el botón «Ver más». Abra la consola y pulse «Ver más» en El Salvador, Japan y Canada: deben aparecer `SV`, `JP` y `CA`.

**Texto de apoyo:** «Buenos días. Soy Yonatan Chicas y presentaré Explorer App con React 18 y TypeScript. Utiliza los tres registros locales del material de clase: El Salvador, Japan y Canada. El grid admite cuatro columnas en pantallas amplias; con esta muestra queda una posición libre. Cada tarjeta muestra bandera, nombre, población, región y capital. El botón Ver más llama a un callback que recibe el código del país y lo muestra aquí en la consola».

## 0:40–1:30 · Búsqueda y región combinadas

**Qué mostrar:** escriba `SAL` y recupere los tres registros al borrar el texto. Seleccione América y escriba `can`; después cambie a Asia, y finalmente limpie ambos filtros.

**Texto de apoyo:** «La búsqueda actualiza los resultados al escribir y no distingue mayúsculas. SAL encuentra El Salvador. Al seleccionar América quedan El Salvador y Canada. Si escribo can, aparece únicamente Canada. Al cambiar a Asia se muestra el mensaje sin coincidencias, porque ambos criterios se aplican al mismo tiempo. Borrar la búsqueda conserva la región; también puedo limpiar los dos controles con este botón».

## 1:30–2:10 · Móvil y menú

**Qué mostrar:** active la vista de dispositivos con un ancho de 390 px. Abra y cierre el menú y seleccione un enlace. Muestre el buscador y el selector adaptados al ancho.

**Texto de apoyo:** «En móvil, las tarjetas pasan a una columna y los controles se acomodan al espacio disponible. La navegación se abre con este botón y se puede cerrar de nuevo o al elegir un enlace. El estado del menú permanece en App; Header recibe su valor y los callbacks para solicitar los cambios».

## 2:10–2:45 · Atomic Design y composición

**Qué mostrar:** las carpetas atoms, molecules y organisms; `CountryCard.tsx` y `CountryGrid.tsx`.

**Texto de apoyo:** «Flag y Badge son átomos. CountryCard es una molécula que los combina con los datos recibidos y su botón. CountryGrid es un organismo: recibe un arreglo Country y una función onSelect, recorre los países con map y crea una tarjeta por objeto. Utiliza codes.alpha_2 como key estable. Header también es un organismo y muestra como children este párrafo que App coloca entre sus etiquetas».

## 2:45–3:50 · Estado, props y callbacks

**Qué mostrar:** `App.tsx`, `Header.tsx`, `SearchBar.tsx` y `RegionFilter.tsx`.

**Texto de apoyo:** «App mantiene query, region e isMenuOpen con useState. Los países visibles se calculan a partir de los datos originales y los dos filtros; no se guardan en otro estado. App pasa query y setQuery a Header mediante props. Header transmite esos valores a SearchBar. El input es controlado: muestra value igual a query y, cuando cambia, llama a onQueryChange con el texto ingresado. Ese callback actualiza el estado de App y React vuelve a representar los resultados. RegionFilter utiliza el mismo recorrido con region y onRegionChange. Las interfaces definen el tipo de cada valor y de cada función».

## 3:50–4:15 · README y cierre

**Qué mostrar:** el README, la captura, las instrucciones con pnpm y el enlace del repositorio que entregará.

**Texto de apoyo:** «El README explica la organización, las props de CountryGrid y los comandos para instalar y ejecutar el proyecto. Incluye capturas reales y los casos de prueba del material. La aplicación no realiza peticiones a una API ni utiliza React Router. Para comprobar el avance se ejecutan lint, las pruebas y la compilación de producción».

Antes de entregar, compruebe que el archivo dura entre 3 y 5 minutos, que se escucha la explicación y que se leen los datos y el código. El guion no sustituye el video.
