import { useNavigate } from 'react-router-dom';

function PageBlog() {
  const navigate = useNavigate();
  navigate('/blog/');
  return <div className="text-3xl font-bold underline"> PageBlog</div>;
}
export default PageBlog;
