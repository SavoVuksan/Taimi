import {Component, OnInit, Input, Output, SimpleChange, EventEmitter} from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import {Program} from '../../interfaces/program';
import {DatabaseService} from '../../services/database.service';

@Component({
  selector: 'app-point-toggle',
  templateUrl: './point-toggle.component.html',
  styleUrls: ['./point-toggle.component.scss'],
  animations: [
    trigger('pointTrueToFalse', [
      state('off', style({
        'background-color': 'rgb(218, 218, 218)',
      })),
      state('on', style({
        'background-color':  'rgba(40, 203, 194,1)',
      })),
      transition('off <=> on', animate('100ms ease-in')),
    ])
  ]
})
export class PointToggleComponent implements OnInit {

@Input()
  toggle: boolean;
  @Input()
  program: Program;


@Output()
  toggleChange = new EventEmitter();

  state: string;

  constructor(private database: DatabaseService ) {
    if (this.toggle === undefined){
      this.toggle = false;
      this.state = (this.toggle ? this.state = 'on' : this.state = 'off');
    }
   }

  ngOnInit() {
  }
  ngOnChanges(change: SimpleChange){
    this.toggle = change['toggle'].currentValue;
    this.state = (this.toggle ? this.state = 'on' : this.state = 'off');
  }
  changeToggle(){
    this.toggle = !this.toggle;
    this.state = (this.toggle ? this.state = 'on' : this.state = 'off');
    this.toggleChange.emit(this.toggle);
    this.database.updateProgram(this.program);
  }

}
