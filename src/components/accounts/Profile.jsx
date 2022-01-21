import DebugStates from 'components/DebugStates';
import { useAuth } from 'hooks/useContext';

function Profile() {
  const [auth] = useAuth();

  return (
    <>
      <div className="bg-white shadow-md rounded border border-gray-400 my-1 p-1">
        <p>Profile</p>
      </div>
      <DebugStates auth={auth} />
    </>
  );
}
export default Profile;
