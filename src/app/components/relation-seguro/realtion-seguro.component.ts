import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { QueryParametersInterface } from '../../Interfaces/query.parameters.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RelationService } from '../../services/relation.service';
import { RelationModel } from '../../Models/relation.model';

@Component({
  selector: 'app-realtion-seguro',
  templateUrl: './realtion-seguro.component.html',
  styleUrl: './realtion-seguro.component.css'
})
export class RealtionSeguroComponent {
  private _services=inject(RelationService);
  private _formBuilder=inject(FormBuilder);
  seguroList:RelationModel[]=[];
  form!:FormGroup;
  screenWidth: number=0;
  constructor(){
    this.screenWidth = window.innerWidth
    this.initForm();
  }
  ngOnInit(): void {
    
  }
  initForm(){
    this.form=this._formBuilder.group(
      { 
        code:["", [Validators.required, Validators.pattern('^[0-9]+$')]]
      }
    )
  }

  getInvalid(argument:string){
    return this.form.get(argument)?.invalid && this.form.get(argument)?.touched;
  }
  buscarByCedula(){
    if(this.form.invalid){
      this.modalError("Hay campos invalidos");
      return;
    }
    let buscar=this.form.get('code')?.value;
    this.modalLoading("");
    this._services.GetRelation(this.generateParametres("CodigoCompleto",buscar)).subscribe({
  
      next:resp=> {
        debugger
        if(resp.code==200){
          this.seguroList=resp.data
          Swal.close();
        }
          else if(resp.code==204){
            this.modalCorrecto("La peticion no devolvio respuesta");
          }
          else{
            this.modalError("");
          }
        },
        error:err=>{
          this.modalError("");
        }
      })
  }
  generateParametres(option:string, data:any){
    let parametres: QueryParametersInterface={
      SearchOption:option,
      data:data
    }
    return parametres
  }
  modalCorrecto(title?:string){
    Swal.fire({
      icon:"success",
      title:title,
      showConfirmButton: false,
      timer: 1500
    })
  }
  modalError(text?:string){
    Swal.fire({
      icon:"error",
      title:"Oops...\nHa ocurrido un error",
      text:text,
      showConfirmButton: false,
      timer: 1500
    })
  }
  modalLoading(text?:string){
    Swal.fire({
      icon:'info',
      title:'Cargando...',
      text:text,
      showConfirmButton: false,
      allowOutsideClick:false,
      allowEscapeKey:false,
    })
    Swal.showLoading()
  }
}
