# Explora · NativeScript + Angular

Aplicación móvil educativa del módulo 2: bienvenida, catálogo con búsqueda y detalle editable. Los datos están en memoria: se conservan al navegar y se restablecen al reiniciar el proceso. Las imágenes PNG son locales y originales, generadas con figuras geométricas; no requiere una API ni descargas de imágenes.

## Ejecutar en Android

Requisitos: Node.js 22.18 o superior compatible con NativeScript 8.9, npm, JDK 17, Android SDK y un dispositivo con depuración USB o emulador. Instala/configura el entorno siguiendo la [guía oficial de Windows](https://docs.nativescript.org/setup/windows).

```powershell
cd 'C:\Users\Stiven\Desktop\modulo 2'
npm install
npx ns doctor android
npm run typecheck
npm test
npm run android
```

Para generar un APK de depuración: `npm run build:android`. No es un proyecto web; `ng serve` no ejecuta las vistas nativas. Los plugins requieren una compilación nativa.

Las dependencias apuntan a NativeScript 8.9 / Angular 19.2 / TypeScript 5.7. No se usan versiones `latest`. La resolución concreta y su lockfile se obtendrán al completar `npm install`; aún no se ha podido verificar esa resolución en este entorno.

## Archivos y responsabilidades

```text
src/
  main.ts                         Arranque de Angular y NativeScript
  app.css                         Estilos nativos globales
  assets/{mountains,city}.png      Imágenes incluidas, sin conexión
  app/
    app.component.ts              page-router-outlet
    app.module.ts                 Módulo, rutas y registerElement
    welcome/welcome.component.{ts,html}
    catalog/
      place.model.ts              Modelo y categorías
      catalog.logic.ts            Estado, filtro y regla del nombre
      catalog.service.ts          Servicio reactivo compartido
      catalog.component.{ts,html}  Búsqueda, listado, diálogo y refresh
    detail/detail.component.{ts,html}
    shared/
      place-name.directive.ts     Directiva NG_VALIDATORS
      notification.service.ts     Toasts con Toasty
App_Resources/Android/
  app.gradle
  src/main/
    AndroidManifest.xml
    res/
      drawable/explora_mark.xml
      drawable-nodpi/splash_screen.xml
      values/{colors,strings,styles}.xml
      values-v31/styles.xml
tests/catalog.test.mjs
tools/{generate-assets.ps1,export-code.cjs}
docs/superpowers/plans/2026-11-24-explora.md
package.json
nativescript.config.ts
tsconfig.json
references.d.ts
webpack.config.js
.gitignore
CODIGO_COMPLETO.md
```

## Código íntegro

Cada archivo fuente está disponible directamente en el proyecto. [CODIGO_COMPLETO.md](CODIGO_COMPLETO.md) reúne el contenido completo de los componentes, servicios, directiva, plantillas, configuración y recursos; los PNG también están incluidos como Base64. Se regenera con `npm run docs:code`. Para regenerar las imágenes en Windows: `powershell -NoProfile -ExecutionPolicy Bypass -File tools/generate-assets.ps1`.

## Verificación realizada y límites

- Se ejecutaron seis pruebas de lógica de dominio con el runner de Node.js: búsqueda por nombre/categoría/descripción sin tildes, longitud real del nombre, edición y rechazo de entradas inválidas, refresh con IDs únicos, favoritos y aislamiento de lecturas.
- Se generaron y visualizaron las dos imágenes PNG.
- `npm install` fue bloqueado con `EACCES` al acceder a `registry.npmjs.org`. No hay lockfile ni dependencias instaladas.
- `npm run typecheck` y `npm run build:android` se intentaron y fallaron porque `tsc` y `ns` no están instalados. No se ha generado un APK ni comprobado la interfaz en dispositivo. Las pruebas de dominio no comprueban la integración Angular ni los plugins nativos.
- El comando de pruebas usa la eliminación de tipos incorporada en Node.js 22.18+. Node 24 muestra un aviso `MODULE_TYPELESS_PACKAGE_JSON` al cargar el archivo TypeScript como ESM; no afecta a las seis pruebas. Se conserva CommonJS para la configuración de Webpack.

## Referencias consultadas

- [Paquete publicado NativeScript Angular 19](https://unpkg.com/@nativescript/angular@19.0.0/package.json) y sus [exportaciones públicas](https://unpkg.com/@nativescript/angular@19.0.0/lib/public_api.d.ts).
- [PullToRefresh: registro y evento refresh](https://market.nativescript.org/plugins/@nativescript-community/ui-pulltorefresh/). Es el sucesor comunitario de `@nstudio/nativescript-pulltorefresh`.
- [Toasty: API y versión del plugin](https://market.nativescript.org/plugins/@triniwiz/nativescript-toasty/).
- [Splash clásico de NativeScript](https://old.docs.nativescript.org/tooling/publishing/creating-launch-screens-android) y [atributos del splash de Android 12+](https://developer.android.com/develop/ui/views/launch/splash-screen).

## Checklist de verificación de los 10 requisitos

El código de los diez puntos está implementado. La comprobación visual y de interacción siguiente queda pendiente hasta poder compilar y ejecutar en Android.

| # | Implementación | Comprobación manual |
|---|---|---|
| 1 | `catalog.component.html`: `ListView` → `ng-template` → `FlexboxLayout`; `filterPlaces` filtra dinámicamente. | Buscar `cafe`, `ciudad` y un texto inexistente. Comprobar resultados y estado vacío. |
| 2 | `CatalogComponent.open()` llama a `RouterExtensions.navigate(['/detail', item.id])` desde el `(tap)` del contenido de cada fila. | Tocar el nombre o texto de una fila y volver desde el detalle. |
| 3 | `app.module.ts` registra `PullToRefresh`; envuelve directamente el `ListView`. `refresh()` agrega un destino aleatorio con ID único y apaga el indicador en `finally`. | Deslizar desde la parte superior, ver el toast y el nuevo plan; con filtro activo puede quedar oculto hasta limpiar la búsqueda. |
| 4 | Botón `⋮` de cada fila → `action()` → `CatalogService.update()` del atributo `category`. | Elegir una categoría, comprobar la etiqueta y repetir cancelando: cancelar no modifica el destino. |
| 5 | `NotificationService` usa `new Toasty({text}).show()`. Se invoca al refrescar, categorizar, guardar y cambiar favorito. | Ejecutar esas acciones y observar el mensaje temporal. |
| 6 | `[(ngModel)]` enlaza `query` en búsqueda y `name`/`email` en detalle, con `NativeScriptFormsModule`. | Escribir una búsqueda y editar el nombre; guardar y regresar al catálogo. |
| 7 | `PlaceNameDirective`, decorada con `@Directive`, proveedor `NG_VALIDATORS` y `multi: true`; declarada en `AppModule`. | Probar `ab`, espacios y `Sol`: los dos primeros son inválidos y deshabilitan Guardar. El correo opcional usa además el validador `email` de Angular. |
| 8 | La estrella de detalle maneja `(longPress)` mediante `toggleFavorite($event)`. | Mantenerla pulsada para alternar el favorito. |
| 9 | `toggleFavorite()` llama a `View.animate()` con `rotate: 360` y escala `1.25`; después restaura la transformación. | Observar el giro y el cambio de escala tras mantener pulsada la estrella. |
| 10 | `drawable-nodpi/splash_screen.xml`, logo vectorial, colores, tema `LaunchScreenTheme` y metadato `SET_THEME_ON_LAUNCH` del manifiesto; `values-v31` configura Android 12+. | Cerrar completamente y abrir la app en Android API 30 y API 31+; comprobar fondo verde y marca. Después aparece la bienvenida Angular con imagen y botón. |
