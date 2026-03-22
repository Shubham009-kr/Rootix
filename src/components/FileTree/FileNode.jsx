import { File } from "lucide-react";

const FileNode = ({ node, level }) => {
  return (
    <div
      className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 rounded"
      style={{ paddingLeft: `${level * 16}px` }}
    >
      <File size={16} className="text-gray-400" />
      <span>{node.name}</span>
    </div>
  );
};

export default FileNode;