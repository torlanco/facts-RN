import { colors, typos, responsive } from '@styles';
import * as React from 'react';
import { StyleSheet, Text, View, KeyboardTypeOptions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

export enum FieldType {
    EMAIL,
    PASSWORD,
    TEXT,
    PHONE
}

interface IActionButtonProps {
    error?: string;
    secureTextEntry?: boolean;
    onChangeText?: Function;
    onBlur?: Function;
    keyboardType?: KeyboardTypeOptions
    nonEditable?: boolean;
    textContentType?: any;
    defaultValue?: string;
    type?: FieldType;
    hideVisibleToggler?: boolean;
}

type IProps = IActionButtonProps;

type IState = {
    value: any;
    focused: boolean;
    visible: boolean,
}

class TextField extends React.Component<IProps, IState> {
    _textInput: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            value: '',
            focused: false,
            visible: !(props.type && props.type == FieldType.PASSWORD)
        }
    }

    onChangeText = (value: any) => {
        this.setState({
            value: value
        }, () => {
            if (this.props.onChangeText) {
                this.props.onChangeText(value);
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

    clear = () => {
        if (this._textInput) {
            this._textInput.clear();
        }
    }

    onVisibilityChanger = () => {
        if (this.props.type && this.props.type == FieldType.PASSWORD) {
            this.setState({
              visible: !this.state.visible
            });
        }
    }

    getkeyBoardType = () => {
        if (this.props.type && this.props.type == FieldType.PASSWORD) {

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
                <TextInput
                    defaultValue={this.props.defaultValue ? this.props.defaultValue : ''}
                    ref={input => { this._textInput = input }}
                    style={[styles.input, focused]}
                    editable={!nonEditable}
                    onChangeText={this.onChangeText}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    secureTextEntry={!this.state.visible}
                    keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                    autoCapitalize={'none'}
                    textContentType={this.props.textContentType ? this.props.textContentType : "none"}/>

                { this.props.type && this.props.type == FieldType.PASSWORD && !this.props.hideVisibleToggler
                    && <Icon
                        name={this.state.visible ? 'eye' : 'eye-off'}
                        type='feather'
                        color={colors.BLACK}
                        size={18}
                        onPress={() => this.onVisibilityChanger()}
                        containerStyle={styles.iconContainer} /> }

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
    input: {
        ...typos.PRIMARY_LIGHT,
        borderRadius: 2,
        borderColor: colors.LIGHT_GRAY,
        height: 40,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: colors.LIGHTEST_GRAY,
    },
    error: {
        ...typos.CAPTION,
        color: colors.ERROR,
        marginTop: 3,
    },
    iconContainer: {
        position: "absolute",
        right: 0,
        width: responsive(40),
        paddingVertical: 10,
    },
});

export { TextField };
