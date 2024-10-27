import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ResultInterface } from '../Interfaces/result.interface';
import { QueryParametersInterface } from '../Interfaces/query.parameters.interface';
import { AseguradoModel } from '../Models/asegurado.model';

@Injectable({
  providedIn: 'root'
})
export class AseguradoService {
  private _http=inject(HttpClient);
  private baseUrl=environment.baseUrl;
  constructor() { }
  GetAsegurado(query:QueryParametersInterface):Observable<ResultInterface>{
    const GetCustomerByCedulaRepresent=this.baseUrl+environment.GetAsegurado;
    return this._http.post(GetCustomerByCedulaRepresent, query);
  }
  PostAsegurado(asegurado:AseguradoModel):Observable<ResultInterface>{
    const PostCustomer=this.baseUrl+environment.PostAsegurado;
    return this._http.post(PostCustomer, asegurado);
  }
  UpdateAsegurado(asegurado:AseguradoModel):Observable<ResultInterface>{
    const GetCustomersWithoutInsurance=this.baseUrl+environment.UpdateAsegurado;
    return this._http.post(GetCustomersWithoutInsurance, asegurado);
  }
  DeleteAsegurado(asegurado:AseguradoModel):Observable<ResultInterface>{
    const GetCustomerByCedula=this.baseUrl+environment.DeleteAsegurado;
    return this._http.post(GetCustomerByCedula, asegurado);
  }
  UploadFile(formData:FormData):Observable<ResultInterface>{
    const UploadFile=this.baseUrl+environment.UploadFile;
    return this._http.post(UploadFile, formData);
  }
}
