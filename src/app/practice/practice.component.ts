import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndexedDbService } from '../services/indexed-db.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss',
})
export class PracticeComponent {
  title: string = '';
  dictationId: any;
  practiceData: any;
  timer: any;
  transcriptData: any;
  showResult = false;

  timeLeft: number = 60000 * 50; // Total time in seconds (50 minutes)

  constructor(
    private route: ActivatedRoute,
    private indexedDbService: IndexedDbService
  ) {}

  async ngOnInit() {
    this.dictationId = this.route.snapshot.paramMap.get('id');
    if (this.dictationId) {
      await this.getData();
    }
    this.startTimer();
  }
  get formattedTime(): string {
    const totalSeconds: number = Math.floor(this.timeLeft / 1000); // Convert milliseconds to seconds
    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  }

  async getData() {
    this.practiceData = await this.indexedDbService.getAudioDataById(
      +this.dictationId
    );
    console.log('Selected Audio Data:', this.dictationId, this.practiceData);
  }

  onSubmit() {
    this.showResult = true;
    // this.compare(this.transcriptData, this.practiceData.transcript);
  }

  ngOnDestroy(): void {
    this.stopTimer(); // Clear the timer when the component is destroyed
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft -= 1000; // Decrease by 1000 milliseconds (1 second)
      } else {
        this.timeLeft = 0; // Set to 0 to avoid negative values
        this.stopTimer(); // Stop the timer when it reaches 0
      }
    }, 1000); // Update every second
  }

  stopTimer(): void {
    clearInterval(this.timer);
    this.showResult = true;
  }
}
