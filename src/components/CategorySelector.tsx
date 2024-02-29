import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/colors';

interface Props<T> {
  visible?: boolean;
  title?: string;
  data: T[];
  renderItem(item: T): JSX.Element;
  onSelect(item: T, index: number): void;
  onRequestClose?(): void;
}

export default function CategorySelector<T extends any>({
  visible = false,
  title,
  data,
  renderItem,
  onSelect,
  onRequestClose,
}: Props<T>) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const handleSelect = (item: T, index: number) => {
    setSelectedIndex(index);
    onSelect(item, index);
    onRequestClose && onRequestClose();
  };

  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      <Pressable style={styles.backdrop} />
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView>
            {data.map((item, index) => {
              return (
                <Pressable
                  onPress={() => handleSelect(item, index)}
                  key={index}
                  style={styles.selectorContainer}>
                  {selectedIndex === index ? (
                    <MaterialCommunityIcons
                      name="radiobox-marked"
                      color={colors.SECONDARY}
                    />
                  ) : (
                    <MaterialCommunityIcons name="radiobox-blank" />
                  )}
                  {renderItem(item)}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONTRAST,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modal: {
    width: '90%',
    maxHeight: '50%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.CONTRAST,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.PRIMARY,
    paddingVertical: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
