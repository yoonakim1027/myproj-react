import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react/cjs/react.development';
import MusicChoice from './MusicChoice';

import MusicSummary from './MusicSummary';

function MusicList() {
  const [{ data: musicList, loading, error }, refetch] = useApiAxios(
    `/youtubemusic/api/music/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  const [viewList, setViewList] = useState(false);
  const handleViewClick = (e) => {
    e.preventDefault();
    setViewList(true);
  };

  return (
    <div>
      <h2 className="text-center my-3 mt-3"> 🐼 Music 🐱 </h2>

      <div className="px-6 py-4 mr-3">
        <Button type="purple" onClick={handleViewClick}>
          음악 리스트 보기
        </Button>

        {viewList && (
          <div className="overflow-hidden flex flex-wrap">
            {musicList.map((music) => (
              <div
                key={music.id}
                className="my-3 cursor-pointer font-bold text-xl  transition-transform hover:-translate-y-5 duration-300 w-full h-full"
              >
                <MusicSummary music={music} />
              </div>
            ))}
          </div>
        )}
        <Button onClick={handleViewClick}>추천 리스트 보기</Button>
        {viewList && (
          <div className="overflow-hidden flex flex-wrap">
            {musicList.map((music) => (
              <div
                key={music.id}
                className="my-3 cursor-pointer font-bold text-xl  transition-transform hover:-translate-y-5 duration-300 w-full h-full"
              >
                <MusicChoice music={music} />
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default MusicList;
