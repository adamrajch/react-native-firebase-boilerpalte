import { Text, useColorModeValue } from 'native-base'
import React, { useState } from 'react'
import shortid from 'shortid'
import AnimatedColorBox from '../components/animated-color-box'
import Masthead from '../components/masthead'
import NavBar from '../components/navbar'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy movie tickets for Friday',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial',
    done: false,
  },
]

export default function MainScreen() {
  const [data, setData] = useState(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      <Masthead title="Periodize!" image={require('../assets/masthead.png')}>
        <NavBar />
      </Masthead>
      <Text>Hello </Text>
    </AnimatedColorBox>
  )
}
