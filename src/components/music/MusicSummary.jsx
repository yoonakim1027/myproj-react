import { Link } from 'react-router-dom';

function MusicSummary({ music }) {
  return (
    <div>
      <div className="bg-gray-100 border-gray-200 border-2  overflow-hidden mb-5">
        <div>
          {music.album_photo && (
            <img
              src={music.album_photo}
              alt={music.title}
              className="w-full h-full"
            />
          )}
        </div>
        <div>
          <div>
            {music.singer_photo && (
              <img
                className=" float-right w-1/2 h-1/2 rounded-full relative  -top-20 ring-1 ring-white"
                src={music.singer_photo}
                alt={music.singer}
              />
            )}
          </div>
        </div>

        <div>
          <div className="p-8 sm:p-9 md:p-7 xl:p-9">
            <h3>
              <Link to={`/music/${music.id}/`} className=" text-dark">
                {music.title}
              </Link>
            </h3>
            <hr />
            <h4 className="text-gray-700 text-base">by [ {music.singer} ] </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicSummary;
