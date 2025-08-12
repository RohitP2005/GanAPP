import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  const features = [
    {
      icon: <Feather name="zap" size={24} color="#fff" />,
      title: 'AI-Powered Generation',
      description: 'Generate high-quality MRI images using advanced AI models with medical-grade precision.',
    },
    {
      icon: <Feather name="download" size={24} color="#fff" />,
      title: 'Batch Processing',
      description: 'Generate up to 10 images simultaneously and download them as a convenient ZIP archive.',
    },
    {
      icon: <Feather name="eye" size={24} color="#fff" />,
      title: 'NII Visualization',
      description: 'Advanced 3D visualization of NIfTI neuroimaging files with interactive controls.',
    },
    {
      icon: <Ionicons name="shield-checkmark" size={24} color="#fff" />,
      title: 'Medical Grade',
      description: 'Built with medical imaging standards and protocols for research and educational use.',
    },
    {
      icon: <Feather name="cpu" size={24} color="#fff" />,
      title: 'High Performance',
      description: 'Optimized processing pipeline for fast generation and smooth visualization.',
    },
    {
      icon: <FontAwesome5 name="brain" size={24} color="#fff" />,
      title: 'Neuroimaging Focus',
      description: 'Specialized in brain imaging with support for various MRI sequences and contrasts.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.badge}>
          <FontAwesome5 name="brain" size={16} color="#6D28D9" />
          <Text style={styles.badgeText}>Professional MRI Generation Platform</Text>
        </View>
        <Text style={styles.heroTitle}>
          Advanced <Text style={styles.highlight}>MRI Image</Text>{'\n'}Generation Suite
        </Text>
        <Text style={styles.heroDescription}>
          Generate synthetic MRI images with AI precision, process batches efficiently, and visualize
          neuroimaging data with our comprehensive medical imaging platform.
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/generate')}>
            <Feather name="zap" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Start Generating</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineButton} onPress={() => router.push('/visualize')}>
            <Feather name="eye" size={20} color="#6D28D9" />
            <Text style={styles.outlineButtonText}>Explore Visualizer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Powerful Features</Text>
        <Text style={styles.sectionSubtitle}>
          Everything you need for professional MRI image generation and analysis
        </Text>

        <View style={styles.grid}>
          {features.map((feature, idx) => (
            <View key={idx} style={styles.card}>
              <View style={styles.cardIcon}>{feature.icon}</View>
              <Text style={styles.cardTitle}>{feature.title}</Text>
              <Text style={styles.cardDesc}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready to Generate MRI Images?</Text>
          <Text style={styles.ctaSubtitle}>
            Join researchers and medical professionals using our AI-powered platform for synthetic
            medical imaging generation.
          </Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/generate')}>
            <FontAwesome5 name="brain" size={20} color="#fff" />
            <Text style={styles.secondaryButtonText}>Get Started Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  heroSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#EDE9FE',
  },
  badge: {
    flexDirection: 'row',
    backgroundColor: '#DDD6FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    marginBottom: 12,
    alignItems: 'center',
  },
  badgeText: {
    marginLeft: 8,
    color: '#6D28D9',
    fontWeight: '500',
  },
  heroTitle: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
  },
  highlight: {
    color: '#6D28D9',
  },
  heroDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4B5563',
    maxWidth: 320,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#6D28D9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  outlineButton: {
    borderColor: '#6D28D9',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  outlineButtonText: {
    color: '#6D28D9',
    fontWeight: 'bold',
  },
  featuresSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  cardIcon: {
    backgroundColor: '#6D28D9',
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#4B5563',
  },
  ctaSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#EDE9FE',
  },
  ctaCard: {
    backgroundColor: '#6D28D9',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: '#4C1D95',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

