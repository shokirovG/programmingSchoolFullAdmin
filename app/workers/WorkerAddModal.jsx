import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import {
  fetchedWorkers,
  spinnerLoaded,
  spinnerLoading,
} from "../redux/actions";
import Spinner from "../components/Students/Spinner";
import { v4 } from "uuid";
const WorkerAddModal = ({ show, handleClose }) => {
  const [nameValue, setNameValue] = useState("");
  const [priceTypeValue, setPriceTypeValue] = useState("o`zgarmas");
  const [priceFoizValue, setPriceFoizValue] = useState();
  const [priceValue, setPriceValue] = useState();
  const [groupsValue, setGroupsValue] = useState([]);
  const [newGroupValue, setNewGroupValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("Kafedra");
  const { request } = useFetch();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [prioritet, setPrioritet] = useState("");
  const handleDelete = (delGroup) => {
    const newGroups = groupsValue.filter((el) => el !== delGroup);
    setGroupsValue(newGroups);
  };
  console.log(store.workers);
  const addWorker = () => {
    const workers = [
      ...store.workers,
      {
        id: v4(),
        name: nameValue,
        groups: groupsValue,
        price: priceValue,
        priceFoiz: priceFoizValue,
        priceType: priceTypeValue,
        department: departmentValue,
        prioritet,
      },
    ];
    dispatch(spinnerLoading());
    request(
      `${process.env.NEXT_PUBLIC_URL}/workers`,
      "POST",
      JSON.stringify({
        month: localStorage.getItem("currentMonth"),
        workers,
      })
    ).then(() => {
      toast.success(`${nameValue} ishchi bazaga qo'shildi!`);
      dispatch(spinnerLoaded());
      dispatch(fetchedWorkers(workers));
      setNameValue("");
      setPriceTypeValue("o`zgarmas");
      setPriceValue();
      setPriceFoizValue();
      setGroupsValue([]);
      setNewGroupValue("");
      setDepartmentValue("Kafedra");
      setPrioritet("");
      handleClose();
    });
  };
  useEffect(() => {
    request(`${process.env.NEXT_PUBLIC_URL}/workers`).then((res) => {
      const workers = res.workers.filter(
        (elem) => elem.month === localStorage.getItem("currentMonth")
      );

      if (workers.length > 0) {
        console.log(workers);
        dispatch(fetchedWorkers(workers[0].workers));
      }
    });
    //fetch workers ni worker route ga chiqarish kerak + workerlarni map qilish kerak
  }, []);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Yangi ishchi qo`shish </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-column gap-[10px]">
          <input
            type="text"
            value={prioritet}
            placeholder="Lavozimi"
            className="form-control"
            onChange={(e) => {
              setPrioritet(e.target.value);
            }}
          />
          <input
            type="text"
            value={nameValue}
            placeholder="F.I.SH"
            className="form-control"
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
          />
          <div className="flex items-center">
            <label htmlFor="oylik" className="w-[130px]">
              Oylik turi
            </label>
            <select
              value={priceTypeValue}
              className="form-select"
              onChange={(e) => {
                setPriceTypeValue(e.target.value);
              }}
            >
              <option value="o`zgarmas">o`zgarmas</option>
              <option value="foiz">foiz</option>
            </select>
          </div>

          {priceTypeValue === "foiz" ? (
            <input
              type="number"
              value={priceFoizValue}
              placeholder="kelishuv foizini kiriting"
              className="form-control"
              onChange={(e) => {
                setPriceFoizValue(e.target.value);
              }}
            />
          ) : (
            <span>
              {priceTypeValue === "o`zgarmas" ? (
                <input
                  type="number"
                  value={priceValue}
                  placeholder="oylikni qiymatini kiriting"
                  className="form-control"
                  onChange={(e) => {
                    setPriceValue(e.target.value);
                  }}
                />
              ) : null}
            </span>
          )}
          {priceTypeValue === "foiz" ? (
            <div>
              <select
                className="form-select"
                value={departmentValue}
                onChange={(e) => {
                  setDepartmentValue(e.target.value);
                }}
              >
                <option value="Kafedra" disabled selected>
                  Kafedra
                </option>
                <option value="Dasturlash">Dasturlash</option>
                <option value="K.S">K.S</option>
                <option value="Scretch">Scretch</option>
                <option value="Ingliz-tili">Ingliz-tili</option>
              </select>
              <Stack direction="row" spacing={1}>
                {groupsValue.map((elem) => (
                  <Chip
                    label={elem}
                    variant="outlined"
                    onDelete={() => {
                      handleDelete(elem);
                    }}
                  />
                ))}
              </Stack>

              <form
                className="flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  newGroupValue &&
                    setGroupsValue([...groupsValue, newGroupValue]);
                  setNewGroupValue("");
                }}
              >
                <label htmlFor="" className="w-[180px]">
                  guruh nomi
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={newGroupValue}
                  onChange={(e) => {
                    setNewGroupValue(e.target.value);
                  }}
                  placeholder="masalan front-1"
                />
                <input
                  type="submit"
                  className="btn btn-primary ml-[10px]"
                  value="qo`shish"
                />
              </form>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiqish
          </Button>
          {store.spinnerLoader === "loading" ? (
            <Spinner />
          ) : (
            <Button variant="success" onClick={addWorker}>
              Saqlash
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkerAddModal;
