const axios = require('axios');

async function sorgu(id) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://www.instagram.com/api/v1/locations/web_info/?location_id=${id}`,
        headers: { 
            'authority': 'www.instagram.com', 
            'accept': '*/*', 
            'accept-language': 'tr', 
            'cookie': 'ig_did=AADD2AB0-0929-48E6-A6ED-DD616D7C8690; datr=VnShZEIQ64YS10Xm46D35i7C; csrftoken=efo7t57nh46Hmxokragaj5TAjTnsNLUL; mid=ZKF0VwALAAFxGt7LB7lOdyV8j_e3; ig_nrcb=1; csrftoken=VQEIFgxFg27BzkfGlDjCWYzy4qbE6Beu; ds_user_id=51870645423; ig_did=F76D79C3-D228-47D3-82BA-250C84EC0543; ig_nrcb=1; mid=ZKCCiwAEAAFq3S8OTFrpmrjoGvZh; rur="CLN\\05451870645423\\0541719837985:01f744e5528d3d8bc0124dbb7418ef6455afef0da218f001561cc84b315988f4c3ea6a90"', 
            'referer': 'https://www.instagram.com/explore/locations/72813118/ankara/', 
            'sec-ch-prefers-color-scheme': 'dark', 
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"', 
            'sec-ch-ua-full-version-list': '"Not.A/Brand";v="8.0.0.0", "Chromium";v="114.0.5735.199", "Google Chrome";v="114.0.5735.199"', 
            'sec-ch-ua-mobile': '?0', 
            'sec-ch-ua-platform': '"Windows"', 
            'sec-ch-ua-platform-version': '"15.0.0"', 
            'sec-fetch-dest': 'empty', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-site': 'same-origin', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', 
            'viewport-width': '1255', 
            'x-asbd-id': '129477', 
            'x-csrftoken': 'efo7t57nh46Hmxokragaj5TAjTnsNLUL', 
            'x-ig-app-id': '936619743392459', 
            'x-ig-www-claim': '0', 
            'x-requested-with': 'XMLHttpRequest'
        }
    };

    let response = await axios(config);
    response = JSON.stringify(response.data);
    response = JSON.parse(response);
    let users = [];

    for (let i = 0; i < response.native_location_data.ranked.sections.length; i++) {
        try {
            let user = {
                username: response.native_location_data.ranked.sections[i].layout_content?.medias[0].media.user.username,
                name: response.native_location_data.ranked.sections[i].layout_content?.medias[0].media.user.full_name,
            }
            await axios.get(response.native_location_data.ranked.sections[i].layout_content?.medias[0].media.user.profile_pic_url, { responseType: 'arraybuffer' }).then(response => {
                let pic = Buffer.from(response.data, 'binary').toString('base64');
                user.pic = `data:image/png;base64,${pic}`;
            });
            users.push(user);
        } catch (error) {
            
        }
    }

    for (let i = 0; i < response.native_location_data.recent.sections.length; i++) {
        try {
            let user = {
                username: response.native_location_data.recent.sections[i].layout_content?.medias[0].media.user.username,
                name: response.native_location_data.recent.sections[i].layout_content?.medias[0].media.user.full_name,
            }
            await axios.get(response.native_location_data.recent.sections[i].layout_content?.medias[0].media.user.profile_pic_url, { responseType: 'arraybuffer' }).then(response => {
                let pic = Buffer.from(response.data, 'binary').toString('base64');
                user.pic = `data:image/png;base64,${pic}`;
            });
            users.push(user);
        } catch (error) {
            
        }
    }

    console.log(`[${id}] ${users.length} adet kullanıcı bulundu!`);
    return users;
}

module.exports = { sorgu };
