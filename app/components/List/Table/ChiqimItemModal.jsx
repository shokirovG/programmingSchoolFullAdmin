//eslint-disable-line
// eslint-disable-next-line no-use-before-define
import useFetch from "@/app/hooks/useFetch";
import {
  hisobotFetched,
  spinnerDeleteLoaded,
  spinnerDeleteLoading,
} from "@/app/redux/actions";

import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import { toast } from "react-toastify";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import calcNaqdKirim from "@/app/hooks/calcNaqdKirim";
import calcNaqdChiqim from "@/app/hooks/calcNaqdChiqim";
import calcClickKirim from "@/app/hooks/calcClickKirim";
import calcClickChiqim from "@/app/hooks/calcClickChiqim";
import { v4 } from "uuid";
import Spinner from "../../Students/Spinner";
const ChiqimItemModal = ({
  show,
  handleClose,
  costType,
  costValue,
  infoValue,
  tolovType,
  id,
  userAvans,
}) => {
  const [costTypeS, setCostType] = useState(costType);
  const [costValueS, setCostValue] = useState(costValue);
  const [infoValueS, setInfoValue] = useState(infoValue);
  const [tolovTypeS, setTolovType] = useState(tolovType);
  const [avansShow, setAvansShow] = useState(
    costType === "Avans" ? true : false
  );
  const [userAvansValue, setUserAvans] = useState(userAvans);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  console.log("id", id);
  const changeChiqimItem = () => {
    dispatch(spinnerDeleteLoading());
    const newCost = {
      id: id === undefined ? v4() : id,
      costType: costTypeS,
      costValue: costValueS,
      infoValue: infoValueS,
      tolovType: tolovTypeS,
      userAvans: userAvansValue,
    };
    const newHisoblar = store.hisobot[0].hisoblar.map((elem) => {
      if (elem.kun == localStorage.getItem("currentDay")) {
        return {
          ...elem,
          hisobot: {
            ...elem.hisobot,
            chiqim: [
              ...elem.hisobot.chiqim.filter((el) => el.id !== id),
              newCost,
            ],
          },
          balansNaqd: Number(
            calcNaqdKirim(elem.hisobot.kirim, "Naqd") -
              calcNaqdChiqim(
                [...elem.hisobot.chiqim.filter((el) => el.id !== id), newCost],
                "Naqd"
              )
          ),
          balansClick: Number(
            calcClickKirim(elem.hisobot.kirim, "Click") -
              calcClickChiqim(
                [...elem.hisobot.chiqim.filter((el) => el.id !== id), newCost],
                "Click"
              )
          ),
        };
      } else {
        return elem;
      }
    });

    request(
      `${process.env.NEXT_PUBLIC_URL}/hisobot`,
      "POST",
      JSON.stringify({
        month: localStorage.getItem("currentMonth"),
        hisoblar: newHisoblar,
      })
    ).then(() => {
      dispatch(
        hisobotFetched([
          {
            hisoblar: newHisoblar,
            month: localStorage.getItem("currentMonth"),
          },
        ])
      );
      // setCostType("");
      // setCostValue("");
      // setInfoValue("");
      // setTolovType("");
      dispatch(spinnerDeleteLoaded());
      handleClose();

      toast.info("yangilandi!");
    });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Harajatni tahrirlash</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select
          className="form-select"
          value={costTypeS}
          onChange={(e) => {
            setCostType(e.target.value);
            if (e.target.value === "Avans") {
              setAvansShow(true);
            } else {
              setAvansShow(false);
            }
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
            className="form-select mt-[5px]"
            value={userAvansValue}
            onChange={(e) => {
              setUserAvans(e.target.value);
            }}
          >
            <option value="Kimga" selected disabled>
              Kimga
            </option>
            {store.workers.map((elem) => (
              <option value={elem.name}>{elem.name}</option>
            ))}
          </select>
        ) : null}
        <div className="input-group mt-[5px]">
          <span className="input-group-text" id="basic-addon3">
            Miqdori
          </span>
          <input
            type="number"
            className="form-control"
            id="basic-url"
            aria-describedby="basic-addon3 basic-addon4"
            value={costValueS}
            onChange={(e) => {
              setCostValue(e.target.value);
            }}
          />
        </div>
        <select
          className="form-select mt-[5px]"
          value={tolovTypeS}
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
        <div className="form-floating mt-[5px]">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            value={infoValueS}
            onChange={(e) => {
              setInfoValue(e.target.value);
            }}
          ></textarea>
          <label htmlFor="floatingTextarea">Qo`shimcha ma`lumot</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {store.spinnerDeleteLoader == "loading" ? (
          <Spinner />
        ) : (
          <Button variant="primary" onClick={changeChiqimItem}>
            Saqlash
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ChiqimItemModal;
