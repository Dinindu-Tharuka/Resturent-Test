import { Button } from "@chakra-ui/react";
import {Table } from "../../Generics/interfaces";
import { COLOURS, SIZES } from "../../Generics/constants";
import { useNavigate } from "react-router-dom";

interface props {
  table: Table;
}

const TableButton = ({ table }: props) => {

  console.log(table)
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/dining/order/${table.table_no}`);
  };
  return (
    <Button
      width={SIZES.TABLE_BUTTON_WIDTH}
      height={SIZES.TABLE_BUTTON_HEIGHT}
      borderRadius={50}
      boxShadow="lg"
      onClick={onClick}
      bg={table.is_place_order && table.is_vip ? COLOURS.VIP_COLOR : table.is_place_order ? COLOURS.ORDER_PLACE_COLOR : ''}
      color={table.is_place_order ? COLOURS.MAIN_PAGE_WHITE : ""}
    >
      {table.table_no}
    </Button>
  );
};

export default TableButton;
