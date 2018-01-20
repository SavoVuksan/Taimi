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
  public readonly MinHoursPerDay = 0;
  public readonly MaxHoursPerDay = 24;
  public readonly MinHoursPerWeek = 0;
  public readonly MaxHoursPerWeek = 36;

  constructor(private _http : Http,
    private _loadFileDataService : LoadFileDataService,
    private _writeFileDataService : WriteFileDataService) { }

  ngOnInit()
  {
    this.loadSettings();
  }

  loadSettings(){
    this.settings = {};
    this._loadFileDataService.getFileData(this.settingsJsonURL)
      .subscribe(data => {
        this.settings = data;
        console.log(this.settings);
      });
  }

writeSettings()
{
  this._writeFileDataService.writeToFile(this.settings,'./src/app/config/settings.json');
}


}
