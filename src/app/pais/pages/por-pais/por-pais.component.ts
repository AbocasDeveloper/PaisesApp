import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
	`
		li {
			cursor: pointer;
		}
	`
  ]
})
export class PorPaisComponent {

	termino: string = '';
	hayError: boolean = false;
	paises: Country[] = [];

	paisesSugeridos: Country[] = [];
	mostrarSugerencias: boolean = false;

  	constructor(
		private _paisService: PaisService
	) {
	}

  	buscar( termino: string) {
		this.hayError = false;
		this.termino = termino;
		this.mostrarSugerencias = false;

		this._paisService.buscarPais(this.termino).subscribe(
			response => {
				this.paises = response;
				console.log(this.paises);
			},
			error => {
				this.hayError = true;
				this.paises = [];
			}
		);
	}

	sugerencias( termino: string){
		this.hayError = false;
		this.termino = termino;
		this.mostrarSugerencias = true;

		this._paisService.buscarPais(termino).subscribe(
			response => {
				this.paisesSugeridos = response.splice(0,5)
			},
			error => {
				this.paisesSugeridos = [];
			}
		)
	}

	buscarSugerido(termino: string){
		this.buscar(termino);
	}
}
