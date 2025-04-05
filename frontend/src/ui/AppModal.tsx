import React, {useEffect} from 'react';
import {Dimensions, Modal, Pressable, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
  visible: boolean;
  onRequestClose(): void;
  animation?: boolean;
  heightOffset?: number;
  modalColor: string;
  backdropColor: string;
}

const {height} = Dimensions.get('window');

export default function AppModal({
  children,
  visible,
  onRequestClose,
  animation,
  heightOffset = 0,
  modalColor,
  backdropColor,
}: Props) {
  // const translateY = useSharedValue(modalHeight);
  const modalHeight = height - heightOffset;
  const translateY = useSharedValue(0);
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const handleClose = () => {
    // translateY.value = modalHeight;
    translateY.value = withTiming(modalHeight, {
      duration: animation ? 400 : 0,
    });
    setTimeout(() => {
      onRequestClose();
    }, 500);
  };

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationY < 0) return;
      translateY.value = e.translationY;
      // console.log(e.translationY);
    })
    .onFinalize(e => {
      if (e.translationY <= modalHeight / 6) {
        translateY.value = withTiming(0, {
          duration: animation ? 200 : 0,
        });
      } else {
        translateY.value = withTiming(modalHeight, {
          duration: animation ? 400 : 0,
        });

        runOnJS(handleClose)();
      }
    });

  useEffect(() => {
    if (visible)
      translateY.value = withTiming(0, {duration: animation ? 500 : 0});
  }, [visible, animation]);

  return (
    <Modal
      onRequestClose={handleClose}
      visible={visible}
      style={styles.container}
      transparent>
      <GestureHandlerRootView style={{flex: 1}}>
        <Pressable style={[styles.backdrop, {backgroundColor: backdropColor}]}>
          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[
                styles.modal,
                translateStyle,
                {backgroundColor: modalColor, height: modalHeight},
              ]}>
              {children}
            </Animated.View>
          </GestureDetector>
        </Pressable>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {},
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTopEndRadius: 7,
    borderTopStartRadius: 7,
    overflow: 'hidden',
  },
});
