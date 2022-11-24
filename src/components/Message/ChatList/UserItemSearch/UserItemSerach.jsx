import { AuthContext } from '../../../../context/AuthContext';
import axiosCilent from '../../../../api/axiosClient';
import { useContext, useEffect, useState } from 'react';
import style from './UserItemSearch.module.scss';
import { io } from 'socket.io-client';
import classNames from 'classnames/bind';
const socket = io.connect('http://localhost:8000', { transports: ['websocket'] });

const cx = classNames.bind(style);

const UserItemSearch = ({ name, ava, con, mess, button = false }) => {
    const { user } = useContext(AuthContext);

    const [userChat, setUserChat] = useState(null);
    useEffect(() => {
        const friendID = con?.members.find((m) => m !== user.id);
        const getInfoFriends = async () => {
            try {
                const res = await axiosCilent.get('/zola/users/' + friendID);
                setUserChat(res);
            } catch (error) {
                console.log(error);
            }
        };
        getInfoFriends();
    }, [con?.members, user]);
    let img = '';
    let ten = '';
    if (con?.group) {
        img = con.avatarGroup;
        ten = con.groupName;
    } else {
        img = userChat?.img;
        ten = userChat?.fullName;
    }

    const handleTranferMess = async () => {
        const message = { sender: user.id, mess: mess.mess, conversationID: con.id, listImg: mess.img_url };
        try {
            await axiosCilent.post('/zola/message', message);
            socket.emit('send-to-server', {
                senderId: user.id,
                conversationID: con.id,
                dataMess: {
                    conversationID: con.id,
                    date: new Date().getTime(),
                    id: 'temp',
                    img_url: mess.img_url,
                    infoSender: {
                        fullName: user.fullName,
                        imageSender: user.img,
                    },
                    mess: mess.mess,
                    sender: user.id,
                },
                imgs: mess.img_url.length,
                fullName: user.fullName,
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img src={ava ? ava : img} alt="" />
            </div>
            <div className={cx('name')}>
                <span>{name ? name : ten}</span>
            </div>
            {button && (
                <button className={cx('btn-add-frend')} onClick={handleTranferMess}>
                    {button}
                </button>
            )}
        </div>
    );
};

export default UserItemSearch;
