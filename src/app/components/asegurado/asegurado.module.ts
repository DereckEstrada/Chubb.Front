import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AseguradoRoutingModule } from './asegurado-routing.module';
import { AseguradoComponent } from './asegurado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterAseguradoComponent } from './register-asegurado/register-asegurado.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    AseguradoComponent,
    RegisterAseguradoComponent
  ],
  imports: [
    CommonModule,
    AseguradoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    DropdownModule,
    ButtonModule
  ], 
  exports:[
    AseguradoComponent,
    RegisterAseguradoComponent
  ]
})
export class AseguradoModule { }
