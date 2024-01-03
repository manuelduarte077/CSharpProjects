import React, { useState } from 'react'
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native'

import { useStyles } from '../../hooks'
import { createStyleSheet } from '../../hooks/useStyles'

export const TextInput = ({ secureTextEntry, style, ...rest }: TextInputProps) => {
  const styles = useStyles(styleSheet)

  const [showPassword, setShowPassword] = useState(secureTextEntry || false)

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <View style={[styles.container, style]}>
      <RNTextInput style={styles.input} secureTextEntry={showPassword} {...rest} />
      {secureTextEntry && (
        <Pressable style={styles.showBtn} onPress={toggleShowPassword}>
          <Text style={styles.showBtnText}>{showPassword ? 'Show' : 'Hide'}</Text>
        </Pressable>
      )}
    </View>
  )
}

const styleSheet = createStyleSheet(({ theme }) => ({
  container: {
    fontFamily: 'RedHatDisplay_400Regular',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.grayDark,
    backgroundColor: theme.colors.grayLight,
    borderRadius: theme.roundness.default,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: theme.spacing.md,
    paddingRight: 0,
    fontSize: theme.fontSize.content,
    flex: 1,
    color: theme.colors.black,
  },
  showBtn: {
    marginRight: theme.spacing.md,
    marginLeft: theme.spacing.sm,
  },
  showBtnText: {
    fontFamily: 'RedHatDisplay_500Medium',
    color: theme.colors.green,
    fontSize: theme.fontSize.caption,
  },
}))
