import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const placeholderImage = require('../assets/img/images.png');

const propTypes = {
  item: PropTypes.object,
};

class MovieCard extends React.PureComponent {
  render() {
    const {item, navigation} = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Detail', {
            movieId: item.id,
            movieName: item.original_title
              ? item.original_title
              : item.original_name,
          })
        }
        style={styles.container}>
        <Image
          source={
            item.poster_path
              ? {uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}
              : placeholderImage
          }
          style={styles.imageStyle}
          resizeMode="cover"
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>
            {item.original_title ? item.original_title : item.original_name}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 210,
  },
  titleStyle: {
    width: 120,
  },
  imageStyle: {
    width: 120,
    height: 200,
    borderRadius: 10,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    top: 10,
    textAlign: 'center',
  },
});

MovieCard.propTypes = propTypes;

export default MovieCard;
