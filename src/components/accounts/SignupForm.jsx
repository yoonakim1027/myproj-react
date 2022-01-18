import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import { useApiAxios } from 'api/base';
import useAuth from 'hooks/useAuth';
import useFieldValues from 'hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

const INITIAL_FIELD_VALUES = { username: '', password: '', password2: '' };

function SignupForm() {
  const navigate = useNavigate();

  const [auth] = useAuth();

  const [{ loading, error, errorMessages }, requestToken] = useApiAxios(
    {
      url: '/accounts/api/signup/', // postman에서 signup을 생성했음
      method: 'POST',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } =
    useFieldValues(INITIAL_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm('회원가입 하시겠습니까?')) {
      requestToken({ data: fieldValues }).then(() => {
        // 인증 후, 이동할 주소를 지정합니다.
        navigate('/');
      });
    }
  };

  return (
    <div>
      <h2 className="text-center pb-3"> 🐰 Sign Up</h2>
      <hr />
      {error?.response?.status === 401 && (
        <div className="text-red-400">회원가입에 실패했습니다.</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label>
            사용자 ID
            <input
              type="text"
              name="username"
              value={fieldValues.username}
              onChange={handleFieldChange}
              placeholder="사용자 ID를 입력해주세요."
              className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
            />
            {errorMessages.username?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>
        <div className="my-3 py-3">
          <label>
            비밀번호
            <input
              type="password"
              name="password"
              value={fieldValues.password}
              onChange={handleFieldChange}
              placeholder="비밀번호를 입력해주세요."
              className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
            />
            {errorMessages.password?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>
        <hr />
        <div className="my-3 py-3">
          <label>
            비밀번호 확인
            <input
              type="password"
              name="password2"
              value={fieldValues.password2}
              onChange={handleFieldChange}
              placeholder="비밀번호를 다시 입력해주세요."
              className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
            />
            {errorMessages.password2?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>
        <div className="my-3 py-3 text-center">
          <Button>회원가입</Button>
        </div>
      </form>
      <hr />
      <DebugStates
        auth={auth}
        fieldValues={fieldValues}
        non_field_errors={errorMessages}
      />
    </div>
  );
}

export default SignupForm;
