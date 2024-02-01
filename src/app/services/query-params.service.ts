import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryParamService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  getQueryParam(name: string): string {
    return this.route.snapshot.queryParams[name];
  }

  getAllQueryParams(): { [key: string]: string } {
    return this.route.snapshot.queryParams;
  }

  setQueryParams(queryParams: { [key: string]: any }): void {
    const navigationExtras: NavigationExtras = {
      queryParams,
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    };

    this.router.navigate([], navigationExtras);
  }

  getQueryParamChanges(): Observable<{ [key: string]: string }> {
    return this.route.queryParams;
  }
}
