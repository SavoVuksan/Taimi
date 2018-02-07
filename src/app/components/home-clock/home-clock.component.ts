import { Component, OnInit } from '@angular/core';
import { MeasureRunTimeService } from '../../services/measure-run-time.service';
import { DatePipe } from "@angular/common";
import localeDe from "@angular/common/locales/de";

@Component({
  selector: 'app-home-clock',
  templateUrl: './home-clock.component.html',
  styleUrls: ['./home-clock.component.scss']
})
export class HomeClockComponent implements OnInit {

  constructor(private measureTime:MeasureRunTimeService) { }

  ngOnInit() {
  }

}
