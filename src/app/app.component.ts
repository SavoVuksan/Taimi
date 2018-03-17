import { Component, AfterViewInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariablesService} from './services/shared-variables.service';
import { NotificationService} from './services/notification.service';
import { WriteFileDataService } from "./services/write-file-data.service";
import { DatabaseService } from './services/database.service';
import {Observable} from 'rxjs/Rx';

//Electron functions
let remote = require('electron').remote;
let app = remote.app;
const ipcrenderer = require('electron').ipcRenderer;
let BrowserWindow = remote.BrowserWindow;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{

  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private sharedVariables : SharedVariablesService,
    private notificationService:NotificationService,
    private writeToFile: WriteFileDataService,
    private database: DatabaseService) {
    translate.setDefaultLang('en');
    //this.notificationService.showSmallNotification("Notification",
    //"All kitties are saved now, well not all but all kitties in your local area. Next step ist to save the puppies.");
    //this.sharedVariables.loadtimeSettings();
    //this.sharedVariables.setTimeLeftWeek(0);

    /*
    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }*/
    this.database.getSettings();
    this.sharedVariables.meausureTime();
    this.database.existsToday().subscribe((returnvalue) =>{
      this.database.todayExists = returnvalue;
    this.database.persistToday();
    });
    this.database.loadToday();


  }


}
