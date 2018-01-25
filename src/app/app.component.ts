import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariablesService} from './services/shared-variables.service';
import { NotificationService} from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private sharedVariables : SharedVariablesService,
    private notificationService:NotificationService) {

    translate.setDefaultLang('en');

    this.sharedVariables.loadtimeSettings();
    this.sharedVariables.setTimeUsedThisWeek(0);
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
