import React, { useState } from 'react';

import styles from './index.module.scss';
import { handleImgError } from '../../utils/handleImg';

const MyCard = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className={styles.myCard}>
      <img src="" alt="의 프로필사진" onError={handleImgError} />
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <label>유저 이름</label>
          <input />
          <label>이메일</label>
          <input />
          <label>내소개</label>
          <input />
          <div className={styles.btns}>
            <button type="submit">수정하기</button>
            <button
              type="button"
              className="cancelBtn"
              onClick={() => {
                // 저장해둔 이전 데이터로 상태 변경
                setIsEditing(false);
              }}
            >
              취소하기
            </button>
          </div>
        </form>
      ) : (
        <>
          <div>
            <h2>유저 이름</h2>
            <h3>반가워</h3>
            <h3>유저 소개</h3>
          </div>
          <div className={styles.btns}>
            <button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              수정하기
            </button>
            <button className="cancelBtn">회원탈퇴</button>
          </div>
        </>
      )}
    </section>
  );
};

export default MyCard;
