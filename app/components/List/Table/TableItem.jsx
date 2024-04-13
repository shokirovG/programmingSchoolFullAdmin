import { calcPrice } from "@/app/hooks/calcPrice";
import numberTrim from "@/app/hooks/number";
import { useSelector } from "@/node_modules/react-redux/dist/react-redux";
import React, { useEffect, useState } from "react";
import TableItemModal from "./TableItemModal";
const TableItem = (props) => {
  const {
    id,
    group,
    department,
    price,
    student,
    foiz,
    priceMonth,
    priceStudent,
    priceType,
  } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    localStorage.setItem("currentDay", props.kun);
    setShow(true);
  };

  return (
    <>
      <tr
        className="cursor-pointer"
        title="hisobotni tahrirlash"
        onClick={handleShow}
      >
        <td className="a">
          {group} <br />
          {department}
        </td>
        <td>{student}</td>
        <td>{numberTrim(price)} so`m</td>

        <td>{priceMonth}</td>
        <td>{priceType}</td>
      </tr>
      <TableItemModal
        {...props}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
};

export default TableItem;
