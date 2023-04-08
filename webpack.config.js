const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        Widget: './src/lib/widget.js',
        useBot: './src/lib/hooks/useBot.js',
        Chat: './src/lib/components/chat.js',
        ChatBubble: './src/lib/components/chatBubble.js',
        Message: './src/lib/components/message.js',
        Product: './src/lib/components/product.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default', // Add this line
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        /*new HtmlWebpackPlugin({
            template: './public/index.html',
        }),*/
        new webpack.DefinePlugin({
            'process.env.REACT_APP_API_URI': JSON.stringify(process.env.REACT_APP_API_URI),
            'process.env.REACT_APP_STREAMING_API_URI': JSON.stringify(process.env.REACT_APP_STREAMING_API_URI),
        }),
    ],
};
