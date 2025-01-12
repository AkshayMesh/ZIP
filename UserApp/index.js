/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MapplsGL from 'mappls-map-react-native';

MapplsGL.setMapSDKKey("0a5dc20977a266d1c99ec4154b302ba0"); //place your mapsdkKey
MapplsGL.setRestAPIKey("0a5dc20977a266d1c99ec4154b302ba0"); //your restApiKey
MapplsGL.setAtlasClientId("96dHZVzsAut8E8cfYVrxXDY--nc9UYTyAM_-_bkf-dxVElbJM64p6u5ui4kEV0Z4nV6ap88QVstgweu5Fdb89Q=="); //your atlasClientId key
MapplsGL.setAtlasClientSecret("lrFxI-iSEg_vyPZuoAFHi8SxoQIrfGOBvogomnizI277f7t48H94Y5mNxu8DqErlLAX252A3ugh37f_mX5YQvRX7_k2hpVJ8"); //your atlasClientSecret key

AppRegistry.registerComponent(appName, () => App);
