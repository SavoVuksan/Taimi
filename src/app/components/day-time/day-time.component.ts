import { Component, OnInit, Input } from '@angular/core';
import { SharedVariablesService } from '../../services/shared-variables.service';

const process = require('child_process');

@Component({
  selector: 'app-day-time',
  templateUrl: './day-time.component.html',
  styleUrls: ['./day-time.component.scss']
})
export class DayTimeComponent implements OnInit {

  @Input() type: string;
  flag: boolean;
  startFlag: boolean;
  constructor(private sharedVars: SharedVariablesService) {
    this.flag = false;
    this.startFlag = false;
  }

  ngOnInit() {


  }
  getLeftTimeProgress() {
    let maxTime;
    let restTime;

    if (this.type == "Day") {
      maxTime = this.sharedVars.getTodayTimeMax();
      restTime = this.sharedVars.getTodayTimeLeft();

    } else {
      maxTime = this.sharedVars.getWeekTimeMax();
      restTime = this.sharedVars.getWeekTimeLeft();
    }
    let wastedTime = maxTime - restTime;
    let perCent = maxTime / 100;
    if(!this.startFlag) {
      setTimeout(() => {
        if ((this.sharedVars.getTodayTimeLeft()) <= 0.008) {
          if (!this.flag) {

            console.log('pen');
            process.exec('rundll32.exe user32.dll. LockWorkStation');
            this.flag = true;
          }
        }
        this.startFlag = true;
      }, 3000);
    }else{
      if ((this.sharedVars.getTodayTimeLeft()) <= 0.008) {
        if (!this.flag) {

          console.log('pen');
          process.exec('rundll32.exe user32.dll. LockWorkStation');
          this.flag = true;
        }
      }
    }

    return wastedTime / perCent;
  }
  getLeftTime() {
    if (this.type == "Day") {
      return Math.round(this.sharedVars.getTodayTimeLeft());
    } else {
      return Math.round(this.sharedVars.getWeekTimeLeft());
    }
  }

}
