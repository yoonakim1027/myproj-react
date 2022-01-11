import { createContext, useContext, useState } from 'react';

// 인자 : context에서 다룰 값의 디폴트 값

const MessageContext = createContext();

function ContextApiSample() {
  // 카운트의 초기값은 0
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>ContextApiSample</h2>
      <button onClick={() => setCount((prev) => prev + 1)}>1씩 증가</button>
      <button onClick={() => setCount((prev) => prev - 1)}>1씩 감소</button>
      <MessageContext.Provider value={count}>
        <Level1 />
      </MessageContext.Provider>
    </div>
  );
}

function Level1() {
  return (
    <div>
      <h2>Level1</h2>
      <Level2 />
    </div>
  );
}

function Level2() {
  return (
    <div>
      <h2>Level2</h2>
      <Level3 />
    </div>
  );
}

function Level3() {
  return (
    <div>
      <h2>Level3</h2>
      {/* 메시지를 소비하는 것!  */}
      <MessageContext.Consumer>
        {/* 이 사이에 쓰는 것이 children */}
        {(count) => count}
        {/* 함수인자로 message를 받고~ 그냥 message를 리턴 */}
      </MessageContext.Consumer>
      <level4 />
    </div>
  );
}

// 함수 컴포넌트는 훅이 다 있다.
// level3의 코드와 level4의 코드는 동일한 동작을 한다
function Level4() {
  const count = useContext(MessageContext);
  return (
    <div>
      <h2>Level4</h2>
      {count}
    </div>
  );
}

export default ContextApiSample;
