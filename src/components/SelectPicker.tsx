import * as React from 'react';

import {
    StyleSheet,
    Picker,
    TextInput
} from 'react-native';
import { colors, typos } from '@styles';
import ModalSelector from 'react-native-modal-selector';

interface IOwnProps {
    options: string[] | undefined,
    value: string,
    placeholder: string,
    handleValueChange: Function
}
type IProps = IOwnProps;

const SelectPicker: React.SFC<IProps> = (props: IProps) => {
    return (
        <ModalSelector
            style={styles.picker}
            data={props.options}
            keyExtractor= {(item: string) => item}
            labelExtractor= {(item: string) => item}
            initValue={props.value}
            onChange={(itemValue: object)=> props.handleValueChange(itemValue)}>

            <TextInput
                style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                editable={false}
                placeholder={props.placeholder}
                value={props.value} />

        </ModalSelector>
    );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 200,
  },
});

export { SelectPicker };
