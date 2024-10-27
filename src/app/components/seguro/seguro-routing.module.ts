import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguroComponent } from './seguro.component';

const routes: Routes = [
  {path:"", component:SeguroComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguroRoutingModule { }
