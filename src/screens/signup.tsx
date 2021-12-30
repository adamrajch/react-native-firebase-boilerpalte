import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
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
  View,
  VStack,
} from 'native-base'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup'
import { auth } from '../../firebase'
import { useAuth } from '../context/auth'
const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .min(4, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Value must be between 6-20 charachters!')
    .max(20, 'Too Long!')
    .required('Required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
})

export default function SignUp({ navigation }: any) {
  const [visibility, setVisibility] = useState(false)
  const [error, setError] = useState(null)
  const { createUserWithEmail, signinWithGoogle } = useAuth()

  const routeToLogin = () => {
    navigation.navigate('Login')
  }

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  const onRegister = ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    createUserWithEmail(email, password)
  }

  const googleSignIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(response => {
        console.log(response.user)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage, errorCode)
      })
  }
  return (
    <View flex={1} alignItems="center">
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
              // createUserWithEmail(values.email, values.password)

              onRegister(values)
            }}
            enableReinitialize={false}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={SignUpSchema}
          >
            {({ handleSubmit, handleChange, errors, handleBlur, values }) => (
              <Box safeArea p="2" py="8" w="95%" maxW="300">
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
                    {errors.email && (
                      <Text color="red.700">{errors.email}</Text>
                    )}
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
                    {errors.password && (
                      <Text color="red.700">{errors.password}</Text>
                    )}
                  </FormControl>
                  <FormControl isRequired>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <Input
                      type={visibility ? 'text' : 'password'}
                      size="lg"
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
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
                    {errors.confirmPassword && (
                      <Text color="red.700">{errors.confirmPassword}</Text>
                    )}
                  </FormControl>
                  <Button
                    mt="2"
                    colorScheme="indigo"
                    onPress={() => handleSubmit()}
                  >
                    Create Account
                  </Button>
                  <HStack mt="2">
                    <Button
                      leftIcon={
                        <AntDesign name="google" size={24} color="white" />
                      }
                      onPress={googleSignIn}
                    >
                      Google
                    </Button>
                  </HStack>
                  <HStack mt="6" justifyContent="center">
                    <Text
                      fontSize="sm"
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}
                    >
                      Already a user?{' '}
                    </Text>
                    <Link
                      _text={{
                        color: 'indigo.500',
                        fontWeight: 'medium',
                        fontSize: 'sm',
                      }}
                      onPress={routeToLogin}
                    >
                      Login
                    </Link>
                  </HStack>
                  {error && <Text color="red.700">{error}</Text>}
                </VStack>
              </Box>
            )}
          </Formik>
        </VStack>
      </KeyboardAwareScrollView>
    </View>
  )
}
