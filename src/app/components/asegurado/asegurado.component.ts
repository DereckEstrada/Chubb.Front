import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AseguradoModel } from '../../Models/asegurado.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AseguradoService } from '../../services/asegurado.service';
import { QueryParametersInterface } from '../../Interfaces/query.parameters.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-asegurado',
  templateUrl: './asegurado.component.html',
  styleUrl: './asegurado.component.css'
})
export class AseguradoComponent implements OnInit{
  private _router=inject(Router);
  private _formBuilder=inject(FormBuilder);
  private _service=inject(AseguradoService);
  form!:FormGroup;
  screenWidth: number=0;
  aseguradoList:AseguradoModel[]=[];
  constructor(){
    this.screenWidth = window.innerWidth
    this.initForm();
  }
  ngOnInit(): void {
    this.modalLoading("");
    this.cargarAsegurados();
  }
  initForm(){
    this.form=this._formBuilder.group(
      { 
        cedula:["", [Validators.required, Validators.pattern('^[0-9]+$')]]
      }
    )
  }
  cargarAsegurados(){
    this._service.GetAsegurado(this.generateParametres("All", "")).subscribe({
      next:resp=> {
        if(resp.code==200){          
          this.aseguradoList=resp.data
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
  getInvalid(argument:string){
    return this.form.get(argument)?.invalid && this.form.get(argument)?.touched;
  }
  buscarByCedula(){
    debugger
    if(this.form.invalid){
      this.modalError("El campo es invalido")
      return;
    }
    let buscar=this.form.get('cedula')?.value;
    this.modalLoading("");
    this._service.GetAsegurado(this.generateParametres("CedulaParcial", buscar)).subscribe({
      next:resp=> {
        if(resp.code==200){          
          this.aseguradoList=resp.data
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
      })
  }
  generateParametres(option:string, data:any){
    let parametres: QueryParametersInterface={
      SearchOption:option,
      data:data
    }
    return parametres
  }
  editar(item:AseguradoModel){
    debugger
    let nombre=document?.getElementById('nombre'+item.idAsegurado) as HTMLInputElement;
    let apellido=document?.getElementById('apellido'+item.idAsegurado) as HTMLInputElement;
    let edad=document?.getElementById('telefono'+item.idAsegurado) as HTMLInputElement;
    let telefono=document?.getElementById('edad'+item.idAsegurado) as HTMLInputElement;
    if(nombre.disabled){
      Swal.fire({
        title: "Deseas editar este registro?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Editar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
          if(nombre.disabled){
            nombre.disabled=false;
            apellido.disabled=false;
            telefono.disabled=false;
            edad.disabled=false;
            }
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
            if(this.validarNulls()){
              this.modalError("No pueden haber campos vacios");
              return;
            }
            this._service.UpdateAsegurado(item).subscribe({
              next:resp=>{
               if(resp.code==201){
                this.modalCorrecto("El registro ha sido actualizado  correctamente");
                nombre.disabled=true;
                apellido.disabled=true;
                telefono.disabled=true;
                edad.disabled=true;
               }else{
                this.modalError("");
               }
              }
              })
          } 
        });
      }
}
eliminar( item:AseguradoModel){
    Swal.fire({
      title: "Deseas eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
            this._service.DeleteAsegurado(item).subscribe({
              next:resp=>{
                if(resp.code==201){
                  this.modalCorrecto("El registro ha sido eliminado correctamente");
                    this.aseguradoList=this.aseguradoList.filter(asegurado=>asegurado.idAsegurado!=item.idAsegurado);
                 }else{
                  this.modalError("");
                 } 
              }, error:err=>{
                this.modalError("");
              }
            })            

        }
        }
    )}
    GetFile(event:any){
      const file: File | null = event.target.files[0];
      if (file) {
      Swal.fire({
        title: "Deseas subir este archivo?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Subir",
        denyButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
          this.modalLoading();
            const formData = new FormData();
            formData.append('file', file);
            this._service.UploadFile(formData).subscribe({
              next:resp=>{
                if(resp.code==201){
                  this.modalCorrecto("El archivo ha sido subido correctamente");
                  this.cargarAsegurados()
                }else{
                  this.modalError(resp["message"]);
                }
              },
              error:err=>{
                this.modalError(""); 
              }
            });
          
      }
      })
    }
  }
  validarNulls(){
    let nulls=false;
    let nombre=this.aseguradoList.some(nombre=>nombre.nombreAsegurado== '');
    let apellido=this.aseguradoList.some(apellido=>apellido.apellidoAsegurado== '');
    let telefono=this.aseguradoList.some(telefono=>telefono.telefonoAsegurado== '');
    let edad=this.aseguradoList.some(edad=>edad.edadAsegurado==0);
    if(nombre||apellido||telefono||edad){
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

    Registrar(){
      this._router.navigateByUrl("Asegurado/RegisterAsegurado");    
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
    

