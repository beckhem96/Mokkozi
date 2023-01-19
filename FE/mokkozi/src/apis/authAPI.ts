import axios from 'axios';
// import { LoginInput } from '../pages/login.page';
// import { RegisterInput } from '../pages/register.page';;

const BASE_URL = 'http://localhost:8000/api/';

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const signUpUserFn = async (user: any) => {
  const response = await authApi.post('user/register', user);
  return response.data;
};

export const loginUserFn = async (user: any) => {
  const response = await authApi.post('user/login', user);
  return response.data;
};

// export const verifyEmailFn = async (verificationCode: string) => {
//   const response = await authApi.get<GenericResponse>(
//     `auth/verifyemail/${verificationCode}`,
//   );
//   return response.data;
// };

// export const logoutUserFn = async () => {
//   const response = await authApi.get<GenericResponse>('auth/logout');
//   return response.data;
// };

// export const getMeFn = async () => {
//   const response = await authApi.get<IUserResponse>('users/me');
//   return response.data;
// };
