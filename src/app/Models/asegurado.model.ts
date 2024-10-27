import { RelationModel } from "./relation.model";

export class AseguradoModel{
    idAsegurado?:number; 
    cedulaAsegurado?:string; 
    nombreAsegurado?:string; 
    apellidoAsegurado?:string; 
    edadAsegurado?:number; 
    telefonoAsegurado?:string; 
    fechaRegistro?:Date; 
    idEstado?:number; 
    aseguradoSeguros?:RelationModel[]
}