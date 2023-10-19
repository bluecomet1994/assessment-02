import React from "react";
import { useDispatch } from "react-redux";
import { Checkbox, IconButton } from "@mui/material";
import { purchaseItem, selectItem } from "../store/actions";

function Item(props) {
  const { data, openEdit, openDelete, setDeleteId } = props;
  const { name, description, purchased } = data;
  const dispatch = useDispatch();

  
  // open edit modal when click edit icon button
  const openEditModal = () => {
    dispatch(selectItem(data));
    openEdit(true);
  }

  // toggle checkpoint when click checkbox
  const togglePurchase = () => {
    dispatch(purchaseItem(data._id));
  }
  
  // open delete modal when click edit icon button
  const confirmDelete = () => {
    setDeleteId(data._id);
    openDelete(true);
  }

  return (
    <div className="item" style={{ backgroundColor: purchased ? "#D5DFE92B" : "white" }}>
      <div className="flex">
        <Checkbox checked={purchased} onChange={togglePurchase} />
        <div className="item-title">
          <h1 className={purchased ? "checked" : ""}>{name}</h1>
          <p className={purchased ? "checked" : ""}>{description}</p>
        </div>
      </div>

      <div className="flex">
        <IconButton className="action-button" onClick={openEditModal}>
          <div className="material-icons">edit</div>
        </IconButton>

        <IconButton className="action-button" onClick={confirmDelete}>
          <div className="material-icons">delete</div>
        </IconButton>
      </div>
    </div>
  )
}

export default Item;