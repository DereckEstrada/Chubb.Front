import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultInterface } from '../Interfaces/result.interface';
import { QueryParametersInterface, } from '../Interfaces/query.parameters.interface';
import { SeguroModel } from '../Models/seguro.model';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {
  private _http=inject(HttpClient);
  private baseUrl=environment.baseUrl;
  constructor(){}
  GetSeguro(query:QueryParametersInterface):Observable<ResultInterface>{  
    const GetTypeInsurance =this.baseUrl+environment.GetSeguro;
    return this._http.post(GetTypeInsurance,query);
  }
  PostSeguro(seguro:SeguroModel):Observable<ResultInterface>{
    const GetInsuranceByCode =this.baseUrl+environment.PostSeguro
    return this._http.post(GetInsuranceByCode,seguro);
  }
  UpdateSeguro(seguro:SeguroModel):Observable<ResultInterface>{
    const PostTypeInsurance=this.baseUrl+environment.UpdateSeguro
    return this._http.post(PostTypeInsurance,seguro);
  }
  DeleteSeguro(seguro:SeguroModel):Observable<ResultInterface>{
    const UpdateTypeInsurance =this.baseUrl+environment.DeleteSeguro
    return this._http.post(UpdateTypeInsurance,seguro);
  }  
}
