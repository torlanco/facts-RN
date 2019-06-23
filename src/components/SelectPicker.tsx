import * as React from 'react';

import {
    StyleSheet,
    Picker,
    TextInput,
    View
} from 'react-native';
import { colors, typos } from '@styles';
import ModalSelector from 'react-native-modal-selector';
import { Icon } from 'react-native-elements';

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

            <View style={styles.selector}>
                <TextInput
                    style={styles.input}
                    editable={false}
                    placeholder={props.placeholder}
                    value={props.value} />

                <Icon
                    name='chevron-down'
                    type='feather'
                    color={colors.BLACK} 
                    containerStyle={styles.icon}/>
            </View>    

        </ModalSelector>
    );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 200,
  },
  selector: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  input: {
    padding:10 
  },
  icon: {
    paddingVertical: 8 
  }
});

export { SelectPicker };
