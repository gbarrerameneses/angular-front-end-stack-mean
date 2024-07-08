import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})
export class ListarProductosComponent implements OnInit {
  listProducto: Producto[] = [];

  constructor(
    private _productoService: ProductoService,
    private toastr: ToastrService
  ) { }

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

  eliminarProducto(id: any) { // pasamos el id de tipo any
    this._productoService.deleteProducto(id).subscribe(data => { // llamamos al método que creamos en el servicio, le pasamos el id y nos suscribimos
    this.toastr.error('¡Elproducto fue eliminado con éxito!', 'Producto Eliminado...'); // agregamos alerta toastr con msg
    this.obtenerProductos(); // mandamos a llamar al método para volver a cargar los productos
  }, error => {
    console.log(error);
  })
  }
}
