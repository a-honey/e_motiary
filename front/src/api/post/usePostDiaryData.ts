import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { formDataInstance, instance } from '../instance';
import { queryKeys } from '../queryKeys';
import { CommentBodyType, DiaryBodyType } from './usePostDiaryData.types';
import { Error } from '../types';

export const usePostDiaryData = (fn?: (emojis: string) => void) => {
  const postMutation = useMutation(
    async ({ body }: { body: FormData }) => {
      return await formDataInstance.post(`/diary`, body);
    },
    {
      onSuccess: (res) => {
        fn?.(res.data.data.emoji);
        return res.data.data.emoji;
      },
      onError: (error: Error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};

export const usePostCommentData = (id: string, done?: () => void) => {
  const queryClient = useQueryClient();
  const postMutation = useMutation(
    async ({ body }: { body: CommentBodyType }) => {
      return await instance.post(`/comments/${id}`, body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.diaryData({ id }));
        done?.();
      },
      onError: (error: Error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};

export const usePostLikeDiaryData = ({
  id,
  isNetwork,
}: {
  id: string;
  isNetwork: boolean;
}) => {
  const queryClient = useQueryClient();
  const postMutation = useMutation(
    async () => {
      return await instance.post(`/favorites/${id}`);
    },
    {
      onSuccess: () => {
        isNetwork &&
          queryClient.invalidateQueries(
            queryKeys.diarysData({ emotion: null, select: null, page: null }),
          );
        queryClient.invalidateQueries(queryKeys.diaryData({ id }));
      },
      onError: (error: Error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};
