import * as React from 'react';

// UI
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';

// Interfaces
import { IAdvertisement } from '@interfaces/advertisement';

// Component
import { NavigationInjectedProps, NavigationScreenProp, NavigationState, withNavigation } from "react-navigation";

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';
import Autocomplete from 'react-native-autocomplete-input';
import { Text, Icon } from 'react-native-elements';
import { colors, typos } from '@styles';
import { CONSTANTS, capitalize } from '@utils';

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
  data:   [],
  query: string,
  hideResults: boolean,
  timeoutInProgress: boolean,
  textChange: boolean,
}

const mapStateToProps = function(state: any) {
  return {
    brands: state.advertisement.brands,
  }
};

class AutoSuggestComponent extends React.Component<IProps, IState> {
  _fetchBrandsHandler: any;
  _callOnBlur: any = true;
  _lastQuery: any = '';

  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      query: '',
      timeoutInProgress: false,
      hideResults: false,
      textChange: true,
    }
  }

  onChangeText = async (value: any) => {
    this.setState({
      textChange: true,
      query: value,
      hideResults: value.length < 2,
    });
    this._callOnBlur = true;
    if (value.length >= 2) {
      if (this._fetchBrandsHandler) {
        clearTimeout(this._fetchBrandsHandler);
      }
      this._fetchBrandsHandler = setTimeout(() => {
        this.fetchBrands();
      }, 300);
    }
  }

  fetchBrands = async () => {
    this._fetchBrandsHandler = null;
    this.setState({
      data: this.props.brands && this.props.brands.length > 0 ? this.props.brands : [{brand: CONSTANTS.SEARCHING}]
    });
    await this.props.fetchBrands(this.state.query);
    this.setState({
      textChange: false,
      hideResults: false,
      data: this.props.brands && this.props.brands.length > 0 ? this.props.brands : [{brand: CONSTANTS.NO_RESULT_FOUND}]
    });
  }

  onItemSelect = (value: string) => {
    this._callOnBlur = false;
    this.setState({
      query: value !== CONSTANTS.NO_RESULT_FOUND && value !== CONSTANTS.SEARCHING ? value.trim() : this._lastQuery,
      hideResults: true,
      textChange: value === CONSTANTS.NO_RESULT_FOUND || value === CONSTANTS.SEARCHING
    }, () => {
      if (this.props.onBrandSelect && this.state.query && this.state.query !== this._lastQuery) {
        this._lastQuery = this.state.query;
        this.props.onBrandSelect(this.state.query);
      }
    });
  }

  getListItem = (item: any) => {
     if (item.brand === CONSTANTS.NO_RESULT_FOUND) {
       return <Text style={[styles.listItem, {textAlign: 'center'}]}>{item.brand}</Text>
     } else if (item.brand === CONSTANTS.SEARCHING) {
       return <Text style={[styles.listItem, {textAlign: 'center', ...typos.PRIMARY_MEDIUM}]}>{item.brand}</Text>
     } else {
       let index = item.brand.toLowerCase().indexOf(this.state.query.toLowerCase());
       item.brand =  capitalize(item.brand);
       return <Text style={styles.listItem}>
          {item.brand.substring(0, index)}
          <Text style={{...typos.PRIMARY}}>{item.brand.substring(index, index + this.state.query.length)}</Text>
          {item.brand.substring(index + this.state.query.length)} (<Text style={{...typos.PRIMARY}}>{item.total}</Text>)</Text>
     }
  }

  onBlur = () => {
      if (this._callOnBlur) {
        this.setState({
          query: this._lastQuery || '',
          hideResults: true,
          textChange: true
        });
      }
  }

  public render() {
    const textInputColor: any = {};
    if (!(this.props.brands && this.props.brands.length > 0) && !this.state.textChange) {
      textInputColor.color = colors.ERROR;
    } else {
      textInputColor.color = colors.TEXT_PRIMARY;
    }

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
                color={this.props.disabled ? colors.BLACK :
                  ((!this.props.brands || !this.props.brands.length) && !this.state.textChange && this.state.query ? colors.ERROR :
                    (this.state.query ? colors.PRIMARY : colors.BLACK))}
                containerStyle={styles.searchIconContainer} />
              { this.props.disabled ? <Text style={[styles.text]}>search specials by brand</Text>
                : <TextInput autoFocus={true} style={[styles.textInput, textInputColor]} value={this.state.query} onBlur={this.onBlur}
                onChangeText={this.onChangeText} editable={!this.props.disabled} placeholder='search specials by brand'/> }
            </View>
          )}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => this.onItemSelect(item.brand)}>
              { this.getListItem(item) }
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
    elevation: 5,
    zIndex: 5,
    shadowOpacity: 0.4,
    shadowOffset: {
        width: 3,
        height: 10
    },
    shadowColor: colors.MID_GRAY,
    shadowRadius: 10,
  },
  listStyle: {
    margin: 0,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: colors.WHITE,
    borderWidth: 0,
    borderRadius: 10,
  },
  listItem: {
    ...typos.PRIMARY_LIGHT,
    fontWeight: 'normal',
    padding: 10,
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
  text: {
    ...typos.PRIMARY_MEDIUM,
    color: colors.TEXT_SECONDARY,
    borderRadius: 5,
    height: 30,
    paddingVertical: 7,
    paddingHorizontal: 5,
    paddingLeft: 30,
    opacity: 0.6
  },
  searchIconContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  }
});

const AutoSuggestComponentWrapper = withNavigation(connect(mapStateToProps, mapDispatchToProps)(AutoSuggestComponent));
export { AutoSuggestComponentWrapper as AutoSuggestComponent }
