import React, { useRef } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const NowGaldaeDetail: React.FC = () => {
  const webviewRef = useRef(null);

  return (
    <View style={styles.main}>
  <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent={false} />
      <View style={styles.map}>
        <WebView
          ref={webviewRef}
          source={{ uri: 'https://kakao-map-web.vercel.app/' }}
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          mixedContentMode="compatibility"
          startInLoadingState={true}
          scrollEnabled={false}
          bounces={false}
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          decelerationRate={Platform.OS === 'android' ? 0.998 : 'normal'}
          allowsBackForwardNavigationGestures={false}
          androidLayerType="hardware"
          onScroll={() => {}}
          onMessage={(event) => {
            console.log('WebView message:', event.nativeEvent?.data);
          }}
          injectedJavaScript={`
            (function() {
              try {
                var meta = document.querySelector('meta[name="viewport"]');
                if (!meta) {
                  meta = document.createElement('meta');
                  meta.name = 'viewport';
                  meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
                  document.head && document.head.appendChild(meta);
                }
                var style = document.createElement('style');
                style.type = 'text/css';
                style.appendChild(document.createTextNode("\\
html, body, #map {\\n\
  width: 100%;\\n\
  height: 100%;\\n\
  margin: 0;\\n\
  padding: 0;\\n\
  touch-action: pan-x pan-y !important;\\n\
  -ms-touch-action: pan-x pan-y !important;\\n\
  -webkit-user-drag: none;\\n\
  -webkit-overflow-scrolling: auto !important;\\n\
}\\n\
"));
                document.head && document.head.appendChild(style);
                if (window && window.ReactNativeWebView) {
                  window.ReactNativeWebView.postMessage('js-ok');
                }
              } catch (e) {}
            })();
            true;
          `}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerText: {
    marginTop: 40,
    marginBottom: 12,
  },
  map: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default NowGaldaeDetail;