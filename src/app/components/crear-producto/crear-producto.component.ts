import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;

  // productoForm se iniciializa en el constructor
  constructor(private fb: FormBuilder) { // utilizamos la clase FormBuilder que permite manejar de una buena manera los formularios
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
    console.log('prueba-->', this.productoForm);
  }
}
