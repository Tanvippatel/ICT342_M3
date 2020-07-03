import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFromComponent } from './contact-from/contact-from.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormViewComponent } from './form-view/form-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFromComponent,
    FormViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    NgxMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
