import React, {useEffect} from 'react';
import {Dimensions, Modal, Pressable, StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import colors from '../utils/colors';
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
}

const {height} = Dimensions.get('window');

const modalHeight = height - 150;

export default function AppModal({
  children,
  visible,
  onRequestClose,
  animation,
}: Props) {
  const translateY = useSharedValue(modalHeight);
  const translateStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationY < 0) return;
      translateY.value = e.translationY;
    })
    .onFinalize(e => {
      if (e.translationY <= modalHeight / 2) {
        translateY.value = 0;
      } else {
        translateY.value = modalHeight;
        runOnJS(onRequestClose)();
      }
    });

  useEffect(() => {
    if (visible)
      translateY.value = withTiming(0, {duration: animation ? 200 : 0});
  }, [visible, animation]);

  return (
    <Modal
      onRequestClose={onRequestClose}
      visible={visible}
      style={styles.container}
      transparent>
      <GestureHandlerRootView style={{flex: 1}}>
        <Pressable style={styles.backdrop}>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.modal, translateStyle]}>
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
    backgroundColor: colors.INACTIVE_CONTRAST,
  },
  modal: {
    backgroundColor: colors.PRIMARY,
    height: modalHeight,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    overflow: 'hidden',
  },
});
