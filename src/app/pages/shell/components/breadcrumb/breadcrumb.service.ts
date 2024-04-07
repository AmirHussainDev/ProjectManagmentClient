import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  breadcrumbs: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateBreadcrumb();
      }
    });
  }

  updateBreadcrumb() {
    const breadcrumbs: string[] = [];
    let currentRoute = this.route.root;
    let url = '';
    let routerFound = false;
    do {
      const childrenRoutes = currentRoute.children;
      routerFound = false;
      for (var i = 0; i < childrenRoutes.length; i++) {
        const route = childrenRoutes[i];
        if (route.outlet === 'primary') {
          const routeSnapshot = route.snapshot;
          if (routeSnapshot.data&&routeSnapshot.data["name"]) {
            breadcrumbs.push(routeSnapshot.data["name"]);

          }
          currentRoute = route;
          routerFound = true;
        }
      }
    } while (routerFound);

    this.breadcrumbs.next(breadcrumbs);
  }
}
