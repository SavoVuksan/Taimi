import { Injectable } from '@angular/core';

@Injectable()
export class WriteFileDataService {

  constructor() { }

  writeToFile(object:any, jsonURL:string)
  {
    var json = JSON.stringify(object);
    var fs = require('fs');
    fs.writeFile(jsonURL, json, 'utf8',function(err,data){
      if(err){
        console.log(err);
      }else
      {
        
      }
    });

  }

}
