import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { StartComponent } from './start/start.component';
import { PwResetWidgetComponent } from './pw-reset-widget/pw-reset-widget.component';
import { UnlockComponent } from './unlock/unlock.component';
import { SocialLoginComponent } from './social-login/social-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'start', component: StartComponent },
  { path: 'pw-reset', component: PwResetWidgetComponent },
  { path: 'unlock', component: UnlockComponent },
  { path: 'social', component: SocialLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
