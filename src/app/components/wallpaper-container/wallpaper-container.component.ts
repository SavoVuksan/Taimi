import { Component, OnInit } from '@angular/core';
import { MeasureRunTimeService } from "../../services/measure-run-time.service";

@Component({
  selector: 'app-wallpaper-container',
  templateUrl: './wallpaper-container.component.html',
  styleUrls: ['./wallpaper-container.component.scss']
})
export class WallpaperContainerComponent implements OnInit {

  constructor(private measureTime:MeasureRunTimeService) { }

  ngOnInit() {
  }

}
