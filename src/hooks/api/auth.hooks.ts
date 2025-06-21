'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import authService from '@/api/services/auth.service';
import { LoginRequest } from '@/api/types/auth.types';

import { Employee } from '../../models';

const AUTH_KEYS = {
  login: ['user', 'auth', 'login'],
  me: ['user', 'employee', 'me'],
};

export const useLogin = () => {
  const router = useRouter();
  const { refetch } = useCurrentUser();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: () => {
      refetch();
      router.push('/dashboard');
    },
  });
};

export const useCurrentUser = () => {
  return useQuery<Employee>({
    queryKey: AUTH_KEYS.me,
    queryFn: () => authService.getCurrentUser().then((data) => ({
      id: data.id,
      name: data.name,
      role: data.role,
      accountId: data.accountId,
    })),
    retry: false,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('accessToken'),
  });
};

export const useIsAuthenticated = () => {
  const { data: user, isLoading, status } = useCurrentUser();
  
  return {
    isAuthenticated: !!user,
    isLoading,
    status,
    user,
  };
};

export const useLogout = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      client.invalidateQueries({
        predicate(query) {
          return query.queryKey[0] === 'user';
        },
      })
    },
  });
};
