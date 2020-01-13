import * as React from 'react';

import {
    StyleSheet,
    TextInput,
    View,
    Platform
} from 'react-native';
import { colors, typos } from '@styles';
import ModalSelector from 'react-native-modal-selector';
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from 'react-native-elements';
import { CONSTANTS } from '@utils';

interface IOwnProps {
    options: string[] | undefined,
    value: string,
    placeholder: string,
    handleValueChange: Function,
    width?: number
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
            style={[styles.picker, {width: props.width ? props.width : 200}]}
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
                  size={16}
                  type='feather'
                  color={colors.BLACK}
                  containerStyle={styles.icon}/>
            </View>
        </ModalSelector>
        :
        <View style={[styles.iosPicker, {width: props.width ? props.width : 200}]}>
          <RNPickerSelect
              onValueChange={handleValueChange}
              items={props.options ? props.options.map((option) => {
                return { label: option, value: option.split(CONSTANTS.PICKER_STRING_SEPARATOR)[0].trim()}
              }) : []}
              placeholder={{ label: props.placeholder, value: null }}
              Icon={() => { return <Icon
                size={16}
                name='chevron-down'
                type='feather'
                color={colors.BLACK}
                containerStyle={styles.icon}/> }}
              value={props.value}
              textInputProps={{style: [styles.pickerTextInputProps]}}
          />
        </View>
    );
};

const styles = StyleSheet.create({
  picker: {
    height: 40,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    maxWidth: 150,
    ...typos.PRIMARY_MEDIUM
  },
  icon: {
    padding: 0,
    marginTop: Platform.OS === "android" ? -2 : 2,
  },
  iosPicker: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    height: 40,
    width: 200,
  },
  pickerTextInputProps: {
    color: colors.TEXT_PRIMARY,
    ...typos.PRIMARY_MEDIUM,
    paddingTop: 3
  },
  padding: {
    padding: 2
  }
});

export { SelectPicker };
