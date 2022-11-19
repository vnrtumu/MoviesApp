import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  getPopularMoviesApiCall,
  getUpcomingMoviesApiCall,
  getPopularTvApiCall,
  getFamilyMovieApiCall,
  getDocumentryMovieApiCall,
} from '../services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';
import {useNavigation} from '@react-navigation/native';

const dimensions = Dimensions.get('screen');
// const {navigation} = useNavigation;
const Home = ({navigation}) => {
  const [movieImages, setMovieImages] = useState();
  const [upcomingMovie, setUpcomingMovie] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentry, setDocumentry] = useState();
  const [popularTV, setPopulaTV] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMoviesApiCall(),
      getPopularMoviesApiCall(),
      getPopularTvApiCall(),
      getFamilyMovieApiCall(),
      getDocumentryMovieApiCall(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMovieData,
          documentryMovieData,
        ]) => {
          const movieImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            movieImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });

          setMovieImages(movieImagesArray);
          setUpcomingMovie(upcomingMoviesData);
          setPopularMovies(popularMoviesData);
          setPopulaTV(popularTvData);
          setFamilyMovies(familyMovieData);
          setDocumentry(documentryMovieData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {movieImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={movieImages}
                circleLoop={true}
                autoplay={true}
                sliderBoxHeight={dimensions.height / 1.5}
                dotStyle={styles.SliderStyle}
                // onCurrentImagePressed={() => navigation.navigate('Detail')}
              />
            </View>
          )}

          <View style={styles.carousel}>
            {popularMovies && (
              <List
                navigation={navigation}
                content={popularMovies}
                title="Popular Movies"
              />
            )}

            {upcomingMovie && (
              <List
                navigation={navigation}
                content={upcomingMovie}
                title="Upcoming Moviess"
              />
            )}

            {popularTV && (
              <List
                navigation={navigation}
                content={popularTV}
                title="Popular TV Shows"
              />
            )}

            {familyMovies && (
              <List
                navigation={navigation}
                content={familyMovies}
                title="Family Movies"
              />
            )}

            {documentry && (
              <List
                navigation={navigation}
                content={documentry}
                title="Documentry"
              />
            )}
          </View>
        </ScrollView>
      )}

      {!loaded && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    paddingLeft: 15,
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
});

export default Home;
