import React from 'react';
import { Button,  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Location, Permissions } from 'expo';

export default class App extends React.Component {

  componentWillMount() {
    this.setState({ country: '' })
  }

  _resolve2 = async () => {
    this.setState({ country: 'resolving' })
    let country = await this._coordToCountry(3.15163, 101.653972 )
    this.setState({ country: country })
  }

  _resolve1 = async () => {
    this.setState({ country: 'resolving' })
    let country = await this._coordToCountry(12.925645, 77.687548)
    this.setState({ country: country })
  }

  _coordToCountry = async (lat, long) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      let locationDetail = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: long
      });

      if (locationDetail.length > 0) {
        console.log(locationDetail)
        return locationDetail[0]['country'];
      } else {
        console.log('no where')
        return 'no where'
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this._resolve1} title="12.925645, 77.687548 India" color='#007AFF'/>
        <Button onPress={this._resolve2} title="3.15163 101.653972 Malaysia" color='#007AFF'/>
        <Text> Resolved to: {this.state.country} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
