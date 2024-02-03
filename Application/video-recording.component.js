import { Component, ViewChild } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-video-recording',
  templateUrl: './video-recording.component.html',
  styleUrls: ['./video-recording.component.css'],
})
export class VideoRecordingComponent {
  @ViewChild('recorder') recorder;

  showWebcam = true;
  isRecording = false;
  recordedVideo = [];
  webcamInitError = null;

  handleStartRecording() {
    this.isRecording = true;
  }

  handleStopRecording() {
    this.isRecording = false;
    this.recorder.stopRecording(() => {
      const blob = this.recorder.getBlob();
      this.recordedVideo.push({
        imageAsDataUrl: URL.createObjectURL(blob),
        imageAsBase64: blob,
      });
    });
  }

  handleInitError(error) {
    this.webcamInitError = error;
  }

  handleImageCapture(webcamImage) {
    // Handle captured frames if needed
  }

  handleWebcamError(error) {
    console.error('Error capturing webcam image:', error);
  }

  get mediaDevices() {
    return this.webcamInitError ? [] : WebcamUtil.getAvailableVideoInputs();
  }
}