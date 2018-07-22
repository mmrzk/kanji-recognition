# KanjiRecognition

This project is made with Angular 6 and uses Google Translate service to recognize handwritten Japanese kanji.

## Usage

### 1. Import the module and add it to the imports section.

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { KanjiRecognitionModule } from 'kanji-recognition';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    KanjiRecognitionModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### 2. Use the component in your app like this.

```
<lib-kanji-recognition #kr [width]="400" [height]="250" (done)="suggestions = $event">
  Canvas isn't supported in this browser
</lib-kanji-recognition>
<button (click)="kr.clear()">Clear</button>
<ul>
  <li *ngFor="let kanji of suggestions">{{kanji}}</li>
</ul>
```

## Inputs

**`width`** - width of the canvas  
**`height`** - height of the canvas  
**`lineWidth`** - width of the line  
**`color`** - color of the stroke  
**`maxResults`** - maximum number of results sent from Google service

## Outputs

**`done`** - emits results of a recognition in form of an array of strings  
**`httpError`** - emits a http error if there was some problem with connection  
**`apiError`** - emits an error if there was problem on the Google side

## Public methods

**`clear(void): void`** - clears the canvas
