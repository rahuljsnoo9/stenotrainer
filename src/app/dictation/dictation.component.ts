import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from '../services/indexed-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictation',
  templateUrl: './dictation.component.html',
  styleUrl: './dictation.component.scss',
})
export class DictationComponent implements OnInit {
  audioDataList: {
    title: string;
    description: string;
    transcript: string;
    file: any;
    speed: any;
  }[] = [];

  speeds = [
    { value: '50', viewValue: '50 WPM' },
    { value: '60', viewValue: '60 WPM' },
    { value: '70', viewValue: '70 WPM' },
    { value: '80', viewValue: '80 WPM' },
    { value: '90', viewValue: '90 WPM' },
    { value: '100', viewValue: '100 WPM' },
    { value: '110', viewValue: '110 WPM' },
    { value: '120', viewValue: '120 WPM' },
    { value: '130', viewValue: '130 WPM' },
  ];
  constructor(
    private indexedDbService: IndexedDbService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.audioDataList = await this.indexedDbService.getAudioData();
    this.audioDataList.forEach((x: any) => {
      x['speed'] = { value: '50', viewValue: '50 WPM' };
    });
  }

  onPractice(item: any) {
    this.router.navigate(['practice', item.id], {
      queryParams: { pbs: item.speed.value },
    });
  }

  getWordLength(transcript: string) {
    return transcript?.split(' ')?.length;
  }

  playAudio(audioElement: HTMLAudioElement) {
    // Play or pause the audio
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  onAudioTimeUpdate(audioElement: HTMLAudioElement, progress: HTMLElement) {
    const percentage = (audioElement.currentTime / audioElement.duration) * 100;
    progress.style.width = `${percentage}%`;
  }
}
