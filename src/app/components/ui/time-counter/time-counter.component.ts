import { Component, OnInit,Input } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-time-counter',
  templateUrl: './time-counter.component.html',
  styleUrls: ['./time-counter.component.scss']
})
export class TimeCounterComponent implements OnInit {

  @Input() counterName:string;
  @Input() currentValue:number;
  @Input() maxValue:number;

  public fillWidth:number;

  constructor() { }

  ngOnInit() {

    var timer = Observable.timer(0,100);
    timer.subscribe(t => {
      this.updateCounter();
    });


  }

  updateCounter()
  {
    this.fillWidth = this.currentValue /
    (this.maxValue - this.currentValue) * 100;
    
  }

}
