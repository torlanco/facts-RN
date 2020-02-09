import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { typos } from '@styles';

interface IOwnProps {
    message?: string;
}
type IProps = IOwnProps;

interface IState {
    backEnabled: boolean | undefined,
    isDateRangeValid: boolean | undefined
}
class EmptyListMessage extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <View style={styles.flex}>
                <Text style={styles.message}>{this.props.message} </Text>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    message: {
        ...typos.PRIMARY_LIGHT,
        textAlign: 'center',
        padding: 10,
    },

});
export { EmptyListMessage };
