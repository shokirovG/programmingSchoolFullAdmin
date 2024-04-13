import React, { useState } from "react";
import "./table.css";
import Image from "next/image";
import TableItem from "./TableItem";
import Kirim from "./Kirim/Kirim";
import ChiqimItem from "./ChiqimItem";
import Chiqim from "../Сonsumption/Chiqim";
import HarajatItem from "./HarajatItem";
import RemoveItem from "./RemoveItem";
import numberTrim from "@/app/hooks/number";
import calcNaqdKirim from "@/app/hooks/calcNaqdKirim";
import calcNaqdChiqim from "@/app/hooks/calcNaqdChiqim";
import calcClickChiqim from "@/app/hooks/calcClickChiqim";
import calcClickKirim from "@/app/hooks/calcClickKirim";
import naqdEskiBalans from "@/app/hooks/naqdEskiBalans";
import clickEskiBalans from "@/app/hooks/clickEskiBalans";
import { useSelector } from "@/node_modules/react-redux/dist/react-redux";
function Table(props) {
  const store = useSelector((state) => state);

  return (
    <>
      <table className="table table-striped table-hover p-[20px]">
        <thead>
          <tr>
            <th>Guruh</th>
            <th>O`quvchi</th>
            <th>To`lov</th>

            <th>Oy</th>
            <th>to`lov turi</th>
          </tr>
        </thead>
        <tbody>
          {props.hisobot.kirim.map((el, index) => {
            return <TableItem key={el.id} {...el} kun={props.kun} />;
          })}
        </tbody>
      </table>
      <div className="bg-blue-500 text-center text-white text-[20px] py-[5px] mt-[30px]">
        Harajatlar
      </div>
      <table className="table table-striped table-hover p-[0px] mt-[0]">
        <thead>
          <tr>
            <th>Turi</th>
            <th>Qiymati</th>
            <th>Qo`shimcha</th>
            <th>To`lov turi</th>
          </tr>
        </thead>
        <tbody>
          {props.hisobot.chiqim.map((el, index) => (
            <ChiqimItem {...el} key={el.id} kun={props.kun} />
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center pr-[20px] cursor-pointer">
        <RemoveItem key={props.kun} kun={props.kun} />
        <Kirim key={props.kun} kun={props.kun} {...props} />
        <HarajatItem key={props.kun} {...props} kun={props.kun} />
      </div>

      <div className="rounded-tl-[15px]  rounded-tr-[15px] mt-[10px] flex justify-evenly bg-[#34495E] text-white items-center h-[50px] border-b-[1px] border-white">
        <h5 className="m-0 text-cyan-400 text-[15px]">
          Kassa:{" "}
          {numberTrim(
            naqdEskiBalans(store.hisobot[0].hisoblar, props.hisobot.id)
          )}
        </h5>
        <h5 className="m-0 text-blue-200 text-[15px]">
          Karta:{" "}
          {numberTrim(
            clickEskiBalans(store.hisobot[0].hisoblar, props.hisobot.id)
          )}
        </h5>
        <h5 className="m-0 text-[15px]">
          Umumiy Balans:{" "}
          {numberTrim(
            naqdEskiBalans(store.hisobot[0].hisoblar, props.hisobot.id) +
              clickEskiBalans(store.hisobot[0].hisoblar, props.hisobot.id)
          )}
        </h5>
      </div>
      <div className="flex justify-evenly bg-[#34495E] text-white items-center h-[50px]">
        <h5 className="m-0 text-green-400 text-[15px]">
          {" "}
          Naqd: +{numberTrim(calcNaqdKirim(props.hisobot.kirim, "Naqd"))}
        </h5>
        <h5 className="m-0 text-[15px] text-green-400">
          {" "}
          Click: +{numberTrim(calcClickKirim(props.hisobot.kirim, "Click"))}
        </h5>
        <h5 className="m-0 text-[15px] text-green-400">
          {" "}
          Umumiy kirim: +
          {numberTrim(
            calcNaqdKirim(props.hisobot.kirim, "Naqd") +
              calcClickKirim(props.hisobot.kirim, "Click")
          )}
        </h5>
      </div>
      <div className="flex justify-evenly bg-[#34495E] text-white items-center h-[50px]">
        <h5 className="m-0 text-red-400 text-[15px]">
          Naqd: {numberTrim(calcNaqdChiqim(props.hisobot.chiqim, "Naqd"))}{" "}
        </h5>
        <h5 className="m-0 text-red-400 text-[15px]">
          Click: {numberTrim(calcClickChiqim(props.hisobot.chiqim, "Click"))}{" "}
        </h5>
        <h5 className="m-0 text-red-400 text-[15px]">
          Umumiy chiqim:{" "}
          {numberTrim(
            calcNaqdChiqim(props.hisobot.chiqim, "Naqd") +
              calcClickChiqim(props.hisobot.chiqim, "Click")
          )}
        </h5>
      </div>
    </>
  );
}

export default Table;
