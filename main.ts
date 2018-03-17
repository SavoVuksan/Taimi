import { app, BrowserWindow, screen,Menu,Tray } from 'electron';
import * as path from 'path';



let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
let fs = require("fs");
let icpMain = require("electron").ipcMain;
var appIcon;
var iconpath = "src/assets/images/logo.png";
if (serve) {
  require('electron-reload')(__dirname, {
  });
}




function createWindow() {


  const electronScreen = screen;
  //const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 775 ,
    height: 750 ,
    icon:'./src/assets/images/logo.png'
  });
  //win.setMenu(null)
  // and load the index.html of the app.
  win.loadURL('file://' + __dirname + '/index.html');

  appIcon = new Tray(iconpath);
  var contextMenu = Menu.buildFromTemplate([
    {label: 'Show App', click: function(){
      win.show();
    }},
    {
      label: 'Quit',click: function(){
        app.exit(0);
      }
  }
  ]);
  appIcon.setContextMenu(contextMenu);
  appIcon.on('click',function(){

    win.show();
  });
  // Open the DevTools.
  if (serve) {
    //win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('show',function(){
  appIcon.setHighlightMode('always');
})
  win.on('close', (event) => {
  event.preventDefault();
  win.hide();

  return false;
  });

}


try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
