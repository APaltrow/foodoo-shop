import CustomButton from "../CustomButton";
import CustomIcon from "../CustomIcon";
import style from "./AddFavourite.module.scss";

const AddFavourite = ({ title, specialOrder, size, onAddToFavourites }) => {
  return (
    <div className={style.favourite_container}>
      <h3>Add to favourites</h3>
      <CustomIcon type={"small"} icon={"favourites"} />
      <p>Are you sure you would like to add ?</p>
      <h3>{title}</h3>
      <p>
        {size.size}, $ {size.price}
      </p>
      <div className={style.special_excluded}>
        {specialOrder.map((item, i) => (
          <span key={i + 33}>{item}</span>
        ))}
      </div>
      <CustomButton
        icon={"checkmark"}
        text={"Sure!"}
        action={onAddToFavourites}
      />
    </div>
  );
};

export default AddFavourite;
