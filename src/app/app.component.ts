import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariablesService} from './services/shared-variables.service';
import { NotificationService} from './services/notification.service';
import { WriteFileDataService } from "./services/write-file-data.service";

//Electron functions
let remote = require('electron').remote;
let app = remote.app;
const ipcrenderer = require('electron').ipcRenderer;
let BrowserWindow = remote.BrowserWindow;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private sharedVariables : SharedVariablesService,
    private notificationService:NotificationService,
    private writeToFile: WriteFileDataService) {
      console.log(app.getPath('documents'));

      app.on('before-quit',()=>{
        console.log("beforeQuit");
      });

      let win = BrowserWindow.getAllWindows()[0].on('close',(e) =>{
      this.writeToFile.writeToFile("Wrote this file on close",app.getPath('documents')+'\\Taimi',"close.txt");


      //  win = null;
      });


    translate.setDefaultLang('en');
    //this.notificationService.showSmallNotification("Notification",
    //"All kitties are saved now, well not all but all kitties in your local area. Next step ist to save the puppies.");
    this.sharedVariables.loadtimeSettings();
    //this.sharedVariables.setTimeLeftWeek(0);
    this.sharedVariables.meausureTime();
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
  }
}
