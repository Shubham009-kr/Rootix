import { useState } from "react";

export const useExplorer = () => {
  const [tree, setTree] = useState([]);

  return {
    tree,
    setTree,
  };
};