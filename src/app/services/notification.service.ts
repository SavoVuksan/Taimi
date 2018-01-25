import { Injectable } from '@angular/core';

let remote = require('electron').remote;
let BrowserWindow = remote.BrowserWindow;
let url = require('url');
let path = require('path');


@Injectable()
export class NotificationService {

  private showTimIsUpWindowOn = false;

  constructor() { }


  showTimeIsUpNotification()
  {
    let win;

    if(!this.showTimIsUpWindowOn)
    {
      console.log("show");

      win = new BrowserWindow({width:700, height:500, transparent:true,
        frame:false, show:false, resizable: false, alwaysOnTop: true});
      win.loadURL(url.format({
        pathname: '/src/assets/notificationWindows/notificationScreen/notificationWindow.html',
        protocol: 'file:',
        slashes: true
      }))
      win.maximize();
      win.once('ready-to-show', () => {
        win.show();
        win.focus();
      })
      this.showTimIsUpWindowOn = true;

    }

  }

}
