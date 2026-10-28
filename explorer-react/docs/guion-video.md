# Guion de demostración · 4 minutos

Antes de grabar, ejecute `npm run dev` dentro de `explorer-react`. Abra la dirección que indique Vite y tenga disponible el editor con `src/App.tsx`, `FilterBar.tsx`, `SearchField.tsx` y `Header.tsx`.

## 0:00–0:35 · Aplicación en escritorio

- Preséntese e indique que mostrará Explorer App con React y TypeScript.
- Muestre una ventana de 1280 px o superior: hay cuatro tarjetas por fila.
- Señale bandera, nombre, población, región y capital en una tarjeta.
- Muestre los enlaces de navegación de escritorio.

## 0:35–1:25 · Búsqueda y región combinadas

- Escriba `japon`: aparece Japón al escribir.
- Seleccione Europa: aparece el mensaje sin resultados.
- Seleccione Asia: vuelve a aparecer Japón.
- Borre la búsqueda y señale que la región se conserva.
- Restablezca los filtros para mostrar las ocho tarjetas.

## 1:25–2:10 · Móvil y menú

- Abra las herramientas de desarrollo del navegador y seleccione un ancho de 390 px.
- Muestre que las tarjetas pasan a una columna y que los controles se adaptan al ancho.
- Abra el menú, ciérrelo y vuelva a abrirlo.
- Seleccione «Buscar y filtrar» y señale que el menú se cierra.
- Muestre que la búsqueda y el selector funcionan también en móvil.

## 2:10–3:00 · Atomic Design y props

- En el editor, muestre `components/atoms`, `molecules` y `organisms`.
- Explique un ejemplo de cada nivel: `Input`, `SearchField` y `FilterBar`.
- Abra `CountryCard.tsx` y señale la interfaz `CountryCardProps`, que recibe un objeto `Country`.
- Muestre que cada tarjeta se compone con `Flag` y `CountryFact`.

## 3:00–3:45 · Estado y callbacks

- En `App.tsx`, señale `search`, `region` e `isMenuOpen`, creados con `useState`.
- Explique que el padre conserva el estado compartido y pasa sus valores a los hijos mediante props.
- Siga la búsqueda: `App` pasa `setSearch` a `FilterBar`, después a `SearchField` y finalmente a `Input` como callback.
- Señale que el hijo llama a la función recibida; el padre actualiza el estado y React vuelve a renderizar el listado.
- Muestre `onMenuToggle` y `onMenuClose` en `Header` y cómo actualizan `isMenuOpen` en `App`.

## 3:45–4:00 · Cierre

- Muestre el README y sus comandos de ejecución.
- Indique que los datos y las banderas son locales y que no se usa una API ni React Router.
- Muestre el enlace del repositorio que compartirá en Canvas.

Antes de entregar, reproduzca el archivo y compruebe que el texto y el cursor se ven, que su explicación se escucha y que la duración está entre 3 y 5 minutos. Confirme con la docente si debe utilizar un archivo específico de datos de clase.
