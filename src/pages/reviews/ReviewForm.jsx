import Axios from 'axios';
import useFieldValues from 'hooks/useFieldValues';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ReviewForm() {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [error, setError] = useState(null);

  const [fieldValues, handleChange, setFieldValues, clearFieldValues] =
    useFieldValues({
      content: '',
      score: 0,
    });

  useEffect(() => {
    if (reviewId) {
      const url = `http://127.0.0.1:8000/shop/api/reviews/${reviewId}/`;
      Axios.get(url)
        .then(({ data }) => {
          setFieldValues((prevFieldValues) => ({
            content: data.content,
            score: data.score,
          }));
        })
        .catch((error) => setError(error));
    } else {
      setFieldValues(null);
    }
  }, [reviewId]);

  const saveReview = () => {
    const url = 'http://127.0.0.1:8000/shop/api/reviews/';
    const detailUrl = `http://127.0.0.1:8000/shop/api/reviews/${reviewId}/`;
    reviewId
      ? Axios.patch(detailUrl, fieldValues) // True면 patch(찾기)
          .then(() => {
            navigate(`/reviews/`);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => clearFieldValues())
      : Axios.post(url, fieldValues) // false면 새로 등록(post)
          .then(() => {
            navigate('/reviews/');
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => clearFieldValues());
  };

  return (
    <div className="border-2 border-gray-500 p-3 rounded">
      <h2>Review Form</h2>
      <select
        onChange={handleChange}
        name="score"
        value={fieldValues.score}
        className="block appearence-none w-full border border-gray-400 py-3 px-4 rounded"
      >
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <br />
      <textarea
        type="text"
        className="shadow w-full border border-gray-400 rounded"
        onChange={handleChange}
        name="content"
        value={fieldValues.content}
      />
      <br />
      <button
        onClick={() => {
          saveReview();
          navigate('/reviews/');
        }}
        className="bg-pink-200 hover:bg-pink-500 rounded py-2 px-3 mr-2"
      >
        저장하기
      </button>
      <button
        onClick={() => navigate('/reviews/')}
        className="bg-green-200 hover:bg-green-500 rounded py-2 px-3 mr-2"
      >
        돌아가기
      </button>
    </div>
  );
}

export default ReviewForm;
