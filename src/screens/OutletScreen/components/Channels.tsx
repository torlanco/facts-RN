import React from 'react';

// Components
import { ActionButton } from '@components';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

// Typings
import { IOutlet } from '@interfaces/outlet';

// Styles
import { colors, responsive, typos } from '@styles';

const Channels: React.FC<IOutlet.IChannelProps> = props => {
  const {
    listRef,
    channels,
    selectedTab,
    onChannelSelect,
  } = props;
  
  const RenderChannel = (properties: any) => {
    const { item, selected } = properties;
    const color = !selected ? colors.MID_GRAY : colors.BLACK;
    const borderColor = !selected ? colors.LIGHT_GRAY : colors.PRIMARY;
    const animVal = React.useRef(new Animated.Value(selected ? 1 : 0)).current;

    const interPolateWidth = animVal.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
    const animatedTransition = Animated.timing(animVal, { duration: 500, useNativeDriver: false, toValue: 1 })
    
    const backgroundStyles = [
      styles.backgroundStyles,
      { width: interPolateWidth }
    ];
    const containerStyle = [
      styles.buttonContainer,
      { borderColor },
    ];
    const buttonStyle = [
      styles.button,
    ];
    const textStyle = [
      styles.textStyle,
      { color }
    ];

    const handlePress = () => {
      onChannelSelect(item);
      animatedTransition.start();
    };
    
    return (
      <View style={{ height: responsive(50) }}>
        <TouchableOpacity style={containerStyle} onPress={handlePress}>
          <Animated.View style={backgroundStyles} />
          <View style={buttonStyle}>
            <Text style={textStyle}>{item}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  };
  
  return (
    <View>
      <Animated.FlatList
        ref={listRef}
        data={channels}
        renderItem={({ item }) => <RenderChannel item={item} selected={selectedTab === item} />}
        extraData={selectedTab}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyles: {
    top: 0,
    left: 0,
    zIndex: -1,
    position: 'absolute',
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.PRIMARY,
  },
  buttonContainer: {
    borderWidth: 2,
    borderRadius: 8,
    minHeight: '100%',
    justifyContent: 'center',
    marginRight: 8,
    position: 'relative',
  },
  button: {
    borderRadius: 8,
    height: responsive(45),
    paddingVertical: 2,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  textStyle: {
    ...typos.PRIMARY,
    textTransform: 'uppercase',
  }
});

export default Channels;