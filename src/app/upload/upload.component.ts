import { Component } from '@angular/core';
import { IndexedDbService } from '../services/indexed-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  formData = {
    title: '',
    description: '',
    transcript: '',
  };
  audioFile: File | null = null;
  audioFileName: string = '';
  selectedFile: File | null = null;
  constructor(
    private indexedDbService: IndexedDbService,
    private router: Router
  ) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];

    const file = event.target.files[0];
    if (file) {
      this.audioFile = file;
      this.audioFileName = file.name;
    }
  }
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  async onSubmit() {
    if (this.selectedFile) {
      const fileBase64 = await this.fileToBase64(this.selectedFile);
      const audioData = {
        title: this.formData.title,
        description: this.formData.description,
        transcript: this.formData.transcript,
        file: fileBase64,
      };

      await this.indexedDbService.saveAudioData(audioData);
      console.log('Audio data saved successfully!');
      this.getSavedData();
      this.reset();
    }
  }
  reset() {
    this.formData = {
      title: '',
      description: '',
      transcript: '',
    };
    this.audioFile = null;
    this.audioFileName = '';
    this.selectedFile = null;
    this.router.navigate(['dictation']);
  }

  async getSavedData() {
    const savedData = await this.indexedDbService.getAudioData();
    console.log('Retrieved data from IndexedDB:', savedData);
  }
}
