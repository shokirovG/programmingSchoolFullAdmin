import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import useFetch from "../hooks/useFetch";
import { v4 } from "uuid";
import {
  fetchedWorkers,
  spinnerDeleteLoaded,
  spinnerDeleteLoading,
  spinnerLoaded,
  spinnerLoading,
} from "../redux/actions";
import Spinner from "../components/Students/Spinner";
import { toast } from "react-toastify";
const WorkerModal = ({
  show,
  handleClose,
  name,
  priceType,
  priceFoiz,
  price,
  groups = [],
  department,
  id,
}) => {
  const [nameValue, setNameValue] = useState(name);
  const [priceTypeValue, setPriceTypeValue] = useState(priceType);
  const [priceFoizValue, setPriceFoizValue] = useState(priceFoiz);
  const [priceValue, setPriceValue] = useState(price);
  const [groupsValue, setGroupsValue] = useState(groups);
  const [newGroupValue, setNewGroupValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState(department);
  const [delWorkerValue, setDelWorkerValue] = useState("");
  const { request } = useFetch();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [prioritet, setPrioritet] = useState("");
  const handleDelete = (delGroup) => {
    const newGroups = groupsValue.filter((el) => el !== delGroup);
    setGroupsValue(newGroups);
  };
  const delWorker = () => {
    if (delWorkerValue === name) {
      const workers = store.workers.filter((elem) => elem.id !== id);

      dispatch(spinnerDeleteLoading());
      request(
        `${process.env.NEXT_PUBLIC_URL}/workers`,
        "POST",
        JSON.stringify({
          month: localStorage.getItem("currentMonth"),
          workers,
        })
      ).then(() => {
        toast.success(`${nameValue} ishchi  bazadan o'chirildi!`);
        dispatch(spinnerDeleteLoaded());
        dispatch(fetchedWorkers(workers));

        handleClose();
      });
    }
  };
  const updateWorker = () => {
    const workers = store.workers.map((elem) => {
      if (elem.id === id) {
        return {
          ...elem,
          name: nameValue,
          groups: groupsValue,
          price: priceValue,
          priceFoiz: priceFoizValue,
          priceType: priceTypeValue,
          department: departmentValue,
          prioritet,
        };
      } else {
        return elem;
      }
    });

    dispatch(spinnerLoading());
    request(
      `${process.env.NEXT_PUBLIC_URL}/workers`,
      "POST",
      JSON.stringify({
        month: localStorage.getItem("currentMonth"),
        workers,
      })
    ).then(() => {
      toast.success(`${nameValue} ishchi  ma'lumotlari yangilandi!`);
      dispatch(spinnerLoaded());
      dispatch(fetchedWorkers(workers));

      handleClose();
    });
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ishchi sozlamasi</Modal.Title>
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
            <label htmlFor="oylik" className="w-[100px]">
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
              placeholder="foiz"
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
                  placeholder="o`zgarmas"
                  className="form-control"
                  onChange={(e) => {
                    setPriceValue(e.target.value);
                  }}
                />
              ) : null}
            </span>
          )}
          {priceType === "foiz" ? (
            <div className="flex flex-col gap-[10px]">
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
          <div className="flex justify-between w-[100%] items-center">
            <div className="flex flex-col justify-center gap-[10px]">
              <input
                type="text"
                className="form-control"
                placeholder="Ishchini ismini yozing"
                value={delWorkerValue}
                onChange={(e) => {
                  setDelWorkerValue(e.target.value);
                }}
              />
              {store.spinnerDeleteLoader === "loading" ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Button variant="danger" onClick={delWorker}>
                  Ishchini o`chirish
                </Button>
              )}
            </div>
            <div className="flex gap-[10px] items-center">
              <Button variant="secondary" onClick={handleClose}>
                Chiqish
              </Button>
              <div>
                {store.spinnerLoader === "loading" ? (
                  <Spinner />
                ) : (
                  <Button variant="success" onClick={updateWorker}>
                    Yangilash
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkerModal;
