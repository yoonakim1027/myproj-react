import { useCallback, useEffect, useState } from 'react';

function useFieldValues(initialValues) {
  const [fieldValues, setFieldValues] = useState(initialValues);

  // 함수 객체를 생성할 때, 의존성이 걸린 값이 변경시에만 함수를 재생성
  const handleFieldChange = useCallback((e) => {
    const { name, value, files } = e.target;
    setFieldValues((prevFieldValues) => {
      return {
        ...prevFieldValues,
        [name]: (files && Array.from(files)) || value, // files가 있으면 files를 쓰고, 없으면 value를 쓰겠다
      }; // files가 있으면 배열로 변환해서 저장
    });
  }, []);

  const clearFieldValues = useCallback(() => {
    setFieldValues(initialValues);
  }, [initialValues]);

  // initialValues 속성값이 변경되면 fieldValues를 초기화합니다.
  useEffect(() => {
    setFieldValues(initialValues);
  }, [initialValues]);

  return {
    fieldValues,
    handleFieldChange,
    clearFieldValues,
    setFieldValues,
  };
}

export default useFieldValues;
