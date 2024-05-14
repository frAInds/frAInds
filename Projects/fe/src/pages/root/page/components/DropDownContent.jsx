import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const DropdownContent = ({ name, color, items }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" color={color}>{name}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {items.map((item, index) => (
          <DropdownItem key={index}>
            <Link to={item.url} className="inline-block w-full h-full">
                {item.name}
            </Link>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownContent;
