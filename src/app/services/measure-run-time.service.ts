import { Injectable } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';


@Injectable()
export class MeasureRunTimeService {

  private now:number = 0
  private STARTTIME:any = new Date().getTime() / 1000

  constructor() { }

  measureTime(){
    return this.now = ((new Date().getTime() / 1000) - this.STARTTIME); //Die Zeit zwischen start des Programmes und jetzt in stunden
    
  }

}
