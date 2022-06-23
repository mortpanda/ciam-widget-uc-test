var strResponse;
var arrLines;
var strMatchedPW;

function OktaWidget() {

    const oktaSignIn = new OktaSignIn({
        //logo: 'https://www.okta.com/sites/default/files/media/image/2021-03/Logo_Okta_Blue_RGB.png',
        language: 'ja',
        colors: {
            brand: '#00297A'
        },
        
        // i18n: {
        //     //Overrides default text when using English. Override other languages by adding additional sections.
        //     'en': {
        //         'primaryauth.title': 'Log In',
        //         'primaryauth.submit': 'Log In',
        //     }
        // },
        features: {
            registration: false,                           // Enable self-service registration flow
            rememberMe: false,                             // Setting to false will remove the checkbox to save username
            router: true,
            selfServiceUnlock: false,
            smsRecovery: false,
            callRecovery: false,

        },
        baseUrl: "https://kent-nagao-test.oktapreview.com",
        redirectUri: "https://192.168.1.210:4200/siw-custom-need-help/",
        clientId: "0oa1wg94qd3UxPGQ31d7",   //CLIENT ID GOES HERE
        authParams: {
            issuer: 'https://kent-nagao-test.oktapreview.com/oauth2/aus14xmr8soQUuZda1d7',
            responseType: ['token', 'id_token'],
            Pkce: true,
            responseMode: 'fragment',
            pkce: 'true',
            scope: ['openid', 'email', 'profile']
        },

        customButtons: [{
            title: 'アカウントをリセットする',
            className: 'btn-customAuth',
            click: () => {
              // clicking on the button navigates to another page
              window.location.href = 'mailto:EMAILADDRESS';
            }

          }]
          
    });

    oktaSignIn.on('afterRender', function (context) {
        console.log(context.controller);


        document.getElementById("help-links-container").remove();


        var paras = document.getElementsByClassName('auth-footer');
        while (paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
        }
        

        //     document.getElementById("test_btn_div").style.visibility = 'hidden';
        //     document.getElementById("buttonTitle").style.visibility = 'hidden';

        //     console.log(context.controller);
        //     //if (context.controller == 'account-unlock-email-sent') {
        //     if (context.controller == 'unlock-email-sent') {

        //         document.getElementById('okta-signin-container').remove();
        //         document.getElementById("test_btn_div").style.visibility = 'visible';
        //         document.getElementById("buttonTitle").style.visibility = 'visible';
        //     }
    });


//     function sleep(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//     }
  
//   async function showPartnerID() {
//        await sleep(400);
//        var mydiv = document.getElementsByClassName("o-form-input-name-username o-form-control okta-form-input-field input-fix");
//        mydiv[0].insertAdjacentHTML('beforebegin','<span data-se="o-form-input-username" class="o-form-input-name-username o-form-control okta-form-input-field input-fix o-form-has-errors"><span class="input-tooltip icon form-help-16" data-hasqtip="0"></span><span class="icon input-icon person-16-gray"></span><input type="text" placeholder="Partner ID" name="partner" id="okta-signin-username" value="" aria-label="User ID" autocomplete="off"></span>');
//       }

    //   var mydiv = document.getElementsByClassName("o-form-input-name-username o-form-control okta-form-input-field input-fix");
    //    mydiv[0].insertAdjacentHTML('beforebegin','<span data-se="o-form-input-username" class="o-form-input-name-username o-form-control okta-form-input-field input-fix o-form-has-errors"><span class="input-tooltip icon form-help-16" data-hasqtip="0"></span><span class="icon input-icon person-16-gray"></span><input type="text" placeholder="Partner ID" name="partner" id="okta-signin-username" value="" aria-label="User ID" autocomplete="off"></span>');
    //  }
  
  
//   window.addEventListener('load', function(){showPartnerID()}, false);

    // if (oktaSignIn.token.hasTokensInUrl()) {
    // } else {
    // oktaSignIn.session.get(function (res) {
    // If we get here, the user is already signed in.
    // if (res.status === 'ACTIVE') {
    // return;
    // }
    oktaSignIn.renderEl
        (
            { el: '#okta-signin-container' },
            function error(err) {
                console.error(err);
            }
        );
    // });
    // }

}