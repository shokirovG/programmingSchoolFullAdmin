import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  fetchedMajburiy,
  spinnerLoaded,
  spinnerLoading,
} from "@/app/redux/actions";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import useFetch from "@/app/hooks/useFetch";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import Spinner from "../../Students/Spinner";
import numberTrim from "@/app/hooks/number";
function ForcedExit(props) {
  const store = useSelector((state) => state);
  const { request } = useFetch();
  const dispatch = useDispatch();
  const [chiqimValue, setChiqimValue] = useState("");
  const [miqdorValue, setMiqdorValue] = useState();
  const [data, setData] = useState([]);
  const [removeShow, setRemoveShow] = useState(true);
  const removeChiqim = (id) => {
    setRemoveShow(false);
    const chiqimlar = store.majburiyChiqimlar[0].chiqimlar.filter(
      (el) => el.id !== id
    );
    request(
      `${process.env.NEXT_PUBLIC_URL}/chiqimlar`,
      "POST",
      JSON.stringify({
        month: localStorage.getItem("currentMonth"),
        chiqimlar: chiqimlar,
      })
    ).then((res) => {
      dispatch(
        fetchedMajburiy([
          { month: localStorage.getItem("currentMonth"), chiqimlar },
        ])
      );
      setRemoveShow(true);
      toast.error("o'chirildi");
    });
  };
  const addChiqim = () => {
    dispatch(spinnerLoading());
    const newChiqim = {
      id: v4(),
      chiqimNomi: chiqimValue,
      chiqimMiqdori: miqdorValue,
    };
    const chiqimlar = store.majburiyChiqimlar.map((elem) => {
      if (elem.month === localStorage.getItem("currentMonth")) {
        return {
          ...elem,
          chiqimlar: [...elem.chiqimlar, newChiqim],
        };
      } else {
        return elem;
      }
    });
    console.log("chiqimlar", store.majburiyChiqimlar);
    request(
      `${process.env.NEXT_PUBLIC_URL}/chiqimlar`,
      "POST",
      JSON.stringify({
        month: localStorage.getItem("currentMonth"),
        chiqimlar: chiqimlar[0].chiqimlar,
      })
    ).then((res) => {
      dispatch(fetchedMajburiy(chiqimlar));
      toast.success("bazaga qo`shildi!");
      dispatch(spinnerLoaded());
      setChiqimValue("");
      setMiqdorValue(0);
    });
  };
  useEffect(() => {
    request(`${process.env.NEXT_PUBLIC_URL}/chiqimlar`).then((res) => {
      const currentMonthChiqim = res.chiqimlar.filter(
        (el) => el.month === localStorage.getItem("currentMonth")
      );
      console.log("use", res);
      dispatch(fetchedMajburiy(currentMonthChiqim));
    });
  }, []);
  useEffect(() => {
    const currentMonthChiqim = store.majburiyChiqimlar.filter(
      (el) => el.month === localStorage.getItem("currentMonth")
    );

    currentMonthChiqim[0] && setData(currentMonthChiqim[0].chiqimlar);
  }, [store]);
  return (
    <div className="">
      <button
        title="majburiy chiqim"
        type="button"
        className="btn "
        data-bs-toggle="modal"
        data-bs-target="#exampleModalLabelForced"
      >
        <Image src="/check-list.png" alt="#" width="35" height="35" />
      </button>
      <div
        className="modal fade"
        id="exampleModalLabelForced"
        tabIndex="-1"
        aria-labelledby="exampleModalLabelForced"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Majburiy chiqimlar
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div class="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  style={{ fontSize: "15px" }}
                  placeholder="Majburiy chiqim nomi"
                  value={chiqimValue}
                  onChange={(e) => {
                    setChiqimValue(e.target.value);
                  }}
                />
                <input
                  type="number"
                  className="form-control"
                  style={{ fontSize: "15px" }}
                  placeholder="miqdori"
                  value={miqdorValue}
                  onChange={(e) => {
                    setMiqdorValue(e.target.value);
                  }}
                />
                <div>
                  {store.spinnerLoader === "loading" ? (
                    <Spinner />
                  ) : (
                    <button
                      class="btn btn-outline-success"
                      type="button"
                      onClick={addChiqim}
                    >
                      Qo`shish
                    </button>
                  )}
                </div>
              </div>

              <ol className="list-group list-group-numbered">
                {data.map((elem) => (
                  <li key={elem.id} className="list-group-item d-flex   ">
                    <div className="flex pl-[5px] gap-[20px] ">
                      {" "}
                      <span>{elem.chiqimNomi}</span>{" "}
                      <span className="text-blue-500">
                        {numberTrim(elem.chiqimMiqdori)} so`m
                      </span>
                    </div>
                    {removeShow ? (
                      <Image
                        className="absolute right-[5px] cursor-pointer"
                        src="/remove.png"
                        alt="#"
                        width="20"
                        height="20"
                        onClick={() => {
                          removeChiqim(elem.id);
                        }}
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForcedExit;
