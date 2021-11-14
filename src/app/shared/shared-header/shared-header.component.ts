import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.css'],
})
export class SharedHeaderComponent {
  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  logout() {
  }

}
