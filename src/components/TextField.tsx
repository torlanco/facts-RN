import { colors, typos } from '@styles';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface IActionButtonProps {
    error?: string;
    secureTextEntry?: boolean;
    onChangeText?: Function;
    onBlur?: Function;
}

type IProps = IActionButtonProps;

const TextField : React.SFC<IProps> = (props: IProps) => {
    const {error} = props;

    const onChangeText = (value: any) => {
        if (props.onChangeText) {
            props.onChangeText(value);
        }
    }

    const onBlur = () => {
        if (props.onBlur) {
            props.onBlur();
        }
    }
    
    return (
        <View style={styles.container}>
            <TextInput style={[styles.input]} onChangeText={onChangeText} onBlur={onBlur} secureTextEntry={props.secureTextEntry}/>
            { error ? <Text style={styles.error}>{error}</Text> : null }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
    },
    input: {
        ...typos.PRIMARY,
        borderRadius: 5,
        borderColor: colors.LIGHT_GRAY,
        height: 40,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    error: {
        ...typos.CAPTION,
        color: colors.ERROR, 
        marginTop: 3,
    },
});

export { TextField };