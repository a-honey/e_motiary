import React, { ReactNode } from 'react';
import Signin from './components/Signin.Signin';
import { withLoginSoNot } from '../../components/withLogin';

const SigninPage: React.FC = () => {
  return (
    <main>
      <Signin></Signin>
    </main>
  );
};

export default withLoginSoNot(SigninPage);
