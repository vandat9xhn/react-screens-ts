//
type closeScreenFloorType = {
    closeScreen: () => void;
};

//
type FloorComponent = (props: closeScreenFloorType) => JSX.Element;

//
export interface ScreenObjType {
    hidden_before?: boolean;
    has_history?: boolean;
    FloorComponent: FloorComponent;
}

//
export type openScreenFloorType = (new_floor: ScreenObjType) => void;
