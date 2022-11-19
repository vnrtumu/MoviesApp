import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
class PlayButton extends React.PureComponent {
  render() {
    return (
      <Pressable onPress={() => {}} style={StyleSheet.playButton}>
        <Text style={styles.btnText}>P</Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  PlayButton: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
  },
  btnText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default PlayButton;
