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
