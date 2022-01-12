import TopNav from 'components/TopNav';
import Login from 'pages/accounts/Login';
import Profile from 'pages/accounts/Profile';

import PagePostDetail from 'pages/blog/PagePostDetail';
import PagePostForm from 'pages/blog/PagePostForm';
import PagePostList from 'pages/blog/PagePostList';
import Clock from 'pages/examples/Clock';
import Components from 'pages/examples/Components';
import ReviewForm from 'pages/reviews/ReviewForm';
import ReviewList from 'pages/reviews/ReviewList';
import { Navigate, Route, Routes } from 'react-router-dom';
import useWindowWidth from 'pages/examples/useWindowWidth';
import './App.css';
import CssModule from 'pages/examples/CssModule';
import CssInJs from 'pages/examples/CssInJs';
import ContextAPISample from 'pages/examples/ContextAPISample';
import ContextApiSample2 from 'pages/examples/ContextAPISample2';
import PageNewsIndex from 'pages/news/PageNewsIndex';
import PageNewsArticleDetail from 'pages/news/PageNewsArticleDetail';

function App() {
  const windowWidth = useWindowWidth();

  return (
    <>
      <div className="app">
        <TopNav />
        <Routes>
          <Route path="/" element={<Navigate to="/blog/" />} />
          <Route path="/accounts/login/" element={<Login />} />
          <Route path="/accounts/profile/" element={<Profile />} />
          <Route path="/reviews/" element={<ReviewList />} />
          <Route path="/examples/components/" element={<Components />} />
          <Route path="/reviews/new/" element={<ReviewForm />} />
          <Route path="/blog/" element={<PagePostList />} />
          <Route path="/blog/:postId/" element={<PagePostDetail />} />
          <Route path="/blog/:postId/edit/" element={<PagePostForm />} />
          <Route path="/blog/new/" element={<PagePostForm />} />
          <Route path="/examples/cssmodule/" element={<CssModule />} />
          <Route path="/examples/cssinjs/" element={<CssInJs />} />
          <Route path="/news/" element={<PageNewsIndex />} />
          <Route path="/news/:articleId" element={<PageNewsArticleDetail />} />
          {/* :가 붙어야 주소가 매칭이된다  -> 이렇게 렌더링*/}

          {/* <Route
            path="/examples/context-api-sample2/"
            element={<ContextApiSample2 />}
          />

          <Route
            path="/examples/context-api-sample/"
            element={<ContextAPISample />}
          /> */}
        </Routes>
        <hr />
        윈도우 가로크기 : {windowWidth}px
      </div>
      <Routes>
        <Route path="/examples/clock/" element={<Clock />} />
      </Routes>
    </>
  );
}

export default App;
