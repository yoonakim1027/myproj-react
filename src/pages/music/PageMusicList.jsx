import Button from 'components/Button';
import MusicList from 'components/music/MusicList';
import { useNavigate } from 'react-router-dom';

function PageMusicList() {
  const navigate = useNavigate();

  return (
    <>
      <hr />
      <div className="my-3 text-center">
        <Button type="green" onClick={() => navigate('/music/new/')}>
          노래 등록하기
        </Button>
      </div>

      <div>
        <MusicList />
      </div>
    </>
  );
}

export default PageMusicList;
