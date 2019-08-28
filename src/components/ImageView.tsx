import * as React from 'react';
import ImageView from 'react-native-image-view';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface IImageViewProps {
    image: any;
    height?: number;
}

type IProps = IImageViewProps;

interface IState {
    image: any,
    resizeMode: any,
    isVisible: boolean
}

class ImageViewWrapper extends React.Component<IProps, IState> {

    isMounted: boolean = false;

    constructor(props: IProps) {
        super(props);
        this.state = {
            image: require('@assets/images/placeholder.png'),
            resizeMode: "stretch",
            isVisible: false
        };
    }
    componentDidMount() {
        this.isMounted = true;
        if (this.props.image) {
            Image.getSize(this.props.image, (width: number, height: number) => {
                this.setState({ 
                    image: {uri: this.props.image},
                    resizeMode: "center",
                });
            }, err => {});
        }
    }

    showFullScreenImage = () => {
        if (this.isMounted && this.state.resizeMode == "center") {
            this.setState({isVisible: true});
        }
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
                        onClose={() => {this.setState({ isVisible: false})}}/>

                    <Image style={[styles.image, { height: imageHeight }]} source={ this.state.image } resizeMode={this.state.resizeMode}/>
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
});

export { ImageViewWrapper as ImageView };