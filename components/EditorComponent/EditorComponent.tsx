import React from 'react'
import { Editor  } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { embedVimeoVideo, embedYoutubeVideo } from '../../utils/embedConverter';

const EditorComponent = ({ editorState, handleChange}) => {

    const embedVideoCallBack = (link : string) =>{
        if (link.indexOf("youtube") >= 0){
            return embedYoutubeVideo(link)
        }else if(link.indexOf("vimeo") >= 0){
          return embedVimeoVideo(link)
        }
    }

  return (
    <div>
        <Editor
            toolbar={{
              options: [
                "blockType",
                "link",
                "image",
                "inline",
                "list",
                "textAlign",
                'embedded',
                "history",
              ],
              blockType: {
                inDropdown: true,
                options: [
                  "H1",
                  "H2",
                  "H3",
                  "H4",
                  "H5",
                  "H6",
                  "Normal",
                  "Blockquote",
                  "Code",
                ],
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
              },
              inline: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ["bold", "italic", "underline", "strikethrough"],
              },
              list: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ["unordered", "ordered"],
              },
              embedded:{
                embedCallback: embedVideoCallBack
              }
            }}
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(value: EditorState) => {
              handleChange(value);
            }}
        />
    </div>
  )
}

export default EditorComponent