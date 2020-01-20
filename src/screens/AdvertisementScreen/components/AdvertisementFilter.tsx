import * as React from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';
import { colors } from '@styles';
import { Icon, Text } from 'react-native-elements';
import { ViewType } from '../enums/ViewType';
import { SelectPicker } from '@components';

interface IOwnProps {
    viewType?: ViewType,
    handleViewTypeChange?: Function,
    typeList?: string[],
    type?: string,
    handleTypeChange?: Function,
    totalItems?: Number
}
type IProps = IOwnProps;

const AdvertisementFilter: React.SFC<IProps> = (props: IProps) => {

    const gridIconColor = props.viewType === ViewType.Grid ? colors.LIGHT_ORANGE : colors.LIGHT_GRAY;
    const listIconColor = props.viewType === ViewType.List ? colors.LIGHT_ORANGE : colors.LIGHT_GRAY;


    const toggleViewType = (type: ViewType) => {
        if (props.viewType !== type && props.handleViewTypeChange) {
            props.handleViewTypeChange(type);
        }
    };

    const onTypeChange = (type: string) => {
        if (props.handleTypeChange)
            props.handleTypeChange(type);
    };

    return (
        <View style={styles.container}>
            <View>
                { props.type ?
                    <View style={styles.pickerContainer}>
                        <SelectPicker label="Category" options={props.typeList} value={props.type}
                            placeholder={'Select a category'}
                            handleValueChange={onTypeChange}>
                        </SelectPicker>
                    </View>: null }
                <View style={styles.itemCountContainer}>
                    <Text style={styles.itemCount}>{props.totalItems} </Text>
                    <Text> ITEM</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}></View>
            { /* <Icon
                name='grid'
                type='feather'
                size={18}
                color={gridIconColor}
                onPress={() => toggleViewType(ViewType.Grid)}
                containerStyle={styles.iconContainer} />
            <Icon
                name='list'
                type='feather'
                size={18}
                color={listIconColor}
                onPress={() => toggleViewType(ViewType.List)}
                containerStyle={styles.iconContainer} /> */ }
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  },
  iconContainer: {
    padding: 5,
    marginTop: -2
  },
  itemCountContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10
  },
  itemCount: {
    fontWeight: 'bold',
  },
  pickerContainer: {
    marginTop: -5,
  }
});

export { AdvertisementFilter };
