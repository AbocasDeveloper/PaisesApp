import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
})
export class VerPaisComponent implements OnInit {

    pais!: Country;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _paisService: PaisService
    ) {}

    ngOnInit(): void {
        //Obtenemos el codigo del pais, cogiendolo de la URL y buscamos el pais
        this._activatedRoute.params
            .pipe(
                switchMap( ({id}) => this._paisService.getPaisPorCodigo(id) ),
                tap(console.log)
            )
            .subscribe(response => {
                this.pais = response[0];
                console.log(this.pais);
            }
        );

        
        /*this._activatedRoute.params.subscribe( ({id}) => {
            
            this._paisService.getPaisPorCodigo(id).subscribe(
                pais => {
                    console.log(pais);
                }
            )
        });*/

    }
}
