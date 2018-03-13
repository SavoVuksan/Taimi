import { Injectable } from '@angular/core';
import {LoadFileDataService} from './load-file-data.service';
import {WriteFileDataService} from './write-file-data.service';
import {MeasureRunTimeService } from '../services/measure-run-time.service';
import {NotificationService } from '../services/notification.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SharedVariablesService {

  private timeSettings:any; //all time settings
  private time:number; //Time the computer is already running
  private timeLeftDay:number; //The Time left Today
  private timeLeftWeek:number; //The Time already used this week start Mo-So
  private timeSettingsJsonURL = '../src/app/config/timeSettings.json';
  private navigatorVisible: boolean;//Sets the Navigator Visibility
  private userDataThisWeek: any;

  constructor(private loadFileDataService : LoadFileDataService,
    private writeFileDataService: WriteFileDataService,
    private measureRunTimeService : MeasureRunTimeService,
    private notificationService: NotificationService) {
      this.navigatorVisible = false;
    }


    toggleNavigator(){
      this.navigatorVisible = !this.navigatorVisible;
      return this.navigatorVisible;
    }
    getnavigatorVisibility(){
      return this.navigatorVisible;
    }
    setNavigatorVisibility(visible: boolean){
      this.navigatorVisible = visible;
    }

  loadtimeSettings(){
    this.timeSettings = {};
    this.loadFileDataService.getFileData(this.timeSettingsJsonURL)
      .subscribe(data => {
        this.timeSettings = data;

      });

  }

  writeTimeSettings()
  {
    this.writeFileDataService.writeToFile(
      this.timeSettings,'./src/app/config','timeSettings.json');
  }

  meausureTime(){
    let timer = Observable.timer(0,100);
    timer.subscribe(t =>{
      this.time = +this.measureRunTimeService.measureTime().toFixed(2);

      if(this.timeLeftDay <= 0)
      {
        this.timeLeftDay = 0;
      }else
      {
        this.timeLeftDay = this.timeSettings.hoursPerDay - this.time;
      }
      if(this.timeLeftWeek <= 0){
        this.timeLeftWeek = 0;
      }else{
        console.log(this.timeSettings.weekMaxTime);
        this.timeLeftWeek = this.timeSettings.hoursPerWeek - this.time;
      }
      if(this.time >= this.timeSettings.hoursPerDay)
      {
        //this.notificationService.showTimeIsUpNotification();
      }
    } );
  }

  setTimeSettings(timeSettings)
  {
    this.timeSettings = timeSettings;
  }
  getTimeSettings()
  {
    return this.timeSettings;
  }

  setTime(time)
  {
    this.time = time;
  }
  getTime()
  {
    return this.time;
  }

  setTimeLeftDay(timeLeftDay)
  {
    this.timeLeftDay = timeLeftDay;
  }
  getTimeLeftDay()
  {
    return this.timeLeftDay;
  }
  setTimeLeftWeek(timeLeftWeek)
  {
    this.timeLeftWeek = timeLeftWeek;
  }
  getTimeLeftWeek()
  {
    return this.timeLeftWeek;
  }
  getWeekStartDate(){
    var curr = new Date();
    var first = curr.getDate() - curr.getDay()+1;


    var firstDay = new Date(curr.setDate(first));
    return firstDay;

  }
  getWeekEndDate(){
    var curr = new Date();
    var first = curr.getDate() - curr.getDay()+1;
    var last = first +6;

    var lastDay = new Date(curr.setDate(last));
    return lastDay;
  }

getDays(){
  var days: any[] = new Array();
  var curDate = new Date();
  //curDate.setDate(curDate.getDate()+4);
  var curDay = curDate.getDay()-1;
  console.log(curDay);
  for(var i = 0; i < 7; i++){
    if(i < curDay){
      days.push({
        "dayMaxTime": this.userDataThisWeek.,
        "dayLeftTime": -10
      });
    }
    if(i > curDay){
      days.push({
        "dayMaxTime": this.getTimeSettings().hoursPerDay,
        "dayLeftTime": this.getTimeSettings().hoursPerDay
      });
    }
    if(i == curDay){
      days.push({
        "dayMaxTime": this.getTimeSettings().hoursPerDay,
        "dayLeftTime": this.timeLeftDay
      });

    }
    //days.push();
  }
  console.log(days);
 return days;
}

}
