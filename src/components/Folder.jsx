/* eslint-disable react/prop-types */

import { useState } from "react";

const Folder = ({ explorer }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const addFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // Add Logic
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div
          className="folder"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <span>
            {expand ? "📂" : "📁"}
            {explorer.name}
          </span>
          <div>
            <button
              onClick={(e) => {
                handleNewFolder(e, true);
              }}
            >
              Folder +
            </button>
            <button
              onClick={(e) => {
                handleNewFolder(e, false);
              }}
            >
              File +
            </button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 24 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onBlur={() => {
                  setShowInput({ ...showInput, visible: false });
                }}
                onKeyDown={addFolder}
                className="inputContainer__input "
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            // return <span key={exp.id}>{exp.name}</span>;
            return <Folder explorer={exp} key={exp.id} />;
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄{explorer.name}</span>;
  }
};

export default Folder;
