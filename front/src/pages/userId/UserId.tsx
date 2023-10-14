import React, { useState } from 'react';
import UserCard from './components/UserId.UserCard';
import Calendar from '../../components/calendar/Calendar';
import { useGetMyDiaryData } from '../../api/get/useGetDiaryData';
import { fakeDiaryData } from '../../mock/diary';

const UserIdPage: React.FC = () => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const { data, isFetching } = useGetMyDiaryData(
    `${localStorage.getItem('userId')}`,
    currentDate.year,
    currentDate.month,
  );

  return (
    <main style={{ gap: '40px' }}>
      <UserCard />
      {/* api 어떻게 갈지 몰라서 일단 메인페이지 캘린더가져옴 */}
      <Calendar data={fakeDiaryData} isFetching={isFetching} />
    </main>
  );
};

export default UserIdPage;
