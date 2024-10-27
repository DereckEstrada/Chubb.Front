import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { AseguradoModel } from '../../Models/asegurado.model';
import { QueryParametersInterface } from '../../Interfaces/query.parameters.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AseguradoService } from '../../services/asegurado.service';
import { RelationService } from '../../services/relation.service';
import { SeguroService } from '../../services/seguro.service';
import { SeguroModel } from '../../Models/seguro.model';
import { RelationModel } from '../../Models/relation.model';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrl: './relation.component.css'
})
export class RelationComponent {
  private _router=inject(Router);
  private _formBuilder=inject(FormBuilder);
  private _service=inject(RelationService);
  private _serviceSeguro=inject(SeguroService);
  private _serviceAsegurado=inject(AseguradoService);
  form!:FormGroup;
  screenWidth: number=0;
  aseguradosList:RelationModel[]=[];
  seguroList:SeguroModel[]=[];
  asegurado:AseguradoModel=new AseguradoModel();
  constructor(){
    this.screenWidth = window.innerWidth
    this.initForm();
  }
  ngOnInit(): void {
  }
  cargarSeguros(){
    this._serviceSeguro.GetSeguro(this.generateParametres("All", " ")).subscribe({
    next:resp=>{
      if(resp.code==200){
        this.seguroList=resp.data
        if(this.aseguradosList.length!=0){
          this.aseguradosList.forEach(seguro=>this.seguroList=this.seguroList.filter(segurosAsignados=>segurosAsignados.idSeguro!=seguro.idSeguro))  
        }
        }
      }
    })
  }
  initForm(){
    this.form=this._formBuilder.group(
      { 
        cedula:["", [Validators.required, Validators.pattern('^[0-9]+$')]]
      }
    )
  }
  getInvalid(argument:string){
    return this.form.get(argument)?.invalid && this.form.get(argument)?.touched;
  }
  buscarByCedula(){
    debugger
    if(this.form.invalid){
      this.modalError("");
      return;
    }
    let buscar=this.form.get('cedula')?.value;
    this.modalLoading("");    
    this._service.GetRelation(this.generateParametres("CedulaCompleta", buscar)).subscribe({
      next:resp=> {
        if(resp.code==200){  
          this.aseguradosList=resp.data
          this.cargarSeguros();
          Swal.close();          
          this._serviceAsegurado.GetAsegurado(this.generateParametres("CedulaCompleta", buscar)).subscribe({
            next:resp=>{
              if(resp.code==200){
                this.asegurado=resp.data[0]
              }
            }
          })
        }
          else if(resp.code==204){
            this.aseguradosList=[]
            this._serviceAsegurado.GetAsegurado(this.generateParametres("CedulaCompleta", buscar)).subscribe({
              next:resp=>{
                if(resp.code==200){
                  this.asegurado=resp.data[0]
                    this.cargarSeguros();
                    Swal.close();          
                }else if(resp.code==204){
                  this.modalCorrecto("La peticion no devolvio respuesta");
                }else{
                  this.modalError(resp.message);
                }
              },error:err=>this.modalError("")

            })

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
  asignarSeguro(item:SeguroModel){
      Swal.fire({
        title: "Deseas asignar este seguro?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Asignar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
          debugger
          let relation=new RelationModel();
          if(this.aseguradosList.length!=0){
            relation.idAsegurado=this.aseguradosList[0].idAsegurado;
          }else{
            relation.idAsegurado=this.asegurado.idAsegurado;
          }
          relation.idSeguro=item.idSeguro
            this._service.PostRelation(relation).subscribe({
              next:resp=>{
               if(resp.code==201){
                this.modalCorrecto("El seguro ha sido asignado correctamente");
                this._service.GetRelation(this.generateParametres("CedulaCompleta",this.form.get('cedula')?.value)).subscribe({
                  next:resp=>{
                    if(resp.code==200){
                      this.aseguradosList=resp.data;
                      this.cargarSeguros();
                    }
                  }
                })     
               } 
              }
              })
          } 
        });
}
eliminar( item:RelationModel){
  
    Swal.fire({
      title: "Deseas eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        debugger
            this._service.DeleteRelation(item).subscribe({
              next:resp=>{
                if(resp.code==201){
                    this.modalCorrecto("El registro ha sido eliminado correctamente");
                    this.aseguradosList=this.aseguradosList.filter(asegurado=>asegurado.idAseguradoSeguro!=item.idAseguradoSeguro);
                    this.AgregarSeguro(item);
                  } 
              }
            })            

        }
        }
    )}

    AgregarSeguro(item:RelationModel){
      let seguro=new SeguroModel();
      seguro.idSeguro=item.idSeguro;
      seguro.codigoSeguro=item.codigoSeguro;
      seguro.nombreSeguro=item.nombreSeguro;
      seguro.sumaAsegurada=item.sumaAsegurada;
      seguro.prima=item.prima
      this.seguroList.push(seguro);
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
