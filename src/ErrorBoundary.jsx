import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
  static getDerivedStateFromError(error) {
    return { error: error };
  }
  // 리턴된 상탯값에 자동으로 적용

  // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
  componentDidCatch(error, errorInfo) {}
  // 에러가 발생했다고 별도의 Api로깅 시에는 필요할지도 ?

  // 함수 컴포넌트 내에서 return 부분
  render() {
    if (this.state.error) {
      // 이렇게 상탯값에 접근 = 에러가 발생했다면?
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return (
        <div className="flex h-screen items-center">
          <div className="w-80 mx-auto bg-red-100 rounded h-40 p-3">
            <h1 className="text-xl font-extrabold text-red-500 mt-1 mb-2">
              Something went wrong.
            </h1>
            {this.state.error.toString()}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
