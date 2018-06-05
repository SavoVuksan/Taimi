import { Component, OnInit, Input } from '@angular/core';
import { Program } from '../../interfaces/program';
import {DatabaseService} from '../../services/database.service';
import {ProgramService} from '../../services/program.service';
import {Website} from '../../classes/website';
import {WebsiteService} from '../../services/website.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input()
  propeties: string[];
  @Input()
  listElements: any[];
  selectedElement: any;
  @Input()
  service: any;
  constructor() { }

  ngOnInit() {

  }
  deleteListElement(element: any){
    if (this.service instanceof ProgramService) {
      (this.service as ProgramService).deleteProgram(element);
    }else{
      (this.service as WebsiteService).deleteWebsite(element);
    }


  }
  programChanged(program: Program){
    console.log(program);
    (this.service as ProgramService).updateProgram(program);
  }
  websiteChanged(website: Website){
    (this.service as WebsiteService).updateWebsite(website);
  }

  setSelected(element: any){
    this.selectedElement = element;
  }
  addListElement(element: any){
    this.listElements.push(element);
  }

  isProgram(element: any): element is Program[]{
    console.log(('Program' in element) !== undefined);
    return ('Program' in element) !== undefined;
  }
  isWebsite(element: any){
    if (element instanceof Array){
      if (element.length > 0){
        return (element[0] instanceof Website);
      }
    }

  }
}
