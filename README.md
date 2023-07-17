# MyAngularElement - Using Angular Element (Angular going Web Component) + Updated

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

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

> Routes will `lazy-load` their `standalone web components` by using the `loadComponent` function

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

        ]
    }
]
```

Now, we can trigger: `ng build` to view the `Initial Chunk files` and Lazy `Chunk Files`:

```js
// AOT and Lazy-Loading activated
Initial Chunk Files           | Names                     |  Raw Size | Estimated Transfer Size
main.5c3fef7fc8005c6a.js      | main                      | 298.51 kB |                80.41 kB
polyfills.5de45cff4c15dbb7.js | polyfills                 |  33.03 kB |                10.61 kB
runtime.973109fa7c19cdcc.js   | runtime                   |   2.65 kB |                 1.24 kB
styles.ef46db3751d8e999.css   | styles                    |   0 bytes |                       -

                              | Initial Total             | 334.20 kB |                92.26 kB

Lazy Chunk Files              | Names                     |  Raw Size | Estimated Transfer Size
946.e9a4ce571bbb348b.js       | display-display-component |   1.54 kB |               725 bytes
```

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
