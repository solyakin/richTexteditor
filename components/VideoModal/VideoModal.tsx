import React from 'react';
import { Modal, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AtomicBlockUtils  } from "draft-js";

import { EditorModalProps } from '../../constants/type';
import TextInput from '../TextInput/TextInput';
import { embedYoutubeVideo, embedVimeoVideo } from '../../utils/embedConverter';


const VideoModal = ({ openModal, closeModal, editorState, setEditorState } : EditorModalProps ) => {
 
  const handleOk = () => {
    closeModal(false);
  };
  const handleCancel = () => {
    closeModal(false);
  };

  const formik = useFormik({
    initialValues: {
        video_provider: "",
        url: ""
    },
    validationSchema: Yup.object({
        video_provider: Yup.string().required('Required'),
        url: Yup.string().required('url required.') 
    }),
    validateOnMount : true,     
    onSubmit: (values, onSubmitProps) => {
        if(values.video_provider === "Youtube"){
          const embedd_link = embedYoutubeVideo(values.url)
          embedVideo2Editor(embedd_link, onSubmitProps)
        }else if(values.video_provider === "Vimeo"){
          const embedd_link = embedVimeoVideo(values.url)
          embedVideo2Editor(embedd_link, onSubmitProps)
        }
    },
  });

  const embedVideo2Editor = async (embedd_link : string, onSubmitProps : any) => {
    const editorContent = editorState.getCurrentContent();
    const contentWithEntity = editorContent.createEntity(
      'EMBEDDED_LINK',
      'MUTABLE',
      { src: embedd_link }
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    setEditorState(newEditorState);
    closeModal(false);
    formik.resetForm();
  }

  return (
    <>
      <Modal title="Embed" open={openModal} 
      onOk={handleOk} 
      onCancel={handleCancel}
      centered
      footer={[
          <Button 
            key="back" 
            onClick={handleCancel}
            >
            Cancel
          </Button>,
          <Button 
            key="submit" 
            onClick={() => formik.submitForm()}
            loading={formik.isSubmitting}
            style={{background : "#16803C", color : "white", border : "none"}}
            >
            Embed
          </Button>,
      ]}
      >
        <form>
          <div className="flex flex-col mb-4">
            <label htmlFor="video_provider" className='text-xs text-slate-600'>
              VIDEO PROVIDER
            </label>
            <select 
            name="video_provider" 
            className='border border-[#d1d1d1"] mt-2 p-2 text-slate-500 rounded outline-0'
            value={formik.values.video_provider}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            >
              <option value="" disabled>Choose provider</option>
              <option value="Youtube">Youtube</option>
              <option value="Vimeo">Vimeo</option>
              <option value="Dailymotion">Dailymotion</option>
            </select>
            {
            formik.touched.video_provider && formik.errors.video_provider ? (
                <div className='text-red-600 text-sm'>{formik.errors.video_provider}</div>
            ) : null}
          </div>
          <TextInput 
              name="url" 
              placeholder=""  
              value={formik.values.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="URL"
              formik={formik}
              type={"text"}
              disabled={false}
            />
        </form>
      </Modal>
    </>
  );
};

export default VideoModal;