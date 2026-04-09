/**
 * Injects Google's Maps JS bootstrap (importLibrary) using the API key from env.
 * @see https://developers.google.com/maps/documentation/javascript/load-maps-js-api#dynamic-library-import
 */
export function loadGoogleMapsScript(): void {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error(
      'REACT_APP_GOOGLE_MAPS_API_KEY is not set. Add it to a .env file in the project root (see README).'
    );
    return;
  }

  if (document.querySelector('script[data-google-maps-loader]')) {
    return;
  }

  const config = JSON.stringify({ key: apiKey, v: 'weekly' });
  // URL built with concatenation so this string stays embeddable without nested template literals.
  const bootstrap =
    '(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src="https://maps."+c+"apis.com/maps/api/js?"+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})(' +
    config +
    ');';

  const script = document.createElement('script');
  script.setAttribute('data-google-maps-loader', 'true');
  script.textContent = bootstrap;
  document.head.appendChild(script);
}
