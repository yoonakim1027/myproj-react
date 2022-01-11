// fieldValues : 현재의 필드값 내역
// handleFieldChange : 각 필드 값이 변화 시에 호출
// handleSubmit : 인자없는 함수. submit 시에 호출.

function PostForm({
  errorMessages,
  fieldValues,
  handleFieldChange,
  handleSubmit,
  loading,
}) {
  const handleClickedSubmitButton = () => {
    if (handleSubmit) {
      handleSubmit();
    } else {
      console.warn('handleSubmit 속성값을 지정해주세요.');
    }
  };

  return (
    <div className="block">
      {loading && 'Loading ...'}
      <div className="w-full mb-6">
        <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
          Titie
          <textarea
            name="title"
            value={fieldValues.title}
            onChange={handleFieldChange}
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
            placeholder="title"
            disabled={loading}
          />
          <div className="text-red-500">{errorMessages.title}</div>
        </label>
        <p className="text-red-500 text-xs italic">
          Please fill out this field.
        </p>
        <br></br>
        <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
          Content
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded mb-3 leading-loose focus:outline-none focus:bg-white pb-40 pl-2"
            placeholder="content"
            disabled={loading}
          />
          <div className="text-red-500">{errorMessages.content}</div>
        </label>
        <p className="text-red-500 text-xs italic">
          Please fill out this field.
        </p>
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0"></div>

      <div className="text-center">
        <button
          className=" shadow bg-pink-300 hover:bg-pink-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-5 md:mb-0 rounded cursor-pointer"
          onClick={() => handleClickedSubmitButton()}
          disabled={loading}
        >
          {loading && '로딩 아이콘'}
          저장하기
        </button>
        <br></br>
      </div>
    </div>
  );
}

export default PostForm;
