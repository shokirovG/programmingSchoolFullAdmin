import moment from "moment";
import React from "react";
import Table from "./Table/Table";

const ListItem = (props) => {
  return (
    <li style={{ "--i": props.index + 1 }} className="flex flex-col h-max">
      <div className="date">
        {props.kun}-{localStorage.getItem("currentMonth").split("_").join("-")}
        <span className="absolute right-[20px] text-[14px]">
          {moment(props.hisobot.createdAt).format("h:mm")}
        </span>{" "}
      </div>
      <Table {...props} index={props.index} />
    </li>
  );
};

export default ListItem;
