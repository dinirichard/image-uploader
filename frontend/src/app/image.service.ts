import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { PhotoRO } from './models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private api: string = environment.api_server;



  constructor(private http: HttpClient) { }

  saveImage(): Observable<any> {
    return this.http.post(this.api, '');
  }

  getAll(): Observable<PhotoRO[]> {
    return this.http.get<PhotoRO[]>(this.api);
  }
}
