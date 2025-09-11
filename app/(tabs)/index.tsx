import { ThemedText } from '@/components/ThemedText';
import React, { useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const NowGaldaeDetail: React.FC = () => {
  const webviewRef = useRef(null);


  const busStops = [
    {
      name: '단국대 평화의 광장',
      lat: 37.32014600082093,
      lng: 127.1288399333128,
    },
    {
      name: '단국대 종합 실험동',
      lat: 37.32022368228002,
      lng: 127.12572906480165,
    },
    {
      name: '단국대 치과병원',
      lat: 37.322291863336666,
      lng: 127.12543635052465,
    },
    {
      name: '죽전역',
      lat: 37.32420554845601,
      lng: 127.10820542281134,
    },
    {
      name: '단국대 정문',
      lat: 37.323352264049944,
      lng: 127.12596838722746,
    },
    {
      name: '단국대 상경관',
      lat: 37.32220999341863,
      lng: 127.12826242041064,
    },
  ];

  const moveToStop = (lat: number, lng: number) => {
    if (webviewRef.current) {
      // @ts-ignore
      webviewRef.current.postMessage(
        JSON.stringify({ type: 'MOVE', lat, lng })
      );
    }
  };

  return (
    <View style={styles.main}>
      <ThemedText type="title" style={styles.headerText}>
        What The Bus
      </ThemedText>
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
          decelerationRate="normal" 
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
      {/* 버스정류장 5개 버튼 - 하단 고정 */}
      <View style={styles.buttonBar}>
        {busStops.slice(0, 5).map((stop) => (
          <View key={stop.name} style={{ marginRight: 8, marginBottom: 8 }}>
            <Button
              title={stop.name}
              onPress={() => moveToStop(stop.lat, stop.lng)}
            />
          </View>
        ))}
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
    top: '10%',
    left: 0,
    width: '100%',
    height: '70%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default NowGaldaeDetail;