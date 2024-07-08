import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:4000/api/productos/'

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> { // devuelve un Observable ya que lo solemos utilizar para hacer peticiones asincronas
    console.log('getProductos-->', this.url);
    return this.http.get(this.url);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id); // concatenamos el id
  }

  saveProduct(producto: Producto): Observable<any> { // recibe como parámetro un producto de tipo Producto
    return this.http.post(this.url, producto); // pasamos como segundo parámetro el producto
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get(this.url + id); // obtenemos los datos y concatenamos el id
  }

  editarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.url + id, producto); // concatenamos el id y pasamos producto como segundo parámetro
  }
}
