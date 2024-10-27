import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AseguradoComponent } from './asegurado.component';
import { RegisterAseguradoComponent } from './register-asegurado/register-asegurado.component';

const routes: Routes = [
  {path:"", component:AseguradoComponent},
  {path:"RegisterAsegurado", component:RegisterAseguradoComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AseguradoRoutingModule { }
