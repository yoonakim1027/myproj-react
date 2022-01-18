import H2 from 'components/H2';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import { useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

const INITIAL_FIELD_VALUES = { username: '', password: '' };

function LoginForm() {
  const navigate = useNavigate();

  // 두번째 인자는 초깃값
  const [auth, setAuth] = useAuth();
  const [{ loading, error }, requestToken] = useApiAxios(
    {
      url: '/accounts/api/token/',
      method: 'POST',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } =
    useFieldValues(INITIAL_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();
    // then -> 응답의 상태코드가 400미만일 경우? then에 지정된 함수가 호출이 된다
    requestToken({ data: fieldValues }).then((response) => {
      const { access, refresh, username, first_name, last_name } =
        response.data;
      // TODO: access/refresh token을 브라우저 어딘가에 저장해야 합니다.
      // 저장해서 페이지 새로고침이 발생하더라도 그 token이 유실되지 않아야 합니다.
      setAuth({
        // setAuth에 오브젝트로 넣은 것
        isLoggedIn: true,
        access,
        refresh,
        username,
        first_name,
        last_name,
      });

      console.log('access :', access);
      console.log('refresh :', refresh);
      console.log('username :', username);
      console.log('first_name :', first_name);
      console.log('last_name :', last_name);

      // 인증 후, 이동할 주소를 지정합니다.
      navigate('/');
    });
  };

  return (
    <div>
      <h2>Login</h2>

      {error?.response?.status === 401 && (
        <div className="text-red-400">로그인에 실패했습니다.</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            type="text"
            name="username"
            value={fieldValues.username}
            onChange={handleFieldChange}
            placeholder="username"
            className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
          />
        </div>
        <div className="my-3">
          <input
            type="password"
            name="password"
            value={fieldValues.password}
            onChange={handleFieldChange}
            placeholder="passowrd"
            className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
          />
        </div>
        <Button>로그인</Button>
      </form>

      <DebugStates auth={auth} fieldValues={fieldValues} />
    </div>
  );
}
export default LoginForm;
