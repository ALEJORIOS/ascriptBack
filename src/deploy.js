const PORT = process.env.PORT || 3000;

export function listen(app) {
    app.listen(PORT, () => {
        console.log(`Listening at port ${PORT}`);
    })
    return app;
}