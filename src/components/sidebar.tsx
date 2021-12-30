import { Feather } from '@expo/vector-icons'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import {
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  IconButton,
  Menu,
  useColorModeValue,
  VStack,
} from 'native-base'
import React, { useCallback, useState } from 'react'
import { useAuth } from '../context/auth'
import AnimatedColorBox from './animated-color-box'
import MenuButton from './menu-button'
import ThemeToggle from './theme-toggle'
const Sidebar = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props
  const { user, signout, loading } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const currentRoute = state.routeNames[state.index]

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer()
  }, [navigation])
  const handlePressMenuMain = useCallback(() => {
    navigation.navigate('Main')
  }, [navigation])
  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate('About')
  }, [navigation])
  const handlePressMenuProfile = useCallback(() => {
    navigation.navigate('Profile')
  }, [navigation])
  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}
    >
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
            _icon={{
              as: Feather,
              name: 'chevron-left',
              size: 6,
              color: useColorModeValue('blue.800', 'darkBlue.700'),
            }}
          />
        </HStack>
        <Heading mb={4} size="xl">
          Logo
        </Heading>

        <Center>
          <ThemeToggle />
        </Center>
        <MenuButton
          active={currentRoute === 'Main'}
          onPress={handlePressMenuMain}
          icon="inbox"
        >
          Tasks
        </MenuButton>
        <MenuButton
          active={currentRoute === 'About'}
          onPress={handlePressMenuAbout}
          icon="info"
        >
          About
        </MenuButton>
      </VStack>
      {!loading && (
        <Menu
          w="190"
          closeOnSelect={false}
          onOpen={() => setMenuOpen(true)}
          // onClose={() => console.log('closed')}
          isOpen={menuOpen}
          trigger={triggerProps => {
            return (
              <Button
                mb={4}
                size="sm"
                leftIcon={<Feather name="user" size={24} color="white" />}
                {...triggerProps}
              >
                {user.name ? user.name : user.email}
              </Button>
            )
          }}
        >
          <Menu.Group title="Profile">
            <Menu.Item
              onPress={() => {
                handlePressMenuProfile(), setMenuOpen(false)
              }}
            >
              Edit
            </Menu.Item>
          </Menu.Group>
          <Divider mt="3" w="100%" />

          <Menu.Item
            onPress={() => {
              setMenuOpen(false), signout()
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      )}
    </AnimatedColorBox>
  )
}

export default Sidebar
