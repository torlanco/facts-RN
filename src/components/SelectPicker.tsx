import * as React from 'react';

import {
    StyleSheet,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

interface IOwnProps {
    options: string[] | undefined,
    value: string,
    handleValueChange: Function
}

type IProps = IOwnProps;

const SelectPicker: React.SFC<IProps> = (props: IProps) => {
    const data = props.options ? props.options.map(item => {return {value: item}; }) : [];
    return (
        <Dropdown data={data} value={props.value}
                  onChangeText={(value) => props.handleValueChange(value)}/>
    );
};

const styles = StyleSheet.create({
    picker: {
        height: 50,
        width: 200,
    },
});

export { SelectPicker };