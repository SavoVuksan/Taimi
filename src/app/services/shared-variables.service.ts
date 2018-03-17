import { Injectable } from '@angular/core';
import {LoadFileDataService} from './load-file-data.service';
import {WriteFileDataService} from './write-file-data.service';
import {MeasureRunTimeService } from '../services/measure-run-time.service';
import {NotificationService } from '../services/notification.service';
import {Observable, BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class SharedVariablesService {

  private timeSettings = new BehaviorSubject<any>(1); //all time settings
  private time:number; //Time the computer is already running
  timeLeftDay:number; //The Time left Today
  private timeLeftWeek:number; //The Time already used this week start Mo-So
  private timeSettingsJsonURL = '../src/app/config/timeSettings.json';
  private navigatorVisible: boolean;//Sets the Navigator Visibility
  private userDataThisWeek: any;

  private hoursPerDay: number;
  private leftHours: number;
  private hoursPerWeek: number;
  private notificationsOn: boolean;
  private lockPCOn: boolean;

  constructor(private loadFileDataService : LoadFileDataService,
    private writeFileDataService: WriteFileDataService,
    private measureRunTimeService : MeasureRunTimeService,
    private notificationService: NotificationService) {
      this.navigatorVisible = false;
    }

    setLeftHours(hours: number){
      this.leftHours = hours;
    }

    setHoursPerDay(hours: number){
      this.hoursPerDay = hours;
    }
    setHoursPerWeek(hours: number){
      this.hoursPerWeek = hours;
    }
    setNotifications(on: boolean){
      this.notificationsOn = on;
    }
    setLockPC(on: boolean){
      this.notificationsOn = on;
    }

    getLeftHours(){
      return this.leftHours;
    }
    getHoursPerDay(){
      return this.hoursPerDay;
    }
    getHoursPerWeek(){
        return this.hoursPerWeek;
    }
    getNotifications(){
        return this.notificationsOn;
    }
    getLockPC(){
        return this.lockPCOn;
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
        this.timeLeftDay = this.hoursPerDay - this.time;
      }
      if(this.timeLeftWeek <= 0){
        this.timeLeftWeek = 0;
      }else{
        this.timeLeftWeek = this.hoursPerWeek - this.time;
      }
      if(this.time >= this.hoursPerDay)
      {
        //this.notificationService.showTimeIsUpNotification();
      }
    } );
  }

  setTimeSettings(timeSettings)
  {
    this.timeSettings.next(timeSettings);

  }
  getTimeSettings()
  {
    return this.timeSettings.asObservable();
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
  for(var i = 0; i < 7; i++){
    if(i < curDay){
      days.push({
        "dayMaxTime": this.userDataThisWeek,
        "dayLeftTime": -10
      });
    }
    if(i > curDay){
      days.push({
        "dayMaxTime": this.timeSettings.getValue().hoursPerDay,
        "dayLeftTime": this.timeSettings.getValue().hoursPerDay
      });
    }
    if(i == curDay){
      days.push({
        "dayMaxTime": this.timeSettings.getValue().hoursPerDay,
        "dayLeftTime": this.timeLeftDay
      });

    }
    //days.push();
  }
 return days;
}

}
