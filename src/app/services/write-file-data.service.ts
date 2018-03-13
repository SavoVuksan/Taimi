import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

var fs = require('fs');
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;


@Injectable()
export class WriteFileDataService {

  constructor() { }

  saveUserData(object: any,jsonURL: string){


      console.log(object);
      var json = JSON.stringify(object);
      console.log("save userdata...");

      fs.writeFileSync("testUserData.json",json,'utf8',function(err, data){
        if(err){
          console.log("Error while writing User Data...");
          console.log("Error Log: "+err);
        }
      });
  


  }

  writeToFile(object: any, jsonURL: string, fileName: string) {

    var json = JSON.stringify(object);

    mkdirp(getDirName(jsonURL+'\\'+fileName), function(err) {

      if (err) {
        console.log(err);
      }

      fs.writeFileSync(jsonURL+'\\'+fileName, json, 'utf8', function(err, data) {
        if (err) {
          console.log(err);
        } else {

        }
      });
    });


  }

}
