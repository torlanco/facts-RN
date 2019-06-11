import { responsive, colors, typos } from '@styles';
import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';

interface IActionButtonProps {
    title: string;
    inverted?: boolean;
    onPress?(buttonText: string): void,
    disabled?: boolean;
}

type IProps = IActionButtonProps;

const ActionButton: React.SFC<IProps> = (props: IProps) => {
    const {title, inverted, onPress, disabled} = props;
    const backgroundColor = !inverted ? colors.WHITE : colors.PRIMARY;
    const color = !inverted ? colors.MID_GRAY : colors.DARK_GRAY;
    const borderColor = !inverted ? colors.LIGHTER_GRAY : colors.PRIMARY;
    const opacity = disabled ? 0.7 : 1;
    let boxShadow = {};

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
    const buttonStyle = [
        styles.button,
        { borderColor },
        { backgroundColor },
        { opacity },
    ];
    const textStyle = [
        styles.textStyle,
        { color }
    ];

    const onButtonPress = () => {
        if (props.onPress) {
            props.onPress(props.title);
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
        borderRadius: 40,
        height: responsive(44),
        justifyContent: 'center',
        margin: 5,
        minWidth: '30%',
    },
    button: {
        borderWidth: 2,
        borderRadius: 40,
        height: responsive(44),
    },
    textStyle: {
        textTransform: 'uppercase'
    }
});

export { ActionButton };