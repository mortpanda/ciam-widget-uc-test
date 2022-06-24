import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuth } from "@okta/okta-auth-js";
import { BehaviorSubject } from "rxjs";
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { OktaConfigService } from './okta-config.service';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OktaWidgetService {

  // @ViewChild('button-primary ') btnPrimary: ElementRef;


  private authClient = new OktaAuth({
    issuer: this.OktaConfig.strIssuer,
    clientId: this.OktaConfig.strClientID,
  });
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public strstateToken;
  public oktaSignIn;
  public idToken;
  public LogoutURI = this.OktaConfig.strPostLogoutURL;

  //jsalako@white-lions-den.duckdns.org

  constructor(
    private router: Router,
    private OktaConfig: OktaConfigService,

  ) { }

  async checkAuthenticated() {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async pwResetWidget(redirecturi, strContext) {
    const OktaClientID = this.OktaConfig.strClientID;
    const OktaBaseURI = this.OktaConfig.strBaseURI;
    const OktaLang = this.OktaConfig.strLang;
    const OktaRedirect = redirecturi;
    const OktaBrand = this.OktaConfig.strBrand;
    const OktaIssuer = this.OktaConfig.strIssuer;
    const OktaScope = this.OktaConfig.strScope;
    var oktaSignIn = new OktaSignIn({
      // flow: flow,

      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      features: {
        //router: true,
        // showPasswordToggleOnSignInPage: false,
        // hideSignOutLinkInMFA: true,
        rememberMe: false,
        // registration: false,
        // multiOptionalFactorEnroll: false,            // Allow users to enroll in multiple optional factors before finishing the authentication flow.
        // selfServiceUnlock: true,                    // Will enable unlock in addition to forgotten password
        // smsRecovery: false,                          // Enable SMS-based account recovery
        // callRecovery: false,
      },
      colors: {
        brand: OktaBrand,
      },
      authParams: {
        issuer: OktaIssuer,
        scopes: OktaScope,
      },
      // useInteractionCodeFlow: true,
    });
    console.log(OktaScope);
    // *****************************************************************************
    // This will display the context in the console.
    // *****************************************************************************
    await oktaSignIn.on('afterRender', function (context, error) {
      console.log(context.controller);
    });
    // *****************************************************************************
    // Password Reset -  change "Return to sign in button"    
    // *****************************************************************************
    oktaSignIn.on('afterRender', function (context) {
      if (context.controller == strContext) {
        let element: HTMLElement = document.getElementsByClassName('button-primary button-wide')[0] as HTMLElement;
        document.getElementsByClassName('button-primary button-wide')[0].addEventListener('click', () => {
          window.open('https://www.macnica.co.jp/', '_blank');

          let widget: HTMLElement = document.getElementsByClassName('auth-container main-container no-beacon')[0] as HTMLElement;
          widget.remove();

          //https://developer.mozilla.org/en-US/docs/Web/API/Window/close
          //https://qiita.com/heppokofrontend/items/2aaf2c0ca1ce37aa4c45
        });
        return;
      }

    })
    await oktaSignIn.showSignInToGetTokens({
      el: '#okta-signin-container'
    }).then(function (tokens) {
      oktaSignIn.authClient.tokenManager.setTokens(tokens);
      oktaSignIn.remove();
      const idToken = tokens.idToken;
      const strTokens = JSON.stringify(tokens)
      console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");
      window.location.replace(OktaRedirect);
      return true;
    }).catch(function (err) {
      console.error(err);
      return false;
    });
  }

  CloseWidget() {
    const OktaClientID = this.OktaConfig.strClientID;
    const OktaBaseURI = this.OktaConfig.strBaseURI;
    const OktaLang = this.OktaConfig.strLang;
    const OktaRedirect = this.OktaConfig.strRedirectURL;
    const OktaBrand = this.OktaConfig.strBrand;
    const OktaIssuer = this.OktaConfig.strIssuer;
    const OktaScope = this.OktaConfig.strScope;
    var oktaSignIn = new OktaSignIn({
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      colors: {
        brand: OktaBrand,
      },
      authParams: {
        issuer: OktaIssuer,
        scopes: OktaScope,
      },
      useInteractionCodeFlow: true,
    });
    oktaSignIn.remove();
  }



}