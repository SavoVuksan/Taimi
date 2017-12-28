import { Component, OnInit } from '@angular/core';

import {MeasureRunTimeService } from '../../services/measure-run-time.service';
import {TrackProgramsService} from '../../services/track-programs.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MeasureRunTimeService, TrackProgramsService],
})
export class HomeComponent implements OnInit {

  //TODO make this varible global and save it to a external .ts file with all important variables
  time: number; //NOTE Just the display Output This is the time for how long the Computer is already running
  programs : String;

  constructor(private _measureRunTimeService: MeasureRunTimeService,
    private _trackProgramsService: TrackProgramsService) { }

  ngOnInit() {
    this.displayTime();

    }




  //NOTE Displays the Computer Timer every 100 mil. Seconds
  displayTime(){
    let timer = Observable.timer(0,100);
    timer.subscribe(t =>{
      this.time = +this._measureRunTimeService.measureTime().toFixed(0);
    } );
  }

}
