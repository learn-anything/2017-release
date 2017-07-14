import Auth0Lock from 'auth0-lock';

const lock = new Auth0Lock(
  'hzo1jVyqTE3c3JFq7rNpoowGY2l6Wq4d',
  'nikivi.eu.auth0.com'
);

lock.on('authenticated', authResult => {
  lock.getUserInfo(authResult.accessToken, (error, profile) => {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});

const login = () => {
  lock.show();
};

export default login;
