import { render, screen } from "@testing-library/react";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

test("renders default page", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/u/i);
  expect(linkElement).toBeInTheDocument();
});
