const { v4: uuidv4 } = require('uuid');


class Helpers{
    ResponseFormatter = (
            code = 200, 
            message = '',
            data = '', 
            page = null,
            request = null
        ) => {
        var response;
        var status = {
            100 : 'Continue',
            101 : 'Switching Protocols',

            200 : 'OK',
            201 : 'Created',
            202 : 'Accepted',
            203 : 'Non-Authoritative Information',
            204 : 'No Content',
            205 : 'Reset Content',
            206 : 'Partial Content',

            300 : 'Multiple Choices',
            301 : 'Moved Permanently',
            302 : 'Found',
            303 : 'See Other',
            304 : 'Not Modified',
            305 : 'Use Proxy',
            307 : 'Temporary Redirect',

            400 : 'Bad Request',
            401 : 'Unauthorized',
            402 : 'Payment Required',
            403 : 'Forbidden',
            404 : 'Not Found',
            405 : 'Method Not Allowed',
            406 : 'Not Acceptable',
            407 : 'Proxy Authentication Required',
            408 : 'Request Timeout',
            409 : 'Conflict',
            410 : 'Gone',
            411 : 'Length Required',
            412 : 'Precondition Failed',
            413 : 'Request Entity Too Large',
            414 : 'Request-URI Too Long',
            415 : 'Unsupported Media Type',
            416 : 'Requested Range Not Satisfiable',
            417 : 'Expectation Failed',
            422 : 'Unprocessable Entity',
            429 : 'Too Many Requests',

            500 : 'Internal Server Error',
            501 : 'Not Implemented',
            502 : 'Bad Gateway',
            503 : 'Service Unavailable',
            504 : 'Gateway Timeout',
            505 : 'HTTP Version Not Supported'
        }

        if(typeof code == 'number'){
            var pages;var query = ''
            if(request != null){

                if(request.query != null){
                    query += (request.query.limit ? '&limit='+request.query.limit : '')
                    query += (request.query.search ? '&search='+request.query.search : '')
                }

                if(page != null){
                    pages = {
                        page_before : (page == 1 ? 
                            '' :
                                (process.env.BASE_URL+request.path+'?page='+(page-1)+query)),
                        page_after  : (data.rows.length == 0 ? 
                            '' : 
                                (process.env.BASE_URL+request.path+'?page='+(page+1)+query)),
                    }
                }
                
            }
            response = {
                meta : {
                    code:code,
                    status:status[code],
                    message:message
                },
                data,
                pages
            }
            return response;
        }
        return {'error':status[code],'message':'Code Tidak Sesuai'}
    }

    GetPaginate = (req) => {
        const {page, search, limit} = req.query;
        const page_num = parseInt(page) || 1
        const limit_num = parseInt(limit) || 10
        const search_en = search || ""
        let offset = 0 + (page_num - 1) * limit_num

        return {
            page : page_num,
            limit : limit_num,
            offset,
            search: search_en
        }
    }

    genuuid = () =>{
        return uuidv4();
    }

    
}

module.exports = {
    Helpers
}