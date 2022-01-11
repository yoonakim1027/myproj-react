import { useNavigate, useParams } from 'react-router-dom';
import DebugStates from 'components/DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect, useState } from 'react/cjs/react.development';
import PostForm from 'components/blog/PostForm';
import { axiosInstance } from 'api/base';

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

      const url = `/blog/api/posts/${postId}/`;
      try {
        const response = await axiosInstance.get(url);
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

    const url = !postId ? '/blog/api/posts/' : `/blog/api/posts/${postId}/`;

    try {
      if (!postId) {
        await axiosInstance.post(url, fieldValues);
      } else {
        await axiosInstance.patch(url, fieldValues);
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
    <div className="w-full px-3 mb-6">
      <h2 className="italic text-m">
        Post Form
        <br></br>
        {postId ? ': 수정하기' : ': 생성하기'}
      </h2>
      <br></br>
      <hr />

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
