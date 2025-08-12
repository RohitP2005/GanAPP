import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface GeneratedFile {
  id: string;
  url: string;
  filename: string;
  timestamp: Date;
}

export default function MRIGenerator() {
  const [prompt, setPrompt] = useState('');
  const [batchCount, setBatchCount] = useState('1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);

  const simulateZipFetch = async (count: number) => {
    setProgress(0.2);
    await new Promise((res) => setTimeout(res, 1000));
    const files: GeneratedFile[] = [];

    for (let i = 0; i < count; i++) {
      files.push({
        id: `${Date.now()}-${i}`,
        url: 'https://via.placeholder.com/300x300.png?text=NIfTI+MRI',
        filename: `file_${i + 1}.nii`,
        timestamp: new Date(),
      });
    }

    setGeneratedFiles((prev) => [...files, ...prev]);
    setProgress(1);
    setTimeout(() => setProgress(0), 800);
    Alert.alert('Success', `${count} MRI files simulated!`);
  };

  const handleGenerate = async (mode: 'single' | 'batch') => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt.');
      return;
    }

    const count = mode === 'single' ? 1 : Math.max(1, Math.min(10, Number(batchCount)));
    setIsGenerating(true);
    await simulateZipFetch(count);
    setIsGenerating(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>MRI File Generator</Text>
      <Text style={styles.subtitle}>Fetch simulated NIfTI MRI files</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Prompt (optional)</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="e.g. Brain MRI, Axial View"
          value={prompt}
          onChangeText={setPrompt}
        />

        <Text style={styles.label}>Batch Count (1–10)</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={batchCount}
          onChangeText={setBatchCount}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleGenerate('single')}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Fetch One</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#5B21B6' }]}
            onPress={() => handleGenerate('batch')}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Fetch Batch</Text>
            )}
          </TouchableOpacity>
        </View>

        {isGenerating && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Generating...</Text>
            <ProgressBar progress={progress} color="#7C3AED" style={{ height: 6 }} />
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Fetched Files ({generatedFiles.length})</Text>

        {generatedFiles.length === 0 ? (
          <View style={styles.empty}>
            <Icon name="image-off-outline" size={48} color="#aaa" />
            <Text style={styles.emptyText}>No files fetched yet.</Text>
          </View>
        ) : (
          generatedFiles.map((file) => (
            <View key={file.id} style={styles.fileItem}>
              <Text style={styles.filename}>{file.filename}</Text>
              <Text style={styles.timestamp}>{file.timestamp.toLocaleString()}</Text>
              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() => Alert.alert('Download', `Simulated download of ${file.filename}`)}
              >
                <Icon name="download" size={18} color="#6D28D9" />
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1F2937',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    marginTop: 8,
    color: '#9CA3AF',
  },
  fileItem: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 12,
  },
  filename: {
    fontSize: 14,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  downloadText: {
    color: '#6D28D9',
    fontWeight: '500',
  },
});

