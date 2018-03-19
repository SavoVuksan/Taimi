import { HomescreenComponent } from './components/homescreen/homescreen.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: HomescreenComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'home',
        component: HomescreenComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
