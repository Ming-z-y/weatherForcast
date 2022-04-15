const Url_1 = 'https://www.yiketianqi.com/free/day?appid=95264842&appsecret=epSjdw1o&city=';
const Url_2 = 'https://www.yiketianqi.com/free/week?appid=95264842&appsecret=epSjdw1o&city=';
const Url_3 = 'https://devapi.qweather.com/v7/indices/1d?key=82cf0face4df476589b91d4f3559b3e6&type=1,2,3,4,5&location='
const Url_4 = 'https://geoapi.qweather.com/v2/city/lookup?key=82cf0face4df476589b91d4f3559b3e6&location='
let searchIcon = document.querySelectorAll(".search")[0];
let cityName = '';
let cityArr = [];

function $(str) {
    if (str.substr(0, 1) == '.') {
        let arr = [];
        const name2 = document.querySelectorAll(`${str}`);
        for (let i = 0; i < name2.length; i++) {
            arr.push(name2[i]);
        }
        return arr;
    } else {
        const name2 = document.querySelector(`${str}`)
        return name2
    }
}
function ridColor() {
    for (let i = 0; i < $('.footer').length; i++) {
        $('.footer')[i].className = 'footer'
    }
}

async function getData(url) {
    const res = await fetch(url);
    const json = await res.json();
    $('.back')[0].style.display = 'block'
    $('.footer')[1].className = 'footer on'
    $('.mFirst')[0].style.display = 'none';
    $('.mThird')[0].style.display = 'block'
    $('.temperature')[0].textContent = json.tem + '°C';
    $('.cloud')[0].textContent = json.wea;
    $('.wind')[0].textContent = json.win;
    $('.back')[0].addEventListener('click', () => {
        ridColor()
        $('.mFirst')[0].style.display = 'block';
        $(".mThird")[0].style.display = 'none'
        $('.mSecond')[0].style.display = 'none'
        $('.mFourth')[0].style.display = 'none';
        $('.back')[0].style.display = 'none'
        $('input').value = '';
    })
}
async function getWeekData(url) {
    const res = await fetch(url);
    const json = await res.json();
    const datas = json.data;
    for (let i = 0; i < $('.time').length; i++) {
        $('.time')[i].textContent = datas[i].date;
        $('.fengxiang')[i].textContent = datas[i].wea;
        $('.qiwen')[i].textContent = datas[i].tem_day + '°C/' + datas[i].tem_night + '°C';
    }
}
async function getSuggestions(url) {
    const res = await fetch(url);
    const json = await res.json();
    const dailies = json.daily;
    $('.tip')[0].textContent = dailies[0].text;
    for (let i = 0; i < dailies.length - 1; i++) {
        $('.zhishu')[i].textContent = dailies[i + 1].name;
        $('.dengji')[i].textContent = dailies[i + 1].category;
        $('.tishi')[i].textContent = dailies[i + 1].text;
    }
}
async function getLocationId(url) {
    const res = await fetch(url);
    const json = await res.json();
    const locationID = json.location[0].id;
    getSuggestions(`${Url_3}${locationID}`)
}

searchIcon.addEventListener('click', () => {
    if ($('input').value != '') {
        if (cityArr.indexOf($('input').value) == -1) {
            cityArr.push($('.history')[0]);
            $('.history')[0].innerHTML += `<li class='hisLi'>${$('input').value}</li>`
        }
        cityName = $('input').value;
        getData(`${Url_1}${cityName}`);
        getLocationId(`${Url_4}${cityName}`)
        $('.cityName')[0].textContent = cityName;
        getWeekData(`${Url_2}${cityName}`)
        getLocationId(`${Url_4}${cityName}`)
        $('.footer')[0].addEventListener('click', () => {
            $('.mFirst')[0].style.display = 'none';
            $('.mThird')[0].style.display = 'none';
            $('.mSecond')[0].style.display = 'block';
            $('.mFourth')[0].style.display = 'none';
            ridColor();
            $('.footer')[0].className = 'footer on'
        })
        $('.footer')[2].addEventListener('click', () => {
            $('.mFirst')[0].style.display = 'none';
            $('.mThird')[0].style.display = 'none';
            $('.mSecond')[0].style.display = 'none';
            $('.mFourth')[0].style.display = 'block';
            ridColor();
            $('.footer')[2].className = 'footer on'
        })
        $('.footer')[1].addEventListener('click', () => {
            $('.mFirst')[0].style.display = 'none';
            $('.mThird')[0].style.display = 'block';
            $('.mSecond')[0].style.display = 'none';
            $('.mFourth')[0].style.display = 'none';
            ridColor();
            $('.footer')[1].className = 'footer on';
        })
    }
})
$('input').addEventListener('focus', () => {
    if (cityArr.length != 0) {
        $('.searchHistoryBox')[0].style.display = 'block'
        for (let info of $('.hisLi')) {
            info.addEventListener('click', function () {
                let cityname = this.innerHTML;
                getData(`${Url_1}${cityname}`);
                getLocationId(`${Url_4}${cityname}`)
                getWeekData(`${Url_2}${cityname}`)
                getLocationId(`${Url_4}${cityname}`)
            })
        }
    }
})
$('input').addEventListener('blur', () => {
    setTimeout(() => {
        $('.searchHistoryBox')[0].style.display = 'none';
    }, 100);
})




//2.66 MING
//4.2 RUIJIA
//3.15 CHENGXU
