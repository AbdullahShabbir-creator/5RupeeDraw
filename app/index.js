import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Animated, 
  Dimensions,
  Platform,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const FloatingCoin = ({ delay, x, y, size = 30 }) => {
  const [animatedValue] = useState(new Animated.Value(0));
  const [rotateValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(rotateValue, {
              toValue: 1,
              duration: 3000,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };
    animate();
  }, []);

  return (
    <Animated.View
      style={[
        styles.floatingCoin,
        {
          left: x,
          top: y,
          width: size,
          height: size,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -20],
              }),
            },
            {
              rotate: rotateValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
          opacity: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0.7],
          }),
        },
      ]}
    >
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        style={styles.coinGradient}
      >
        <Text style={styles.coinText}>Rs</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const ParticleEffect = () => {
  const [particles] = useState(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      animatedValue: new Animated.Value(0),
      x: Math.random() * width,
      y: Math.random() * height,
      delay: Math.random() * 3000,
      size: Math.random() * 4 + 2,
    }))
  );

  useEffect(() => {
    particles.forEach((particle) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(particle.delay),
          Animated.timing(particle.animatedValue, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(particle.animatedValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={styles.particlesContainer}>
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 1, 0],
              }),
              transform: [
                {
                  scale: particle.animatedValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 1, 0.5],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

export default function SplashScreen() {
  const navigation = useNavigation();
  const [titleOpacity] = useState(new Animated.Value(0));
  const [contentOpacity] = useState(new Animated.Value(0));
  const [buttonScale] = useState(new Animated.Value(0));
  const [phoneAnimation] = useState(new Animated.Value(0));
  const [qrAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(phoneAnimation, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(qrAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(200),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.spring(buttonScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]);

    sequence.start();
  }, []);

  const handleGetStarted = () => {
    Animated.timing(buttonScale, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
      navigation.navigate('signup');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#007BFF', '#0056D6', '#002B5B']}
        style={styles.backgroundGradient}
      >
        <ParticleEffect />
        
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: titleOpacity }]}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>
             Lucky Draw
              <View style={styles.purpleDot} />
            </Text>
            <View style={styles.headerIcon}>
              <Ionicons name="wallet" size={24} color="#FFFFFF" />
            </View>
          </View>
        </Animated.View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Illustration Container */}
          <View style={styles.illustrationContainer}>
            {/* QR Code */}
            <Animated.View
              style={[
                styles.qrCode,
                {
                  transform: [
                    {
                      scale: qrAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                    {
                      rotate: qrAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '5deg'],
                      }),
                    },
                  ],
                  opacity: qrAnimation,
                },
              ]}
            >
              <LinearGradient
                colors={['#00A650', '#00D665']}
                style={styles.qrGradient}
              >
                <View style={styles.qrPattern}>
                  <View style={styles.qrSquare} />
                  <View style={styles.qrSquare} />
                  <View style={styles.qrSquare} />
                  <View style={styles.qrSquare} />
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Phone Container */}
            <Animated.View
              style={[
                styles.phoneContainer,
                {
                  transform: [
                    {
                      translateY: phoneAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                    {
                      scale: phoneAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                  opacity: phoneAnimation,
                },
              ]}
            >
              <View style={styles.phoneFrame}>
                <LinearGradient
                  colors={['#1C1C1C', '#2C2C2C']}
                  style={styles.phoneGradient}
                >
                  <View style={styles.phoneScreen}>
                    <View style={styles.phoneContent}>
                      <View style={styles.balanceCard}>
                        <Text style={styles.balanceText}>Rs45,280</Text>
                        <Text style={styles.balanceLabel}>Available Balance</Text>
                      </View>
                      <View style={styles.quickActions}>
                        <View style={styles.actionItem}>
                          <Ionicons name="send" size={16} color="#007BFF" />
                        </View>
                        <View style={styles.actionItem}>
                          <Ionicons name="card" size={16} color="#00A650" />
                        </View>
                        <View style={styles.actionItem}>
                          <Ionicons name="receipt" size={16} color="#FF4C4C" />
                        </View>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </Animated.View>

            {/* Floating Coins */}
            <FloatingCoin delay={1000} x={width * 0.75} y={80} size={35} />
            <FloatingCoin delay={1300} x={width * 0.8} y={120} size={28} />
            <FloatingCoin delay={1600} x={width * 0.7} y={160} size={32} />
            <FloatingCoin delay={1900} x={width * 0.85} y={200} size={25} />
            <FloatingCoin delay={2200} x={width * 0.72} y={240} size={30} />
          </View>

          {/* Text Content */}
          <Animated.View style={[styles.textContainer, { opacity: contentOpacity }]}>
            <Text style={styles.title}>The Easy Way To{'\n'}Manage Your Money!</Text>
            <Text style={styles.subtitle}>
              Just Join Lucky Draws And Win Amazing Prizes
            </Text>
          </Animated.View>

          {/* Pagination */}
          <Animated.View style={[styles.paginationContainer, { opacity: contentOpacity }]}>
            <View style={[styles.paginationDot, styles.activeDot]} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
          </Animated.View>

          {/* Get Started Button */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                transform: [{ scale: buttonScale }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={handleGetStarted}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#00A650', '#00D665']}
                style={styles.buttonGradient}
              >
                <Text style={styles.getStartedText}>Get Started</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Bottom Wave */}
        <View style={styles.bottomWave}>
          <View style={styles.wave} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
 
    paddingTop: 30,
    paddingBottom: 10,
  },
   simpleInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#1C1C1C',
  },
  headerContent: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purpleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00A650',
    marginLeft: 8,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    width: '100%',
    height: 320,
    position: 'relative',
    marginBottom: 40,
  },
  qrCode: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 90,
    height: 90,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  qrGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrPattern: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 40,
    height: 40,
  },
  qrSquare: {
    width: 8,
    height: 8,
    backgroundColor: '#FFFFFF',
    margin: 2,
    borderRadius: 1,
  },
  phoneContainer: {
    position: 'absolute',
    top: 10,
    left: '50%',
    marginLeft: -80,
    width: 160,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneFrame: {
    width: 160,
    height: 300,
    borderRadius: 25,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  phoneGradient: {
    flex: 1,
    padding: 4,
  },
  phoneScreen: {
    flex: 1,
    borderRadius: 21,
    backgroundColor: '#F8F9FA',
    overflow: 'hidden',
  },
  phoneContent: {
    flex: 1,
    padding: 15,
  },
  balanceCard: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  balanceText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  floatingCoin: {
    position: 'absolute',
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  coinGradient: {
    flex: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#00A650',
    width: 24,
  },
  buttonContainer: {
    width: '100%',
      zIndex: 999,
    
    alignItems: 'center',
  },
  getStartedButton: {
    width: '85%',
    marginBottom:20,
    borderRadius: 30,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#00A650',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 30,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  wave: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});