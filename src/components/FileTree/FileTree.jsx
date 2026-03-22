import { useState } from "react";
import { useExplorer } from "../../features/explorer/useExplorer";
import TreeNode from "./TreeNode";

const FileTree = () => {
  const explorer = useExplorer();
  const { tree, createNode } = explorer;

  const [input, setInput] = useState("");

  return (
    <div className="bg-gray-800 p-4 rounded-lg min-h-[300px]">
      {/* Root Controls */}
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter name..."
          className="px-2 py-1 rounded bg-gray-700 text-white outline-none"
        />

        <button
          onClick={() => {
            createNode(null, input, "file");
            setInput("");
          }}
          className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
        >
          + File
        </button>

        <button
          onClick={() => {
            createNode(null, input, "folder");
            setInput("");
          }}
          className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
        >
          + Folder
        </button>
      </div>

      {/* Tree */}
      {tree.length === 0 ? (
        <p className="text-gray-400">No files yet...</p>
      ) : (
        tree.map((node) => (
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