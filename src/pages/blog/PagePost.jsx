import { useNavigate } from 'react-router-dom';

function PagePost() {
  const navigate = useNavigate();
  navigate('/blog/');
  return <div className="text-3xl font-bold underline"> Pagepost</div>;
}
export default PagePost;
