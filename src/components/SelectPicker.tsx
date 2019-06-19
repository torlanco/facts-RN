import * as React from 'react';

import {
    StyleSheet,
    Picker,
} from 'react-native';
import { colors, typos } from '@styles';

interface IOwnProps {
    options: string[] | undefined,
    value: string,
    handleValueChange: Function
}
type IProps = IOwnProps;

const SelectPicker: React.SFC<IProps> = (props: IProps) => {

    return (
        <Picker
            mode="dropdown"
            selectedValue={props.value}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => props.handleValueChange(itemValue)}>
            {
                props.options && props.options.map((type, index) => {
                    return  <Picker.Item label={type} value={type} key={index}/>;
                })
            }    
        </Picker>
    );
};

const styles = StyleSheet.create({
  picker: {
    height: 50, 
    width: 200,
  },
});

export { SelectPicker };