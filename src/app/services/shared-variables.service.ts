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
  private timeUsedThisWeek:number; //The Time already used this week start Mo-So
  private timeSettingsJsonURL = '../src/app/config/timeSettings.json';
  private navigatorVisible: boolean;//Sets the Navigator Visibility

  constructor(private loadFileDataService : LoadFileDataService,
    private writeFileDataService: WriteFileDataService,
    private measureRunTimeService : MeasureRunTimeService,
    private notificationService: NotificationService) { }


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
      this.timeSettings,'./src/app/config/timeSettings.json');
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
  setTimeUsedThisWeek(timeUsedThisWeek)
  {
    this.timeUsedThisWeek = timeUsedThisWeek;
  }
  getTimeUsedThisWeek()
  {
    return this.timeUsedThisWeek;
  }


}
