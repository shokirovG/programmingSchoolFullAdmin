import useFetch from "@/app/hooks/useFetch";
import { hisobotFetched } from "@/app/redux/actions";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import { toast } from "react-toastify";
import Image from "next/image";
import React from "react";

const RemoveItem = ({kun}) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  const removeTodo = () => {
    const newHisoblar = store.hisobot[0].hisoblar.filter(
      (elem) => elem.kun != localStorage.getItem("currentDay")
    );
    request(
      `${process.env.NEXT_PUBLIC_URL}/hisobot`,
      "POST",
      JSON.stringify({
        month: localStorage.getItem("currentMonth"),
        hisoblar: newHisoblar,
      })
    ).then(() => {
      dispatch(
        hisobotFetched([
          {
            hisoblar: newHisoblar,
            month: localStorage.getItem("currentMonth"),
          },
        ])
      );

      toast.error("hisobot o`chirildi!");
    });
  };
  return (
    <div>
      <button
        title="hisobotni o`chirish"
        type="button"
        className="btn "
        data-bs-toggle="modal"
        data-bs-target="#exampleModalRemove"
        onClick={() => {
          localStorage.setItem("currentDay", kun);
        }}
      >
        <Image src="/remove.png" alt="#" width="30" height="15" />
      </button>
      <div
        className="modal fade"
        id="exampleModalRemove"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {" "}
                Shu kungi hisobotni o`chirish
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h6>
                Hisobotni o`chirishni aniq istaysizmi ? <br /> (barcha
                ma`lumotlar o`chib ketadi)
              </h6>{" "}
              <br />
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={removeTodo}
              >
                O`chirish
              </button>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveItem;
