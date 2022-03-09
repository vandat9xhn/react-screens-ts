import React, { Component } from 'react';
//
import { ScreenObjType } from '../../../type/floors';
//
import { window_screen_scroll_arr } from '../window_screen_scroll_arr';
//
import ScreenFloors, {
    ScreenFloorsProps
} from '../../floors/_main/ScreenFloors';
import ScreenNoFloor from '../no_floor/ScreenNoFloor';
import ScreenHasFloor from '../has_floor/ScreenHasFloor';

//
interface ScreensProps {
    root_floor_url_arr: { current: string[] };
    ScreenConfirm?: ScreenFloorsProps['ScreenConfirm'];
}

interface ScreensState {
    floor_arr: ScreenObjType[];
    history_arr: number[];
    count_history: number;
}

//
class Screens extends Component<ScreensProps, ScreensState> {
    //
    count_has_change: number;
    has_change_obj: { current: boolean };

    //
    state: ScreensState = {
        floor_arr: [],
        history_arr: [],
        count_history: 0
    };

    //
    componentDidMount() {
        this.count_has_change = 0;
        this.has_change_obj = { current: false };
    }

    //
    openScreenFloor = (new_floor: ScreenObjType) => {
        const {
            has_history = false,
            hidden_before = false,
            FloorComponent
        } = new_floor;

        const { root_floor_url_arr } = this.props;
        const { floor_arr, history_arr, count_history } = this.state;

        window_screen_scroll_arr.push({
            x: window.scrollX,
            y: window.scrollY
        });

        if (has_history) {
            root_floor_url_arr.current.push(location.pathname);
        }

        this.setState({
            floor_arr: [
                ...floor_arr,
                {
                    has_history: has_history,
                    hidden_before: hidden_before,
                    FloorComponent: FloorComponent
                }
            ],
            history_arr: has_history
                ? [...history_arr, floor_arr.length]
                : history_arr,
            count_history: count_history + (has_history ? 1 : 0)
        });
    };

    //
    detectScreenHasChange = (has_change: boolean) => {
        this.count_has_change += has_change ? 1 : -1;
        this.has_change_obj.current = this.count_has_change > 0;
    };

    //
    rerenderScreenFloor = () => {
        this.setState({});
    };

    //
    closeScreenFloor = () => {
        const { floor_arr } = this.state;

        floor_arr.pop();

        this.setState({});

        if (floor_arr.length == 0) {
            this.count_has_change = 0;
            this.has_change_obj = { current: false };
        }
    };

    //
    closeScreenHasHistory = () => {
        const { root_floor_url_arr } = this.context;
        const { floor_arr, history_arr, count_history } = this.state;

        root_floor_url_arr.current.pop();
        const last_history = history_arr.pop();

        this.setState({
            floor_arr: floor_arr.slice(0, last_history),
            count_history: count_history - 1
        });
    };

    //
    closeAllScreen = () => {
        this.setState({
            floor_arr: [],
            history_arr: [],
            count_history: 0
        });

        this.count_has_change = 0;
        this.has_change_obj = { current: false };
    };

    //
    render() {
        //
        const { floor_arr, count_history } = this.state;

        //
        return floor_arr.length ? (
            <React.Fragment>
                <ScreenFloors
                    floor_arr={floor_arr}
                    count_history={count_history}
                    //
                    openScreenFloor={this.openScreenFloor}
                    closeScreenFloor={this.closeScreenFloor}
                    closeScreenHasHistory={this.closeScreenHasHistory}
                    closeAllScreen={this.closeAllScreen}
                    //
                    ScreenConfirm={this.props.ScreenConfirm}
                    has_change={this.has_change_obj}
                    c_location_str={location.pathname + location.search}
                />

                <ScreenHasFloor count_floor={floor_arr.length} />
            </React.Fragment>
        ) : (
            <ScreenNoFloor />
        );
    }
}

export default Screens;
