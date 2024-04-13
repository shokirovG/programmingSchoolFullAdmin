import numberTrim from "@/app/hooks/number";
import { useSelector } from "@/node_modules/react-redux/dist/react-redux";
import React from "react";
import "./table__total.scss";
import calcPriceTolov from "@/app/hooks/calcPriceTolov";
import calcQarzPrice from "@/app/hooks/calcQarzPrice";
import calcCategoryPrice from "@/app/hooks/calcCategoryPrice";
import calcFoyda from "@/app/hooks/calcFoyda";
function TableTotal(props) {
  const store = useSelector((state) => state);
  let totalPrice = 0;
  if (store.majburiyChiqimlar.length > 0) {
    totalPrice = store.majburiyChiqimlar[0].chiqimlar.reduce((s, item) => {
      return s + Number(item.chiqimMiqdori);
    }, 0);
  }

  let chiqimlar = [];
  if (store.hisobot.length > 0) {
    chiqimlar = store.hisobot[0].hisoblar;
  }

  return (
    <div className=" totalTable ">
      <table className="rwd-table">
        <thead>
          <tr>
            <th>Yig`ildi</th>
            <th>Yig`ilishi kerak</th>

            <th>Balans</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-th="Movie Title">
              Dasturlash:{" "}
              {numberTrim(calcPriceTolov(store.students, "Dasturlash"))}
            </td>
            <td data-th="Movie Title">
              Dasturlash:{" "}
              {numberTrim(calcQarzPrice(store.students, "Dasturlash")+calcQarzPrice(store.students, "Dasturlash","Front-12"))}
            </td>

            <td data-th="Year">Kassa: {0}</td>
          </tr>
          <tr>
            <td data-th="Movie Title">
              K.Savodxonlik: {numberTrim(calcPriceTolov(store.students, "K.S"))}
            </td>
            <td data-th="Movie Title">
              K.Savodxonlik: {numberTrim(calcQarzPrice(store.students, "K.S"))}
            </td>

            <td data-th="Year">Karta: {0}</td>
          </tr>
          <tr>
            <td data-th="Movie Title">
              Ingliz tili:{" "}
              {numberTrim(calcPriceTolov(store.students, "Ingliz-tili"))}
            </td>
            <td data-th="Movie Title">
              Ingliz tili:{" "}
              {numberTrim(calcQarzPrice(store.students, "Ingliz-tili"))}
            </td>

            <td data-th="Year"></td>
          </tr>
          <tr>
            <td data-th="Movie Title">
              Scretch: {numberTrim(calcPriceTolov(store.students, "Scretch"))}
            </td>
            <td>
              Scretch: {numberTrim(calcQarzPrice(store.students, "Scretch"))}
            </td>

            <td data-th="Year"></td>
          </tr>
          <tr>
            <td data-th="Movie Title"></td>

            <td data-th="Year"></td>
            <td data-th="Year"></td>
          </tr>
          <tr>
            <td data-th="Movie Title"></td>

            <td data-th="Year"></td>
            <td data-th="Year"></td>
          </tr>
          <tr className="table__total_footer">
            <td data-th="Movie Title">
              Jami:{" "}
              {numberTrim(
                calcPriceTolov(store.students, "Dasturlash") +
                  calcPriceTolov(store.students, "K.S") +
                  calcPriceTolov(store.students, "Ingliz-tili") +
                  calcPriceTolov(store.students, "Scretch")
              )}
            </td>
            <td>
              Jami:{" "}
              {numberTrim(
                calcQarzPrice(store.students, "Dasturlash") +
                  calcQarzPrice(store.students, "K.S") +
                  calcQarzPrice(store.students, "Ingliz-tili") +
                  calcQarzPrice(store.students, "Scretch")
              )}
            </td>

            <td data-th="Gross">Jami: 0</td>
          </tr>
        </tbody>
      </table>

      <div className="flex gap-[20px] items-start">
        <table className="rwd-table">
          <thead>
            <tr>
              <th>Majburiy chiqim</th>
            </tr>
          </thead>
          <tbody>
            {store.majburiyChiqimlar.length > 0
              ? store.majburiyChiqimlar[0].chiqimlar.map((elem) => (
                  <tr key={elem.id}>
                    <td data-th="Movie Title">
                      {elem.chiqimNomi}: {numberTrim(+elem.chiqimMiqdori)} so`m
                    </td>
                  </tr>
                ))
              : null}

            <tr className="table__total_footer">
              <td data-th="Year">Umumiy: {numberTrim(totalPrice)} so`m</td>
            </tr>
          </tbody>
        </table>

        <table className="rwd-table">
          <thead>
            <tr>
              <th>Harajat qilindi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-th="Gross">
                Markaz(Naqd):{" "}
                {chiqimlar.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Markaz", "Naqd"))
                  : null}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Markaz(Click):{" "}
                {chiqimlar.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Markaz", "Click"))
                  : null}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Avans(Naqd):{" "}
                {chiqimlar.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Avans", "Naqd"))
                  : null}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Avans(Click):{" "}
                {chiqimlar.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Avans", "Click"))
                  : null}
              </td>
            </tr>

            <tr>
              <td data-th="Gross">
                Kredit(Click):{" "}
                {chiqimlar.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Kredit", "Click"))
                  : null}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Kredit(Naqd):{" "}
                {chiqimlar.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Kredit", "Naqd"))
                  : null}
              </td>
            </tr>

            <tr>
              <td data-th="Gross">
                Oylik(Naqd):{" "}
                {chiqimlar.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Oylik", "Naqd"))
                  : null}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Oylik(Click):{" "}
                {chiqimlar.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Oylik", "Click"))
                  : null}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Arenda(Naqd):{" "}
                {chiqimlar.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Arenda", "Naqd"))
                  : null}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Arenda(Click):{" "}
                {chiqimlar.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Arenda", "Click"))
                  : null}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Qarzlar(Naqd):{" "}
                {chiqimlar.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Qarzlar", "Naqd"))
                  : null}
              </td>
            </tr>
            <tr>
              <td data-th="Gross">
                Qarzlar(Click):{" "}
                {chiqimlar.length > 0
                  ? numberTrim(calcCategoryPrice(chiqimlar, "Qarzlar", "Click"))
                  : null}
              </td>
            </tr>
            <tr className="table__total_footer">
              <td data-th="Year">
                Umumiy:{" "}
                {numberTrim(
                  calcCategoryPrice(chiqimlar, "Markaz", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Markaz", "Click") +
                    calcCategoryPrice(chiqimlar, "Avans", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Avans", "Click") +
                    calcCategoryPrice(chiqimlar, "Kredit", "Click") +
                    calcCategoryPrice(chiqimlar, "Kredit", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Oylik", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Oylik", "Click") +
                    calcCategoryPrice(chiqimlar, "Arenda", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Arenda", "Click") +
                    calcCategoryPrice(chiqimlar, "Qarzlar", "Naqd") +
                    calcCategoryPrice(chiqimlar, "Qarzlar", "Click")
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableTotal;
