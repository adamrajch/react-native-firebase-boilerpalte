import { MaterialIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Text,
  useColorModeValue,
  VStack,
  WarningOutlineIcon,
} from 'native-base'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useAuth } from '../context/auth'
export default function Login({ navigation }: any) {
  const [visibility, setVisibility] = useState(false)

  const { signinWithEmail } = useAuth()

  const initialValues = {
    email: '',
    password: '',
  }
  const routeToSignUp = () => {
    navigation.navigate('SignUp')
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      style={{ width: '100%' }}
      keyboardShouldPersistTaps="always"
    >
      <VStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        bg={useColorModeValue('warmGray.50', 'primary.700')}
        w="full"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async values => {
            signinWithEmail(values.email, values.password)
          }}
          enableReinitialize={false}
          validateOnChange={false}
          validateOnBlur={false}
          // validationSchema={SignUpSchema}
        >
          {({ handleSubmit, handleChange, errors, handleBlur, values }) => (
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
              >
                Periodize
              </Heading>

              <VStack space={3} mt="5">
                <FormControl isRequired>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    size="lg"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    autoCapitalize="none"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    type={visibility ? 'text' : 'password'}
                    size="lg"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    autoCapitalize="none"
                    InputRightElement={
                      <Icon
                        as={
                          visibility ? (
                            <MaterialIcons name="visibility" />
                          ) : (
                            <MaterialIcons name="visibility-off" />
                          )
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                        onPress={() => setVisibility(!visibility)}
                      />
                    }
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Atleast 6 characters are required.
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button
                  mt="2"
                  colorScheme="indigo"
                  onPress={() => handleSubmit()}
                >
                  Login
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    Don't have an account?{' '}
                  </Text>
                  <Link
                    _text={{
                      color: 'indigo.500',
                      fontWeight: 'medium',
                      fontSize: 'sm',
                    }}
                    onPress={routeToSignUp}
                  >
                    Sign Up
                  </Link>
                </HStack>
              </VStack>
            </Box>
          )}
        </Formik>
      </VStack>
    </KeyboardAwareScrollView>
  )
}
