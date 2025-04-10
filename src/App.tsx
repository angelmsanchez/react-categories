import "./App.css";
import { useFiles } from "./hooks";
import { File } from "./components";

function App() {
  const {
    files,
    handleAddFile,
    handleChangeAlign,
    handleAddProduct,
    handleDeleteProduct,
  } = useFiles();
  return (
    <>
      <header className="header">
        <h2>Gestión de categorías</h2>
        <div className="header-actions">
          <button className="button-header" onClick={handleAddFile}>
            Agregar fila
          </button>
        </div>
      </header>
      <main>
        {files.map((file) => (
          <File
            key={file.id}
            file={file}
            onChangeAlign={handleChangeAlign}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        ))}
      </main>
    </>
  );
}

export default App;
