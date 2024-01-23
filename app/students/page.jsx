"use client";
import Image from "@/node_modules/next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./students.scss";
import React, { useEffect, useState, useRef } from "react";
import useFetch from "../hooks/useFetch";
import { v4 } from "uuid";
import numberTrim from "../hooks/number";
import { calcPrice } from "../hooks/calcPrice";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import moment from "moment";
import StudentChangeModal from "../components/Students/StudentChangeModal";
import Loader from "../components/Loader/Loader";
import Spinner from "../components/Students/Spinner";
import StudentsItem from "../components/Students/StudentsItem";
import {
  fetchedStudents,
  fetchingStudents,
  addStudent,
  loaded,
  spinnerLoading,
  spinnerLoaded,
} from "../redux/actions";
import { CSSTransition, TransitionGroup } from "react-transition-group";
/* eslint-disable */
const page = () => {
  const [group, setGroup] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [validText, setValidText] = useState(false);
  const [foiz, setFoiz] = useState(0);
  const [students, setStudents] = useState([]);
  const { request } = useFetch();
  const params = useParams();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const currentMonth = store.currentMonth;
  const [filterStudents, setFilterStudents] = useState([]);
  const [filterGroup, setFilterGroup] = useState("Barcha guruhlar");
  const initial = useRef(false);
  console.log("params", params);
  const addStudentForm = (e) => {
    e.preventDefault();
    dispatch(spinnerLoading());
    console.log("form mount");
    // dispatch(fetchingStudents());
    if (group !== "" && department !== "") {
      const newStudent = {
        group,
        department,
        name,
        price: 0,
        id: v4(),
        foiz,
        date: moment(new Date()).format("L"),
      };
      console.log([...store.students, newStudent]);
      request(
        `${process.env.NEXT_PUBLIC_URL}/add`,
        "POST",
        JSON.stringify({
          month: localStorage.getItem("currentMonth"),
          students: [...store.students, newStudent],
        })
      )
        .then((res) => console.log(res))
        .then(() => {
          setName("");
          setFoiz(0);
          toast.success("asdsad");
          console.log("yangi o'quvchi api ga ketdi");
          dispatch(addStudent(newStudent));
          dispatch(spinnerLoaded());
        });
    } else {
      dispatch(spinnerLoaded());
      setValidText(true);
    }
  };

  console.log(store.students);
  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      console.log("student mount");

      dispatch(fetchingStudents());
      request(`${process.env.NEXT_PUBLIC_URL}/students`).then((res) => {
        res.students.forEach((elem) => {
          if (elem.month == localStorage.getItem("currentMonth")) {
            console.log("dispatch ishladi", elem.students);
            dispatch(fetchedStudents(elem.students));
            setFilterStudents(elem.students);
          }
        });
        dispatch(loaded());
      });
    }
  }, []);
  useEffect(() => {
    const newStudents = store.students.filter((el) => el.group === filterGroup);
    setFilterStudents(
      filterGroup !== "Barcha guruhlar" ? newStudents : store.students
    );
  }, [store]);
  return (
    <>
      {store.loading === "loading" ? (
        <Loader />
      ) : (
        <div>
          <ToastContainer />
          <Image
            src="/addStudent.png"
            alt="212"
            width="40"
            height="40"
            className="hover:cursor-pointer mx-[20px] my-[20px]"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalAddStudent"
          />
          {store.students.length === 0 ? (
            <h2 className="emptyH2">O'quvchilar topilmadi!</h2>
          ) : (
            <>
              <h4 className="absolute top-[20px] rounded-[5px] text-gray-700 left-[100px] bg-blue-200 p-[7px]">
                O`quvchilar soni {filterStudents.length}
              </h4>
              <select
                className="absolute left-[45%] top-[20px] bg-white p-[10px]"
                value={filterGroup}
                onChange={(e) => {
                  setFilterGroup(e.target.value);
                  const newStudents = store.students.filter(
                    (el) => el.group === e.target.value
                  );
                  setFilterStudents(
                    e.target.value !== "Barcha guruhlar"
                      ? newStudents
                      : store.students
                  );
                }}
              >
                <option selected value="Barcha guruhlar">
                  Barcha guruhlar
                </option>
                <option value="Front-5">Front-5</option>
                <option value="Front-8">Front-8</option>
                <option value="Front-10">Front-10</option>
                <option value="Front-12">Front-12</option>
                <option value="Front-13">Front-13</option>
                <option value="Front-14">Front-14</option>
                <option value="K.S-1">K.S-1</option>
                <option value="K.S-2">K.S-2</option>
                <option value="K.S-3">K.S-3</option>
                <option value="K.S-4">K.S-4</option>
                <option value="K.S-5">K.S-5</option>
                <option value="K.S-6">K.S-6</option>
                <option value="Tibbiyot-1">Tibbiyot-1</option>
                <option value="Tibbiyot-2">Tibbiyot-2</option>
                <option value="Tibbiyot-3">Tibbiyot-3</option>
                <option value="Ingliz-tili-1">Ingliz-tili-1</option>
                <option value="Ingliz-tili-2">Ingliz-tili-2</option>
                <option value="Scretch-1">Scretch-1</option>
                <option value="Scretch-2">Scretch-2</option>
              </select>
              <table striped hover variant="light" className="table__students">
                <thead id="thead__students">
                  <tr className="text-center">
                    <th>№</th>
                    <th>F.I.SH</th>
                    <th>Guruh</th>
                    <th>Kafedra</th>
                    <th>Qilgan to'lov</th>
                    <th>Qarz</th>
                    <th>Chegirma</th>
                    <th>Guruhga qo'shilgan</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filterStudents.map((elem, index) => {
                    return (
                      <StudentsItem key={elem.id} {...elem} index={index} />
                    );
                  })}
                </tbody>
              </table>
            </>
          )}

          <div
            class="modal fade"
            id="exampleModalAddStudent"
            tabindex="-1"
            aria-labelledby="exampleModalAddStudent"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalAddStudent">
                    Yangi O`quvchi qo`shish({currentMonth})
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form
                    className="flex flex-col gap-[10px]"
                    onSubmit={addStudentForm}
                  >
                    <select
                      className="form-select"
                      aria-label="Guruh"
                      name="group"
                      onChange={(e) => {
                        setGroup(e.target.value);
                        setValidText(false);
                      }}
                    >
                      <option selected disabled>
                        Guruh
                      </option>
                      <option value="Front-5">Front-5</option>
                      <option value="Front-8">Front-8</option>
                      <option value="Front-10">Front-10</option>
                      <option value="Front-12">Front-12</option>
                      <option value="Front-13">Front-13</option>
                      <option value="Front-14">Front-14</option>
                      <option value="K.S-1">K.S-1</option>
                      <option value="K.S-2">K.S-2</option>
                      <option value="K.S-3">K.S-3</option>
                      <option value="K.S-4">K.S-4</option>
                      <option value="K.S-5">K.S-5</option>
                      <option value="K.S-6">K.S-6</option>
                      <option value="Tibbiyot-1">Tibbiyot-1</option>
                      <option value="Tibbiyot-2">Tibbiyot-2</option>
                      <option value="Tibbiyot-3">Tibbiyot-3</option>
                      <option value="Ingliz-tili-1">Ingliz-tili-1</option>
                      <option value="Ingliz-tili-2">Ingliz-tili-2</option>
                      <option value="Scretch-1">Scretch-1</option>
                      <option value="Scretch-2">Scretch-2</option>
                    </select>
                    <select
                      className="form-select"
                      aria-label="oy"
                      name="department"
                      onChange={(e) => {
                        setDepartment(e.target.value);
                        setValidText(false);
                      }}
                    >
                      <option selected disabled>
                        Kafedrasi
                      </option>
                      <option value="Dasturlash">Dasturlash</option>
                      <option value="K.S">K.S</option>
                      <option value="Scretch">Scretch</option>
                      <option value="Ingliz-tili">Ingliz-tili</option>
                    </select>
                    <input
                      required
                      className="form-control"
                      type="text"
                      placeholder="o'quvchi F.I.SH"
                      aria-label="default input example"
                      name="student"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <input
                      required
                      className="form-control"
                      type="text"
                      placeholder="chegirma "
                      aria-label="default input example"
                      name="sadsad"
                      value={foiz}
                      onChange={(e) => {
                        setFoiz(e.target.value);
                      }}
                    />
                    {validText ? (
                      <p className="text-red-500 text-center">
                        Guruh va Kafedrani tanlang
                      </p>
                    ) : null}
                    {store.spinnerLoader === "loading" ? (
                      <Spinner />
                    ) : (
                      <button class="btn btn-success" id="addStudentBtn">
                        Qo'shish
                      </button>
                    )}
                  </form>
                </div>
                <div class="modal-footer"></div>
              </div>
            </div>
          </div>

          {/* TAXRIRLASH */}
        </div>
      )}
    </>
  );
};

export default page;
