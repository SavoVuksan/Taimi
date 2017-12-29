import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { ProgramStack} from '../interfaces/program-stack';
import  {exec} from 'child_process';
import 'rxjs/add/operator/map';


@Injectable()
export class TrackProgramsService {

  public programStack:ProgramStack[] = [];
  public programStackJSON;
  public runningPrograms:string; //NOTE Just a Test variable
  private testTime;

  constructor(private _http : Http) {
    this.programStackJSON = this.getProgramStack('../src/app/config/programStack.json');

   }

  //NOTE URL is the path to the json file
  getProgramStack(url:string){
    return  this._http.get(url)
      .map((response : Response) => response.json());

  }

  //NOTE This works only on Windows for now and is only tested for windows 10
  listenForPrograms()
  {
    for(let program of this.programStack){

      if(program.trackingOn)
        //'WMIC PROCESS where "name="'+program.programName+'.exe"" get Caption' alternative Command
        exec('tasklist /fi "ImageName eq '+ program.programName +'.exe"', function(error, stdout, stderr){
          if(stdout.indexOf('INFO: No tasks are running which match the specified criteria.') == -1)
          {

            if(program.isRunning == false)
            {
              program.programStartTime = new Date().getTime() / 1000;
              program.isRunning = true;

            }else
            {
              program.timeUsedNow = (new Date().getTime() / 1000 - program.programStartTime) + program.alreadyUsedTime;
              console.log(program.programName + " " + program.timeUsedNow);

            }

          }else
          {
            program.isRunning = false;
          }


      });
    }

  }

  setTime(program,time)
  {
    program.alreadyUsedTime = time;
  }


}
