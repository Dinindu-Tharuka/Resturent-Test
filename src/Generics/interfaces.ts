export interface ROOM_BUTTON {
  table_no: string;
  is_placed_order: boolean;
}

export interface UserProfile {
  id: number;
  user_account_id: number;
  first_name: string;
  last_name: string;
  telephone: string;
  address: string;
}

export interface User {
  id: number;
  user_name: string;
  email: string;
  is_chef: boolean;
  is_cashier: boolean;
  is_superuser: boolean;
  password?: string;
  re_password?: string;
  is_active: boolean;
  is_staff?: boolean;
}

export interface PaginationStructure<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface UserProfile {
  id: number;
  user_account_id: number;
  first_name: string;
  last_name: string;
  telephone: string;
  address: string;
}

export interface Category {
  id: number;
  title: string;
  is_food: boolean;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category_id: number;
  orderitem_count:number;
  orderitem_total_quantity:number;
  orderitems_total_price:number;
}

export interface OrderItem{
  id:number;
  product_id:number;
  order_id:number;
  quantity:number;
  item_total:number;
  datetime?:string;
  is_ok_in_kitchen?:boolean;
}

export interface Order{
  id?:number;
  table?:string;
  customer_name:string;
  discount:number;
  is_takeway:boolean;
  date?:string;
  orderitems?:OrderItem[];
  total?:number;
  is_order_canceld:boolean;
  is_order_open:boolean;
  total_product_price?:number;
  service_charge?:number;
  service_charge_price?:number;
}

export interface Table{
  id:number;
  table_no:string;
  is_place_order:boolean;
  floor_id:number;
  is_vip:boolean;
  
}

export interface Floor{
  id:number;
  floor_number:number;
  table_start_number:string;
  table_end_number:string;
  vip_table_start_number:string; 
  vip_table_end_number:string;
  table_count:number;
  vip_table_count:number;
  tables:Table[]
}
