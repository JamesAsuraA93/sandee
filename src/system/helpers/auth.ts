import { removeAccessToken, removeRefreshToken } from "./token";

export const logout = async () => {

  try {

    removeAccessToken();
    // removeRefreshToken();
    // window.location.reload();

    return {
      status: 200,
    }
  }
  catch (error) {
    console.error(error);
    return {
      status: 500,
    }
  }

}