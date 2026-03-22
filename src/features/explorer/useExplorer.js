import { useState } from "react";
import {
  addNode,
  deleteNode,
  renameNode,
} from "../../utils/treeHelpers";
import { normalizeFileName } from "../../utils/fileHelpers";

export const useExplorer = () => {
  const [tree, setTree] = useState([]);

  const createNode = (parentId, name, type) => {
    if (!name || name.trim() === "") return;

    let finalName = name.trim();

    if (type === "file") {
      finalName = normalizeFileName(finalName);
    }

    const newNode = {
      name: finalName,
      type,
      ...(type === "folder" && { children: [], isExpanded: true }),
    };

    setTree((prev) => addNode(prev, parentId, newNode));
  };

  const removeNode = (nodeId) => {
    setTree((prev) => deleteNode(prev, nodeId));
  };

  const updateNodeName = (nodeId, newName) => {
    if (!newName || newName.trim() === "") return;

    setTree((prev) => renameNode(prev, nodeId, newName.trim()));
  };

  return {
    tree,
    createNode,
    removeNode,
    updateNodeName,
    setTree,
  };
};