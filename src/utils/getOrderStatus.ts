const getOrderStatus = (
  status: string | number,
  reversed: boolean = false,
): number => {
  const statusMap: { [key: string]: number } = {
    Создан: 0,
    Оплачен: 1,
    'В транспорте': 2,
    'Доставлен в пункт': 3,
    Получен: 4,
    Архивирован: 5,
    Возврат: 6,
  };

  if (reversed) {
    const newStatusMap = Object.fromEntries(
      Object.entries(statusMap).map((item) => item.reverse()),
    );

    return newStatusMap[status];
  }

  return statusMap[status] || 0;
};

export default getOrderStatus;
