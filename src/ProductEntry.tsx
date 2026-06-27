import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthFlow } from './screens/AuthFlow';
import { colors } from './theme';

export function ProductEntry({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  if (!ready) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AuthFlow onComplete={() => setReady(true)} />
      </SafeAreaView>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  }
});
