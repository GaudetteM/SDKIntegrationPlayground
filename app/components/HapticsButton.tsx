import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  color: string;
  onPress: () => void;
  isDark: boolean;
};

export function HapticButton({ label, color, onPress, isDark }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isDark ? '#1f1f1f' : '#ffffff',
          borderColor: color,
          transform: [{ scale: pressed ? 0.97 : 1 }],
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text style={[styles.text, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
