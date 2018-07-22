import { TestBed, inject } from '@angular/core/testing';

import { KanjiRecognitionService } from './kanji-recognition.service';

describe('KanjiRecognitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KanjiRecognitionService]
    });
  });

  it('should be created', inject([KanjiRecognitionService], (service: KanjiRecognitionService) => {
    expect(service).toBeTruthy();
  }));
});
