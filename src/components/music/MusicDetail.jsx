import { useApiAxios } from 'api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';

function MusicDetail({ musicId }) {
  const navigate = useNavigate();

  const [{ data: music, loading, error }, refetch] = useApiAxios(
    `/youtubemusic/api/music/${musicId}/`,
    { manual: true },
  );

  // 자동 새로고침
  useEffect(() => {
    refetch();
  }, []);

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
        </>
      )}
    </div>
  );
}
export default MusicDetail;
