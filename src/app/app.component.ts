import { Component } from '@angular/core';

// We don't need the `CommonModule` if you are using a standalone components
import { CommonModule } from '@angular/common';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { Observable, of } from 'rxjs';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { ImageComponent } from './image-component/image.component';
import { LabelHighlightDirective } from './highlight/highlight.directive';
import { RouterOutlet, RouterModule } from '@angular/router'
import { Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  
  imports: [
    HelloWorldComponent,
    DynamicFormComponent,
    AsyncPipe,
    ImageComponent,
    LabelHighlightDirective,
    NgIf,
    RouterOutlet,
    RouterModule
  ],
})
export class AppComponent {
  state$: Observable<{ value1: string; value2: string } | undefined> = of(undefined);

  
  ngOnInit() {
    this.state$ = of({ value1: 'Hello', value2: 'world' });
  }
}
