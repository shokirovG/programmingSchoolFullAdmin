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
import Image from "next/image";
import React, { useState } from "react";
import Spinner from "../../Students/Spinner";
import HarajatItemModal from "./HarajatItemModal";
const HarajatItem = ({ kun }) => {
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
    <div>
      <button
        title="Harajat"
        type="button"
        className="btn "
        onClick={() => {
          handleShow();
          localStorage.setItem("currentDay", kun);
        }}
      >
        <Image src="/minus.png" alt="#" width="30" height="15" />
      </button>
      <HarajatItemModal handleClose={handleClose} show={show} />
    </div>
  );
};

export default HarajatItem;
