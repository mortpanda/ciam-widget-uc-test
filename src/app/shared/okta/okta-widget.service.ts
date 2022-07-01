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

  private authClient = new OktaAuth({
    issuer: this.OktaConfig.strIssuer,
    clientId: this.OktaConfig.strClientID,
  });
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public strstateToken;
  public oktaSignIn;
  public idToken;
  public LogoutURI = this.OktaConfig.strPostLogoutURL;

  constructor(
    private router: Router,
    private OktaConfig: OktaConfigService,

  ) { }

  async checkAuthenticated() {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  //resetPassword
  async widgetDoReset(redirecturi, unlock, color) {
    const OktaClientID = this.OktaConfig.strClientID;
    const OktaBaseURI = this.OktaConfig.strBaseURI;
    const OktaLang = this.OktaConfig.strLang;
    const OktaRedirect = redirecturi;
    const OktaIssuer = this.OktaConfig.strIssuer;
    const OktaScope = this.OktaConfig.strScope;
    var oktaSignIn = new OktaSignIn({
      flow: "resetPassword",
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,

      features: {
        selfServiceUnlock: unlock,
      },
      colors: {
        brand: color,
      },
      authParams: {
        issuer: OktaIssuer,
        scopes: OktaScope,
      },
      useInteractionCodeFlow: true,
    });
    // // *****************************************************************************
    // // This will display the context in the console.
    // // *****************************************************************************
    await oktaSignIn.on('afterRender', function (context, error) {
      console.log(context.controller);
    });
    // // *****************************************************************************
    // // Password Reset 
    // // *****************************************************************************
    oktaSignIn.on('afterRender', function (context) {
      if (context.controller == "mfa-verify-passcode") {
        let Element: HTMLElement = document.getElementsByClassName('button-link enter-auth-code-instead-link')[0] as HTMLElement;
        Element.remove();

        let backLink: HTMLElement = document.getElementsByClassName('link js-cancel')[0] as HTMLElement;
        document.getElementsByClassName('link js-cancel')[0].innerHTML = "Go to customer URL";
        document.getElementsByClassName('link js-cancel')[0].addEventListener('click', () => {
          window.location.replace('https://okta.com/jp/');

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

  //unlockAccount
  async widgetDoUnlock(redirecturi, unlock, color) {
    const OktaClientID = this.OktaConfig.strClientID;
    const OktaBaseURI = this.OktaConfig.strBaseURI;
    const OktaLang = this.OktaConfig.strLang;
    const OktaRedirect = redirecturi;
    const OktaIssuer = this.OktaConfig.strIssuer;
    const OktaScope = this.OktaConfig.strScope;
    var oktaSignIn = new OktaSignIn({
      flow: "unlockAccount",
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: "https://www.macnica.co.jp/",

      features: {
        selfServiceUnlock: unlock,
      },
      colors: {
        brand: color,
      },
      authParams: {
        issuer: OktaIssuer,
        scopes: OktaScope,
      },
      useInteractionCodeFlow: true,
    });
    // // *****************************************************************************
    // // This will display the context in the console.
    // // *****************************************************************************
    await oktaSignIn.on('afterRender', function (context, error) {
      console.log(context.controller);
    });
    // // *****************************************************************************
    // // Unlock  
    // // *****************************************************************************
    oktaSignIn.on('afterRender', function (context) {
      if (context.controller == "mfa-verify-passcode") {
        let Element: HTMLElement = document.getElementsByClassName('button-link enter-auth-code-instead-link')[0] as HTMLElement;
        Element.remove();

        let backLink: HTMLElement = document.getElementsByClassName('link js-cancel')[0] as HTMLElement;
        document.getElementsByClassName('link js-cancel')[0].innerHTML = "Go to customer URL";
        document.getElementsByClassName('link js-cancel')[0].addEventListener('click', () => {
          window.location.replace('https://www.yahoo.co.jp');

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

  //social
  async widgetDoSocial(redirecturi, color) {
    const OktaClientID = this.OktaConfig.strClientID;
    const OktaBaseURI = this.OktaConfig.strBaseURI;
    const OktaLang = this.OktaConfig.strLang;
    const OktaRedirect = redirecturi;
    const OktaIssuer = this.OktaConfig.strIssuer;
    const OktaScope = this.OktaConfig.strScope;
    var oktaSignIn = new OktaSignIn({
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,

      features: {
        selfServiceUnlock: false,
      },
      colors: {
        brand: color,
      },
      authParams: {
        issuer: OktaIssuer,
        scopes: OktaScope,
      },
      idps:[
        { type: 'google', id: this.OktaConfig.strGoogleIdP },
      ],
      useInteractionCodeFlow: true,
    });
    // // *****************************************************************************
    // // This will display the context in the console.
    // // *****************************************************************************
    await oktaSignIn.on('afterRender', function (context, error) {
      console.log(context.controller);
    });
    // // *****************************************************************************
    // //   
    // // *****************************************************************************
    await oktaSignIn.showSignInToGetTokens({
      el: '#okta-signin-container'
    }).then(function (tokens) {
      oktaSignIn.authClient.tokenManager.setTokens(tokens);
      oktaSignIn.remove();
      const idToken = tokens.idToken;
      const strTokens = JSON.stringify(tokens)
      console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");
      window.location.replace('https://www.macnica.co.jp/');
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
    // const OktaBrand = this.OktaConfig.strBrand;
    const OktaIssuer = this.OktaConfig.strIssuer;
    const OktaScope = this.OktaConfig.strScope;
    var oktaSignIn = new OktaSignIn({
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      colors: {
        // brand: OktaBrand,
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