import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import DebugStates from 'components/DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect, useState } from 'react/cjs/react.development';
import PostForm from 'components/blog/PostForm';

function PagePostForm() {
  // 상탯값 정의. 훅 호출
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { postId } = useParams();
  const { fieldValues, handleFieldChange, clearFieldValues, setFieldValues } =
    useFieldValues({
      title: '',
      content: '',
    });

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      const url = ` http://localhost:8000/blog/api/posts/${postId}/`;
      try {
        const response = await Axios.get(url);
        setFieldValues(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    if (postId) fetchPost();
    else clearFieldValues();
  }, [postId]);

  // 다양한 함수를 정의
  const savePost = async () => {
    setLoading(true);
    setError(null);

    const url = !postId
      ? 'http://localhost:8000/blog/api/posts/'
      : `http://localhost:8000/blog/api/posts/${postId}/`;

    try {
      if (!postId) {
        await Axios.post(url, fieldValues);
      } else {
        await Axios.patch(url, fieldValues);
      }
      navigate('/blog/');
    } catch (eroor) {
      setError(error);
      console.error(error);
    }

    setLoading(false);
  };

  // 표현 by jsx
  return (
    <div>
      <h2>
        Post Form
        {postId ? '수정' : '생성'}
      </h2>
      <PostForm
        fieldValues={fieldValues}
        handleFieldChange={handleFieldChange}
        handleSubmit={savePost}
        loading={loading}
      />
      <DebugStates postId={postId} fieldValues={fieldValues} />
    </div>
  );
}

export default PagePostForm;
