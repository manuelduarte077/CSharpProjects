import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

// options
const options = ['Pomodoro', 'Short Breack', 'Long Breack']

export default function Header({ currentTime, setCurrentTime, setTime }) {
  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
    setCurrentTime(index)
    setTime(newTime * 60)
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.itemStyle,
            currentTime !== index && {
              borderColor: 'transparent',
            },
          ]}
        >
          <Text style={{ fontWeight: 'bold' }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    borderWidth: 3,
    padding: 5,
    width: '33%',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'white',
    marginVertical: 20,
  },
})
