// integration.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class IntegrationService {

    constructor(private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object) { }

    // Method to fetch integration details from an API endpoint
    fetchIntegrationDetails(): Promise<any> {
        return this.http.get<any>(`/api/organizations`).toPromise().then((data: any) => {
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('organizations', JSON.stringify(data));
                if (data && data.length && data.some((org: any) => org.domain_name == location.hostname)) {
                    localStorage.setItem('organization', data.find((org: any) => org.domain_name == location.hostname));
                    localStorage.setItem('organization_id', data.find((org: any) => org.domain_name == location.hostname).id);
                    console.log('organization found')
                }
            }
        });;
    }
}
