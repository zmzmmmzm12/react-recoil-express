import React, { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { todoState } from "../store/TodoState";

const TodoItem = ({ item, index }) => {
  const [todo, setTodo] = useRecoilState(todoState);
  const [title, setTitle] = useState(item.title);
  const [date, setDate] = useState(item.date);
  const [isModify, setIsModify] = useState(false);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const modifyList = () => {
    if (isModify) {
      (async () => {
        const { data } = await axios.put(
          `/api/todo/${item.idx}`,
          {
            title: title,
            date: date,
          },
          {
            withCredentials: true,
          }
        );
        setTodo(data);
      })();
    }
    setIsModify(!isModify);
  };

  const deleteList = () => {
    // eslint-disable-next-line no-restricted-globals
    const isDelete = confirm("정말 삭제하시겠습니까?");
    if (isDelete) {
      (async () => {
        const { data } = await axios.delete(`/api/todo/${item.idx}`, {
          withCredentials: true,
        });
        setTodo(data);
      })();
    }
  };

  return (
    <div className="item">
      <div className="td idx">{index + 1}</div>
      <div className="td title">
        {isModify ? (
          <input type="text" value={title} onChange={onChangeTitle} />
        ) : (
          title
        )}
      </div>
      <div className="td date">
        {isModify ? (
          <input type="date" value={date} onChange={onChangeDate} />
        ) : (
          date
        )}
      </div>
      <div className="td etc">
        <button type="button" onClick={modifyList}>
          {isModify ? "확인" : "수정"}
        </button>
      </div>
      <div className="td etc">
        <button type="button" onClick={deleteList}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
