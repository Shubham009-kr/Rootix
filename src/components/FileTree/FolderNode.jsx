import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, Folder } from "lucide-react";
import TreeNode from "./TreeNode";
import { toggleNode } from "../../utils/treeHelpers";
import { useExplorer } from "../../features/explorer/useExplorer";

const FolderNode = ({ node, level, explorer }) => {
  const { tree, setTree } = explorer;

  const handleToggle = () => {
    const updated = toggleNode(tree, node.id);
    setTree(updated);
  };

  return (
    <div>
      {/* Folder Row */}
      <div
        onClick={handleToggle}
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 px-2 py-1 rounded"
        style={{ paddingLeft: `${level * 16}px` }}
      >
        {node.isExpanded ? (
          <ChevronDown size={16} />
        ) : (
          <ChevronRight size={16} />
        )}

        <Folder size={16} className="text-yellow-400" />
        <span>{node.name}</span>
      </div>

      {/* Children */}
      <AnimatePresence>
        {node.isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FolderNode;