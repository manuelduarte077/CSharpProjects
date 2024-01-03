import React from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'

import { Button, TextInput, SafeLayout } from '../../../components'
import { EmailInput, PasswordInput, SignupHeader } from '../components'

import { useStyles, useTheme } from '../../../hooks'
import { createStyleSheet } from '../../../hooks/useStyles'

const isIOS = Platform.OS === 'ios'

export default function SignupScreen() {
  const theme = useTheme()
  const styles = useStyles(styleSheet)

  return (
    <SafeLayout style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={isIOS ? 'padding' : 'height'}
        keyboardVerticalOffset={isIOS ? 40 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <SignupHeader />

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Name"
              placeholderTextColor={theme.colors.grayDark}
              textContentType="name"
              style={styles.input}
            />
            <EmailInput />
            <PasswordInput />
          </View>

          <View style={styles.confirmationContainer}>
            <View style={styles.confirmationCheck} />
            <Text style={styles.confirmationText}>By signing up, you agree to our</Text>
            <Button style={styles.confirmationButton} title="Terms" variant={'text'} />
          </View>

          <View>
            <Button title="Sign Up" />
            <Button
              title="Forgot your password?"
              variant={'text'}
              style={styles.forgotPasswordButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeLayout>
  )
}

const styleSheet = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    margin: theme.spacing.md,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  inputContainer: {
    marginVertical: theme.spacing.lg,
  },

  input: {
    backgroundColor: theme.colors.grayLight,
    marginBottom: theme.spacing.md,
    borderColor: theme.colors.gray,
    borderWidth: 1,
  },

  confirmationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },

  confirmationText: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.grayDarker,
    fontFamily: 'RedHatDisplay_400Regular',
  },

  confirmationButton: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.fontSize.content,
    fontFamily: 'RedHatDisplay_700Bold',
  },

  confirmationCheck: {
    width: theme.spacing.md,
    height: theme.spacing.md,
    borderRadius: 4,
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.grayLight,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
  },

  forgotPasswordButton: {
    marginTop: theme.spacing.md,
  },
}))
