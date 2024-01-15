import React from 'react';
import renderer from 'react-test-renderer';
import EditComment from '../src/scenes/widgets/EditComment';

describe('EditComment Snapshot Test', () => {
  it('matches the snapshot', () => {
    const comment = {
      id: 1,
      text: 'Original comment text',
    };

    const onEdit = jest.fn();

    const tree = renderer.create(
      <EditComment comment={comment} onEdit={onEdit} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
