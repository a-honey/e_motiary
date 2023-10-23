import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePutSignupData } from '../../../api/mutation/usePutSiginupData';
import { QueryClient } from '@tanstack/react-query';
import styles from './index.module.scss';

interface UserData {
  username: string;
  email: string;
  password: string;
}

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  boxStyle: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  boxStyle,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={id}></label>
    <div className={styles.inputGroup}>
      <i className={boxStyle}></i>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const Signup: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserData>({
    username: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const queryClient = new QueryClient();

  const signupMutation = usePutSignupData(queryClient);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (userInfo.password !== confirmPassword) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    signupMutation.mutate(userInfo);
  };

  return (
    <>
      <div className={styles.centerContainer}>
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <InputField
            id="username"
            name="username"
            type="text"
            placeholder="이름을 한글/영어로만 입력하세요"
            value={userInfo.username}
            onChange={handleChange}
            boxStyle={styles.box1}
          />
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={userInfo.email}
            onChange={handleChange}
            boxStyle={styles.box1}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="패스워드를 입력하세요"
            value={userInfo.password}
            onChange={handleChange}
            boxStyle={styles.box2}
          />
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="패스워드를 다시 입력하세요"
            value={confirmPassword}
            onChange={handleChange}
            boxStyle={styles.box2}
          />
          <button type="submit" className={styles.submitButton}>
            SIGN UP
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
