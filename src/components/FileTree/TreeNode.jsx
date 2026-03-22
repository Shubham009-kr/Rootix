import FolderNode from "./FolderNode";
import FileNode from "./FileNode";

const TreeNode = ({ node, level, explorer }) => {
  if (node.type === "folder") {
    return <FolderNode node={node} level={level} explorer={explorer} />;
  }

  return <FileNode node={node} level={level} />;
};

export default TreeNode;