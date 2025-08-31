import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: "https://ganapp-77e0a.web.app/" }}
        style={styles.webview}
        startInLoadingState={true}   // show spinner while loading
        javaScriptEnabled={true}     // allow JS
        domStorageEnabled={true}     // allow localStorage/sessionStorage
        allowsInlineMediaPlayback={true} // for smooth inline canvas/audio
        originWhitelist={["*"]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },
});
