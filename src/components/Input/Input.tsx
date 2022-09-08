import React from "react";
import InputUnstyled, { inputUnstyledClasses, InputUnstyledProps } from "@mui/base/InputUnstyled";
import styles from "@mui/system/styled";
import styled from "@emotion/styled";
import propTypes from "prop-types";

const blue = {
   100: "#DAECFF",
   200: "#80BFFF",
   400: "#3399FF",
   500: "#007FFF",
   600: "#0072E5",
};

const grey = {
   50: "#F3F6F9",
   100: "#E7EBF0",
   200: "#E0E3E7",
   300: "#CDD2D7",
   400: "#B2BAC2",
   500: "#A0AAB4",
   600: "#6F7E8C",
   700: "#3E5060",
   800: "#2D3843",
   900: "#1A2027",
};

export const InputAdornment = styled.div`
   margin: 8px;
   display: inline-flex;
   align-items: center;
   justify-content: center;
`;

const StyledInputRoot = styles("div")(
   ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    border-radius: 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    display: flex;
    align-items: center;
    justify-content: center;
  
  
    &.${inputUnstyledClasses.focused} {
      border-color: ${blue[400]};
      outline: 1px solid ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
    }
  
    &:hover {
      border-color: ${blue[400]};
    }
  `
);

const StyledInputElement = styles("input")(
   ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.5;
    flex-grow: 1;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: inherit;
    border: none;
    border-radius: inherit;
    padding: 12px 12px;
    outline: 0;
  `
);

const CustomInput = React.forwardRef(function CustomInput(
   props: InputUnstyledProps,
   ref: React.ForwardedRef<HTMLDivElement>
) {
   const { components, style, ...other } = props;

   return (
      <InputUnstyled
         components={{
            Root: StyledInputRoot,
            Input: StyledInputElement,
            ...components,
         }}
         componentsProps={{ input: { style } }}
         {...other}
         ref={ref}
      />
   );
});

const Input = (props?: any) => {
   const { ...rest } = props;
   return <CustomInput {...rest} color="warning" />;
};

Input.propTypes = {
   type: propTypes.string,
   onChange: propTypes.func,
   value: propTypes.any,
   id: propTypes.string,
   className: propTypes.string,
   name: propTypes.string,
   style: propTypes.object,
   placeholder: propTypes.string,
   required: propTypes.bool,
   disabled: propTypes.bool,
   startAdornment: propTypes.element,
   endAdornment: propTypes.element,
};

Input.displayName = "Input";

export { Input as default };
