import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

describe('<Header />', () => {
  test('renders "DeepWork Tracker" in h1 tag', () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    const titleElement = screen.getByText(/DeepWork Tracker/i);
    expect(titleElement).toBeInTheDocument();
  });


  test('renders "good to see you" if the button was NOT clicked', () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    const aboutLinkElement = screen.getByText('About');
    expect(aboutLinkElement).toBeInTheDocument();
  });
});