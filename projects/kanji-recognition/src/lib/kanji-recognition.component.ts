import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, fromEvent } from 'rxjs';
import { throttleTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'lib-kanji-recognition',
  templateUrl: './kanji-recognition.component.html',
  styleUrls: ['./kanji-recognition.component.css']
})
export class KanjiRecognitionComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  @Input() width = 400;
  @Input() height = 350;
  @Input() lineWidth = 5;
  @Input() maxResults = 10;
  @Input() color = '#000';
  @Output() done = new EventEmitter<[string]>();
  @Output() httpError = new EventEmitter<any>();
  @Output() apiError = new EventEmitter<any>();

  ctx: CanvasRenderingContext2D;
  isDown = false;
  nativeElement;
  moveSub: Subscription;
  hostRect;
  timerStart: number;
  data = [];

  constructor(element: ElementRef, private http: HttpClient) {
    this.nativeElement = element.nativeElement;
    fromEvent(this.nativeElement, 'mousedown').subscribe(
      ({ clientX: x, clientY: y }) => {
        if (!this.timerStart) {
          this.timerStart = Date.now();
        }
        this.updateRect();
        const stroke = [[], [], []];
        this.ctx.beginPath();
        x = x - this.hostRect.x;
        y = y - this.hostRect.y;
        this.ctx.moveTo(x, y);
        stroke[0].push(x);
        stroke[1].push(y);
        stroke[2].push(Date.now() - this.timerStart);
        this.moveSub = fromEvent(this.nativeElement, 'mousemove')
          .pipe(
            throttleTime(20),
            switchMap(({ clientX, clientY }) => {
              clientX = clientX - this.hostRect.x;
              clientY = clientY - this.hostRect.y;
              stroke[0].push(clientX);
              stroke[1].push(clientY);
              stroke[2].push(Date.now() - this.timerStart);
              this.ctx.lineTo(clientX, clientY);
              this.ctx.stroke();
              return fromEvent(this.nativeElement, 'mouseup');
            })
          )
          .subscribe(_ => {
            this.moveSub.unsubscribe();
            this.data.push(stroke);
            this.sendData();
          });
      }
    );
  }

  ngOnInit() {
    this.canvas.nativeElement.width = this.width;
    this.canvas.nativeElement.height = this.height;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.color;
    this.ctx.lineCap = 'round';
    this.updateRect();
  }

  updateRect() {
    this.hostRect = this.canvas.nativeElement.getBoundingClientRect();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(10, 10);
    this.ctx.lineTo(50, 25);
    this.ctx.lineTo(25, 40);
    this.ctx.stroke();
  }

  sendData() {
    const data = {
      app_version: 0.4,
      api_level: '537.36',
      device:
        '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
      input_type: 0,
      options: 'enable_pre_space',
      requests: [
        {
          writing_guide: {
            writing_area_width: this.width,
            writing_area_height: this.height
          },
          pre_context: '',
          max_num_results: this.maxResults,
          max_completions: 0,
          language: 'ja',
          ink: this.data
        }
      ]
    };

    this.http
      .post<any>(
        'https://inputtools.google.com/request?itc=ja-t-i0-handwrit&app=translate',
        data
      )
      .subscribe(
        (result: [string, [any]]) => {
          if (result[0] === 'SUCCESS') {
            this.done.emit(result[1][0][1]);
          } else {
            console.error('something went wrong');
            this.done.emit(null);
            this.apiError.emit(result);
          }
        },
        error => this.httpError.emit(error)
      );
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.data = [];
  }
}
