import { AngularMaterialModuleModule } from './utils/angular-material-module/angular-material-module.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MoneyExampleBasicComponent } from './money-example-basic/money-example-basic.component';
import { TddServerService} from './utils/tdd-server.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoneyExampleBasicComponent
  ],
  imports: [
    AngularMaterialModuleModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
      provide: MarkedOptions,
      useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
      },
      },
    }),
  ],
  providers: [
     TddServerService
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
