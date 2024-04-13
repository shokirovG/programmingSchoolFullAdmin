// bazaga har bir hisoblarni ichidagi objectdagi month ga qarab qo`shadigan qilish kerak

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import useFetch from "@/app/hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import Chiqim from "../Сonsumption/Chiqim";
import { addTodo } from "@/app/redux/actions";
import zero from "@/app/hooks/zero";
import { v4 } from "uuid";
function Income(props) {
  const currentMonth = new Date();
  const initialDate = `${currentMonth.getFullYear()}-${zero(
    currentMonth.getMonth() + 1
  )}-${zero(currentMonth.getDate())}`;

  const [todoValue, setTodoValue] = useState(initialDate);
  const todoMonth = new Date(todoValue);

  const { request } = useFetch();
  const [todoMonthValid, setTodoMonthValid] = useState(false);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const month =
    Number(todoMonth.getMonth() + 1) + "_" + todoMonth.getFullYear();
  const newTodo = () => {
    const findItem = store.hisobot.findIndex((el) => el.month === month);
    const currentMonthData = store.hisobot.filter(
      (elem) => elem.month === month
    );
    let findDay = -100000;
    if (currentMonthData.length > 0) {
      findDay = currentMonthData[0].hisoblar.findIndex(
        (el) => Number(el.kun) === Number(todoMonth.getDate())
      );
    }

    if (store.currentMonth === month) {
      if (findItem < 0 || findDay < 0) {
        const newTodo =
          currentMonthData.length > 0
            ? [
                ...currentMonthData[0].hisoblar,
                {
                  hisobot: {
                    kirim: [],
                    chiqim: [],
                    createdAt: new Date(),
                    id: v4(),
                  },
                  kun: todoMonth.getDate(),
                },
              ]
            : [
                {
                  hisobot: {
                    kirim: [],
                    chiqim: [],
                    createdAt: new Date(),
                    id: v4(),
                  },
                  kun: todoMonth.getDate(),
                },
              ];
        request(
          `${process.env.NEXT_PUBLIC_URL}/hisobot`,
          "POST",
          JSON.stringify({
            month,
            hisoblar: newTodo,
          })
        ).then(() => {
          dispatch(addTodo(month, newTodo));
          console.log("yangi hisobot yaratildi!");
          toast.success("yangi hisobot yaratildi!");
        });
      } else {
        console.log("hisobot oldin yaratilhgan");
        toast.error("ushbu kun uchun hisobot oldin yaratilgan!");
      }
    } else {
      toast.error(`Siz yaratmoqchi bo'lgan hisobot oyi bilan , hozirgi hisobot
      oyi to'g'ri kelmadi!`);
    }
  };

  return (
    <div>
      <button
        title="yangi hisob yaratish"
        type="button"
        className="btn "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
      >
        <Image src="/add-todo.png" alt="#" width="35" height="35" />
      </button>
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                ILTIMOS HISOBOTDA BELGILANGAN OY BILAN SIZ YARATMOQCHI BO`LGAN
                OY BIR BO`LSIN!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="date"
                value={todoValue}
                onChange={(e) => {
                  setTodoValue(e.target.value);
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={newTodo}
                data-bs-dismiss="modal"
              >
                Yangi hisob yaratish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Income;
