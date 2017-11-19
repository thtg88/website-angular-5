// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
// Custom Modules
import { AppRoutingModule } from './app-routing.module';
// Services
import { ContactRequestService } from './contact-request/contact-request.service';
import { WindowService } from './window.service';
// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    ContactRequestService,
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
