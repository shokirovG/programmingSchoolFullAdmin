"use client";

import List from "@/app/components/List/List";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Loader from "./components/Loader/Loader";
import {
  fetchedGroups,
  fetchedStudents,
  fetchedWorkers,
  fetchingStudents,
  hisobotFetched,
  loaded,
  monthPriceFetched,
} from "./redux/actions";
import { useRouter, useParams } from "next/navigation";
import useFetch from "./hooks/useFetch";
import SignIn from "./components/Sign/SignIn";

export default function Home() {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  const initial = useRef(false);
  const initial2 = useRef(false);

  useEffect(() => {
    localStorage.setItem("currentPage", "hisobot");
    request(`${process.env.NEXT_PUBLIC_URL}/workers`).then((res) => {
      const workers = res.workers.filter(
        (elem) => elem.month === localStorage.getItem("currentMonth")
      );

      if (workers.length > 0) {
        dispatch(fetchedWorkers(workers[0].workers));
      }
    });

    request(`${process.env.NEXT_PUBLIC_URL}/tables`).then((res) => {
      if (res) {
        if (res) {
          const tables = res.groups.filter(
            (elem) => elem.month === localStorage.getItem("currentMonth")
          );
          if (tables.length !== 0) {
            dispatch(fetchedGroups(tables[0].groups));
          } else {
            dispatch(fetchedGroups([]));
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

    dispatch(fetchingStudents());
    if (!localStorage.getItem("currentPage")) {
      localStorage.setItem("currentPage", "hisobot");
      dispatch(loaded());
    }
    request(`${process.env.NEXT_PUBLIC_URL}/hisobot`).then((res) => {
      const currentHisobot = res.hisoblar.filter(
        (el) => el.month == localStorage.getItem("currentMonth")
      );

      dispatch(hisobotFetched(currentHisobot));
    });
    dispatch(loaded());
  }, []);
  // useEffect(() => {
  //   request(`${process.env.NEXT_PUBLIC_URL}/hisobot`).then((res) => {
  //     if (res.hisoblar.length > 0) {
  //       const currentHisobot = res.hisoblar.filter(
  //         (el) =>
  //           el.month.slice(0, el.month.length - 5) ==
  //           localStorage
  //             .getItem("currentMonth")
  //             .slice(0, localStorage.getItem("currentMonth").length - 5) -
  //             1
  //       );
  //       if (currentHisobot.length > 0) {
  //         const totalPriceNaqd = currentHisobot[0].hisoblar.reduce(
  //           (s, item) => {
  //             return s + Number(item.balansNaqd);
  //           },
  //           0
  //         );
  //         const totalPriceClick = currentHisobot[0].hisoblar.reduce(
  //           (s, item) => {
  //             return s + Number(item.balansClick);
  //           },
  //           0
  //         );
  //         dispatch(monthPriceFetched({ totalPriceNaqd, totalPriceClick }));
  //         request(
  //           `${process.env.NEXT_PUBLIC_URL}/monthprice`,
  //           "POST",
  //           JSON.stringify({
  //             month: localStorage.getItem("currentMonth"),
  //             totalPriceNaqd,
  //             totalPriceClick,
  //           })
  //         );
  //       }
  //     }
  //   });
  //   request(`${process.env.NEXT_PUBLIC_URL}/monthprice`).then((res) => {
  //     if (res.totalPrice.length > 0) {
  //       res.totalPrice.forEach((elem) => {
  //         if (
  //           elem.month.slice(0, elem.length - 5) ===
  //           Number(
  //             localStorage
  //               .getItem("currentMonth")
  //               .slice(0, localStorage.getItem("currentMonth").length - 5)
  //           ) -
  //             1
  //         ) {
  //           dispatch(monthPriceFetched(res.eskiOy));
  //         }
  //         //yanvar oyi uchun ishlamaydi. sababi undan bir oydingi oy yuq
  //       });
  //     }
  //   });
  // }, [localStorage.getItem("currentMonth")]);
  // console.log(store);
  return <>{store.loading === "loading" ? <Loader /> : <List />}</>;
}
