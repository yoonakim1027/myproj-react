import MusicForm from 'components/music/MusicForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageMusicForm() {
  const navigate = useNavigate();

  const { musicId } = useParams();

  return (
    <>
      <div>
        <h2>Page Music Form</h2>
        {musicId ? ': 🐱 수정하기' : ': 🐶 생성하기'}

        <MusicForm
          musicId={musicId}
          handleDidSave={(savedPost) => navigate(`/music/${savedPost.id}/`)}
        />
      </div>
    </>
  );
}
export default PageMusicForm;
