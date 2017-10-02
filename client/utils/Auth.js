
import auth0 from 'auth0-js';

export default class Auth {
  constructor(history) {
    this.history = history;

    this.auth0 = new auth0.WebAuth({
      domain: 'learn-anything.auth0.com',
      clientID: '21JChrv4SSb2Uj1g1pGcWledoI01lxmH',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://learn-anything.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid',
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push('/');
      } else if (err) {
        // TODO - redirect and show error
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.history.push('/');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.history.push('/');
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
