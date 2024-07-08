import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear producto'
  id: string | null;

  // productoForm se iniciializa en el constructor
  constructor(
    private fb: FormBuilder, // utilizamos la clase FormBuilder que permite manejar de una buena manera los formularios
    private router: Router, // redireccionar al usuraio a oro componente
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRoute: ActivatedRoute // forma de obtener el id, pero existe varias
  ) {
    this.productoForm = this.fb.group({ // pasamos el objeto de los elementos que tenemos en el formulario como parámetro
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id'); // inicializando id con el objeto aRoute para acceder al id
  }

  ngOnInit(): void {
    this.obtenerProducto(); // inicilizado el método
  }

  agregarProducto(){
  // console.log('prueba-->', this.productoForm.get('producto')?.value); # accediendo al atributo
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    // Validación para saber si es editar o agregar un producto
    if(this.id !== null) {
      // editamos producto
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.info('¡El producto fue actualizado con éxito!', 'Producto actualizado...');
        this.router.navigate(['/']) // navegamos a la ruta raíz
      }, error => {
        console.log(error);
        this.productoForm.reset(); // reseteamos el formulario
      })
    } else {
      // agregamos producto
      console.log('producto -->',PRODUCTO);
      this._productoService.saveProduct(PRODUCTO).subscribe(data => {
        this.toastr.success('¡El producto fue registrado con éxito!', 'Producto registrado...');
        this.router.navigate(['/']) // navegamos a la ruta raíz
      }, error => {
        console.log(error);
        this.productoForm.reset(); // reseteamos el formulario
      })
    }
  }

  obtenerProducto(){
    if(this.id !== null) {// revisamos si es null o no
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => { // llamamos al método del service, pasamos el id y nos suscribimos
        this.productoForm.setValue({ // rellenamos el formulario con setValue o patchValue y pasamos un objeto con los valores
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        })
      })
    }
  }
}
