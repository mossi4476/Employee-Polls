import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../service/store";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import Header from "./Header";
import { setAuthUser } from "../service/actions/authedUser";

describe("Header", () => {
    it("Render Header component", () => {
        store.dispatch(setAuthUser({
            id: "sarahedo", 
            password: "1234567",
            avatarURL: "/images/avatars/gorilla.png"
        }));
        
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("Display username after login", () => {
        store.dispatch(setAuthUser({
            id: "sarahedo", 
            password: "1234567",
            avatarURL: "/images/avatars/gorilla.png"
        }));

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        const userSpanElement = component.getByTestId("userName");
        expect(userSpanElement.textContent).toBe("sarahedo");
    });
});
