import { Order, Product } from "./interfaces";

export const getConvertedDateTime = (date?: string) => {
  const dateConverted = new Date(date ? date : "");

  return `${dateConverted.toDateString()}  ${dateConverted.toLocaleTimeString()}`;
};

export const getConvertedDate = (date?: string) => {
  const dateConverted = new Date(date ? date : "");
  return `${dateConverted.toDateString()}`;
};

// Formating numbers
export const formatNumberWithTwoDecimals = (num:number)=> {

    let formattedNumber = parseFloat(num+'').toFixed(2);
    // Check if the number has no decimal places
    if (formattedNumber.indexOf('.') === -1) {
      formattedNumber += '.00';
    }
    return formattedNumber;
  }

//// Order Revenue Report
export const getSubTotal = (orders: Order[]) => {
  const subtotal = orders.reduce((accumilator, currentObj) => {
    return accumilator + (currentObj.total ? currentObj.total : 0);
  }, 0);

  return subtotal;
};

export const getProductTotal = (orders: Order[]) => {
  const subtotal = orders.reduce((accumilator, currentObj) => {
    return accumilator + (currentObj.total_product_price ? currentObj.total_product_price : 0);
  }, 0);

  return subtotal;
}

export const getServiceTotal = (orders: Order[]) => {
  const subtotal = orders.reduce((accumilator, currentObj) => {
    return accumilator + (currentObj.service_charge_price ? currentObj.service_charge_price : 0);
  }, 0);

  return subtotal;
}

export const getDiscountTotal = (orders: Order[]) => {
  const subtotal = orders.reduce((accumilator, currentObj) => {
    return accumilator + (currentObj.discount ? currentObj.discount : 0);
  }, 0);

  return subtotal;
}

/// Products Report
export const getTotalOrderItemPrice = (orders: Product[]) => {
  const subtotal = orders.reduce((accumilator, currentObj) => {
    return accumilator + (currentObj.orderitems_total_price ? currentObj.orderitems_total_price : 0);
  }, 0);

  return subtotal;
}

