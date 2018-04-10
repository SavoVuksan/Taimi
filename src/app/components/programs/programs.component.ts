import { Component, OnInit } from '@angular/core';
import { Program } from '../../interfaces/program';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  list: Program[];
  constructor() { }

  ngOnInit() {
    this.fillListWithTestData();
  }

  fillListWithTestData(){

    this.list = new Array<Program>();

    this.list.push({
      "name": "Atom",
      "path" : "./",
      "running": false,
      "runTime": 1,
      "day": undefined,
      "blocked": false,
      "tracking": false
    });
    this.list.push({
      "name": "Chrome",
      "path" : "./",
      "running": false,
      "runTime": 1,
      "day": undefined,
      "blocked": false,
      "tracking": false
    });
    this.list.push({
      "name": "Unity",
      "path" : "./",
      "running": false,
      "runTime": 1,
      "day": undefined,
      "blocked": false,
      "tracking": false
    });
    this.list.push({
      "name": "Spotify",
      "path" : "./",
      "running": false,
      "runTime": 1,
      "day": undefined,
      "blocked": false,
      "tracking": false
    });

  }

}
