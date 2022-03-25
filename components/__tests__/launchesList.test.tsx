import { expect, test, beforeEach } from '@jest/globals';
import user from '@testing-library/user-event';
import { render, screen, act, waitFor } from '@testing-library/react';
import LaunchesList from '../launchesList';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// jest.spyOn(global, 'fetch')
const flightObj = () => ({
  flight_number: uuidv4(),
  mission_name: 'Random Mission Name',
  launch_date_utc: '22-03-2021',
  rocket: {
    first_stage: {
      cores: [
        {
          core_serial: 'serial01',
        },
      ],
    },
    second_stage: {
      payloads: [
        {
          payload_id: 'id01',
          payload_type: 'type01',
        },
      ],
    },
  },
  links: {
    mission_patch_small: '/spacex_logo.png',
  },
  launch_success: false,
  launch_failure_details: {
    reason: 'Something went wrong',
  },
});

const mockResponse = () => [flightObj()];

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => {
    return {
      status: 200,
      json: () => mockResponse(),
    };
  });
});

test('sends an API request on render', async () => {
  const promise = Promise.resolve();
  render(<LaunchesList />);

  expect(global.fetch).toHaveBeenCalledTimes(1);

  await act(() => promise);
});

test('fetches mored data on "Load more..." click', async () => {
  const promise = Promise.resolve();
  render(<LaunchesList />);

  await waitFor(() => expect(screen.getByText(/load more/i)).toBeTruthy());

  const loadMoreBtn = screen.getByText(/load more/i);

  user.click(loadMoreBtn);

  expect(global.fetch).toHaveBeenCalledTimes(2);

  await act(() => promise);
});
