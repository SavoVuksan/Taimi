import { Injectable } from '@angular/core';

let remote = require('electron').remote;
let BrowserWindow = remote.BrowserWindow;
let url = require('url');
let path = require('path');


@Injectable()
export class NotificationService {

  private showTimIsUpWindowOn = false;
  private showLittleNotification = false;

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

  showSmallNotification(notificationHeader: String,notificationMessage: String)
  {
    let win;
    let winWidth = 400;
    let winHeight = 170;

if(!this.showLittleNotification){
    console.log("show Little Notification");

    win = new BrowserWindow({width:winWidth,height:winHeight,transparent:true,
    frame:false,show:false,resizable:true,alwaysOnTop:true});
    win.loadURL(url.format({
      pathname: '/src/assets/notificationWindows/smallNotificationScreen/smallNotificationWindow.html',
      protocol: 'file:',
      slashes: true
    }));

    win.once('ready-to-show', () => {
      win.show();
      win.setPosition(screen.width -winWidth,screen.height-winHeight);

      win.webContents.send("notificationData",notificationHeader,notificationMessage);
    });
    this.showLittleNotification = true;
  }
}

}
