const opencagedataKEY = '68161fd675b94e91ab288c1e2b3be751';
const ipinfoKEY = 'aca9dba8741cd7';
const weatherKEY = 'f97e606ec8f57fbe940782319efd94a6';
const unsplashKEY = 'SX8BeyCkNJ-RQE81GVX-RH1zIQH4r7f1MhrP59LAO1U';

const ipinfo = `//ipinfo.io/json?token=${ipinfoKEY}`;
const opencagedata = `//api.opencagedata.com/geocode/v1/json?key=${opencagedataKEY}&pretty=1`;
const weatherAPI = `//api.openweathermap.org/data/2.5/onecall?&APPID=${weatherKEY}&units=metric`;
const unsplashAPI = `//api.unsplash.com/photos/random?orientation=landscape&per_page=1&client_id=${unsplashKEY}&query=`;

export {
  ipinfo, opencagedata, weatherAPI, unsplashAPI,
};
