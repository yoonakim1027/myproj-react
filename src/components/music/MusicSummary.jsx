import { Link } from 'react-router-dom';

function MusicSummary({ music }) {
  return (
    <div className="bg-gray-100 border-gray-200 border-2 rounded-lg overflow-hidden mb-10">
      {music.photo && (
        <img src={music.photo} alt={music.title} className="w-full h-1/2" />
      )}
      <div className="p-8 sm:p-9 md:p-7 xl:p-9">
        <h3>
          <Link to={`/music/${music.id}/`} className="font-semibold text-dark">
            {music.title}
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default MusicSummary;
