import './CssModule.scss';
// import from으로 module을 부를 수 있음

// import Styles from './CssModule.module.css';
// 클래스 네임을 유니크하게 만들어줌으로써, 다른 컴포넌트 내에서도 사용가능
// 유니크해야 함
function CssModule() {
  return (
    <div className="css-module">
      <h2>CssModule</h2>
      <div className="content">내용 내용 내용</div>
      <div className="date">2022.01.11</div>
    </div>
  );

  //   return <div className={Styles.cssmodule}>Css Module</div>;
}

export default CssModule;
