import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
        button {
            margin-right: 5px;
        }
    `
  ]
})
export class PorRegionComponent implements OnInit {

    regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
    regionActiva: string = '';
    paises: Country[] = [];
    hayError: boolean = false;

    constructor(
        private _paisService: PaisService
    ) { }

    ngOnInit(): void {
    }

    activarRegion(region: string){

        if(region === this.regionActiva) return;

        this.regionActiva = region;
        this.paises = [];

        this._paisService.buscarPorRegion(region).subscribe(
			response => {
                console.log(response);
				this.paises = response;
			}
		);
    }

    getClaseCSS(region: string){
        return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary';
    }

}
