export type School = {
  name: string;
  category: string;
  //colors: Array<string>;
  colors: string;
  //sizes: Array<string>;
  sizes: string;
}

export type Company = {
  name: string;
  cnpj: string;
  category: string;
  //sizes: Array<string>;
  sizes: string;
  tel: string;
  cel: string;
}

export type Schedule = {
  title: string;
  type: string;
  appointmentDate: Date;
  isDone: boolean;
}

export type Sellings = {
  items: Array<Uniform>;
  total_price: number;
  school: string; //ID School
  date: Date;
}

export type Stock = {
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
  name: string;
  size: string;
  amount: number;
  color: string;
  price_unit: number;
  total_price: number;
};

export type User = {
  username: string;
  email: string;
}