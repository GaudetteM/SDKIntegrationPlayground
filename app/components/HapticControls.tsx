import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { triggerHaptic } from '../native/Haptics';
import { HapticButton } from './HapticsButton';

type HapticControlsProps = {
  isDark: boolean;
};

export function HapticControls({ isDark }: HapticControlsProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, isDark ? styles.darkText : styles.lightText]}>
        Haptic Feedback
      </Text>
      <Text style={[styles.subtitle, isDark ? styles.darkSubtitle : styles.lightSubtitle]}>
        Feel the difference
      </Text>
      <View style={styles.buttonRow}>
        <HapticButton
          label="Light"
          color="#34a853"
          onPress={() => triggerHaptic('light')}
          isDark={isDark}
        />
        <HapticButton
          label="Medium"
          color="#fbbc05"
          onPress={() => triggerHaptic('medium')}
          isDark={isDark}
        />
        <HapticButton
          label="Heavy"
          color="#ea4335"
          onPress={() => triggerHaptic('heavy')}
          isDark={isDark}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  lightText: { color: '#1a1a1a' },
  darkText: { color: '#f5f5f5' },
  lightSubtitle: { color: '#666666' },
  darkSubtitle: { color: '#999999' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});
