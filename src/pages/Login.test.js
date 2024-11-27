import { fireEvent, render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../service/store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Login from "./Login";
import { initialData } from "../service/actions/shared";

describe("Login", () => {
    // Cleanup after each test to avoid memory leaks
    afterEach(() => {
        cleanup(); // Ensures components are removed after each test
        jest.resetAllMocks(); // Clears all mocks like `global.alert`
    });

    it("Render success Login component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("Submit button login", async () => {
        // Dispatch the initial data
        await store.dispatch(initialData());

        const wrapper = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        // Select elements
        const loginHeadingElement = wrapper.getByTestId("login-heading");
        const userSelectElement = wrapper.getByTestId("user-select");
        const submitButtonElement = wrapper.getByTestId("loginBtn");

        // Ensure elements are in the document
        expect(loginHeadingElement).toBeInTheDocument();
        expect(userSelectElement).toBeInTheDocument();
        expect(submitButtonElement).toBeInTheDocument();

        // Simulate user input and submit
        fireEvent.change(userSelectElement, { target: { value: "nguyentiendung" } });
        expect(userSelectElement.value).toBe("nguyentiendung");

        global.alert = jest.fn();
        fireEvent.click(submitButtonElement);

        // Check alert was called
        expect(global.alert).toHaveBeenCalledTimes(1);
    });
});
