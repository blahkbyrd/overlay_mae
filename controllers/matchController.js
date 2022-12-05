const axios = require('axios')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('DB.db')

const getData = () => {
    const sql = `SELECT token FROM datas WHERE id = ?`
    db.all(sql, [0], (error, row) => {

        if (error) console.log(error);
        else {
            if (row.length != 0) {
                console.log("result : ");
                let data = row
                console.log(data);
                return data
            }
        }
    })

}
/*=================== constants ===================*/
const url = 'http://api.cup2022.ir/api/v1/match'
/*=================== handle functions ===================*/
const getSoccers = (data) => {
    const soccers = data.toString()
    let soccersArray = soccers.split(',')
    return soccersArray;
}

/*=================== controller ===================*/

const getAllMatches = async (req, res) => {
    try {
        const token = req.token
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const matches = await axios.get(url, config)
        const response = matches.data.data
        res.status(200).json({ matches: response })
    } catch (error) {
        console.log(error.message);
    }

}

const getMatchOfTheDay = async (req, res) => {
    try {
        const token = req.token
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const matches = await axios.get(url, config)
        const response = matches.data.data
        const today = Date.now()
        const localDate = new Date(today)
        const day = localDate.getDate()
        const month = localDate.getMonth()
        const formatDate = `${month + 1}/${day}`
        let data = []
        response.map(element => {
            const date = (element.local_date).toString()
            const hour = date.substr(11, 5)
            let home_scorers = [];
            let away_scorers = [];
            if (element.home_score != 0) {
                home_scorers.push(...getSoccers(element.home_scorers))
            }
            if (element.away_score != 0) {
                away_scorers.push(...getSoccers(element.away_scorers))
            }

            const match = {
                id: element.id,
                home_team: element.home_team_en,
                away_team: element.away_team_en,
                finish: element.finished,
                hour: hour,
                home_flag: element.home_flag,
                away_flag: element.away_flag,
                home_score: element.home_score,
                away_score: element.away_score,
                home_scorer: home_scorers,
                away_scorer: away_scorers
            }
            if (date.startsWith(formatDate)) {
                data.push(match)
            }
        })
        res.status(200).json({ matches: data })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllMatches,
    getMatchOfTheDay
}