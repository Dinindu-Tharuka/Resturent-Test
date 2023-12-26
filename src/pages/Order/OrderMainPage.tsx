import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./Componants/NavBar";
import { Outlet, useParams } from "react-router-dom";
import Billing from "./Billing/Billing";
import useOrderMutate from "../../Hooks/Orders/useOrderMutate";
import { REQUEST } from "../../Generics/constants";
import { useEffect, useState } from "react";
import useOrders from "../../Hooks/Orders/useOrders";
import { findCurrentOrder, findCurrentTakewayOrder, isOrderOpen } from "./Functions/functions";
import { Order, Table } from "../../Generics/interfaces";
import CurrentOrderContext from "../../Contexts/Orders/CurrentOrderContext";
import useAllTables from "../../Hooks/Floor/useAllTables";
import useAllTableMutate from "../../Hooks/Floor/useAllTableMutate";

//for Debug
const OrderMainPage = () => {
  let isOrderRequested = false
  const { data: orders } = useOrders();
  // for context
  const [currentOrder, setCurrentOrder] = useState<Order>();

  const { table } = useParams();
  const orderMutate = useOrderMutate(( order) => {   
    setCurrentOrder(order)
  }, REQUEST.POST);

  const {data:allTables} = useAllTables()
  const allTableMutate = useAllTableMutate(()=>{}, REQUEST.PUT)

  useEffect(()=>{
    const currentTable = allTables?.find(tab=> tab.table_no === table)

    const newTable = {
      ...currentTable,
      is_place_order:true
    } as Table

    allTableMutate.mutate(newTable)


  }, [allTables])

  


  

  useEffect(() => {
    if (
      orders !== undefined &&
      table !== undefined &&
      !isOrderOpen(orders, table) &&
      !isOrderRequested
    ) {
      
      let order = {
        table: table,
        customer_name: "customer_name",
        discount: 0,
        is_takeway: false,
        is_order_canceld: false,
        is_order_open: true,
        service_charge:10
      };

      if (table === 'T000'){
        order = {...order, is_takeway:true, service_charge:0}
        console.log('takeway')
      }
    
      //for Degub
      isOrderRequested = true

      orderMutate.mutate(order);
      
    } else {
      if (orders && table) {

        console.log('current order', setCurrentOrder(findCurrentOrder(orders, table)))
        if (table !== 'T000'){
          setCurrentOrder(findCurrentOrder(orders, table));

        }
        else{
          setCurrentOrder(findCurrentTakewayOrder(orders, table))
        }
      }
    }
  }, []);

  return (
    <CurrentOrderContext.Provider value={{ currentOrder , setCurrentOrder }}>
      <Grid templateAreas={`"nav nav" "main aside"`}>
        <GridItem area="nav" height="10vh">
          <NavBar />
        </GridItem>
        <GridItem
          area="main"
          height="90vh"
          width={{ lg: "65vw", base: "50vw" }}
        >
          <Outlet />
        </GridItem>

        <GridItem
          area="aside"
          height="90vh"
          width={{ lg: "35vw", base: "50vw" }}
        >
          <Billing />
        </GridItem>
      </Grid>
    </CurrentOrderContext.Provider>
  );
};

export default OrderMainPage;
