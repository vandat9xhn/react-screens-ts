# react-screens-ts

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-screens-ts.svg)](https://www.npmjs.com/package/react-screens-ts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-screens-ts
```

## Usage

```tsx
import React, { useRef } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Screens } from 'react-screens-ts';
import 'react-screens-ts/dist/index.css';
import './App.scss';
//
import { openScreenConfirm } from './_components/screen_confirm/ScreenConfirm';

//
const root_floor_url_arr = { current: [] };

//
const App = () => {
    //
    const ref_screens = useRef<Screens>(null);

    // ----

    //
    function handleClick() {
        ref_screens.current &&
            ref_screens.current.openScreenFloor &&
            openScreenConfirm({
                openScreenFloor: ref_screens.current.openScreenFloor,
                handleHasChange: handleHasChange
            });
    }

    //
    function handleHasChange() {
        if (ref_screens.current) {
            ref_screens.current.detectScreenHasChange(
                ref_screens.current.count_has_change == 0
            );
        }
    }

    //
    return (
        <BrowserRouter>
            <div>
                <div className='App'>
                    <Switch>
                        <Route exact path={'/home'}>
                            <div>
                                <Link to={'page'}>Go to Page</Link>
                            </div>
                        </Route>

                        <Route exact path={'/page'}>
                            <div>
                                <Link to={'home'}>Go to Home</Link>
                            </div>
                        </Route>
                    </Switch>

                    <div
                        style={{ marginTop: '250px', cursor: 'pointer' }}
                        onClick={handleClick}
                    >
                        Open Screen Confirm
                    </div>

                    <div style={{ height: '800px' }}></div>
                </div>

                <Screens
                    ref={ref_screens}
                    root_floor_url_arr={root_floor_url_arr}
                />
            </div>
        </BrowserRouter>
    );
};

export default App;

import * as React from 'react';
import { screen_types, useScreensFloors } from 'react-screens-ts';

//
export function openScreenConfirm({
    openScreenFloor,
    handleHasChange
}: {
    openScreenFloor: (new_floor: screen_types.ScreenObjType) => void;
    handleHasChange: () => void;
}) {
    openScreenFloor({
        FloorComponent: ({ closeScreen }) => (
            <ScreenConfirm
                closeScreen={closeScreen}
                handleHasChange={handleHasChange}
            />
        )
    });
}

//
export interface ScreenConfirmProps {
    closeScreen: () => void;
    handleHasChange: () => void;
}

//
function ScreenConfirm({ closeScreen, handleHasChange }: ScreenConfirmProps) {
    //
    const [has_change, setHasChange] = React.useState(false);

    //
    useScreensFloors();

    // ----

    //
    function onHasChange() {
        setHasChange((has_change) => !has_change);
        handleHasChange();
    }

    //
    return (
        <div>
            <div
                style={{
                    height: '100vh',
                    padding: '50px 0',
                    textAlign: 'center'
                }}
            >
                <div
                    style={{ margin: '100px 0', cursor: 'pointer' }}
                    onClick={closeScreen}
                >
                    Close screen confirm
                </div>

                {!has_change && (
                    <div style={{ cursor: 'pointer' }} onClick={onHasChange}>
                        Has change screen
                    </div>
                )}
            </div>
        </div>
    );
}

export default ScreenConfirm;

```

## License

MIT © [vandat9xhn](https://github.com/vandat9xhn)
