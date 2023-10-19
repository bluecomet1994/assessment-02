import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import ItemList from './layouts/ItemList';
import AddItemModal from './AddItemModal';
import DeleteModal from './DeleteModal';
import EditItemModal from './EditItemModal';

const itemListData = [
  {
    _id: '1',
    name: 'Item 1',
    description: 'Description 1',
    purchased: false,
  },
  {
    _id: '2',
    name: 'Item 2',
    description: 'Description 2',
    purchased: true,
  },
];

const mockDispatch = jest.fn();

mockStore.dispatch = mockDispatch;

describe('ItemList', () => {
  test('renders item list correctly', () => {
    render(
      <Provider store={mockStore}>
        <ItemList />
      </Provider>
    );

    const itemElements = screen.getAllByRole('listitem');
    expect(itemElements).toHaveLength(itemListData.length);

    itemElements.forEach((item, index) => {
      const itemName = screen.getByText(itemListData[index].name);
      const itemDescription = screen.getByText(itemListData[index].description);

      expect(itemName).toBeInTheDocument();
      expect(itemDescription).toBeInTheDocument();
    });
  });

  test('clicking on edit button opens edit modal', () => {
    render(
      <Provider store={mockStore}>
        <ItemList />
        <EditItemModal open={false} handler={mockHandler} />
      </Provider>
    );

    const editButton = screen.getByRole('button', { name: 'edit' });
    userEvent.click(editButton);

    const editModal = screen.getByRole('dialog');
    expect(editModal).toBeInTheDocument();
  });

  test('clicking on delete button opens delete modal', () => {
    render(
      <Provider store={mockStore}>
        <ItemList />
        <DeleteModal open={false} handler={mockHandler} id={mockId} />
      </Provider>
    );

    const deleteButton = screen.getByRole('button', { name: 'delete' });
    userEvent.click(deleteButton);

    const deleteModal = screen.getByRole('dialog');
    expect(deleteModal).toBeInTheDocument();
  });
});

describe('AddItemModal', () => {
  test('check for input validation', () => {
    render(
      <Provider store={mockStore}>
        <AddItemModal open={true} handler={mockHandler} />
      </Provider>
    );

    const itemNameInput = screen.getByLabelText('Item Name');
    const descriptionInput = screen.getByLabelText('Description');
    const addButton = screen.getByRole('button', { name: 'Add Task' });

    userEvent.type(itemNameInput, 'New Item');
    userEvent.type(descriptionInput, 'Description of new item');

    userEvent.click(addButton);

    expect(mockHandler).toHaveBeenCalledTimes(1);

    userEvent.clear(itemNameInput);
    userEvent.clear(descriptionInput);

    userEvent.click(addButton);

    const errorMessage = screen.getByText('The inputs are invalid.');
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('DeleteModal', () => {
  test('clicking on delete button calls deleteItem function', () => {
    render(
      <Provider store={mockStore}>
        <DeleteModal open={true} handler={mockHandler} id="1" />
      </Provider>
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    userEvent.click(deleteButton);

    expect(mockHandler).toHaveBeenCalledTimes(1);

    expect(mockDispatch).toHaveBeenCalledWith(deleteItem('1'));
  });
});

describe('EditItemModal', () => {
  test('check for input validation', () => {
    render(
      <Provider store={mockStore}>
        <EditItemModal open={true} handler={mockHandler} />
      </Provider>
    );

    const itemNameInput = screen.getByLabelText('Item Name');
    const descriptionInput = screen.getByLabelText('Description');
    const saveButton = screen.getByRole('button', { name: 'Save' });

    userEvent.type(itemNameInput, 'Updated Item');
    userEvent.type(descriptionInput, 'Updated description of the item');

    userEvent.click(saveButton);

    expect(mockHandler).toHaveBeenCalledTimes(1);

    expect(mockDispatch).toHaveBeenCalledWith(saveItem('1', {
      name: 'Updated Item',
      description: 'Updated description of the item',
    }));

    userEvent.clear(itemNameInput);
    userEvent.clear(descriptionInput);

    userEvent.click(saveButton);

    const errorMessage = screen.getByText('The inputs are invalid.');
    expect(errorMessage).toBeInTheDocument();
  });
});