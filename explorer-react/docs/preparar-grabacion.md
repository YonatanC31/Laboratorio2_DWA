# Preparar la grabación

## 1. Abra la aplicación correcta

En Windows puede hacer doble clic en `iniciar.cmd`, dentro de `explorer-react`. Si faltan dependencias, el acceso ejecutará `npm ci`. Abra la dirección «Local» que muestre Vite y mantenga la terminal abierta.

También puede utilizar una terminal desde la carpeta `explorer-react`:

```bash
npm ci
npm run dev
```

La dirección habitual es `http://127.0.0.1:5174/`. No abra `index.html` directamente ni utilice la aplicación Vanilla del puerto 5173 para este video.

Antes de grabar deben verse ocho países: El Salvador, México, Brasil, España, Alemania, Japón, Sudáfrica y Australia.

## 2. Prepare las ventanas

- Abra el navegador con la aplicación y deje el zoom en 100 %.
- Abra el proyecto `explorer-react` en su editor.
- Deje a mano estos archivos: `src/App.tsx`, `src/components/molecules/CountryCard.tsx`, `src/components/organisms/FilterBar.tsx`, `src/components/molecules/SearchField.tsx` y `src/components/organisms/Header.tsx`.
- Abra `docs/guion-video.md` para ensayar el orden de la explicación.
- Utilice la grabadora de pantalla que tenga disponible y seleccione una captura que incluya el navegador y el editor. Compruebe con una grabación breve que se escucha su voz.

## 3. Ensaye las acciones

| Acción | Resultado esperado |
| --- | --- |
| Abrir la aplicación en una ventana de al menos 1120 px | Cuatro tarjetas por fila y navegación de escritorio. |
| Escribir `japon` | Aparece Japón inmediatamente. |
| Mantener `japon` y elegir Europa | Aparece «No se encontraron países». |
| Elegir Asia | Vuelve a aparecer Japón. |
| Borrar el texto | Asia permanece seleccionada. |
| Pulsar «Limpiar filtros» | Vuelven los ocho países. |
| Activar una vista móvil de 390 × 844 px | Una tarjeta por fila y botón «Abrir menú». |
| Abrir y cerrar el menú | Cambian la navegación visible, el icono y el nombre del botón. |
| Abrir el menú y elegir «Buscar y filtrar» | El menú se cierra y se llega a los controles. |

Para probar móvil en Brave o un navegador basado en Chromium, abra las herramientas de desarrollo y active su vista de dispositivos. Elija un ancho de 390 px. Para volver a escritorio, desactive la vista de dispositivos y cierre las herramientas de desarrollo.

## 4. Tenga localizada la explicación del código

| Concepto | Archivo y elemento que debe mostrar |
| --- | --- |
| Estado compartido | `src/App.tsx`: `search`, `region` e `isMenuOpen`, definidos con `useState`. |
| Resultados derivados | `src/App.tsx`: llamada a `filterCountries(demoCountries, search, region)`. |
| Props de una tarjeta | `CountryCard.tsx`: interfaz `CountryCardProps` con `country: Country`. |
| Callback de búsqueda | `FilterBar.tsx` recibe `onSearchChange` y se lo pasa a `SearchField`. |
| Evento del campo | `atoms/Input.tsx`: `onChange` llama a `onValueChange` con el texto escrito. |
| Apertura y cierre del menú | `Header.tsx`: `onMenuToggle` y `onMenuClose`; el estado se actualiza en `App`. |
| Distribución de cuatro columnas | `src/styles.css`: regla de `min-width: 1120px`. |

No es necesario memorizar líneas: localice los nombres de las funciones y las interfaces. Puede desplazarse por los archivos mientras los explica.

## 5. Grabe y revise

- Grabe entre **3 y 5 minutos**; el guion está pensado para unos 4 minutos.
- Incluya escritorio, móvil, filtros combinados, mensaje sin resultados, apertura y cierre del menú y explicación de estado y callbacks.
- Reproduzca el video completo antes de entregarlo. Compruebe duración, audio y legibilidad del navegador y del editor.
- Puede nombrarlo `Explorer_React_Yonatan_Chicas.mp4` si su grabadora exporta MP4.
- Complete los pasos de `docs/entrega-canvas.md`.

## Datos de clase

La muestra actual es provisional: no se ha recibido el archivo de demostración utilizado en S24–S27. Antes de entregar, confirme si la docente exige esos registros exactos. El archivo que debe sustituir es `src/data/countries.ts`; los componentes ya están preparados para recibir objetos `Country`.
