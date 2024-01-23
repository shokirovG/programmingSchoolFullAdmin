"use client";
import Image from "@/node_modules/next/image";
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
  } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <tr key={id} className={`px-[20px] text-center h-[54px] `}>
      <td>{index + 1}</td>
      <td
        className={`${
          calcPrice(price, foiz, department) == 0
            ? "active__student"
            : "danger__student"
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
      <td className="flex  justify-around items-center h-[54px]">
        <StudentChangeModal
          key={id}
          {...props}
          handleClose={handleClose}
          show={show}
          handleShow={handleShow}
        />
        <StudentRemoveModal name={name} group={group} id={id} />
      </td>
    </tr>
  );
};

export default StudentsItem;
