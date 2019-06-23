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

interface IState {
    backEnabled: boolean | undefined,
}
class HeaderBar extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            backEnabled: this.isBackEnabled()
        };
    }

    isBackEnabled() {
        const parent = this.props.navigation.dangerouslyGetParent();
        return parent && parent.state && parent.state.index > 0;    
    }

    onBackClick = () => {
        if (this.state.backEnabled) {
            this.props.navigation.goBack();
        }
    }

    public render() {
        return (
            <View style={[this.props.style]}>
                <View style={styles.header}>
                    { this.state.backEnabled ? 
                        <Icon
                            name='arrow-left'
                            type='feather'
                            color={colors.BLACK}
                            onPress={() => this.onBackClick()}
                            containerStyle={styles.iconContainer} /> : null }
                    <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
                    { this.state.backEnabled ? <Text style={styles.iconContainer}></Text> : null }
                </View>
                <Divider style={styles.divider} />
            </View>
        );
    }
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
