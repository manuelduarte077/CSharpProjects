import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import {
  RedHatDisplay_400Regular,
  RedHatDisplay_500Medium,
  RedHatDisplay_600SemiBold,
  RedHatDisplay_700Bold,
  useFonts,
} from '@expo-google-fonts/red-hat-display'
import { useNavigation } from '@react-navigation/core'

import { theme } from '../../../config/theme'
import { Button } from '../../../components/Button/Button'
import { TextInput } from '../../../components/TextInput'
import { PublicStackNavigationProp } from '../../../types/index'

const isIOS = Platform.OS === 'ios'

export default function SignupScreen() {
  /// Navigation
  const navigation = useNavigation<PublicStackNavigationProp>()

  const handleClosePress = () => {
    if (navigation.canGoBack()) navigation.pop()
  }

  const handleLoginPress = () => {
    navigation.navigate('Login')
  }

  /// Fonts
  let [fontsLoaded, fontError] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_500Medium,
    RedHatDisplay_600SemiBold,
    RedHatDisplay_700Bold,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={isIOS ? 'padding' : 'height'}
        keyboardVerticalOffset={isIOS ? 40 : 0}
      >
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Pressable onPress={handleClosePress} style={styles.headerBtn}>
              <Text style={styles.closeBtnTitle}>X</Text>
            </Pressable>
            <Text style={styles.title}>Sign Up</Text>
            <Pressable onPress={handleLoginPress} style={[styles.headerBtn, styles.loginBtn]}>
              <Text style={styles.loginBtnTitle}>Login</Text>
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={theme.colors.grayDark}
              placeholder="Name"
              textContentType="name"
              style={styles.input}
            />
            <TextInput
              placeholderTextColor={theme.colors.grayDark}
              placeholder="Email"
              textContentType="emailAddress"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              textContentType="password"
              secureTextEntry
              style={styles.input}
              placeholderTextColor={theme.colors.grayDark}
            />
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    margin: theme.spacing.md,
  },

  title: {
    fontSize: theme.fontSize.title,
    fontFamily: 'RedHatDisplay_700Bold',
    textAlign: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBtn: {
    flex: 1,
    padding: theme.spacing.xs,
  },

  closeBtnTitle: {
    fontSize: theme.fontSize.content,
    fontFamily: 'RedHatDisplay_700Bold',
    color: theme.colors.grayDark,
  },

  loginBtn: {
    alignItems: 'flex-end',
  },

  loginBtnTitle: {
    fontSize: theme.fontSize.content,
    fontFamily: 'RedHatDisplay_700Bold',
    color: theme.colors.green,
  },
  inputContainer: {
    marginVertical: theme.spacing.lg,
  },

  input: {
    backgroundColor: theme.colors.grayLight,
    marginBottom: theme.spacing.md,
  },

  forgotPasswordButton: {
    marginTop: theme.spacing.md,
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
    borderRadius: theme.spacing.sm,
    borderColor: theme.colors.grayDark,
    backgroundColor: theme.colors.gray,
    marginRight: theme.spacing.sm,
  },
})
