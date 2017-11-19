import { Component, HostListener } from '@angular/core';
import { WindowService } from './window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Personal Website';

  @HostListener('window:load') onLoad() {
    if(this.windowService.getWindowLoaded() === false) {
      this.windowService.setWindowLoaded(true);
    }
  }

  @HostListener('window:unload') onUnload() {
    this.windowService.setWindowLoaded(false);
  }

  constructor(private windowService: WindowService) {}
}
