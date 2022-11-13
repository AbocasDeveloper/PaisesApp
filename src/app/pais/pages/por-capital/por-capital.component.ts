import { Component,  } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
})
export class PorCapitalComponent {
    termino: string = '';
    hayError: boolean = false;
    paises: Country[] = [];

    constructor(private _paisService: PaisService) {}

    buscar(termino: string) {
        this.hayError = false;
        this.termino = termino;

        this._paisService.buscarPorCapital(this.termino).subscribe(
        (response) => {
            this.paises = response;
        },
        (error) => {
            this.hayError = true;
            this.paises = [];
        }
        );
    }
}
