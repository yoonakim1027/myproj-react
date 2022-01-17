// input[type=text] name =username
// input[type=password] name=password
// useFieldValues 훅 쓰고
// PageLogin컴포넌트 내에서,
// fieldValues 상탯값을 노출

import Account from 'components/accounts/Account';
import { useNavigate, useParams } from 'react-router-dom';

function PageLogin() {
  const navigate = useNavigate();
  const { username } = useParams();

  return (
    <Account
      username={username}
      handleDidSave={(savedPost) =>
        navigate(`/accounts/profile/${savedPost.id}/`)
      }
    />
  );
}
export default PageLogin;
