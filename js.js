


let cities = [
    {arabicName: "القاهرة",
        name: "Al Qāhirah"
    },

    {arabicName: "الاسكندرية",
        name: "Al Iskandarīyah"
    },

    {arabicName: "الأقصر",
        name: "Al Uqşur"
    },

    {arabicName: "السويس",
        name: "As Suways"
    },

    {arabicName: "سوهاج",
        name: "Sūhāj"
    }
]

    for(let city of cities){
        const content = `
        <option>${city.arabicName}</option>
        `
        document.getElementById("city").innerHTML += content
}
        document.getElementById("city").addEventListener("change", function(){

            document.getElementById("result").innerHTML = this.value

            let cityName = ""
            for(let city of cities){
                if(city.arabicName == this.value)
                    cityName = city.name
            }
                getPrayerTimingOfCity(cityName)
        })
    
        function getPrayerTimingOfCity(cityName){
            let params = {
                country: "EG",
                city: cityName
            }

            axios.get('https://api.aladhan.com/v1/timingsByCity', {
                params: params
            })
            .then(function (response) {
                const timings = response.data.data.timings
                insertTimeOfPrayer("fajr", timings.Fajr)
                insertTimeOfPrayer("shurouk", timings.Sunrise)
                insertTimeOfPrayer("duhr", timings.Dhuhr)
                insertTimeOfPrayer("aser", timings.Asr)
                insertTimeOfPrayer("magreb", timings.Maghrib)
                insertTimeOfPrayer("isha", timings.Isha)

                const readableDate = response.data.data.date.readable
                const weekDay = response.data.data.date.hijri.weekday.ar
                const date = readableDate + " " + weekDay
                document.getElementById("date").innerHTML = date
            })
            .catch(function (error) {
                console.log(error);
            })
        }

        getPrayerTimingOfCity("Al Qāhirah")


  function insertTimeOfPrayer(id,time){
        document.getElementById(id).innerHTML = time

  }
  