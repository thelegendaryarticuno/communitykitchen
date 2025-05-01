import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQueryResult } from './redux/querySlice';
import logo from './images/logo.png';

function App() {
  const dispatch = useDispatch();
  const { results, status, error } = useSelector((state) => state.query);
  const [selectedQuery, setSelectedQuery] = useState('');
  const [showExistingQueries, setShowExistingQueries] = useState(false);
  const [showAIQueries, setShowAIQueries] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [existingQueries, setExistingQueries] = useState(['GetAllDonors', 'GetAllKitchens', 'Query 3']);
  const [aiQueries] = useState(['AI Query 1', 'AI Query 2', 'AI Query 3']);

  const addAIQueriesToExisting = () => {
    const currentLength = existingQueries.length;
    const newQueries = aiQueries.map((_, index) => `Query ${currentLength + index + 1}`);
    setExistingQueries([...existingQueries, ...newQueries]);
  };

  const deleteQuery = (indexToDelete) => {
    setExistingQueries(existingQueries.filter((_, index) => index !== indexToDelete));
  };

  const handleGenerate = () => {
    if (selectedQuery) {
      dispatch(fetchQueryResult(selectedQuery));
    }
  };

  const handleGenerateWithAI = () => {
    if (selectedQuery) {
      // You can add AI-specific logic here
      dispatch(fetchQueryResult(selectedQuery));
    }
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
    <div className="h-screen bg-[#34755A] relative overflow-hidden flex flex-col">
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
      <header className="backdrop-blur-lg bg-[#FFFFFF]/10 py-4 px-6 flex items-center justify-between border-b border-[#FFFFFF]/20 h-24 flex-shrink-0">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-35 w-auto object-contain mt-6" />
        </div>
        <div className="flex gap-4 md:hidden">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#34755A]/30 backdrop-blur-lg rounded-lg px-4 py-2 text-[#FFFFFF] border border-[#FFFFFF]/20 hover:bg-[#34755A]/40 transition-all"
            onClick={() => setShowExistingQueries(!showExistingQueries)}
          >
            Existing Queries
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#34755A]/30 backdrop-blur-lg rounded-lg px-4 py-2 text-[#FFFFFF] border border-[#FFFFFF]/20 hover:bg-[#34755A]/40 transition-all"
            onClick={() => setShowAIQueries(!showAIQueries)}
          >
            AI Queries
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#34755A]/30 backdrop-blur-lg rounded-full p-2 border border-[#FFFFFF]/20 hover:bg-[#34755A]/40 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FFFFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </motion.button>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 p-6 gap-6 overflow-hidden">
        {/* Existing Queries */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${showExistingQueries ? 'block' : 'hidden'} md:block md:w-1/4 backdrop-blur-lg bg-[#34755A]/30 rounded-2xl p-6 shadow-lg border border-[#FFFFFF]/20 overflow-auto`}
        >
          <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">Existing Queries</h2>
          <input
            type="text"
            placeholder="Search queries..."
            className="w-full mb-4 p-3 rounded-lg bg-[#FFFFFF]/10 border border-[#FFFFFF]/20 text-[#FFFFFF] placeholder-[#FFFFFF]/50 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="space-y-3">
            {existingQueries.filter(query =>
              query.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((query, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="backdrop-blur-lg bg-[#34755A]/20 p-4 rounded-lg cursor-pointer hover:bg-[#34755A]/40 transition-all border border-[#FFFFFF]/20 flex justify-between items-center"
                onClick={() => setSelectedQuery(query)}
              >
                <span className="text-[#FFFFFF]">{query}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteQuery(index);
                  }}
                  className="text-[#FFFFFF] hover:text-[#FFFFFF]/70"
                >
                  ⋮
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Middle Section */}
        <div className="flex-1 flex flex-col gap-6 min-h-0">
          {/* Selected Query */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-lg bg-[#34755A]/30 rounded-2xl p-6 shadow-lg border border-[#FFFFFF]/20"
          >
            <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">Selected Query</h2>
            <textarea
              className="w-full backdrop-blur-lg bg-[#FFFFFF]/10 p-4 rounded-lg min-h-[120px] border border-[#FFFFFF]/20 text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]/30 resize-none"
              value={selectedQuery}
              onChange={(e) => setSelectedQuery(e.target.value)}
              placeholder="Write or select a query..."
            />
            <div className="flex gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={status === 'loading' || !selectedQuery}
                className="flex-1 backdrop-blur-lg bg-[#34755A]/30 text-[#FFFFFF] font-semibold py-3 px-6 rounded-lg hover:bg-[#34755A]/40 transition-all border border-[#FFFFFF]/20 disabled:opacity-50"
              >
                {status === 'loading' ? 'Generating...' : 'Generate'}
              </motion.button>
            </div>
          </motion.div>

          {/* Output Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-lg bg-[#34755A]/30 rounded-2xl p-6 flex-1 shadow-lg border border-[#FFFFFF]/20 min-h-0"
          >
            <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">Output Data</h2>
            <div
              className="backdrop-blur-lg bg-[#FFFFFF]/10 p-4 rounded-lg border border-[#FFFFFF]/20 overflow-auto h-[calc(100%-5rem)]"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#FFFFFF40 transparent'
              }}
            >
              {status === 'loading' && (
                <div className="text-[#FFFFFF] text-center">Loading...</div>
              )}
              {status === 'failed' && (
                <div className="text-red-400 text-center">Error: {error}</div>
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
                <div className="text-[#FFFFFF] text-center">Write or select a query and click Generate to see results</div>
              )}
            </div>
          </motion.div>
        </div>

        {/* AI Generated Queries */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${showAIQueries ? 'block' : 'hidden'} md:block md:w-1/4 backdrop-blur-lg bg-[#34755A]/30 rounded-2xl p-6 shadow-lg border border-[#FFFFFF]/20 overflow-auto`}
        >
          <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">AI Generated Queries</h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addAIQueriesToExisting}
            className="w-full mb-4 backdrop-blur-lg bg-[#34755A]/30 text-[#FFFFFF] font-semibold py-3 px-6 rounded-lg hover:bg-[#34755A]/40 transition-all border border-[#FFFFFF]/20"
          >
            Add All to Existing Queries
          </motion.button>
          <div className="space-y-3">
            {aiQueries.map((query, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="backdrop-blur-lg bg-[#34755A]/20 p-4 rounded-lg cursor-pointer hover:bg-[#34755A]/40 transition-all border border-[#FFFFFF]/20"
              >
                <span className="text-[#FFFFFF]">{query}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;