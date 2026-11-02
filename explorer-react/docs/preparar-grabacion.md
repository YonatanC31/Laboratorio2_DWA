# Preparar la grabación

## Aplicación y archivos

1. Abra la carpeta independiente `explorer-react`, situada fuera del proyecto Vanilla.
2. Ejecute `pnpm install --frozen-lockfile` y `pnpm run dev`. En Windows puede utilizar `iniciar.cmd`.
3. Abra la dirección «Local» que muestre Vite. La habitual es `http://127.0.0.1:5174/`. No abra `index.html` con doble clic.
4. Compruebe que aparezcan **El Salvador, Japan y Canada**. Los nombres Japan y Canada se conservan tal como están en los registros de clase.
5. Abra en el editor `App.tsx`, `Header.tsx`, `CountryGrid.tsx`, `CountryCard.tsx`, `SearchBar.tsx` y `RegionFilter.tsx`.
6. Abra el guion y prepare la grabadora de pantalla que tenga disponible. Haga una prueba breve para comprobar el audio.

## Ensayo de la demostración

| Acción | Resultado |
| --- | --- |
| Ver la aplicación con un ancho de al menos 1120 px | Cuatro columnas; la muestra tiene tres tarjetas y deja un espacio libre. |
| Pulsar «Ver más» en cada país | La consola muestra SV, JP y CA. |
| Buscar `SAL` | Se muestra El Salvador. |
| Borrar el texto y elegir América | Se muestran El Salvador y Canada. |
| Mantener América y buscar `can` | Se muestra Canada. |
| Mantener `can` y elegir Asia | Aparece el mensaje sin resultados. |
| Pulsar «Restablecer filtros» | Vuelven los tres países y ambos controles quedan limpios. |
| Cambiar a una vista móvil de 390 px | Una columna y botón de menú. |
| Abrir y cerrar el menú y elegir un enlace | Se verifica la apertura, el cierre y la navegación por anclas. |

## Recorrido del código

- **Estado:** `App.tsx`, variables `query`, `region` e `isMenuOpen`.
- **Resultados derivados:** `filterCountries(countriesDemo, query, region)`.
- **Props y composición:** `CountryCardProps`, `CountryGridProps` y `HeaderProps`.
- **Children:** el párrafo colocado entre `<Header>` y `</Header>` en App.
- **Callback de búsqueda:** App → Header → SearchBar → `onQueryChange` → `setQuery`.
- **Callback de región:** App → Header → RegionFilter → `onRegionChange` → `setRegion`.
- **Selección:** CountryCard llama a `onSelect(country.codes.alpha_2)`; CountryGrid transmite la función y App ejecuta `handleSelect`.

## Antes de entregar

- Ejecute `pnpm run lint`, `pnpm test` y `pnpm run build`.
- Siga `docs/guion-video.md` para grabar entre 3 y 5 minutos.
- Mantenga legible el código. La consola puede ir abajo o en una ventana independiente para no reducir el ancho de escritorio.
- Reproduzca el video completo y compruebe el audio.
- Complete la lista de `docs/entrega-canvas.md`.
