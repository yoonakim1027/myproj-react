// 생성은 createContext
import { createContext } from 'react';
import { useCallback, useContext } from 'react/cjs/react.development';
import useLocalStorage from './useLocalStorage';

const AuthContext = createContext();

// provider, consumser
/*
 
  
 */

// 초깃값
const INITIAL_AUTH = { isLoggedIn: false };

// 공유할 상탯값을 정의
function AuthProvider({ children }) {
  const [auth, setAuth] = useLocalStorage('auth', INITIAL_AUTH);
  // 하위 컴포넌트에서 공유할 값/함수들을 value로 지정
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

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export default { AuthProvider, useAuth };
