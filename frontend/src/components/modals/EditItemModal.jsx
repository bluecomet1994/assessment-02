import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, IconButton, Checkbox } from "@mui/material";
import Swal from "sweetalert2";

import { editItem } from "../../store/actions";

const EditItemModal = (props) => {
  const { open, handler } = props;
  const dispatch = useDispatch();
  const { currentItem } = useSelector(({ items }) => items);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [purchased, setPurchased] = useState(false);


  // update item

  const updateItem = () => {
    const requestData = {
      name,
      description,
      quantity,
      purchased
    };

    if (name && description && description.length <= 100) {
      dispatch(editItem(currentItem?._id, requestData))
        .then(() => {
          handler(false);
        });
    } else {
      Swal.fire({
        toast: true,
        icon: "warning",
        position: 'top-right',
        text: "The inputs are invalid.",
        timerProgressBar: true,
        timer: 3000,
        showConfirmButton: false
      });
    }
  }

  useEffect(() => {
    // set states only when currentItem is not null

    if (currentItem) {
      setName(currentItem.name);
      setDescription(currentItem.description);
      setQuantity(currentItem.quantity);
      setPurchased(currentItem.purchased);
    }
  }, [currentItem]);

  return (
    <div className="modal-container" style={{ display: open ? "flex" : "none" }}>
      <div className="modal">
        <header>
          <h1>SHOPPING LIST</h1>

          <IconButton className="action-button" onClick={() => handler(false)}>
            <div className="material-icons">last_page</div>
          </IconButton>
        </header>

        <div className="modal-content">
          <div className="modal-form">
            <h1>Edit an Item</h1>
            <p>Edit your item below</p>

            <TextField
              label="Item Name"
              sx={{ margin: "8px 0" }}
              value={name}
              onChange={({ target: { value } }) => setName(value)}
            />

            <div className="description-input">
              <TextField
                label="Description"
                sx={{ width: "100%" }}
                value={description}
                onChange={({ target: { value } }) => setDescription(value)}
                rows={7}
                error={description.length > 100}
                multiline
              />

              <p>{description.length} / 100</p>
            </div>

            <FormControl fullWidth sx={{ margin: "8px 0" }}>
              <InputLabel id="select-label">How many?</InputLabel>
              <Select
                labelId="select-label"
                value={quantity}
                label="How many?"
                onChange={({ target: { value } }) => setQuantity(value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>

            <div style={{ fontSize: 16 }}>
              <Checkbox onChange={() => setPurchased(!purchased)} checked={purchased} /> Purchased
            </div>
          </div>

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
              onClick={updateItem}
            >
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;