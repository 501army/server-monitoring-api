const osutils = require('os-utils')
const os = require('os')
const Promise = require('promise')

exports.monitor = (req, res) => {
    let data = {}
    let countCpuUsage = new Promise((resolve,reject)=>{
        osutils.cpuUsage((v)=>{
            resolve(v.toFixed(2))
        })
    })
    countCpuUsage.then((result)=>{
        // data.platform = osutils.platform()
        // data.num_cpu = osutils.cpuCount()
        // data.cpu_usage = result + "%"
        // data.load_avg = osutils.loadavg(5)
        // data.total_mem = osutils.totalmem().toFixed(2) + "MB"
        // data.free_mem = osutils.freemem().toFixed(2) + "MB"
        // data.free_mem_percent = osutils.freememPercentage().toFixed(2) +"%"
        // data.uptime = formatTime(osutils.sysUptime())
        let cpus = os.cpus()
        data.platform = os.platform()
        data.cpu = cpus[0].model
        data.num_cpu = cpus.length
        data.cpu_usage = result + "%"
        data.total_mem = formatBytes(os.totalmem())
        data.free_mem = formatBytes(os.freemem())
        data.uptime = os.uptime().toFixed(0).toHHMMSS()
        res.status(200).send({status:"200",message:"success",data:data})
    })
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function formatBytes(bytes) {
    if(bytes < 1024) return bytes + " Bytes";
    else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KB";
    else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MB";
    else return(bytes / 1073741824).toFixed(3) + " GB";
};