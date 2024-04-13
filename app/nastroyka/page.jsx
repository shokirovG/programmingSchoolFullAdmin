"use client";

import Image from "@/node_modules/next/image";
import { Form } from "@/node_modules/react-bootstrap/esm/index";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "../components/Students/Spinner";
import { spinnerLoaded, spinnerLoading } from "../redux/actions";
import useFetch from "../hooks/useFetch";
/* eslint-disable */
function page() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [monthClone_1, setMonthClone_1] = useState("1_2024");
  const [monthClone_2, setMonthClone_2] = useState("2_2024");

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useFetch();
  useEffect(() => {
    setMonthClone_1("1_2024");
    setMonthClone_2("2_2024");
  }, []);
  console.log(monthClone_1, monthClone_2);
  const monthCloneFn = () => {
    let setCurrentStudents = [];
    let setCurrentWorkers = [];
    let setCurrentGroups = [];
    dispatch(spinnerLoading());
    request(`${process.env.NEXT_PUBLIC_URL}/students`)
      .then((res) => {
        res.students.forEach((elem) => {
          if (elem.month == monthClone_1) {
            setCurrentStudents = elem.students;
            // dispatch(fetchedStudents(elem.students));
          }
        });
        const newStudents = setCurrentStudents.map((elem) => ({
          ...elem,
          foiz: 0,
          price: 0,
        }));

        request(
          `${process.env.NEXT_PUBLIC_URL}/students`,
          "POST",
          JSON.stringify({ month: monthClone_2, students: newStudents })
        )
          .then((res) => {
            handleClose();
            toast.success("nusxalash bajarildi!");
            dispatch(spinnerLoaded());
          })
          .catch((e) => {
            console.log(e);
            toast.error("ma`lumot yuborishda hatolik yuz berdi!");
          });
      })

      .catch((e) => {
        toast.error("ma`lumot olishda xatolik yuz berdi!");
      });
    request(`${process.env.NEXT_PUBLIC_URL}/workers`)
      .then((res) => {
        console.log(res);
        res.workers.forEach((elem) => {
          if (elem.month == monthClone_1) {
            setCurrentWorkers = elem.workers;
            // dispatch(fetchedStudents(elem.students));
          }
        });

        request(
          `${process.env.NEXT_PUBLIC_URL}/workers`,
          "POST",
          JSON.stringify({ month: monthClone_2, workers: setCurrentWorkers })
        )
          .then((res) => {
            handleClose();
          })
          .catch((e) => {
            console.log(e);
            toast.error(
              "ishchilarni ma`lumotini bazaga qo'shishda xatolik yuz berdi!"
            );
          });
      })

      .catch((e) => {
        toast.error("ishchilarni ma`lumotini olishda xatolik yuz berdi!");
      });

    request(`${process.env.NEXT_PUBLIC_URL}/tables`)
      .then((res) => {
        console.log(res);
        res.groups.forEach((elem) => {
          if (elem.month == monthClone_1) {
            setCurrentGroups = elem.groups;
            // dispatch(fetchedStudents(elem.students));
          }
        });

        request(
          `${process.env.NEXT_PUBLIC_URL}/tables`,
          "POST",
          JSON.stringify({ month: monthClone_2, groups: setCurrentGroups })
        )
          .then((res) => {
            handleClose();
          })
          .catch((e) => {
            console.log(e);
            toast.error(
              "ishchilarni ma`lumotini bazaga qo'shishda xatolik yuz berdi!"
            );
          });
      })

      .catch((e) => {
        toast.error("ishchilarni ma`lumotini olishda xatolik yuz berdi!");
      });
  };
  return (
    <div className="flex flex-col items-center pt-[150px]">
      <div className="monthClone text-center p-[20px] rounded w-[80%] min-h-[200px] flex flex-col items-center gap-[20px]">
        <h4>Eski oydan nusxa olish</h4>
        <div className="flex gap-[30px] items-center">
          <div className="w-[200px]">
            <Form.Select
              value={monthClone_1}
              onChange={(e) => {
                setMonthClone_1(e.target.value);
              }}
            >
              <option value="1_2024">Yanvar</option>
              <option value="2_2024">Fevral</option>
              <option value="3_2024">Mart</option>
              <option value="4_2024">Aprel</option>
              <option value="5_2024">May</option>
              <option value="6_2024">Iyun</option>
              <option value="7_2024">Iyul</option>
              <option value="8_2024">Avgust</option>
              <option value="9_2024">Sentabr</option>
              <option value="10_2024">Oktabr</option>
              <option value="11_2024">Noyabr</option>
              <option value="12_2023">Dekabr</option>
            </Form.Select>
          </div>
          <div>
            <Image src="arrow-right.svg" width="45" height="45" />
          </div>
          <div className="w-[200px]">
            <Form.Select
              value={monthClone_2}
              onChange={(e) => {
                setMonthClone_2(e.target.value);
              }}
            >
              <option value="1_2024">Yanvar</option>
              <option value="2_2024">Fevral</option>
              <option value="3_2024">Mart</option>
              <option value="4_2024">Aprel</option>
              <option value="5_2024">May</option>
              <option value="6_2024">Iyun</option>
              <option value="7_2024">Iyul</option>
              <option value="8_2024">Avgust</option>
              <option value="9_2024">Sentabr</option>
              <option value="10_2024">Oktabr</option>
              <option value="11_2024">Noyabr</option>
              <option value="12_2023">Dekabr</option>
            </Form.Select>
          </div>
        </div>
        <div>
          <Button variant="primary" onClick={handleShow}>
            Nusxalash
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Nusxalash</Modal.Title>
            </Modal.Header>
            <Modal.Body>Nusxalashga rozimisiz ?!</Modal.Body>
            <Modal.Footer>
              {store.spinnerLoader === "loading" ? (
                <Spinner />
              ) : (
                <div className="flex gap-[10px]">
                  <Button variant="danger" onClick={handleClose}>
                    Yo`q
                  </Button>
                  <Button variant="success" onClick={monthCloneFn}>
                    Xa roziman
                  </Button>
                </div>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default page;
