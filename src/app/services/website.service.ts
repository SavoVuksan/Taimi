import { Injectable } from '@angular/core';
import {DatabaseService} from './database.service';
import {Website} from '../classes/website';

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
  }
  deleteWebsite(website: Website){
    this.database.deleteWebsite(website);
    const index = this.websites.indexOf(website,0);
    this.websites.splice(index,1);
  }
  loadWebsites(){
    this.database.loadWebsites(this.websites);
  }

}
