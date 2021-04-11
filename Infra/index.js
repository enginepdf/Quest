exports.handler = async (event) => { 
    const response = {
        statusCode: 200,
        body: JSON.stringify('This is /check2 from Lambda!'),
    };
    return response;
};