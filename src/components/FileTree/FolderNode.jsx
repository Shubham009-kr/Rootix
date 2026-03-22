import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  Plus,
  Trash2,
} from "lucide-react";
import TreeNode from "./TreeNode";
import { toggleNode } from "../../utils/treeHelpers";

const FolderNode = ({ node, level, explorer }) => {
  const {
    tree,
    setTree,
    createNode,
    removeNode,
    updateNodeName,
    moveItem,
  } = explorer;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(node.name);

  const handleToggle = () => {
    const updated = toggleNode(tree, node.id);
    setTree(updated);
  };

  const handleRename = () => {
    if (!name.trim()) return;
    updateNodeName(node.id, name.trim());
    setIsEditing(false);
  };

  const getFolders = (nodes) => {
    let folders = [];
    for (let n of nodes) {
      if (n.type === "folder") {
        folders.push(n);
        folders = [...folders, ...getFolders(n.children)];
      }
    }
    return folders;
  };

  const folders = getFolders(tree);

  return (
    <div>
      <div
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 px-2 py-1 rounded group"
        style={{ paddingLeft: `${level * 16}px` }}
        onDoubleClick={() => setIsEditing(true)}
      >
        <div
          onClick={handleToggle}
          className="flex items-center gap-2 flex-1"
        >
          {node.isExpanded ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
          <Folder size={16} className="text-yellow-400" />

          {isEditing ? (
            <input
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename();
                if (e.key === "Escape") setIsEditing(false);
              }}
              className="bg-gray-700 px-1 rounded outline-none"
            />
          ) : (
            <span>{node.name}</span>
          )}
        </div>

        <div className="hidden group-hover:flex gap-2 items-center">
          <select
            onChange={(e) => moveItem(node.id, e.target.value)}
            className="bg-gray-700 text-xs"
          >
            <option value="">Move</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          <Plus onClick={() => createNode(node.id, "newFile", "file")} />
          <Plus
            className="text-green-400"
            onClick={() => createNode(node.id, "newFolder", "folder")}
          />
          <Trash2
            className="text-red-400"
            onClick={() => removeNode(node.id)}
          />
        </div>
      </div>

      <AnimatePresence>
        {node.isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                explorer={explorer}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FolderNode;