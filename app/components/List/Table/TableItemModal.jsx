import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import {
  fetchedStudents,
  hisobotFetched,
  loaded,
  spinnerLoaded,
  spinnerLoading,
} from "@/app/redux/actions";
import { useDispatch } from "@/node_modules/react-redux/dist/react-redux";
import useFetch from "@/app/hooks/useFetch";
import calcClickKirim from "@/app/hooks/calcClickKirim";
import calcNaqdChiqim from "@/app/hooks/calcNaqdChiqim";
import calcNaqdKirim from "@/app/hooks/calcNaqdKirim";
import calcClickChiqim from "@/app/hooks/calcClickChiqim";
import Spinner from "../../Students/Spinner";
const TableItemModal = ({
  show,
  handleClose,
  handleShow,
  group,
  student,
  price,
  priceMonth,
  priceType,
  id,
  foiz,
  priceStudent,
  department,
}) => {
  const [departmentValue, setDepartmentValue] = useState(department);
  const [groupValue, setGroupValue] = useState(group);
  const [studentValue, setStudentValue] = useState(student);
  const [tolovValue, setTolovValue] = useState(price);
  const [oyValue, setOyValue] = useState(priceMonth);
  const [tolovTypeValue, setTolovTypeValue] = useState(priceType);
  const store = useSelector((state) => state);
  const { request } = useFetch();
  const dispatch = useDispatch();
  console.log("priceStudent", priceStudent);
  const changeItem = (e) => {
    e.preventDefault();
    dispatch(spinnerLoading());
    const findStudentTotalPrice = store.students.filter(
      (el) => el.name === student
    );

    const newKirim = {
      id,
      department: departmentValue,
      group: groupValue,
      student: studentValue,

      priceStudent: findStudentTotalPrice[0].price - price + Number(tolovValue),
      price: tolovValue,
      priceType: tolovTypeValue,
      priceMonth: oyValue,
      foiz,
    };
    console.log("newKirim", newKirim);
    const naqdTolov = tolovTypeValue == "Naqd" ? Number(tolovValue) : 0;
    const clickTolov = tolovTypeValue == "Click" ? Number(tolovValue) : 0;

    const newHisoblar = store.hisobot[0].hisoblar.map((elem) => {
      if (elem.kun == localStorage.getItem("currentDay")) {
        const removeKirim = elem.hisobot.kirim.filter((el) => el.id !== id);
        console.log("removeKirim", removeKirim);
        return {
          ...elem,
          hisobot: {
            ...elem.hisobot,
            kirim: [...removeKirim, newKirim],
          },
          balansNaqd: Number(
            calcNaqdKirim(
              [...elem.hisobot.kirim.filter((el) => el.id !== id), newKirim],
              "Naqd"
            ) - calcNaqdChiqim(elem.hisobot.chiqim, "Naqd")
          ),
          balansClick: Number(
            calcClickKirim(
              [...elem.hisobot.kirim.filter((el) => el.id !== id), newKirim],
              "Click"
            ) - calcClickChiqim(elem.hisobot.chiqim, "Click")
          ),
        };
      } else {
        return elem;
      }
    });
    console.log("newHisoblar", newHisoblar);
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
      request(`${process.env.NEXT_PUBLIC_URL}/students`).then((res) => {
        res.students.forEach((elem) => {
          if (elem.month == localStorage.getItem("currentMonth")) {
            dispatch(fetchedStudents(elem.students));
          }
        });
        dispatch(loaded());
      });
      dispatch(spinnerLoaded());
      toast.success("baza o`zgardi!");
    });

    const newStudents = store.students.map((el) => {
      if (el.name == student) {
        return {
          ...el,
          price: findStudentTotalPrice[0].price - price + Number(tolovValue),
        };
      } else {
        return el;
      }
    });

    request(
      `${process.env.NEXT_PUBLIC_URL}/students`,
      "PUT",
      JSON.stringify({
        month: localStorage.getItem("currentMonth"),
        students: newStudents,
      })
    ).then(() => {
      toast.info("student to`lov o`zgardi!");
      handleClose();
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Hisobotni tahrirlash</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <form onSubmit={changeItem}>
            <div className="mb-3 flex flex-col gap-[10px]">
              <select
                className="form-select"
                value={departmentValue}
                onChange={(e) => {
                  setDepartmentValue(e.target.value);
                }}
              >
                <option selected disabled>
                  Kafedra
                </option>
                <option value="Dasturlash">Dasturlash</option>
                <option value="Scretch">Scretch</option>
                <option value="K.S">K.S</option>
                <option value="Ingliz-tili">Ingliz-tili</option>
              </select>
              <select
                className="form-select"
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
                value={studentValue}
                onChange={(e) => {
                  setStudentValue(e.target.value);
                }}
              >
                {store.students.map((el) => (
                  <option key={el.name}>{el.name}</option>
                ))}
              </select>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon3">
                  To`lov
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3 basic-addon4"
                  value={tolovValue}
                  onChange={(e) => {
                    setTolovValue(e.target.value);
                  }}
                />
                <select
                  className="form-select"
                  aria-label="tolovType"
                  value={tolovTypeValue}
                  onChange={(e) => {
                    setTolovTypeValue(e.target.value);
                  }}
                >
                  <option value="Naqd">Naqd</option>
                  <option value="Click">Click</option>
                </select>
              </div>

              <select
                className="form-select"
                value={oyValue}
                onChange={(e) => {
                  setOyValue(e.target.value);
                }}
              >
                <option value="Yanvar">Yanvar</option>
                <option value="Fevral">Fevral</option>
                <option value="Mart">Mart</option>
                <option value="Aprel">Aprel</option>
                <option value="May">May</option>
                <option value="Iyun">Iyun</option>
                <option value="Iyul">Iyul</option>
                <option value="Avgust">Avgust</option>
                <option value="Sentabr">Sentabr</option>
                <option value="Oktabr">Oktabr</option>
                <option value="Noyabr">Noyabr</option>
                <option value="Dekabr">Dekabr</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {store.spinnerLoader === "loading" ? (
            <Spinner />
          ) : (
            <Button variant="success" onClick={changeItem}>
              Saqlash
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableItemModal;
