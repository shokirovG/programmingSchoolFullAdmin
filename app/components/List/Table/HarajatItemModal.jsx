import useFetch from "@/app/hooks/useFetch";
import {
  hisobotFetched,
  spinnerLoaded,
  spinnerLoading,
} from "@/app/redux/actions";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import { toast } from "react-toastify";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "../../Students/Spinner";
import { v4 } from "uuid";
import calcNaqdKirim from "@/app/hooks/calcNaqdKirim";
import calcNaqdChiqim from "@/app/hooks/calcNaqdChiqim";
import calcClickKirim from "@/app/hooks/calcClickKirim";
import calcClickChiqim from "@/app/hooks/calcClickChiqim";
const HarajatItemModal = ({ show, handleClose, handleShow }) => {
  const [costType, setCostType] = useState("Harajat turi");
  const [costValue, setCostValue] = useState();
  const [infoValue, setInfoValue] = useState("");
  const [tolovType, setTolovType] = useState("To`lov turi");
  const [avansShow, setAvansShow] = useState(false);
  const [userAvans, setUserAvans] = useState("Kimga");
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  const addCost = () => {
    console.log("cost");

    if (costType !== "" && costValue && infoValue !== "") {
      console.log("cost-2");
      dispatch(spinnerLoading());
      const newCost = {
        id: v4(),
        costType,
        costValue,
        infoValue,
        tolovType,
        userAvans,
      };
      const naqdTolov = tolovType == "Naqd" ? Number(costValue) : 0;
      const clickTolov = tolovType == "Click" ? Number(costValue) : 0;

      // let clickEskiBalans = 0;
      // for (let item of store.hisobot[0].hisoblar) {
      //   clickEskiBalans += Number(item.balansClick);
      //   if (item.kun === localStorage.getItem("currentDay")) {
      //     break;
      //   }
      // }

      // console.log("naqdEski", naqdEskiBalans - naqdTolov);
      // console.log("clickEski", clickEskiBalans - clickTolov);
      const newHisoblar = store.hisobot[0].hisoblar.map((elem) => {
        if (elem.kun == localStorage.getItem("currentDay")) {
          return {
            ...elem,
            hisobot: {
              ...elem.hisobot,
              chiqim: [...elem.hisobot.chiqim, newCost],
            },
            balansNaqd: Number(
              calcNaqdKirim(elem.hisobot.kirim, "Naqd") -
                calcNaqdChiqim(elem.hisobot.chiqim, "Naqd") -
                naqdTolov
            ),
            balansClick: Number(
              calcClickKirim(elem.hisobot.kirim, "Click") -
                calcClickChiqim(elem.hisobot.chiqim, "Click") -
                clickTolov
            ),
          };
        } else {
          return elem;
        }
      });
      console.log("chiqimHisob", newHisoblar);
      request(
        `${process.env.NEXT_PUBLIC_URL}/hisobot`,
        "POST",
        JSON.stringify({
          month: localStorage.getItem("currentMonth"),
          hisoblar: newHisoblar,
        })
      ).then(() => {
        console.log("req");
        dispatch(
          hisobotFetched([
            {
              hisoblar: newHisoblar,
              month: localStorage.getItem("currentMonth"),
            },
          ])
        );
        setCostType("Harajat turi");
        setCostValue(0);
        setTolovType("To`lov turi");
        setInfoValue("");
        setUserAvans("Kimga");
        toast.success("bazaga qo`shildi!");

        dispatch(spinnerLoaded());
      });
    } else {
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Harajat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <form action="" className="flex gap-[10px] flex-col">
          <select
            className="form-select"
            aria-label="harajat"
            value={costType}
            onChange={(e) => {
              if (e.target.value === "Avans") {
                setAvansShow(true);
              } else {
                setAvansShow(false);
              }
              setCostType(e.target.value);
            }}
          >
            <option selected disabled>
              Harajat turi
            </option>
            <option value="Markaz">Markaz</option>
            <option value="Avans">Avans</option>
            <option value="Kredit">Kredit</option>
            <option value="Oylik">Oylik</option>
            <option value="Arenda">Arenda</option>
            <option value="Qarz">Qarz</option>
          </select>
          {avansShow ? (
            <select
              className="form-select"
              value={userAvans}
              onChange={(e) => {
                setUserAvans(e.target.value);
              }}
            >
              <option value="Kimga" selected disabled>
                Kimga
              </option>
              <option value="G`iyos">G`iyos</option>
              <option value="Farrux">Farrux</option>
              <option value="Sarvar">Sarvar</option>
              <option value="Obid">Obid</option>
              <option value="Rahim">Rahim</option>
              <option value="Mehribonu">Mehribonu</option>
              <option value="Zaxro">Zaxro</option>
            </select>
          ) : null}
          <select
            className="form-select"
            value={tolovType}
            onChange={(e) => {
              setTolovType(e.target.value);
            }}
          >
            <option selected disabled>
              To`lov turi
            </option>
            <option value="Naqd">Naqd</option>
            <option value="Click">Click</option>
          </select>
          <input
            type="number"
            className="form-control"
            placeholder="miqdori"
            value={costValue}
            onChange={(e) => {
              setCostValue(e.target.value);
            }}
          />
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              value={infoValue}
              onChange={(e) => {
                setInfoValue(e.target.value);
              }}
            ></textarea>
            <label for="floatingTextarea">Qo`shimcha ma`lumot</label>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {store.spinnerLoader === "loading" ? (
          <Spinner />
        ) : (
          <button type="button" className="btn btn-success" onClick={addCost}>
            Qo`shish
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default HarajatItemModal;
