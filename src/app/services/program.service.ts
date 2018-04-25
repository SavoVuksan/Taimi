import { Injectable } from '@angular/core';
import * as child_process from 'child_process';
import {spawn} from 'child_process';
import {Program} from '../interfaces/program';
import {DatabaseService} from './database.service';
const {dialog} = require('electron').remote;



@Injectable()
export class ProgramService {

  tasklistOutput: string;
  programs: Program[];

  constructor(private database: DatabaseService) {
    this.tasklistOutput = '';
    this.programs = new Array<Program>();
  }

  // Executes the Command to check which program is currently running
  executeTasklist(){

    const tasklist = spawn('tasklist', ['/fo csv'], {
      shell : true
    })

    // Saves the output to a string (The output comes in a stream)
    tasklist.stdout.on('data', (data) => {

      this.tasklistOutput += data;
    });

    // Logs errors on console
    tasklist.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    // Callback when process execution is finished
    tasklist.on('close', (code) => {

      // Check if selected programs are currently running
      for (const p of this.programs){

        const name = p.path.split('\\\\');
        const exeName = name[name.length - 1];
        const match = this.tasklistOutput.search(exeName);

        if (match === -1){
          console.log(`${p.name} isn't running currently`);
        }
      }

    });

  }

  // This function opens a Dialog Window from which the user can select new Programs to track
  addProgram() {
    dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'Programs', extensions: ['exe']}]}, filePaths => {

      // Only do something if the user selects a File
      if (filePaths !== undefined) {
        let program: Program;
        const programPath = filePaths[0];
        let programName = programPath.split('\\');
        let programAlreayInList = false;
        programName = programName[programName.length - 1].split('.');

        // Creates the program object with its values some are preseted
        program = {
          'name' : this.capitalizeFirstLetter(programName[0]),
          'path': this.addBackslashes(programPath),
          'running': false,
          'runTime' : 0,
          'day' :  new Date(),
          blocked : false,
          tracking : false
        }

        // Check if selected Program is already in list
        for (const p of this.programs){
          if (p.path === program.path) {
            programAlreayInList = true;
          }
        }

        // Adds program only if unique in list
        if (!programAlreayInList) {
          this.programs.push(program);
          this.database.persistProgram(program);
          this.executeTasklist();
        }

      }
    });
  }

  // Adds to every backslash an extra one as escape Character
  addBackslashes(s: string){
    const reqExpr = /\\/g;
    return s.replace(reqExpr, '\\\\');
  }

  // Makes the First letter in a String uppercase
  capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

}
