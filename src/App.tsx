import "./App.css";
import { useFiles, useZoom } from "./hooks";
import { Button, File } from "./components";

function App() {
  const {
    files,
    handleAddFile,
    handleChangeAlign,
    handleAddProduct,
    handleDeleteProduct,
    handleMoveFile,
    handleMoveProduct,
  } = useFiles();
  const { zoomLevel, handleZoomIn, handleZoomOut } = useZoom();
  return (
    <>
      <header className="header">
        <h4>Gestión de categorías</h4>
        <div className="header-actions">
          <button className="button-header" onClick={handleAddFile}>
            Agregar fila
          </button>
        </div>
      </header>
      <main className="main">
        <div className="zoom-controls">
          <Button icon="zoom_in" title="Zoom In" onClick={handleZoomIn} />
          <Button icon="zoom_out" title="Zoom Out" onClick={handleZoomOut} />
        </div>
        <div
          className="files-container"
          style={{
            transform: `scale(${zoomLevel})`,
          }}
        >
          {files.map((file) => (
            <File
              key={file.id}
              file={file}
              onChangeAlign={handleChangeAlign}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              onMoveFile={handleMoveFile}
              onMoveProduct={(idMove, idAfter) =>
                handleMoveProduct(idMove, idAfter, file.id)
              }
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
