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
      return {
        ...node,
        name: newName,
      };
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