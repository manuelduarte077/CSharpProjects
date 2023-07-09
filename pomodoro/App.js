import { StyleSheet, Platform, Text, SafeAreaView, View } from 'react-native'
import { useState } from 'react'

// Components
import Header from './src/components/Header'
import Timer from './src/components/Timer'

// Colors
const colors = ['#f7dc6f', '#a2d9ce', '#d7bde2']

export default function App() {
  const [isWorking, setIsWorking] = useState(false) // is the timer running?
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK') // current time

  console.log('time', currentTime)

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS == 'android' && 30,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>

        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />

        <Timer time={time} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
})
