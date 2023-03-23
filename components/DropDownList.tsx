import React, { useState } from 'react';
import { 
  PlusOutlined, 
  PictureOutlined, 
  VideoCameraOutlined, 
  LinkOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import DropDownItem from './DropDownItem/DropDownItem';
import VideoModal from './VideoModal/VideoModal';
import PictureModal from './PictureModal/PictureModal';
import SocialModal from './SocialModal/SocialModal';
import { EditorStateProps } from './type';

const DropDownList = ({editorState, setEditorState, onEditorStateChange} : EditorStateProps) => {

  const [isPictureModalOpen, setPictureIsModalOpen] = useState(false);
  const [isVideoModalOpen, setVideoIsModalOpen] = useState(false);
  const [isSocialModalOpen, setSocialIsModalOpen] = useState(false);

  const showPictureModal = () => {
    setPictureIsModalOpen(true);
  };
  const showVideoModal = () => {
    setVideoIsModalOpen(true);
  };
  const showSocialModal = () => {
    setSocialIsModalOpen(true);
  };

  const items: MenuProps['items'] = [
    {
      label: <p className='text-sm font-light text-slate-500'>EMBEDS</p>,
      key: '0',
    },
    {
      label: <DropDownItem 
                icon={<PictureOutlined />}
                title="Picture"
                format={"jpeg, png"}
                handleClick={showPictureModal}
              />,
      key: '1',
    },
    {
      label: <DropDownItem 
            icon={<VideoCameraOutlined />}
            title="Video"
            format={"jw player, Youtube, Vimeo"}
            handleClick={showVideoModal}
          />,
      key: '2',
    },
    {
      label: <DropDownItem 
            icon={<LinkOutlined />}
            title="Social"
            format={"Instagram, Twitter, TikTok, SnapChat, Facebook"}
            handleClick={showSocialModal}
          />,
      key: '3',
    },
  ];

  return(
    <>
      <Dropdown 
        menu={{ items }} 
        trigger={['click']}
        overlayStyle={{width : "250px"}}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space 
          style={{cursor : "pointer", background : "#E7F1E9", borderRadius : "50%"}}
          >
            <PlusOutlined style={{padding : "6px", font : "14px"}}/>
          </Space>
        </a>
      </Dropdown>
      <PictureModal 
      editorState={editorState} 
      setEditorState={setEditorState} 
      openModal={isPictureModalOpen} 
      closeModal={setPictureIsModalOpen} 
      />
      <VideoModal 
      openModal={isVideoModalOpen} 
      closeModal={setVideoIsModalOpen} 
      editorState={editorState} 
      setEditorState={setEditorState}
      onEditorStateChange={onEditorStateChange}
      />
      <SocialModal openModal={isSocialModalOpen} closeModal={setSocialIsModalOpen}/>
    </>
)}

export default DropDownList;