import { responsive, colors, typos } from '@styles';
import * as React from 'react';
import { StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { Button } from 'react-native-elements';

interface IActionButtonProps {
    title: string;
    inverted?: boolean;
    onPress?(buttonText: string): void,
    disabled?: boolean;
    style?: ViewStyle;
    buttonStyle?: ViewStyle;
    titleStyle?: TextStyle;
    invertedStyle?: ViewStyle;
    invertedButtonStyle?: ViewStyle;
    invertedTitleStyle?: TextStyle;
}

type IProps = IActionButtonProps;

const ActionButton: React.SFC<IProps> = (props: IProps) => {
    const {title, inverted, onPress, disabled} = props;
    const backgroundColor = !inverted ? colors.LIGHTEST_GRAY : colors.PRIMARY;
    const color = !inverted ? colors.MID_GRAY : colors.BLACK;
    const borderColor = !inverted ? colors.LIGHTER_GRAY : colors.PRIMARY;
    const opacity = disabled ? 0.7 : 1;
    const boxShadow: any = {};

    if (inverted) {
        boxShadow.shadowColor = colors.LIGHT_GREEN;
        boxShadow.shadowOpacity = 0.2;
        boxShadow.shadowOffset = {
            width: 0,
            height: 4
        }
    }
    const containerStyle = [
        styles.buttonContainer,
        { backgroundColor },
        boxShadow,
    ];
    if (!inverted && props.style) {
        containerStyle.push(props.style);
    }
    if (inverted && props.invertedStyle) {
        containerStyle.push(props.invertedStyle);
    }

    const buttonStyle = [
        styles.button,
        { borderColor },
        { backgroundColor },
        { opacity },
    ];
    if (!inverted && props.buttonStyle) {
        buttonStyle.push(props.buttonStyle);
    }
    if (inverted && props.invertedButtonStyle) {
        buttonStyle.push(props.invertedButtonStyle);
    }
    const textStyle = [
        styles.textStyle,
        { color }
    ];
    if (!inverted && props.titleStyle) {
        textStyle.push(props.titleStyle);
    }
    if (inverted && props.invertedTitleStyle) {
        textStyle.push(props.invertedTitleStyle);
    }

    const onButtonPress = () => {
        if (props.onPress) {
            props.onPress(inverted ? '' : props.title);
        }
    }

    return (
        <Button title={ title }
            onPress={ onButtonPress }
            disabled={ disabled }
            containerStyle={ containerStyle }
            buttonStyle={ buttonStyle }
            titleStyle={textStyle}/>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 8,
        height: responsive(50),
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 2.5,
        paddingHorizontal: 5,
    },
    button: {
        borderWidth: 2,
        borderRadius: 8,
        height: responsive(46),
        paddingVertical: 2,
    },
    textStyle: {
        ...typos.PRIMARY,
        textTransform: 'uppercase'
    }
});

export { ActionButton };
