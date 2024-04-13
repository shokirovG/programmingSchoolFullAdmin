import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import numberTrim from "../hooks/number";
import calcFoyda from "@/app/hooks/calcFoyda";
import calcPriceTolov from "@/app/hooks/calcPriceTolov";
import calcQarzPrice from "@/app/hooks/calcQarzPrice";
import calcCategoryPrice from "@/app/hooks/calcCategoryPrice";
import useFetch from "../hooks/useFetch";
import { fetchedMajburiy } from "../redux/actions";
import balans1 from "../hooks/foyda/balans1";
import balans2 from "../hooks/foyda/balans2";
import foyda from '../hooks/foyda/foyda'
const FoydaItem = ({chiqimlar}) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  const [showCard, setShowCard] = useState({ show: false });
  let majburiyTotal = 0;
  let totalPriceFoyda = 0;
  for (let worker of store.workers) {
    if (worker.priceType === "foiz") {
      for (let group of worker.groups) {
        totalPriceFoyda +=
          calcPriceTolov(store.students, worker.department, group) +
          calcQarzPrice(store.students, worker.department);
      }
    } else if (worker.priceType === "o`zgarmas" && worker.groups.length !== 0) {
      totalPriceFoyda += worker.price;
    }
  }
 
  console.log('store', store);

  // if (store.majburiyChiqimlar.length > 0) {
  //   majburiyTotal = store.majburiyChiqimlar[0].chiqimlar.reduce((s, item) => {
  //     if ((item.chiqimNomi !== "Avans", item.chiqimNomi !== "Oylik")) {
  //       return s + Number(item.chiqimMiqdori);
  //     } else {
  //       return s;
  //     }
  //   }, 0);
  //   setMajburiyTotal(majburiyT);
  // }

  let foydaBalans = 0;
  for (let item of store.students) {
    if (item.department === "Ingliz-tili" || item.group === "Front-12") {
      foydaBalans += item.price * 0.5;
    }
    if (item.department === "Scretch") {
      foydaBalans += item.price * 0.75;
    }
    if (
      item.department === "K.S" ||
      item.group === "Front-5" ||
      item.group === "Front-8" ||
      item.group === "Front-10" ||
      item.group === "Front-13" ||
      item.group === "Front-14"
    ) {
      foydaBalans += item.price * 0.4;
    }
    if (item.department === "Markaz") {
      foydaBalans += item.price;
    }
  }

  useEffect(() => {
    request(`${process.env.NEXT_PUBLIC_URL}/chiqimlar`).then((res) => {
      const currentMonthChiqim = res.chiqimlar.filter(
        (el) => el.month === localStorage.getItem("currentMonth")
      );
      console.log("use", res);
      dispatch(fetchedMajburiy(currentMonthChiqim));
    });
  }, []);

  return (
    <div
      className={`workers__item  w-[25%]  ${
        showCard.show ? "h-[260px]" : "h-[100px]"
      } rounded-[15px]`}
      onClick={() => {
        setShowCard({
          show: !showCard.show,
        });
      }}
    >
      <div className="border-b-[1px] bg-slate-200 py-[8px]  rounded-[15px] border-black-200 flex h-[100px] items-center px-[10px] gap-[15px]">
        <span className="text-[22px] ">Markaz</span>{" "}
        <span className={`${balans1(store.students,store.workers)>=0 ? 'text-green-500':'text-red-500'}`}>
            {numberTrim(Math.floor(balans1(store.students,store.workers,chiqimlar)) ) }
        </span>
        /
        <span className={`${balans2(store.students,store.workers,chiqimlar,store.majburiyChiqimlar) >=0 ? 'text-green-500':'text-red-500'}`}>
          {numberTrim(Math.floor(balans2(store.students,store.workers,chiqimlar,store.majburiyChiqimlar)) )}
        </span>
      </div>
      <div className="p-[20px]">
        <p>
          <span className="oylik__span  bg-slate-200 w-[100px] p-[7px] rounded-[10px] mr-[10px]">
            Foyda
          </span>
          <span className=" ">
                {numberTrim(Math.floor(foyda(store.students,store.workers,chiqimlar,store.majburiyChiqimlar)) ) }  so`m
          </span>
         
        </p>
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px]  mr-[10px]">
            Ishlatilgan
          </span>{" "}
          <span className="text-red-500">
            {" "}
            {numberTrim(
              calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
                calcCategoryPrice(chiqimlar, "Markaz", "Click")+
                calcCategoryPrice(chiqimlar, "Arenda", "Click")+
                calcCategoryPrice(chiqimlar, "Arenda", "Naqd")+
                calcCategoryPrice(chiqimlar, "Qarz", "Naqd")+
                calcCategoryPrice(chiqimlar, "Qarz", "Click")+
                calcCategoryPrice(chiqimlar, "Kredit", "Naqd")+
                calcCategoryPrice(chiqimlar, "Kredit", "Click")

            )}
          </span>{" "}
          so`m
        </p>
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px]  mr-[10px]">
            Qoldiq
          </span>
         <span className="text-green-500">
          +{numberTrim(Math.floor(foyda(store.students,store.workers,chiqimlar,store.majburiyChiqimlar) -  ( calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
                calcCategoryPrice(chiqimlar, "Markaz", "Click")+
                calcCategoryPrice(chiqimlar, "Arenda", "Click")+
                calcCategoryPrice(chiqimlar, "Arenda", "Naqd")+
                calcCategoryPrice(chiqimlar, "Qarz", "Naqd")+
                calcCategoryPrice(chiqimlar, "Qarz", "Click")+
                calcCategoryPrice(chiqimlar, "Kredit", "Naqd")+
                calcCategoryPrice(chiqimlar, "Kredit", "Click"))) ) }  so`m
         </span>
         
        </p>
      </div>
    </div>
  );
};

export default FoydaItem;
