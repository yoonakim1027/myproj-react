import { useCallback, useState } from 'react';

// 항상 hooks는 use로 시작한다
// use로 시작해야 리액트가 훅으로 인식한다
// initialFieldValues를 인자로 받아서 정해주기
function useFieldValues(initialValues) {
  // setter를 통해서 fieldValues가 바뀐당
  const [fieldValues, setFieldValues] = useState(initialValues);

  //useCallback: 함수 객체를 생성할 때, 의존성이 걸린 값이 변경 시에만 함수를 재생성

  //handleFieldChange는 e(이벤트 객체)를 받는다
  // 그럼 여기엔 항상 target이 있음
  // target은 이벤트가 발생한 element를 지칭
  //name을 통해서 식별, value는 실제 값

  // handleFieldChange-> 매번 새롭게 만들어짐
  // 그런데 매번 새롭게 만들어지면? 리액트 동작에 좋지 않음

  // setter를 지정할 때 함수 지정방식으로 써야 ~ ..
  // 서로간의 의존성이 끊어짐
  const handleFieldChange = useCallback((e) => {
    const { name, value } = e.target;
    //setFieldvalues를 통해 실제값에 반영
    // 인자로 값을 받고 있음
    setFieldValues((prevFieldValues) => {
      return {
        // 새로운 오브젝트 생성
        ...prevFieldValues, // 언팩!
        [name]: value, // 그냥 name이라고 쓰면 ? 안돼
      }; // name이라는 변수값이 계산된 name으로
    });
  }, []);

  //초기화
  const clearFieldValues = useCallback(() => {
    setFieldValues(initialValues);
  }, []);
  // 항목이 많으면 오브젝트로 반환

  return {
    fieldValues,
    handleFieldChange,
    clearFieldValues,
    setFieldValues,
  };
}

export default useFieldValues;
