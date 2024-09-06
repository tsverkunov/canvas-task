import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import SpeedControl from "./SpeedControl";  // adjust this path to match your file structure

describe('SpeedControl Component', () => {
  test('renders the speed control component', () => {
    const setSpeedMock = jest.fn();
    const speed = 3;

    render(<SpeedControl speed={speed} setSpeed={setSpeedMock} />);

    // Check if the heading contains the correct speed text
    expect(screen.getByText(`Скорость Мага: ${speed}`)).toBeInTheDocument();

    // Check if the range input has the correct initial value
    const rangeInput = screen.getByRole('slider');
    expect(rangeInput).toBeInTheDocument();
    expect(rangeInput).toHaveValue(String(speed));
  });

  test('changes speed when the range input is changed', () => {
    const setSpeedMock = jest.fn();
    const initialSpeed = 2;

    render(<SpeedControl speed={initialSpeed} setSpeed={setSpeedMock} />);

    const rangeInput = screen.getByRole('slider');

    // Simulate changing the slider value
    fireEvent.change(rangeInput, { target: { value: '4' } });

    // Check if setSpeedMock was called with the correct value
    expect(setSpeedMock).toHaveBeenCalledWith(4);
  });

  test('range input is restricted to values between 1 and 5', () => {
    const setSpeedMock = jest.fn();
    const speed = 3;

    render(<SpeedControl speed={speed} setSpeed={setSpeedMock} />);

    const rangeInput = screen.getByRole('slider');

    // Check min and max attributes on the range input
    expect(rangeInput).toHaveAttribute('min', '1');
    expect(rangeInput).toHaveAttribute('max', '5');
  });
});