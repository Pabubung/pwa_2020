export default {
  apiUrl: 'https://portalmobile.dexagroup.com',
  // apiUrl: 'https://portaltest.dexagroup.com',
  // apiUrlLoginBitrix:'https://portalmobile.dexagroup.com/api/login/loginBitrix',
  // apiUrlLoginBitrix:'https://portalmobile.dexagroup.com/api/login/v1/loginBitrix',

  // loginController -> v1.1.0
  // apiUrlLoginBitrix:'https://portalmobile.dexagroup.com/api/login/v1.1.0/loginBitrix',

  // loginController -> v1.1.5
  apiUrlLoginBitrix:'https://portalmobile.dexagroup.com/api/login/v1.1.5/loginBitrix',

  apiUrlLoginIT138:'https://portalmobile.dexagroup.com/api/login/loginit138',

  // apiUrlHome:'https://portalmobile.dexagroup.com/api/home/home',
  // apiUrlHome:'https://eventapp.dexagroup.com/apipwa_dashboard',
  apiUrlHome:'https://portalmobile.dexagroup.com/api/all/list_news_and_promo',

  apiUrlGueSehat:'https://portalmobile.dexagroup.com/api/home/guesehat',
  apiUrlCreateLeaveRequest:'https://portalmobile.dexagroup.com/api/ees/createleaverequest',
  apiUrlMyLeaveRequest:'https://portalmobile.dexagroup.com/api/ees/myleaverequest',

  apiUrlApprovalRequest:'https://portalmobile.dexagroup.com/api/ees/approvalrequest',
  apiUrlApprovalButtonApproveRequest:'https://portalmobile.dexagroup.com/api/ees/approvalbuttonapproverequest',
  apiUrlApprovalButtonRejectRequest:'https://portalmobile.dexagroup.com/api/ees/approvalbuttonrejectrequest',

  apiUrlMyTiket:'https://portalmobile.dexagroup.com/api/it138/mytiket',
  apiUrlMyTiketApprove:'https://portalmobile.dexagroup.com/api/it138/mytiketApprove',
  apiUrlticketSubmitRequest:'https://portalmobile.dexagroup.com/api/it138/create_request',
  apiUrlticketOpenRequest:'https://portalmobile.dexagroup.com/api/it138/ticketOpenRequest',
  apiUrlticketCloseRequest:'https://portalmobile.dexagroup.com/api/it138/ticketCloseRequest',

  apiUrlIattendHome:'https://eventapp.dexagroup.com/api',
  apiUrlIattendAgenda:'https://eventapp.dexagroup.com/api',
  apiUrlIattendQuestion:'https://eventapp.dexagroup.com/api',

  apiUrlTasRequest:'https://portalmobile.dexagroup.com/api/task/taskrequest',


  // Ini untuk eTravel Approval //

  apiUrlApproval_eTravelRequest:'https://portalmobile.dexagroup.com/api/etravel/approvalrequest',
  apiUrlApproval_eTravelButtonApproveRequest:'https://portalmobile.dexagroup.com/api/etravel/approvalbuttonapproverequest',
  apiUrlApproval_eTravelButtonRejectRequest:'https://portalmobile.dexagroup.com/api/etravel/approvalbuttonrejectrequest',

  // Ini untuk SPKL Approval //

  apiUrlApproval_spklRequest:'https://portalmobile.dexagroup.com/api/spkl/approvalrequest',
  apiUrlApproval_spklButtonApproveRequest:'https://portalmobile.dexagroup.com/api/spkl/approvalbuttonapproverequest',
  apiUrlApproval_spklButtonRejectRequest:'https://portalmobile.dexagroup.com/api/spkl/approvalbuttonrejectrequest',

  
  
};

// const apiUrl = 'https://192.168.3.155';
const siteConfig = {
  siteName: 'MetaAdmin',
  siteIcon: 'ion-flash',
  footerText: 'MetaAdmin ©2018 Created by RedQ, Inc',
  enableAnimatedRoute: false,
};
const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault',
  showBreadCrumb: true,
  fixedNavbar: true,
};
const language = 'english';
const AlgoliaSearchConfig = {
  appId: '',
  apiKey: '',
};
const Auth0Config = {
  domain: '',
  clientID: '',
  audience: '',
  options: {
    auth: {
      autoParseHash: true,
      redirect: false,
    },
    languageDictionary: {
      title: 'Metaadmin',
      emailInputPlaceholder: 'demo@gmail.com',
      passwordInputPlaceholder: 'demodemo',
    },
    icon: '',
    theme: {
      labeledSubmitButton: true,
      logo: '',
      primaryColor: '#E14615',
      authButtons: {
        connectionName: {
          displayName: 'Log In',
          primaryColor: '#b7b7b7',
          foregroundColor: '#000000',
          icon: undefined,
        },
      },
    },
  },
};
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
};
const googleConfig = {
  apiKey: '', //
};
const mapboxConfig = {
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  maxZoom: 18,
  defaultZoom: 11,
  center: [0, 0],
};
const youtubeSearchApi = '';

const instagramConfig = {
  instagramUserInfoApiUrl:
    'https://api.instagram.com/v1/users/self/?access_token=',
  instagramUserMediaApiUrl:
    'https://api.instagram.com/v1/users/self/media/recent/?access_token=',
  accessToken: '',
};
const jwtConfig = {
  fetchUrl: '/api/',
  secretKey: 'secretKey',
};
export {
  siteConfig,
  language,
  themeConfig,
  AlgoliaSearchConfig,
  Auth0Config,
  firebaseConfig,
  googleConfig,
  mapboxConfig,
  youtubeSearchApi,
  instagramConfig,
  jwtConfig
};
