import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./service/store";
import {BrowserRouter} from "react-router-dom";
import { setAuthUser } from './service/actions/authedUser';
import { waitFor } from '@testing-library/react';

describe("App", () => {
    it("Render app component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("Redirect to login page when not logged in", async () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
    
        await waitFor(() => {
            const heading = component.getByTestId("login-heading");
            expect(heading).toBeInTheDocument();
        });
    });

    it("Show home page when logged in", async () => {
        store.dispatch(setAuthUser({id: "abc", password: "1212"}));
    
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
    
        await waitFor(() => {
            const heading = component.getByTestId("heading");
            expect(heading).toBeInTheDocument();
        });
    });
});
