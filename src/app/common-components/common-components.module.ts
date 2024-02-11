import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ContainerComponent } from './container/container.component';
import { TableComponent } from './table/table.component';

const COMPONENTS = [
  CardComponent,
  ButtonComponent,
  SpinnerComponent,
  ContainerComponent,
  TableComponent,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...COMPONENTS],
  exports: [...COMPONENTS],
})
export class CommonComponentsModule {}
