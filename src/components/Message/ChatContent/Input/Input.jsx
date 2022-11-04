import React from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { useState } from 'react';
import axiosCilent from '../../../../api/axiosClient';
import emojiIcons from '../../../../emojis/emotion.js';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

const emotion = () => emojiIcons['Smileys & Emotion'];
const socket = io.connect('http://localhost:8000', { transports: ['websocket'] });

const cx = classNames.bind(styles);

const Input = (props) => {
    const [chatContent, setChatContent] = useState('');
    const [rerender, setRerender] = useState(false);

    const [showEmojis, setShowEmojis] = useState(false);

    const [image, setImage] = useState([]);
    const [delImg, setDelImg] = useState([]);

    const handleMultiFile = (e) => {
        setImage(e.target.files);
        setDelImg(Array.from(e.target.files));
    };

    const handleSendMessage = async (e) => {
        setShowEmojis(false);
        const formData = new FormData();
        var imgTemp = [];
        for (let i = 0; i < image.length; i++) {
            formData.append('imgs', image[i]);
            imgTemp.push(image[i]);
        }
        formData.append('conversationID', props.params.id);
        formData.append('sender', props.user.id);
        formData.append('mess', chatContent ? chatContent : '');
        try {
            await axiosCilent.post('/zola/message', formData);
            socket.emit('send-to-server', {
                senderId: props.user.id,
                conversationID: props.params.id,
                dataMess: {
                    conversationID: props.params,
                    date: new Date().getTime(),
                    id: 'temp',
                    img_url: imgTemp,
                    infoSender: {
                        fullName: props.user.fullName,
                        imageSender: props.user.img,
                    },
                    mess: chatContent,
                    sender: props.user.id,
                },
                imgs: image.length,
                fullName: props.user.fullName,
                group: props.group,
            });
            setChatContent('');
            setRerender(!rerender);
            sendData(rerender);
            setDelImg([]);
        } catch (err) {
            console.log(err);
        }
    };
    const sendData = (data) => {
        props.parentCb(data);
    };

    const handleDelImg = (i) => {
        delImg.splice(i, 1);
        setDelImg([...delImg]);
        setImage([...delImg]);
    };

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image);
        };
    }, [image]);
    return (
        <div className={cx('wrapper')}>
            <form className={cx('container')} encType="multipart/form-data">
                <div className={cx('viewChat')}>
                    <div className={cx('chatContent')}>
                        {!chatContent && (
                            <>
                                <input
                                    type="file"
                                    id="file"
                                    name="imgs"
                                    accept="file_extension|docx|doc|xlsx|xls|csv|pptx|ppt|pdf|txt"
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleMultiFile(e)}
                                />

                                <label for="file">
                                    <i className="bx bx-paperclip"></i>
                                </label>

                                {/* image & video */}
                                <input
                                    type="file"
                                    id="image"
                                    name="imgs"
                                    accept="file_extension|audio/*|video/*|image/*|media_type"
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleMultiFile(e)}
                                />
                                <Tippy
                                    visible={delImg.length > 0}
                                    interactive={true}
                                    placement="top-end"
                                    render={(attrs) => (
                                        <div className={cx('wrapper-imgs')} tabIndex="-1" {...attrs}>
                                            <div className={cx('imgs')}>
                                                {delImg.map((img, i) => (
                                                    <div key={i} className={cx('img')}>
                                                        {img.name.split('.').splice(-1)[0] === 'mp4' ? (
                                                            <video width="200" height="90" controls>
                                                                <source
                                                                    src={URL.createObjectURL(img)}
                                                                    type="video/mp4"
                                                                ></source>
                                                            </video>
                                                        ) : img.name.split('.').splice(-1)[0] === 'png' ||
                                                          img.name.split('.').splice(-1)[0] === 'jpg' ||
                                                          img.name.split('.').splice(-1)[0] === 'jpeg' ||
                                                          img.name.split('.').splice(-1)[0] === 'gif' ||
                                                          img.name.split('.').splice(-1)[0] === 'jfif' ? (
                                                            <img src={URL.createObjectURL(img)} alt="" />
                                                        ) : (
                                                            <div
                                                                style={{
                                                                    padding: '5px',
                                                                    borderRadius: '20px',
                                                                    backgroundColor: 'rgb(245, 241, 241)',
                                                                    color: '#000',
                                                                    fontWeight: '400',
                                                                    wordBreak: 'break-word',
                                                                    fontSize: '20px',
                                                                    maxWidth: '500px',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                {img.name}
                                                            </div>
                                                        )}
                                                        <i
                                                            className="bx bxs-x-circle"
                                                            style={{ color: '#bdbdbd' }}
                                                            onClick={() => handleDelImg(i)}
                                                        ></i>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                >
                                    <label for="image">
                                        <i className="bx bxs-image"></i>
                                    </label>
                                </Tippy>
                                <i className="bx bxs-file-gif"></i>
                            </>
                        )}
                    </div>
                    <input
                        type="text"
                        spellCheck="false"
                        value={chatContent}
                        onChange={(e) => setChatContent(e.target.value)}
                        className={cx('input')}
                        placeholder="Message"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                    <Tippy
                        visible={showEmojis}
                        interactive={true}
                        render={(attrs) => (
                            <div className={cx('wrapper-icons')} tabIndex="-1" {...attrs}>
                                <div className={cx('icons')}>
                                    {emojiIcons.map((icon, i) => (
                                        <div
                                            key={i}
                                            className={cx('icon')}
                                            onClick={() => setChatContent((text) => text + icon.char)}
                                        >
                                            {icon.char}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    >
                        <i
                            className="bx bx-smile"
                            onClick={() => setShowEmojis(!showEmojis)}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </Tippy>
                </div>
            </form>
            <div className={cx('button')} onClick={handleSendMessage}>
                <i className="bx bxl-telegram" style={{ color: '#0091ff' }}></i>
            </div>
        </div>
    );
};

Input.propTypes = {};

export default Input;
