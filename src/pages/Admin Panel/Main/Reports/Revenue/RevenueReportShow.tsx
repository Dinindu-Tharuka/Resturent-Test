import { useEffect, useRef, useState } from "react";
import {
  formatNumberWithTwoDecimals,
  getConvertedDate,
  getDiscountTotal,
  getProductTotal,
  getServiceTotal,
  getSubTotal,
} from "../../../../../Generics/functions";
import { Order } from "../../../../../Generics/interfaces";
import "./RevenueReportShow.css";
import { Button, Text } from "@chakra-ui/react";
import { COLOURS } from "../../../../../Generics/constants";
import generatePdf from "../../../../../PDF/generatePdf";

interface Props {
  orders: Order[];
}
const RevenueReportShow = ({ orders }: Props) => {
  // For downloading pdf
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [capture, setCapture] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setCapture(pdfRef.current);
  }, []);
  
  return (
    <>
      <div ref={pdfRef} >
        <Text fontSize='lg' fontWeight='bold' width='100%' textAlign='center'>Revenue Report</Text>
        <table className="margin">
          <thead>
           
            <th className="right">Table</th>
            <th className="center">Date</th>
            <th className="right">Discount</th>
            <th>Service charge</th>
            <th className="right">Total</th>
            <th className="right padding-right">Sub Total</th>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                
                <td>{order.table}</td>
                <td>{getConvertedDate(order.date)}</td>
                <td>{order.discount}</td>
                <td className="center">{order.service_charge}%</td>
                <td>{formatNumberWithTwoDecimals(order.total_product_price ? order.total_product_price:0)}</td>
                <td className="padding-right">{formatNumberWithTwoDecimals(order.total ? order.total : 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="margin">
          <thead>
            <tr>
              <th className="right">Sub Total</th>
              <th className="right padding-right">
                {formatNumberWithTwoDecimals(getSubTotal(orders))}
              </th>
            </tr>
            <tr>
              <th className="right">Product Total</th>
              <th className="right padding-right">
                {formatNumberWithTwoDecimals(getProductTotal(orders))}
              </th>
            </tr>
            <tr>
              <th className="right">Service Total</th>
              <th className="right padding-right">
                {formatNumberWithTwoDecimals(getServiceTotal(orders))}
              </th>
            </tr>
            <tr>
              <th className="right">Discount Total</th>
              <th className="right  padding-right">
                {formatNumberWithTwoDecimals(getDiscountTotal(orders))}
              </th>
            </tr>
            <tr>
              <th className="padding-bottom"></th>
            </tr>
          </thead>
        </table>

      </div>
        <Button
          bg={COLOURS.OK_COLOUR}
          mr={3}
          onClick={() => generatePdf(capture, setLoader)}
          width='50%'
        >
          {loader ? "Printing..." : "Print"}
        </Button>
    </>
  );
};

export default RevenueReportShow;
