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

const AdvertisementFilter: React.SFC<IProps> = (props: IProps) => {

    const gridIconColor = props.viewType === ViewType.Grid ? colors.LIGHT_ORANGE : colors.LIGHT_GRAY;
    const listIconColor = props.viewType === ViewType.List ? colors.LIGHT_ORANGE : colors.LIGHT_GRAY;


    const toggleViewType = (type: ViewType) => {
        if (props.viewType !== type) {
            props.handleViewTypeChange(type);
        }
    };

    const onTypeChange = (type: string) => {
        props.handleTypeChange(type);
    };

    return (
        <View style={styles.container}>
            <SelectPicker options={props.typeList} value={props.type}
                          placeholder={'Select an shopper'}
                          handleValueChange={onTypeChange}>
            </SelectPicker>
            <View style={{ flex: 1 }}></View>
            <Icon
                name='grid'
                type='feather'
                color={gridIconColor}
                onPress={() => toggleViewType(ViewType.Grid)}
                containerStyle={styles.iconContainer} />
            <Icon
                name='list'
                type='feather'
                color={listIconColor}
                onPress={() => toggleViewType(ViewType.List)}
                containerStyle={styles.iconContainer} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  iconContainer: {
    padding: 5
  },
});

export { AdvertisementFilter };
