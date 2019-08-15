import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { typos, colors, responsive } from '@styles';

// Component
import { HeaderBar, SelectPicker } from '@components';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState, StackActions, NavigationActions } from "react-navigation";

// Props Action
import { connect } from "react-redux";
import { LoadingScreen } from '@screens';
import { mapDispatchToProps } from '@actions/advertisement';
import { Button } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import { CONSTANTS } from '@utils';
import { IAdvertisement } from '@interfaces/advertisement';
import { IReduxState } from '@interfaces/reduxState';

// props
interface ParamType {
  isExternalCall: boolean
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>;
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IAdvertisement.DispatchFromProps;

// state
interface IState {
  category: string,
  localStorageCategory: string,
  categories: string[],
  showPage: boolean,
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.advertisement.loading,
  }
};

class SelectCategoryScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);

    this.state = {
      showPage: false,
      category: '',
      localStorageCategory: '',
      categories: []
    };

    this.getCategoryFromAsyncStorage();
  }

  getCategoryFromAsyncStorage = async () => {
    let category = '';
    try {
      const value = await AsyncStorage.getItem(CONSTANTS.FACTS_RN_PENDING_REVIEW_CATEGORY);
      category = value ? value : '';  
    } catch (error) { 

    } finally {
      const { params } = this.props.navigation.state;
      if (category && !params) {
        this.redirectToDeckerScreen(category);
      } else {
        this.setState({
          showPage: true,
          category: category,
          localStorageCategory: category
        });
        this.fetchCategoriesForReview();
      }
    }
  };

  async fetchCategoriesForReview() {
    const categories: any = await this.props.fetchCategoriesForReview();
    this.setState({
      categories: this.formatCatgeoryList(categories)
    });
  }

  formatCatgeoryList(categories: string[]) {
    return categories.map((category: any) => {
      return `${category.category} (${category.count})`;
    });
  }

  onCategoryChange = (category: string) => {
    this.setState({
      category: category
    });
  };

  onCategorySave = async () => {
    try {
      let category = this.state.category.split(CONSTANTS.PICKER_STRING_SEPARATOR)[0];
      await AsyncStorage.setItem(CONSTANTS.FACTS_RN_PENDING_REVIEW_CATEGORY, category);
      this.redirectToDeckerScreen(category);
    } catch (error) {
      // Error saving data
    }
  };

  redirectToDeckerScreen(category: string) {
    const { params } = this.props.navigation.state;
    if (params && params.isExternalCall) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'AdvertisementDeckSwiperScreen', params: {
          category: category
        }})],
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      this.props.navigation.replace('AdvertisementDeckSwiperScreen', { category: category });
    }
  }

  public render() {
    let buttonStyle: any;
    if (!this.state.category || this.state.category.split(CONSTANTS.PICKER_STRING_SEPARATOR)[0] == this.state.localStorageCategory) {
      buttonStyle = [styles.button, styles.disable];
    } else {
      buttonStyle = [styles.button];
    }
    return (
        <SafeAreaView style={{flex: 1}}>
          { this.state.showPage ? 
            <View style={styles.container}>
                <HeaderBar title={'Select Category'}></HeaderBar>
                <View style={styles.mainContainer}>
                  { this.state.localStorageCategory ? 
                    <View>
                    <Text style={styles.label}>Selected Category</Text>
                    <Text style={styles.text}>{this.state.localStorageCategory}</Text>
                    </View> : null }
                  <Text style={[styles.label, {marginBottom: -10}]}>{ this.state.localStorageCategory ? 'Change a category' :'Select a category'}</Text>
                  <SelectPicker options={this.state.categories} value={this.state.category}
                      placeholder={''}
                      handleValueChange={this.onCategoryChange}>
                  </SelectPicker>

                  <Button title="Save"
                    onPress={ this.onCategorySave }
                    disabled={ !this.state.category || this.state.category.split(CONSTANTS.PICKER_STRING_SEPARATOR)[0] == this.state.localStorageCategory}
                    containerStyle={ styles.buttonContainer }
                    buttonStyle={ buttonStyle }
                    titleStyle={ styles.buttonTextStyle }/>
                </View>
            </View> : null }
          {(this.props.loading || !this.state.showPage)&& <LoadingScreen />}
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginLeft: 5,
    marginRight: 5,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 5, 
  },
  text: {
    ...typos.PRIMARY,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: colors.TEXT_PRIMARY,
  },
  label: {
    ...typos.PRIMARY,
    color: colors.TEXT_NOTE,
    paddingTop: 5,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  buttonContainer: {
    borderRadius: 5,
    height: responsive(44),
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 10,
    paddingHorizontal: 0,
    backgroundColor: colors.PRIMARY
  },
  button: {
    borderWidth: 2,
    borderRadius: 5,
    height: responsive(44),
    borderColor: colors.PRIMARY,
    backgroundColor: colors.PRIMARY
  },
  buttonTextStyle: {
    textTransform: 'uppercase',
    color: colors.TEXT_PRIMARY
  },
  disable: {
    borderColor: colors.DISABLED_GRAY,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategoryScreen);
