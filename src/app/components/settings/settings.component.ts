import { Component, OnInit, Output, Input, Inject } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Settings} from '../../interfaces/settings';
import {SharedVariablesService} from '../../services/shared-variables.service';
import { DatabaseService } from '../../services/database.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  //TODO loadFileData service einbinden und nutzen

  //timeSettings constants
  public MinHoursPerDay = 1;
  public MaxHoursPerDay = 24;
  public MinHoursPerWeek = 1;
  public MaxHoursPerWeek = 48;
  public navigatorOn:boolean;

  constructor(private sharedVariables : SharedVariablesService,private database : DatabaseService) { }

  ngOnInit()
  {

    this.navigatorOn = false;
  }

toggleNavigator()
{
  this.navigatorOn = !this.navigatorOn;
}
resetTime(reset:boolean){
  if(reset){
    this.sharedVariables.setTodayTimeLeft(this.sharedVariables.getTodayTimeMax());
    
    this.sharedVariables.setWeekTimeLeft(((7 - (this.sharedVariables.getDayOfTheWeek()-1))*this.sharedVariables.getTodayTimeMax())-
  (this.sharedVariables.getTodayTimeMax()-this.sharedVariables.getTodayTimeLeft()));
  }
}
setMaxTime($event){

  if($event < this.sharedVariables.getTodayTimeLeft()){
    this.sharedVariables.setTodayTimeLeft($event);
  }
  this.sharedVariables.setTodayTimeMax($event);

  this.sharedVariables.setWeekTimeLeft(((7 - (this.sharedVariables.getDayOfTheWeek()-1))*this.sharedVariables.getTodayTimeMax())-
(this.sharedVariables.getTodayTimeMax()-this.sharedVariables.getTodayTimeLeft()));

}

}
