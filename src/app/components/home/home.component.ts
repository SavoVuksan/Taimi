import { Component, OnInit } from '@angular/core';
import {MeasureRunTimeService } from '../../services/measure-run-time.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MeasureRunTimeService]
})
export class HomeComponent implements OnInit {

  time: number;

  constructor(private _measureRunTimeService: MeasureRunTimeService) { }

  ngOnInit() {
    let timer = Observable.timer(0,100);
    timer.subscribe(t =>{
      this.time = +this._measureRunTimeService.measureTime().toFixed(0);
    } );

  }







}
