import { Component, OnInit, Input } from '@angular/core';
import { SharedVariablesService } from '../../services/shared-variables.service';


@Component({
  selector: 'app-day-time',
  templateUrl: './day-time.component.html',
  styleUrls: ['./day-time.component.scss']
})
export class DayTimeComponent implements OnInit {

  @Input() type: string;

  constructor(private sharedVars: SharedVariablesService) {
  }

  ngOnInit() {


  }
  getLeftTimeProgress() {
    let maxTime;
    let restTime;
    if (this.type == "Day") {
      maxTime = this.sharedVars.getTimeSettings().hoursPerDay;
      restTime = this.sharedVars.getTimeLeftDay();

    } else {
      maxTime = this.sharedVars.getTimeSettings().hoursPerWeek;
      restTime = this.sharedVars.getTimeLeftWeek();
    }
    let wastedTime = maxTime - restTime;
    let perCent = maxTime / 100;
    return wastedTime / perCent;
  }
  getLeftTime() {
    if (this.type == "Day") {
      return Math.round(this.sharedVars.getTimeLeftDay());
    } else {
      return Math.round(this.sharedVars.getTimeLeftWeek());
    }
  }

}
