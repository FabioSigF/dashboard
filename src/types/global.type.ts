export type Company = {
  _id?: string;
  name: string;
  cnpj?: string;
  category: string;
  clothing?: Array<Uniform>;
  tel?: string;
  cel?: string;
}

export type Schedule = {
  _id?: string;
  title: string;
  type: string;
  appointmentDate: string;
  isDone?: boolean;
}

//Retono de todas as vendas
export type Sellings = {
  _id?: string;
  items: Array<SellItem>;
  total_price: number;
  company_id: string;
  company_name: string;
  company_category: string;
  date: Date;
}

//Enviar venda
export type Sell = {
  id?: string;
  items: Array<SellItem>;
  total_price: number;
  company: string;
}

export type SellItem = {
  _id?: number;
  name: string;
  size: string;
  amount: number;
  color: string;
  price_unit: number;
  total_price: number;
}

export type Stock = {
  _id?: string;
  item: string;
  company: string; //ID Company
  size: string;
  amount: number;
  color: string;
}

export type Breadcrumb = {
  title: string;
  link: string;
};

export type Uniform = {
  _id?: string;
  name: string;
  sizes: [string] | string;
  colors: [string] | string;
  price: number;
};

export type User = {
  _id?: string;
  username: string;
  email: string;
}