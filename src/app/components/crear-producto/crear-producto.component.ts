import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;

  // productoForm se iniciializa en el constructor
  constructor(
    private fb: FormBuilder, // utilizamos la clase FormBuilder que permite manejar de una buena manera los formularios
    private router: Router, // redireccionar al usuraio a oro componente
    private toastr: ToastrService
  ) {
    this.productoForm = this.fb.group({ // pasamos el objeto de los elementos que tenemos en el formulario como parámetro
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  agregarProducto(){
  // console.log('prueba-->', this.productoForm.get('producto')?.value); # accediendo al atributo
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }
    console.log('producto -->',PRODUCTO);
    this.toastr.success('¡El producto fue registrado con éxito!', 'Producto registrado...');
    this.router.navigate(['/']) // navegamos a la ruta raíz
  }
}
