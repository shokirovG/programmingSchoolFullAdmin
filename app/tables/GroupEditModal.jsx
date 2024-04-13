"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
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
const GroupEditModal = ({ handleClose, show, props }) => {
  console.log("modal");
  const [departmentValue, setDepartmentValue] = useState(props.departmentValue);
  const [teacherValue, setTeacherValue] = useState(props.teacherValue);
  const [groupValue, setGroupValue] = useState(props.groupValue);
  const [lessonTimeValue, setLessonTimeValue] = useState(props.lessonTimeValue);
  const [checkBoxValue, setCheckBoxValue] = useState(props.checkBoxValue);
  const [room, setRoom] = useState(props.room);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const addGroup = () => {
    dispatch(spinnerLoading());

    const a = store.groups.filter((elem) => elem.groupValue == "sdsa");
    const groups = store.groups.map((elem) => {
      if (elem.id == props.id) {
        return {
          ...elem,
          departmentValue,
          teacherValue,
          groupValue,
          lessonTimeValue,
          checkBoxValue,
          room,
        };
      } else {
        return elem;
      }
    });

    request(
      `${process.env.NEXT_PUBLIC_URL}/tables`,
      "POST",
      JSON.stringify({ month: localStorage.getItem("currentMonth"), groups })
    ).then(() => {
      dispatch(spinnerLoaded());
      dispatch(fetchedGroups(groups));
      handleClose();

      toast.success(`${groupValue} guruh yangilandi!`);
    });
  };
  const removeGroup = () => {
    dispatch(spinnerLoading());

    const groups = store.groups.filter((elem) => elem.id !== props.id);

    request(
      `${process.env.NEXT_PUBLIC_URL}/tables`,
      "POST",
      JSON.stringify({ month: localStorage.getItem("currentMonth"), groups })
    ).then(() => {
      dispatch(spinnerLoaded());
      dispatch(fetchedGroups(groups));
      handleClose();

      toast.info(`${groupValue} guruh o'chirildi!`);
    });
  };
  // useEffect(() => {
  //   request(`${process.env.NEXT_PUBLIC_URL}/workers`).then((res) => {
  //     if (res) {
  //       const currentWorkers = res.workers.filter(
  //         (elem) => elem.month === localStorage.getItem("currentMonth")
  //       );
  //       if (currentWorkers.length !== 0) {
  //         dispatch(fetchedWorkers(currentWorkers[0].workers));
  //       }
  //     }
  //   });
  // }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.groupValue} guruhini tahrirlash</Modal.Title>
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
          <div className="flex justify-between w-[100%] items-center">
            <Button variant="danger" onClick={removeGroup}>
              Guruhni o`chirish
            </Button>
            <div className="flex gap-[10px] items-center">
              <Button variant="secondary">Chiqish</Button>
              {store.spinnerLoader === "loading" ? (
                <Spinner />
              ) : (
                <Button variant="success" onClick={addGroup}>
                  Yangilash
                </Button>
              )}
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GroupEditModal;
