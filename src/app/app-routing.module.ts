import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", redirectTo:"Relation", pathMatch:"full"},
  {path:"Relation", loadChildren:()=>import("./components/relation/relation.module").then(m=>m.RelationModule)},
  {path:"Asegurado", loadChildren:()=>import("./components/asegurado/asegurado.module").then(m=>m.AseguradoModule)},
  {path:"Seguro", loadChildren:()=>import("./components/seguro/seguro.module").then(m=>m.SeguroModule)},
  {path:"RelationSeguro", loadChildren:()=>import("./components/relation-seguro/realtion-seguro.module").then(m=>m.RealtionSeguroModule)},
  {path:"**", redirectTo:"Relation", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
