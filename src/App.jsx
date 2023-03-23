import React, { useState } from "react";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import './App.css';
const DropDownList = React.lazy(() => import('../components/DropDownList'));
const EditorComponent = React.lazy(() => import('../components/EditorComponent/EditorComponent'));

function App() {

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto">
        <p className='text-slate-600 mb-3 font-semibold'>Rich Editor</p>
        <div className="border rounded">
          <div className="h-10 border-b"></div>
          <div className="p-3 bg-[#fcfbfb] relative">
            <h1 className="text-2xl font-semibold mb-3 text-slate-600">This is the title</h1>
            <EditorComponent 
              editorState={editorState} 
              handleChange={onEditorStateChange} />
            <DropDownList 
              editorState={editorState} 
              setEditorState={setEditorState} 
              onEditorStateChange={onEditorStateChange}
              />
          </div>
          <div className="bg-white px-3 py-2 border-t">
            <div className="flex flex-row justify-end">
              <p className="text-xs">0 / 1000 words</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-3">
            <button className="text-white bg-green-700 hover:bg-green-600 px-3 py-1.5 w-24 rounded">Post</button>
        </div>
      </div>
    </div>
  )
}

export default App
