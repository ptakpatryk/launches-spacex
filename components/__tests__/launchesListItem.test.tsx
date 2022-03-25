import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import LaunchesListItem, { LaunchesListItemProps } from '../launchesListItem';

function setupProps() {
  const launchProps: LaunchesListItemProps = {
    launch: {
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
    },
  };
  return { launchProps };
}

test('renders launch patch/badge', () => {
  const { launchProps } = setupProps();
  render(<LaunchesListItem launch={launchProps.launch} />);

  const img = screen.getByRole('img');
  expect(img).toBeTruthy();
});

test('shows when launch failed', () => {
  const { launchProps } = setupProps();

  render(<LaunchesListItem launch={launchProps.launch} />);

  const failedMsg = screen.getByText('Launch failed');
  expect(failedMsg).toBeTruthy();
});

test('shows when launch successed', () => {
  const { launchProps } = setupProps();

  launchProps.launch.launch_success = true;

  render(<LaunchesListItem launch={launchProps.launch} />);

  const successMsg = screen.getByText('Launch successful');
  expect(successMsg).toBeTruthy();
});
