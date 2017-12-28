import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { ProgramStack} from '../interfaces/program-stack';
import  {exec} from 'child_process';
import 'rxjs/add/operator/map';


@Injectable()
export class TrackProgramsService {

  public programStack:ProgramStack[] = [];

  public runningPorgrams:String ; //NOTE Just a Test variable

  constructor(private _http : Http) {
    this.getProgramStack('../src/app/config/programStack.json');
   }

  //NOTE URL is the path to the json file
  getProgramStack(url:string){
    return this._http.get(url)
      .map((response : Response) => response.json());

  }

  /*
  .subscribe(programStacks => {
    this.programStack = programStacks;
    this.listenPrograms();
    }
  */

  //NOTE This works only on Windows for now and is only tested for windows 10
  listenForPrograms()
  {
    for(let program of this.programStack){
      if(program.trackingOn)
        exec('tasklist /fi "ImageName eq '+ program.programName +'.exe"', function(error, stdout, stderr){
        if(stdout.indexOf('INFO: No tasks are running which match the specified criteria.') == -1)
        {
          this.runningPorgrams += program.programName + " <br>";
        }
      });
    }
  }

}
