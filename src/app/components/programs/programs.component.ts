import { Component, OnInit } from '@angular/core';
import { Program } from '../../interfaces/program';
import {ProgramService} from '../../services/program.service';


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {


  toggleBlockAll: boolean;
  toggleTrackAll: boolean;

  constructor(public programService: ProgramService ) {
    this.toggleBlockAll = false;
    this.toggleTrackAll = false;

  }

  ngOnInit() {

    this.programService.executeTasklist();
  }

}
