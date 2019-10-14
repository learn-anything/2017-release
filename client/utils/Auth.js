import auth0 from 'auth0-js';


export default class Auth {
  constructor(history) {
    this.history = history;

    this.auth0 = new auth0.WebAuth({
      domain: 'learn-anything.auth0.com',
      clientID: 'QeW4QliV1oqMowgcrn312XNVZwWan3fm',
      redirectUri: `${window.location.origin}/callback`,
      audience: 'https://learn-anything.xyz/api',
      responseType: 'token id_token',
      scope: 'openid',
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    localStorage.setItem('back_path', this.history.location.pathname);
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        // TODO - redirect and show error
        // eslint-disable-next-line no-console
        console.error(err);
      }
    });
  }

  setSession(authResult) {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    const backPath = localStorage.getItem('back_path');
    localStorage.removeItem('back_path');
    this.history.push(backPath);
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

  getAuthorizationHeader() {
    if (!this.isAuthenticated()) {
      return null;
    }

    return { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
  }
}
