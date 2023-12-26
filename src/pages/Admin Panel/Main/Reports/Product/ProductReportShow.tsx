import { useEffect, useRef, useState } from "react";
import { Product } from "../../../../../Generics/interfaces";
import "./ProductReportShow.css";
import { Button, Text } from "@chakra-ui/react";
import {
  formatNumberWithTwoDecimals,
  getTotalOrderItemPrice,
} from "../../../../../Generics/functions";
import { COLOURS } from "../../../../../Generics/constants";
import generatePdf from "../../../../../PDF/generatePdf";

interface Props {
  products: Product[];
}

const ProductReportShow = ({ products }: Props) => {
  // For downloading pdf
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [capture, setCapture] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setCapture(pdfRef.current);
  }, []);

  return (
    <>
      <div ref={pdfRef}>
        <Text fontSize="x-large" fontWeight="bold" width='100%' textAlign='center'>
          Product Report
        </Text>
        <table className="margin">
          <thead>
            <th>Product ID</th>
            <th className="center">Product</th>
            <th className="right">Product Price</th>
            <th>Order Count</th>
            <th>Items Count</th>
            <th className="right padding-right">Total Price</th>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
                <td className="center">{product.id}</td>
                <td className="center">{product.title}</td>
                <td className="right">
                  {formatNumberWithTwoDecimals(product.price)}
                </td>
                <td className="center">{product.orderitem_count}</td>
                <td className="center">{product.orderitem_total_quantity}</td>
                <td className="right padding-right">
                  {formatNumberWithTwoDecimals(product.orderitems_total_price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th className="right padding-right">Sub Total</th>
              <th className="right">
                {formatNumberWithTwoDecimals(getTotalOrderItemPrice(products))}
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
        width="50%"
      >
        {loader ? "Printing..." : "Print"}
      </Button>
    </>
  );
};

export default ProductReportShow;
