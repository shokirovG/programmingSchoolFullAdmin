"use client";

import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import TeacherItem from "./TeacherItem";
import {
  fetchedStudents,
  fetchingStudents,
  hisobotFetched,
  loaded,
} from "../redux/actions";
import { useDispatch } from "@/node_modules/react-redux/dist/react-redux";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader/Loader";
import { setgroups } from "process";
import AdminItem from "./AdminItem";
import AdminYordamchi from "./AdminYordamchi";
import FoydaItem from "./FoydaItem";
const Workers = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  const initial = useRef(false);
  const [front, setFront] = useState([]);
  const [savod, setSavod] = useState([]);
  const [front_12, setFront_12] = useState([]);
  const [chiqimlar, setChiqimlar] = useState([]);
  const [scretch, setScretch] = useState([]);
  const [ingliz, setIngliz] = useState([]);
  const [guruh, setGuruh] = useState([]);
  const fGroup = ["front-5", "front-8", "front-10", "front-13"];
  const dGroup = ["k.s-1", "k.s-2", "k.s-3", "tibbiyot-1"];
  const fGroup_12 = ["front-12"];
  const sGroup = ["scretch-1"];
  const iGroup = ["ingliz-1", "ingliz-2"];
  useEffect(() => {
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
      request(`${process.env.NEXT_PUBLIC_URL}/hisobot`).then((res) => {
        const currentHisobot = res.hisoblar.filter(
          (el) => el.month == localStorage.getItem("currentMonth")
        );
        // console.log("hozirAPP", res.hisoblar);
        dispatch(hisobotFetched(currentHisobot));
      });
    }
  }, []);

  useEffect(() => {
    if (store.students.length > 0) {
      const d = store.students.filter((el) => el.department === "Dasturlash");
      const s = store.students.filter((el) => el.department === "K.S");
      const f = store.students.filter(
        (el) => el.department === "Dasturlash" && el.group === "Front-12"
      );
      const sch = store.students.filter((el) => el.department === "Scretch");
      const i = store.students.filter((el) => el.department === "Ingliz-tili");
      setFront(d);
      setSavod(s);
      setFront_12(f);
      setScretch(sch);
      setIngliz(i);
      setGuruh(store.students);
      setChiqimlar(store.hisobot[0].hisoblar);
    }
  }, [store]);

  return (
    <div>
      {store.loading === "loading" ? (
        <Loader />
      ) : // <div className="workers__list flex flex-wrap gap-[20px] justify-center mt-[70px] pb-[100px]">
      //   <TeacherItem
      //     front={front}
      //     department="Dasturlash"
      //     chiqimlar={chiqimlar}
      //     teacher="G`iyos"
      //     group={fGroup}
      //     foiz={0.6}
      //   />
      //   <TeacherItem
      //     front={savod}
      //     department="K.S"
      //     chiqimlar={chiqimlar}
      //     teacher="Farrux"
      //     group={dGroup}
      //     foiz={0.6}
      //   />
      //   <TeacherItem
      //     front={front_12}
      //     department="Dasturlash"
      //     chiqimlar={chiqimlar}
      //     teacher="Obid"
      //     group={fGroup_12}
      //     foiz={0.5}
      //   />
      //   <TeacherItem
      //     front={scretch}
      //     department="Scretch"
      //     chiqimlar={chiqimlar}
      //     teacher="Rahim"
      //     group={sGroup}
      //     foiz={0.25}
      //   />
      //   <TeacherItem
      //     front={ingliz}
      //     department="Ingliz-tili"
      //     chiqimlar={chiqimlar}
      //     teacher="Sarvar"
      //     group={iGroup}
      //     foiz={0.5}
      //   />
      //   <AdminItem
      //     teacher="Mehribonu"
      //     students={guruh}
      //     chiqimlar={chiqimlar}
      //     foiz={0.02}
      //     plusOylik={200000}
      //   />
      //   <AdminYordamchi
      //     teacher="Zaxro"
      //     oylik={300000}
      //     chiqimlar={chiqimlar}
      //     plusOylik={200000}
      //   />
      //   <AdminYordamchi
      //     teacher="Olmos"
      //     oylik={150000}
      //     plusOylik={0}
      //     chiqimlar={chiqimlar}
      //   />
      //   <FoydaItem />
      // </div>
      null}
    </div>
  );
};

export default Workers;
