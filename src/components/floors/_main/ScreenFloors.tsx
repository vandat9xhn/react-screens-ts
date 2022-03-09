import React, { useEffect } from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import * as H from 'history';
//
import { ScreenObjType } from '../../../type/floors';
//
import ScreenFloorsStyles from './ScreenFloors.scss';

//
function _getCssModuleClass(className = '') {
    return `${className} ${ScreenFloorsStyles[className] || ''}`;
}

//
export interface ScreenFloorsProps {
    floor_arr: ScreenObjType[];
    count_history: number;

    openScreenFloor: (new_floor: ScreenObjType) => void;
    closeScreenFloor: () => void;
    closeScreenHasHistory: () => void;
    closeAllScreen: () => void;

    ScreenConfirm?: React.FunctionComponent<{
        closeScreen: () => void;
        last_location: H.Location;
    }>;
    has_change: { current: boolean };
    c_location_str: string;
}

//
function ScreenFloors({
    floor_arr,
    count_history,

    openScreenFloor,
    closeScreenFloor,
    closeScreenHasHistory,
    closeAllScreen,

    ScreenConfirm,
    has_change,
    c_location_str
}: ScreenFloorsProps) {
    //
    const use_history = useHistory();

    //
    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeunload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeunload);
        };
    }, []);

    // -------

    //
    const showModalConfirm = (last_location: H.Location) => {
        if (!has_change.current) {
            if (count_history) {
                closeScreenHasHistory();
            } else {
                closeAllScreen();
            }

            return true;
        }

        if (ScreenConfirm) {
            openScreenFloor({
                FloorComponent: ({ closeScreen }) => (
                    <ScreenConfirm
                        closeScreen={closeScreen}
                        last_location={last_location}
                    />
                )
            });
        } else {
            if (confirm('Close all screens?')) {
                closeAllScreen();
            }
        }

        return false;
    };

    //
    function handleConfirm(last_location: Location) {
        closeAllScreen();

        setTimeout(() => {
            use_history.push(last_location.pathname + last_location.search);
        }, 0);
    }

    //
    function handleNotConfirm() {
        history.pushState('', '', c_location_str);
        closeScreenFloor();
    }

    //
    function handleBeforeunload(event: BeforeUnloadEvent) {
        if (has_change.current) {
            event.preventDefault();
            return (event.returnValue = 'Are you sure you want to exit?');
        }
    }

    //
    function onCloseScreenFloor() {
        if (has_change.current) {
            if (confirm('ok')) {
                closeScreenFloor();
            }
        } else {
            closeScreenFloor();
        }
    }

    //
    return (
        <React.Fragment>
            {floor_arr.map((floor_obj, ix) => (
                <div
                    key={ix}
                    className={`${_getCssModuleClass(
                        'ScreenFloors'
                    )} ${_getCssModuleClass(
                        ix != floor_arr.length - 1
                            ? `${'ScreenFloors-inactive'}`
                            : 'ScreenFloors-active'
                    )} ${_getCssModuleClass(
                        ix != floor_arr.length - 1 &&
                            floor_arr[floor_arr.length - 1].hidden_before
                            ? 'ScreenFloors-none'
                            : ''
                    )}`}
                >
                    <floor_obj.FloorComponent
                        closeScreen={onCloseScreenFloor}
                    />
                </div>
            ))}

            <Prompt when message={showModalConfirm} />
        </React.Fragment>
    );
}

export default ScreenFloors;
