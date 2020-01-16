import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';

// Interfaces
import { IAdvertisement } from '@interfaces/advertisement';

// Component
import { NavigationInjectedProps, NavigationScreenProp, NavigationState, withNavigation } from "react-navigation";

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';
import Autocomplete from 'react-native-autocomplete-input';
import { Text, Divider, Icon } from 'react-native-elements';
import { colors, typos } from '@styles';
import { TextInput } from 'react-native-gesture-handler';
import { CONSTANTS } from '@utils';

interface IOwnProps {
  navigation: NavigationScreenProp<NavigationState>;
  disabled?: boolean;
  onBrandSelect?: any;
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
  }
};

class AutoSuggestComponent extends React.Component<IProps, IState> {
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
      query: value.split(CONSTANTS.PICKER_STRING_SEPARATOR)[0].trim(),
      hideResults: true
    }, () => {
      if (this.props.onBrandSelect) {
        this.props.onBrandSelect(this.state.query);
      }
    });
  }

  public render() {
    return (
      <View style={styles.searchbar}>
        <Autocomplete
          data={this.state.data}
          renderTextInput={() => (
            <View style={styles.inputWrapper}>  
              <Icon
                name='search'
                type='feather'
                size={12}
                color={colors.BLACK}
                containerStyle={styles.searchIconContainer} />
              <TextInput style={[styles.textInput]} value={this.state.query} 
                  onChangeText={this.onChangeText} editable={!this.props.disabled} placeholder='search specials by brand'/>
            </View>
          )}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => this.onItemSelect(item)}>
              <Text style={styles.listItem}>{item.trim()}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => (_ + index)}
          inputContainerStyle={styles.inputContainerStyle}
          listContainerStyle={styles.listContainerStyle}
          listStyle={styles.listStyle}
          hideResults={this.state.hideResults}
          flatListProps={{
            showsVerticalScrollIndicator: false
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    borderRadius: 10,
  },
  inputWrapper: {
    borderRadius: 10,
    backgroundColor: colors.WHITE
  },
  inputContainerStyle: {
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.LIGHT_GRAY
  },
  listContainerStyle: {
    paddingHorizontal: 10
  },
  listStyle: {
    margin: 0,
    marginTop: 10,
    backgroundColor: colors.LIGHTER_GRAY,
    borderWidth: 0,
    borderRadius: 10,
    elevation: 3,
    zIndex: 3,
    shadowOpacity: 0.1,
    shadowOffset: {
        width: 0,
        height: 5
    },
    shadowColor: colors.LIGHT_BLUE,
    shadowRadius: 10,
  },
  listItem: {
    ...typos.PRIMARY,
    fontWeight: 'normal',
    padding: 10,
    textTransform: 'capitalize'
  },
  divider: {
    backgroundColor: colors.LIGHT_GRAY,
    height: 1,
  },
  textInput: {
    ...typos.PRIMARY_MEDIUM,
    borderRadius: 5,
    height: 30,
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingLeft: 30,
    textTransform: 'capitalize'
  },
  searchIconContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  }
});

const AutoSuggestComponentWrapper = withNavigation(connect(mapStateToProps, mapDispatchToProps)(AutoSuggestComponent));
export { AutoSuggestComponentWrapper as AutoSuggestComponent }