import React from 'react';
import { Modal, Button, Switch } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ContentState, EditorState, Modifier } from "draft-js";
import htmlToDraft from "html-to-draftjs";

import { EditorModalProps } from '../../constants/type';
import TextInput from '../TextInput/TextInput';


const SocialModal = ({ openModal, closeModal, setEditorState, editorState } : EditorModalProps ) => {
 
  const handleOk = () => {
    closeModal(false);
  };
  const handleCancel = () => {
    closeModal(false);
  };

  const formik = useFormik({
      initialValues: {
          video_provider: "",
          url: "",
          code : "",
      },
      validationSchema: Yup.object({
          video_provider: Yup.string().required('Required'),
          url: Yup.string().required('url required.'), 
          code: Yup.string(), 
      }),
      validateOnMount : true,     
      onSubmit: (values) => {
          const { url, video_provider } = values;
          const htmlResult = htmlBuilder({ label: video_provider, url });
          insertIntoEditor(htmlResult);
          closeModal(false);
      },
  });

  const htmlBuilder = ({ url, label }: { url: string; label: string }) => {
    const html = `<a href=${encodeURI(
      url
    )} target="_blank" rel="noopener noreferrer">${label}</a>`;
    return html;
  };

  const insertIntoEditor = async (content: string) => {
    const { contentBlocks, entityMap } = htmlToDraft(content);

    const fragmentToBeInserted = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      ContentState.createFromBlockArray(contentBlocks, entityMap).getBlockMap()
    );

    const editorWithInsert = EditorState.push(
      editorState,
      fragmentToBeInserted,
      "insert-fragment"
    );

    const newEditorState = EditorState.moveSelectionToEnd(editorWithInsert);
    setEditorState(newEditorState);
  };

  const onChange = (checked: boolean) => {
      console.log(`switch to ${checked}`);
  };

  const handleChange = (event : any) => {
    const value = event.target.value;
    const urlIsNotValid = formik.touched["url"] && (formik.errors["url"] as string)?.length > 0;

    // If the url is valid and the provider is not empty
    if (urlIsNotValid === false && formik.values.video_provider !== "") {
      const { video_provider } = formik.values;
      const htmlResult = htmlBuilder({
        label: video_provider,
        url: value,
      });
      
      // Set the code value
      formik.setFieldValue("code", htmlResult);
    }
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
            loading={formik.isSubmitting}
            onClick={() => formik.submitForm()}
            style={{background : "#16803C", color : "white", border : "none"}}
            >
            Embed
          </Button>,
      ]}
      >
        <form action="">
          <div className="flex flex-col mb-4">
            <label htmlFor="video_provider" className='text-xs text-slate-600'>
              SOCIAL MEDIA PLATFORM
            </label>
            <select 
            name="video_provider" 
            className='border border-[#d1d1d1"] mt-2 p-2 text-slate-500 rounded outline-0'
            value={formik.values.video_provider}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            >
              <option value="" disabled selected>Choose provider</option>
              <option value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
              <option value="Instagram">Instagram</option>
            </select>
            {
            formik.touched.video_provider && formik.errors.video_provider ? (
                <div className='text-red-600 text-sm'>{formik.errors.video_provider}</div>
            ) : null}
          </div>
          <TextInput
              name="url" 
              placeholder="https://example.com"  
              value={formik.values.url}
              onChange={(e) => handleChange(e)}
              onBlur={formik.handleBlur}
              label="URL"
              formik={formik}
              type={"text"}
              disabled={false}
            />
          <TextInput 
              name="code" 
              placeholder=""  
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="CODE"
              formik={formik}
              type={"text"}
              disabled={false}
            />
            <div className="flex justify-between mb-6">
                <p className='text-sm font-light'>Disable caption</p>
                <Switch size="small" title='Remember me' onChange={onChange} style={{background : "#009946"}} />
            </div>
        </form>
      </Modal>
    </>
  );
};

export default SocialModal;