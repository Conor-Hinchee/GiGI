import { render } from '@testing-library/react';
import Page from '../../pages/Page';

test('parallax effect is disabled on mobile devices', () => {
	const { container } = render(<Page />);
	expect(container.querySelector('.parallax')).toBeNull();
});