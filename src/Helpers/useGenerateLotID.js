export const useGenerateLotID = () => {
  //ID for non special orders
  const lotID = (id, activeSize, specialOrder) => {
    //console.log(activePrice);
    if (specialOrder.length) {
      const order =
        specialOrder.length > 1
          ? [...specialOrder].sort().join("*")
          : [...specialOrder].join("*");
      return `${id}+${activeSize}+${order}`;
    } else {
      return `${id}+${activeSize}`;
    }
  };

  return {
    lotID,
  };
};
