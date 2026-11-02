# Respuestas de apoyo · S24–S27

Utilice estas referencias para comprobar el recorrido de los datos y explicarlo con sus propias palabras.

## S24 · Migración a React

1. **¿Qué cambió al pasar del renderizado Vanilla a CountryCard?** El renderizado anterior construía nodos con funciones del DOM. `CountryCard` es una función React que describe la tarjeta mediante JSX y recibe un objeto `Country` por props. React actualiza la representación al cambiar los datos recibidos.
2. **¿Qué recibe CountryCard y cómo está tipado?** La interfaz `CountryCardProps` exige `country: Country` y `onSelect: (code: string) => void`. El contrato `Country` contiene los campos anidados utilizados en la muestra de clase.
3. **¿Qué se reutilizó de Vanilla?** Se conserva la idea de una utilidad independiente del DOM para formatear la población con `Intl.NumberFormat('es-SV')`. El contrato de países se adapta a `names`, `codes`, `flag` y `capitals`, tal como muestra la referencia de clase.
4. **¿Qué se comprobó con los tres países?** La misma tarjeta representa El Salvador, Japan y Canada cambiando sus props; cada una muestra su bandera, población, región y capital. La búsqueda funciona sobre esos mismos registros locales.

## S25 · Composición y props

1. **¿Qué recibe CountryGrid y qué entrega a CountryCard?** Recibe `countries: Country[]` y el callback `onSelect`. En cada iteración de `map()` entrega el objeto actual a la prop `country` de una tarjeta y le transmite `onSelect`.
2. **¿Por qué se utiliza el código como key?** `codes.alpha_2` identifica cada país de forma estable y única. React conserva así la identidad de las tarjetas cuando se filtra, se reordena o se amplía el listado. La posición del arreglo puede cambiar, pero el código del país se mantiene.
3. **¿Qué diferencia hay entre enviar country y enviar onSelect?** `country` es un dato que el hijo muestra. `onSelect` es una función que el hijo puede llamar para comunicar una interacción al padre. «Ver más» envía `SV`, `JP` o `CA`; `handleSelect`, en App, lo muestra en la consola.
4. **¿Qué contenido recibe Header mediante children?** App coloca dentro de Header el párrafo «Consulte sus datos y encuentre países por nombre o región». Header lo recibe como `ReactNode` y lo representa debajo del título.

## S26 · Estado y resultados derivados

Al llamar a `setQuery`, React solicita un nuevo renderizado de App con el texto actualizado. App vuelve a ejecutar `filterCountries(countriesDemo, query, region)`. Los resultados dependen de esos valores y del arreglo original, por lo que no necesitan otro `useState`. El contador se obtiene de `filteredCountries.length`. El mismo criterio se aplica al cambiar `region`.

## S27 · Componentes controlados

`SearchBar` recibe `query` y `onQueryChange` desde Header. Su input muestra `value={query}` y su manejador `onChange`, tipado como `ChangeEvent<HTMLInputElement>`, llama a `onQueryChange` con el texto del control. Header recibió ese callback de App, donde actualiza el estado mediante `setQuery`.

`RegionFilter` hace lo mismo con `region`, `onRegionChange` y `ChangeEvent<HTMLSelectElement>`. Ninguno de esos controles guarda una copia local de los filtros. Ambos dependen de los valores del padre y solicitan sus cambios mediante funciones recibidas por props.

## Recorrido completo

```text
countriesDemo → App → filteredCountries → CountryGrid → CountryCard
                                                       ├─ Flag
                                                       ├─ Badge
                                                       └─ Ver más → onSelect(código) → handleSelect en App

App → Header → SearchBar → onQueryChange(texto) → setQuery en App
App → Header → RegionFilter → onRegionChange(valor) → setRegion en App
```

Prueba de ampliación: agregue temporalmente a `countries` otro objeto `Country` con un `codes.alpha_2` distinto. CountryGrid genera otra tarjeta mediante el mismo `map()` sin que sea necesario escribir otra llamada manual a CountryCard.
