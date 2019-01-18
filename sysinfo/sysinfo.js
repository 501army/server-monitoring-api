const osutils = require('os-utils')
const Promise = require('promise')

exports.monitor = (req, res) => {
    let data = {}
    let countCpuUsage = new Promise((resolve,reject)=>{
        osutils.cpuUsage((v)=>{
            resolve(v.toFixed(2))
        })
    })
    countCpuUsage.then((result)=>{
        data.platform = osutils.platform()
        data.num_cpu = osutils.cpuCount()
        data.cpu_usage = result + "%"
        data.load_avg = osutils.loadavg(5)
        data.total_mem = osutils.totalmem().toFixed(2) + "MB"
        data.free_mem = osutils.freemem().toFixed(2) + "MB"
        data.free_mem_percent = osutils.freememPercentage().toFixed(2) +"%"
        data.uptime = formatTime(osutils.sysUptime())
        res.status(200).send({status:"200",message:"success",data:data})
    })
}

let formatTime = (duration)=>{
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds
}