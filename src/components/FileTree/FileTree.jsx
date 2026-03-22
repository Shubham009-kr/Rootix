import { useState } from "react";
import { useExplorer } from "../../features/explorer/useExplorer";
import TreeNode from "./TreeNode";
import { filterTree } from "../../utils/treeHelpers";

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

  const filteredTree = filterTree(tree, searchQuery, fileType);

  return (
    <div className="bg-gray-800 p-4 rounded-lg min-h-[300px]">
      {/* 🔍 Search + Filter */}
      <div className="flex gap-2 mb-3">
        <input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-1 rounded bg-gray-700 text-white w-full"
        />

        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="bg-gray-700 text-white px-2 rounded"
        >
          <option value="">All</option>
          <option value=".js">.js</option>
          <option value=".txt">.txt</option>
          <option value=".json">.json</option>
          <option value=".md">.md</option>
        </select>
      </div>

      {/* ➕ Create */}
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter name..."
          className="px-2 py-1 rounded bg-gray-700 text-white"
        />

        <button
          onClick={() => {
            createNode(null, input, "file");
            setInput("");
          }}
          className="bg-blue-500 px-3 py-1 rounded"
        >
          + File
        </button>

        <button
          onClick={() => {
            createNode(null, input, "folder");
            setInput("");
          }}
          className="bg-green-500 px-3 py-1 rounded"
        >
          + Folder
        </button>
      </div>

      {/* 🌳 Tree */}
      {filteredTree.length === 0 ? (
        <p className="text-gray-400">No matching results</p>
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
  );
};

export default FileTree;