import { Component, inject, OnInit } from '@angular/core';
import { SeguroModel } from '../../Models/seguro.model';
import { SeguroService } from '../../services/seguro.service';
import Swal from 'sweetalert2';
import { QueryParametersInterface } from '../../Interfaces/query.parameters.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-Seguro',
  templateUrl: './seguro.component.html',
  styleUrl: './seguro.component.css'
})
export class SeguroComponent implements OnInit {
  private _services=inject(SeguroService);
  private _formBuilder=inject(FormBuilder);
  SeguroList:SeguroModel[]=[];
  form!:FormGroup;
  formCreate!:FormGroup;
  screenWidth: number=0;
  registarSeguro=new SeguroModel();
  constructor(){
    this.screenWidth = window.innerWidth
    this.initForm();
    this.initFormCreate();
  }
  ngOnInit(): void {
    this.cargarSeguros();
  }
  cargarSeguros(){
    this.modalLoading();
    this._services.GetSeguro(this.generateParametres("All", "")).subscribe({
      next:resp=> {
        if(resp.code==200){          
          this.SeguroList=resp.data
          Swal.close();
        }
          else if(resp.code==204){
            this.modalCorrecto("la peticion no devolvio respuesta");
          }
          else{
            this.modalError("")
          }
        },
        error:err=>{
          this.modalError("")
        }
    });
  }
  initForm(){
    this.form=this._formBuilder.group(
      { 
        code:["", [Validators.required, Validators.pattern('^[0-9]+$')]]
      }
    )
  }
  initFormCreate(){
    this.formCreate=this._formBuilder.group(
      { 
        codigo:["", [Validators.required,Validators.pattern('^[0-9]+$')]],
        nombre:["", [Validators.required]],
        suma:["", [Validators.required,Validators.pattern("^[0-9]+([.,][0-9]+)?$")]],
        prima:["", [Validators.required,Validators.pattern("^[0-9]+([.,][0-9]+)?$")]],
      }
    )
  }
  getInvalidCreate(argument:string){
    return this.formCreate.get(argument)?.invalid && this.formCreate.get(argument)?.touched;
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
    this.modalLoading()
    this._services.GetSeguro(this.generateParametres("CodigoParcial",buscar)).subscribe({
      next:resp=> {
        if(resp.code==200){
          this.SeguroList=resp.data
          Swal.close();

        }else if(resp.code==204){
            this.modalCorrecto("La peticion no devolvio respuesta");
          }
          else{
            this.modalError(resp.message); 
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

  editar(index:number, item:SeguroModel){
    debugger
    let nombreSeguro=document?.getElementById('nombreSeguro'+index) as HTMLInputElement;
    let sumaAsegurada=document?.getElementById('sumaAsegurada'+index) as HTMLInputElement;
    let prima=document?.getElementById('prima'+index) as HTMLInputElement;
    if(nombreSeguro.disabled){
      Swal.fire({
        title: "Deseas editar este registro?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Editar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
            nombreSeguro.disabled=false;
            sumaAsegurada.disabled=false;
            prima.disabled=false;
          }
        })
  }else{

        Swal.fire({
          title: "Deseas actualizar el registro?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Actualizar",
          denyButtonText: `Cancel`
        }).then((result) => {
          if (result.isConfirmed) {            
            this._services.UpdateSeguro(item).subscribe({
              next:resp=>{
               if(resp.code==201){
                this.modalCorrecto("El registro ha sido actualizado  correctamente");
                nombreSeguro.disabled=true;
                sumaAsegurada.disabled=true;
                prima.disabled=true;
               } 
              }
              })
          } 
        });
      }
}
eliminar( item:SeguroModel){
    Swal.fire({
      title: "Deseas eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
            this._services.DeleteSeguro(item).subscribe({
              next:resp=>{
                if(resp.code==201){
                  this.modalCorrecto("El registro ha sido eliminado correctamente");
                  this.SeguroList=this.SeguroList.filter(Seguro=>Seguro.idSeguro!=item.idSeguro)
                } 
              }
            })            

        }
        }
    )}
    registrar(){
      if(this.formCreate.invalid){
        this.modalError("Hay campos invalidos");
        Object.values(this.formCreate.controls).forEach(controls=>controls.markAllAsTouched());
        return;
      }
      Swal.fire({
        title: "Deseas registrar esta informacion?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Registrar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
          this.modalLoading("");
          Swal.showLoading()
          this._services.PostSeguro(this.registarSeguro).subscribe({
            next:resp=> {
              if(resp.code==201){
                this.SeguroList=resp.data
                this.modalCorrecto("Registrado Correctamente");                
                document.getElementById("closeButton")?.click();
                this.cargarSeguros();
                this.registarSeguro=new SeguroModel();
                Object.values(this.formCreate.controls).forEach(controls=>controls.markAsUntouched());
              }
                else{
                  this.modalError(resp.message);
                }
              },
              error:err=>{
                this.modalError("");
              }
            })
        }});
     
    }
    validarNulls(){
      let nulls=false;
      let nombre=this.SeguroList.some(nombre=>nombre.nombreSeguro== '');
      let apellido=this.SeguroList.some(sumaAsegurada=>sumaAsegurada.sumaAsegurada== 0);
      let telefono=this.SeguroList.some(prima=>prima.prima== 0);
      if(nombre||apellido||telefono){
        nulls=true;
      }
      return nulls
    }
    validarNegativo(event: KeyboardEvent): void {
      const key = event.key;
  
      const controlKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
  
      if (controlKeys.includes(key)) {
          return;
      }
  
      if (!/^[0-9]$/.test(key)) {
          event.preventDefault(); }
  }
  
    validarLength(event: KeyboardEvent, cantidad:number) {
      const input = event.target as HTMLInputElement;
      const key = event.key;
    
      const controlKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];
      if (controlKeys.includes(key)) {
        return;
      }
    
      if (!/^\d$/.test(key)) {
        event.preventDefault();
        return;
      }
    
      if (input.value.length >= cantidad) {
        event.preventDefault();
      }
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
