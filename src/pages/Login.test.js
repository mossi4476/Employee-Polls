import {fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../service/store";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import Login from "./Login";
import { initialData } from "../service/actions/shared";

describe("Login", () => {
    it("Render sucess Login component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it('Submit button login', async () => {
        await store.dispatch(initialData());

        const wrapper = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );

        const loginHeadingElement = wrapper.getByTestId("login-heading");
        const usernameInputElement = wrapper.getByTestId("username");
        const passwordInputElement = wrapper.getByTestId("password");
        const submitButtonElement = wrapper.getByTestId("loginBtn");
        expect(loginHeadingElement).toBeInTheDocument();
        expect(usernameInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
        expect(submitButtonElement).toBeInTheDocument();

        fireEvent.change(usernameInputElement, {target: {value: 'xxxx'}});
        fireEvent.change(passwordInputElement, {target: {value: 'abc'}});
        expect(usernameInputElement.value).toBe("xxxx");
        expect(passwordInputElement.value).toBe("abc");
        global.alert = jest.fn();
        fireEvent.click(submitButtonElement);
        expect(loginHeadingElement).toBeInTheDocument();
        expect(usernameInputElement.value).toBe("");
        expect(passwordInputElement.value).toBe("");
        expect(global.alert).toHaveBeenCalledTimes(1)
    });
});
