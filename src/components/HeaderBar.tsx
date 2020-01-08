import * as React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ViewStyle,
    TextStyle
} from 'react-native';
import { responsive, typos, colors } from '@styles';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Divider, Icon } from 'react-native-elements';
import { formatDate } from '@utils';
import { connect } from 'react-redux';
import { IUser } from '@interfaces/user';

interface IOwnProps {
    title: string;
    style?: ViewStyle;
    titleStyle?: TextStyle;
    dateRange?: DateRange;
    rightIcon?: string,
    onRightIconClick?: Function
    rightText?: string,
    onRightTextClick?: Function
    noDivider?: boolean;
    noLeftIcon?: boolean;
}
type IProps = IOwnProps 
        & NavigationInjectedProps
        & IUser.StateToProps;

interface IState {
    backEnabled: boolean | undefined,
    isDateRangeValid: boolean | undefined
}

const mapStateToProps = function(state: any) {
    return {
      token: state.user.token,
    }
};
    
class HeaderBar extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            backEnabled: this.isBackEnabled(),
            isDateRangeValid: this.isDateRangeValid()
        };
    }
    
    isBackEnabled() {
        const parent = this.props.navigation.dangerouslyGetParent();
        return parent && parent.state && parent.state.index > 0;    
    }

    isDateRangeValid() {
        if (this.props.dateRange && this.props.dateRange.startDate && this.props.dateRange.endDate)
            return true;
        return false;    
    }

    onBackClick = () => {
        if (this.state.backEnabled) {
            this.props.navigation.goBack();
        }
    }

    onRightIconClick = () => {
        if (this.props.onRightIconClick) {
            this.props.onRightIconClick();
        }
    }

    onRightTextClick = () => {
        if (this.props.onRightTextClick) {
            this.props.onRightTextClick();
        }
    }

    onDrawerIconClick = () => {
        this.props.navigation.toggleDrawer();  
    }

    public render() {
        return (
            <View style={[this.props.style]}>
                <View style={styles.header}>
                    { !this.props.noLeftIcon ? (this.state.backEnabled ? 
                        <Icon
                            name='arrow-left'
                            type='feather'
                            color={colors.BLACK}
                            onPress={() => this.onBackClick()}
                            containerStyle={styles.iconContainer} /> :                         
                            <Icon
                                name='menu'
                                type='feather'
                                color={colors.BLACK}
                                onPress={() => this.onDrawerIconClick()}
                                containerStyle={styles.iconContainer} /> ) : null }
                    <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
                    { this.props.rightIcon ? 
                        <Icon
                            name={this.props.rightIcon}
                            type='feather'
                            size={18}
                            color={colors.BLACK}
                            onPress={this.onRightIconClick}
                            containerStyle={[styles.iconContainer, styles.rightIconContainer]} /> : <Text style={styles.iconContainer}></Text> }
                    { this.state.isDateRangeValid ? <Text style={styles.dateRange}>{formatDate(this.props.dateRange.startDate)} - {formatDate(this.props.dateRange.endDate)}</Text> : null }
                    { this.props.rightText ? <Text style={[styles.rightText]} onPress={this.onRightTextClick}>{this.props.rightText}</Text> : null }
                </View>
                    { !this.props.noDivider && <Divider style={styles.divider} /> }
            </View>
        );
    }
};
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        height: 60
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
        width: responsive(60),
        padding: 10,
    },
    rightIconContainer: {
        marginRight: 5,
        padding: 10
    },
    divider: {
        backgroundColor: colors.LIGHTER_GRAY,
        height: 2,
        marginHorizontal: -10,
    },
    dateRange: {
        ...typos.PRIMARY,
        color: colors.TEXT_NOTE,
        paddingRight: responsive(10),
        lineHeight: 16,
    },
    rightText: {
        ...typos.HEADLINE,
        fontWeight: 'normal',
        color: colors.BLACK,
        padding: 5,
        marginRight: 20
    }
});
const wrapper = withNavigation(connect(mapStateToProps, null)(HeaderBar));
export { wrapper as HeaderBar };
export class DateRange {
    startDate?: string
    endDate?: string

    constructor(startDate?: string, endDate?: string) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
} 
