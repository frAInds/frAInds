import React from "react";

export const BroadcastIcon = ({
  fill = 'currentColor', // Default fill color
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      width={size || width || "800px"} // Default width is taken from original SVG
      height={size || height || "800px"} // Default height is taken from original SVG
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>broadcast</title>
      <g fill="none" stroke={fill} strokeWidth={1.5}>
        <circle cx="24" cy="24" r="5"/>
        <path d="M17.4,31.5a2.1,2.1,0,0,1-2.8,3,14.3,14.3,0,0,1,0-21,2.1,2.1,0,0,1,2.8,3,10,10,0,0,0,0,15Z"/>
        <path d="M38,24a14.2,14.2,0,0,1-4.6,10.5,2.1,2.1,0,0,1-2.8-3,10,10,0,0,0,0-15,2.1,2.1,0,1,1,2.8-3A14.2,14.2,0,0,1,38,24Z"/>
        <path d="M46,24a21.1,21.1,0,0,1-6.6,15.4,2,2,0,0,1-2.8-2.8,17.4,17.4,0,0,0,0-25.2,2,2,0,0,1,2.8-2.8A21.1,21.1,0,0,1,46,24Z"/>
        <path d="M11.4,36.6a2,2,0,0,1-2.8,2.8,21.3,21.3,0,0,1,0-30.8,2,2,0,0,1,2.8,2.8,17.4,17.4,0,0,0,0,25.2Z"/>
      </g>
    </svg>
  );
};
