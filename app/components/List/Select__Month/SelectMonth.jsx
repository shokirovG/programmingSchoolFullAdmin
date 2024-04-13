import React, { useEffect } from "react";
import "./month.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  changeMonthAction,
  fetchedStudents,
  fetchedWorkers,
  fetchingStudents,
  hisobotFetched,
  loaded,
} from "../../../redux/actions";
import useFetch from "../../../hooks/useFetch";
function SelectMonth() {
  const date = new Date();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { request } = useFetch();

  const changeMonth = (e) => {
    dispatch(fetchingStudents());
    request(`${process.env.NEXT_PUBLIC_URL}/workers`).then((res) => {
      const workers = res.workers.filter(
        (elem) => elem.month === e.target.value
      );

      if (workers.length > 0) {
        dispatch(fetchedWorkers(workers[0].workers));
      } else {
        dispatch(fetchedWorkers([]));
      }
    });
    request(`${process.env.NEXT_PUBLIC_URL}/hisobot`).then((res) => {
      const currentHisobot = res.hisoblar.filter(
        (el) => el.month === localStorage.getItem("currentMonth")
      );
      dispatch(hisobotFetched(currentHisobot));
    });

    localStorage.setItem("currentMonth", e.target.value);
    dispatch(changeMonthAction(e.target.value));
    const options = document.querySelectorAll("#monthOption");

    for (let option of options) {
      if (option.value == localStorage.getItem("currentMonth")) {
        option.setAttribute("selected", true);
        option.classList.add("active__month");
      } else {
        option.removeAttribute("selected");
        option.classList.remove("active__month");
      }
    }
    request(`${process.env.NEXT_PUBLIC_URL}/students`).then((res) => {
      let k = 0;
      for (let elem of res.students) {
        if (elem.month === localStorage.getItem("currentMonth")) {
          k++;

          dispatch(fetchedStudents(elem.students));
        }
      }
      if (k === 0) {
        dispatch(fetchedStudents([]));
      }
    });
  };
  useEffect(() => {
    const options = document.querySelectorAll("#monthOption");

    for (let option of options) {
      if (option.value == localStorage.getItem("currentMonth")) {
        option.setAttribute("selected", true);
        option.classList.add("active__month");
      } else {
        option.removeAttribute("selected");
        option.classList.remove("active__month");
      }
    }
    if (localStorage.getItem("currentMonth") == null) {
      localStorage.setItem(
        "currentMonth",
        `${date.getMonth() + 1}_${date.getFullYear()}`
      );
      dispatch(
        changeMonthAction(`${date.getMonth() + 1}_${date.getFullYear()}`)
      );
    } else {
      dispatch(changeMonthAction(localStorage.getItem("currentMonth")));
    }
  }, []);
  return (
    <div className="selectdiv">
      <label>
        <select onChange={changeMonth}>
          <option selected disabled></option>
          <option id="monthOption" value="1_2024">
            Yanvar
          </option>
          <option id="monthOption" value="2_2024">
            Fevral
          </option>
          <option id="monthOption" value="3_2024">
            Mart
          </option>
          <option id="monthOption" value="4_2024">
            Aprel
          </option>
          <option id="monthOption" value="5_2024">
            May
          </option>
          <option id="monthOption" value="6_2024">
            Iyun
          </option>
          <option id="monthOption" value="7_2024">
            Iyul
          </option>
          <option id="monthOption" value="8_2024">
            Avgust
          </option>
          <option id="monthOption" value="9_2024">
            Sentabr
          </option>
          <option id="monthOption" value="10_2024">
            Oktabr
          </option>
          <option id="monthOption" value="11_2024">
            Noyabr
          </option>
          <option id="monthOption" value="12_2023" className="active__month">
            Dekabr
          </option>
        </select>
      </label>
    </div>
  );
}

export default SelectMonth;
