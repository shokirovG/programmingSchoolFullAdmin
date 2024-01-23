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
}) => {
  const [nameValue, setNameValue] = useState(name);
  const [foizValue, setFoizValue] = useState(foiz);
  const [departmentValue, setDepartmentValue] = useState(department);
  const [groupValue, setGroupValue] = useState(group);
  const optionDepartment = document.querySelectorAll(".optionDepartment");
  const { request } = useFetch();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  optionDepartment.forEach((elem) => {
    if (elem.className === department) {
      elem.setAttribute("selected", true);
    } else {
      elem.setAttribute("selected", false);
    }
  });

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
                setFoizValue(e.target.value);
              }}
            />
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
