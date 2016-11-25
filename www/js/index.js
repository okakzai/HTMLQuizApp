var isAppForeground = true;

function onAdLoaded(e) {
  if (isAppForeground) {
    if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
      admob.showInterstitialAd();
    }
  }
}

function onAdClosed(e) {
  if (isAppForeground) {
    if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
      setTimeout(admob.requestInterstitialAd, 1000 * 60 * 2);
    }
  }
}

function onPause() {
  if (isAppForeground) {
    admob.destroyBannerView();
    isAppForeground = false;
  }
}

function onResume() {
  if (!isAppForeground) {
    setTimeout(admob.createBannerView, 1);
    setTimeout(admob.requestInterstitialAd, 1);
    isAppForeground = true;
  }
}

// optional, in case respond to events
function registerAdEvents() {
  document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
  document.addEventListener(admob.events.onAdClosed, onAdClosed);

  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
}

function initAds() {
  if (admob) {
    var adPublisherIds = {
        android : {
        banner : "ca-app-pub-9008926290238612/4489704660",
        interstitial : "ca-app-pub-9008926290238612/5966437867"
      }
    };

    var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;

    admob.setOptions({
      publisherId:          admobid.banner,
      interstitialAdId:     admobid.interstitial,
      bannerAtTop: true,	    
      autoShowInterstitial: false
    });

    //registerAdEvents();

  } else {
    alert('AdMobAds plugin not ready');
  }
}

function onDeviceReady() {
  document.removeEventListener('deviceready', onDeviceReady, false);
  initAds();

  // display a banner at startup
  admob.createBannerView();

  // request an interstitial
  admob.requestInterstitialAd();
}

document.addEventListener("deviceready", onDeviceReady, false);
