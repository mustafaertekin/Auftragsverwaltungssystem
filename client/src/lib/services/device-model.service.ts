import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { TokenService } from '@avs-ecosystem/services/token.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DeviceModel } from '@avs-ecosystem/models/DeviceModel';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private serverUrl: string;
  constructor(private  http: HttpClient, private tokenService: TokenService) {
    this.serverUrl = environment.baseUrl;
   }

  public create(deviceModel: DeviceModel, deviceId: string): Observable<Response> {
    return this.http.post(`${this.serverUrl}device-models/${deviceId}`, deviceModel).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}device-models`).pipe(map((res: Response) => res));
  }

  public getAllByDeviceId(deviceId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}device-models/getAllByDeviceId/${deviceId}`).pipe(map((res: Response) => res));
  }

  public update(model: any): Observable<any> {
    return this.http.put(`${this.serverUrl}device-models/${model.modelId}`, model).pipe(map((res: Response) => res));
  }

  public delete(modelId: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}device-models/${modelId}`).pipe(map((res: Response) => res));
  }
}
