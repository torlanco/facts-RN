import * as React from 'react';

import {
    StyleSheet,
    Picker,
    TextInput,
    View,
    Platform
} from 'react-native';
import { colors } from '@styles';
import ModalSelector from 'react-native-modal-selector';
import { Icon } from 'react-native-elements';
import { CONSTANTS } from '@utils';

interface IOwnProps {
    options: string[] | undefined,
    value: string,
    placeholder: string,
    handleValueChange: Function
}
type IProps = IOwnProps;

const SelectPicker: React.SFC<IProps> = (props: IProps) => {

    const handleValueChange = (value: any) => {
      if (props.handleValueChange)
        props.handleValueChange(value);
    }

    return (
      Platform.OS === "android" ?
        <ModalSelector
            style={styles.picker}
            data={props.options}
            keyExtractor= {(item: string) => item}
            labelExtractor= {(item: string) => item}
            initValue={props.value}
            onChange={props.handleValueChange}>

            <View style={styles.selector}>
                <TextInput
                    style={styles.input}
                    editable={false}
                    placeholder={props.placeholder}
                    placeholderTextColor={colors.TEXT_PRIMARY}
                    value={props.value.split(CONSTANTS.PICKER_STRING_SEPARATOR)[0].trim()} />

                <Icon
                    name='chevron-down'
                    type='feather'
                    color={colors.BLACK}
                    containerStyle={styles.icon}/>
            </View>
        </ModalSelector>
        :  
        <Picker selectedValue = {props.value} onValueChange={handleValueChange}>
          {
            props.options && props.options.map((option) => {
              return <Picker.Item label={option} value={props.value.split(CONSTANTS.PICKER_STRING_SEPARATOR)[0].trim()} />
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
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding:10,
    minWidth: 150,
  },
  icon: {
    paddingVertical: 8
  }
});

export { SelectPicker };
