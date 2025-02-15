import React, { FC } from 'react';
export interface LoginPageProps {
  height: number;
}
const LoginPage: FC<LoginPageProps> = () => {
  return (
    <div>
      Hello LoginPage
    </div>
  );
};

export default LoginPage;