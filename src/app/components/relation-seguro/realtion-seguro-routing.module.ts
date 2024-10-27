import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealtionSeguroComponent } from './realtion-seguro.component';

const routes: Routes = [
  {path:'', component:RealtionSeguroComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealtionSeguroRoutingModule { }
