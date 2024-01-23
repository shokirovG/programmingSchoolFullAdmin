"use client";

import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
import { useState, useEffect } from "react";
import { logOut } from "../redux/actions";
import { useDispatch } from "@/node_modules/react-redux/dist/react-redux";
import Snow from "./animations/Snow";

export default function SideBar() {
  const [currentPage, setCurrentPage] = useState("hisobot");
  const dispatch = useDispatch();
  const addActiveClass = (e: any) => {
    // setCurrentPage(e.target.id);
    localStorage.setItem("currentPage", e.target.id);
    const items: any = document.getElementsByClassName("sidebar__item");
    for (let item of items) {
      item.classList.remove("active__bg");
    }
    console.log(items);

    if (e.target.classList.contains("sidebar__item")) {
      e.target.classList.add("active__bg");
    } else {
      e.target.parentElement.classList.add("active__bg");
    }
  };
  useEffect(() => {
    const items: any = document.getElementsByClassName("sidebar__item");

    for (let item of items) {
      if (item.id == localStorage.getItem("currentPage")) {
        item.classList.add("active__bg");
      } else {
        item.classList.remove("active__bg");
      }
    }
  }, []);
  return (
    <>
      {/* <div className="animation">
        <Snow />
      </div> */}
      <div className="h-[100vh]   fixed w-[230px] ">
        <div className="flex sidebar flex-col items-center  pb-[50px] justify-between h-[100%] ">
          <div className=" flex w-[154px]  flex-col gap-[48px] mt-[47px]">
            <div className="flex flex-col items-center gap-[12px] relative">
              <Image
                alt="#"
                src="/logo.png"
                width="80"
                height="80"
                id="navbarLogo"
              />
              <div className="logo__text">
                <h4>Programming</h4>
                <p>School</p>
              </div>
              <div className="w-[230px] h-[2px] bg-[#F4F7FE]  absolute bottom-[-26px]"></div>
            </div>
            <div className="flex flex-col gap-[10px] sidebar__items">
              {/* <Link
                id="hisobot"
                className="id_0 sidebar__item flex gap-[14px] items-center pl-[10px] rounded-[5px] text-[#A3AED0] cursor-pointer hover:text-[#FFFFFF] hover:bg-[#4318FF] w-[154px] h-[35px] "
                href="/"
                onClick={addActiveClass}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_329_729)">
                    <path
                      className="sidebar__svg"
                      d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z"
                      fill="#A3AED0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_329_729">
                      <rect width="18" height="18" fill="#A3AED0" />
                    </clipPath>
                  </defs>
                </svg>
                Hisobot
              </Link> */}

              <Link
                id="students"
                className="id_1 sidebar__item flex gap-[14px] items-center pl-[10px] rounded-[5px] text-[#A3AED0] cursor-pointer hover:text-[#FFFFFF] hover:bg-[#4318FF] w-[154px] h-[35px] "
                href="/students"
                onClick={addActiveClass}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_319_90)">
                    <path
                      className="sidebar__svg"
                      d="M3.5 18.49L9.5 12.48L13.5 16.48L22 6.92L20.59 5.51L13.5 13.48L9.5 9.48L2 16.99L3.5 18.49Z"
                      fill="#A3AED0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_319_90">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                O`quvchilar
              </Link>
              {/* <Link
                id="ishchilar"
                className="id_1 sidebar__item flex gap-[14px] items-center pl-[10px] rounded-[5px] text-[#A3AED0] cursor-pointer hover:text-[#FFFFFF] hover:bg-[#4318FF] w-[154px] h-[35px] "
                href="/workers"
                onClick={addActiveClass}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_319_95)">
                    <path
                      className="sidebar__svg"
                      d="M12 9C14.21 9 16 7.21 16 5C16 2.79 14.21 1 12 1C9.79 1 8 2.79 8 5C8 7.21 9.79 9 12 9ZM12 3C13.1 3 14 3.9 14 5C14 6.1 13.1 7 12 7C10.9 7 10 6.1 10 5C10 3.9 10.9 3 12 3ZM12 11.55C9.64 9.35 6.48 8 3 8V19C6.48 19 9.64 20.35 12 22.55C14.36 20.36 17.52 19 21 19V8C17.52 8 14.36 9.35 12 11.55ZM19 17.13C16.47 17.47 14.07 18.43 12 19.95C9.94 18.43 7.53 17.46 5 17.12V10.17C7.1 10.55 9.05 11.52 10.64 13L12 14.28L13.36 13.01C14.95 11.53 16.9 10.56 19 10.18V17.13V17.13Z"
                      fill="#A3AED0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_319_95">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Ishchilar
              </Link> */}

              {/* <div className="sidebar__item flex gap-[14px] items-center pl-[10px] rounded-[5px] text-[#A3AED0] cursor-pointer hover:text-[#FFFFFF] hover:bg-[#4318FF] w-[154px] h-[35px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    className="sidebar__svg"
                    d="M11.19 1.36L4.19 4.47C3.47 4.79 3 5.51 3 6.3V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V6.3C21 5.51 20.53 4.79 19.81 4.47L12.81 1.36C12.3 1.13 11.7 1.13 11.19 1.36V1.36ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z"
                    fill="#A3AED0"
                  />
                </svg>
                <span onClick={addActiveClass}>Security</span>
              </div>
              <div className="sidebar__item flex gap-[14px] items-center pl-[10px] rounded-[5px] text-[#A3AED0] cursor-pointer hover:text-[#FFFFFF] hover:bg-[#4318FF] w-[154px] h-[35px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_319_104)">
                    <path
                      className="sidebar__svg"
                      d="M20 3H19V1H17V3H7V1H5V3H4C2.9 3 2 3.9 2 5V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V5C22 3.9 21.1 3 20 3ZM20 21H4V10H20V21ZM20 8H4V5H20V8Z"
                      fill="#A3AED0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_319_104">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span onClick={addActiveClass}>Schedules</span>
              </div>
              <div className="sidebar__item flex gap-[14px] items-center pl-[10px] rounded-[5px] text-[#A3AED0] cursor-pointer hover:text-[#FFFFFF] hover:bg-[#4318FF] w-[154px] h-[35px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_319_109)">
                    <path
                      className="sidebar__svg"
                      d="M21 7.28V5C21 3.9 20.1 3 19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V16.72C21.59 16.37 22 15.74 22 15V9C22 8.26 21.59 7.63 21 7.28ZM20 9V15H13V9H20ZM5 19V5H19V7H13C11.9 7 11 7.9 11 9V15C11 16.1 11.9 17 13 17H19V19H5Z"
                      fill="#A3AED0"
                    />
                    <path
                      className="sidebar__svg"
                      d="M16 13.5C16.8284 13.5 17.5 12.8284 17.5 12C17.5 11.1716 16.8284 10.5 16 10.5C15.1716 10.5 14.5 11.1716 14.5 12C14.5 12.8284 15.1716 13.5 16 13.5Z"
                      fill="#A3AED0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_319_109">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span onClick={addActiveClass}>Payouts</span>
              </div>
              <div className="sidebar__item flex gap-[14px] items-center pl-[10px] rounded-[5px] text-[#A3AED0] cursor-pointer hover:text-[#FFFFFF] hover:bg-[#4318FF] w-[154px] h-[35px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_319_115)">
                    <path
                      className="sidebar__svg"
                      d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.57 5.11 19.4 5.02 19.22 5.02C19.16 5.02 19.1 5.03 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99999C9.74999 2 9.53999 2.18 9.50999 2.42L9.12999 5.07C8.51999 5.32 7.95999 5.66 7.43999 6.05L4.94999 5.05C4.88999 5.03 4.82999 5.02 4.76999 5.02C4.59999 5.02 4.42999 5.11 4.33999 5.27L2.33999 8.73C2.20999 8.95 2.26999 9.22 2.45999 9.37L4.56999 11.02C4.52999 11.34 4.49999 11.67 4.49999 12C4.49999 12.33 4.52999 12.66 4.56999 12.98L2.45999 14.63C2.26999 14.78 2.21999 15.05 2.33999 15.27L4.33999 18.73C4.42999 18.89 4.59999 18.98 4.77999 18.98C4.83999 18.98 4.89999 18.97 4.94999 18.95L7.43999 17.95C7.95999 18.35 8.51999 18.68 9.12999 18.93L9.50999 21.58C9.53999 21.82 9.74999 22 9.99999 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.11 18.97 19.17 18.98 19.23 18.98C19.4 18.98 19.57 18.89 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98V12.98ZM17.45 11.27C17.49 11.58 17.5 11.79 17.5 12C17.5 12.21 17.48 12.43 17.45 12.73L17.31 13.86L18.2 14.56L19.28 15.4L18.58 16.61L17.31 16.1L16.27 15.68L15.37 16.36C14.94 16.68 14.53 16.92 14.12 17.09L13.06 17.52L12.9 18.65L12.7 20H11.3L11.11 18.65L10.95 17.52L9.88999 17.09C9.45999 16.91 9.05999 16.68 8.65999 16.38L7.74999 15.68L6.68999 16.11L5.41999 16.62L4.71999 15.41L5.79999 14.57L6.68999 13.87L6.54999 12.74C6.51999 12.43 6.49999 12.2 6.49999 12C6.49999 11.8 6.51999 11.57 6.54999 11.27L6.68999 10.14L5.79999 9.44L4.71999 8.6L5.41999 7.39L6.68999 7.9L7.72999 8.32L8.62999 7.64C9.05999 7.32 9.46999 7.08 9.87999 6.91L10.94 6.48L11.1 5.35L11.3 4H12.69L12.88 5.35L13.04 6.48L14.1 6.91C14.53 7.09 14.93 7.32 15.33 7.62L16.24 8.32L17.3 7.89L18.57 7.38L19.27 8.59L18.2 9.44L17.31 10.14L17.45 11.27ZM12 8C9.78999 8 7.99999 9.79 7.99999 12C7.99999 14.21 9.78999 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 9.99999 13.1 9.99999 12C9.99999 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z"
                      fill="#A3AED0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_319_115">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span onClick={addActiveClass}>Settings</span>
              </div> */}
            </div>
          </div>

          {/* <div className="w-[154px] flex gap-[14px] cursor-pointer sidebar__logout items-center ">
            <Image src="/log-out.png" alt="#" width="24" height="24" />
            <p
              className="m-0"
              onClick={() => {
                dispatch(logOut());
              }}
            >
              Log Out
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
}
