import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react/cjs/react.development';
import MusicSummary from './MusicSummary';

function MusicList() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const [{ data: musicList, loading, error }, refetch] = useApiAxios(
    `youtubemusic/api/music/${query ? '?query=' + query : ''}`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  // query를 받아서 setQuery 함수로 query에 저장

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  // 엔터 누를 시에 사이트 재시작
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  // 리스트 버튼 클릭 시 리스트 목록 출력하기
  const [viewList, setViewList] = useState(false);
  const handleViewClick = (e) => {
    setViewList(true);
  };

  return (
    <div>
      <h2 className="text-center my-3 mt-3 mb-2"> 🐼 Music 🐱 </h2>

      <div className="text-center px-6 py-4 mr-3">
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
      </div>
      <div className="my-3 flex-full text-gray-400 font-bold md:text-right ">
        <label className=" text-gray-500 font-bold md:text-right ">
          <button
            className="my-3 bg-blue-100 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            onClick={handleKeyPress}
          >
            검색하기
            <input
              className="my-2 bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-300"
              type="text"
              placeholder="검색어를 입력하신 후 엔터를 눌러주세요!"
              onChange={getQuery}
              onKeyPress={handleKeyPress}
            />
          </button>
        </label>

        {query && (
          <div className="float-center overflow-hidden flex flex-wrap my-5">
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
      </div>

      <ToastContainer />
    </div>
  );
}

export default MusicList;
