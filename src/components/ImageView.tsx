import * as React from 'react';
import ImageView from 'react-native-image-view';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions, BackHandler } from 'react-native';
import { colors } from '@styles';
import { Icon } from 'react-native-elements';

interface IImageViewProps {
    image: any;
    height?: number;
    allowFullMode?: boolean;
    hasFullWidth?: boolean;
}

type IProps = IImageViewProps;

interface IState {
    image: any,
    resizeMode: any,
    isVisible: boolean
}

class ImageViewWrapper extends React.Component<IProps, IState> {

    _isMounted: boolean = false;

    constructor(props: IProps) {
        super(props);
        this.state = {
            image: require('@assets/images/placeholder.png'),
            resizeMode: "stretch",
            isVisible: false
        };
    }
    componentDidMount() {
        this._isMounted = true;
        BackHandler.addEventListener('hardwareBackPress', this.close);
        if (this.props.image) {
            Image.getSize(this.props.image, (width: number, height: number) => {
                this.setState({ 
                    image: {uri: this.props.image},
                    resizeMode: "center",
                });
            }, err => {});
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.close);
    }

    close = () => {
        this.setState({
            isVisible: false
        })
    }

    showFullScreenImage = () => {
        if (this._isMounted && this.props.allowFullMode && this.state.resizeMode == "center") {
            this.setState({isVisible: true});
        }
    }

    hideFullScreenImage = () => {
        this.setState({ isVisible: false});
    }

    _renderFooter = () => {
        return  <TouchableOpacity style={styles.closeIconTouchable}
                    onPress={() => {this.setState({isVisible: false})}} >
                    <Icon
                        name='x'
                        type='feather'
                        color={colors.WHITE}
                        containerStyle={styles.iconContainer}/>
                </TouchableOpacity>
    }

    render() {
        const images = [{
            source: this.state.image,
        }];

        const imageHeight = this.props.height ? this.props.height : 100;
            
        return (
            <TouchableOpacity onPress={this.showFullScreenImage} activeOpacity={0.9}>
                <View style={styles.container}>
                    <ImageView
                        images={images}
                        imageIndex={0}
                        isVisible={this.state.isVisible}
                        controls={{close: null}}
                        renderFooter={(currentImage: any) => (this._renderFooter())}/>

                    <Image style={[styles.image, { height: imageHeight }]} source={ this.state.image } 
                        resizeMode={this.props.hasFullWidth ? undefined : this.state.resizeMode}/>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
    },
    image: {
        borderRadius: 10,
        width: '100%',
    },
    closeIconTouchable: {
        marginBottom: 60,
        height: 60,
        width: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        alignSelf: 'center',
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export { ImageViewWrapper as ImageView };

