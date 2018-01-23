import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MeasureRunTimeService } from '../../services/measure-run-time.service';
import {TrackProgramsService} from '../../services/track-programs.service';
import {Observable} from 'rxjs/Rx';
import {SharedVariablesService} from '../../services/shared-variables.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MeasureRunTimeService, TrackProgramsService],
})
export class HomeComponent implements OnInit {

  //TODO make this varible global and save it to a external .ts file with all important variables
  programs : String;

  constructor(private measureRunTimeService: MeasureRunTimeService,
    private trackProgramsService: TrackProgramsService,
    private router : Router,
    public sharedVariables:SharedVariablesService) { }

  ngOnInit() {
    //this.displayTime();
    this.trackProgramsService.programStackJSON
    .subscribe(stack => {
      this.trackProgramsService.programStack = stack;

      let timer = Observable.timer(0,3000);
      timer.subscribe(t =>{
        this.trackProgramsService.listenForPrograms();
      });

    });

    }

  //NOTE Displays the Computer Timer every 100 mil. Seconds


}
