import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../app/page'; // Assuming page.tsx is at the root of src/app

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<Page />);
    // Adjust the text content to match exactly what's in src/app/page.tsx
    const headingElement = screen.getByRole('heading', { name: /Sebastian Weszler/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the "More about me..." link', () => {
    render(<Page />);
    const linkElement = screen.getByRole('link', { name: /More about me.../i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/about');
  });
});
