import { EditorState } from "draft-js";
import { Dispatch, SetStateAction } from "react";

export type EditorStateProps = {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  onEditorStateChange? : Dispatch<SetStateAction<EditorState>>;
}