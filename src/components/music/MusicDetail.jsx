import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import LoadingIndicator from 'components/LoadingIndicator';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react/cjs/react.development';

// Detail 페이지에서 삭제까지 구현
function MusicDetail({ musicId }) {
  const navigate = useNavigate();

  const [{ data: music, loading, error }, refetch] = useApiAxios(
    `/youtubemusic/api/music/${musicId}/`,
    { manual: true },
  );

  const [{ loding: deleteLoading, error: deleteError }, deletePost] =
    useApiAxios(
      {
        url: `/youtubemusic/api/music/${musicId}`,
        method: 'DELETE',
      },
      { manual: true },
    );

  // 자동 새로고침
  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();

    if (window.confirm('정말 삭제하시겠습니까?')) {
      deletePost().then(() => {
        navigate('/music/');
        toast.info('🐻🐼 삭제 완료입니다 ! 🐶❤️', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  };

  return (
    <div>
      {loading && <LoadingIndicator />}
      {error &&
        `로딩 중 에러가 발생했습니다. (${error.response.status} ${error.response.statusText})`}

      {music && (
        <>
          <h2> {music.title}</h2>
          <h3> {music.singer}</h3>
          <hr />
          {music.photo && <img src={music.photo} alt={music.title} />}
          <hr />
          <div>
            {music.content.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>

          <div>
            <Button type="purple" onClick={() => navigate('/music/')}>
              목록으로
            </Button>

            <Button
              type="success"
              onClick={() => navigate(`/music/${musicId}/edit/`)}
            >
              수정하기
            </Button>

            <Button disabled={deleteLoading} onClick={handleDelete} type="pink">
              삭제하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
export default MusicDetail;
