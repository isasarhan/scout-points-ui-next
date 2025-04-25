import AccountModule from '@/modules/account';
import React, { FC } from 'react';

export interface AccountPageProps {}

const AccountPage: FC<AccountPageProps> = () => {
  return (
    <AccountModule/>
  );
};

export default AccountPage;