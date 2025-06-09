import React from 'react';
import { render } from '@testing-library/react';
import FirefliesScene from '../../components/FirefliesScene';

test('parallax effect is disabled on mobile devices', () => {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
  const { container } = render(<FirefliesScene />);
  expect(container.querySelector('.parallax')).toBeNull();
});