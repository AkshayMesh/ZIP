import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';

import SvgComponent1 from '../Atoms/svg/DriverOnboard';
import SvgComponent2 from '../Atoms/svg/DriverOnboard2';
import SvgComponent3 from '../Atoms/svg/DriverOnboard3';
import { MyTheme } from '../ui/theme/color/Colors';

const { width, height } = Dimensions.get('window');
const slides = [
  {
    key: 1,
    title: '',
    text: 'Enjoy your ride like nothing before.',
    image: <SvgComponent3></SvgComponent3>,
  },
  {
    key: 2,
    title: 'Go Places',
    text: 'Get your ride at right place at right time.',
    image: <SvgComponent2></SvgComponent2>,
  },
  {
    key: 3,
    title: 'Verified Drivers',
    text: 'Get the safe and fast ride for your occasional or daily ride.',
    image: <SvgComponent1></SvgComponent1>,
  }
];

export default function Slider() {
  const [currentPage, setCurrentPage] = useState(0);
  
  const setSliderPage = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.round(contentOffsetX / width); // Calculate current page
    setCurrentPage(newPage); // Update state with current page
  };

  const isDarkMode = useColorScheme() === 'dark';
  return <View>
    <ScrollView
      style={{ flex: 1 }}
      horizontal={true}
      scrollEventThrottle={16}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      onScroll={(event) => {
        setSliderPage(event);
      }}>
      <View style={[styles.slide]}>
        <Text style={styles.title}>Welcome To <Text style={{color: MyTheme.primary}}>ZiP</Text></Text>
        <View style={styles.safeArea}>
          <View style={styles.card}>
            {slides[0].image}
          </View>
        </View>
        <Text style={styles.text}>{slides[0].text}</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>{slides[1].title}</Text>
        <View style={styles.safeArea}>
          <View style={styles.card}>
            {slides[1].image}
          </View>
        </View>
        <Text style={styles.text}>{slides[1].text}</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>{slides[2].title}</Text>
        <View style={styles.safeArea}>
          <View style={styles.card}>
            {slides[2].image}
          </View>
        </View>
        <Text style={styles.text}>{slides[2].text}</Text>
      </View>
    </ScrollView>
    <View style={styles.paginationWrapper}>
      {Array.from(slides).map((key, index) => (
        <View style={[styles.activeDotStyle, { backgroundColor: currentPage === index ? "#fa4661" : "#ededed", borderRadius: 12 }]} key={index} />
      ))}
    </View>
  </View>
}

const styles = StyleSheet.create({

  paginationWrapper: {
    position: 'absolute',
    top: '65%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  activeDotStyle: {
    backgroundColor: '#FF6347',
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  slide: {
    flex: 1,
    width: width,
    height: '70%',
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  title: {
    top: 50,
    textAlign: 'center',
    zIndex: 999,
    fontWeight: 'bold',
    fontSize: 30
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 40,
    fontSize: 14,
    fontWeight: 'bold',
    top: '75%'
  },
  safeArea: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    height: "100%",
  },
});