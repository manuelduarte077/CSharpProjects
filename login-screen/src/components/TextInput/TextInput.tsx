import React, { useState } from 'react'
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native'

import { theme } from '../../config/theme'

export const TextInput = ({
  secureTextEntry,
  style,
  ...rest
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry || false)

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <View style={[styles.container, style]}>
      <RNTextInput
        style={styles.input}
        placeholderTextColor={theme.colors.grayDark}
        secureTextEntry={showPassword}
        {...rest}
      />
      {secureTextEntry && (
        <Pressable style={styles.showBtn} onPress={toggleShowPassword}>
          <Text style={styles.showBtnText}>
            {showPassword ? 'Show' : 'Hide'}
          </Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    fontFamily: 'RedHatDisplay_400Regular',
    borderColor: theme.colors.grayDark,
    backgroundColor: theme.colors.grayLight,
    borderRadius: theme.roundness.default,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: theme.spacing.md,
    fontSize: theme.fontSize.content,
    flex: 1,
    paddingRight: 0,
  },
  showBtn: {
    marginRight: theme.spacing.md,
    marginLeft: theme.spacing.xs,
  },
  showBtnText: {
    fontFamily: 'RedHatDisplay_500Medium',
    color: theme.colors.green,
    fontSize: theme.fontSize.caption,
  },
})
