import { Injectable, Input } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';


@Injectable()
export class MeasureRunTimeService {

  public now:number = 0;
  public STARTTIME:any = new Date().getTime() / 1000;


  constructor() { }

  measureTime(){
    return this.now = ((new Date().getTime() / 1000) - this.STARTTIME); //Die Zeit zwischen start des Programmes und jetzt in stunden

  }
  getCurrentTime(){
    return new Date();
  }
  getDayType(){
    if(this.getCurrentTime().getDay() >0 && this.getCurrentTime().getDay() < 7){
      return "Workday";
    }else{
      return "Weekend";
    }
  }
  getSeason(){
    var month = this.getCurrentTime().getMonth();
    var day = this.getCurrentTime().getDate();
    if(month >= 3 && day > 21 && month <= 6 && day < 21){
      return "Spring";
    }else if(month >= 6 && day > 21 && month <= 9 && day < 23){
      return "Summer";
    }else if(month >= 9 && day > 23 && month <= 12 && day < 21){
      return "Fall";
    }else{
      return "Winter";
    }


  }

}
