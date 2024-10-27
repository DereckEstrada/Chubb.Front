import { QueryParametersInterface} from '../Interfaces/query.parameters.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ResultInterface } from '../Interfaces/result.interface';
import { RelationModel } from '../Models/relation.model';

@Injectable({
  providedIn: 'root'
})
export class RelationService {
  private _http=inject(HttpClient);
  private baseUrl=environment.baseUrl;
  constructor() { }
  GetRelation(query:QueryParametersInterface):Observable<ResultInterface>{
    const RelationGetInsuranceForCedula=this.baseUrl+environment.GetAseguradoSeguro;
    return this._http.post(RelationGetInsuranceForCedula,query);
  }
  PostRelation(relation:RelationModel):Observable<ResultInterface>{
    const RelationGetCustomerForCodeInsurance=this.baseUrl+environment.PostAseguradoSeguro;
    return this._http.post(RelationGetCustomerForCodeInsurance,relation);
  }
  UpdateRelation(relation:RelationModel):Observable<ResultInterface>{
    const PostRelationCustomerInsurance=this.baseUrl+environment.UpdateAseguradoSeguro;
    return this._http.post(PostRelationCustomerInsurance,relation);
  }
  DeleteRelation(relation:RelationModel):Observable<ResultInterface>{
    const UpdateRelationCustomerInsurance=this.baseUrl+environment.DeleteAseguradoSeguro;
    return this._http.post(UpdateRelationCustomerInsurance,relation);
  }  
}
