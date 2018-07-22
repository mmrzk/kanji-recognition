import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KanjiRecognitionModule } from 'kanji-recognition';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, KanjiRecognitionModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
