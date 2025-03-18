# Angular Web Component

## Angular Elements
- The project leverages Angular Elements to package Angular components as custom HTML elements (Web Components). This allows these components to be used in any web application, regardless of the underlying framework (or lack thereof). This is a key point, the main goal is to `have a component that can be reused in any web environment`.

## Standalone Components:
- The project underline the use of standalone components, a feature introduced in newer Angular versions. This simplifies module management and improves tree-shaking, resulting in smaller bundle sizes. This removes the need of NgModules in many cases.

## Internationalization (i18n):
- The project demonstrates how to implement i18n in Angular Elements using Angular's built-in i18n features.
- It covers extracting translation strings, creating translation files, and building localized versions of the application.

## Lazy Loading:
- The project shows how to lazy-load routes and standalone web components, improving application performance by loading components only when needed.
- It also shows how to lazy load entire modules.

## Preloading Strategies:
- The project shows how to preload component data, using resolvers.

## Build and Deployment:
- It provides instructions on building the Angular Element for production, including generating a single JavaScript file that can be included in any HTML page.
- It also shows how to build and serve multilingual versions of the application.

## Reverse Proxy:
- It shows how to configure a reverse proxy using Express and http-proxy-middleware to handle API requests.

## Project Goals:
- To demonstrate how to create reusable Angular Web Components.
- To showcase modern Angular features and best practices.
- To provide a POC for building multilingual Angular Elements.
- To illustrate how to lazy-load components and modules.
- To show how to configure a reverse proxy.

---

## Setup environment

```js
nvm ls node
nvm i 18.10

npm i -g @angular/cli@latest

ng new my-angular-element

cd my-angular-element

npm i @angular/elements 
```

### Would you like to add Angular routing?

Adding Angular routing to an application built with Angular Elements can be a bit complex, and may not be necessary depending on your use case.

When you build an application using Angular Elements, the main use case is to create "reusable", "standalone" components that can be used in any web application, regardless of the framework it's built with. These components are often "isolated", meaning they don't depend on the rest of the Angular application and don't use services like the Angular Router

## i18n

To make the code i18n compliant, we'll use `Angular's built-in internationalization` (i18n) features

```js
// i18n extraction requires the '@angular/localize' package.
npm i --save-dev @angular/localize
```

```js
// tsconfig.json
"compilerOptions": {
    "paths": {
      "@angular/localize/*": [
        "./node_modules/@angular/localize/*"
      ]
    }
  }
```

```js
// example i18n tags in place
<h1 i18n>Hello {{ state?.name }}</h1>
<p i18n>Age: {{ state?.age }}</p>
```

```js
// now, let's extract the translation strings and generate: `messages.xlf`
ng extract-i18n
```

### messages.xlf

```js
...
<source>Hello: <x id="INTERPOLATION" equiv-text="{{ state?.value1 }}"/></source>
...
```

- Having the `tags` elements extracted to `messages.xlf`
- Translate the extracted strings in the `messages.xlf` file to different language(s)
- Create separate translation files for each supported language. For example, you can create a `messages.en.xlf` file for English, `messages.es.xlf` for Spanish, and so on.
- Update: `angular.json` to include these new translation files within i18n section:

```js
// angular.json

```
- Build App using `--localize` flag to generate the localiex versions of the App
```js
ng build --localize
```
- Serve the application with the appropriate locale
```js
ng serve --configuration=es
ng serve --configuration=en
```


## Create a New Component

```js
ng g c hello-world
```

> Now, let's include the createCustomElement and `MyElementModule` functionality


## Build

```js
ng build --configuration production --output-hashing none
```

> Now, we created a single JavaScript file in your `/dist` directory. This file is your custom element and can be used in any HTML file

## `Build` & `Serve` multilingual `i18n`

> By using the `ng build --localize` command followed by `ng serve --configuration=locale`, you can test the i18n functionality without performing a full build

```js
// build '/dist/es'
ng build --configuration=es

// build '/dist/en'
ng build --configuration=en

// also we can build all the languages at ones
// build '/dist/en' + '/dist/es'
ng build --localize

// After running this command use localized version(s) of your application
// Serve the '/dist/es'
ng serve --configuration=es
```

## Serve both version at the same time

For testing porpouses, we can serve the English version: `http://localhost:4201` and the Spanish version: `http://localhost:4202`

```js
ng serve --port 4201 --configuration=en
ng serve --port 4202 --configuration=es
```

---

## Consume the Angular Element

```js
// /dist/index.html
<script src="main.js"></script>
<app-hello-world name="World"></app-hello-world>
```

```js
// install http-server global
npm install -g http-server

// on project root
http-server dist/my-angular-element
```

## Reverse Proxy

```js
// install express + http-proxy-middleware
npm install express http-proxy-middleware --save
```

```js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/services', createProxyMiddleware({ 
  target: 'https://services.lttwdev.slcom-tws.com/services', 
  changeOrigin: true 
}));

app.listen(3000);
```

```js
// package.json
"reverse-proxy": "node server.js"
```

> now your app is running on: localhost:8080, so we have to update your request to: http://localhost:8080/services/login-service/v1/login

## Servers up and running

Run `node server.js` for Express server at `:8080` (which has the reverse proxy setup)
Run `ng serve` for Angular application at `:4200`


---

## POC Extra ++

### 1) CommonModule

> We don't need the `CommonModule` if you are using a standalone components.

This offers several benefits, including improved `tree-shaking`. For example, we can now import only the specific directives and pipes that we need, such as `NgIf` and `NgFor`, eliminating the need to import the entire CommonModule along with other unnecessary pipes and directives (this will reduce the size of the final bundle by including only the code that is actually used in the application)

```js
// CommonModule
BrowserModule
  BrowserModule 
      NgClass
      NgStyle
      NgIf  <-- JIC we have an `if` in a Component
      NgForOf
      NgSwitch
      NgSwitchCase
      NgSwitchDefault
      NgPlural
      NgLocalization
      NgTemplateOutlet
      NgContent
      Pipes

      DatePipe
      DecimalPipe
      PercentPipe
      UppercasePipe
      LowercasePipe
      TitleCasePipe
      JsonPipe
      SlicePipe
      AsyncPipe <-- JIC we have an `| async pipe`

  FormsModule
  HttpClientModule
  RouterModule
  UpgradeModule (used to support legacy applications that were created using AngularJS)

DomSanitizerModule
  DomSanitizer

FormsModule (Directives and pipes used to create, validate, and manipulate template-driven forms)
  FormsModule
    NgModel
    NgModelGroup
    FormBuilder
    FormGroup
    FormControl
    FormArray
    Validators
    AsyncValidators
  ReactiveFormsModule (Directives and pipes are used to create, validate, and manipulate reactive forms)
    FormBuilder
    FormGroup
    FormControl
    FormArray
    Validators
    AsyncValidators

InputModule ( if you are creating a component that does not have any input elements, then you do not need to import the InputModule)
  InputModule

NgModule
  NgModule

NgZoneModule (provides a way to manage the Angular ZoneJS)
  NgZone (OnPush-Change-Detection strategy 'do not' required NgZoneModule. Because Angular does not need to 'track asynchronous events' to perform Change Detection)

TitleModule
  TitleModule

UrlSerializerModule (serialize and deserialize URL parameters)
  UrlSerializer
```


### 2) lazy-load routes

> Routes will `lazy-load` their `standalone web components` by using the `loadComponent` function (internally loadComponent function returns a promise. This promise resolves to the loaded component when it is ready)

> Angular 16+ also uses: `Lazy-loading feature modules` allows us to `lazy-load entire modules, rather than just individual components`

```js
//  lazy loading for children based on routes
import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";

export const APP_ROUTES: Routes = [
    {
        path : '',
        children : [
            {
                path: 'dogs',
                loadComponent: () => import('./dogs/dogs.component')
                                           .then(c => c.DogsComponent)

            },
            {
                path: 'cats',
                loadChildren: () => import('./cars/cats.routes')
                                            .then(r => r.CatsComponent)

            },
            {
                // also we can use the loadChildren function to lazy-load the feature module
                loader: 'async',
                path: './my-feature/my-feature.module',
            },
            

        ]
    }
]
```

Now, we can trigger: `ng build` to view the `Initial Chunk files` + `Lazy Chunk Files` separated:

```js
// AOT and Lazy-Loading activated
✔ Browser application bundle generation complete.
✔ Copying assets complete.
✔ Index html generation complete.

Initial Chunk Files | Names                     |  Raw Size | Estimated Transfer Size
main.js             | main                      | 296.42 kB |                79.97 kB
polyfills.js        | polyfills                 |  33.03 kB |                10.61 kB
runtime.js          | runtime                   |   2.64 kB |                 1.23 kB
styles.css          | styles                    |   0 bytes |                       -

                    | Initial Total             | 332.09 kB |                91.80 kB

Lazy Chunk Files    | Names                     |  Raw Size | Estimated Transfer Size
946.js              | display-display-component |   1.54 kB |               733 bytes
360.js              | c1-c1-component           | 630 bytes |               389 bytes
561.js              | c2-c2-component           | 538 bytes |               329 bytes
```

### `Preloading Strategies` with standalone applications 

#### Preloading component data

> Preloading improves UX by loading parts of your application in the background. You can preload modules, standalone components or component data.

> We preload component data, using a resolver. Resolvers can improve UX by blocking the page load until all necessary data is available to fully display the page, BUT all the necesary content will be require on `initial page`, so "it may no be suttable for all solutions"

---

### Before leaving!

Once you have defined your Angular Element, you can use it like any other custom HTML element. This is one of the primary advantages of Angular Elements, as they can be used in any web environment that supports Web Components, not just Angular.

---

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---
### :100: <i>Thanks!</i>
#### Now, don't be an stranger. Let's stay in touch!

<a href="https://github.com/leolanese" target="_blank" rel="noopener noreferrer">
  <img src="https://scastiel.dev/api/image/leolanese?dark&removeLink" alt="leolanese’s GitHub image" width="600" height="314" />
</a>

##### :radio_button: Linkedin: <a href="https://www.linkedin.com/in/leolanese/" target="_blank">LeoLanese</a>
##### :radio_button: Twitter: <a href="https://twitter.com/LeoLanese" target="_blank">@LeoLanese</a>
##### :radio_button: Portfolio: <a href="https://www.leolanese.com" target="_blank">www.leolanese.com</a>
##### :radio_button: DEV.to: <a href="https://www.dev.to/leolanese" target="_blank">dev.to/leolanese</a>
##### :radio_button: Blog: <a href="https://www.leolanese.com/blog" target="_blank">leolanese.com/blog</a>
##### :radio_button: Questions / Suggestion / Recommendation: developer@leolanese.com
