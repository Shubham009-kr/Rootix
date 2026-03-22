import FileTree from "./components/FileTree/FileTree";

function App() {
  return (
    <div className="h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl font-semibold mb-4">TreeFlow 🌳</h1>
      <FileTree />
    </div>
  );
}

export default App;