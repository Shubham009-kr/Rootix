import { useExplorer } from "../../features/explorer/useExplorer";
import TreeNode from "./TreeNode";

const FileTree = () => {
  const explorer = useExplorer();

  const { tree } = explorer;

  return (
    <div className="bg-gray-800 p-4 rounded-lg min-h-[300px]">
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