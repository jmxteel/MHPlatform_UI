import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, firstValueFrom, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  private minLoadingTime = 2000; // 2 seconds minimum
  private loadingStartTime: number = 0;

  loading$ = this.isLoading.asObservable();

  show() {
    this.loadingStartTime = Date.now();
    this.isLoading.next(true);
  }

  hide() {
    const elapsedTime = Date.now() - this.loadingStartTime;
    const remainingTime = Math.max(0, this.minLoadingTime - elapsedTime);

    setTimeout(() => {
      this.isLoading.next(false);
    }, remainingTime);
  }

  wrapWithLoader<T>(operation: Promise<T> | Observable<T>): Observable<T> {
    this.show();
    return from(operation instanceof Promise ? operation : operation).pipe(
      finalize(() => this.hide())
    );
  } 
}
