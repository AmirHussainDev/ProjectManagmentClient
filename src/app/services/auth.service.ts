// integration.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { AppService } from './app.service';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object,
        private appService: AppService
    ) { }

    // Method to fetch integration details from an API endpoint
    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('token');

            // Check if token exists
            if (token) {
                // Check if token is expired
                const tokenExpirationDate = this.getTokenExpirationDate(token);
                if (tokenExpirationDate === undefined || tokenExpirationDate <= new Date()) {
                    // Token expired or invalid
                    this.logout(); // Perform logout action
                    return false;
                }
                this.setUserClient();
                return true;
            }
        }
        return false; // Token does not exist

    }

    getTokenExpirationDate(token: string): Date | undefined {
        try {
            const jwtPayload = JSON.parse(atob(token.split('.')[1]));
            if (jwtPayload && jwtPayload.exp) {
                return new Date(jwtPayload.exp * 1000); // Convert to milliseconds
            }
            return;
        } catch (error) {
            // Token parsing failed, return undefined
            return undefined;
        }
    }

    logout() {
        // Implement your logout logic here
        localStorage.removeItem('token');
    }

    setUserClient() {
        this.appService.getAndSetUserDefaultClient();
    }
}
