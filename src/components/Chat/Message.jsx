import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SentUser } from '../../states/ChatState';
import { LoginUserId } from '../../states/LoginState';
import style from './Chat.module.css'
import styled from 'styled-components'

function Message({ message, sentUser, time, user }) {
  const loginUserId = useRecoilValue(LoginUserId)
  const date = new Date(time);
  const year = date.getFullYear().toString(); //년도
  const month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
  const day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
  const hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
  const minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
  // const second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)
  const returnDate = hour >= 12 ? `오후 ${hour % 12}:${minute}` : `${hour}:${minute}`;

  const getTime = (hour, minute) => {
    let time = '';
    if (hour < 12) {
      time = `오전 ${hour}:${minute}`;
    } else {
      if (hour == 12) {
        time = `오후 ${hour}:${minute}`;
      } else {
        time = `오후 ${hour % 12}:${minute}`;
      }
    }
    return time;
  }

  const isMessageMine = (sentUser) => {
    return loginUserId === sentUser.id;
  }

  return (
    <div className={style.messageContainer} style={{ justifyContent: isMessageMine(sentUser) && "flex-end" }}>
      {!isMessageMine(sentUser) &&
        <img
          style={{ borderRadius: '50%', marginRight: '8px' }}
          width={32}
          height={32}
          className="mr-3"
          src={user.image}
          alt={user.name}
        />
      }
      <div className={style.userInfo} style={{ textAlign: isMessageMine(sentUser) ? "right" : "left" }}>
        {isMessageMine(sentUser)
          ? <UserName isMessageMine={isMessageMine(sentUser)}>
            {sentUser.name}
          </UserName>
          : <UserName isMessageMine={isMessageMine(sentUser)}>
            {user.name}
          </UserName>
        }
        <div>
          {isMessageMine(sentUser) && <span style={{ fontSize: '10px', marginRight: '6px' }}>{getTime(hour, minute)}</span>}
          <span className={style.message} style={{ backgroundColor: isMessageMine(sentUser) ? "#FFE9B1" : "#F1F3F5" }}>
            {message}
          </span>
          {!isMessageMine(sentUser) && <span style={{ fontSize: '10px', marginLeft: '6px' }}>{getTime(hour, minute)}</span>}
        </div>
      </div>
      {isMessageMine(sentUser) &&
        <img
          style={{ borderRadius: '50%', marginLeft: '8px' }}
          width={32}
          height={32}
          className="mr-3"
          src={sentUser.image}
          alt={sentUser.name}
        />
      }
    </div>
  )
}

export default Message;

const UserName = styled.span`
  margin: ${(props) => props.isMessageMine ? "0 4px 4px 0" : "0 0 4px 4px"};
  font-size: 11px;
`;