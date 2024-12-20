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
export class IntegrationService {
    appurl = environment.apiUrl

    constructor(private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object,
        private appService: AppService) { }

    // Method to fetch integration details from an API endpoint
    fetchIntegrationDetails(): Promise<any> {
        this.http.get<any>(`${this.appurl}/currency/rates`).toPromise().then((data: any) => {
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('currency', JSON.stringify(data));
            }
        });
        return this.http.get<any>(`${this.appurl}/organizations`).toPromise().then((data: any) => {
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('organizations', JSON.stringify(data));
                if (data && data.length && data.some((org: any) => org.domain_name == location.hostname)) {
                    const organization = data.find((org: any) => org.domain_name == location.hostname)
                    localStorage.setItem('organization', JSON.stringify(organization));
                    localStorage.setItem('organization_id', data.find((org: any) => org.domain_name == location.hostname).id);
                    console.log('organization found');
                    this.appService.setCurrentOrganization(organization);
                }
            }
        });;
    }
}
