import { Injectable } from '@angular/core';
import { SharedVariablesService } from './shared-variables.service';
import { Observable } from 'rxjs/Rx';
let mysql = require('mysql');
let connection;

@Injectable()
export class DatabaseService {

  currentDate;
  day;
  diff;
  weekStartDate;
  weekEndDate;
  today;

  currentWeekExists : boolean;
  todayExists: boolean;

  constructor(private sharedVariables : SharedVariablesService) {
    //INIT VARS
    this.today = new Date();
    this.currentDate = new Date();
    this.day = this.currentDate.getDay();
    this.diff = this.currentDate.getDate() - this.day +(this.day == 0 ? -6:1);
    this.weekStartDate = new Date(this.currentDate.setDate(this.diff));
    this.weekEndDate = new Date();
    this.weekEndDate.setDate(this.weekStartDate.getDate() + 6);

    //When sunday set the day from 0 to 7
    this.day = (this.day == 0 ? 7:this.day);

    this.currentWeekExists = false;
    this.todayExists = false;

    //CREATE CONNECTION OBJECT WITH INFORMATIONS
    connection = mysql.createConnection({
      host: 'localhost',
      path: '/taimidb',
      user: 'taimi',
      password: 'app',

    });

    //CONNECT TO DATABASE
    connection.connect(function(err){
      if(err !== null){
        console.log("ERROR WHILE CONNECTING TO DATABASE");
        console.log(err);
      }else{
        console.log("CONNECTED SUCSESSFULLY TO DATABASE");

      }
    });
    //USE THE RIGHT DATABASE
    connection.query("use taimidb",function(err,rows,fields){});

  }

  existsToday(): Observable<boolean>{
    return new Observable((observer) =>{
      let query = "select date from day where date = '"+
      this.today.toISOString().split('T')[0]+"'";
      console.log(query);
      connection.query(query,(err,rows,fields) =>{

          if(rows.length < 1){
            observer.next(false);
          }else{
            observer.next(true);
          }
          observer.complete();
      });
    });

  }

  loadToday(){
    let query  = "select * from day where date = '"+this.today.toISOString().split('T')[0]+"'";
    connection.query(query,(err,rows,fields) =>{
      if(rows.length > 0 ){

        this.sharedVariables.setHoursPerDay(rows[0].leftTime);
      }
    });
  }

  persistToday(){
    let query = "";
    console.log("TodayExists: " + this.todayExists);
    if(this.todayExists){
      query = "update day set leftTime = "+this.sharedVariables.getHoursPerDay()+
      " where date = '" + this.today.toISOString().split('T')[0]+"'";

      connection.query(query,(err,rows,fields) =>{

      });
    }else{
      query = "insert into day (maxTime,leftTime,Date) values("
      +this.sharedVariables.getHoursPerDay()+","+this.sharedVariables.getTimeLeftDay()+",'"+this.today.toISOString().split('T')[0]+"')";
      console.log(query);
      connection.query(query,(err,rows,fields) =>{

      });
    }

  }

  getSettings(){
    let query = "select * from settings";

    connection.query(query,(err,rows,fields) => {
      this.sharedVariables.setHoursPerDay(rows[0].hoursperday);
      this.sharedVariables.setHoursPerWeek(rows[0].hoursperweek);
      this.sharedVariables.setNotifications((rows[0].notificationson == 0 ? false:true));
      this.sharedVariables.setLockPC((rows[0].lockpcon == 0 ? false:true));
      this.sharedVariables.timeLeftDay = rows[0].hoursPerDay;
      console.log(this.sharedVariables.timeLeftDay);

    });
  }

}
