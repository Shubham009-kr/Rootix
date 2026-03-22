import { useState } from "react";
import { File, Trash2 } from "lucide-react";

const FileNode = ({ node, level, explorer }) => {
  const { removeNode, updateNodeName, moveItem, tree } = explorer;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(node.name);

  const handleRename = () => {
    const dotIndex = node.name.lastIndexOf(".");
    const extension = dotIndex !== -1 ? node.name.slice(dotIndex) : "";

    if (!name.trim()) return;

    updateNodeName(node.id, name.trim() + extension);
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
    <div
      className="flex items-center justify-between px-2 py-1 hover:bg-gray-700 rounded group"
      style={{ paddingLeft: `${level * 16}px` }}
      onDoubleClick={() => {
        setIsEditing(true);
        setName(node.name.split(".")[0]);
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

        <Trash2
          size={16}
          className="text-red-400 cursor-pointer"
          onClick={() => removeNode(node.id)}
        />
      </div>
    </div>
  );
};

export default FileNode;