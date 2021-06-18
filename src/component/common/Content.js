import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from "../landing/Landing";
import MapIr from "../map/Map"

const Content = () => (
    <main>
        <Switch>
            <Route exact path="/">
                <Landing />
            </Route>
            <Route path="/map">
                <MapIr />
            </Route>
        </Switch>
    </main>
);
export default Content;
