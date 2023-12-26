import { Order, ROOM_BUTTON } from "../../../Generics/interfaces";

export const makeOrderTables = (
  tablebuttons: ROOM_BUTTON[],
  orders: Order[]
) => {
  let tables : string[] = []

  orders
        .filter(order => !order.is_takeway)
        .filter(order => order.is_order_open)
        .forEach((order, index) => {
            tables[index] = order.table !== undefined ? order.table : ''
        })
  console.log('coverted', orders)

  return tablebuttons.map(table => tables.includes(table.table_no) ? {...table, is_placed_order:true}: table)
};
