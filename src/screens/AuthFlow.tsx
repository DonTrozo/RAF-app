import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { validateClaimReference, validateRequired, validateSouthAfricanId } from '../validation';

export type AuthStep = 'welcome' | 'register' | 'login' | 'consent' | 'linkClaim' | 'uploadDocument' | 'complete';

export function AuthFlow({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<AuthStep>('welcome');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [claimReference, setClaimReference] = useState('RAF-2026-014582');
  const [errors, setErrors] = useState<string[]>([]);

  function validateRegistration() {
    const nextErrors = [
      ...validateRequired(fullName, 'Full name').errors,
      ...validateRequired(email, 'Email').errors,
      ...validateSouthAfricanId(idNumber).errors
    ];

    setErrors(nextErrors);

    if (nextErrors.length === 0) {
      setStep('consent');
    }
  }

  function validateClaimLinking() {
    const result = validateClaimReference(claimReference);
    setErrors(result.errors);

    if (result.valid) {
      setStep('uploadDocument');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.brandBlock}>
        <Ionicons name="shield-checkmark-outline" size={36} color={colors.accent} />
        <Text style={styles.brandTitle}>RAF Connect</Text>
        <Text style={styles.brandCopy}>Secure claimant onboarding, POPIA consent, claim linking, and document upload.</Text>
      </View>

      {step === 'welcome' && (
        <Card title="Welcome">
          <Text style={styles.copy}>Create or access your claimant profile to track claim progress and outstanding documents.</Text>
          <PrimaryButton label="Create account" onPress={() => setStep('register')} />
          <SecondaryButton label="I already have an account" onPress={() => setStep('login')} />
        </Card>
      )}

      {step === 'register' && (
        <Card title="Register claimant profile">
          <Field label="Full name" value={fullName} onChangeText={setFullName} />
          <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Field label="SA ID number" value={idNumber} onChangeText={setIdNumber} keyboardType="number-pad" />
          <ErrorList errors={errors} />
          <PrimaryButton label="Continue to POPIA consent" onPress={validateRegistration} />
          <SecondaryButton label="Back" onPress={() => setStep('welcome')} />
        </Card>
      )}

      {step === 'login' && (
        <Card title="Sign in">
          <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Field label="Password" value="********" onChangeText={() => undefined} secureTextEntry />
          <PrimaryButton label="Sign in" onPress={() => setStep('linkClaim')} />
          <SecondaryButton label="Back" onPress={() => setStep('welcome')} />
        </Card>
      )}

      {step === 'consent' && (
        <Card title="POPIA consent">
          <Text style={styles.copy}>RAF Connect needs permission to process your personal information for claim tracking, document review, communication, appointment booking, and support.</Text>
          <Text style={styles.notice}>By continuing, the claimant confirms that their information may be processed for RAF claim administration purposes.</Text>
          <PrimaryButton label="Accept and continue" onPress={() => setStep('linkClaim')} />
          <SecondaryButton label="Review later" onPress={() => setStep('welcome')} />
        </Card>
      )}

      {step === 'linkClaim' && (
        <Card title="Link RAF claim">
          <Text style={styles.copy}>Enter an existing RAF claim reference so it can be attached to your claimant profile.</Text>
          <Field label="Claim reference" value={claimReference} onChangeText={setClaimReference} autoCapitalize="characters" />
          <ErrorList errors={errors} />
          <PrimaryButton label="Link claim" onPress={validateClaimLinking} />
        </Card>
      )}

      {step === 'uploadDocument' && (
        <Card title="Upload first document">
          <Text style={styles.copy}>Production will use secure signed uploads. This MVP captures the intended upload action and document type.</Text>
          {['Identity document', 'Medical report', 'Accident report', 'Bank confirmation'].map((item) => (
            <View key={item} style={styles.documentChoice}>
              <Ionicons name="document-attach-outline" size={20} color={colors.primary} />
              <Text style={styles.documentChoiceText}>{item}</Text>
              <Text style={styles.documentChoiceAction}>Select</Text>
            </View>
          ))}
          <PrimaryButton label="Continue to dashboard" onPress={() => setStep('complete')} />
        </Card>
      )}

      {step === 'complete' && (
        <Card title="Profile ready">
          <Text style={styles.copy}>The claimant profile, POPIA consent, linked claim, and document upload flow are ready for backend connection.</Text>
          <PrimaryButton label="Open app" onPress={onComplete} />
        </Card>
      )}
    </ScrollView>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Field(props: React.ComponentProps<typeof TextInput> & { label: string }) {
  const { label, ...inputProps } = props;
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput style={styles.input} placeholderTextColor={colors.muted} {...inputProps} />
    </View>
  );
}

function ErrorList({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;

  return (
    <View style={styles.errorBox}>
      {errors.map((error) => (
        <Text key={error} style={styles.errorText}>{error}</Text>
      ))}
    </View>
  );
}

function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

function SecondaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.secondaryButton} onPress={onPress}>
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
    backgroundColor: colors.background,
    flexGrow: 1,
    justifyContent: 'center'
  },
  brandBlock: {
    alignItems: 'center',
    gap: spacing.sm
  },
  brandTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.primaryDark
  },
  brandCopy: {
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 21
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '900'
  },
  copy: {
    color: colors.muted,
    lineHeight: 21
  },
  notice: {
    color: colors.ink,
    backgroundColor: colors.softBlue,
    borderRadius: radius.md,
    padding: spacing.md,
    lineHeight: 21,
    fontWeight: '700'
  },
  fieldWrap: {
    gap: spacing.xs
  },
  fieldLabel: {
    color: colors.ink,
    fontWeight: '800'
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.ink,
    backgroundColor: '#FFFFFF'
  },
  errorBox: {
    backgroundColor: '#FFF3F3',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs
  },
  errorText: {
    color: colors.error,
    fontWeight: '700'
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center'
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900'
  },
  secondaryButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center'
  },
  secondaryButtonText: {
    color: colors.primary,
    fontWeight: '900'
  },
  documentChoice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md
  },
  documentChoiceText: {
    flex: 1,
    color: colors.ink,
    fontWeight: '800'
  },
  documentChoiceAction: {
    color: colors.primary,
    fontWeight: '900'
  }
});
