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
import { Divider, Icon } from 'react-native-elements';

interface IOwnProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<ViewStyle>;
}
type IProps = IOwnProps & NavigationInjectedProps;

const HeaderBar: React.SFC<IProps> = (props: IProps) => {

    const parent = props.navigation.dangerouslyGetParent();
    const gesturesEnabled = parent && parent.state && parent.state.index > 0;            
    
    const onBackClick = () => {
        if (gesturesEnabled) {
            props.navigation.goBack();
        }
    }

    return (
        <View style={[props.style]}>
            <View style={styles.header}>
                { gesturesEnabled ? 
                    <Icon
                        name='arrow-left'
                        type='feather'
                        color={colors.BLACK}
                        onPress={() => onBackClick()}
                        containerStyle={styles.iconContainer} /> : null }
                <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
                { gesturesEnabled ? <Text style={styles.iconContainer}></Text> : null }
            </View>
            <Divider style={styles.divider} />
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    title: {
        ...typos.SUBHEADLINE,
        textAlign: 'center',
        color: colors.TEXT_PRIMARY,
        paddingLeft: responsive(15),
        paddingRight: responsive(15),
        flex: 1
    },
    iconContainer: {
        width: responsive(40)
    },
    divider: {
        backgroundColor: colors.LIGHTER_GRAY,
        height: 2,
        marginHorizontal: -10,
    },
});
const wrapper = withNavigation(HeaderBar);
export { wrapper as HeaderBar };
