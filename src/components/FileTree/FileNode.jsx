import { useState } from "react";
import { File, Trash2 } from "lucide-react";

const FileNode = ({ node, level, explorer }) => {
  const { removeNode, updateNodeName } = explorer;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(node.name);

  const handleRename = () => {
    const dotIndex = node.name.lastIndexOf(".");
    const extension = dotIndex !== -1 ? node.name.slice(dotIndex) : "";
    const baseName = name.trim();

    if (!baseName) return;

    updateNodeName(node.id, baseName + extension);
    setIsEditing(false);
  };

  const baseNameOnly = node.name.includes(".")
    ? node.name.slice(0, node.name.lastIndexOf("."))
    : node.name;

  return (
    <div
      className="flex items-center justify-between px-2 py-1 hover:bg-gray-700 rounded group"
      style={{ paddingLeft: `${level * 16}px` }}
      onDoubleClick={() => {
        setIsEditing(true);
        setName(baseNameOnly);
      }}
    >
      <div className="flex items-center gap-2">
        <File size={16} className="text-gray-400" />

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

      <Trash2
        size={16}
        className="cursor-pointer text-red-400 hidden group-hover:block"
        onClick={() => removeNode(node.id)}
      />
    </div>
  );
};

export default FileNode;