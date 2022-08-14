export default (err, res) => {
    if (process.env.ENABLE_ERROR_LOGS != "false") {
        console.error(err);
    }
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    return res.status(statusCode).json({
        error: `Error de servidor: ${err.message}`
    });
}
