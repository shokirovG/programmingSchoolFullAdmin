"use client";

import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import TeacherItem from "./TeacherItem";
import {
  fetchedStudents,
  fetchedWorkers,
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
import balans1 from '../hooks/foyda/balans1'
import WorkerModal from "./WorkerModal";
import WorkerAddModal from "./WorkerAddModal";
import Image from "@/node_modules/next/image";
const Workers = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  const initial = useRef(false);

  const [chiqimlar, setChiqimlar] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    request(`${process.env.NEXT_PUBLIC_URL}/workers`).then((res) => {
      const workers = res.workers.filter(
        (elem) => elem.month === localStorage.getItem("currentMonth")
      );

      if (workers.length > 0) {
        dispatch(fetchedWorkers(workers[0].workers));
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
      request(`${process.env.NEXT_PUBLIC_URL}/hisobot`).then((res) => {
        const currentHisobot = res.hisoblar.filter(
          (el) => el.month == localStorage.getItem("currentMonth")
        );

        dispatch(hisobotFetched(currentHisobot));
      });
    }
  }, []);

  useEffect(() => {
    // request(`${process.env.NEXT_PUBLIC_URL}/workers`).then((res) => {
    //   const workers = res.workers.filter(
    //     (elem) => elem.month === localStorage.getItem("currentMonth")
    //   );

    //   if (workers.length > 0) {
    //     console.log(workers);
    //     dispatch(fetchedWorkers(workers[0].workers));
    //   }
    // });

    if (store.hisobot.length > 0) {
      setChiqimlar(store.hisobot[0].hisoblar);
    }
  }, [store]);
 
  return (
    <div className="workers__page">
      {store.loading === "loading" ? (
        <Loader />
      ) : (
        <>
          <Image
            src="./teacher.svg"
            width="60"
            height="60"
            alt="teacher"
            className="absolute top-[20px] left-[25px] cursor-pointer"
            onClick={handleShow}
          />
          <WorkerAddModal show={show} handleClose={handleClose} />
          <div className="workers__list flex flex-wrap  gap-[20px] justify-center mt-[100px] pb-[100px]">
            {store.workers.map((elem) => (
              <TeacherItem
                department={elem.department}
                chiqimlar={chiqimlar}
                teacher={elem.name}
                group={elem.groups}
                foiz={elem.priceFoiz}
                price={elem.price}
                priceType={elem.priceType}
                id={elem.id}
                prioritet={elem.prioritet}
              />
            ))}

            <FoydaItem chiqimlar={chiqimlar}/>
          </div>
        </>
      )}
    </div>
  );
};

export default Workers;
