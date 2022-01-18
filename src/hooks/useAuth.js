import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const INITIAL_AUTH = { isLoggedIn: false };

function useAuth() {
  const [auth, setAuth] = useLocalStorage('auth', INITIAL_AUTH);

  // isLoggedin -> true 로 되어야 login 상태
  // 다른 컴포넌트에서도, login, logout 상탯값을 알아야 함
  // 개선 한다면? dispatch
  // login이라는 함수, setter함수를 통해 셋터

  const login = useCallback(
    ({ access, refresh, username, first_name, last_name }) => {
      setAuth({
        isLoggedIn: true,
        access,
        refresh,
        username,
        first_name,
        last_name,
      });
    },
    [setAuth],
  );
  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
    });
  }, [setAuth]);

  const signup = useCallback(() => {
    setAuth({
      isLoggedIn: true,
    });
  }, [setAuth]);
  // 네 개 다 setter 함수임
  return [auth, setAuth, login, logout, signup];
}

// 어떤 코드가 좋을 지 ? 고민이 필요

export default useAuth;
