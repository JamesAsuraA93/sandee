import Cookies from 'js-cookie';

export const setAccessToken = (token: string) => {
  Cookies.set('access_token', token);
}

export const getAccessToken = () => {
  return Cookies.get('access_token');
}

export const removeAccessToken = () => {
  Cookies.remove('access_token');
}


export const setRefreshToken = (token: string) => {
  window.localStorage.set('refresh_token', token);
}

export const getRefreshToken = () => {
  return window.localStorage.get('refresh_token');
}

export const removeRefreshToken = () => {
  window.localStorage.remove('refresh_token');
}
