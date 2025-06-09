import 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
global.window = { 
  innerWidth: width, 
  innerHeight: height 
};