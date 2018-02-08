import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {SharedVariablesService} from './services/shared-variables.service';
import {LoadFileDataService} from './services/load-file-data.service';
import {WriteFileDataService} from './services/write-file-data.service';
import {MeasureRunTimeService } from './services/measure-run-time.service';
import {TrackProgramsService} from './services/track-programs.service';


import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ToggleComponent } from './components/ui/toggle/toggle.component';
import { SliderComponent } from './components/ui/slider/slider.component';
import { NavigatorComponent } from './components/ui/navigator/navigator.component';
import { TimeCounterComponent } from './components/ui/time-counter/time-counter.component';
import { NotificationService} from './services/notification.service';
import { WallpaperContainerComponent } from './components/wallpaper-container/wallpaper-container.component';
import { HomeClockComponent } from './components/home-clock/home-clock.component';
import { BurgerMenuComponent } from './components/burger-menu/burger-menu.component';
import { DayTimeComponent } from './components/day-time/day-time.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { WeekTimeComponent } from './components/week-time/week-time.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    ToggleComponent,
    SliderComponent,
    NavigatorComponent,
    TimeCounterComponent,
    WallpaperContainerComponent,
    HomeClockComponent,
    BurgerMenuComponent,
    DayTimeComponent,
    ProgressBarComponent,
    WeekTimeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    HttpModule
  ],
  providers: [    ElectronService, SharedVariablesService,
     LoadFileDataService, WriteFileDataService,
     MeasureRunTimeService, TrackProgramsService, NotificationService,
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
