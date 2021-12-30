import {
  HStack,
  IconButton,
  MoonIcon,
  SunIcon,
  useColorMode,
} from 'native-base'
import React from 'react'

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <HStack space={2} alignItems="center">
      <IconButton
        icon={
          colorMode === 'light' ? (
            <SunIcon color={'cyan.500'} />
          ) : (
            <MoonIcon color={'cyan.500'} />
          )
        }
        onPress={toggleColorMode}
      />
    </HStack>
  )
}
