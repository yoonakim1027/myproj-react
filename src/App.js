import TopNav from 'components/TopNav';
// Review
import ReviewForm from 'pages/reviews/ReviewForm';
import ReviewList from 'pages/reviews/ReviewList';

// Clock
import Clock from 'pages/examples/Clock';
import useWindowWidth from 'pages/examples/useWindowWidth';

// Post
import PagePostDetail from 'pages/blog/PagePostDetail';
import PagePostForm from 'pages/blog/PagePostForm';
import PagePostList from 'pages/blog/PagePostList';

// news
import PageNewsIndex from 'pages/news/PageNewsIndex';
import PageNewsArticleDetail from 'pages/news/PageNewsArticleDetail';
import PageNewsArticleForm from 'pages/news/PageNewsArticleForm';

import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import PageMusicList from 'pages/music/PageMusicList';
import PageMusicDetail from 'pages/music/PageMusicDetail';
import PageMusicForm from 'pages/music/PageMusicForm';
import PageLogin from 'pages/accounts/PageLogin';
import PageProfile from 'pages/accounts/PageProfile';
import PageSignupForm from 'pages/accounts/PageSignupForm';

// import Components from 'pages/examples/Components';
// import CssModule from 'pages/examples/CssModule';
// import CssInJs from 'pages/examples/CssInJs';
// import ContextAPISample from 'pages/examples/ContextAPISample';
// import ContextApiSample2 from 'pages/examples/ContextAPISample2';

import { AuthContextProvider } from 'contexts/AuthContext';

function App() {
  const windowWidth = useWindowWidth();

  return (
    <>
      {/* app.js 전역에 Provider로 context객체의 내용을 제공함으로써 
    Route에 element로 지정된 컴포넌트들이 전부 사용할 수 있음 */}
      <AuthContextProvider>
        <div className="app">
          <Clock />
          <TopNav />
          <Routes>
            <Route path="/" element={<Navigate to="/blog/" />} />

            <Route path="/reviews/" element={<ReviewList />} />
            <Route path="/reviews/new/" element={<ReviewForm />} />

            <Route path="/blog/" element={<PagePostList />} />
            <Route path="/blog/new/" element={<PagePostForm />} />
            <Route path="/blog/:postId/" element={<PagePostDetail />} />
            <Route path="/blog/:postId/edit/" element={<PagePostForm />} />

            <Route path="/news/" element={<PageNewsIndex />} />
            <Route path="/news/new/" element={<PageNewsArticleForm />} />
            <Route
              path="/news/:articleId/"
              element={<PageNewsArticleDetail />}
            />
            <Route
              path="/news/:articleId/edit/"
              element={<PageNewsArticleForm />}
            />

            <Route path="/music/" element={<PageMusicList />} />
            <Route path="/music/:musicId/" element={<PageMusicDetail />} />
            <Route path="/music/new/" element={<PageMusicForm />} />
            <Route path="/music/:musicId/edit/" element={<PageMusicForm />} />

            {/* :가 붙어야 주소가 매칭이된다  -> 이렇게 렌더링*/}

            <Route path="/accounts/login/" element={<PageLogin />} />
            <Route path="/accounts/profile/" element={<PageProfile />} />
            <Route path="/accounts/signup/" element={<PageSignupForm />} />

            {/* <Route
            path="/examples/context-api-sample2/"
            element={<ContextApiSample2 />}
          /> */}
            {/* <Route path="/examples/components/" element={<Components />} />
          <Route path="/examples/cssmodule/" element={<CssModule />} />
          <Route path="/examples/cssinjs/" element={<CssInJs />} />
          <Route
            path="/examples/context-api-sample/"
            element={<ContextAPISample />}
          />  */}
          </Routes>
          <hr />
          윈도우 가로크기 : {windowWidth}px
        </div>
      </AuthContextProvider>
      <Routes>
        <Route path="/examples/clock/" element={<Clock />} />
      </Routes>
    </>
  );
}

export default App;
