import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

type Props = {
  label: string;
  color: string;
  onPress: () => void;
  isDark: boolean;
};

const getHapticIcon = (label: string) => {
  if (label === 'Light') return '•';
  if (label === 'Medium') return '••';
  if (label === 'Heavy') return '•••';
  return '';
};

export function HapticButton({ label, color, onPress, isDark }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          borderColor: color,
          transform: [{ scale: pressed ? 0.95 : 1 }],
          opacity: pressed ? 0.7 : 1,
          shadowColor: color,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={[styles.icon, { color }]}>{getHapticIcon(label)}</Text>
      </View>
      <Text style={[styles.text, isDark ? styles.darkText : styles.lightText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  iconContainer: {
    marginBottom: 8,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  lightText: { color: '#1a1a1a' },
  darkText: { color: '#f5f5f5' },
});
