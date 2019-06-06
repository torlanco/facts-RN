import * as React from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';
import { colors } from '@styles';
import { Icon } from 'react-native-elements';
import { ViewType } from '../enums/ViewType';
import { SelectPicker } from '@components';

interface IOwnProps {
    viewType: ViewType,
    handleViewTypeChange: Function,
    typeList: string[],
    type: string,
    handleTypeChange: Function,
}
type IProps = IOwnProps;

const ShoppersFilter: React.SFC<IProps> = (props: IProps) => {

    const toggleViewType = () => {
        props.handleViewTypeChange(props.viewType === ViewType.Grid ? ViewType.List : ViewType.Grid);
    }

    const gridIconColor = props.viewType === ViewType.Grid ? colors.LIGHT_ORANGE : colors.LIGHT_GRAY; 
    const listIconColor = props.viewType === ViewType.List ? colors.LIGHT_ORANGE : colors.LIGHT_GRAY; 

    const onTypeChange = (type: string) => {
        props.handleTypeChange(type);
    }

    return (
        <View style={styles.container}>
            <SelectPicker options={props.typeList} value={props.type}
            handleValueChange={onTypeChange}></SelectPicker>
            <View style={{ flex: 1 }}></View>
            <Icon
                name='grid'
                type='feather'
                color={gridIconColor}
                onPress={toggleViewType}
                containerStyle={styles.iconContainer} />
            <Icon
                name='list'
                type='feather'
                color={listIconColor}
                onPress={toggleViewType}
                containerStyle={styles.iconContainer} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconContainer: {
    padding: 10 
  },
});

export { ShoppersFilter };
