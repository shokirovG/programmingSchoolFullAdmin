import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { fetchedStudents, hisobotFetched, loaded } from "@/app/redux/actions";
import { useDispatch } from "@/node_modules/react-redux/dist/react-redux";
import useFetch from "@/app/hooks/useFetch";
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
  const changeItem = () => {
    handleClose();
    console.log(department);
    const newKirim = {
      id,
      department: departmentValue,
      group: groupValue,
      student: studentValue,

      priceStudent: priceStudent - price + Number(tolovValue),
      price: tolovValue,
      priceType: tolovTypeValue,
      priceMonth: oyValue,
      foiz,
    };
    const newHisoblar = store.hisobot[0].hisoblar.map((elem) => {
      if (elem.kun == localStorage.getItem("currentDay")) {
        return {
          ...elem,
          hisobot: {
            ...elem.hisobot,
            kirim: [
              ...elem.hisobot.kirim.filter((el) => el.id !== id),
              newKirim,
            ],
          },
        };
      } else {
        return elem;
      }
    });
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
            console.log("dispatch ishladi", elem.students);
            dispatch(fetchedStudents(elem.students));
          }
        });
        dispatch(loaded());
      });
      toast.success("bazaga qo`shildi!");
    });

    const newStudents = store.students.map((el) => {
      if (el.name === studentValue) {
        return {
          ...el,
          price: Number(el.price) - price + Number(tolovValue),
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
          <form action="">
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
                <option value="Front-5">Front-5</option>
                <option value="Front-8">Front-8</option>
                <option value="Front-10">Front-10</option>
                <option value="Front-12">Front-12</option>
                <option value="Front-13">Front-13</option>
                <option value="K.S-1">K.S-1</option>
                <option value="K.S-2">K.S-2</option>
                <option value="Tibbiyot-1">Tibbiyot-1</option>
                <option value="Ingliz-tili-1">Ingliz-tili-1</option>
                <option value="Ingliz-tili-2">Ingliz-tili-2</option>
                <option value="Scretch-1">Scretch-1</option>
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
          <Button variant="success" onClick={changeItem}>
            Saqlash
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableItemModal;
