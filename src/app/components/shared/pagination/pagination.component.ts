import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() current: number = 0;
  @Input() total: number = 0;
  @Input() numberOfPages: number = 0;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.current && changes.current.currentValue) ||
      (changes.total && changes.total.currentValue)
    ) {
      this.pages = this.getPages(this.current, this.numberOfPages);
    }
  }

  private getPages(current: number, numberOfPages: number): number[] {
    if (numberOfPages <= 10) {
      return [...Array(numberOfPages).keys()].map((page) => ++page);
    }
    if (current > 5) {
      if (current >= numberOfPages - 5) {
        return [
          1,
          -1,
          numberOfPages - 5,
          numberOfPages - 4,
          numberOfPages - 3,
          numberOfPages - 2,
          numberOfPages - 1,
          numberOfPages,
        ];
      }
      return [1, -1, current - 1, current, current + 1, -1, numberOfPages];
    }
    return [1, 2, 3, 4, 5, -1, this.numberOfPages];
  }

  onGoTo(page: number): void {
    this.goTo.emit(page);
  }

  onNext(): void {
    this.next.emit(this.current);
  }

  onPrevious(): void {
    this.previous.next(this.current);
  }

  displayPageButton(page: number) {
    if (page === 1) {
      return 'First';
    }
    if (page === this.numberOfPages) {
      return 'Last';
    }
    if (page === -1) {
      return '...';
    }
    return page;
  }
}
