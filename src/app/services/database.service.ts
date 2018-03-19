import { Injectable } from '@angular/core';
import { SharedVariablesService } from './shared-variables.service';
import { Observable } from 'rxjs/Rx';
let mysql = require('mysql');
let connection;

@Injectable()
export class DatabaseService {

  constructor(private sharedVariables : SharedVariablesService) {
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

  observeExistsTodayInDB(): Observable<boolean>{
    return new Observable((observer) =>{
      let query = "select date from day where Date = '"+
      this.sharedVariables.getToday().toISOString().split('T')[0]+"'";

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
    let query  = "select * from day where date = '"+this.sharedVariables.getToday().toISOString().split('T')[0]+"'";
    connection.query(query,(err,rows,fields) =>{
      if(rows.length > 0 ){

        this.sharedVariables.setTodayTimeLeft(rows[0].leftTime);


      }
      this.sharedVariables.setWeekTimeLeft(
        ((7 - (this.sharedVariables.getDayOfTheWeek()-1))*this.sharedVariables.getTodayTimeMax())-
      (this.sharedVariables.getTodayTimeMax()-this.sharedVariables.getTodayTimeLeft()));
    });
  }

  persistToday(){
    let query = "";

    if(this.sharedVariables.getExistsTodayInDB()){
      query = "update day set leftTime = "+this.sharedVariables.getTodayTimeLeft()+
      " where date = '" + this.sharedVariables.getToday().toISOString().split('T')[0]+"'";

      connection.query(query,(err,rows,fields) =>{

      });
    }else{
      query = "insert into day (maxTime,leftTime,Date) values("
      +this.sharedVariables.getTodayTimeMax()+","
      +this.sharedVariables.getTodayTimeLeft()+",'"
      +this.sharedVariables.getToday().toISOString().split('T')[0]+"')";
      console.log(query);
      connection.query(query,(err,rows,fields) =>{

      });
    }

  }

  persistUserSettings(){
    let query = "update settings set hoursperday = "+
    this.sharedVariables.getTodayTimeMax()+", notificationsOn = "+
    (this.sharedVariables.getNotificationOn() == true ? 1:0)+" where settingsID = 0";
    console.log(query);
    connection.query(query,(err,rows,fields) =>{

    });
  }

  loadUserSettings(){
    let query = "select * from settings";

    connection.query(query,(err,rows,fields) => {
      this.sharedVariables.setTodayTimeMax(rows[0].hoursperday);
      this.sharedVariables.setWeekTimeMax(this.sharedVariables.getTodayTimeMax()*7);
      this.sharedVariables.setNotificationOn((rows[0].notificationson == 0 ? false:true));
      this.sharedVariables.setTodayTimeLeft(this.sharedVariables.getTodayTimeMax());

    });
  }

}
