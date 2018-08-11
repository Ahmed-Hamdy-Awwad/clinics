const electron = require('electron');
const url = require('url');
const path = require('path');
//var express = require('express');
// var app = express();

const {app, Menu, BrowserWindow} = electron;
let mainWindow;

//app.set('view engine', 'ejs');

app.on('ready', function(){
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'views/home.html'),
		protocol: 'file:',
		slashes: true
	}));
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [
	{
		label: 'Menu',
		submenu: [
			{
				label: 'Quit',
				click(){
					app.quit();
				}
			}
		]
	}
];
// app.get('/home', function(req, res){
// 	res.render('home')
// });

// app.listen(3000, function(){
// 	console.log('The web server started on port 3000')
// });