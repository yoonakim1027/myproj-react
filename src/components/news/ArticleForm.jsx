// !articleId : undefined 생성 (부정이면 생성)
// articleId : undefined 수정 (긍정이면 수정)
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import H2 from 'components/H2';
import LoadingIndicator from 'components/LoadingIndicator';
import useFieldValues from 'hooks/useFieldValues';

import { useApiAxios } from 'api/base';

// 함수 컴포넌트는 한번만 호출되는 것이 X
// 컴포넌트가 가지고 있는(참조하고 있는) 모든 상탯값이 바뀔 때마다 매번 호출(수백번 호출)
// 이럴때마다 새로운 오브젝트를 만들면? 안돼!
// 최대한 함수 밖에서 만드는 것이 좋음
const INIT__FIELD_VALUES = { title: '', content: '' }; // 초깃값 : 이 값은 바꾸는 것이 아니라 참조

// 속성값(articleId, handleDidSave)
function ArticleForm({ articleId, handleDidSave }) {
  const [{ loading: saveLoading, error: saveError }, saveRequest] = useApiAxios(
    {
      url: '/news/api/articles/',
      method: 'POST',
    },
    { manual: true },
  );
  // 첫번째 인자가 오브젝트
  // 두번째 인자가

  const { fieldValues, handleFieldChange } = useFieldValues(INIT__FIELD_VALUES);
  // form 태그로 감싸는 것이 좀 더 의미에 맞다!
  // form에서의 이벤트는? onSubmit => submit이 될 때 호출

  // saveLoading -> 참 : 요청 중
  // saveLoading -> 거짓 : 요청 끝
  const handleSubmit = (e) => {
    e.preventDefault(); // 원래 기본으로 동작되는 동작이 있는데, 이게 동작되지 않도록 막음
    console.log('submit!!');

    saveRequest({
      data: fieldValues,
    }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  }; // 장고 DRF는 생성된 객체 정보를 response로 줌

  // 우리가 어떤 입력값을 넣었을 때, fieldValues의 값들이 계속 바뀜
  // handleSubmit을 할때? 지정 주소로 Post요청(생성) / 수정(put,patch)
  // 이를 보낼 주소는?

  // name, value, onChange
  // 이름을 지정해야 식별할 수 있고
  // value가 있어야 값을 반영할 수 있고
  // onChange가 있어야 어떤 변화가 발생했을 때 상탯값을 변경할 수 있다
  return (
    <div>
      <H2>Article Form</H2>
      {saveLoading && <LoadingIndicator>저장 중..</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다. (${saveError.response.status},${saveError.response.statusText})`}
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            name="title"
            value={fieldValues.title}
            onChange={handleFieldChange}
            type="text"
            className="p-1 bg-gray-100 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
        </div>

        <div className="my-3">
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            className="p-1 bg-gray-100 w-full h-80 outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
        </div>
        <div className="my-3">
          <Button>저장하기</Button>
        </div>
      </form>
      <DebugStates fieldValues={fieldValues} />
    </div>
  );
}

export default ArticleForm;
