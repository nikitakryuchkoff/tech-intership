const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default formatCurrency;
