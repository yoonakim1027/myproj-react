// fieldValues : 현재의 필드값 내역
// handleFieldChange : 각 필드 값이 변화 시에 호출
// handleSubmit : 인자없는 함수. submit 시에 호출.

function PostForm({ fieldValues, handleFieldChange, handleSubmit, loading }) {
  const handleClickedSubmitButton = () => {
    if (handleSubmit) {
      handleSubmit();
    } else {
      console.warn('handleSubmit 속성값을 지정해주세요.');
    }
  };

  return (
    <div>
      {loading && 'Loading ...'}
      <div>
        <label className="text-m flex top-1 right-0 mr-2 bottom-1">
          제목
          <textarea
            name="title"
            value={fieldValues.title}
            onChange={handleFieldChange}
            className="bg-gray-100 border  bottom-1 border-gray-400"
            disabled={loading}
          />
        </label>
      </div>
      <div>
        <label className="text-m flex top-1 mr-2 right-0">
          내용
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            className="bg-gray-100 border border-gray-400"
            disabled={loading}
          />
        </label>
      </div>

      <div>
        <button
          className="bg-blue-100 cursor-pointer"
          onClick={() => handleClickedSubmitButton()}
          disabled={loading}
        >
          {loading && '로딩 아이콘'}
          저장하기
        </button>
      </div>
    </div>
  );
}

export default PostForm;
