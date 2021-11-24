import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NgMarkedEditorModule } from 'ng-marked-editor';
import { DocsComponent } from './docs/docs.component';
import { ExampleComponent } from './example/example.component';
import { SourceCodeComponent } from './source-code/source-code.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    HomeComponent,
    DocsComponent,
    ExampleComponent,
    SourceCodeComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgMarkedEditorModule
  ]
})
export class PagesModule { }
