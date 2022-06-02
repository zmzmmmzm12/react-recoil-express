import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { todoState } from "../store/TodoState";
import Loading from "../component/Loading";
import ErrorBoundary from "../component/ErrorBoundary";
import TodoItem from "../component/TodoItem";

import "../scss/Todo.scss";

const Todo = () => {
  const [textValue, setTextValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [todo, setTodo] = useRecoilState(todoState);
  const date = new Date();

  useEffect(() => {
    setDateValue(date.toISOString().split("T")[0]);
    async function getData() {
      try {
        const { data } = await axios.get("/api/todo");
        setTodo(data);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);

  const onAddList = () => {
    if (textValue.length === 0) {
      alert("할 일을 입력하세요.");
      return;
    }
    (async () => {
      const { data } = await axios.post(
        "/api/todo",
        {
          title: textValue,
          date: dateValue,
        },
        {
          withCredentials: true,
        }
      );
      setTodo(data);
    })();

    setTextValue("");
    setDateValue(date.toISOString().split("T")[0]);
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={Loading}>
        <div className="todoList">
          <div className="todo">
            <input
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <input
              type="date"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            />
            <button type="button" onClick={onAddList}>
              추가
            </button>
          </div>
          <div className="list">
            <div className="item">
              <div className="th idx">번호</div>
              <div className="th title">할 일</div>
              <div className="th date">마감기한</div>
              <div className="th etc">수정</div>
              <div className="th etc">삭제</div>
            </div>
            {todo?.map((item, index) => (
              <TodoItem item={item} index={index} key={item.idx} />
            ))}
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Todo;
