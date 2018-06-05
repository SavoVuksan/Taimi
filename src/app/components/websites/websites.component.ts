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

    this.websiteService.websites.push(new Website( 'www.youtube.com', true));
    this.websiteService.websites.push(new Website('www.twitter.com', false));
    this.websiteService.websites.push(new Website( 'www.facebook.com', true));
  }

  addToList(){
    let website = new Website(this.addWebsite, false);
    console.log(website);
    this.websiteService.websites.push(website);
    this.websiteService.websiteId++;
  }

  ngOnInit() {
  }

}
