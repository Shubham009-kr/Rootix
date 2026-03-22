import FileTree from "./components/FileTree/FileTree";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-4">
      
      {/* Centered Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-5"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">
          🌳 TreeFlow Explorer
        </h1>

        <FileTree />
      </motion.div>
    </div>
  );
}

export default App;