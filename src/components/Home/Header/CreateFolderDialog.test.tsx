import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import CreateFolderDialog from './CreateFolderDialog';
import { useCurrentDirectoryId } from '../useCurrentDirectoryId';
import { useApiClient } from '../../../api/useApiClient';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';

jest.mock('../useCurrentDirectoryId', () => ({
  useCurrentDirectoryId: jest.fn()
}));

jest.mock('../../../api/useApiClient', () => ({
  useApiClient: jest.fn()
}));

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQueryClient: jest.fn()
}));

it('creates directory and closes itself', async () => {
  const parentDirectoryId = '1234';
  const dirName = 'photos';

  const closeDialogFn = jest.fn();

  const createDirFn = jest.fn();

  (useCurrentDirectoryId as jest.Mock).mockReturnValue(parentDirectoryId);
  (useApiClient as jest.Mock).mockReturnValue({
    createDirectory: createDirFn
  });

  const queryClient = new QueryClient();

  const invalidateQueriesFn = jest.fn();

  (useQueryClient as jest.Mock).mockReturnValue({
    invalidateQueries: invalidateQueriesFn
  });

  const { getByText, getByPlaceholderText } = render(
    <QueryClientProvider client={queryClient}>
      <CreateFolderDialog onClose={closeDialogFn} visible={true} />
    </QueryClientProvider>
  );

  fireEvent.changeText(getByPlaceholderText('Folder name'), dirName);

  await act(async () => {
    await fireEvent.press(getByText('Create'));
  });

  expect(createDirFn).toHaveBeenCalledWith(
    expect.objectContaining({
      parentDirectoryId: parentDirectoryId,
      name: dirName
    })
  );

  expect(closeDialogFn).toHaveBeenCalled();

  expect(invalidateQueriesFn).toHaveBeenCalledWith('listDirectory');
});
