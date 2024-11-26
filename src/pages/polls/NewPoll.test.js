import {fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import NewPoll from "./NewPoll";
import { store } from "../../service/store";

describe("NewPoll", () => {
    it("Render init NewPoll component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("Display all elements", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll/>
                </BrowserRouter>
            </Provider>
        );

        const firstLabelElement = component.getByTestId("firstLabel");
        const firstOptionInputElement = component.getByTestId("firstOption");
        const secondLabelElement = component.getByTestId("secondLabel");
        const secondOptionInputElement = component.getByTestId("secondOption");
        const submitButtonElement = component.getByTestId("submit-poll");

        expect(firstLabelElement.textContent).toBe("First Option");
        expect(secondLabelElement.textContent).toBe("Second Option");
        expect(submitButtonElement.textContent).toBe("Submit");

        fireEvent.change(firstOptionInputElement, {target: {value: 'Success'}});
        fireEvent.change(secondOptionInputElement, {target: {value: 'Errors'}});
        expect(firstOptionInputElement.value).toBe("Success");
        expect(secondOptionInputElement.value).toBe("Errors");
    });
});
