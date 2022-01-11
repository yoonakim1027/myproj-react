// 이런식으로 격리해서 구현하기

import { CountProvider, useCount } from './context';

// CountProvider는 children만 받음!!
function ContextApiSample2() {
  return (
    <div>
      <h2>ContextApiSample2</h2>
      <CountProvider>
        <Level1 />
      </CountProvider>
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
  const { count, dispatch } = useCount();
  return (
    <div>
      <h2>Level3</h2>
      {count}
      <hr />
      <button onClick={() => dispatch({ type: 'PLUS' })}>1씩 증가</button>
    </div>
  );
}

export default ContextApiSample2;
