import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Button,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  ScrollView,
  Alert,
  ToastAndroid,
  Slider,
} from 'react-native';
import { Niivue } from '@niivue/niivue';

const Visualizer = () => {
  const [file, setFile] = useState(null);
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [loading, setLoading] = useState(false);
  const [showCrosshair, setShowCrosshair] = useState(true);
  const [showColorbar, setShowColorbar] = useState(true);

  const canvasRef = useRef(null);
  const nvRef = useRef(null);

  const showToast = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  useEffect(() => {
    const initViewer = async () => {
      if (!file || !canvasRef.current) return;
      const nv = new Niivue({ show3Dcrosshair: showCrosshair, showColorbar });
      nvRef.current = nv;
      await nv.attachToCanvas(canvasRef.current);
      const fileData = await fetch(file.uri).then((res) => res.arrayBuffer());
      await nv.loadVolumes([{ data: fileData, name: file.name }]);
      nv.setSliceType(nv.sliceTypeMultiplanar);
      nv.setOpacity(0, 1.0);
      nv.setColormap(0, 'gray');
      nv.setVolumeContrast(0, contrast / 100);
      nv.setVolumeBrightness(0, brightness / 100);
    };

    initViewer();
  }, [file, showCrosshair, showColorbar]);

  const updateContrast = (val) => {
    setContrast(val);
    nvRef.current?.setVolumeContrast(0, val / 100);
  };

  const updateBrightness = (val) => {
    setBrightness(val);
    nvRef.current?.setVolumeBrightness(0, val / 100);
  };

  const resetView = () => {
    setBrightness(50);
    setContrast(50);
    nvRef.current?.setVolumeBrightness(0, 0.5);
    nvRef.current?.setVolumeContrast(0, 0.5);
    showToast('View Reset: Default settings restored.');
  };

  const clearFile = () => {
    setFile(null);
    nvRef.current = null;
    showToast('File cleared.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>NII Visualizer</Text>
      <Text style={styles.subtitle}>Visualize NIfTI medical files in 3D</Text>

      {/* You can add your custom upload method here instead */}
      {!file && (
        <TouchableOpacity style={styles.button} onPress={() => showToast('Implement your own file load logic')}>
          <Text style={styles.buttonText}>Load NII File</Text>
        </TouchableOpacity>
      )}

      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}

      {file && (
        <View style={styles.viewerBox}>
          <Text style={styles.viewerLabel}>Loaded: {file.name}</Text>
          <canvas ref={canvasRef} style={styles.canvas} />

          <View style={styles.sliderContainer}>
            <Text style={styles.label}>Brightness: {brightness}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={brightness}
              onValueChange={updateBrightness}
            />
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.label}>Contrast: {contrast}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={contrast}
              onValueChange={updateContrast}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.label}>Show Crosshair</Text>
            <Switch value={showCrosshair} onValueChange={setShowCrosshair} />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.label}>Show Colorbar</Text>
            <Switch value={showColorbar} onValueChange={setShowColorbar} />
          </View>

          <TouchableOpacity style={styles.buttonSecondary} onPress={resetView}>
            <Text style={styles.buttonText}>Reset View</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDanger} onPress={clearFile}>
            <Text style={styles.buttonText}>Clear File</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6D28D9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#4B5563',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDanger: {
    backgroundColor: '#DC2626',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  viewerBox: {
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  viewerLabel: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  canvas: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
  },
  sliderContainer: {
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  slider: {
    width: '100%',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
});

export default Visualizer;

