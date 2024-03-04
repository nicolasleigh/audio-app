interface NewUserResponse {
  id: string;
  name: string;
  email: string;
}

export type AuthStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  LostPassword: undefined;
  Verification: {userInfo: NewUserResponse};
};

export type ProfileNavigatorStackParamList = {
  Profile: undefined;
  ProfileSetting: undefined;
  Verification: {userInfo: NewUserResponse};
};

export type HomeNavigatorStackParamList = {
  PublicProfile: {profileId: string};
  Home: undefined;
};
