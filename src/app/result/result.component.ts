import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

// import { Diff } from 'diff';
import * as Diff from 'diff';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnChanges {
  @Input('transcriptData') transcriptData: any;
  @Input('originalTranscript') originalTranscript: any;

  @Output() backEvent = new EventEmitter();
  originalText: any;
  userText: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.originalText = changes['originalTranscript'].currentValue;
      this.userText = changes['transcriptData'].currentValue;
      if (this.originalText && this.userText) {
        setTimeout(() => {
          this.showDiff(this.originalText, this.userText);
        }, 100);
      }
    }
  }
  goBack() {
    this.backEvent.emit();
  }

  diffResult: string = '';

  showDiff(originalText: any, userText: any) {
    const diff = Diff.diffWords(originalText, userText);
    this.diffResult = this.generateHighlightedDiff(diff);
  }

  generateHighlightedDiff(diffResult: Diff.Change[]): string {
    return diffResult
      .map((part) => {
        if (part.added) {
          return `<ins class="bg-success">${part.value}</ins>`;
        } else if (part.removed) {
          return `<del class="bg-danger">${part.value}</del>`;
        }
        return `<span>${part.value}</span>`;
      })
      .join('');
  }
}
