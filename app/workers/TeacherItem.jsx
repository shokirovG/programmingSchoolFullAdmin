import { useSelector } from "@/node_modules/react-redux/dist/react-redux";
import React, { useState } from "react";
import { calcPrice } from "../hooks/calcPrice";
import numberTrim from "../hooks/number";
import WorkerModal from "./WorkerModal";

const TeacherItem = ({
  id,
  department,
  chiqimlar,
  teacher,
  group,
  foiz,
  price,
  priceType,
  prioritet,
}) => {
  let avans = 0;
  const [show, setShow] = useState(false);
  const [showCard, setShowCard] = useState({ idx: "", show: false });
  const store = useSelector((state) => state);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  for (let item of chiqimlar) {
    for (let el of item.hisobot.chiqim) {
      if (el.costType === "Avans" && el.userAvans === teacher) {
        avans += Number(el.costValue);
      }
    }
  }
  const foizOylik = group.reduce((s, elem) => {
    const hisob = store.students.reduce((s, item) => {
      if (item.group.toUpperCase() === elem.toUpperCase()) {
        const narx = calcPrice(0, item.foiz, department);

        return s + Number(narx);
      } else {
        return s;
      }
    }, 0);

    return s + Number(hisob);
  }, 0);

  let balans = group.reduce((s, elem) => {
    const hisob = store.students.reduce((s, item) => {
      if (item.group.toUpperCase() === elem.toUpperCase()) {
        const narx = item.price;

        return s + Number(narx);
      } else {
        return s;
      }
    }, 0);

    return s + Number(hisob);
  }, 0);

  return (
    <>
      <div
        className={`workers__item  w-[25%] ${
          showCard.show && id === showCard.idx ? "h-[260px]" : "h-[100px]"
        }  rounded-[15px] `}
        onClick={() => {
          setShowCard({
            show: !showCard.show,
            idx: id,
          });
        }}
      >
        <div className="border-b-[1px] bg-slate-200 py-[25px]  rounded-[15px] border-black-200 flex h-[100px] justify-center items-center px-[10px] gap-[20px] ">
          <div className="flex flex-col text-center gap-[5px]">
            <span className="text-[16px] " onClick={handleShow}>
              {teacher}
            </span>
            <span className="text-[10px] text-cyan-500">{prioritet}</span>
          </div>
          <div className="teacher__groups flex gap-[10px] flex-wrap ">
            {group.map((elem) => (
              <span
                key={elem}
                className="bg-emerald-400 text-white p-[3px] rounded-[5px] text-[11px] text-"
              >
                {elem}
              </span>
            ))}
            {priceType === "foiz" ? (
              <span>
                {(balans * foiz) / 100 - avans > 0 ? (
                  <span className="text-green-500">
                    +{numberTrim((balans * foiz) / 100 - avans)}
                  </span>
                ) : (
                  <span className="text-red-500">
                    {numberTrim((balans * foiz) / 100 - avans)}
                  </span>
                )}
              </span>
            ) : null}
          </div>
        </div>
        <div className="p-[20px]">
          <p>
            <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px] mr-[10px]">
              Oylik
            </span>
            {priceType === "foiz"
              ? numberTrim((foizOylik * foiz) / 100)
              : numberTrim(price)}{" "}
            so`m
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
            {priceType === "foiz" ? (
              <span
                className={`${
                  (foizOylik * foiz) / 100 - avans >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {numberTrim((foizOylik * foiz) / 100 - avans)}
              </span>
            ) : (
              <span
                className={`${
                  price - avans >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {numberTrim(price - avans)}
              </span>
            )}{" "}
            so`m
          </p>
        </div>
      </div>
      <WorkerModal
        show={show}
        handleClose={handleClose}
        name={teacher}
        priceType={priceType}
        priceFoiz={foiz}
        price={price}
        groups={group}
        department={department}
        id={id}
      />
      {/* modalga props berish kerak worker  */}
    </>
  );
};

export default TeacherItem;
