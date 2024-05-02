import Image from "next/image";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useFetch from "@/app/hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchedStudents,
  spinnerLoaded,
  spinnerLoading,
} from "@/app/redux/actions";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import Zero from "@/app/hooks/zero";
import moment from "moment";

const StudentChangeModal = ({
  id,
  name,
  price,
  group,
  department,
  foiz,
  handleClose,
  show,
  handleShow,
  created,
  priceDate,
}) => {
  const [nameValue, setNameValue] = useState(name);
  const [foizValue, setFoizValue] = useState(foiz);
  const [departmentValue, setDepartmentValue] = useState(department);
  const [groupValue, setGroupValue] = useState(group);
  const optionDepartment = document.querySelectorAll(".optionDepartment");
  const { request } = useFetch();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const date = new Date(created);
  const datePrice = new Date(priceDate);
  const initialDate = `${date.getFullYear()}-${Zero(
    date.getMonth() + 1
  )}-${Zero(date.getDate())}`;
  const initialPriceDate = `${datePrice.getFullYear()}-${Zero(
    datePrice.getMonth() + 1
  )}-${Zero(datePrice.getDate())}`;
  const [createdStudentDate, setCreatedStudentDate] = useState(initialDate);
  optionDepartment.forEach((elem) => {
    if (elem.className === department) {
      elem.setAttribute("selected", true);
    } else {
      elem.setAttribute("selected", false);
    }
  });
  console.log("init", initialPriceDate);
  const [priceStudentDate, setPriceStudentDate] = useState(initialPriceDate);
  const changeStudent = (e) => {
    e.preventDefault();
    dispatch(spinnerLoading());
    const newStudents = store.students.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          name: nameValue,
          foiz: foizValue,
          department: departmentValue,
          group: groupValue,
          created: moment(createdStudentDate).format("L"),
          priceDate: moment(priceStudentDate).format("L"),
        };
      } else {
        return el;
      }
    });
    request(
      `${process.env.NEXT_PUBLIC_URL}/students`,
      "PUT",
      JSON.stringify({ month: store.currentMonth, students: newStudents })
    ).then(() => {
      dispatch(fetchedStudents(newStudents));
      dispatch(spinnerLoaded());
      handleClose();
      toast.info("o'quvchi ma'lumoti yangilandi!");
    });
  };
  return (
    <>
      <Image
        src="/edit.png"
        width="18"
        height="18"
        alt="#"
        className="cursor-pointer"
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 class="modal-title fs-5" id="exampleModalChangeStudent">
              Tahrirlash
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <form className="flex flex-col gap-[10px]" onSubmit={changeStudent}>
            <select
              className="form-select"
              aria-label="Guruh"
              name="group"
              value={groupValue}
              onChange={(e) => {
                setGroupValue(e.target.value);
              }}
            >
              <option selected disabled>
                Guruh
              </option>

              {store.groups.map((elem) => (
                <option value={elem.groupValue}>{elem.groupValue}</option>
              ))}
            </select>
            <select
              className="form-select"
              aria-label="oy"
              name="department"
              value={departmentValue}
              onChange={(e) => {
                setDepartmentValue(e.target.value);
              }}
            >
              <option selected disabled className="optionDepartment">
                Kafedrasi
              </option>
              <option value="Dasturlash" className="optionDepartment">
                Dasturlash
              </option>
              <option value="K.S" className="optionDepartment">
                K.S
              </option>
              <option value="Scretch" className="optionDepartment">
                Scretch
              </option>
              <option value="Ingliz-tili" className="optionDepartment">
                Ingliz-tili
              </option>
              <option value="Python">Python</option>
              <option value="Grafik-Dizayn">Grafik-Dizayn</option>
            </select>
            <input
              required
              className="form-control"
              type="text"
              placeholder="o'quvchi F.I.SH"
              aria-label="default input example"
              name="student"
              value={nameValue}
              onChange={(e) => {
                setNameValue(e.target.value);
              }}
            />
            <input
              required
              className="form-control"
              type="text"
              placeholder="chegirma foizi"
              aria-label="default input example"
              name="sadsad"
              value={foizValue}
              onChange={(e) => {
                setFoizValue(Number(e.target.value));
              }}
            />
            <div className="date__create">
              <label>Guruhga qo`shilgan sanasi:</label>
              <input
                type="date"
                className="w-[150px] mx-[auto] p-[5px] bg-white text-black border-[1px] border-[black]"
                value={createdStudentDate}
                onChange={(e) => {
                  setCreatedStudentDate(e.target.value);
                }}
              />
            </div>
            <div className="date__create">
              <label>To`lov sanasi:</label>
              <input
                type="date"
                className="w-[150px] mx-[auto] p-[5px] bg-white text-black border-[1px] border-[black]"
                value={priceStudentDate}
                onChange={(e) => {
                  setPriceStudentDate(e.target.value);
                }}
              />
            </div>
            {store.spinnerLoader === "loading" ? (
              <Spinner />
            ) : (
              <input
                type="submit"
                className="btn btn-primary"
                value="yangilash"
              />
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StudentChangeModal;
