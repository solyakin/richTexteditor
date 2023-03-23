export type EditorModalProps = {
    openModal : boolean;
    closeModal : (open : boolean) => void;
    editorState? : any;
    setEditorState? : any;
    onEditorStateChange? : any;
}


export type ImageTypeProps = {
    lastModified? : number;
    lastModifiedDate? : any;
    name : string;
    originFileObj? : any;
    percent? : number;
    response? : string;
    size? : number;
    status? : string;
    type ?: string
    uid : string
    xhr? : any
}