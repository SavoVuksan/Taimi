import { Component, OnInit, Output, Input, Inject } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Settings} from '../../interfaces/settings';
import {SharedVariablesService} from '../../services/shared-variables.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  //TODO loadFileData service einbinden und nutzen

  //timeSettings constants
  public MinHoursPerDay = 1;
  public MaxHoursPerDay = 24;
  public MinHoursPerWeek = 1;
  public MaxHoursPerWeek = 48;
  public navigatorOn:boolean;

  constructor(private sharedVariables : SharedVariablesService) { }

  ngOnInit()
  {
    this.sharedVariables.loadtimeSettings();
    this.navigatorOn = false;
  }

toggleNavigator()
{
  this.navigatorOn = !this.navigatorOn;
}

}
