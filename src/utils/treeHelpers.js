import { v4 as uuidv4 } from "uuid";

export const addNode = (tree, parentId, newNode) => {
  if (!parentId) {
    return [...tree, { ...newNode, id: uuidv4() }];
  }

  return tree.map((node) => {
    if (node.id === parentId && node.type === "folder") {
      return {
        ...node,
        isExpanded: true,
        children: [...node.children, { ...newNode, id: uuidv4() }],
      };
    }

    if (node.type === "folder") {
      return {
        ...node,
        children: addNode(node.children, parentId, newNode),
      };
    }

    return node;
  });
};

export const deleteNode = (tree, nodeId) => {
  return tree
    .filter((node) => node.id !== nodeId)
    .map((node) => {
      if (node.type === "folder") {
        return {
          ...node,
          children: deleteNode(node.children, nodeId),
        };
      }
      return node;
    });
};

export const toggleNode = (tree, nodeId) => {
  return tree.map((node) => {
    if (node.id === nodeId && node.type === "folder") {
      return { ...node, isExpanded: !node.isExpanded };
    }

    if (node.type === "folder") {
      return {
        ...node,
        children: toggleNode(node.children, nodeId),
      };
    }

    return node;
  });
};

export const renameNode = (tree, nodeId, newName) => {
  return tree.map((node) => {
    if (node.id === nodeId) {
      return { ...node, name: newName };
    }

    if (node.type === "folder") {
      return {
        ...node,
        children: renameNode(node.children, nodeId, newName),
      };
    }

    return node;
  });
};

/* 🔍 FILTER */
export const filterTree = (tree, searchQuery, fileType) => {
  return tree
    .map((node) => {
      const matchesSearch = node.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesType =
        node.type === "file"
          ? !fileType || node.name.endsWith(fileType)
          : true;

      if (node.type === "folder") {
        const filteredChildren = filterTree(
          node.children,
          searchQuery,
          fileType
        );

        if (matchesSearch || filteredChildren.length > 0) {
          return {
            ...node,
            isExpanded: true,
            children: filteredChildren,
          };
        }

        return null;
      }

      if (matchesSearch && matchesType) {
        return node;
      }

      return null;
    })
    .filter(Boolean);
};

/* 🚚 MOVE HELPERS */

// Find node
export const findNode = (tree, nodeId) => {
  for (let node of tree) {
    if (node.id === nodeId) return node;

    if (node.type === "folder") {
      const found = findNode(node.children, nodeId);
      if (found) return found;
    }
  }
  return null;
};

// Check if target is inside source (descendant check)
export const isDescendant = (node, targetId) => {
  if (!node || node.type !== "folder") return false;

  for (let child of node.children) {
    if (child.id === targetId) return true;
    if (isDescendant(child, targetId)) return true;
  }

  return false;
};

// Move node
export const moveNode = (tree, nodeId, targetFolderId) => {
  if (nodeId === targetFolderId) return tree;

  const nodeToMove = findNode(tree, nodeId);
  const targetFolder = findNode(tree, targetFolderId);

  if (!nodeToMove || !targetFolder) return tree;
  if (targetFolder.type !== "folder") return tree;

  // Prevent moving into its own child
  if (isDescendant(nodeToMove, targetFolderId)) return tree;

  // Remove node
  const treeWithoutNode = deleteNode(tree, nodeId);

  // Add node to new location
  const updatedTree = addNode(treeWithoutNode, targetFolderId, {
    ...nodeToMove,
    id: undefined, // new id will be assigned
  });

  return updatedTree;
};