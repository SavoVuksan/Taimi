import { Injectable } from '@angular/core';
import {DatabaseService} from './database.service';
import {Website} from '../classes/website';

@Injectable()
export class WebsiteService {

  websites: Website[];
  websiteId: number;

  constructor(private database: DatabaseService) {
    this.websites = new Array<Website>();
    this.websiteId = 1;
    this.getMaxWebID(this.websiteId);
  }


  updateWebsite(website: Website){
    this.database.updateWebsite(website);
  }
  deleteWebsite(website: Website){
    this.database.deleteWebsite(website);
    const index = this.websites.indexOf(website,0);
    this.websites.splice(index,1);
  }
  getMaxWebID(webID: number){
    this.database.getMaxWebID(webID);
  }
}
