import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ExamplePageComponent} from './pages/example-page/example-page.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {EmployeePageComponent} from './pages/employee-page/employee-page.component';
import {OrderPageComponent} from './pages/order-page/order-page.component';
import {DetailedOrderPageComponent} from './pages/detailed-order-page/detailed-order-page.component';
import {PerformanceReportPageComponent} from './pages/performance-report-page/performance-report-page.component';
import {PerformanceReviewPageComponent} from './pages/performance-review-page/performance-review-page.component';
import {AddUserComponent} from './pages/addUser-page/addUser.component';
import {AdminGuardService} from './services/admin-auth-guard.service';
import {StatsPageComponent} from './pages/stats-page/stats-page.component';


/*
  This array holds the relation of paths and components which angular router should resolve.

  If you want add a new page with a separate path/subdirectory you should register it here.
  It is also possible to read parameters from the path they have to be specified with ':' in the path.

  If a new page should also show up in the menu bar, you need to add it there too.
  Look at: frontend/src/app/components/menu-bar/menu-bar.component.ts
 */
const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path : 'addUser', component: AddUserComponent, canActivate: [AuthGuardService, AdminGuardService]},
    {path: 'example', component: ExamplePageComponent, canActivate: [AuthGuardService]},
    {path: 'employee', component: EmployeePageComponent, canActivate: [AuthGuardService]},
    {path: 'orders', component: OrderPageComponent, canActivate: [AuthGuardService]},
    {path: 'orders/:id', component: DetailedOrderPageComponent, canActivate: [AuthGuardService]},
    {path: 'performance-report', component: PerformanceReportPageComponent, canActivate: [AuthGuardService]},
    {path: 'performance-review/:id/:date', component: PerformanceReviewPageComponent, canActivate: [AuthGuardService]},
    {path: 'stats/:id', component: StatsPageComponent, canActivate:[AuthGuardService]},
    {path: '', component: LandingPageComponent, canActivate: [AuthGuardService]},
    {path: '**', component: NotFoundPageComponent} // these entries are matched from top to bottom => not found should be the last entry
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting { }
