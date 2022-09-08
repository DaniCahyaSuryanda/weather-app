import { Console } from "console";
import React, { useState } from "react";
import AccordionUI from "../components/AccordionUI";

const Accordion = (props : any) => {
  const [Index, setIndex] = useState(false);  
  return (
    <div>
      {props?.data?.map((row : any, index : number) => {
        return (
          <AccordionUI
            key={index}
            dataDay={row}
            Id={row.datetimeEpoch}
            Index={Index}
            setIndex={setIndex}
          ></AccordionUI>
        );
      })}
    </div>
  );
};
export default Accordion;