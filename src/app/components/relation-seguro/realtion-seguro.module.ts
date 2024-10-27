import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealtionSeguroRoutingModule } from './realtion-seguro-routing.module';
import { RealtionSeguroComponent } from './realtion-seguro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    RealtionSeguroComponent
  ],
  imports: [
    CommonModule,
    RealtionSeguroRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DropdownModule
  ], exports:[
    RealtionSeguroComponent
  ]
})
export class RealtionSeguroModule { }
