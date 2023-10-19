import React from "react";
import { useDispatch } from "react-redux";
import { Button, Dialog, DialogContent } from "@mui/material";

import { deleteItem } from "../../store/actions";

const DeleteModal = (props) => {
  const { open, handler, id } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteItem(id))
      .then(() => handler(false));
  }

  return (
    <Dialog open={open} onClose={() => handler(false)}>
      <DialogContent style={{ width: 450 }}>
        <h1>Delete Item?</h1>
        <p className="delete-modal-content">
          Are you sure you want to delete this item? This can not be undone.
        </p>

        <div className="action-container">
          <Button
            sx={{
              fontSize: 14,
              padding: "8px 24px",
              margin: "0 4px",
              textTransform: "none",
              color: "black",
              boxShadow: "none"
            }}
            onClick={() => handler(false)}
          >
            Cancel
          </Button>

          <Button
            variant='contained'
            sx={{
              fontSize: 14,
              padding: "8px 24px",
              margin: "0 4px",
              textTransform: "none",
              backgroundColor: "#1871E8",
              boxShadow: "none"
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteModal;