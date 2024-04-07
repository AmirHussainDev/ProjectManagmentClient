import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SiteService {
    constructor(private router: Router) {

    }
    logout() {
        localStorage.setItem('site', '{}')
        localStorage.setItem('token', '')
        this.router.navigate(['/login']);
    }

    currentSite: any = {}
    getSiteDetails(): any {
        if (localStorage.getItem('site') && JSON.parse(localStorage.getItem('site') || '{}')) {
            this.currentSite = JSON.parse(localStorage.getItem('site') || '{}');
            return this.currentSite;
        }
    }

}
