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
import { HttpClientModule } from '@angular/common/http';
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
<<<<<<< HEAD
import { MemoryComponent } from './components/memory/memory.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

=======
import { WebsitesComponent } from './components/websites/websites.component';
import {WebsiteService} from './services/website.service';
>>>>>>> 3cdcfa9940e86619f72c39ea9c66748482b94ec7


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
<<<<<<< HEAD
    BreakComponent,
    MemoryComponent
=======
    WebsitesComponent,
    BreakComponent
>>>>>>> 3cdcfa9940e86619f72c39ea9c66748482b94ec7
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
<<<<<<< HEAD
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    HttpModule,
    AmazingTimePickerModule
=======
    BrowserAnimationsModule
>>>>>>> 3cdcfa9940e86619f72c39ea9c66748482b94ec7
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
