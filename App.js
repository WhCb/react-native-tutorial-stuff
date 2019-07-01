import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Button, Alert } from 'react-native';
import { TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { FlatList, SectionList, ActivityIndicator } from 'react-native';

import { Platform } from '@unimodules/core';

export default function App() {
  return (
    <ScrollView style={{ backgroundColor: 'LightBlue' }}>
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
        <Text>Hello World!</Text>
      </View>
      
      <View style={{ flex: 2, backgroundColor: 'orange' }}>
        <BananasExample />
      </View>

      <PizzaTranslatorExample />

      <ButtonBasicsExample />

      <TouchablesExample />

      <ScrollViewExample />

      <FlatListExample />

      <SectionListExample />

      <FetchExample />
    </ScrollView>
  );
}

class BananasExample extends Component {
  render() {
    return (
      <Image 
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
        style={{width: 193, height: 110}}
      />
    )
  }
}

class PizzaTranslatorExample extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'grey' }}>
        <TextInput
          style={{ height: 40 }}
          placeholder='Type Here'
          onChangeText={text => { this.setState({ text }) }}
        />
        <Text>
          {this.state.text.split(' ').map(word => word && '~ ').join(' ')}
        </Text>
      </View>
    )
  }
}

class ButtonBasicsExample extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  render() {
    return (
      <View>
        <View>
          <Button 
            onPress={this._onPressButton}
            title='Press Me22'
          />
        </View>

        <View>
          <Button 
            onPress={this._onPressButton}
            title='Colored Press Me'
            color='#841584'
          />
        </View>

      </View>
    )
  }
}

class TouchablesExample extends Component {
  _onPressButton() {
    Alert.alert('You pressed a button!')
  }

  _onLongPressButton() {
    Alert.alert('You long pressed a button!')
  }

  render() {
    return (
      <View>
        <TouchableHighlight 
          onPress={this._onPressButton} 
          onLongPress={this._onLongPressButton}
          underlayColor='white'
        >
          <View>
            <Text>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>

        <TouchableOpacity onPress={this._onPressButton}>
          <View>
            <Text>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>

        <TouchableNativeFeedback 
          background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
          onPress={this._onPressButton}
        >
          <View>
            <Text>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableWithoutFeedback
          onPress={this._onPressButton}
        >
          <View>
            <Text>TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

class ScrollViewExample extends Component {
  render() {
    return (
      <View>
        <Text>Scroll Me</Text>
        <BananasExample />
      </View>
    )
  }
}

class FlatListExample extends Component {
  render() {
    return (
      <View>
        <FlatList 
          style={styles.flatListContainer}
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'}
          ]}
          renderItem={({ item }) => <Text style={styles.flatListItem}>{item.key}</Text>}
        />
      </View>
    )
  }
}

class SectionListExample extends Component {
  render() {
    return (
      <View>
        <SectionList 
          sections={[
            {title: 'Starts with D', data: ['Devin']},
            {title: 'Starts with J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({ item }) => <Text>{item}</Text>}
          renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

class FetchExample extends Component {
  state = {
    data: []
  }

  async componentDidMount() {
    const response = await fetch('https://whcb-react-native-api.glitch.me/fetch')
    const responseJson = await response.json()
    await this.setState({ data: responseJson.data })
  }

  render() {
    const { data } = this.state

    if (data.length === 0) {
      return <ActivityIndicator />
    }

    return (
      <View>
          <FlatList
            data={data}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  flatListContainer: {
    flex: 1,
    paddingTop: 22
  },
  flatListItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
