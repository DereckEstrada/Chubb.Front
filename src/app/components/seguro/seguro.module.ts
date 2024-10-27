import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguroRoutingModule } from './seguro-routing.module';
import { SeguroComponent } from './seguro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    SeguroComponent
  ],
  imports: [
    CommonModule,
    SeguroRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DropdownModule
  ],
  exports:[
    SeguroComponent
  ]
})
export class SeguroModule { }
