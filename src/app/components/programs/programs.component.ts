import { Component, OnInit } from '@angular/core';
import { Program } from '../../interfaces/program';
import {ProgramService} from '../../services/program.service';


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {




  constructor(public programService: ProgramService ) {


  }

  ngOnInit() {

    this.programService.executeTasklist();
  }

}
