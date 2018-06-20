import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { SharedVariablesService } from '../../services/shared-variables.service';
import { NotificationService } from '../../services/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {
  //Menü-Div anzeigen
  show: boolean = false;
  //Basis-Div anzeigen
  base: boolean = true;
  //Farbe der Tasse beim Basis-Div
  iconColor = true;
  //Pause abbrechen
  terminateBreak = false;
  //Erinnerungstext
  remindertext : string = "Task";
  //Zeit für Erinnerung
  selectedTime: string;
  //Farbenänderungen
  textColor: string = "rgb(192, 192, 192)";
  timeColor: string = "rgb(192, 192, 192)";
  buttonColor: string = "rgb(192, 192, 192)";
  //Button Freigabe
  textChanged: boolean = false;
  timeChanged: boolean = false;
  add: boolean = true;
  //Felder leeren
  textEmptied: boolean = false;
  timeEmptied: boolean = false;
  //Zeit messen
  subscription: Subscription;
  //Erinnerung gesetzt
  setMemory: boolean = false;

  constructor( private sharedVars: SharedVariablesService, private notification: NotificationService) { }

  ngOnInit() {
  }

  //Menü-Div öffnen
  openMenu(){
    if(this.setMemory == false){
      this.show = true;
      this.base = false;
    }
  }

  //Menü-Div schließen
  close(){
    this.base = true;
    this.show = false;
    //Alles zurücksetzen
    this.textColor = "rgb(192, 192, 192)";
    this.timeColor = "rgb(192, 192, 192)";
    this.buttonColor = "rgb(192, 192, 192)";
    this.remindertext = "Task";
    this.selectedTime = "00:00";
    this.textChanged = false;
    this.timeChanged = false;
    this.textEmptied = false;
    this.timeEmptied = false;
  }

  //Textfeld leeren und Buttonfreigabe kontrollieren
  emptyText(){
    if(!this.textEmptied){
      //Beim ersten Mal durchführen
      this.remindertext = "";
      this.textEmptied = true;
      this.textColor = "black";
    }
    this.textChanged = true;
    if(this.textChanged==true && this.timeChanged == true && this.remindertext.length>1){
      this.buttonColor = "#28CBC2";
      this.add = false;
    }
  }

  //Zeitfeld leeren und Buttonfreigabe kontrollieren
  emptyTime(){
    if(!this.timeEmptied){
      //Beim ersten Mal durchführen
      this.timeEmptied = true;
      this.timeColor = "black";
    }
    this.timeChanged = true;
    if(this.textChanged==true && this.timeChanged == true  && this.remindertext.length>1){
      this.buttonColor = "#28CBC2";
      this.add = false;
    }
  }

  //Erinnerung speichern
  addMemory(){

    this.setMemory = true;
    var reminder = this.remindertext;
    let timer = Observable.timer(0,300);
    var currentDate  = moment().format("DD-MM-YYYY");
    var hourmin = this.selectedTime.split(':');
    var memoryTimeString = moment(currentDate+" "+this.selectedTime).format("MM-DD-YYYY hh:mm a");
    //console.log(memoryTimeString);
    this.close();
    this.subscription = timer.subscribe(t =>{
      //Derzeitige Zeit holen
      var nowString = moment().format("DD-MM-YYYY h:mm a");
      var now = moment(nowString).valueOf();
      var targettime = new Date();
      var curTime = new Date();
      targettime.setHours(parseInt(hourmin[0]),parseInt(hourmin[1]),0,0);

      //TimeString auf Time ändern
      var memoryTime = moment(memoryTimeString).valueOf();
      //Time mit Now vergleichen
      //console.log((memoryTime));

      console.log(targettime.getTime() - curTime.getTime());
      if((targettime.getTime() - curTime.getTime()) <= 0){
        console.log('memory')
      //Wenn Now gleich oder später als Time ist, Nachricht ausgeben
        this.notification.showSmallNotification("Reminder", reminder);
        console.log("It worked");
        this.subscription.unsubscribe();
        this.setMemory = false;
      }
    } );
  }
}
