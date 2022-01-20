// context API를 이용
/*
< 현재 발생 문제>
- useAuth : 로그인 여부를 저장할 불린형 상탯값.
-> 그러나 컴포넌트 마다 새로운 상탯값이 정의가 됨

=> 이를 context API 를 사용해서 뿌려주기! 
*/

// import 시에, 경로 잘 확인하기!
import { createContext, useCallback, useContext } from 'react';
import useLocalStorage from './useLocalStorage';

// context 객체 생성
const AuthContext = createContext();

// 로그인 정보를 담을 초깃값
const INITIAL_AUTH = { isLoggedIn: false };

// 다른 컴포넌트에서 사용 가능하도록 !
// Provider를 함수로 생성

function AuthContextProvider({ chidren }) {
  const [auth, setAuth] = useLocalStorage('auth', INITIAL_AUTH);

  // 기존 useAuth에 있떤 login, logout 코드
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

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {chidren}
    </AuthContext.Provider>
  );
}

// context를 사용하기 위한 함수 consumer
function useAuthContext() {
  return useContext(AuthContext);
}
export { AuthContextProvider, useAuthContext };
