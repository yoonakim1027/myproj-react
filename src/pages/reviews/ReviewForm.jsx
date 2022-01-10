import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import DebugStates from 'components/DebugStates';
import ReviewForm from 'components/ReviewForm';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect, useState } from 'react';

function PageReviewForm() {
  // 상탯값 정의. 훅 호출
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { reviewId } = useParams(); // 부모로부터 주입받은 속성값도 항상 바뀔 수 있다는 것을 염두
  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues({
    score: 5,
    content: '',
  });

  // 컴포넌트가 한번 만들어졌을 때 딱 한 번 호출되는 함수
  // 요청될때 보면? /슬러시 뒤에 번호가 붙음

  // * asncy 함수 사용 하려면 ? 별도로 함수를 만들어줘야함
  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      setError(null);

      const url = `http://localhost:8000/shop/api/reviews/${reviewId}`;

      try {
        const response = await Axios.get(url);
        setFieldValues(response.datat);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fn();
  }, [reviewId, setFieldValues]);

  // [] 어떤 값이 변경이 되면 ? 그 변경되는 값은 무조건 상탯값이어야 한다
  // 상탯값을 내부에서 참고 하고 있는데~ 왜 안썼니~

  // 어떤 상탯값이 변경이되면 이 함수가 자동으로 호출이 된다
  // []그럼 이 변수안에 들어갈 값은? reviewId
  // 변경이 되면 위의 {} 함수를 호출하겠다.

  // 다양한 함수를 정의
  const saveReview = async () => {
    setLoading(true); // 통신 중에는 참
    setError(null);
    const url = 'http://localhost:8000/shop/api/reviews/';
    try {
      await Axios.post(url, fieldValues);
      navigate('/reviews/');
    } catch (e) {
      setError(e);
      console.error(e);
    }
    setLoading(false); // 통신 중에는 거짓
  };

  // 표현 by jsx
  return (
    <div>
      <h2>
        ReviewForm
        {reviewId ? '수정' : '생성'}
      </h2>
      <ReviewForm
        fieldValues={fieldValues}
        handleFieldChange={handleFieldChange}
        handleSubmit={saveReview}
        loading={loading}
      />
      <DebugStates reviewId={reviewId} fieldValues={fieldValues} />
    </div>
  );
}

export default PageReviewForm;
