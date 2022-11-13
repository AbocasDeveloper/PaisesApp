import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html'
})
export class PaisInputComponent implements OnInit {
  

    termino: string = '';
    debouncer: Subject<string> = new Subject;

    //Creamos el output que tendremos que llevar al componente padre
    @Output() onEnter: EventEmitter<string> = new EventEmitter();
    @Output() onDebounce: EventEmitter<string> = new EventEmitter();

    @Input() placeholder: string = '';

    ngOnInit(): void {
        //Cuando este 300 milesimas de segundo sin escribir, procedemos a evaluar el valor
        this.debouncer
            .pipe(debounceTime(300))    
            .subscribe(valor => {
                this.onDebounce.emit(valor);
            });
    }

    buscar(){
        //Cuando pulsemos ENTER, emitomos el termino, al componente padre
        this.onEnter.emit(this.termino);
    }

    //Vamos agregando las letras que va presionando el usuario
    teclaPresionada(){
        this.debouncer.next(this.termino);
    }

}
