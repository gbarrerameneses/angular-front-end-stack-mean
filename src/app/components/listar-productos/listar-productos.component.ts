import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})
export class ListarProductosComponent implements OnInit {
  listProducto: Producto[] = [];

  constructor(private _productoService: ProductoService) { }

  ngOnInit(): void { // ciclo de vida
    this.obtenerProductos() // cuando se inicializa el ciclo de vida mandamos a llamar al método
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data => { // al devolver un observable nos tenemos que suscribir
      console.log(data);
      this.listProducto = data
    }, error => {
      console.log(error);
    })
  }

}
