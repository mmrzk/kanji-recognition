import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { KanjiRecognitionComponent } from './kanji-recognition.component';

@NgModule({
  imports: [HttpClientModule],
  declarations: [KanjiRecognitionComponent],
  exports: [KanjiRecognitionComponent]
})
export class KanjiRecognitionModule {}
