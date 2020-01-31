import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Gps } from '../models/gps';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Gps[]>(`${environment.apiUrl}/gps`)
  }
}
