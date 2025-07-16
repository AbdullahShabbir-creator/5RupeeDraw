import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Image, 
  Animated,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Define the color palette
const Colors = {
  primary: '#007BFF', // Sky Blue
  secondary: '#002B5B', // Deep Navy
  accent: '#00A650', // Emerald Green
  background: '#FFFFFF', // White
  surface: '#F8F9FA', // Light Gray
  textMain: '#1C1C1C', // Dark Blue
  textMuted: '#6C757D', // Grayish Blue
  danger: '#FF4C4C', // Soft Red
};

const AnimatedCard = ({ children, delay = 0 }) => {
  const [slideAnim] = useState(new Animated.Value(50));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};

const PulsingDot = ({ delay = 0 }) => {
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    setTimeout(pulse, delay);
  }, []);

  return (
    <Animated.View
      style={[
        styles.pulsingDot,
        {
          transform: [{ scale: pulseAnim }],
        },
      ]}
    />
  );
};

export default function PurchaseScreen() {
  const router = useRouter();
  const { name, price } = useLocalSearchParams();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  // Ensure price is a number for calculations
  const parsedPrice = parseFloat(price || '1');

  const prize = {
    name: name || 'Unknown Prize',
    price: parsedPrice,
  };

  const userData = {
    name: 'User Name',
    phoneNumber: '03486174459',
  };

  // Simple fee calculation (can be dynamic)
  const feeAndTax = 0; // Keeping it free as per your original code
  const totalAmount = prize.price + feeAndTax;

  const handleBuyNow = () => {
    setButtonPressed(true);
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate processing delay
    setTimeout(() => {
      console.log('Processing purchase for:', prize.name, 'Price:', totalAmount);
      // In a real app, you'd integrate with a payment gateway here
      router.replace('/'); // or navigate to a success screen with purchase details
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Enhanced Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirm Purchase</Text>
          <View style={styles.headerRight}>
            <PulsingDot />
            <PulsingDot delay={300} />
            <PulsingDot delay={600} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Prize Showcase Section */}
          <AnimatedCard delay={0}>
            <LinearGradient
              colors={['#FFFFFF', '#F8F9FA']}
              style={styles.prizeShowcase}
            >
              <View style={styles.prizeImageContainer}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: 'https://api.a0.dev/assets/image?text=Lucky%20Prize&aspect=1:1&seed=purchase' }}
                    style={styles.prizeImage}
                  />
                  <View style={styles.imageOverlay}>
                    <Ionicons name="star" size={24} color="#FFD700" />
                  </View>
                </View>
                <Text style={styles.prizeName}>{prize.name}</Text>
                <View style={styles.prizeValueBadge}>
                  <Ionicons name="diamond" size={16} color="#FFFFFF" />
                  <Text style={styles.prizeValueText}>Worth Rs. {prize.price.toLocaleString()}</Text>
                </View>
              </View>
            </LinearGradient>
          </AnimatedCard>

          {/* Purchase Details Card */}
          <AnimatedCard delay={200}>
            <View style={styles.purchaseDetailsCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="receipt" size={24} color={Colors.primary} />
                <Text style={styles.cardTitle}>Order Summary</Text>
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <View style={styles.detailLeft}>
                    <Ionicons name="gift" size={20} color={Colors.textMuted} />
                    <Text style={styles.detailLabel}>Prize Entry</Text>
                  </View>
                  <Text style={styles.detailValue}>Rs. {prize.price.toFixed(2)}</Text>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailLeft}>
                    <Ionicons name="person" size={20} color={Colors.textMuted} />
                    <Text style={styles.detailLabel}>Participant</Text>
                  </View>
                  <Text style={styles.detailValue}>{userData.name}</Text>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailLeft}>
                    <Ionicons name="call" size={20} color={Colors.textMuted} />
                    <Text style={styles.detailLabel}>Contact</Text>
                  </View>
                  <Text style={styles.detailValue}>{userData.phoneNumber}</Text>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailLeft}>
                    <Ionicons name="card" size={20} color={Colors.textMuted} />
                    <Text style={styles.detailLabel}>Processing Fee</Text>
                  </View>
                  <View style={styles.freeBadge}>
                    <Text style={styles.freeText}>FREE</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                  <View style={styles.totalLeft}>
                    <Ionicons name="cash" size={24} color={Colors.accent} />
                    <Text style={styles.totalLabel}>Total Amount</Text>
                  </View>
                  <Text style={styles.totalValue}>Rs. {totalAmount.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </AnimatedCard>

          {/* Trust Indicators */}
          <AnimatedCard delay={400}>
            <View style={styles.trustIndicators}>
              <View style={styles.trustItem}>
                <Ionicons name="shield-checkmark" size={24} color={Colors.accent} />
                <Text style={styles.trustText}>100% Safe</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="flash" size={24} color={Colors.primary} />
                <Text style={styles.trustText}>Instant Entry</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="trophy" size={24} color="#FFD700" />
                <Text style={styles.trustText}>Fair Draw</Text>
              </View>
            </View>
          </AnimatedCard>

          {/* Buy Now Button */}
          <AnimatedCard delay={600}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                style={[styles.buyButton, buttonPressed && styles.buyButtonPressed]}
                onPress={handleBuyNow}
                disabled={buttonPressed}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={buttonPressed ? ['#666', '#888'] : [Colors.accent, '#00D665']}
                  style={styles.buyButtonGradient}
                >
                  {buttonPressed ? (
                    <>
                      <Animated.View style={styles.loadingSpinner}>
                        <Ionicons name="hourglass" size={20} color="#FFFFFF" />
                      </Animated.View>
                      <Text style={styles.buyButtonText}>Processing...</Text>
                    </>
                  ) : (
                    <>
                      <Ionicons name="flash" size={20} color="#FFFFFF" />
                      <Text style={styles.buyButtonText}>Join Lucky Draw</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </AnimatedCard>

          {/* Announcement Section */}
          <AnimatedCard delay={800}>
            <View style={styles.announcementCard}>
              <LinearGradient
                colors={['#FFF8E1', '#FFF3C4']}
                style={styles.announcementGradient}
              >
                <View style={styles.announcementHeader}>
                  <Ionicons name="megaphone" size={24} color="#FF9800" />
                  <Text style={styles.announcementTitle}>Draw Announcement</Text>
                </View>
                <Text style={styles.announcementText}>
                  Lucky Draw winners will be announced live on our app and Facebook page on{' '}
                  <Text style={styles.announcementDate}>July 17, 2025</Text>
                </Text>
                <View style={styles.socialButtons}>
                  <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="logo-facebook" size={16} color="#4267B2" />
                    <Text style={styles.socialButtonText}>Follow</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="notifications" size={16} color={Colors.primary} />
                    <Text style={styles.socialButtonText}>Notify Me</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </AnimatedCard>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerGradient: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00A650',
    marginHorizontal: 2,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  prizeShowcase: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  prizeImageContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  prizeImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surface,
    borderWidth: 4,
    borderColor: Colors.primary,
  },
  imageOverlay: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFD700',
    borderRadius: 15,
    padding: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  prizeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textMain,
    textAlign: 'center',
    marginBottom: 10,
  },
  prizeValueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  prizeValueText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  purchaseDetailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textMain,
    marginLeft: 10,
  },
  detailsContainer: {
    gap: 0,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.textMuted,
    marginLeft: 10,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textMain,
  },
  freeBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  freeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    height: 2,
    backgroundColor: '#F0F0F0',
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  totalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textMain,
    marginLeft: 10,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  trustIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  trustItem: {
    alignItems: 'center',
  },
  trustText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    marginTop: 8,
  },
  buyButton: {
    borderRadius: 30,
    marginBottom: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.accent,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  buyButtonPressed: {
    opacity: 0.8,
  },
  buyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loadingSpinner: {
    marginRight: 8,
  },
  announcementCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  announcementGradient: {
    padding: 20,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
    marginLeft: 10,
  },
  announcementText: {
    fontSize: 14,
    color: '#BF360C',
    lineHeight: 20,
    marginBottom: 15,
  },
  announcementDate: {
    fontWeight: 'bold',
    color: '#D84315',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMain,
    marginLeft: 6,
  },
  bottomSpacing: {
    height: 40,
  },
});