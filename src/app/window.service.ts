export class WindowService {
  getWindowLoaded(): boolean {
    return JSON.parse(localStorage.getItem('window_loaded'));
  }

  setWindowLoaded(window_loaded: boolean): WindowService {
    localStorage.setItem('window_loaded', JSON.stringify(window_loaded));

    return this;
  }
}
