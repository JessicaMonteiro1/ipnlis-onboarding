import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectUI';
AuthService: any;


constructor(public translate:TranslateService){
  translate.addLangs(['en', 'pt'])
  translate.setDefaultLang('en')
}

switchLang(lang:string){
  this.translate.use(lang)
}
}
