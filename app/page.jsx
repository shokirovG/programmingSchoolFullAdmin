"use client";

import List from "@/app/components/List/List";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Loader from "./components/Loader/Loader";
import {
  fetchedStudents,
  fetchingStudents,
  hisobotFetched,
  loaded,
} from "./redux/actions";
import useFetch from "./hooks/useFetch";
export default function Home() {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  const initial = useRef(false);
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
    }
    dispatch(fetchingStudents());
    if (!localStorage.getItem("currentPage")) {
      localStorage.setItem("currentPage", "hisobot");
      dispatch(loaded());
    }
    request(`${process.env.NEXT_PUBLIC_URL}/hisobot`).then((res) => {
      const currentHisobot = res.hisoblar.filter(
        (el) => el.month == localStorage.getItem("currentMonth")
      );
      // console.log("hozirAPP", res.hisoblar);
      dispatch(hisobotFetched(currentHisobot));
    });
    dispatch(loaded());
  }, []);

  // const count = useRef(false);
  // useEffect(() => {
  //   if (!count.current) {
  //     count.current = true;
  //     console.log("asosiy mount_1");
  //   }
  // }, []);
  // console.log("asosiy mount");
  return <>{store.loading === "loading" ? <Loader /> : null}</>;
  // <List />;
}
