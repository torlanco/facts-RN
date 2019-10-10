import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';

// Interfaces
import { IAdvertisement } from '@interfaces/advertisement';

// Component
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

// Props Action
import { connect } from "react-redux";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { mapDispatchToProps } from '@actions/advertisement';
import { HeaderBar } from '@components';
import Autocomplete from 'react-native-autocomplete-input';
import { Text, Divider } from 'react-native-elements';
import { colors, typos } from '@styles';
import { TextInput } from 'react-native-gesture-handler';
import { CONSTANTS } from '@utils';

interface IOwnProps {
  navigation: NavigationScreenProp<NavigationState>;
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IAdvertisement.StateToProps &
  IAdvertisement.DispatchFromProps;;

// state
interface IState {
  data: string[],
  query: string,
  hideResults: boolean
}

const mapStateToProps = function(state: any) {
  return {
    brands: state.advertisement.brands,
    loading: state.outlet.loading ||
      state.shopper.loading ||
      state.advertisement.loading
  }
};

class AutoSuggestScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      query: '',
      hideResults: false
    }
  }

  onChangeText = async (value: any) => {
    this.setState({ 
      query: value,
      hideResults: value.length < 3 
    });
    if (value.length >= 3) {
      await this.props.fetchBrands(value);
      this.setState({
        hideResults: false,
        data: this.props.brands ? this.props.brands.map((brand: any) => `${brand.brand} (${brand.total})`) : []
      });   
    }
  }

  onItemSelect = (value: string) => {
    this.setState({
      query: '',
      hideResults: true
    }, () => {
      this.props.navigation.navigate('FeaturesScreen', {
        brand: value.split(CONSTANTS.PICKER_STRING_SEPARATOR)[0].trim()
      });
    });
  }

  public render() {
    return (
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <HeaderBar title={'Select Brand'}/>
          <View style={styles.mainContainer}>
            <Autocomplete
              data={this.state.data}
              // defaultValue={this.state.query}
              // onChangeText={this.onChangeText}
              renderTextInput={() => (
                <TextInput style={[styles.textInput]} value={this.state.query} onChangeText={this.onChangeText}/>
              )}
              renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => this.onItemSelect(item)}>
                  <Text style={styles.listItem}>{item.trim()}</Text>
                  { index + 1 != this.state.data.length ? <Divider style={styles.divider} /> : null }
                </TouchableOpacity>
              )}
              keyExtractor={(_, index) => (_ + index)}
              inputContainerStyle={styles.inputContainerStyle}
              listContainerStyle={styles.listContainerStyle}
              listStyle={styles.listStyle}
              hideResults={this.state.hideResults}
              flatListProps={{
                showsVerticalScrollIndicator: false
              }}/>
          </View>    
        </View>
        {(this.props.loading) && <LoadingScreen />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
   flex: {
    flex: 1
   },
   container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    padding: 20
  },
  inputContainerStyle: {
    borderRadius: 4,
    borderColor: colors.DARK_GRAY,
  },
  listContainerStyle: {
    paddingBottom: 40
  },
  listStyle: {
    margin: 0,
    borderColor: colors.LIGHT_GRAY,
  },
  listItem: {
    padding: 10,
  },
  divider: {
    backgroundColor: colors.LIGHT_GRAY,
    height: 1,
  },
  textInput: {
    ...typos.PRIMARY,
    borderRadius: 2,
    borderColor: colors.LIGHT_GRAY,
    height: 30,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 5
  }
});

const AutoSuggestScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(AutoSuggestScreen);
export { AutoSuggestScreenWrapper as AutoSuggestScreen }