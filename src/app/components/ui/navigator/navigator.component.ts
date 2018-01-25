import { Component, OnInit,Input,forwardRef,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {trigger,state,style,animate,transition} from '@angular/animations';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SharedVariablesService} from '../../../services/shared-variables.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NavigatorComponent),
    multi: true
  }],
  animations: [
    trigger('toggleNavigator', [
      state('0',style({
        left: '-260px'
      })),
      state('1',style({
        left: '0px'

      })),
      transition('* => *',animate('250ms ease-in'))
    ]),
    trigger('toggleBackground', [
      state('0',style({
        backgroundColor: 'rgba(0, 0, 0, 0)',
        pointerEvents: 'none'
      })),
      state('1',style({
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        pointerEvents: 'visible'

      })),
      transition('* => *',animate('200ms ease-in'))
    ])
  ]
})
export class NavigatorComponent implements ControlValueAccessor {

  @Input() navigatorVisible:boolean; //Detremines if the screen is visible or not
  @Input() home:string;
  @Input() statistics:string;
  @Input() lockPrograms:string;
  @Input() lockWebsites:string;
  @Input() settings:string;
  propagateChange = (_: any) => {};

  constructor(private _router: Router,
  public sharedVariables : SharedVariablesService) { }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent)
  {
    if(event.key == "Tab")
    {
      console.log("tabbed");
      if(!this.navigatorVisible)
      {
        this.showNavigator();
      }else
      {
        this.hideNavigator();
      }

    }
  }

  ngOnInit() {}
  writeValue(value: any){}
  registerOnChange(fn){
    this.propagateChange = fn;
  }
  registerOnTouched(){}

  hideNavigator(){
    this.navigatorVisible = false;
    this.propagateChange(this.navigatorVisible);
  }
  showNavigator(){
    this.navigatorVisible = true;
    this.propagateChange(this.navigatorVisible);
  }
  changeScreen(screenURL)
  {
    this._router.navigateByUrl(screenURL);
    this.resetSelected();
    this.hideNavigator();
  }
  resetSelected()
  {
    this.home = '';
    this.statistics = '';
    this.lockPrograms = '';
    this.lockWebsites = '';
    this.settings = '';
  }

}
