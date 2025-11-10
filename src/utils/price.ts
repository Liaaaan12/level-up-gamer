export const parsePrice = (precio: string) => {
  // Convierte strings como "$59.990 CLP" a número 59990
  const digits = precio.replace(/[^0-9]/g, '');
  return Number(digits) || 0;
};

export const formatPrice = (amount: number) => {
  return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' CLP';
};

export default { parsePrice, formatPrice };
