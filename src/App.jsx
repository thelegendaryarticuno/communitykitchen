import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQueryResult } from './redux/querySlice';
import Navbar from './component/navbar';
import About from './component/about';

function App() {
  const dispatch = useDispatch();
  const { results, status, error, query } = useSelector((state) => state.query);
  const [userInput, setUserInput] = useState('');
  const [selectedQuery, setSelectedQuery] = useState('Your SQL query will appear here...');
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleGenerate = () => {
    if (userInput) {
      dispatch(fetchQueryResult(userInput));
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const renderTableHeaders = (data) => {
    if (!data || !data.length) return null;
    return Object.keys(data[0]).map((header, index) => (
      <th key={index} className="px-6 py-3 text-left text-xs font-medium text-[#FFFFFF] uppercase tracking-wider whitespace-nowrap">
        {header}
      </th>
    ));
  };

  const renderTableRows = (data) => {
    if (!data || !data.length) return null;
    return data.map((row, rowIndex) => (
      <tr key={rowIndex} className="bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/10">
        {Object.values(row).map((value, cellIndex) => (
          <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-[#FFFFFF]">
            {value}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="min-h-screen bg-[#34755A] relative overflow-hidden flex flex-col">
      {/* Error Dialog */}
      <AnimatePresence>
        {(error === "Internal Server Error" || error === "Failed to generate SQL query" || error === "No such table or column exists in database") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-[#34755A] rounded-lg p-6 max-w-md w-full border border-[#FFFFFF]/20 backdrop-blur-lg"
            >
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-4">Database Error</h3>
              <p className="text-[#FFFFFF] mb-6">{error}</p>
              <button
                onClick={handleRetry}
                className="w-full bg-[#FFFFFF]/20 text-[#FFFFFF] py-2 rounded-lg hover:bg-[#FFFFFF]/30 transition-all"
              >
                Retry
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-[#E0DDF6] rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#E0DDF6] rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 p-6 gap-6 overflow-hidden">
        {/* Database Info Section */}
        <About />
        {/* Middle Section */}
        <div className="flex-1 flex flex-col gap-6 min-h-0">
          {/* User Input Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-lg bg-[#34755A]/30 rounded-2xl p-6 shadow-lg border border-[#FFFFFF]/20"
          >
            <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">Enter Your Query</h2>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-[#FFFFFF]/10 backdrop-blur-md text-[#FFFFFF] font-mono p-4 rounded-lg border border-[#FFFFFF]/20 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]/30 placeholder-[#FFFFFF]/50"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your query here..."
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={status === 'loading' || !userInput}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 backdrop-blur-lg bg-[#34755A]/50 text-[#FFFFFF] font-semibold py-2 px-6 rounded-lg hover:bg-[#34755A]/60 transition-all border border-[#FFFFFF]/20 disabled:opacity-50"
              >
                {status === 'loading' ? 'Searching...' : 'Search'}
              </motion.button>
            </div>
          </motion.div>
          {/* Output Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`backdrop-blur-lg bg-[#34755A]/30 rounded-2xl p-6 shadow-lg border border-[#FFFFFF]/20 ${status === 'succeeded' && results.length > 0 ? 'flex-grow' : 'min-h-[200px]'}`}
          >
            <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">Results</h2>
            <div
              className="backdrop-blur-lg bg-[#FFFFFF]/10 p-4 rounded-lg border border-[#FFFFFF]/20 overflow-auto"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#FFFFFF40 transparent',
                height: status === 'succeeded' && results.length > 0 ? 'calc(100% - 5rem)' : '100px'
              }}
            >
              {status === 'loading' && (
                <div className="text-[#FFFFFF] text-center">Loading...</div>
              )}
              {status === 'succeeded' && results.length > 0 && (
                <div className="overflow-auto">
                  <table className="min-w-full divide-y divide-[#FFFFFF]/20">
                    <thead className="bg-[#FFFFFF]/5">
                      <tr>
                        {renderTableHeaders(results)}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#FFFFFF]/20">
                      {renderTableRows(results)}
                    </tbody>
                  </table>
                </div>
              )}
              {status === 'idle' && !results.length && (
                <div className="text-[#FFFFFF] text-center">Enter your query and click Execute Query to see results</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;