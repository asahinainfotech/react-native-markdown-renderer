import React, { Component, PropTypes } from "react";
import {
    TouchableWithoutFeedback,
    View,
    Modal,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from '@expo/vector-icons/Ionicons';
import FitImage from 'react-native-fit-image';

const { height, width } = Dimensions.get('window');

export default class ImageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            modalVisible: false
        };
        this.images = [{
            url: props.node.attributes.src,
            freeHeight: true
        }]
    }

    _handleOpenImage = () => {
        this.setState({
            index: 0,
            modalVisible: true
        });
    }

    _handleCloseImage = () => {
        this.setState({
            index: 0,
            modalVisible: false
        })
    }

    render() {
        const { node, styles } = this.props;
        return (
            <View style={styles.imageBox}>
                <TouchableWithoutFeedback onPress={() => this._handleOpenImage()}>
                    <FitImage indicator={true} style={styles.image} source={{ uri: node.attributes.src }} />
                </TouchableWithoutFeedback>
                <Modal
                    visible={this.state.modalVisible}
                    transparent={false}
                    onRequestClose={() => this._handleCloseImage()}
                >
                    <TouchableOpacity style={styles.modalCloseButton} onPress={() => this._handleCloseImage()} >
                        <Icon name="md-close" style={styles.modalCloseIcon} />
                    </TouchableOpacity>
                    <View style={localStyles.imageContainer}>
                        <ImageViewer
                            imageUrls={this.images}
                            index={this.state.index}
                            enableSwipeDown
                            onSwipeDown={
                                () => this._handleCloseImage()
                            }
                        />
                    </View>
                </Modal>
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: height,
        width: width
    }
})