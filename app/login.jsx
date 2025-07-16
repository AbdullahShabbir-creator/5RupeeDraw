import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Animated,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ImageBackground,
  StatusBar as RNStatusBar
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

// Floating particles component
const FloatingParticles = () => {
  const [particles] = useState(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      animatedValue: new Animated.Value(0),
      x: Math.random() * width,
      delay: Math.random() * 3000,
      duration: 4000 + Math.random() * 2000,
      size: 20 + Math.random() * 40,
    }))
  );

  useEffect(() => {
    particles.forEach((particle) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(particle.delay),
          Animated.timing(particle.animatedValue, {
            toValue: 1,
            duration: particle.duration,
            useNativeDriver: true,
          }),
          Animated.timing(particle.animatedValue, {
            toValue: 0,
            duration: particle.duration / 2,
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
              width: particle.size,
              height: particle.size,
              opacity: particle.animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.15, 0],
              }),
              transform: [
                {
                  translateY: particle.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, -100],
                  }),
                },
                {
                  scale: particle.animatedValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 1, 0.3],
                  }),
                },
                {
                  rotate: particle.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
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

// Enhanced animated input component
const AnimatedInput = ({ 
  label, 
  value, 
  onChangeText, 
  secureTextEntry, 
  keyboardType = 'default',
  autoCapitalize = 'none',
  rightIcon,
  onRightIconPress,
  placeholder
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [labelAnimation] = useState(new Animated.Value(value ? 1 : 0));
  const [borderAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(labelAnimation, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  useEffect(() => {
    Animated.timing(borderAnimation, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  return (
    <View style={styles.inputContainer}>
      <Animated.Text
        style={[
          styles.inputLabel,
          {
            opacity: labelAnimation,
            transform: [
              {
                translateY: labelAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -5],
                }),
              },
            ],
          },
        ]}
      >
        {label}
      </Animated.Text>
      <Animated.View
        style={[
          styles.inputWrapper,
          {
            borderColor: borderAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(108, 117, 125, 0.2)', '#007BFF'],
            }),
            borderWidth: borderAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 2],
            }),
            shadowOpacity: borderAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.1, 0.3],
            }),
          },
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor="#6C757D"
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.inputIconContainer}>
            <Ionicons name={rightIcon} size={20} color="#007BFF" />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

// Social login button component
const SocialButton = ({ icon, color, onPress, label }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    onPress && onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity style={styles.socialButton} onPress={handlePress}>
        <Ionicons name={icon} size={24} color={color} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function LoginScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Animations
  const [logoAnimation] = useState(new Animated.Value(0));
  const [headerAnimation] = useState(new Animated.Value(0));
  const [formAnimation] = useState(new Animated.Value(0));
  const [buttonAnimation] = useState(new Animated.Value(0));
  const [socialAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Staggered entrance animations
    Animated.sequence([
      Animated.timing(logoAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(headerAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(formAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(socialAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      
      {/* Dynamic Background */}
      <LinearGradient
        colors={['#007BFF', '#0056D6', '#002B5B']}
        style={styles.backgroundGradient}
      >
        {/* Animated Background Pattern */}
        <ImageBackground
          source={{ uri: 'https://api.a0.dev/assets/image?text=Geometric%20Pattern&aspect=1:1&seed=bg' }}
          style={styles.backgroundPattern}
          imageStyle={{ opacity: 0.1 }}
        />
        
        <FloatingParticles />
        
        {/* Geometric Shapes */}
        <View style={styles.topCircle} />
        <View style={styles.bottomCircle} />
        <View style={styles.leftCircle} />
        <View style={styles.rightCircle} />
      </LinearGradient>
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header Section */}
        <Animated.View
          style={[
            styles.headerSection,
            {
              opacity: headerAnimation,
              transform: [
                {
                  translateY: headerAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {/* Logo/Brand */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoAnimation,
                transform: [
                  {
                    scale: logoAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.logoBackground}>
              <Ionicons name="flash" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.brandName}>Lucky Draw</Text>
          </Animated.View>
          
          {/* Welcome Text */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.welcomeSubtext}>
              Sign in to continue your winning streak
            </Text>
          </View>
        </Animated.View>
        
        {/* Form Section */}
        <Animated.View
          style={[
            styles.formSection,
            {
              opacity: formAnimation,
              transform: [
                {
                  translateY: formAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <BlurView intensity={20} style={styles.formBlur}>
            <View style={styles.formContent}>
              <Text style={styles.formTitle}>Sign In</Text>
              
              {/* Input Fields */}
              <AnimatedInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
                rightIcon={email ? "checkmark-circle" : null}
              />
              
              <AnimatedInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
                rightIcon={showPassword ? "eye-off" : "eye"}
                onRightIconPress={() => setShowPassword(!showPassword)}
              />
              
              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              
              {/* Sign In Button */}
              <Animated.View
                style={[
                  styles.signInButtonContainer,
                  {
                    opacity: buttonAnimation,
                    transform: [{ scale: buttonAnimation }],
                  },
                ]}
              >
                <TouchableOpacity 
                  style={styles.signInButton} 
                  onPress={handleSignIn}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={['#00A650', '#00D665']}
                    style={styles.signInGradient}
                  >
                    {isLoading ? (
                      <Animated.View style={styles.loadingContainer}>
                        <Text style={styles.signInText}>Signing In...</Text>
                      </Animated.View>
                    ) : (
                      <>
                        <Text style={styles.signInText}>SIGN IN</Text>
                        <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
              
              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>
              
              {/* Social Login */}
              <Animated.View
                style={[
                  styles.socialContainer,
                  {
                    opacity: socialAnimation,
                    transform: [
                      {
                        translateY: socialAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [30, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <SocialButton 
                  icon="logo-google" 
                  color="#FF4C4C" 
                  label="Google"
                />
                <SocialButton 
                  icon="logo-facebook" 
                  color="#4267B2" 
                  label="Facebook"
                />
                <SocialButton 
                  icon="logo-apple" 
                  color="#1C1C1C" 
                  label="Apple"
                />
              </Animated.View>
              
              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
  },
  topCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  leftCircle: {
    position: 'absolute',
    top: '40%',
    left: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0,166,80,0.1)',
  },
  rightCircle: {
    position: 'absolute',
    top: '60%',
    right: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,166,80,0.15)',
  },
  safeArea: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  formSection: {
    flex: 1,
  },
  formBlur: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  formContent: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.98)',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1C',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(108, 117, 125, 0.2)',
    ...Platform.select({
      ios: {
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#1C1C1C',
  },
  inputIconContainer: {
    padding: 4,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: '600',
  },
  signInButtonContainer: {
    marginBottom: 30,
  },
  signInButton: {
    borderRadius: 25,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#00A650',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  signInGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9ECEF',
  },
  dividerText: {
    color: '#6C757D',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  signUpText: {
    color: '#6C757D',
    fontSize: 16,
  },
  signUpLink: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});