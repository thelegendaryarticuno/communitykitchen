// Terminal.jsx
function Terminal({command}) {
    return (
      <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[#FFFFFF]/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="font-mono text-[#00FF00] p-2 whitespace-pre-wrap break-words">
          {command}
        </div>
      </div>
    );
  }
  
  export default Terminal;
  