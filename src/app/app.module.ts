import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {SharedVariablesService} from './services/shared-variables.service';
import {MeasureRunTimeService } from './services/measure-run-time.service';
import { DatabaseService } from './services/database.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ElectronService } from './providers/electron.service';
import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ToggleComponent } from './components/ui/toggle/toggle.component';
import { SliderComponent } from './components/ui/slider/slider.component';
import { NavigatorComponent } from './components/ui/navigator/navigator.component';
import { NotificationService} from './services/notification.service';
import { WallpaperContainerComponent } from './components/wallpaper-container/wallpaper-container.component';
import { HomeClockComponent } from './components/home-clock/home-clock.component';
import { BurgerMenuComponent } from './components/burger-menu/burger-menu.component';
import { DayTimeComponent } from './components/day-time/day-time.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { RoundPipe } from './round.pipe';
import { HomescreenComponent } from './components/homescreen/homescreen.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { ListComponent } from './components/list/list.component';
import { PointToggleComponent } from './components/point-toggle/point-toggle.component';
import { BreakComponent } from './components/break/break.component';
import { ProgramService } from './services/program.service';
import { MemoryComponent } from './components/memory/memory.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { WebsitesComponent } from './components/websites/websites.component';
import {WebsiteService} from './services/website.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ToggleComponent,
    SliderComponent,
    NavigatorComponent,
    WallpaperContainerComponent,
    HomeClockComponent,
    BurgerMenuComponent,
    DayTimeComponent,
    ProgressBarComponent,
    RoundPipe,
    HomescreenComponent,
    ProgramsComponent,
    ListComponent,
    PointToggleComponent,
    BreakComponent,
    MemoryComponent,
    WebsitesComponent,
    BreakComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    AmazingTimePickerModule,
    BrowserAnimationsModule
  ],
  providers: [    ElectronService, SharedVariablesService,
     MeasureRunTimeService, NotificationService,
     DatabaseService,
     ProgramService,
    WebsiteService

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
