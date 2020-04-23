import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl: string;

  constructor(
    private http: AuthHttp
  ) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listaTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl)
            .toPromise()
            .then((response: any) => {
              return response.json();
    });
  }
}
