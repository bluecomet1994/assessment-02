import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress } from "@mui/material";

import Empty from '../components/Empty';
import Item from "../components/Item";
import AddItemModal from "../components/modals/AddItemModal";
import EditItemModal from "../components/modals/EditItemModal";
import DeleteModal from "../components/modals/DeleteModal";

import { getItems } from "../store/actions";

function ItemList() {
  const dispatch = useDispatch();
  const { isLoading, data: items } = useSelector(({ items }) => items);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return isLoading ? (
    <CircularProgress size={96} sx={{ margin: "128px 0" }} />
  ) : (
    <>
      {
        items.length > 0 ? (
          <div className='list-container'>
            <header>
              <h1>Your items</h1>

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
                onClick={() => setAddModalOpen(true)}
              >
                Add Item
              </Button>
            </header>

            {
              items.map(item => (
                <Item
                  key={item._id}
                  data={item}
                  openEdit={setEditModalOpen}
                  openDelete={setDeleteModalOpen}
                  setDeleteId={setDeleteId}
                />
              ))
            }
          </div>
        ) : (
          <Empty openModal={() => { setAddModalOpen(true); console.log("here") }} />
        )
      }
      <AddItemModal open={addModalOpen} handler={setAddModalOpen} />
      <EditItemModal open={editModalOpen} handler={setEditModalOpen} />
      <DeleteModal open={deleteModalOpen} handler={setDeleteModalOpen} id={deleteId} />
    </>
  )
}

export default ItemList;