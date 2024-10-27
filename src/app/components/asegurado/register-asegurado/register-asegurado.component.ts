import { Component, inject, OnInit } from '@angular/core';
import { AseguradoService } from '../../../services/asegurado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AseguradoModel } from '../../../Models/asegurado.model';
import { SeguroService } from '../../../services/seguro.service';
import { QueryParametersInterface } from '../../../Interfaces/query.parameters.interface';
import { SeguroModel } from '../../../Models/seguro.model';
import Swal from 'sweetalert2';
import { RelationService } from '../../../services/relation.service';

@Component({
  selector: 'app-register-asegurado',
  templateUrl: './register-asegurado.component.html',
  styleUrl: './register-asegurado.component.css'
})
export class RegisterAseguradoComponent  implements OnInit{
  private _services=inject(AseguradoService);
  private _formBuilder=inject(FormBuilder);
  private _servicesSeguro=inject(SeguroService);
  AseguradoCreate=new AseguradoModel();
  segurosAsginadoList:SeguroModel[]=[];
  segurosList:SeguroModel[]=[];
  form!:FormGroup;
  constructor(){
    this.initForm();
  }
  ngOnInit(): void {
    this.cargarSeguros();
  }
  cargarSeguros(){
    this.modalLoading("");
    this._servicesSeguro.GetSeguro(this.generateParametres("All", "")).subscribe({
      next:resp=>{
        if(resp.code==200){
          this.segurosList=resp.data;
          Swal.close();
        }else if(resp.code==204){
          this.modalCorrecto("No hay registro de seguros");
        }else{
          this.modalError("");
        }         
      },
      error:err=>{
        this.modalError(""); 
      }
    })
  }
  initForm(){
    this.form=this._formBuilder.group(
      {
        nombre:["", [Validators.required,  Validators.pattern('^[A-Za-z]+$')]], 
        apellido:["", [Validators.required, Validators.pattern('^[A-Za-z]+$')]], 
        cedula:["", [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]], 
        edad:["", [Validators.required, Validators.pattern('^[0-9]+$')]], 
        telefono:["", [Validators.required, Validators.pattern('^[0-9+]+$')]], 
      }
    )    
  } 
  getInvalid(argument:string){
    return this.form.get(argument)?.invalid && this.form.get(argument)?.touched;
  }
  generateParametres(option:string, data:any){
    let parametres: QueryParametersInterface={
      SearchOption:option,
      data:data
    }
    return parametres
  }
  
  agregarSeguro(item:any){
    this.segurosAsginadoList.push(item);
    this.segurosList=this.segurosList.filter(seguro=>seguro.idSeguro!=item.idSeguro)
  }
  eliminarSeguro(item:any){
    this.segurosList.push(item);
    this.segurosAsginadoList=this.segurosAsginadoList.filter(seguro=>seguro.idSeguro!=item.idSeguro)
  }

  guardarCliente(){
    debugger
    if(this.form.invalid){
      this.modalError("Hay campos invalidos");
      Object.values(this.form.controls).forEach(controls=>controls.markAllAsTouched());
      return;
    }
    Swal.fire({
      title: "Deseas Guardar la informacion?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Guardar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.modalLoading("");
        this.AseguradoCreate.aseguradoSeguros=this.segurosAsginadoList;
        this._services.PostAsegurado(this.AseguradoCreate).subscribe({
          next:resp=>{
            if(resp.code==201){
              this.modalCorrecto("Registrado correctamente");
              this.AseguradoCreate=new AseguradoModel();
              Object.values(this.form.controls).forEach(controls=>controls.markAsUntouched());
              this.segurosAsginadoList=[]
              this.cargarSeguros();
            }else{
             this.modalError(resp.message);
            }            
          },
          error:err=>{
            this.modalError("");
          }
        })   
      }
    })   
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
