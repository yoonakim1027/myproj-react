// input[type=text] name =username
// input[type=password] name=password
// useFieldValues 훅 쓰고
// PageLogin컴포넌트 내에서,
// fieldValues 상탯값을 노출

import LoginForm from 'components/accounts/LoginForm';

function PageLogin() {
  return <LoginForm />;
}
export default PageLogin;
