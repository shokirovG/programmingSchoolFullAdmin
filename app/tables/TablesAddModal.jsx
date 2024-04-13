"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import { v4 } from "uuid";
import {
  fetchedGroups,
  fetchedWorkers,
  spinnerLoaded,
  spinnerLoading,
} from "../redux/actions";
import { toast } from "react-toastify";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Students/Spinner";
const TablesAddModal = ({ handleClose, open }) => {
  const [departmentValue, setDepartmentValue] = useState("Kafedra");
  const [teacherValue, setTeacherValue] = useState("O`qituvchisi");
  const [groupValue, setGroupValue] = useState("");
  const [lessonTimeValue, setLessonTimeValue] = useState("");
  const [room, setRoom] = useState("Sinf-xona");
  const [checkBoxValue, setCheckBoxValue] = useState({
    Dushanba: false,
    Seshanba: false,
    Chorshanba: false,
    Payshanba: false,
    Juma: false,
    Shanba: false,
    Yakshanba: false,
  });
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  const colors = [
    "green",
    "turquoise",
    "navy",
    "blue",
    "purple",
    "grey",
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "turquoise",
    "navy",
    "blue",
    "purple",
    "grey",
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "turquoise",
    "navy",
    "blue",
    "purple",
    "grey",
    "gray",
    "red",
    "orange",
    "yellow",
  ];
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const setBg = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  const addGroup = () => {
    dispatch(spinnerLoading());
    const groups = [
      ...store.groups,
      {
        id: v4(),
        departmentValue,
        teacherValue,
        groupValue,
        lessonTimeValue,
        checkBoxValue,
        color: setBg(),
        room,
      },
    ];
    request(
      `${process.env.NEXT_PUBLIC_URL}/tables`,
      "POST",
      JSON.stringify({ month: localStorage.getItem("currentMonth"), groups })
    ).then(() => {
      dispatch(spinnerLoaded());
      dispatch(fetchedGroups(groups));
      handleClose();
      setDepartmentValue("Kafedra");
      setGroupValue("");
      setTeacherValue("O`qituvchisi");
      setLessonTimeValue("");
      setCheckBoxValue({
        Dushanba: false,
        Seshanba: false,
        Chorshanba: false,
        Payshanba: false,
        Juma: false,
        Shanba: false,
        Yakshanba: false,
      });
      toast.success(`${groupValue} guruh qo'shildi!`);
    });
  };
  useEffect(() => {
    request(`${process.env.NEXT_PUBLIC_URL}/workers`).then((res) => {
      if (res) {
        const currentWorkers = res.workers.filter(
          (elem) => elem.month === localStorage.getItem("currentMonth")
        );
        if (currentWorkers.length !== 0) {
          dispatch(fetchedWorkers(currentWorkers[0].workers));
        }
      }
    });
  }, []);

  return (
    <div>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yangi guruh qo`shish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-[5px]">
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
            <input
              type="text"
              className="form-control"
              placeholder="Guruh nomi"
              value={groupValue}
              onChange={(e) => {
                setGroupValue(e.target.value);
              }}
            />
            <select
              className="form-select"
              value={teacherValue}
              onChange={(e) => {
                setTeacherValue(e.target.value);
              }}
            >
              <option selected disabled>
                O`qituvchisi
              </option>
              {store.workers.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              className="form-select"
              value={room}
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            >
              <option value="sinf-xona" selected disabled>
                sinf-xona
              </option>
              <option value="1-xona">1-xona</option>
              <option value="2-xona">2-xona</option>
              <option value="3-xona">3-xona</option>
              <option value="zal">zal</option>
            </select>
            <input
              type="text"
              placeholder="dars vaqti masalan 09:00-10:30"
              className="form-control"
              value={lessonTimeValue}
              onChange={(e) => {
                setLessonTimeValue(e.target.value);
              }}
            />
            <div className="flex gap-[5px] items-center flex-wrap justify-evenly">
              <div className="border-[1px] border-black-200 inline-block rounded pl-[3px]">
                <span>Dushanba</span>{" "}
                <Checkbox
                  {...label}
                  checked={checkBoxValue["Dushanba"]}
                  onChange={(e) => {
                    setCheckBoxValue({
                      ...checkBoxValue,
                      Dushanba: !checkBoxValue["Dushanba"],
                    });
                  }}
                />
              </div>
              <div className="border-[1px] border-black-200 inline-block rounded pl-[3px]">
                <span>Seshanba</span>{" "}
                <Checkbox
                  {...label}
                  color="success"
                  checked={checkBoxValue["Seshanba"]}
                  onChange={(e) => {
                    setCheckBoxValue({
                      ...checkBoxValue,
                      Seshanba: !checkBoxValue["Seshanba"],
                    });
                  }}
                />
              </div>
              <div className="border-[1px] border-black-200 inline-block rounded pl-[3px]">
                <span>Chorshanba</span>{" "}
                <Checkbox
                  {...label}
                  checked={checkBoxValue["Chorshanba"]}
                  onChange={(e) => {
                    setCheckBoxValue({
                      ...checkBoxValue,
                      Chorshanba: !checkBoxValue["Chorshanba"],
                    });
                  }}
                />
              </div>
              <div className="border-[1px] border-black-200 inline-block rounded pl-[3px]">
                <span>Payshanba</span>
                <Checkbox
                  {...label}
                  color="success"
                  checked={checkBoxValue["Payshanba"]}
                  onChange={(e) => {
                    setCheckBoxValue({
                      ...checkBoxValue,
                      Payshanba: !checkBoxValue["Payshanba"],
                    });
                  }}
                />
              </div>
              <div className="border-[1px] border-black-200 inline-block rounded pl-[3px]">
                <span>Juma</span>{" "}
                <Checkbox
                  {...label}
                  checked={checkBoxValue["Juma"]}
                  onChange={(e) => {
                    setCheckBoxValue({
                      ...checkBoxValue,
                      Juma: !checkBoxValue["Juma"],
                    });
                  }}
                />
              </div>
              <div className="border-[1px] border-black-200 inline-block rounded pl-[3px]">
                <span>Shanba</span>{" "}
                <Checkbox
                  {...label}
                  color="success"
                  checked={checkBoxValue["Shanba"]}
                  onChange={(e) => {
                    setCheckBoxValue({
                      ...checkBoxValue,
                      Shanba: !checkBoxValue["Shanba"],
                    });
                  }}
                />
              </div>
              <div className="border-[1px] border-black-200 inline-block rounded pl-[3px]">
                <span>Yakshanba</span>
                <Checkbox
                  {...label}
                  color="default"
                  checked={checkBoxValue["Yakshanba"]}
                  onChange={(e) => {
                    setCheckBoxValue({
                      ...checkBoxValue,
                      Yakshanba: !checkBoxValue["Yakshanba"],
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiqish
          </Button>
          {store.spinnerLoader === "loading" ? (
            <Spinner />
          ) : (
            <Button variant="success" onClick={addGroup}>
              Qo`shish
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TablesAddModal;
