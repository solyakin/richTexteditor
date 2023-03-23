import React, { useState } from 'react';
import { Modal, Upload, message, Button } from 'antd';
import type { UploadProps } from 'antd';
import { AtomicBlockUtils } from "draft-js";

import { EditorModalProps, ImageTypeProps } from '../../constants/type';
import { axiosInstance } from '../../utils/axiosInstance';
import { CLOUDINARY_PRESET, CLOUD_NAME } from '../../config/envariables';
import { ErrorHandler } from '../../utils/errorHandler';
import { AxiosError } from 'axios';


const PictureModal = ({ openModal, closeModal, editorState, setEditorState } : EditorModalProps ) => {
 
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<ImageTypeProps>();

    const dummyRequest = async ({ file, onSuccess } : any) => {    
        setTimeout(() => {
        onSuccess("ok");
        }, 0);
    }

    const props: UploadProps = {
        customRequest: dummyRequest,
        beforeUpload: (file) => {
        const isPNG = file.type === 'image/png';
        const isJPEG = file.type === 'image/jpeg';
        const isJPG = file.type === 'image/jpg';
        if (!isPNG && !isJPG && !isJPEG) {
            message.error(`${file.name} is not a png, jpg or jpeg format`);
        }
        return isPNG || isJPG || isJPEG || Upload.LIST_IGNORE;
        },
        onChange: ({ file}) => {
            setFile(file.originFileObj);
        },
    };

    const embedImage2Editor = async (url : string) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "IMAGE",
            "IMMUTABLE",
            {
                src : url,
            }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const atomicBlock = AtomicBlockUtils.insertAtomicBlock(
            editorState,
            entityKey,
            " "
        );
        setEditorState(atomicBlock);
        closeModal(false);
    }

    //upload to cloudinary server
    const uploadImageToImgur = async (data: any) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("upload_preset", CLOUDINARY_PRESET);
        formData.append("cloud_name", CLOUD_NAME);
        formData.append("file", data);

        try {
            const response = axiosInstance({
                method: "POST",
                data: formData,
            });
            const image_url = await response;
            const src = image_url.data.secure_url;  
            embedImage2Editor(src);
            setLoading(false);
        } catch (error) {
            const error_msg = ErrorHandler(error as AxiosError);
            console.log(error_msg);
            setLoading(false);
        }
    };

    const handleOk = () => {
        uploadImageToImgur(file)
    };
    const handleCancel = () => {
        closeModal(false);
    };

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
                onClick={handleOk}
                loading={loading}
                style={{background : "#16803C", color : "white", border : "none"}}
                >
                Embed
            </Button>,
        ]}
        >
            <p className='font-base text-slate-600 text-sm mb-4'>Upload Image</p>
            <p className='font-light text-xs text-slate-700 my-2'>FILE UPLOAD</p>
            <div className="video-upload">
            <Upload 
            {...props}
                >
                <button className='text-xxs border px-3 py-1 rounded text-slate-500 font-light border-green-500'>
                    Import Image from Device
                </button>
            </Upload>
            </div>
        </Modal>
        </>
    );
};

export default PictureModal;