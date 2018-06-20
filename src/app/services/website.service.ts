import { Injectable } from '@angular/core';
import {DatabaseService} from './database.service';
import {Website} from '../classes/website';

const fs = require('fs');
const hostFilePath = 'C:\\Windows\\System32\\drivers\\etc\\hosts';

@Injectable()
export class WebsiteService {

  websites: Website[];


  constructor(private database: DatabaseService) {
    this.websites = new Array<Website>();
    this.loadWebsites();

  }

  addWebsite(website: Website){
    this.websites.push(website);
    this.database.addWebsite(website);
  }

  updateWebsite(website: Website){
    this.database.updateWebsite(website);
    this.updateHostFile();

  }

  updateHostFile(){
    // Get Current state of Host file
    let hostFileContent = fs.readFileSync(hostFilePath,'UTF-8');

    // Backup host file
    fs.exists(hostFilePath+'_backup', (exists) => {
      console.log(`Backup file ${(exists === true ? 'exists' : 'doesnt exist')} `);
      if(!exists){
        fs.writeFileSync(hostFilePath+'_backup',hostFileContent,{encoding: 'UTF-8'});

      }else{
        hostFileContent = fs.readFileSync(hostFilePath+'_backup','UTF-8');
      }
    });

    setTimeout(() => {
      //Get all Websites which have to get redirected
      for(let w of this.websites){
        if(w.blocked){
          hostFileContent += `\n 127.0.0.1 ${w.name}`;
        }
      }
      fs.writeFileSync(hostFilePath,hostFileContent,{encoding: 'UTF-8'});

    },700);

  }

  deleteWebsite(website: Website){
    this.database.deleteWebsite(website);
    const index = this.websites.indexOf(website,0);
    this.websites.splice(index,1);
    this.updateHostFile();

  }
  loadWebsites(){
    this.database.loadWebsites(this.websites);
  }

}
