import React from 'react';
import { Button } from '@mui/material';

function Empty(props) {
  const { openModal } = props;

  return (
    <div className="empty-scene">
      <div className="empty-card">
        <h1>Your shopping list is empty :(</h1>
        <Button
          variant='contained'
          sx={{
            fontSize: 18,
            padding: "8px 24px",
            textTransform: "none",
            backgroundColor: "#1871E8"
          }}
          onClick={openModal}
        >
          Add your first item
        </Button>
      </div>
    </div>
  );
};

export default Empty;