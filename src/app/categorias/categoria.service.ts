import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = `http://localhost:8080/categorias`;

  constructor(
    private http: AuthHttp
  ) { }

  listaTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl)
            .toPromise()
            .then((response: any) => {
              return response.json();
    });
  }
}
