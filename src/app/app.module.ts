import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntegrationService } from './services/integration.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ShellModule } from './pages/shell/shell.module';
import { LoginModule } from './pages/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HighchartsChartModule } from 'highcharts-angular';
import { AuthInterceptor } from './auth-interceptor.service';
import { UsernamePipe } from './pipes/username.pipe';

export const initializeApp = (integrationService: IntegrationService) => {
  return () => integrationService.fetchIntegrationDetails();
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ShellModule,
    LoginModule,
    HttpClientModule,
    NgZorroAntdModule,
    HighchartsChartModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    IntegrationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [IntegrationService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  exports: [NgZorroAntdModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
