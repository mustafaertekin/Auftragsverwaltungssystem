import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { TokenService } from '@avs-ecosystem/services/token.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private serverUrl: string;
  constructor(private  http: HttpClient, private tokenService: TokenService) {
    this.serverUrl = environment.baseUrl;
   }

  public create(client): Observable<Response> {
    return this.http.post(`${this.serverUrl}devices`, client).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}devices`).pipe(map((res: Response) => res));
  }

  public update(device: any): Observable<any> {
    return this.http.put(`${this.serverUrl}devices/${device.deviceId}`, device).pipe(map((res: Response) => res));
  }

  public delete(deviceId: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}devices/${deviceId}`).pipe(map((res: Response) => res));
  }
}
