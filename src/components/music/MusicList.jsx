import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import { useEffect } from 'react/cjs/react.development';
import MusicSummary from './MusicSummary';

function MusicList() {
  const [{ data: musicList, loading, error }, refetch] = useApiAxios(
    `/youtubemusic/api/music/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <h2> Music </h2>

      <button className="w-full">힙할 때</button>

      {musicList && (
        <div className="flex flex-wrap">
          {musicList.map((music) => (
            <div
              key={music.id}
              className="transition-transform hover:-translate-y-5 duration-300 w-full h-full md:w-1/2 xl:w-1/2 px-4"
            >
              <MusicSummary music={music} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MusicList;
