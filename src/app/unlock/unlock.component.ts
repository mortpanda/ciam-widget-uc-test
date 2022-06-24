import { Component, OnInit } from '@angular/core';
import { OktaWidgetService } from '../shared/okta/okta-widget.service';
import { OktaConfigService } from '../shared/okta/okta-config.service';
import { ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-unlock',
  templateUrl: './unlock.component.html',
  styleUrls: ['./unlock.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UnlockComponent implements OnInit {

  constructor(
    private OktaWidgetService: OktaWidgetService,
    private OktaConfigService: OktaConfigService,
  ) { }

  async ngOnInit() {
    await this.OktaWidgetService.CloseWidget();
    await this.OktaWidgetService.CloseWidget();
    await this.OktaWidgetService.widgetDoUnlock(this.OktaConfigService.strRedirectURL, true, "#3C2B57");


  }



}
