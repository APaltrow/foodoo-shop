export const useGenerateLotID = () => {
  //ID for non special orders
  const lotID = (id, title, activePrice, activeSize, specialOrder) => {
    //console.log(activePrice);
    if (specialOrder.length) {
      const order =
        specialOrder.length > 1
          ? [...specialOrder].sort().join("*")
          : [...specialOrder].join("*");
      return `${id}+${title}+${activePrice}+${activeSize}+${order}`;
    } else {
      return `${id}+${title}+${activePrice}+${activeSize}`;
    }
  };

  return {
    lotID,
  };
};
