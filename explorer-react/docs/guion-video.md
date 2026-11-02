# Guion de demostración · 4 minutos

Antes de grabar, ejecute `npm run dev` dentro de `explorer-react`. Abra la dirección que indique Vite y tenga disponible el editor con `src/App.tsx`, `FilterBar.tsx`, `SearchField.tsx` y `Header.tsx`.

## 0:00–0:35 · Aplicación en escritorio

**Texto de apoyo:** «Buenos días. Soy Yonatan Chicas y presentaré Explorer App con React y TypeScript. La aplicación permite consultar países mediante tarjetas reutilizables. En esta vista de escritorio se muestran cuatro tarjetas por fila. Cada tarjeta presenta la bandera, el nombre, la población, la región y la capital. En la parte superior está la navegación de escritorio».

- Preséntese e indique que mostrará Explorer App con React y TypeScript.
- Muestre una ventana de 1280 px o superior: hay cuatro tarjetas por fila.
- Señale bandera, nombre, población, región y capital en una tarjeta.
- Muestre los enlaces de navegación de escritorio.

## 0:35–1:25 · Búsqueda y región combinadas

**Texto de apoyo:** «La búsqueda actualiza el listado mientras escribo. Voy a buscar Japón sin utilizar el acento para comprobar que también encuentra el nombre. Ahora selecciono Europa: como Japón no pertenece a esa región, aparece el mensaje sin resultados. Al cambiar a Asia, la tarjeta vuelve a mostrarse. Esto demuestra que ambos criterios se aplican al mismo tiempo. Si borro el nombre, la región se conserva; también puedo limpiar ambos controles con este botón».

- Escriba `japon`: aparece Japón al escribir.
- Seleccione Europa: aparece el mensaje sin resultados.
- Seleccione Asia: vuelve a aparecer Japón.
- Borre la búsqueda y señale que la región se conserva.
- Restablezca los filtros para mostrar las ocho tarjetas.

## 1:25–2:10 · Móvil y menú

**Texto de apoyo:** «Ahora reduzco el ancho a una vista móvil de 390 píxeles. Las tarjetas pasan a una sola columna y los controles se adaptan al espacio disponible. La navegación de escritorio se sustituye por este botón. Puedo abrir el menú, cerrarlo y volver a abrirlo. Al seleccionar un enlace, el menú se cierra. La búsqueda y el filtro siguen funcionando en esta vista».

- Abra las herramientas de desarrollo del navegador y seleccione un ancho de 390 px.
- Muestre que las tarjetas pasan a una columna y que los controles se adaptan al ancho.
- Abra el menú, ciérrelo y vuelva a abrirlo.
- Seleccione «Buscar y filtrar» y señale que el menú se cierra.
- Muestre que la búsqueda y el selector funcionan también en móvil.

## 2:10–3:00 · Atomic Design y props

**Texto de apoyo:** «Los componentes están organizados con Atomic Design. Los átomos son piezas pequeñas, como el campo de texto, el botón o la bandera. Las moléculas combinan esas piezas; por ejemplo, SearchField reúne una etiqueta, un icono y el campo de búsqueda. Los organismos componen secciones de la interfaz, como FilterBar y Header. CountryCard recibe un país mediante una prop tipada con la interfaz Country. Así, la misma tarjeta se reutiliza para cada registro del listado».

- En el editor, muestre `components/atoms`, `molecules` y `organisms`.
- Explique un ejemplo de cada nivel: `Input`, `SearchField` y `FilterBar`.
- Abra `CountryCard.tsx` y señale la interfaz `CountryCardProps`, que recibe un objeto `Country`.
- Muestre que cada tarjeta se compone con `Flag` y `CountryFact`.

## 3:00–3:45 · Estado y callbacks

**Texto de apoyo:** «El estado compartido está en App, el componente padre. Aquí se encuentran search, region e isMenuOpen, creados con useState. Los valores bajan a los hijos mediante props. Para actualizar la búsqueda, el padre pasa setSearch como callback. Ese callback llega hasta el campo de texto, que lo llama cuando cambia su valor. El padre actualiza el estado y React vuelve a mostrar el listado filtrado. El menú utiliza el mismo principio: Header recibe callbacks para solicitar su apertura o cierre, pero el estado permanece en App».

- En `App.tsx`, señale `search`, `region` e `isMenuOpen`, creados con `useState`.
- Explique que el padre conserva el estado compartido y pasa sus valores a los hijos mediante props.
- Siga la búsqueda: `App` pasa `setSearch` a `FilterBar`, después a `SearchField` y finalmente a `Input` como callback.
- Señale que el hijo llama a la función recibida; el padre actualiza el estado y React vuelve a renderizar el listado.
- Muestre `onMenuToggle` y `onMenuClose` en `Header` y cómo actualizan `isMenuOpen` en `App`.

## 3:45–4:00 · Cierre

**Texto de apoyo:** «El README incluye los requisitos, los comandos de ejecución y la organización del proyecto. La aplicación utiliza una muestra local de ocho países y banderas incluidas en el repositorio. Para este parcial no utiliza una API ni React Router. Este es el enlace del proyecto que compartiré en Canvas».

- Muestre el README y sus comandos de ejecución.
- Indique que los datos y las banderas son locales y que no se usa una API ni React Router.
- Muestre el enlace del repositorio que compartirá en Canvas.

Antes de entregar, reproduzca el archivo y compruebe que el texto y el cursor se ven, que su explicación se escucha y que la duración está entre 3 y 5 minutos. Confirme con la docente si debe utilizar un archivo específico de datos de clase.
