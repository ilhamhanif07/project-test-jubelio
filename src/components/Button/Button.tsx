/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import Button$1 from "@mui/material/Button";

interface Props {
   type?: string;
   onClick?: () => void;
   target?: string;
   className?: string;
   isExternal?: boolean;
   btnProps?: object;
   style?: object;
   href?: any;
   children?: React.ReactNode;
}

export const Button = (props: Props) => {
   const className = [props.className];

   const onClick = () => {
      if (props.onClick) props.onClick();
   };

   if (props.type === "link") {
      if (props.isExternal) {
         return (
            <a
               href={props.href}
               className={className.join(" ")}
               style={props.style}
               target={"_blank "}
               rel={"noopener noreferrer"}
            >
               {props.children}
            </a>
         );
      } else {
         return (
            <Link
               to={props.href}
               className={className.join(" ")}
               style={props.style}
               onClick={onClick}
            >
               {props.children}
            </Link>
         );
      }
   }
   return (
      <Button$1
         className={className.join(" ")}
         style={props.style}
         onClick={onClick}
         {...props.btnProps}
      >
         {props.children}
      </Button$1>
   );
};

Button.propTypes = {
   type: propTypes.oneOf(["button", "link"]),
   onClick: propTypes.func,
   target: propTypes.string,
   className: propTypes.string,
   isExternal: propTypes.bool,
   btnProps: propTypes.object,
   style: propTypes.object,
};
