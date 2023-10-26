import React from 'react';
import { render, fireEvent } from "@testing-library/react"; // Remove `screen` import
import EditComment from '../src/scenes/widgets/EditComment';

describe('EditComment Component', () => {
  it('should render the EditComment component', () => {
    const comment = {
      id: 1,
      text: 'Original comment text',
    };

    const onEdit = jest.fn();

    const { getByDisplayValue, getByRole } = render( // Remove `getByText` from destructuring
      <EditComment comment={comment} onEdit={onEdit} />
    );

    const inputElement = getByDisplayValue('Original comment text');
    const saveButton = getByRole('button', { name: 'Save' });

    expect(inputElement).toBeDefined(); // Use `toBeDefined` instead of `toBeInTheDocument`

    fireEvent.change(inputElement, { target: { value: 'Updated comment text' } });
    fireEvent.click(saveButton);

    expect(onEdit).toHaveBeenCalledWith(1, 'Updated comment text');
  });
});



