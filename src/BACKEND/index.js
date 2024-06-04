/**
 * Module dependencies.
 */
import express from 'express';
import morgan from 'morgan';
import { createWriteStream, createReadStream } from 'fs';
import { join } from 'path';
import { parse } from 'csv-parse';
import path from 'path';

const app = express()

// routes middleware
// app.use('/api', projectRoutes); // TODO:

/**
 * Get port from environment and store in Express.
 */
const port = (process.env.PORT || '8000');
// const port = (import.meta.env.PORT || '8000');
app.set('port', port);

var allowCrossDomain = function (req, res, next) {
    // Enabling CORS
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token')

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
}
app.use(allowCrossDomain)
app.use(express.json());
const __dirname = path.resolve();

// create a write stream (in append mode)
var debugLogStream = createWriteStream(join(__dirname + '/debug.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: debugLogStream }))

app.get('/', function (req, res) {
    console.log('Server projects is running')
    res.send('Server projects is running')
})

app.get("/api/projects", (req, res) => {
    try {
        console.log('api projects invoked with params ', req.query)
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        var rnum = 1, pushed = 0, valid = 0, discard = 0, packet = [];
        const filePath = join(__dirname + '/data/INBOUND/projects_data.csv')
        const now = new Date()
        createReadStream(filePath)
            .on('error', err => {
                console.error(err, 'Async getprojects projects_data.csv ERROR: FILE NOT FOUND!')
            })
            .pipe(parse({ delimiter: ',' }))
            .on('data', function (csvrow) {
                if (csvrow.length > 1) {
                    const projectObj = objAssign(csvrow)
                    const startDate = new Date(projectObj.start_date)
                    const endDate = new Date(projectObj.end_date)
                    if (parseInt(projectObj.is_published) === 1
                        && (now >= startDate.valueOf())    
                        && (now <= endDate.valueOf())    // project isn't valid cause past end_date 
                    ) {
                        valid++
                        // scan records till in page and reach the limit
                        if (rnum > ((page - 1) * limit + discard)
                            && (rnum) <= ((page * limit) + (valid + discard))) {
                            if (pushed < limit) {
                                packet.push(projectObj)
                                // console.log("import row number ", packet[pushed])
                                pushed++
                            }
                        }
                    } else {
                        discard++
                    }
                }
                rnum++
            })
            .on('finish', () => {
                // console.log('FINISH Done in ms:', Date.now()-now)
                res.send(packet);
            });
    } catch (err) {
        console.error('API ERROR ', err.message);
        res.status(503).send('API ERROR ', err.message);
    }
})
/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, function (err) {
    if (err) onError(err)
    console.log("Server listening on Port", port);
})

function objAssign(csvrow) {
    let obj = {
        id: csvrow[0],
        title: csvrow[1],
        start_date: csvrow[2],
        end_date: csvrow[3],
        is_published: csvrow[4],
        projectn: csvrow[5],
        category: csvrow[6]
    }
    return obj;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            // process.exit(1);
            import.meta.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            // process.exit(1);
            import.meta.exit(1);
            break;
        default:
            throw error;
    }
}

