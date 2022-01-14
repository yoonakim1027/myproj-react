import MusicDetail from 'components/music/MusicDetail';
import { useParams } from 'react-router-dom';

function PageMusicDetail() {
  const { musicId } = useParams();

  return (
    <>
      <div>
        <h2>Music Detail</h2>
        <div>
          <MusicDetail musicId={musicId} />
        </div>
      </div>
    </>
  );
}
export default PageMusicDetail;
