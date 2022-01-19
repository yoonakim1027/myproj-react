import useAuth from 'hooks/useAuth';
import { NavLink } from 'react-router-dom';

function TopNav() {
  // 로그인 시에 TopNav가 안바뀌는 이유
  // 별도의 상탯값을 만들기 때문에, 다른 값 !

  // auth 상탯값, useAuth의 상탯값은 서로 다름 !

  // 상탯값들이 서로 같은 값을 바라보게 하려면 ?

  // 그래서 loginForm에서 상탯값을 바꿔도? TopNav의 Auth는 변화 x
  // 이름만 같을 뿐, 다른 상탯값이라서~
  // 해결 방법은? context API, Redux 사용
  // 부모에서 자식으로 순차적으로 내려줌
  // context API :  매번 내려주지 않고도 수월하게 전달 가능
  const [auth, , , logout] = useAuth();
  const handleLogout = () => {
    logout(); // logout을 하면 auth 상탯값이 바뀌고 ~
  };

  return (
    <div className="my-3">
      <ul className="flex text-xs">
        <li className="-mb-px mr-1 cursor-pointer  bg-white border-l border-t border-r rounded-t py-2 px-4">
          <MyLink to="/news/">뉴스룸</MyLink>
        </li>
        <li className="-mb-px mr-1 cursor-pointer   bg-white border-l border-t border-r rounded-t py-2 px-4 ">
          <MyLink to="/blog/">블로그</MyLink>
        </li>

        <li className="-mb-px mr-1 cursor-pointer  bg-white  border-l border-t border-r rounded-t py-2 px-4">
          <MyLink to="/music/">Music</MyLink>
        </li>

        {!auth.isLoggedIn && (
          <>
            <li className="-mb-px mr-1 cursor-pointer   bg-white  border-l border-t border-r rounded-t py-2 px-4">
              <MyLink to="/accounts/login/">로그인</MyLink>
            </li>
            <li className="-mb-px mr-1 cursor-pointer   bg-white  border-l border-t border-r rounded-t py-2 px-4">
              <MyLink to="/accounts/signup/">회원가입</MyLink>
            </li>
          </>
        )}
        {auth.isLoggedIn && (
          <>
            <li className="-mb-px mr-1 cursor-pointer   bg-white  border-l border-t border-r rounded-t py-2 px-4">
              <MyLink to="/accounts/profile/">🐹 프로필</MyLink>
            </li>
            <li className="-mb-px mr-1 cursor-pointer   bg-white border-l border-t border-r rounded-t py-2 px-4 ">
              <button onClick={handleLogout} className={baseClassName}>
                🐹 로그아웃
              </button>
            </li>
          </>
        )}

        {/* <li className="-mb-px mr-1 cursor-pointer   bg-white inline-block border-l border-t border-r rounded-t py-2 px-4  font-semibold">
          <MyLink to="/accounts/profile/">🐼 프로필</MyLink>
        </li> */}

        {/* <li>
          <MyLink to="/examples/clock/">시계</MyLink>
        </li>
        <li>
          <MyLink to="/examples/cssmodule/">Css Module</MyLink>
        </li>
        <li>
          <MyLink to="/reviews/">리뷰</MyLink>
        </li>
        <li>
          <MyLink to="/examples/cssinjs/">Css In Js</MyLink>
        </li>
        <li>
          <MyLink to="/examples/context-api-sample/">Context API Sample</MyLink>
        </li>
        <li>
          <MyLink to="/examples/components/">컴포넌트 예시</MyLink>
        </li>
        <li>
          <MyLink to="/examples/context-api-sample2/">
            Context API Sample #2
          </MyLink>
        </li> */}
      </ul>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <NavLink
      to={to || ''} //항상 to가 지정에서 -> 없으면 "" 빈문자열로 반환으로 변경
      className={({ isActive }) =>
        baseClassName + ' ' + (isActive ? 'border-b-4 border-red-400' : '')
      }
    >
      {children}
    </NavLink>
  );
}

const baseClassName =
  'font-semibold hover:bg-red-200 hover:text-red-500 hover:text-white';

export default TopNav;
