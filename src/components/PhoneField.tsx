import { colors, typos } from '@styles';
import * as React from 'react';
import { StyleSheet, Text, View, KeyboardTypeOptions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { CONSTANTS } from '@utils';

interface IActionButtonProps {
    error?: string;
    onChangeText?: Function;
    onBlur?: Function;
    nonEditable?: boolean;
    defaultValue?: string; 
}

type IProps = IActionButtonProps;

type IState = {
    value: any;
    focused: boolean;
}

class PhoneField extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);
        this.state = {
            value: '',
            focused: false
        }
    }
    
    onChangeText = (value: any) => {
        this.setState({
            value: value
        }, () => {
            if (this.props.onChangeText) {
                this.props.onChangeText(CONSTANTS.COUNTRY_CODE + value);
            }
        });
    }

    onFocus = () => {
        this.setState({
            focused: true
        });        
    }

    onBlur = () => {
        this.setState({
            focused: false
        });
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }
    
    render() {
        const { error, nonEditable } = this.props;
        const focused: any = {};
        if (this.state.focused) {
            focused.borderBottomColor = colors.PRIMARY,
            focused.borderBottomWidth = 5
        }
        return (
            <View style={styles.container}>
                <View style={[styles.rowContainer, focused]}>
                    <Text style={[styles.code]}>{CONSTANTS.COUNTRY_CODE}</Text>
                    <TextInput style={[styles.input]}
                        defaultValue={this.props.defaultValue ? this.props.defaultValue : ''}
                        editable={!nonEditable}
                        onChangeText={this.onChangeText} 
                        onFocus={this.onFocus}
                        onBlur={this.onBlur} 
                        keyboardType='number-pad'
                        autoCapitalize={'none'}/>
                </View>
                { error ? <Text style={styles.error}>{error}</Text> : null }
            </View>
        )    
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
    },
    rowContainer: {
        flexDirection: "row",
        borderRadius: 2,
        borderColor: colors.LIGHT_GRAY,
        borderWidth: 1,
        backgroundColor: colors.LIGHTEST_GRAY
    },
    code: {
        ...typos.PRIMARY,
        height: 40,
        borderColor: colors.LIGHT_GRAY,
        borderRightWidth: 1,
        padding: 10
    },
    input: {
        flex: 1,
        ...typos.PRIMARY,
        height: 40,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    error: {
        ...typos.CAPTION,
        color: colors.ERROR, 
        marginTop: 3,
    },
});

export { PhoneField };