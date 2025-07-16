import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Image,
  Alert,
  Animated,
  Dimensions,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

export default function SignupScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Animation values
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [formAnimations] = useState(
    Array.from({ length: 7 }, () => new Animated.Value(0))
  );

  useEffect(() => {
    // Header animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Form fields animation
    formAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
const onPassword=()=>{
  console.log('hy')
}
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      'Select Photo',
      'Choose how you want to add your photo',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const validateForm = () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return false;
    }
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter your city');
      return false;
    }
    if (!password || password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') }
      ]);
    }, 2000);
  };

  const FormField = ({ children, index }) => (
    <Animated.View
      style={[
        styles.inputContainer,
        {
          opacity: formAnimations[index],
          transform: [
            {
              translateY: formAnimations[index].interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header Section */}
      <LinearGradient
        colors={['#007BFF', '#0056D6', '#002B5B']}
        style={styles.headerSection}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Animated.View 
          style={[
            styles.headerContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.headerTitle}>Create Your</Text>
          <Text style={styles.headerSubtitle}>Account</Text>
          <View style={styles.headerDivider} />
          <Text style={styles.headerDescription}>
            Join millions of lucky winners today
          </Text>
        </Animated.View>
      </LinearGradient>

      {/* Form Section */}
      <KeyboardAvoidingView
        style={styles.formSection}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          style={styles.formContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          {/* Profile Photo */}
          <FormField index={0}>
            <Text style={styles.inputLabel}>Profile Photo</Text>
            <TouchableOpacity style={styles.photoContainer} onPress={showImagePicker}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="camera" size={30} color="#007BFF" />
                  <Text style={styles.photoText}>Add Photo</Text>
                </View>
              )}
              <View style={styles.photoOverlay}>
                <Ionicons name="add-circle" size={24} color="#007BFF" />
              </View>
            </TouchableOpacity>
          </FormField>

          {/* Full Name */}
          <FormField index={1}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#6C757D" style={styles.inputPrefixIcon} />
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                placeholderTextColor="#6C757D"
              />
              {fullName.length > 0 && (
                <Ionicons name="checkmark-circle" size={20} color="#00A650" style={styles.inputSuffixIcon} />
              )}
            </View>
          </FormField>

          {/* Email */}
          <FormField index={2}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#6C757D" style={styles.inputPrefixIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#6C757D"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {email.includes('@') && (
                <Ionicons name="checkmark-circle" size={20} color="#00A650" style={styles.inputSuffixIcon} />
              )}
            </View>
          </FormField>

          {/* Phone Number */}
          <FormField index={3}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color="#6C757D" style={styles.inputPrefixIcon} />
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter your phone number"
                placeholderTextColor="#6C757D"
                keyboardType="phone-pad"
              />
              {phoneNumber.length >= 10 && (
                <Ionicons name="checkmark-circle" size={20} color="#00A650" style={styles.inputSuffixIcon} />
              )}
            </View>
          </FormField>

          {/* City */}
          <FormField index={4}>
            <Text style={styles.inputLabel}>City</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="location-outline" size={20} color="#6C757D" style={styles.inputPrefixIcon} />
              <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
                placeholder="Enter your city"
                placeholderTextColor="#6C757D"
              />
              {city.length > 0 && (
                <Ionicons name="checkmark-circle" size={20} color="#00A650" style={styles.inputSuffixIcon} />
              )}
            </View>
          </FormField>

          {/* Password */}
          <FormField index={5}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#6C757D" style={styles.inputPrefixIcon} />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={()=>setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#6C757D"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#6C757D"
                  style={styles.inputSuffixIcon}
                />
              </TouchableOpacity>
            </View>
          </FormField>

          {/* Confirm Password */}
          <FormField index={6}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#6C757D" style={styles.inputPrefixIcon} />
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                placeholderTextColor="#6C757D"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#6C757D"
                  style={styles.inputSuffixIcon}
                />
              </TouchableOpacity>
            </View>
          </FormField>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[styles.signUpButton, isLoading && styles.buttonLoading]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <LinearGradient
              colors={['#00A650', '#00D665']}
              style={styles.signUpButtonGradient}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Animated.View style={styles.loadingSpinner}>
                    <Ionicons name="refresh" size={20} color="#FFFFFF" />
                  </Animated.View>
                  <Text style={styles.signUpText}>Creating Account...</Text>
                </View>
              ) : (
                <>
                  <Ionicons name="person-add" size={20} color="#FFFFFF" />
                  <Text style={styles.signUpText}>Create Account</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By creating an account, you agree to our
            </Text>
            <View style={styles.termsLinks}>
              <TouchableOpacity>
                <Text style={styles.termsLink}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={styles.termsText}> and </Text>
              <TouchableOpacity>
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerSection: {
    height: height * 0.3,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerDivider: {
    width: 50,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginVertical: 10,
  },
  headerDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  formSection: {
    flex: 1,
    marginTop: -30,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 8,
  },
  photoContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#007BFF',
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#007BFF',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    color: '#007BFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1C',
  },
  inputSuffixIcon: {
    marginLeft: 12,
  },
  signUpButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#00A650',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonLoading: {
    opacity: 0.7,
  },
  signUpButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingSpinner: {
    marginRight: 8,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  signInText: {
    color: '#6C757D',
    fontSize: 14,
  },
  signInLink: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  termsContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  termsText: {
    color: '#6C757D',
    fontSize: 12,
    textAlign: 'center',
  },
  termsLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 5,
  },
  termsLink: {
    color: '#007BFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 40,
  },
});