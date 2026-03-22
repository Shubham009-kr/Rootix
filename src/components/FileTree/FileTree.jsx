import { useState } from "react";
import { useExplorer } from "../../features/explorer/useExplorer";
import TreeNode from "./TreeNode";
import { filterTree } from "../../utils/treeHelpers";
import {
  FilePlus,
  FolderPlus,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FileTree = () => {
  const explorer = useExplorer();
  const {
    tree,
    createNode,
    searchQuery,
    setSearchQuery,
    fileType,
    setFileType,
  } = explorer;

  const [input, setInput] = useState("");
  const [showGuide, setShowGuide] = useState(false);

  const filteredTree = filterTree(tree, searchQuery, fileType);

  return (
    <div>
      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          placeholder="🔍 Search files or folders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 w-full"
        />

        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="bg-gray-800 border border-gray-700 px-2 rounded-lg"
        >
          <option value="">All</option>
          <option value=".js">.js</option>
          <option value=".txt">.txt</option>
          <option value=".json">.json</option>
          <option value=".md">.md</option>
        </select>
      </div>

      {/* ➕ Create */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter file/folder name..."
          className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 flex-1"
        />

        <button
          onClick={() => {
            createNode(null, input, "file");
            setInput("");
          }}
          className="flex items-center gap-2 bg-blue-600 px-3 py-2 rounded-lg hover:bg-blue-700"
        >
          <FilePlus size={16} />
          File
        </button>

        <button
          onClick={() => {
            createNode(null, input, "folder");
            setInput("");
          }}
          className="flex items-center gap-2 bg-green-600 px-3 py-2 rounded-lg hover:bg-green-700"
        >
          <FolderPlus size={16} />
          Folder
        </button>

        <button
          onClick={() => setShowGuide((prev) => !prev)}
          className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-600"
        >
          <Info size={16} />
        </button>
      </div>

      {/* 📘 Guide Panel */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 bg-gray-900 border border-gray-700 p-4 rounded-xl text-sm space-y-2"
          >
            <h2 className="font-semibold text-lg">📘 How to Use</h2>

            <p>• Double click to rename</p>
            <p>• Use + icons to create inside folders</p>
            <p>• Use dropdown to move files/folders</p>
            <p>• Search is case-insensitive</p>
            <p>• Filter shows only selected file types</p>

            <h2 className="font-semibold text-lg mt-3">⚙️ Rules</h2>
            <p>• Files auto-append .txt if no extension</p>
            <p>• Invalid extensions → .txt added</p>
            <p>• Cannot move folder into itself/child</p>
            <p>• Duplicate names auto-renamed</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌳 Tree */}
      <div className="bg-black/40 border border-gray-700 rounded-xl p-3 max-h-[400px] overflow-auto">
        {filteredTree.length === 0 ? (
          <p className="text-gray-400 text-center py-6">
            No matching results
          </p>
        ) : (
          filteredTree.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              level={0}
              explorer={explorer}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FileTree;