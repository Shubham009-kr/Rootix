import { ALLOWED_EXTENSIONS } from "../constants/fileTypes";

export const normalizeFileName = (inputName) => {
  if (!inputName) return "untitled.txt";

  const lastDotIndex = inputName.lastIndexOf(".");

  // No extension
  if (lastDotIndex === -1) {
    return `${inputName}.txt`;
  }

  const name = inputName.slice(0, lastDotIndex);
  const ext = inputName.slice(lastDotIndex + 1);

  // Valid extension
  if (ALLOWED_EXTENSIONS.includes(ext)) {
    return inputName;
  }

  // Invalid extension
  return `${inputName}.txt`;
};