import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
import { RouterModule } from '@angular/router';
import { Ng2MapModule } from 'ng2-map';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { PublicComponent } from '../app/layouts/public.component';
import { SecureComponent } from '../app/layouts/secure.component';

import { GlobalService } from './global.service';
import { UtilService } from './util.service';
import { AuthService } from './services/auth.service';

import { HomeComponent } from './components/home/home.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const PUBLIC_ROUTES = [
    { path: 'home', component: HomeComponent },
    { path: 'contactus', component: ContactusComponent },
    //    { path: 'profile', component: ProfileComponent },
    //    { path: 'p404', component: p404Component },
    //    { path: 'e500', component: e500Component },
    //    { path: 'login', component: LoginComponent },
    //    { path: 'register', component: RegisterComponent },
    //    { path: 'home', component: HomeComponent },
    //    { path: 'benefits', component: BenefitsComponent },
    //    { path: 'services', component: ServicesComponent },
    //    { path: 'education', component: EducationComponent },
    //    { path: 'products', component: ProductsComponent },
    //    { path: 'fcra', component: FcraComponent },
    //    { path: 'croa', component: CroaComponent },
    //    { path: 'building', component: BuildingComponent },
    //    { path: 'tips', component: TipsComponent },
    //    { path: 'maintenance', component: MaintenanceComponent }    
];

const SECURE_ROUTES = [
    //    { path: '', redirectTo: 'overview', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent }
    //    { path: 'items', component: ItemsComponent },
    //    { path: 'overview', component: OverviewComponent },
    //    { path: 'profile', component: ProfileComponent },
    //    { path: 'reports', component: ReportsComponent },
    //    { path: 'recommendations', component: RecommendationsComponent },
    //    { path: 'score-simulator', component: ScoreSimulatorComponent },
    //    { path: 'payment-method', component: PaymentMethodComponent },
    //    { path: 'lock-account', component: LockAccountComponent }
];

const APP_ROUTES = [
    { path: '', redirectTo: '/home', pathMatch: 'full', },
    { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
    { path: '', component: SecureComponent, canActivate: [AuthGuard], data: { title: 'Secure Views' }, children: SECURE_ROUTES },
    { path: '**', component: HomeComponent },
];

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        noJwtError: true,
        noClientCheck: false,
        noTokenScheme: false,
        headerName: 'Authorization',
        headerPrefix: 'Bearer ',
        tokenName: 'token',
        tokenGetter: () => localStorage.getItem('token') as string,
        globalHeaders: [{ 'Content-Type': 'application/json' }],
    }), http, options);
}

@NgModule({
    declarations: [
        AppComponent,
        PublicComponent,
        SecureComponent,
        HomeComponent,
        ContactusComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(APP_ROUTES),
        Ng2MapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCuHHxRJnJZ3ft03gkqcHyBRZQ13lJnOII' })
    ],
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        //        AUTH_PROVIDERS,
        AuthGuard,
        AuthService,
        GlobalService,
        UtilService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }