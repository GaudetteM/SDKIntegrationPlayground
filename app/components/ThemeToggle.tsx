import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type ThemeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
};

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, isDark ? styles.darkText : styles.lightText]}>
        {isDark ? '⏾ Dark Mode' : '🔆 Light Mode'}
      </Text>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          isDark ? styles.darkButton : styles.lightButton,
        ]}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, isDark ? styles.darkButtonText : styles.lightButtonText]}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  lightText: { color: '#1a1a1a' },
  darkText: { color: '#f5f5f5' },
  toggleButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  lightButton: {
    backgroundColor: '#1a73e8',
    shadowColor: '#1a73e8',
  },
  darkButton: {
    backgroundColor: '#8ab4f8',
    shadowColor: '#8ab4f8',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  lightButtonText: { color: '#ffffff' },
  darkButtonText: { color: '#121212' },
});
