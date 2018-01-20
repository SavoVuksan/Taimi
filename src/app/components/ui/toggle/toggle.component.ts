import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import {trigger,state,style,animate,transition} from '@angular/animations';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-toggle',
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleComponent),
    multi: true
  }],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  animations: [
    trigger('toggleBase', [
      state('0',style({
        backgroundColor: 'rgba(40, 203, 194,0)',
        border: '2px solid rgb(218, 218, 218)'
      })),
      state('1',style({
        backgroundColor: 'rgb(40, 203, 194)',
        border: '0px solid rgb(218, 218, 218)',

      })),
      transition('* => *',animate('150ms ease-in'))
    ]),

    trigger('toggleBall',[
      state('0',style({
        left: '3px',
        backgroundColor: 'rgb(218, 218, 218)',
        width: '18px',
        height: '18px'
      })),
      state('1',style({
        right: '3px',
        backgroundColor: 'rgb(255, 255, 255)'
      })),
      transition('* => *', animate('50ms ease-in'))
    ]),
    trigger('toggleTextBox',[
      state('0',style({
        border: '1.7px solid rgb(218, 218, 218)'
      })),
      state('1',style({
        border: '1.7px solid rgb(40, 203, 194)'
      })),
      transition('* => *', animate('50ms ease-in'))
    ]),
    trigger('toggleText',[
      state('0',style({
        color: 'rgb(212, 208, 208)'
      })),
      state('1',style({
        color: 'rgb(40, 203, 194)'
      })),
      transition('* => *', animate('50ms ease-in'))
    ])

  ]
})
export class ToggleComponent implements ControlValueAccessor {

  //The On/OFF Variable of the Toggle
  @Input() toggle:boolean;
  private toggleText:string;
  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit()
  {
    this.updateToggleText();
  }

  writeValue(value: any){
  }
  registerOnChange(fn){
    this.propagateChange = fn;
  }
  registerOnTouched(){}

  toggleChange(){
    this.toggle = !this.toggle;
    this.updateToggleText();
    this.propagateChange(this.toggle);
  }
  updateToggleText(){
    if(this.toggle)
    {
      this.toggleText = "ON";
    }else
    {
      this.toggleText = "OFF";
    }
  }
}
