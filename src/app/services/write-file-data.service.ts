import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

var fs = require('fs');
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;


@Injectable()
export class WriteFileDataService {

  constructor() { }

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
