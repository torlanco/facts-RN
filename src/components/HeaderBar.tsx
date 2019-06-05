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
        <View style={[styles.container, props.style]}>
            <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
            <Divider style={styles.divider} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: responsive(40),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: responsive(15)
    },
    title: {
        ...typos.SUBHEADLINE,
        flex: 2,
        textAlign: 'center',
        color: colors.TEXT_PRIMARY
    },
    divider: {
        backgroundColor: colors.LIGHTER_GRAY,
        height: 5
    }
});
const wrapper = withNavigation(HeaderBar);
export { wrapper as HeaderBar };
