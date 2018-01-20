import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class LoadFileDataService {

  constructor(private _http: Http) {

  }

  public getFileData(fileURL:string):any
  {
    return this._http.get(fileURL)
      .map((response : Response) => response.json());
  }

}
