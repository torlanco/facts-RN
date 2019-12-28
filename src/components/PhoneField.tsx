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
}

type IProps = IActionButtonProps;

type IState = {}

class PhoneField extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);
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

    onBlur = () => {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }
    
    render() {
        const { error, nonEditable } = this.props;
        return (
            <View style={styles.container}>
                <Text style={[styles.code]}>{CONSTANTS.COUNTRY_CODE}</Text>
                <TextInput style={[styles.input]}
                    editable={!nonEditable}
                    onChangeText={this.onChangeText} 
                    onBlur={this.onBlur} 
                    keyboardType='number-pad'
                    autoCapitalize={'none'}/>
                { error ? <Text style={styles.error}>{error}</Text> : null }
            </View>
        )    
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
        flexDirection: "row",
        borderRadius: 5,
        borderColor: colors.LIGHT_GRAY,
        borderWidth: 1,
    },
    code: {
        ...typos.PRIMARY,
        height: 40,
        borderColor: colors.LIGHT_GRAY,
        borderRightWidth: 1,
        padding: 10
    },
    input: {
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