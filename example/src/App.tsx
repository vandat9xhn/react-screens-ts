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
