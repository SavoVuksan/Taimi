import { Component, OnInit,Input, forwardRef, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {trigger,state,style,animate,transition} from '@angular/animations';


@Component({
  selector: 'app-slider',
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
  }],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('sliderThumb', [
      state('0',style({
        width: '19px',
        height: '19px'
      })),
      state('1',style({
        width: '25px',
        height: '25px'
      })),
      transition('* => *',animate('100ms ease-in'))
    ])]
})
export class SliderComponent implements ControlValueAccessor {

  @Input() sliderMin:number; //the min value of the slider
  @Input() sliderMax:number; //the max value of the slider
  @Input() sliderValue:number; //Output of the value of the slider
  public sliderFillWidth:number; //SliderFill width
  private sliderIsChanging:boolean;
  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
    //TODO change this to change event and not to update every 10 milliseconds
    this.sliderIsChanging = false;
    let timer = Observable.timer(0,10);
    timer.subscribe(t =>{
      this.upateSlider();
    });

  }

  sliderChange()
  {
    this.sliderIsChanging = true;
    this.propagateChange(this.sliderValue);
  }
  writeValue(value: any){
    if(value != undefined)
    this.sliderValue = value;
  }
  registerOnChange(fn){
    this.propagateChange = fn;
  }
  registerOnTouched(){}

  upateSlider()
  {
    this.sliderFillWidth = (this.sliderValue - this.sliderMin) /
    (this.sliderMax - this.sliderMin) * 100;


  }

}
