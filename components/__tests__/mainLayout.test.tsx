import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import MainLayout from '../mainLayout';

test('renders child node', () => {
  render(
    <MainLayout>
      <h1 data-testid="child">Child</h1>
    </MainLayout>
  );

  const childComponent = screen.getByTestId('child');
  expect(childComponent).toBeTruthy();
});
