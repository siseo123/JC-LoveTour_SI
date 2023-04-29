import React, { useCallback, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useInput from '../../hooks/useInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { UPDATE_RESERVE_REQUEST } from '../../reducers/post';
import { useDispatch, useSelector } from 'react-redux';

function reserveBoardUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, onChangeName] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [reserveDate, onChangeReserveDate] = useInput('');
  const [phoneNum, onChangePhoneNum] = useInput('');
  const [text, onChangeText] = useInput('');

  const { post } = location.state || {};

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!text || !text.trim()) {
        return alert('게시글을 작성하세요');
      }
      navigate('/board/reserve/'); // 이전페이지로 이동
      return dispatch({
        type: UPDATE_RESERVE_REQUEST,
        data: {
          postId: post.id,
          name: name,
          password: password,
          reserveDate: reserveDate,
          phoneNumber: phoneNum,
          content: text,
        },
      });
    },
    [name, text, password, reserveDate, phoneNum]
  );

  return (
    <>
      <h1>예약 수정하기</h1>
      <Form onSubmit={onSubmitForm}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>이름</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="이름을 입력해주세요. "
            value={name}
            onChange={onChangeName}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="예약 비밀번호를 입력해주세요 "
            value={password}
            onChange={onChangePassword}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="reserveDate">
          <Form.Label>예약날짜</Form.Label>
          <Form.Control
            name="reserveDate"
            type="reserveDate"
            placeholder="2023-00-00"
            value={reserveDate}
            onChange={onChangeReserveDate}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phoneNum">
          <Form.Label>휴대폰번호</Form.Label>
          <Form.Control
            name="phoneNum"
            type="phoneNum"
            placeholder="010-0000-0000"
            value={phoneNum}
            onChange={onChangePhoneNum}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="text">
          <Form.Label>내용</Form.Label>
          <Form.Control
            name="text"
            type="text"
            placeholder="내용을 입력해주세요. "
            value={text}
            onChange={onChangeText}
          />
        </Form.Group>
        <div>
          <Button variant="primary" type="submit">
            수정하기
          </Button>
        </div>
      </Form>
    </>
  );
}

export default reserveBoardUpdate;