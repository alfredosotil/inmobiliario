import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, ConnectionBackend, XHRBackend } from '@angular/http';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
import { RouterModule } from '@angular/router';
//import { Ng2MapModule } from 'ng2-map';
import { AuthGuard } from './auth.guard';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FileUploader, FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap';
import { Ng2TableModule } from 'ng2-table/ng2-table';
//import {NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective} from 'ng2-table/ng2-table';
import { LocalStorageModule, LocalStorageService, } from 'angular-2-local-storage';
import { InterceptorService } from 'ng2-interceptors';
import { provideInterceptorService } from 'ng2-interceptors';
import { RatingModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { RequestInterceptor } from './request.interceptor';
import { AppComponent } from './app.component';
import { PublicComponent } from '../app/layouts/public.component';
import { SecureComponent } from '../app/layouts/secure.component';

import { GlobalService } from './global.service';
import { UtilService } from './util.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PropertyService } from './services/property.service';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './layouts/login.component';
import { WhatwedoComponent } from './Components/whatwedo/whatwedo.component';
import { PropertiesComponent } from './Components/properties/properties.component';
import { ViewmapComponent } from './Components/viewmap/viewmap.component';
import { OffersComponent } from './Components/offers/offers.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { FileuploadComponent } from './components/fileupload/fileupload.component';
import { RegisterpropertyComponent } from './components/registerproperty/registerproperty.component';
import { FindpropertyComponent } from './components/findproperty/findproperty.component';

const PUBLIC_ROUTES = [
    { path: 'home', component: HomeComponent },
    { path: 'whatwedo', component: WhatwedoComponent },
    { path: 'findproperty', component: FindpropertyComponent },
    { path: 'viewmap', component: ViewmapComponent },
    { path: 'offers', component: OffersComponent },
    { path: 'contactus', component: ContactusComponent },
    { path: 'fileupload', component: FileuploadComponent },
    //    { path: 'profile', component: ProfileComponent },
    //    { path: 'p404', component: p404Component },
    //    { path: 'e500', component: e500Component },
    //        { path: 'login', component: LoginComponent },
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
    { path: 'dashboard', component: DashboardComponent },
    { path: 'registerproperty', component: RegisterpropertyComponent },
    { path: 'properties', component: PropertiesComponent },
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
    { path: 'login', component: LoginComponent },
    { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
    { path: '', component: SecureComponent, canActivate: [AuthGuard], data: { title: 'Secure Views' }, children: SECURE_ROUTES },
    { path: '**', redirectTo: '/home' },
];

export function authHttpServiceFactory(http: Http, options: RequestOptions, localStorage: Storage) {
    return new AuthHttp(new AuthConfig({
        noJwtError: false,
        noClientCheck: false,
        //        noTokenScheme: false,
        headerName: 'Authorization',
        headerPrefix: 'Bearer ',
        tokenName: 'token',
        tokenGetter: () => localStorage.getItem('token') as string,
        globalHeaders: [{ 'Content-Type': 'application/json' }],
    }), http, options);
}

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions) {
    let service = new InterceptorService(xhrBackend, requestOptions);
    // Add interceptors here with service.addInterceptor(interceptor)
    service.addInterceptor(new RequestInterceptor());
    return service;
}

@NgModule({
    declarations: [
        AppComponent,
        PublicComponent,
        SecureComponent,
        HomeComponent,
        DashboardComponent,
        LoginComponent,
        WhatwedoComponent,
        PropertiesComponent,
        ViewmapComponent,
        OffersComponent,
        ContactusComponent,
        FileSelectDirective,
        FileDropDirective,
        FileuploadComponent,
        RegisterpropertyComponent,
        FindpropertyComponent
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCuHHxRJnJZ3ft03gkqcHyBRZQ13lJnOII",
            libraries: ["places"]
        }),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(APP_ROUTES),
        //        Ng2MapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCuHHxRJnJZ3ft03gkqcHyBRZQ13lJnOII' }),
        LazyLoadImageModule,
        TabsModule.forRoot(),
        Ng2TableModule,
        RatingModule.forRoot(),
        LocalStorageModule.withConfig({
            prefix: '',
            storageType: 'localStorage'
        }),
        //        AgmCoreModule.forRoot()
        //        AgmCoreModule.forRoot({
        //            apiKey: 'AIzaSyCuHHxRJnJZ3ft03gkqcHyBRZQ13lJnOII'
        //        })
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        //        {
        //            provide: AuthHttp,
        //            useFactory: authHttpServiceFactory,
        //            deps: [Http, RequestOptions, LocalStorageService]
        //        },
        {
            provide: InterceptorService,
            useFactory: interceptorFactory,
            deps: [XHRBackend, RequestOptions]
        },
        //        provideInterceptorService([
        //            // Add interceptors here, like "new ServerURLInterceptor()" or just "ServerURLInterceptor" if it has a provider
        //        ]),
        AppComponent,
        AuthGuard,
        AuthService,
        GlobalService,
        UtilService,
        UserService,
        PropertyService,
        LocalStorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
