import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MovieCard from './MovieCard';
import PropTypes from 'prop-types';

const propTypes = {
  content: PropTypes.array,
  title: PropTypes.string,
};

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;
    return (
      <View style={styles.list}>
        <View style={styles.titleCategory}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity>
            <Text style={styles.moreBtn}> More </Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <MovieCard navigation={navigation} item={item} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },
  titleCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  moreBtn: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
});

List.propTypes = propTypes;
export default List;
