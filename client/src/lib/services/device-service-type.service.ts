import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { TokenService } from '@avs-ecosystem/services/token.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Service } from '@avs-ecosystem/models/Service';

@Injectable({
  providedIn: 'root'
})
export class DeviceServiceType {
  private serverUrl: string;
  constructor(private  http: HttpClient, private tokenService: TokenService) {
    this.serverUrl = environment.baseUrl;
   }

  public create(service: Service, modelId: string): Observable<Response> {
    return this.http.post(`${this.serverUrl}services/${modelId}`, service).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}services`).pipe(map((res: Response) => res));
  }
  public getAllByModelId(modelId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}services/getAllByModelId/${modelId}`).pipe(map((res: Response) => res));
  }

  public update(service: Service): Observable<any> {
    return this.http.put(`${this.serverUrl}services/${service.serviceId}`, service).pipe(map((res: Response) => res));
  }

  public delete(serviceId: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}services/${serviceId}`).pipe(map((res: Response) => res));
  }
}
