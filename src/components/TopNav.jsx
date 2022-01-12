import Clock from 'pages/examples/Clock';
import { Link } from 'react-router-dom';

function TopNav() {
  return (
    <div className="my-3">
      <ul className="flex border-b">
        <li className="-mb-px mr-1 cursor-pointer hover:bg-red-300  bg-white inline-block border-l border-t border-r rounded-t py-2 px-4  font-semibold">
          <MyLink to="/blog/">블로그</MyLink>
        </li>
        <li className="-mb-px mr-1 cursor-pointer hover:bg-blue-300 bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold">
          <MyLink to="/news/">뉴스룸</MyLink>
        </li>

        {/* <li className="-mb-px mr-1 bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold">
          <MyLink to="/accounts/login/">로그인</MyLink>
        </li>
        <li className="-mb-px mr-1 bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold">
          <MyLink to="/accounts/profile/">프로필</MyLink>
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
    <Link to={to} className="pb-1 text-gray-400  hover:border-b-4">
      {children}
    </Link>
  );
}

export default TopNav;
