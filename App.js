import React from 'react';
import { 
  StyleSheet, Text, 
  View, TextInput,
  FlatList,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'

const cities = [
  'Berlin', 'Essen', 'Hamburg', 'London', 'Manchester', 'Edinburgh',
  'New York', 'Los Angeles', 'Chicago', 'Montreal', 'Toronto', 'Vancouver',
  'Tokyo', 'Osaka', 'Nagoya'
]

// - REFCACTOR NOTE -> Probably better to user Platform package to negotiate 
//                     Android specific quicks around needing keyboardWillShow

class App extends React.Component {

  state = {
    searchBarFocused: false
  }

  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true })
  }

  keyboardWillShow = () => {
    this.setState({ searchBarFocused: true })
  }

  keyboardWillHide = () => {
    this.setState({ searchBarFocused: false })
  }

  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    this.keyboardWillHide  = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
  }

  render() {
    let bgColor
    if (this.state.searchBarFocused) {
      bgColor = 'rgba(0,0,0,0.3)'
    } else bgColor = 'white'

    return (
      <View style={ styles.cradle }>
        <View style={ styles.header }>
          <Animatable.View 
            animation='slideInRight' 
            duration={ 750 }
            style={ styles.searchBarCradle }
          >
            <Animatable.View
              animation={ this.state.searchBarFocused ? 'fadeInDown' : 'fadeInUp'}
              duration={ 300 }
            >
              <Icon 
                name={ this.state.searchBarFocused ? 'md-arrow-back' : 'ios-search' }
                style={{ fontSize: 24 }}
              />
            </Animatable.View>
            <TextInput placeholder='Search' style={ styles.searchText }/>
          </Animatable.View>
        </View>

        <FlatList 
          style={{ backgroundColor: bgColor }}
          data={ cities }
          renderItem={({ item }) => (
            <Text style={ styles.searchResultText }>{ item }</Text>
          )}
          keyExtractor={ (item,index) => index.toString() }
        />
      </View>
    )
  }
}

export default App

const styles = StyleSheet.create({
  cradle: {
    flex: 1,
  },
  header: {
    height: 120,
    backgroundColor: '#EA93A0',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  searchBarCradle: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10
  },
  searchText: {
    marginHorizontal: 10,
    fontSize: 24,
    flex: 1
  },
  searchResultsCradle: {
    //backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)' : 'white',
  },
  searchResultText: {
    padding: 20,
    fontSize: 20
  }
});
