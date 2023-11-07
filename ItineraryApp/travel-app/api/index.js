import axios from 'travel-app/node_modules/axios/index.js'

export const getPlaceDetails = async (ne_lat, ne_lng, sw_lat, sw_lng, activityType) => {
    try {
        const {
            data : {data}, } = await axios.get(`https://travel-advisor.p.rapidapi.com/${activityType}/list-in-boundary`,
            {params: {
                bl_latitude: sw_lat ? sw_lat : '41.64433494650358',
                tr_latitude: ne_lat ? ne_lat : '42.02313101768388',
                bl_longitude: sw_lng ? sw_lng : '-87.94026693316636',
                tr_longitude: ne_lng ? ne_lng : '-87.52366097503476',
                limit: '30',
                currency: 'USD',
                lunit: 'mi',
                lang: 'en_US'
                },
                headers: {
                    'X-RapidAPI-Key': 'ca86e2b252msh40949036c77dffbp19ba7ajsn2df36ea1149e',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                }
            }
        )
        return data;
    } catch (error) {
        return null;
    }
}