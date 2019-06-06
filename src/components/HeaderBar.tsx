import * as React from 'react';
import {
    View,
    StyleSheet,
    Text,
    StyleProp,
    ViewStyle
} from 'react-native';
import { responsive, typos, colors } from '@styles';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Divider } from 'react-native-elements';

interface IOwnProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<ViewStyle>;
}
type IProps = IOwnProps & NavigationInjectedProps;
const HeaderBar: React.SFC<IProps> = (props: IProps) => {
    return (
        <View style={[props.style]}>
            <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
            <Divider style={styles.divider} />
        </View>
    );
};
const styles = StyleSheet.create({
    title: {
        ...typos.SUBHEADLINE,
        textAlign: 'center',
        color: colors.TEXT_PRIMARY,
        paddingHorizontal: responsive(15),
        paddingVertical: 20
    },
    divider: {
        backgroundColor: colors.LIGHTER_GRAY,
        height: 2,
        marginHorizontal: -10,
    }
});
const wrapper = withNavigation(HeaderBar);
export { wrapper as HeaderBar };
