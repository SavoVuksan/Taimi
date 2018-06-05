import { Component, OnInit, style, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { SharedVariablesService } from '../../services/shared-variables.service';

@Component({
  selector: 'app-break',
  templateUrl: './break.component.html',
  styleUrls: ['./break.component.scss']
})
export class BreakComponent implements OnInit {
  //Optionen-Div anzeigen
  show: boolean = false;
  //Basis-Div anzeigen
  base: boolean = true;
  //Div für genommene Pause anzeigen
  breakTaken: boolean = false;
  //Farbe der Tasse beim Basis-Div
  iconColor = true;
  //Pause abbrechen
  terminateBreak = false;
  //Zeit der Pause
  maxTime: number;
  //Wann Pause gestartet hat
  breakStart: number;
  //Jetziger Zeitpunkt
  now: number;
  subscription: Subscription;
  progress: number;

  constructor( private sharedVars: SharedVariablesService ) { 
    this.progress = 85;
  }

  ngOnInit() {

  }

  //Optionen-Div öffnen
  openOptions(){
    this.show = true;
    this.base = false;
  }

  //Optionen-Div schließen
  close(){
    this.base = true;
    this.show = false;
    this.breakTaken = false;
  }

  //Progress des Balken zurückgeben
  getProgress(){
    return this.progress+"%";
  }

  //Pause mit vorgegebener Zeit
  takeABreak(time: number){
    if(!this.terminateBreak){
      this.breakStart = new Date().getTime() / 1000;
      //Von Optionen auf breakTaken-Div
      this.breakTaken = true;
      this.show = false;
      this.iconColor = true;
      this.terminateBreak = true;
      //Zeit setzen
      this.maxTime = time*60;
      let timer = Observable.timer(0,100);
      let timeLeft = this.sharedVars.getTodayTimeLeft();
      let timeRun = this.sharedVars.getRunTime();
      //"Stoppen"
      this.subscription = timer.subscribe(t =>{
        this.sharedVars.setRunTime(timeRun);
        this.sharedVars.setTodayTimeLeft(timeLeft);
        if(this.maxTime <= this.getLeftTimeProgress()){
          //Weiterzählen
          this.subscription.unsubscribe();
          this.breakTaken = false;
          this.base = true;
          this.terminateBreak = false;
        }
      } );
    }
    else{
      this.subscription.unsubscribe();
      this.breakTaken = false;
      this.base = true;
      this.terminateBreak = false;
    }
    
  }

  //Restliche Zeit der Pause
  getLeftTimeProgress() {
    this.now = ((new Date().getTime() / 1000) - this.breakStart);
    let restTime;
    restTime = this.maxTime - this.now;
    let wastedTime = this.maxTime - restTime;
    let perCent = this.maxTime / 100;
    this.progress = wastedTime / perCent;
    return wastedTime;
  }
}
