import {
  StyleSheet,
  Platform,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native'
import { useEffect, useState } from 'react'

// Components
import Header from './src/components/Header'
import Timer from './src/components/Timer'

/// Audio
import { Audio } from 'expo-av'

// Colors
const colors = ['#f7dc6f', '#a2d9ce', '#d7bde2']

export default function App() {
  const [isWorking, setIsWorking] = useState(false) // is the timer running?
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK') // current time
  const [isActive, setIsActive] = useState(false) // is the timer active?

  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 10)
    } else {
      clearInterval(interval)
    }

    if (time === 0) {
      setIsActive(false)
      setIsWorking((prev) => !prev)
      setTime(isWorking ? 300 : 1500)
    }

    return () => clearInterval(interval)
  }, [isActive, time])

  function handleStartStop() {
    playSound()
    setIsActive(!isActive)
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/click.mp3')
    )
    await sound.playAsync()
  }

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
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
            {isActive ? 'STOP' : 'START'}
          </Text>
        </TouchableOpacity>
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

  button: {
    backgroundColor: '#333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
})
