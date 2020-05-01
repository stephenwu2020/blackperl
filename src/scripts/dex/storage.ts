const key = "gamma-orders";
let orders: any[] = [];

const init = () => {
  const data = localStorage.getItem(key);
  orders = data ? JSON.parse(data) : [];
};

const save = () => {
  localStorage.setItem(key, JSON.stringify(orders));
};

const getOrders = (): any[] => {
  return orders;
};

const addOrder = (order: any) => {
  const index = orders.findIndex(e => {
    return e.transactionHash === order.transactionHash;
  });
  if (index !== -1) return;
  orders.push(order);
  save();
};

const removeOrder = (order: any) => {
  const index = orders.findIndex(e => {
    return e.transactionHash === order.transactionHash;
  });
  if (index === -1) return;
  orders.splice(index, 1);
  save();
};

const clear = () => {
  orders = [];
  save();
};

const setLanguage = (language: string) => {
  localStorage.setItem("gamma-language", language);
};

const getLanguage = (): string => {
  const result = localStorage.getItem("gamma-language");
  return result || "en";
};

init();

export default {
  getOrders,
  addOrder,
  removeOrder,
  clear,
  setLanguage,
  getLanguage
};
