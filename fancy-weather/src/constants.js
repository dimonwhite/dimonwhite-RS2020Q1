const opencagedataKEY = '68161fd675b94e91ab288c1e2b3be751';
const ipinfoKEY = 'aca9dba8741cd7';

const ipinfo = `https://ipinfo.io/json?token=${ipinfoKEY}`;
const opencagedata = `https://api.opencagedata.com/geocode/v1/json?key=${opencagedataKEY}&pretty=1&no_annotations=1`;

export { ipinfo, opencagedata };
