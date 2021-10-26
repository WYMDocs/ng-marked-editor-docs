import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NgMarkedEditorModule } from 'ng-marked-editor';
import { NgMarkedPreviewModule} from 'ng-marked-preview';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgMarkedEditorModule,
    NgMarkedPreviewModule
  ]
})
export class PagesModule { }
