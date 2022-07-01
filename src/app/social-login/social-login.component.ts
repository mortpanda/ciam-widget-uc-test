import { Component, OnInit } from '@angular/core';
import { OktaWidgetService } from '../shared/okta/okta-widget.service';
import { OktaConfigService } from '../shared/okta/okta-config.service';
import { ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialLoginComponent implements OnInit {

  constructor(
    private OktaWidgetService: OktaWidgetService,
    private OktaConfigService: OktaConfigService,
  ) { }

  async ngOnInit() {
    await this.OktaWidgetService.CloseWidget();
    await this.OktaWidgetService.CloseWidget();
     
    await this.OktaWidgetService.widgetDoSocial(this.OktaConfigService.strSocialRedirect, "#095661");


  }




}
