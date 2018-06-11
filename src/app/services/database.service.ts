import { Injectable } from '@angular/core';
import { SharedVariablesService } from './shared-variables.service';
import { Observable } from 'rxjs/Rx';
import {Program} from '../interfaces/program';
import {Website} from '../classes/website';

const mysql = require('mysql');
let connection;

@Injectable()
export class DatabaseService {

  constructor(private sharedVariables: SharedVariablesService) {
      // CREATE CONNECTION OBJECT WITH INFORMATIONS
    connection = mysql.createConnection({
      host: 'localhost',
      path: '/taimidb',
      user: 'taimi',
      password: 'app',

    });

    // CONNECT TO DATABASE
    connection.connect(function(err){
      if ( err !== null) {
        console.log('ERROR WHILE CONNECTING TO DATABASE');
        console.log(err);
      }else {
        console.log('CONNECTED SUCSESSFULLY TO DATABASE');

      }
    });
    // USE THE RIGHT DATABASE
    connection.query('use taimidb', function (err, rows, fields){});

  }

  observeExistsTodayInDB(): Observable<boolean>{
    return new Observable((observer) => {
      const query = 'select date from day where Date = \'' +
      this.sharedVariables.getToday().toISOString().split('T')[0] + '\'';

      connection.query(query, (err, rows, fields) => {

          if (rows.length < 1){
            observer.next(false);
          }else{
            observer.next(true);
          }
          observer.complete();
      });
    });

  }

  persistProgram(program: Program ){
    const query = 'insert into program (name, path, blocked, tracking) values (\'' +
      program.name + '\',\'' + program.path + '\',' + program.blocked + ',' + program.tracking + ')';

    connection.query(query, (err, fields, rows) => {

    });
  }

  updateProgram(program: Program){
    const query = 'update program set name = \'' + program.name + '\' , path = \'' + program.path + '\' , blocked = ' + program.blocked +
      ' , tracking = ' + program.tracking + ' where name = \'' + program.name + '\' ' ;

    connection.query(query, (err, rows, fields) => {

    });
  }

  deleteProgram(program: Program){
    let query = `select programid from program where path = '${program.path}'`;
    let programid;
    connection.query(query, (err, rows, fields) => {
      programid = rows[0].programid;
      query = `delete from program where path = '${program.path}'`;
      connection.query(query, (err, fields) => {

      });
    });

  }

  updateWebsite(website: Website){
    let query = `update blockedwebsite set domainname = '${website.name}' ,
     active = ${(website.blocked === true ? 1 : 0)} where domainname = '${website.name}'`;
    connection.query(query, (err, rows, fields) => {

    });

  }
  deleteWebsite(website: Website){
      let query = `delete from blockedwebsite where domainname = '${website.name}' `;

    connection.query(query, (err, fields) => {

    });
  }

  addWebsite(website: Website){
    let query = `insert into blockedwebsite (domainname, active) values ('${website.name}',${(website.blocked === true ? 1 : 0)})`;

    connection.query(query, (err, rows, fields) =>{

    });
  }

  loadWebsites(websites: Website[]){
    let query = `select domainname , active from blockedwebsite`;

    connection.query(query, (err, rows, fields) => {
      if(rows.length > 0 ){
        for(let w of rows){
          let website = new Website(w.domainname,(w.active === 1 ? true : false));
          websites.push(website);
        }
      }
    });
  }

  addRunningProgram(program: Program){
    let dayid, programid, runningid;
    let today = new Date();
    let startTime;
    let query = `select dayid from day where date = '${today.toISOString().split('T')[0]}'`;

    // Get the ID of the Day
    connection.query(query, (err, rows, fields) => {
      dayid = rows[0].dayid;
      query = `select programid from program where path = '${program.path}'`;

      // Get the ID of the Program
      connection.query(query, (err, rows, fields) => {
        programid = rows[0].programid;

        // The starttime is calculated in Seconds from day start
        startTime = program.day.getMilliseconds() / 1000
          + program.day.getSeconds()
          + program.day.getMinutes() * 60
          + program.day.getHours() * 60 * 60;

        // Conditional insert or update
        query = `select runningid from running where dayid = ${dayid} and programid = ${programid}`;

        connection.query(query, (err, rows, fields) => {
          if(rows.length === 0){
            // Running record doesnt exist so we make an insert
            query = `insert into  running (dayid,programid,runtime,starttime) values (${dayid},${programid},${program.runTime},${startTime})`;

            connection.query(query, (err, rows, fields) => {});
          }else{
            runningid = rows[0].runningid;
            // Running record exists so we need to update it
            query = `update running set runtime = ${program.runTime} , starttime = ${startTime} where runningid = ${runningid}`;

            connection.query(query, (err, rows, fields) => {});

          }
        });

      });
    });
  }



  loadPrograms(programs: Program[]){
    const query = `select * from program`;
    connection.query(query,(err, rows, fields) => {

      if(rows.length > 0){
        for(let p of rows){
        let name = p.name;
        let path = this.addBackslashes(p.path);
        let blocked = (p.blocked === 0 ? false : true);
        let tracking = (p.tracking === 0 ? false : true);
        let program = {
          'name': name,
          'path': path,
          'blocked': blocked,
          'tracking': tracking,
          'running': false,
          'runTime': 0,
          'day': new Date()
        };
        programs.push(program);

        }
      }
      return programs;
    });
  }

  loadToday(){
    const query  = 'select * from day where date = \'' + this.sharedVariables.getToday().toISOString().split('T')[0] + '\'';
    connection.query(query, (err, rows, fields) => {
      if (rows.length > 0 ){

        this.sharedVariables.setTodayTimeLeft(rows[0].leftTime);


      }
      this.sharedVariables.setWeekTimeLeft(
        ((7 - (this.sharedVariables.getDayOfTheWeek() - 1)) * this.sharedVariables.getTodayTimeMax()) -
      (this.sharedVariables.getTodayTimeMax() - this.sharedVariables.getTodayTimeLeft()));
    });
  }

  persistToday(){
    let query = '';

    if (this.sharedVariables.getExistsTodayInDB()){
      query = 'update day set leftTime = ' + this.sharedVariables.getTodayTimeLeft() +
      ' where date = \'' + this.sharedVariables.getToday().toISOString().split('T')[0] + '\'';

      connection.query(query, (err, rows, fields) => {

      });
    }else{
      query = 'insert into day (maxTime,leftTime,Date) values('
      + this.sharedVariables.getTodayTimeMax() + ','
      + this.sharedVariables.getTodayTimeLeft() + ',\''
      + this.sharedVariables.getToday().toISOString().split('T')[0] + '\')';
      connection.query(query, (err, rows, fields) => {

      });
    }

  }

  persistUserSettings(){
    const query = 'update settings set hoursperday = ' +
    this.sharedVariables.getTodayTimeMax() + ', notificationsOn = ' +
    (this.sharedVariables.getNotificationOn() === true ? 1 : 0) + ' where settingsID = 0';
    connection.query(query, (err, rows, fields) => {

    });
  }

  loadUserSettings(){
    const query = 'select * from settings';

    connection.query(query, (err, rows, fields) => {
      this.sharedVariables.setTodayTimeMax(rows[0].hoursperday);
      this.sharedVariables.setWeekTimeMax(this.sharedVariables.getTodayTimeMax() * 7);
      this.sharedVariables.setNotificationOn((rows[0].notificationson === 0 ? false : true));
      this.sharedVariables.setTodayTimeLeft(this.sharedVariables.getTodayTimeMax());

    });
  }

  // Adds to every backslash an extra one as escape Character
  addBackslashes(s: string){
    const reqExpr = /\\/g;
    return s.replace(reqExpr, '\\\\');
  }

}
