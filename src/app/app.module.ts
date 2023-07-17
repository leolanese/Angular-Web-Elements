import { NgModule, CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    BrowserModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {

    // Define the new hello-world element
    // here we cefines a new custom element, 
    // mapping the given name to the given constructor as an autonomous custom element
    customElements.define(
      "hello-world",
      createCustomElement(HelloWorldComponent, { injector: injector })
    );

  }

  ngDoBootstrap() {}
}
