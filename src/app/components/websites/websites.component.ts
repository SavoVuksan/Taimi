import { Component, OnInit } from '@angular/core';
import {Website} from '../../classes/website';
import {WebsiteService} from '../../services/website.service';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
})
export class WebsitesComponent implements OnInit {

  addWebsite: string;

  constructor(public websiteService: WebsiteService) {

  }

  addToList(){

    const website = new Website(this.addWebsite, false);
    let websiteInList = false;
    for (const w of this.websiteService.websites){
      if (website.name === w.name){
        websiteInList = true;
      }
    }
    if (!websiteInList) {
      this.websiteService.addWebsite(website);
    }

    this.addWebsite = '';
  }

  ngOnInit() {
  }

}
