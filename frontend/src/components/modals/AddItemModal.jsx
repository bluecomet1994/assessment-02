import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, IconButton, CircularProgress } from "@mui/material";
import Swal from 'sweetalert2';

import { addItem } from "../../store/actions";

const AddItemModal = (props) => {
  const { open, handler } = props;
  const dispatch = useDispatch();
  const { isLoading } = useSelector(({ items }) => items);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);


  // add item

  const handleAddItem = () => {
    const requestData = {
      name,
      description,
      quantity
    };

    if (name && description && description.length <= 100) {
      dispatch(addItem(requestData))
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
            <h1>Add an Item</h1>
            <p>Add your new item below</p>

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
              onClick={handleAddItem}
            >
              {
                isLoading ? <CircularProgress size={24} /> : "Add Task"
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;