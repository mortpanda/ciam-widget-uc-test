import { Component, OnInit } from '@angular/core';
import { OktaWidgetService } from '../shared/okta/okta-widget.service';
import { OktaConfigService } from '../shared/okta/okta-config.service';
import { ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';



@Component({
  selector: 'app-pw-reset-widget',
  templateUrl: './pw-reset-widget.component.html',
  styleUrls: ['./pw-reset-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PwResetWidgetComponent implements OnInit {

  constructor(
    private OktaWidgetService: OktaWidgetService,
    private OktaConfigService: OktaConfigService,
  ) { }

  async ngOnInit() {
    await this.OktaWidgetService.CloseWidget();
    await this.OktaWidgetService.CloseWidget();
    await this.OktaWidgetService.widgetDoReset(this.OktaConfigService.strRedirectURL, false, "#00297A");



  }



}
