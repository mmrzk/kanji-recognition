import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiRecognitionComponent } from './kanji-recognition.component';

describe('KanjiRecognitionComponent', () => {
  let component: KanjiRecognitionComponent;
  let fixture: ComponentFixture<KanjiRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanjiRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
