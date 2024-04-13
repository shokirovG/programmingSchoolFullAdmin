"use client";
import Image from "next/image";
import { useState } from "react";
import TablesAddModal from "./TablesAddModal";
import "./tableTime.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import useFetch from "../hooks/useFetch";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import {
  fetchedGroups,
  fetchedStudents,
  fetchingStudents,
  loaded,
} from "../redux/actions";
import GroupItem from "./GroupItem";
import Loader from "../components/Loader/Loader";

const page = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { request } = useFetch();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const initial = React.useRef(false);
  const dushanbaTables = store.groups.filter(
    (elem) => elem.checkBoxValue.Dushanba
  );
  const shanbaTables = store.groups.filter((elem) => elem.checkBoxValue.Shanba);
  const seshanbaTables = store.groups.filter(
    (elem) => elem.checkBoxValue.Seshanba
  );
  const chorshanbaTables = store.groups.filter(
    (elem) => elem.checkBoxValue.Chorshanba
  );
  const payshanbaTables = store.groups.filter(
    (elem) => elem.checkBoxValue.Payshanba
  );
  const jumaTables = store.groups.filter((elem) => elem.checkBoxValue.Juma);
  const yakshanbaTables = store.groups.filter(
    (elem) => elem.checkBoxValue.Yakshanba
  );
  React.useEffect(() => {
    dispatch(fetchingStudents());
    request(`${process.env.NEXT_PUBLIC_URL}/tables`).then((res) => {
      if (res) {
        if (res) {
          const tables = res.groups.filter(
            (elem) => elem.month === localStorage.getItem("currentMonth")
          );
          if (tables.length !== 0) {
            dispatch(fetchedGroups(tables[0].groups));
            dispatch(loaded());
          } else {
            dispatch(fetchedGroups([]));
            dispatch(loaded());
          }
        }
      }
    });

    if (!initial.current) {
      initial.current = true;

      dispatch(fetchingStudents());
      request(`${process.env.NEXT_PUBLIC_URL}/students`).then((res) => {
        res.students.forEach((elem) => {
          if (elem.month == localStorage.getItem("currentMonth")) {
            dispatch(fetchedStudents(elem.students));
          }
        });
        dispatch(loaded());
      });
    }
  }, []);

  return (
    <div className="pb-[70px]">
      {store.loading === "loading" ? (
        <Loader />
      ) : (
        <div>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab
              color="primary"
              aria-label="add"
              className="group__img"
              onClick={handleOpen}
            >
              <AddIcon />
            </Fab>
          </Box>
          <div className="absolute top-[33px] left-[120px] text-[22px] rounded bg-slate-300 px-[7px]">
            Guruhlar soni {store.groups.length}
          </div>
          <div className="flex mx-auto justify-center items-center pt-[20px] gap-[5px] flex-wrap w-[90%]">
            {store.groups.map((elem) => (
              <GroupItem key={elem ? elem.groupValue : 1} {...elem} />
            ))}
          </div>
          <TablesAddModal handleClose={handleClose} open={open} />
          <div className="mt-[70px]">
            <div class="container ">
              <div class="row">
                <div class="col-12">
                  <div class="row day-columns min-h-[90vh]">
                    <div class="day-column">
                      <div class="day-header">Dushanba</div>
                      <div class="day-content">
                        {store.groups.map((elem) => {
                          const studentsCount = store.students.filter(
                            (item) => item.group === elem.groupValue
                          );
                          if (elem.checkBoxValue.Dushanba) {
                            return (
                              <>
                                <div
                                  class="event"
                                  style={{ backgroundColor: `${elem.color}` }}
                                >
                                  <span class="title flex justify-between">
                                    {elem.groupValue}{" "}
                                    <span className="room text-[12px] bg-slate-400 rounded px-[2px]">
                                      {elem.room}
                                    </span>
                                  </span>
                                  <footer className="flex flex-col gap-[5px] ">
                                    <span className="text-[15px]">
                                      {elem.lessonTimeValue}
                                    </span>
                                    <span className="text-[11px]">
                                      {elem.departmentValue}
                                    </span>
                                    <span>
                                      o`quvchilar {studentsCount.length} ta
                                    </span>
                                  </footer>
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                      <div class="day-footer">
                        Guruhlar {dushanbaTables.length} ta
                      </div>
                    </div>
                    <div class="day-column">
                      <div class="day-header">Seshanba</div>
                      <div class="day-content">
                        {store.groups.map((elem) => {
                          const studentsCount = store.students.filter(
                            (item) => item.group === elem.groupValue
                          );
                          if (elem.checkBoxValue.Seshanba) {
                            return (
                              <>
                                <div
                                  class="event"
                                  style={{ backgroundColor: `${elem.color}` }}
                                >
                                  <span class="title flex justify-between">
                                    {elem.groupValue}{" "}
                                    <span className="room text-[12px] bg-slate-400 rounded px-[2px]">
                                      {elem.room}
                                    </span>
                                  </span>
                                  <footer className="flex flex-col gap-[5px] ">
                                    <span className="text-[15px]">
                                      {elem.lessonTimeValue}
                                    </span>
                                    <span className="text-[11px]">
                                      {elem.departmentValue}
                                    </span>
                                    <span>
                                      o`quvchilar {studentsCount.length} ta
                                    </span>
                                  </footer>
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                      <div class="day-footer">
                        Guruhlar {seshanbaTables.length} ta
                      </div>
                    </div>
                    <div class="day-column">
                      <div class="day-header">Chorshanba</div>
                      <div class="day-content">
                        {store.groups.map((elem) => {
                          const studentsCount = store.students.filter(
                            (item) => item.group === elem.groupValue
                          );
                          if (elem.checkBoxValue.Chorshanba) {
                            return (
                              <>
                                <div
                                  class="event"
                                  style={{ backgroundColor: `${elem.color}` }}
                                >
                                  <span class="title flex justify-between">
                                    {elem.groupValue}{" "}
                                    <span className="room text-[12px] bg-slate-400 rounded px-[2px]">
                                      {elem.room}
                                    </span>
                                  </span>
                                  <footer className="flex flex-col gap-[5px] ">
                                    <span className="text-[15px]">
                                      {elem.lessonTimeValue}
                                    </span>
                                    <span className="text-[11px]">
                                      {elem.departmentValue}
                                    </span>
                                    <span>
                                      o`quvchilar {studentsCount.length} ta
                                    </span>
                                  </footer>
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                      <div class="day-footer">
                        Guruhlar {chorshanbaTables.length} ta
                      </div>
                    </div>
                    <div class="day-column">
                      <div class="day-header">Payshanba</div>
                      <div class="day-content">
                        {store.groups.map((elem) => {
                          const studentsCount = store.students.filter(
                            (item) => item.group === elem.groupValue
                          );
                          if (elem.checkBoxValue.Payshanba) {
                            return (
                              <>
                                <div
                                  class="event"
                                  style={{ backgroundColor: `${elem.color}` }}
                                >
                                  <span class="title flex justify-between">
                                    {elem.groupValue}{" "}
                                    <span className="room text-[12px] bg-slate-400 rounded px-[2px]">
                                      {elem.room}
                                    </span>
                                  </span>
                                  <footer className="flex flex-col gap-[5px] ">
                                    <span className="text-[15px]">
                                      {elem.lessonTimeValue}
                                    </span>
                                    <span className="text-[11px]">
                                      {elem.departmentValue}
                                    </span>
                                    <span>
                                      o`quvchilar {studentsCount.length} ta
                                    </span>
                                  </footer>
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                      <div class="day-footer">
                        Guruhlar {payshanbaTables.length} ta
                      </div>
                    </div>
                    <div class="day-column">
                      <div class="day-header">Juma</div>
                      <div class="day-content">
                        {store.groups.map((elem) => {
                          const studentsCount = store.students.filter(
                            (item) => item.group === elem.groupValue
                          );
                          if (elem.checkBoxValue.Juma) {
                            return (
                              <>
                                <div
                                  class="event"
                                  style={{ backgroundColor: `${elem.color}` }}
                                >
                                  <span class="title flex justify-between">
                                    {elem.groupValue}{" "}
                                    <span className="room text-[12px] bg-slate-400 rounded px-[2px]">
                                      {elem.room}
                                    </span>
                                  </span>
                                  <footer className="flex flex-col gap-[5px] ">
                                    <span className="text-[15px]">
                                      {elem.lessonTimeValue}
                                    </span>
                                    <span className="text-[11px]">
                                      {elem.departmentValue}
                                    </span>
                                    <span>
                                      o`quvchilar {studentsCount.length} ta
                                    </span>
                                  </footer>
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                      <div class="day-footer">
                        Guruhlar {jumaTables.length} ta
                      </div>
                    </div>
                    <div class="day-column">
                      <div class="day-header">Shanba</div>
                      <div class="day-content">
                        {store.groups.map((elem) => {
                          const studentsCount = store.students.filter(
                            (item) => item.group === elem.groupValue
                          );
                          if (elem.checkBoxValue.Shanba) {
                            return (
                              <>
                                <div
                                  class="event"
                                  style={{ backgroundColor: `${elem.color}` }}
                                >
                                  <span class="title flex justify-between">
                                    {elem.groupValue}{" "}
                                    <span className="room text-[12px] bg-slate-400 rounded px-[2px]">
                                      {elem.room}
                                    </span>
                                  </span>
                                  <footer className="flex flex-col gap-[5px] ">
                                    <span className="text-[15px]">
                                      {elem.lessonTimeValue}
                                    </span>
                                    <span className="text-[11px]">
                                      {elem.departmentValue}
                                    </span>
                                    <span>
                                      o`quvchilar {studentsCount.length} ta
                                    </span>
                                  </footer>
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                      <div class="day-footer">
                        Guruhlar {shanbaTables.length} ta
                      </div>
                    </div>
                    <div class="day-column">
                      <div class="day-header">Yakshanba</div>
                      <div class="day-content">
                        {store.groups.map((elem) => {
                          const studentsCount = store.students.filter(
                            (item) => item.group === elem.groupValue
                          );
                          if (elem.checkBoxValue.Yakshanba) {
                            return (
                              <>
                                <div
                                  class="event"
                                  style={{ backgroundColor: `${elem.color}` }}
                                >
                                  <span class="title flex justify-between">
                                    {elem.groupValue}{" "}
                                    <span className="room text-[12px] bg-slate-400 rounded px-[2px] flex items-center justify-center">
                                      {elem.room}
                                    </span>
                                  </span>
                                  <footer className="flex flex-col gap-[5px] ">
                                    <span className="text-[15px]">
                                      {elem.lessonTimeValue}
                                    </span>
                                    <span className="text-[11px]">
                                      {elem.departmentValue}
                                    </span>
                                    <span>
                                      o`quvchilar {studentsCount.length} ta
                                    </span>
                                  </footer>
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                      <div class="day-footer">
                        Guruhlar {yakshanbaTables.length} ta
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
