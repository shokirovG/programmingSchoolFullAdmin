"use client";

import React from "react";
import StudentChangeModal from "./StudentChangeModal";
import { useState } from "react";
import numberTrim from "@/app/hooks/number";
import { calcPrice } from "@/app/hooks/calcPrice";
import StudentRemoveModal from "../Students/StudentRemoveModal";
import moment from "moment";

const StudentsItem = (props) => {
  const [show, setShow] = useState(false);
  const {
    id,
    index,
    name,
    group,
    department,
    price = 0,
    foiz,
    created,
    priceDate,
  } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const date = new Date();
  const studentDate = +moment(priceDate).format("DD/MM/YYYY").slice(0, 2);
  const date2 = +moment(date).format("DD/MM/YYYY").slice(0, 2);

  return (
    <tr key={id} className={`px-[20px] text-center h-[54px]  `}>
      <td>{index + 1}</td>
      <td
        className={`${
          calcPrice(price, foiz, department) == 0
            ? "active__student"
            : "danger__student"
        } ${
          date2 < studentDate && calcPrice(price, foiz, department) !== 0
            ? "norm__student"
            : ""
        }`}
      >
        {name}
      </td>
      <td>{group}</td>
      <td>{department}</td>
      <td>{numberTrim(price)} so`m</td>
      <td>{numberTrim(calcPrice(price, foiz, department))} so`m</td>

      <td>{numberTrim(foiz)} so`m</td>

      <td>{moment(created).format("DD/MM/YYYY")}</td>
      <td
        className={`${
          calcPrice(price, foiz, department) == 0
            ? "active__student"
            : "danger__student"
        } ${
          date2 < studentDate && calcPrice(price, foiz, department) !== 0
            ? "norm__student"
            : ""
        }`}
      >
        {moment(priceDate).format("DD/MM/YYYY")}
      </td>

      <td className="flex  justify-around items-center h-[54px] gap-[10px] px-0">
        <StudentChangeModal
          key={id}
          {...props}
          handleClose={handleClose}
          show={show}
          handleShow={handleShow}
        />
        <StudentRemoveModal name={name} group={group} id={id} price={price} />
      </td>
    </tr>
  );
};

export default StudentsItem;
