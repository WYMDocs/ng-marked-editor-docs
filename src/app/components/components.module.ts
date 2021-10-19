import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { TerminalComponent } from './terminal/terminal.component';
import { CircleLinkDirective } from './circle-link/circle-link.directive';



@NgModule({
  declarations: [
    CardComponent,
    CardContainerComponent,
    TerminalComponent,
    CircleLinkDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    CardContainerComponent,
    TerminalComponent,
    CircleLinkDirective
  ]
})
export class ComponentsModule { }
