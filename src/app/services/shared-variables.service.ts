import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SharedVariablesService {

  //CONST
  public deltaTime:number  = 100;

  //USER SETTINGS
  private todayTimeMax:number;
  private todayTimeLeft:number;
  private weekTimeMax:number;
  private weekTimeLeft:number;
  private notificationOn:boolean;


  //PROGRAM VARS
  private today:Date;
  private weekStartDate:Date;
  private dayOfTheWeek:number;
  private existsTodayInDB:boolean;
  private runTime:number;
  private navigatorVisible:boolean;


  constructor() {
    //INIT USERSETTINGS
    this.todayTimeMax = 0;
    this.todayTimeLeft = 0;
    this.weekTimeMax = 0;
    this.weekTimeLeft = 0;
    this.notificationOn = false;


    //INIT PROGRAM VARS
    this.today = new Date();
    this.weekStartDate =new Date(new Date().setDate(this.today.getDate() - this.today.getDay() + (this.today.getDay() == 0 ? -6:1)));
    this.dayOfTheWeek = (this.today.getDay() == 0 ? 7 : this.today.getDay());
    this.existsTodayInDB = false;
    this.runTime = 0;
    this.navigatorVisible = false;



    }

    valueObservable():Observable<string>{
      return new Observable((observer) =>{
        setInterval(() =>{
          observer.next("TodayMax: " + this.todayTimeMax+" TodayLeft: "+ this.todayTimeLeft+" WeekMax: " + this.weekTimeMax+" WeekLeft: " +
          this.weekTimeLeft + " NotificationOn: " + this.notificationOn + " WeekStartDate: "
          + this.weekStartDate + " DayOfTheWeek: " + this.dayOfTheWeek);
          console.log(this.todayTimeLeft);
        },100);

      });
    }

    getNavigatorVisible(){
      return this.navigatorVisible;
    }
    setNavigatorVisible(visible: boolean){
      this.navigatorVisible = visible;
    }

    getDayOfTheWeek(){
      return this.dayOfTheWeek;
    }
    setDayOfTheWeek(dotw:number){
      this.dayOfTheWeek = dotw;
    }
    getWeekStartDate(){
      return this.weekStartDate;
    }
    setWeekStartDate(date: Date){
      this.weekStartDate = date;
    }

    getRunTime(){
      return this.runTime;
    }
    setRunTime(time:number){
      this.runTime = time;
    }

    getExistsTodayInDB(){
      return this.existsTodayInDB;
    }
    setExistsTodayInDB(exists:boolean){
      this.existsTodayInDB = exists;
    }

    getToday(){
      return this.today;
    }
    setToday(date:Date){
      this.today = date;
    }

    getTodayTimeMax(){
      return this.todayTimeMax;
    }
    getTodayTimeLeft(){
      return this.todayTimeLeft;
    }
    getWeekTimeMax(){
      return this.weekTimeMax;
    }
    getWeekTimeLeft(){
      return this.weekTimeLeft;
    }
    getNotificationOn(){
      return this.notificationOn;
    }


    setTodayTimeMax(hours:number){
      this.todayTimeMax = hours;
    }
    setTodayTimeLeft(hours:number){
      if(hours > 0){
      this.todayTimeLeft = hours;
    }else{
      this.todayTimeLeft = 0;
    }
    }
    setWeekTimeMax(hours:number){
      this.weekTimeMax = hours;
    }
    setWeekTimeLeft(hours:number){
      if(hours > 0){
      this.weekTimeLeft = hours;
    }else{
      this.weekTimeLeft = 0;
    }
    }
    setNotificationOn(on:boolean){
      this.notificationOn = on;
    }


}
