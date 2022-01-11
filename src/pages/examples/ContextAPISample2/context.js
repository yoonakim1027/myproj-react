const { createContext, useContext, useReducer } = require('react');

const CountContext = createContext();

function reducer(prevCount, action) {
  const { type } = action;
  if (type === 'PLUS') return prevCount + 1;
  return prevCount;
}

// 이 함수를 쓰면 알아서 count가 생성되고 dispatch 함수가 실행
function CountProvider({ children }) {
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <CountContext.Provider value={{ count, dispatch }}>
      {children}
    </CountContext.Provider>
  );
}

function useCount() {
  return useContext(CountContext);
}

export { CountProvider, useCount };
