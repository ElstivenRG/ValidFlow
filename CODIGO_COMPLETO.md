# Explora: entrega de código completo

Todos los archivos del proyecto se incluyen íntegros. Los PNG se entregan también en Base64 y se pueden regenerar con `tools/generate-assets.ps1`.

## Estructura

```text
.gitignore
App_Resources/Android/app.gradle
App_Resources/Android/src/main/AndroidManifest.xml
App_Resources/Android/src/main/res/drawable-nodpi/splash_screen.xml
App_Resources/Android/src/main/res/drawable/explora_mark.xml
App_Resources/Android/src/main/res/values-v31/styles.xml
App_Resources/Android/src/main/res/values/colors.xml
App_Resources/Android/src/main/res/values/strings.xml
App_Resources/Android/src/main/res/values/styles.xml
README.md
docs/superpowers/plans/2026-11-24-explora.md
nativescript.config.ts
package.json
references.d.ts
src/app.css
src/app/app.component.ts
src/app/app.module.ts
src/app/catalog/catalog.component.html
src/app/catalog/catalog.component.ts
src/app/catalog/catalog.logic.ts
src/app/catalog/catalog.service.ts
src/app/catalog/place.model.ts
src/app/detail/detail.component.html
src/app/detail/detail.component.ts
src/app/shared/notification.service.ts
src/app/shared/place-name.directive.ts
src/app/welcome/welcome.component.html
src/app/welcome/welcome.component.ts
src/assets/city.png
src/assets/mountains.png
src/main.ts
tests/catalog.test.mjs
tools/export-code.cjs
tools/generate-assets.ps1
tsconfig.json
webpack.config.js
```

## .gitignore

````text
node_modules/
platforms/
hooks/
dist/
.npm-cache/
*.log
````

## App_Resources/Android/app.gradle

````groovy
android {
    defaultConfig {
        minSdkVersion 23
    }
}
````

## App_Resources/Android/src/main/AndroidManifest.xml

````xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <uses-permission android:name="android.permission.INTERNET" />
  <application android:name="com.tns.NativeScriptApplication"
    android:allowBackup="false" android:label="@string/app_name"
    android:icon="@drawable/explora_mark" android:theme="@style/AppTheme">
    <activity android:name="com.tns.NativeScriptActivity"
      android:label="@string/app_name" android:theme="@style/LaunchScreenTheme"
      android:configChanges="keyboardHidden|orientation|screenSize|smallestScreenSize|screenLayout|locale|uiMode"
      android:exported="true" android:launchMode="singleTop"
      android:windowSoftInputMode="adjustResize">
      <meta-data android:name="SET_THEME_ON_LAUNCH" android:resource="@style/AppTheme" />
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>
    <activity android:name="com.tns.ErrorReportActivity" android:exported="false" />
  </application>
</manifest>
````

## App_Resources/Android/src/main/res/drawable-nodpi/splash_screen.xml

````xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item android:drawable="@color/explora_background" />
  <item android:width="160dp" android:height="160dp" android:gravity="center"
    android:drawable="@drawable/explora_mark" />
</layer-list>
````

## App_Resources/Android/src/main/res/drawable/explora_mark.xml

````xml
<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
  android:width="108dp" android:height="108dp"
  android:viewportWidth="108" android:viewportHeight="108">
  <path android:fillColor="#123E36" android:pathData="M0,0h108v108h-108z" />
  <path android:fillColor="#E9BE65" android:pathData="M65,31a8,8 0,1 0,16 0a8,8 0,1 0,-16 0" />
  <path android:fillColor="#BFE3CF" android:pathData="M19,75L43,32L68,75Z" />
  <path android:fillColor="#59AD91" android:pathData="M44,75L65,43L88,75Z" />
  <path android:fillColor="#FFFFFF" android:pathData="M35,46L43,32L51,46L43,43Z" />
</vector>
````

## App_Resources/Android/src/main/res/values-v31/styles.xml

````xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <style name="LaunchScreenTheme" parent="AppTheme">
    <item name="android:windowBackground">@drawable/splash_screen</item>
    <item name="android:windowSplashScreenBackground">@color/explora_background</item>
    <item name="android:windowSplashScreenAnimatedIcon">@drawable/explora_mark</item>
    <item name="android:windowSplashScreenIconBackgroundColor">@color/explora_background</item>
    <item name="android:windowActionBar">false</item>
    <item name="android:windowNoTitle">true</item>
  </style>
</resources>
````

## App_Resources/Android/src/main/res/values/colors.xml

````xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <color name="explora_background">#123E36</color>
  <color name="explora_accent">#0F766E</color>
  <color name="explora_surface">#F3F6F4</color>
</resources>
````

## App_Resources/Android/src/main/res/values/strings.xml

````xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <string name="app_name">Explora</string>
</resources>
````

## App_Resources/Android/src/main/res/values/styles.xml

````xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="colorAccent">@color/explora_accent</item>
    <item name="android:windowBackground">@color/explora_surface</item>
    <item name="android:statusBarColor">@color/explora_background</item>
    <item name="android:navigationBarColor">@color/explora_background</item>
    <item name="android:windowLightStatusBar">false</item>
  </style>
  <style name="LaunchScreenTheme" parent="AppTheme">
    <item name="android:windowBackground">@drawable/splash_screen</item>
    <item name="android:windowActionBar">false</item>
    <item name="android:windowNoTitle">true</item>
  </style>
</resources>
````

## README.md

````markdown
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
````

## docs/superpowers/plans/2026-11-24-explora.md

````markdown
# Plan de implementación de Explora

**Objetivo:** entregar una app móvil NativeScript + Angular con los diez requisitos del enunciado.
**Arquitectura:** NgModule, rutas bienvenida / catálogo / detalle, servicio compartido en memoria y lógica de dominio independiente de las APIs nativas.
**Tecnología:** NativeScript 8.9, Angular 19, TypeScript 5.7, PullToRefresh comunitario y Toasty.
**Decisiones:** catálogo de destinos con imágenes PNG locales; edición de nombre y correo; validación personalizada de nombre sin espacios vacíos. Android es la plataforma de entrega.

## Tareas
- [x] Probar primero búsqueda sin tildes, validación, edición, favoritos e identificadores únicos al refrescar.
- [x] Crear configuración, modelo, lógica, servicios y directiva NG_VALIDATORS.
- [x] Implementar bienvenida, ListView/FlexboxLayout, detalle, diálogos, gestos y animación.
- [x] Agregar recursos Android: manifiesto, temas antes y después de API 31 y splash.
- [x] Ejecutar pruebas disponibles, revisar recursos y entregar código completo con checklist manual.

## Condiciones de revisión
Cancelar el diálogo no modifica datos. La lista vacía conserva la posibilidad de refrescar.
Los cambios vuelven a aplicar el filtro. Un ID inexistente muestra un estado recuperable.
El spinner finaliza también ante errores. Guardar exige validar en la interfaz y el dominio.

## Validación prevista
`npm test`, `npm run typecheck`, `npm run build:android` y recorrido manual en Android.
Si el entorno impide instalar o compilar, registrar la limitación y no afirmar ejecución nativa.

## Resultado de la ejecución
Seis pruebas de dominio pasaron; los siete XML Android se pudieron analizar y ambos scripts JS pasaron `node --check`.
Los dos PNG se generaron y visualizaron. La instalación npm falló por EACCES de red; `tsc` y `ns` no están disponibles.
Quedan pendientes la resolución de dependencias, compilación Angular/Android y el recorrido manual en dispositivo.
````

## nativescript.config.ts

````typescript
import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.explora',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: { v8Flags: '--expose_gc', markingMode: 'none' },
} as NativeScriptConfig;
````

## package.json

````json
{
  "name": "explora-modulo-2",
  "version": "1.0.0",
  "private": true,
  "main": "src/main.ts",
  "scripts": {
    "android": "ns run android",
    "build:android": "ns build android",
    "typecheck": "tsc --noEmit",
    "test": "node --experimental-strip-types --test tests/*.test.mjs",
    "docs:code": "node tools/export-code.cjs"
  },
  "engines": { "node": ">=22.18.0" },
  "dependencies": {
    "@angular/animations": "~19.2.0",
    "@angular/common": "~19.2.0",
    "@angular/compiler": "~19.2.0",
    "@angular/core": "~19.2.0",
    "@angular/forms": "~19.2.0",
    "@angular/platform-browser": "~19.2.0",
    "@angular/platform-browser-dynamic": "~19.2.0",
    "@angular/router": "~19.2.0",
    "@nativescript/angular": "~19.0.0",
    "@nativescript/core": "~8.9.0",
    "@nativescript-community/ui-pulltorefresh": "2.5.3",
    "@triniwiz/nativescript-toasty": "4.1.3",
    "rxjs": "~7.8.1",
    "tslib": "^2.8.1",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular/compiler-cli": "~19.2.0",
    "@nativescript/android": "~8.9.0",
    "@nativescript/types": "~8.9.0",
    "@nativescript/webpack": "~5.0.22",
    "@ngtools/webpack": "~19.2.0",
    "nativescript": "~8.9.0",
    "typescript": "~5.7.3"
  }
}
````

## references.d.ts

````typescript
/// <reference types="@nativescript/types" />
````

## src/app.css

````css
Page { background-color: #F3F6F4; color: #173B36; }
ActionBar { background-color: #123E36; color: #FFFFFF; }
Label, TextField, Button { font-family: sans-serif; }
.screen { background-color: #F3F6F4; }
.welcome { background-color: #E5F1EB; }
.headline { font-size: 36; font-weight: bold; color: #123E36; margin-top: 12; }
.title { font-size: 27; font-weight: bold; margin-bottom: 8; }
.subtitle { font-size: 16; color: #47635C; margin-top: 12; margin-bottom: 16; }
.eyebrow { font-size: 12; font-weight: bold; color: #0F766E; letter-spacing: 0.1; }
.muted { font-size: 12; color: #5A716B; }
.input { background-color: #FFFFFF; border-width: 1; border-color: #B9CEC5; border-radius: 12; padding: 12; margin-top: 8; margin-bottom: 10; color: #173B36; font-size: 16; }
.primary { background-color: #0F766E; color: #FFFFFF; border-radius: 14; font-size: 16; font-weight: bold; padding: 14; margin-top: 16; }
.primary:disabled { background-color: #90AAA0; color: #FFFFFF; }
.card { background-color: #FFFFFF; margin: 6 16; padding: 12; border-radius: 16; }
.thumbnail, .hero { border-radius: 14; }
.item-title { font-size: 18; font-weight: bold; margin-top: 4; margin-bottom: 6; }
.icon { font-size: 26; color: #0F766E; background-color: #E5F1EB; border-radius: 24; padding: 0; margin: 0; }
.favorite { font-size: 42; color: #B47708; text-align: center; vertical-align: middle; }
.form { background-color: #E5F1EB; padding: 18; border-radius: 16; }
.field-label { font-size: 13; font-weight: bold; margin-top: 12; }
.error { color: #B42318; font-size: 12; margin-bottom: 8; }
.list { background-color: #F3F6F4; }
````

## src/app/app.component.ts

````typescript
import { Component } from '@angular/core';

@Component({
  selector: 'ns-app',
  standalone: false,
  template: '<page-router-outlet></page-router-outlet>',
})
export class AppComponent {}
````

## src/app/app.module.ts

````typescript
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptModule, NativeScriptFormsModule,
  NativeScriptRouterModule, registerElement,
} from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailComponent } from './detail/detail.component';
import { PlaceNameDirective } from './shared/place-name.directive';

registerElement('PullToRefresh', () => PullToRefresh);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent, WelcomeComponent, CatalogComponent,
    DetailComponent, PlaceNameDirective,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forRoot([
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: '**', redirectTo: 'welcome' },
    ]),
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
````

## src/app/catalog/catalog.component.html

````html
<ActionBar title="Descubre destinos"></ActionBar>
<GridLayout rows="auto,auto,*" class="screen">
  <StackLayout row="0" padding="16 20 8">
    <Label text="¿A dónde vamos?" class="title"></Label>
    <TextField hint="Buscar nombre, categoría o descripción" accessibilityLabel="Buscar destinos"
      [(ngModel)]="query" (ngModelChange)="filter($event)" autocorrect="false" class="input"></TextField>
  </StackLayout>
  <StackLayout row="1" padding="0 20 12">
    <Label [text]="items.length + ' resultados · desliza hacia abajo para agregar un plan'" class="muted" textWrap="true"></Label>
    <Label *ngIf="items.length === 0" text="Sin coincidencias. Cambia la búsqueda o actualiza la lista." textWrap="true" class="subtitle"></Label>
  </StackLayout>
  <PullToRefresh row="2" (refresh)="refresh($event)" indicatorColor="#0F766E" indicatorFillColor="#FFFFFF">
    <ListView [items]="items" separatorColor="transparent" class="list">
      <ng-template let-item="item">
        <FlexboxLayout flexDirection="row" alignItems="center" class="card">
          <Image [src]="item.image" width="74" height="86" stretch="aspectFill" class="thumbnail"></Image>
          <StackLayout flexGrow="1" flexShrink="1" padding="0 12" (tap)="open(item)" accessibilityRole="button" [accessibilityLabel]="'Abrir ' + item.name">
            <Label [text]="item.category" class="eyebrow"></Label>
            <Label [text]="item.name" class="item-title" textWrap="true"></Label>
            <Label [text]="item.favorite ? '★ En tus favoritos' : 'Ver y editar →'" class="muted"></Label>
          </StackLayout>
          <Button text="⋮" width="48" height="48" class="icon" accessibilityLabel="Cambiar categoría" (tap)="chooseCategory(item)"></Button>
        </FlexboxLayout>
      </ng-template>
    </ListView>
  </PullToRefresh>
</GridLayout>
````

## src/app/catalog/catalog.component.ts

````typescript
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { action, EventData } from '@nativescript/core';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
import { Subscription } from 'rxjs';
import { CatalogService } from './catalog.service';
import { filterPlaces } from './catalog.logic';
import { CATEGORIES, Category, Place } from './place.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'ns-catalog', standalone: false,
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit, OnDestroy {
  query = '';
  items: Place[] = [];
  private all: Place[] = [];
  private subscription?: Subscription;

  constructor(
    private readonly catalog: CatalogService,
    private readonly router: RouterExtensions,
    private readonly notifications: NotificationService,
    private readonly zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.subscription = this.catalog.places$.subscribe(items => {
      this.zone.run(() => { this.all = items; this.filter(this.query); });
    });
  }

  filter(query: string): void { this.items = filterPlaces(this.all, query); }

  async open(item: Place): Promise<void> {
    await this.router.navigate(['/detail', item.id], {
      transition: { name: 'slideLeft', duration: 200 },
    });
  }

  async chooseCategory(item: Place): Promise<void> {
    const selected = await action({
      title: `Categoría de ${item.name}`, cancelButtonText: 'Cancelar', actions: [...CATEGORIES],
    });
    if (!CATEGORIES.includes(selected as Category)) return;
    this.zone.run(() => {
      this.catalog.update(item.id, { category: selected as Category });
      this.notifications.show(`Categoría actualizada: ${selected}`);
    });
  }

  async refresh(args: EventData): Promise<void> {
    const control = args.object as PullToRefresh;
    try {
      const item = await this.catalog.refresh();
      this.notifications.show(`Agregado: ${item.name}. Se conserva tu búsqueda.`);
    } catch {
      this.notifications.show('No se pudo actualizar. Inténtalo de nuevo.');
    } finally {
      control.refreshing = false;
    }
  }

  ngOnDestroy(): void { this.subscription?.unsubscribe(); }
}
````

## src/app/catalog/catalog.logic.ts

````typescript
import type { Category, Place } from './place.model';

const categories: Category[] = ['Naturaleza', 'Ciudad', 'Cultura'];
const normalize = (value: string): string => value.normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();

export function validName(value: unknown): boolean {
  return typeof value === 'string' && Array.from(value.trim()).length >= 3;
}

export function filterPlaces(items: readonly Place[], query: string): Place[] {
  const text = normalize(query);
  return items.filter(item => normalize(
    `${item.name} ${item.category} ${item.description}`,
  ).includes(text));
}

export class CatalogStore {
  private readonly templates: Place[] = [
    { id: 1, name: 'Valle del Cocora', category: 'Naturaleza',
      description: 'Palmas de cera y senderos entre montañas.',
      image: '~/assets/mountains.png', favorite: false, email: '' },
    { id: 2, name: 'Cartagena', category: 'Ciudad',
      description: 'Calles coloniales junto al mar Caribe.',
      image: '~/assets/city.png', favorite: false, email: '' },
    { id: 3, name: 'Ruta del café', category: 'Naturaleza',
      description: 'Paisajes verdes y tradiciones del Eje Cafetero.',
      image: '~/assets/mountains.png', favorite: false, email: '' },
  ];
  private records: Place[] = this.templates.map(item => ({ ...item }));
  private nextId = 4;

  get items(): Place[] { return this.records.map(item => ({ ...item })); }

  find(id: number): Place | undefined {
    const item = this.records.find(record => record.id === id);
    return item ? { ...item } : undefined;
  }

  update(id: number, changes: Partial<Pick<Place, 'name' | 'email' | 'category' | 'favorite'>>): Place {
    const index = this.records.findIndex(item => item.id === id);
    if (index < 0) throw new Error('No se encontró el destino.');
    if (changes.name !== undefined && !validName(changes.name)) {
      throw new Error('El nombre necesita al menos tres caracteres sin contar espacios exteriores.');
    }
    if (changes.category !== undefined && !categories.includes(changes.category)) {
      throw new Error('Categoría inválida.');
    }
    const updated = { ...this.records[index], ...changes };
    updated.name = updated.name.trim();
    this.records[index] = updated;
    return { ...updated };
  }

  addRandom(): Place {
    const base = this.templates[Math.floor(Math.random() * this.templates.length)];
    const id = this.nextId++;
    const item = { ...base, id, name: `${base.name} · plan ${id}`, favorite: false, email: '' };
    this.records = [item, ...this.records];
    return { ...item };
  }
}
````

## src/app/catalog/catalog.service.ts

````typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CatalogStore } from './catalog.logic';
import { Place } from './place.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly store = new CatalogStore();
  private readonly changes = new BehaviorSubject<Place[]>(this.store.items);
  readonly places$ = this.changes.asObservable();

  find(id: number): Place | undefined { return this.store.find(id); }

  update(id: number, changes: Partial<Pick<Place, 'name' | 'email' | 'category' | 'favorite'>>): Place {
    const item = this.store.update(id, changes);
    this.changes.next(this.store.items);
    return item;
  }

  async refresh(): Promise<Place> {
    // Simula latencia; no depende de una API externa.
    await new Promise<void>(resolve => setTimeout(resolve, 600));
    const item = this.store.addRandom();
    this.changes.next(this.store.items);
    return item;
  }
}
````

## src/app/catalog/place.model.ts

````typescript
export const CATEGORIES = ['Naturaleza', 'Ciudad', 'Cultura'] as const;
export type Category = typeof CATEGORIES[number];

export interface Place {
  id: number;
  name: string;
  description: string;
  category: Category;
  image: string;
  favorite: boolean;
  email: string;
}
````

## src/app/detail/detail.component.html

````html
<ActionBar title="Tu destino">
  <NavigationButton text="Volver" android.systemIcon="ic_menu_back" (tap)="back()"></NavigationButton>
</ActionBar>
<ScrollView class="screen">
  <StackLayout padding="20">
    <StackLayout *ngIf="place as item; else missing">
      <Image [src]="item.image" height="210" stretch="aspectFill" class="hero"></Image>
      <GridLayout columns="*,64" marginTop="20">
        <StackLayout col="0">
          <Label [text]="item.category" class="eyebrow"></Label>
          <Label [text]="item.name" class="title" textWrap="true"></Label>
        </StackLayout>
        <Label col="1" [text]="item.favorite ? '★' : '☆'" class="favorite" width="60" height="60"
          accessibilityRole="button" accessibilityLabel="Mantén pulsado para cambiar favorito"
          (longPress)="toggleFavorite($event)"></Label>
      </GridLayout>
      <Label [text]="item.description" class="subtitle" textWrap="true"></Label>
      <Label text="Mantén pulsada la estrella para cambiar favorito y animarla." class="muted" textWrap="true" marginBottom="20"></Label>
      <StackLayout ngForm #editForm="ngForm" class="form">
        <Label text="Personaliza tu plan" class="item-title"></Label>
        <Label text="Nombre del destino" class="field-label"></Label>
        <TextField name="name" [(ngModel)]="name" appPlaceName required #nameField="ngModel"
          hint="Mínimo 3 caracteres" class="input" accessibilityLabel="Nombre del destino"></TextField>
        <Label *ngIf="nameField.invalid && (nameField.dirty || nameField.touched)"
          text="Escribe al menos 3 caracteres; los espacios exteriores no cuentan."
          class="error" textWrap="true"></Label>
        <Label text="Correo de contacto (opcional)" class="field-label"></Label>
        <TextField name="email" [(ngModel)]="email" email #emailField="ngModel" keyboardType="email"
          autocapitalizationType="none" autocorrect="false" hint="nombre@ejemplo.com" class="input"></TextField>
        <Label *ngIf="emailField.invalid && (emailField.dirty || emailField.touched)"
          text="Introduce un correo válido." class="error"></Label>
        <Button text="Guardar cambios" class="primary" [isEnabled]="editForm.valid === true" (tap)="save(editForm)"></Button>
        <Label text="Los cambios se conservan mientras la app está abierta." class="muted" textWrap="true"></Label>
      </StackLayout>
    </StackLayout>
    <ng-template #missing>
      <Label text="Este destino no existe." class="title" textWrap="true"></Label>
      <Button text="Volver al catálogo" class="primary" (tap)="back()"></Button>
    </ng-template>
  </StackLayout>
</ScrollView>
````

## src/app/detail/detail.component.ts

````typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { EventData, View } from '@nativescript/core';
import { CatalogService } from '../catalog/catalog.service';
import { validName } from '../catalog/catalog.logic';
import { Place } from '../catalog/place.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'ns-detail', standalone: false,
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  place?: Place;
  name = '';
  email = '';
  animating = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: RouterExtensions,
    private readonly catalog: CatalogService,
    private readonly notifications: NotificationService,
  ) {}

  ngOnInit(): void {
    this.place = this.catalog.find(Number(this.route.snapshot.paramMap.get('id')));
    this.name = this.place?.name ?? '';
    this.email = this.place?.email ?? '';
  }

  back(): void {
    if (this.router.canGoBack()) this.router.back();
    else void this.router.navigate(['/catalog'], { clearHistory: true });
  }

  save(form: NgForm): void {
    if (!this.place || form.invalid || !validName(this.name)) {
      form.control.markAllAsTouched();
      this.notifications.show('Revisa los campos del formulario.');
      return;
    }
    this.place = this.catalog.update(this.place.id, { name: this.name, email: this.email.trim() });
    this.name = this.place.name;
    form.form.markAsPristine();
    this.notifications.show('Cambios guardados durante esta sesión.');
  }

  async toggleFavorite(args: EventData): Promise<void> {
    if (!this.place || this.animating) return;
    this.place = this.catalog.update(this.place.id, { favorite: !this.place.favorite });
    this.notifications.show(this.place.favorite ? 'Agregado a favoritos' : 'Eliminado de favoritos');
    const icon = args.object as View;
    this.animating = true;
    try {
      await icon.animate({ rotate: 360, scale: { x: 1.25, y: 1.25 }, duration: 320 });
      await icon.animate({ rotate: 0, scale: { x: 1, y: 1 }, duration: 180 });
    } catch {
      // Salir de la página puede cancelar la animación.
    } finally {
      icon.rotate = 0;
      icon.scaleX = icon.scaleY = 1;
      this.animating = false;
    }
  }
}
````

## src/app/shared/notification.service.ts

````typescript
import { Injectable } from '@angular/core';
import { Toasty } from '@triniwiz/nativescript-toasty';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  show(text: string): void { new Toasty({ text }).show(); }
}
````

## src/app/shared/place-name.directive.ts

````typescript
import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { validName } from '../catalog/catalog.logic';

@Directive({
  selector: '[appPlaceName][ngModel]',
  standalone: false,
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => PlaceNameDirective), multi: true }],
})
export class PlaceNameDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return validName(control.value) ? null : { placeName: { minLength: 3 } };
  }
}
````

## src/app/welcome/welcome.component.html

````html
<ActionBar title="Explora"></ActionBar>
<GridLayout rows="*,auto" class="welcome">
  <StackLayout row="0" verticalAlignment="middle" padding="28">
    <Image src="~/assets/mountains.png" height="220" stretch="aspectFill" class="hero"></Image>
    <Label text="EXPLORA COLOMBIA" class="eyebrow" marginTop="28"></Label>
    <Label text="Tu próximo viaje&#10;empieza aquí." class="headline" textWrap="true"></Label>
    <Label text="Descubre destinos, crea tu lista de favoritos y personaliza cada plan." class="subtitle" textWrap="true"></Label>
  </StackLayout>
  <Button row="1" text="Explorar destinos →" class="primary" margin="24" (tap)="start()"></Button>
</GridLayout>
````

## src/app/welcome/welcome.component.ts

````typescript
import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-welcome', standalone: false,
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
  constructor(private readonly router: RouterExtensions) {}

  async start(): Promise<void> {
    await this.router.navigate(['/catalog'], {
      clearHistory: true, transition: { name: 'fade', duration: 250 },
    });
  }
}
````

## src/assets/city.png (Base64)

````text
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
````

## src/assets/mountains.png (Base64)

````text
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
````

## src/main.ts

````typescript
import '@nativescript/angular/polyfills';
import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';
import { AppModule } from './app/app.module';

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});
````

## tests/catalog.test.mjs

````javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { CatalogStore, filterPlaces, validName } from '../src/app/catalog/catalog.logic.ts';

test('busca por nombre, categoría y descripción, ignorando tildes y espacios', () => {
  const store = new CatalogStore();
  assert.equal(filterPlaces(store.items, '  CAFE  ')[0].name, 'Ruta del café');
  assert.equal(filterPlaces(store.items, 'naturaleza').length, 2);
  assert.equal(filterPlaces(store.items, 'coloniales')[0].name, 'Cartagena');
  assert.equal(filterPlaces(store.items, 'zzzz').length, 0);
  assert.equal(filterPlaces(store.items, ' ').length, 3);
});

test('el nombre rechaza espacios y menos de tres caracteres reales', () => {
  for (const name of ['', '    ', ' ab ', null, 123]) assert.equal(validName(name), false);
  assert.equal(validName('  Sol  '), true);
});

test('actualizar conserva el ID y los demás campos y rechaza entradas inválidas', () => {
  const store = new CatalogStore();
  const first = store.items[0];
  store.update(first.id, { name: '  Nuevo destino  ' });
  assert.equal(store.find(first.id).name, 'Nuevo destino');
  assert.equal(store.find(first.id).image, first.image);
  assert.throws(() => store.update(first.id, { name: '  ' }));
  assert.throws(() => store.update(first.id, { category: 'Inválida' }));
  assert.throws(() => store.update(9999, { name: 'Destino' }));
});

test('refrescar agrega destinos con IDs únicos que se pueden abrir en detalle', () => {
  const store = new CatalogStore();
  for (let i = 0; i < 50; i++) {
    const item = store.addRandom();
    assert.equal(store.find(item.id).id, item.id);
  }
  assert.equal(store.items.length, 53);
  assert.equal(new Set(store.items.map(item => item.id)).size, 53);
});

test('favoritos y categoría se reflejan en posteriores búsquedas', () => {
  const store = new CatalogStore();
  const id = store.items[0].id;
  store.update(id, { favorite: true, category: 'Ciudad' });
  assert.equal(store.find(id).favorite, true);
  assert.equal(filterPlaces(store.items, 'ciudad').length, 2);
});

test('las lecturas no permiten modificar accidentalmente el catálogo', () => {
  const store = new CatalogStore();
  store.items[0].name = 'Mutado';
  assert.notEqual(store.items[0].name, 'Mutado');
  assert.equal(store.find(-1), undefined);
});
````

## tools/export-code.cjs

````javascript
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const excluded = new Set(['node_modules', 'platforms', '.git', '.npm-cache']);
const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else {
      const relative = path.relative(root, absolute).replaceAll('\\', '/');
      if (relative !== 'CODIGO_COMPLETO.md' && !/\.(log|zip)$/.test(relative)) files.push(relative);
    }
  }
}
walk(root);
files.sort();
const languages = { ts: 'typescript', js: 'javascript', cjs: 'javascript', mjs: 'javascript', html: 'html', xml: 'xml', json: 'json', css: 'css', ps1: 'powershell', md: 'markdown', gradle: 'groovy' };
let output = '# Explora: entrega de código completo\n\n';
output += 'Todos los archivos del proyecto se incluyen íntegros. Los PNG se entregan también en Base64 y se pueden regenerar con `tools/generate-assets.ps1`.\n\n';
output += '## Estructura\n\n```text\n' + files.join('\n') + '\n```\n\n';
for (const file of files) {
  const binary = file.endsWith('.png');
  const contents = fs.readFileSync(path.join(root, file), binary ? 'base64' : 'utf8');
  const extension = path.extname(file).slice(1);
  const fence = '`'.repeat(4);
  output += `## ${file}${binary ? ' (Base64)' : ''}\n\n${fence}${binary ? 'text' : languages[extension] || 'text'}\n${contents.trimEnd()}\n${fence}\n\n`;
}
fs.writeFileSync(path.join(root, 'CODIGO_COMPLETO.md'), output);
console.log(`Código completo exportado: ${files.length} archivos.`);
````

## tools/generate-assets.ps1

````powershell
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$assetDirectory = Join-Path $PSScriptRoot '../src/assets'
New-Item -ItemType Directory -Force -Path $assetDirectory | Out-Null

function New-Landscape([string]$name, [bool]$city) {
    $bitmap = New-Object System.Drawing.Bitmap 720, 480
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $brushes = New-Object 'System.Collections.Generic.List[System.Drawing.SolidBrush]'
    function Brush([string]$hex) {
        $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
        $brushes.Add($brush)
        return $brush
    }
    try {
        $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#DCEEE5'))
        $graphics.FillEllipse((Brush '#E9BE65'), 510, 60, 96, 96)
        if ($city) {
            $graphics.FillRectangle((Brush '#64B7B0'), 0, 300, 720, 180)
            $graphics.FillRectangle((Brush '#D5A367'), 50, 170, 180, 230)
            $graphics.FillRectangle((Brush '#D07A5A'), 250, 125, 180, 275)
            $graphics.FillRectangle((Brush '#E7C58D'), 450, 205, 210, 195)
            foreach ($x in @(85, 150, 280, 350, 490, 570)) {
                $graphics.FillRectangle((Brush '#174B42'), $x, 240, 36, 66)
            }
            $graphics.FillRectangle((Brush '#F3DCAE'), 0, 392, 720, 88)
        } else {
            $back = [System.Drawing.Point[]]@(
                [System.Drawing.Point]::new(0, 400), [System.Drawing.Point]::new(245, 80),
                [System.Drawing.Point]::new(470, 400))
            $front = [System.Drawing.Point[]]@(
                [System.Drawing.Point]::new(240, 480), [System.Drawing.Point]::new(490, 155),
                [System.Drawing.Point]::new(720, 480))
            $graphics.FillPolygon((Brush '#77BCA3'), $back)
            $graphics.FillPolygon((Brush '#246452'), $front)
            $graphics.FillEllipse((Brush '#174B42'), -170, 340, 760, 330)
            $graphics.FillEllipse((Brush '#0F766E'), 280, 395, 650, 220)
        }
        $bitmap.Save((Join-Path $assetDirectory $name), [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
        $graphics.Dispose()
        $bitmap.Dispose()
        foreach ($brush in $brushes) { $brush.Dispose() }
    }
}

New-Landscape 'mountains.png' $false
New-Landscape 'city.png' $true
````

## tsconfig.json

````json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "lib": ["ES2022", "DOM"],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "useDefineForClassFields": false,
    "strict": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "types": ["@nativescript/types"]
  },
  "angularCompilerOptions": { "strictTemplates": true },
  "include": ["src/**/*.ts", "references.d.ts"],
  "exclude": ["node_modules", "platforms"]
}
````

## webpack.config.js

````javascript
const webpack = require('@nativescript/webpack');

module.exports = env => {
  webpack.init(env);
  return webpack.resolveConfig();
};
````

