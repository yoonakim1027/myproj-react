import styled, { css } from 'styled-components';

function CssInJs() {
  return (
    <div>
      <h2>Css in js</h2>
      <Button1 primary>버튼1</Button1>
      <Button1>버튼2</Button1>
      <Button2 primary>버튼3</Button2>
      <Button2>버튼4</Button2>
    </div>
  );
}

function Button1({ primary, children }) {
  return (
    <button
      style={{
        backgroundColor: 'palevioletred',
        borderRadius: '3px',
        border: 'none',
        color: 'white',
        ...(primary && { backgroundColor: 'white', color: 'black' }),
      }}
    >
      {children}
    </button>
  );
}

// styled components 활용
// styled.div  이런식으로 사용하면 됨
const Button2 = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;

  ${(props) =>
    props.primary &&
    css`
      background: white;
      color: black;
    `}
`;

export default CssInJs;
