import { Component, OnInit, Output, Input, Inject } from '@angular/core';
import {Http, Response} from '@angular/http';
import {LoadFileDataService} from '../../services/load-file-data.service';
import {WriteFileDataService} from '../../services/write-file-data.service';
import {Settings} from '../../interfaces/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [LoadFileDataService, WriteFileDataService]
})
export class SettingsComponent implements OnInit {

  //TODO loadFileData service einbinden und nutzen
  private settingsJsonURL = '../src/app/config/settings.json';
  public settings:any;

  //Settings constants
  public MinHoursPerDay = 1;
  public MaxHoursPerDay = 12;
  public MinHoursPerWeek = 1;
  public MaxHoursPerWeek = 42;
  public navigatorOn:boolean;

  constructor(private _http : Http,
    private _loadFileDataService : LoadFileDataService,
    private _writeFileDataService : WriteFileDataService) { }

  ngOnInit()
  {
    this.loadSettings();
    this.navigatorOn = false;
  }

  loadSettings(){
    this.settings = {};
    this._loadFileDataService.getFileData(this.settingsJsonURL)
      .subscribe(data => {
        this.settings = data;
        //this.MinHoursPerWeek = this.settings.hoursPerDay *7;
      });
  }

writeSettings()
{
  this._writeFileDataService.writeToFile(this.settings,'./src/app/config/settings.json');
}

toggleNavigator()
{
  this.navigatorOn = !this.navigatorOn;
}

}
