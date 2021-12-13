#!/usr/bin/env node

const plotCharts = (data) => {
    const coffees = []
    const dates = []
    const beers = []
    const leagueGamesEnjoyed = []
    const leagueGamesHated = []
    const minutesWalked = []
    data.forEach(({
        date,
        qty_coffees,
        qty_beers,
        qty_league_games_hated,
        qty_league_games_enjoyed,
        qty_minutes_walked
    }) => {
        coffees.push(qty_coffees)
        dates.push(date)
        beers.push(qty_beers)
        leagueGamesEnjoyed.push(qty_league_games_enjoyed)
        leagueGamesHated.push(qty_league_games_hated)
        minutesWalked.push(qty_minutes_walked)
    })

    let ctx = document.getElementById('chart1').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Coffees Per Day',
                data: coffees,
                backgroundColor: "transparent",
                borderColor: '#622e8f'

            },
            {
                label: 'Beers Per Day',
                data: beers,
                backgroundColor: "transparent",
                borderColor: "#ffa600"
            }]
        },
    })

    let ctx2 = document.getElementById('chart2').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Games Hated',
                data: leagueGamesHated,
                backgroundColor: "#de425b",

            },
            {
                label: 'Games Enjoyed',
                data: leagueGamesEnjoyed,
                backgroundColor: "#488f31"
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    })

    let ctx3 = document.getElementById('chart3').getContext('2d');
    new Chart(ctx3, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Minutes Walked',
                data: minutesWalked,
                borderColor: "#f5425b",
                backgroundColor: "transparent"
            }]
        }
    })
}

const fetchData = async () => {
    const { data } = await axios.get('http://localhost:8000/data')
    return data
}


const main = async () => {
    const data = await fetchData()
    plotCharts(data)
}

main()