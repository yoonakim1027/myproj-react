function DebugStates(props) {
  return (
    <div>
      <pre className="bg-yellow-400 hover:bg-red-400 text-xs  p-1 border border-gray-400 overflow-x-scroll h-40">
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
}

export default DebugStates;
