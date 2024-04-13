import React from "react";
import { calcPrice } from "../hooks/calcPrice";
import numberTrim from "../hooks/number";

const AdminItem = ({ teacher, students, chiqimlar, foiz, plusOylik }) => {
  let avans = 0;

  for (let item of chiqimlar) {
    for (let el of item.hisobot.chiqim) {
      if (el.costType === "Avans" && el.userAvans === teacher) {
        avans += Number(el.costValue);
      }
    }
  }
  const adminOylik = students.reduce((s, item) => {
    const narx = calcPrice(0, item.foiz, item.department);
    return s + Number(narx);
  }, 0);
  return (
    <div className="workers__item  w-[25%] min-h-[200px] rounded-[15px] ">
      <div className="border-b-[1px] bg-slate-200 py-[8px]  rounded-[15px] border-black-200 flex h-[100px] items-center px-[10px] gap-[20px]">
        <span className="text-[25px] ">{teacher}</span>
      </div>
      <div className="p-[20px]">
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px] mr-[10px]">
            Oylik
          </span>
          {numberTrim(adminOylik * foiz + plusOylik)} so`m
        </p>
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px] mr-[10px]">
            Avans
          </span>{" "}
          <span className="text-red-500">{numberTrim(avans)}</span> so`m
        </p>
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px] mr-[10px]">
            Qoldiq
          </span>
          <span className="text-green-500">
            +{numberTrim(adminOylik * foiz - avans + plusOylik)}
          </span>{" "}
          so`m
        </p>
      </div>
    </div>
  );
};

export default AdminItem;
