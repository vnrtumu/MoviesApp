import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  // FlatList,
} from 'react-native';
import {getMovieDetailApiCall} from '../services';
// import StarRating from 'react-native-star-rating';
import dateFormat, {masks} from 'dateformat';
import PlayButton from '../components/PlayButton';

const dimensions = Dimensions.get('screen');

const placeholderImage = require('../assets/img/images.png');

const Detail = ({route, navigation}) => {
  const [movieDetail, setMovieDetail] = useState('');
  const [loaded, setLoaded] = useState(true);

  const {movieId} = route.params;

  useEffect(() => {
    getMovieDetailApiCall(movieId).then(movieData => {
      // console.log('Movie Array', movieData.backdrop_path);
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  return (
    <React.Fragment>
      {loaded && (
        <ScrollView>
          <Image
            source={
              movieDetail.poster_path
                ? {
                    uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
                  }
                : placeholderImage
            }
            style={styles.imageStyle}
            resizeMode="cover"
          />
          <View style={styles.mainContainer}>
            <View>
              <PlayButton />
            </View>
            <Text style={styles.movieTitle}>
              {movieDetail.original_title
                ? movieDetail.original_title
                : movieDetail.original_name}
            </Text>
            {movieDetail.genres && (
              <View style={styles.genreStyle}>
                {movieDetail.genres.map(genre => {
                  return (
                    <Text style={styles.genre} key={genre.id}>
                      {genre.name}
                    </Text>
                  );
                })}
              </View>
            )}

            <Text style={styles.rating}>TMDB: {movieDetail.vote_average} </Text>
            <Text style={styles.overview}>{movieDetail.overview} </Text>
            <Text style={styles.date}>
              Released On:{' '}
              {dateFormat(movieDetail.release_date, 'mmmm dd, yyyy')}
            </Text>
          </View>
        </ScrollView>
      )}
      {!loaded && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  imageStyle: {
    height: dimensions.height / 2.5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  genreStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 15,
  },
  genre: {
    marginRight: 10,
    color: 'red',
    fontWeight: '600',
  },
  rating: {
    marginTop: 10,
    color: 'yelow',
    fontSize: 18,
    fontWeight: 'bold',
  },
  overview: {
    margin: 10,
    fontSize: 12,
  },
  date: {
    margin: 10,
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
});
export default Detail;
