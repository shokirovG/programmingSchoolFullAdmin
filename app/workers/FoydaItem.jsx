import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import numberTrim from "../hooks/number";
import calcFoyda from "@/app/hooks/calcFoyda";
import calcPriceTolov from "@/app/hooks/calcPriceTolov";
import calcQarzPrice from "@/app/hooks/calcQarzPrice";
import calcCategoryPrice from "@/app/hooks/calcCategoryPrice";
import useFetch from "../hooks/useFetch";
import { fetchedMajburiy } from "../redux/actions";
const FoydaItem = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  let chiqimlar = [];
  if (store.hisobot.length > 0) {
    chiqimlar = store.hisobot[0].hisoblar;
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
    <div className="workers__item  w-[25%] min-h-[200px] rounded-[15px] ">
      <div className="border-b-[1px] bg-slate-200 py-[8px]  rounded-[15px] border-black-200 flex h-[100px] items-center px-[10px] gap-[20px]">
        <span className="text-[25px] ">Markaz</span>
      </div>
      <div className="p-[20px]">
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px] mr-[10px]">
            Foyda
          </span>
          {/* {numberTrim(oylik + plusOylik)} so`m */}
        </p>
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px]  mr-[10px]">
            Ishlatilgan
          </span>{" "}
          {/* <span className="text-red-500"> {numberTrim(avans)}</span> so`m */}
        </p>
        <p>
          <span className="oylik__span bg-slate-200 w-[100px] p-[7px] rounded-[10px]  mr-[10px]">
            Qoldiq
          </span>
          <span className="text-green-500">
            {calcFoyda(
              chiqimlar,
              store.majburiyChiqimlar.length > 0
                ? store.majburiyChiqimlar[0]
                : { chiqimlar: [] },
              calcPriceTolov(store.students, "Dasturlash") +
                calcPriceTolov(store.students, "K.S") +
                calcPriceTolov(store.students, "Ingliz-tili") +
                calcPriceTolov(store.students, "Scretch") +
                calcQarzPrice(store.students, "Dasturlash") +
                calcQarzPrice(store.students, "K.S") +
                calcQarzPrice(store.students, "Ingliz-tili") +
                calcQarzPrice(store.students, "Scretch")
            ) < 0 ? (
              <span className="text-red-500">
                {numberTrim(
                  calcFoyda(
                    chiqimlar,
                    store.majburiyChiqimlar.length > 0
                      ? store.majburiyChiqimlar[0]
                      : { chiqimlar: [] },
                    calcPriceTolov(store.students, "Dasturlash") +
                      calcPriceTolov(store.students, "K.S") +
                      calcPriceTolov(store.students, "Ingliz-tili") +
                      calcPriceTolov(store.students, "Scretch") +
                      calcQarzPrice(store.students, "Dasturlash") +
                      calcQarzPrice(store.students, "K.S") +
                      calcQarzPrice(store.students, "Ingliz-tili") +
                      calcQarzPrice(store.students, "Scretch")
                  )
                )}
              </span>
            ) : (
              <span className="text-green-500">
                {"+"}
                {numberTrim(
                  calcFoyda(
                    chiqimlar,
                    store.majburiyChiqimlar.length > 0
                      ? store.majburiyChiqimlar[0]
                      : { chiqimlar: [] },
                    calcPriceTolov(store.students, "Dasturlash") +
                      calcPriceTolov(store.students, "K.S") +
                      calcPriceTolov(store.students, "Ingliz-tili") +
                      calcPriceTolov(store.students, "Scretch") +
                      calcQarzPrice(store.students, "Dasturlash") +
                      calcQarzPrice(store.students, "K.S") +
                      calcQarzPrice(store.students, "Ingliz-tili") +
                      calcQarzPrice(store.students, "Scretch")
                  )
                )}
              </span>
            )}
          </span>{" "}
          so`m
        </p>
      </div>
    </div>
  );
};

export default FoydaItem;
